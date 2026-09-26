"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { profile } from "@/lib/data/profile";

/**
 * Four candidate heroes, rendered one after another on /hero-lab so they can
 * be compared on the real site. Whichever is chosen replaces <Hero />; the
 * rest are deleted.
 */

const ease = [0.16, 1, 0.3, 1] as const;

const reelA = [
  "doodl-space",
  "robgence-production",
  "kindly-objects",
  "eye-instruments-india",
  "virusha-tech",
  "joyeux",
  "blue-barrows",
];
const reelB = [
  "meridian-motors",
  "shipturtle",
  "studio-atelier",
  "kazanan-agro",
  "vaatalya",
  "oryn",
  "hedge-homes",
];

function Label({ letter, name }: { letter: string; name: string }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-24 z-30 -translate-x-1/2 flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-canvas shadow-lg">
      <span className="font-semibold">{letter}</span>
      <span className="opacity-60">·</span>
      {name}
    </div>
  );
}

function Ctas({ center = false }: { center?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${center ? "justify-center" : ""}`}>
      <Button href="/portfolio" variant="secondary" size="lg" arrow>
        View selected work
      </Button>
      <Button href="/contact" variant="outline" size="lg">
        Start a project
      </Button>
    </div>
  );
}

/* ================================================= A · Type + work reel == */

export function HeroReel() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-32">
      <Label letter="A" name="Type + work reel" />

      <div className="container-page relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint"
        >
          Senior Web Developer · AI Automation Engineer
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.05 }}
          className="mt-5 max-w-5xl font-display text-[clamp(2.8rem,7.5vw,6.5rem)] leading-[0.95] tracking-[-0.04em]"
        >
          I build websites businesses run on — and the AI that works behind them.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10"
        >
          <Ctas />
        </motion.div>
      </div>

      {/* Tilted, drifting wall of real project mockups. */}
      <div className="relative mt-16 h-[46vh] min-h-[320px] [perspective:1400px]" aria-hidden>
        <div className="absolute inset-x-[-10%] top-0 space-y-5 [transform:rotateX(24deg)_rotateZ(-7deg)] [transform-origin:50%_0%]">
          {[reelA, reelB].map((row, r) => (
            <div key={r} className="flex overflow-hidden">
              <div
                className={`flex w-max shrink-0 gap-5 pr-5 ${r === 0 ? "animate-marquee" : "animate-marquee"}`}
                style={r === 1 ? { animationDirection: "reverse" } : undefined}
              >
                {[...row, ...row].map((slug, i) => (
                  <div
                    key={`${slug}-${i}`}
                    className="aspect-[4/3] w-[300px] shrink-0 overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_60px_-30px_rgba(20,10,60,0.45)] sm:w-[380px]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/projects/${slug}.jpg`} alt="" className="size-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Fade the wall into the page at both edges and the bottom. */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--canvas),transparent_14%,transparent_86%,var(--canvas))]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,var(--canvas),transparent)]" />
      </div>
    </section>
  );
}

/* ======================================== B · Portrait + floating cards == */

function FloatCard({
  className,
  delay,
  children,
}: {
  className: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease, delay }}
      className={`glass absolute rounded-2xl px-4 py-3 shadow-[0_20px_50px_-20px_rgba(20,10,60,0.35)] ${className}`}
    >
      <div className="animate-float" style={{ animationDelay: `${-delay * 3}s` }}>
        {children}
      </div>
    </motion.div>
  );
}

export function HeroPortrait() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32">
      <Label letter="B" name="Portrait + floating cards" />
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[13px] text-muted"
          >
            <span className="size-1.5 rounded-full bg-emerald-400" /> Available for select projects
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="mt-7 font-display text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.04em]"
          >
            Hi, I&apos;m Rajat.
            <br />
            <span className="text-accent">I build for the web.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted"
          >
            Senior Web Developer &amp; AI Automation Engineer. Shopify, Webflow, WordPress and
            custom builds — plus the automation that keeps them running.
          </motion.p>
          <div className="mt-9">
            <Ctas />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[460px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-line shadow-[0_50px_120px_-50px_var(--glow-a)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/rajat-portrait.jpg"
              alt={profile.name}
              className="size-full object-cover object-[50%_20%]"
            />
          </motion.div>

          <FloatCard className="-left-8 top-10 sm:-left-14" delay={0.35}>
            <p className="font-display text-3xl leading-none">29</p>
            <p className="mt-1 text-xs text-muted">sites shipped</p>
          </FloatCard>
          <FloatCard className="-right-4 top-1/3 sm:-right-12" delay={0.5}>
            <p className="text-xs text-muted">Builds on</p>
            <p className="mt-1 text-sm font-medium">Shopify · Webflow · WordPress</p>
          </FloatCard>
          <FloatCard className="-left-6 bottom-20 sm:-left-16" delay={0.65}>
            <p className="text-sm font-medium">Chief of Staff</p>
            <p className="text-xs text-accent">ProductOS</p>
          </FloatCard>
          <FloatCard className="-right-2 bottom-6 sm:-right-8" delay={0.8}>
            <p className="font-display text-3xl leading-none">5+</p>
            <p className="mt-1 text-xs text-muted">years building</p>
          </FloatCard>
        </div>
      </div>
    </section>
  );
}

