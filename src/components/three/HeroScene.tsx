"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * Hero centrepiece: a physically-lit aluminium laptop whose screen cycles
 * through real client sites.
 *
 * The previous glass torus-knot read as "3D effect" rather than "3D object":
 * abstract geometry floating in a void gives the eye nothing to believe. What
 * sells realism is a recognisable object with a real material, lit by an
 * environment, sitting on a real contact shadow — so that's all this is.
 *
 * Everything is procedural (rounded boxes + one texture per screenshot), so
 * there is no model download and no external CDN dependency.
 */

const SCREENS = [
  "/hero/doodl-space.jpg",
  "/hero/robgence-production.jpg",
  "/hero/kindly-objects.jpg",
  "/hero/eye-instruments-india.jpg",
  "/hero/virusha-tech.jpg",
];

// Laptop proportions (scene units ≈ a 14" machine at 1:10).
const W = 3.1; // width
const D = 2.15; // depth of base / height of lid
const BASE_T = 0.1; // base thickness
const LID_T = 0.06; // lid thickness
const OPEN = -0.3; // final lid angle: ~17° past vertical
const SCREEN_W = W - 0.2;
const SCREEN_H = SCREEN_W / 1.6; // 16:10

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/* ----------------------------------------------------------- Screen ---- */

function Screen({ light }: { light: boolean }) {
  const { gl } = useThree();
  const baseMat = useRef<THREE.MeshBasicMaterial>(null);
  const fadeMat = useRef<THREE.MeshBasicMaterial>(null);

  const textures = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return SCREENS.map((src) => {
      const t = loader.load(src);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
      return t;
    });
  }, [gl]);

  useEffect(() => () => textures.forEach((t) => t.dispose()), [textures]);

  // Cross-fade to the next site every few seconds.
  const state = useRef({ index: 0, since: 0, fading: false, t: 0 });
  useFrame((_, delta) => {
    const s = state.current;
    const base = baseMat.current;
    const fade = fadeMat.current;
    if (!base || !fade) return;
    if (!base.map) base.map = textures[0];

    s.since += delta;
    if (!s.fading && s.since > 3.6) {
      s.fading = true;
      s.t = 0;
      fade.map = textures[(s.index + 1) % textures.length];
      fade.needsUpdate = true;
    }
    if (s.fading) {
      s.t = Math.min(1, s.t + delta / 0.7);
      fade.opacity = s.t;
      if (s.t >= 1) {
        s.index = (s.index + 1) % textures.length;
        base.map = textures[s.index];
        base.needsUpdate = true;
        fade.opacity = 0;
        s.fading = false;
        s.since = 0;
      }
    }
  });

  // Screens are self-lit: unaffected by scene light and tone mapping, which
  // is exactly how a real display photographs.
  const brightness = light ? 0.96 : 0.9;
  return (
    <group position={[0, D / 2, LID_T / 2 + 0.002]}>
      <mesh>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial ref={baseMat} toneMapped={false} color={new THREE.Color(brightness, brightness, brightness)} />
      </mesh>
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial
          ref={fadeMat}
          toneMapped={false}
          transparent
          opacity={0}
          color={new THREE.Color(brightness, brightness, brightness)}
        />
      </mesh>
      {/* Faint glass reflection over the panel. */}
      <mesh position={[0, 0, 0.002]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.08}
          roughness={0.05}
          metalness={0}
          clearcoat={1}
          color="#ffffff"
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ----------------------------------------------------------- Laptop ---- */

function Laptop({ light }: { light: boolean }) {
  const root = useRef<THREE.Group>(null);
  const hinge = useRef<THREE.Group>(null);
  const clock = useRef(0);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // The canvas is pointer-events:none (the page copy sits over it), so track
  // the cursor on the window instead of through R3F's event system.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    clock.current += delta;
    const p = pointer.current;
    p.x += (p.tx - p.x) * 0.05;
    p.y += (p.ty - p.y) * 0.05;

    // Lid opens from closed on first paint — a physical cue that this is an
    // object, not a picture.
    if (hinge.current) {
      const t = easeOutCubic(Math.min(1, Math.max(0, (clock.current - 0.2) / 1.6)));
      hinge.current.rotation.x = THREE.MathUtils.lerp(Math.PI / 2, OPEN, t);
    }
    if (root.current) {
      const idle = Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
      root.current.rotation.y = -0.34 + p.x * 0.2 + idle;
      root.current.rotation.x = p.y * 0.04;
      root.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
    }
  });

  const aluminium = light ? "#d5d8de" : "#9ea3ad";
  const metal = { color: aluminium, metalness: 0.85, roughness: 0.32, envMapIntensity: 1.1 };

  return (
    <group ref={root}>
      {/* Base */}
      <RoundedBox args={[W, BASE_T, D]} radius={0.05} smoothness={6} position={[0, BASE_T / 2, 0]}>
        <meshStandardMaterial {...metal} />
      </RoundedBox>

      {/* Keyboard well */}
      <mesh position={[0, BASE_T + 0.001, -0.18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W - 0.42, D * 0.42]} />
        <meshStandardMaterial color="#16171b" roughness={0.75} metalness={0.2} />
      </mesh>
      {/* Key grid hint */}
      <Keys />
      {/* Trackpad */}
      <RoundedBox
        args={[W * 0.36, 0.004, D * 0.3]}
        radius={0.002}
        smoothness={2}
        position={[0, BASE_T + 0.001, D * 0.27]}
      >
        <meshStandardMaterial color={aluminium} metalness={0.7} roughness={0.22} />
      </RoundedBox>

      {/* Hinge + lid */}
      <group ref={hinge} position={[0, BASE_T, -D / 2 + 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.035, 0.035, W - 0.5, 24]} />
          <meshStandardMaterial color="#2a2c31" metalness={0.8} roughness={0.4} />
        </mesh>
        {/* Lid shell */}
        <RoundedBox args={[W, D, LID_T]} radius={0.05} smoothness={6} position={[0, D / 2, 0]}>
          <meshStandardMaterial {...metal} />
        </RoundedBox>
        {/* Black bezel glass */}
        <mesh position={[0, D / 2, LID_T / 2 + 0.001]}>
          <planeGeometry args={[W - 0.06, D - 0.06]} />
          <meshStandardMaterial color="#050506" roughness={0.12} metalness={0.3} />
        </mesh>
        <Screen light={light} />
      </group>
    </group>
  );
}

