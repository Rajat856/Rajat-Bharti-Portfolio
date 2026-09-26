"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Hero centrepiece: a glass torus-knot floating on a lit stage, ringed by a
 * slow orbital particle field.
 *
 * The look is refraction-led rather than wireframe-led — the knot picks up the
 * accent-coloured rim lights and bends the gradient behind it, which is what
 * gives the section real depth instead of a flat overlay.
 *
 * Budget: no textures, no models, no post-processing. `MeshTransmissionMaterial`
 * is the one expensive element, so its sample count is kept low and the whole
 * scene is gated by <Hero3D> on device capability, viewport and idle time.
 */

const PARTICLE_COUNT = 480;

/* -------------------------------------------------------------- Particles - */

function OrbitField({ light }: { light: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Flattened disc rather than a sphere — it reads as an orbit around the
      // knot instead of a cloud floating in front of it.
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.6 + Math.pow(Math.random(), 0.7) * 3.4;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 2.4;
      arr[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.035;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        sizeAttenuation
        color={light ? "#6440e8" : "#a99af8"}
        transparent
        opacity={light ? 0.5 : 0.65}
        depthWrite={false}
        blending={light ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------- Glass knot - */

function GlassKnot({ light }: { light: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    // Ease toward the pointer so the parallax lags the cursor slightly.
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.04;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.04;

    if (group.current) {
      group.current.rotation.x = pointer.current.y * 0.22;
      group.current.rotation.z = pointer.current.x * 0.1;
      group.current.position.x = pointer.current.x * (viewport.width * 0.012);
      group.current.position.y = pointer.current.y * (viewport.height * 0.012);
    }
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.16;
      mesh.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.5}>
        <mesh ref={mesh} scale={1.28}>
          {/* Slimmer tube than a default knot — thick tubes stack up on
              themselves and the whole form goes opaque and muddy. */}
          <torusKnotGeometry args={[1, 0.26, 190, 34]} />
          <MeshTransmissionMaterial
            // Low sample/resolution keeps refraction affordable on mid hardware.
            samples={4}
            resolution={256}
            thickness={0.45}
            roughness={light ? 0.12 : 0.05}
            anisotropy={0.3}
            chromaticAberration={0.5}
            distortion={0.28}
            distortionScale={0.3}
            temporalDistortion={0.08}
            ior={1.35}
            transmission={1}
            color={light ? "#eeecfd" : "#d8d2ff"}
            attenuationColor={light ? "#8d78f5" : "#a99af8"}
            // Longer attenuation = less colour absorbed through the glass, so
            // the knot stays luminous instead of going near-black at depth.
            attenuationDistance={light ? 2.2 : 2.6}
            background={new THREE.Color(light ? "#f2f1f8" : "#141225")}
          />
        </mesh>

        {/* Inner emissive core — a bright seed inside the glass so the knot
            reads as lit from within rather than merely transparent. */}
        <mesh scale={0.42}>
          <icosahedronGeometry args={[1, 4]} />
          <meshBasicMaterial color={light ? "#7c5cff" : "#8d78f5"} transparent opacity={light ? 0.5 : 0.75} />
        </mesh>
      </Float>

      {/* Halo ring, tilted off-axis to break the symmetry. */}
      <mesh rotation={[Math.PI / 2.6, 0.3, 0.2]}>
        <torusGeometry args={[3.15, 0.006, 8, 160]} />
        <meshBasicMaterial
          color={light ? "#0891b2" : "#22d3ee"}
          transparent
          opacity={light ? 0.5 : 0.4}
        />
      </mesh>

      <OrbitField light={light} />
    </group>
  );
}

/* ----------------------------------------------------------------- Canvas - */

export default function HeroScene({ light = false }: { light?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 9], fov: 38 }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={light ? 1.1 : 0.5} />
      {/* Two rim lights in the brand pair — they're what the glass picks up. */}
      <directionalLight position={[5, 4, 6]} intensity={light ? 2.2 : 2.8} color="#a99af8" />
      <directionalLight position={[-6, -2, -4]} intensity={light ? 1.4 : 2.0} color="#22d3ee" />
      <pointLight position={[0, 0, 3]} intensity={light ? 8 : 14} color="#7c5cff" distance={12} />

      {/* Procedural studio IBL. Deliberately NOT `preset=` — that fetches a
          1–2MB HDR from an external CDN, which is both a network dependency and
          a latency cost the hero can't justify. These lightformers are baked
          once (frames={1}) and give the glass something to refract for free. */}
      <Environment frames={1} resolution={128}>
        <Lightformer
          form="rect"
          intensity={light ? 1.4 : 2.6}
          color="#7c5cff"
          position={[-4, 2, 3]}
          scale={[7, 7, 1]}
        />
        <Lightformer
          form="rect"
          intensity={light ? 1.1 : 2.2}
          color="#22d3ee"
          position={[5, -1, 2]}
          scale={[6, 6, 1]}
        />
        <Lightformer
          form="ring"
          intensity={light ? 0.9 : 1.6}
          color="#ff8a5b"
          position={[0, 4, -3]}
          scale={[4, 4, 1]}
        />
        <Lightformer
          form="rect"
          intensity={light ? 2.0 : 0.7}
          color="#ffffff"
          position={[0, -4, 1]}
          scale={[9, 4, 1]}
        />
      </Environment>

      <GlassKnot light={light} />
    </Canvas>
  );
}