/* ============================================ C · Interactive shader ===== */

const FRAG = `
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse;
// soft flowing mesh gradient in the brand colours
vec3 c1=vec3(0.486,0.361,1.0);  // iris
vec3 c2=vec3(0.133,0.827,0.933);// cyan
vec3 c3=vec3(1.0,0.541,0.357);  // ember
vec3 c4=vec3(0.965,0.965,0.98); // canvas
float n(vec2 p){return sin(p.x)*sin(p.y);}
void main(){
  vec2 uv=gl_FragCoord.xy/uRes; vec2 p=uv; p.x*=uRes.x/uRes.y;
  float t=uTime*0.08;
  vec2 m=uMouse*vec2(uRes.x/uRes.y,1.0);
  float d=length(p-m);
  vec2 q=p+0.35*vec2(n(p*2.1+t*3.0),n(p*1.7-t*2.0))+0.08*vec2(sin(d*6.0-uTime*0.9));
  float a=0.5+0.5*sin(q.x*2.2+t*4.0);
  float b=0.5+0.5*sin(q.y*2.6-t*3.0+1.3);
  vec3 col=mix(c1,c2,a);
  col=mix(col,c3,b*0.45);
  col=mix(col,c4,smoothstep(0.15,1.1,uv.y)*0.55);
  col+=0.10*exp(-d*3.0);
  gl_FragColor=vec4(col,1.0);
}`;

function ShaderCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}"));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    let raf = 0;
    const start = performance.now();
    const frame = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(frame);
    };
    frame();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 size-full" aria-hidden />;
}

export function HeroShader() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <Label letter="C" name="Interactive gradient" />
      <ShaderCanvas />
      {/* grain + soft vignette so the gradient reads as material, not a flat fill */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,8,30,0.18))]" />
      <div className="container-page relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="font-display text-[clamp(3.2rem,10vw,8.5rem)] leading-[0.9] tracking-[-0.045em] text-[#0f0c1d]"
        >
          Rajat Bharti
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#2a2540]"
        >
          Senior Web Developer &amp; AI Automation Engineer — fast, beautiful web products and the
          automation that runs quietly behind them.
        </motion.p>
        <div className="mt-10">
          <Ctas center />
        </div>
      </div>
    </section>
  );
}

/* ============================================= D · Minimal editorial ===== */

export function HeroEditorial() {
  return (
    <section className="relative overflow-hidden pb-20 pt-36">
      <Label letter="D" name="Minimal editorial" />
      <div className="container-page">
        <div className="flex items-center justify-between border-b border-line pb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          <span>Rajat Bharti</span>
          <span className="hidden sm:inline">Web · E-commerce · AI automation</span>
          <span>Est. 2020</span>
        </div>

        <div className="mt-14 grid items-end gap-10 lg:grid-cols-[1.6fr_1fr]">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="font-display text-[clamp(2.8rem,7vw,6.2rem)] leading-[0.95] tracking-[-0.04em]"
          >
            I design and build websites that businesses{" "}
            <em className="text-accent not-italic">actually run on.</em>
          </motion.h1>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              29 sites across Shopify, Webflow and WordPress — plus the AI automation behind them.
              Senior Web Developer at Virusha, Chief of Staff at ProductOS.
            </p>
            <Ctas />
          </div>
        </div>

        <motion.a
          href="/portfolio/doodl-space"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="group relative mt-16 block aspect-[21/9] overflow-hidden rounded-[2rem] border border-line"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/projects/doodl-space.jpg" alt="Doodl Space" className="size-full object-cover object-[center_40%]" />
          <span className="glass absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-ink">
            Featured · Doodl Space
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