/** Low-cost key hint: one instanced mesh, not a hundred draw calls. */
function Keys() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const cols = 14;
  const rows = 5;
  useEffect(() => {
    const m = ref.current;
    if (!m) return;
    const dummy = new THREE.Object3D();
    const kw = (W - 0.6) / cols;
    const kd = (D * 0.38) / rows;
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dummy.position.set(-((W - 0.6) / 2) + kw * (c + 0.5), BASE_T + 0.006, -0.18 - (D * 0.19) + kd * (r + 0.5));
        dummy.scale.set(kw * 0.82, 1, kd * 0.78);
        dummy.updateMatrix();
        m.setMatrixAt(i++, dummy.matrix);
      }
    }
    m.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, cols * rows]}>
      <boxGeometry args={[1, 0.008, 1]} />
      <meshStandardMaterial color="#26282e" roughness={0.6} metalness={0.1} />
    </instancedMesh>
  );
}

/* ----------------------------------------------------------- Canvas ---- */

export default function HeroScene({ light = false }: { light?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.7, 6.8], fov: 30 }}
      onCreated={({ camera }) => camera.lookAt(0, 0.95, 0)}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={light ? 0.5 : 0.25} />
      <directionalLight position={[3, 6, 4]} intensity={light ? 1.4 : 1.1} />

      {/* Procedural studio — softboxes the aluminium can reflect. No HDR
          download: that would be a 1–2MB external fetch for the hero. */}
      <Environment frames={1} resolution={256}>
        <Lightformer form="rect" intensity={light ? 2.2 : 1.6} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={1.4} color="#c6bcfb" position={[-5, 1.5, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={1.1} color="#bfefff" position={[5, 1, 1]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={0.6} position={[0, 1, -5]} scale={[8, 3, 1]} />
      </Environment>

      <Laptop light={light} />

      {/* Real contact shadow — the single biggest "it's physical" cue. */}
      <ContactShadows
        position={[0, -0.001, 0]}
        opacity={light ? 0.62 : 0.75}
        scale={9}
        blur={2.2}
        far={2.5}
        resolution={512}
        color={light ? "#2b2440" : "#000000"}
      />
    </Canvas>
  );
}
