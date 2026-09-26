"use client";

import { useEffect, useRef, useState } from "react";
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

/* ================================================= E · Bento grid ======== */

export function HeroBento() {
  const tile =
    "overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_20px_50px_-30px_rgba(20,10,60,0.35)]";
  return (
    <section className="relative pb-16 pt-36">
      <Label letter="E" name="Bento grid" />
      <div className="container-page">
        <div className="grid auto-rows-[minmax(140px,auto)] gap-4 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className={`${tile} flex flex-col justify-between p-8 md:col-span-2 md:row-span-2`}
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-600">
              <span className="size-1.5 rounded-full bg-emerald-500" /> Available for select projects
            </span>
            <div>
              <h1 className="mt-10 font-display text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.04em]">
                Rajat Bharti
              </h1>
              <p className="mt-4 max-w-md text-muted">
                Senior Web Developer &amp; AI Automation Engineer. Websites businesses run on — and
                the automation behind them.
              </p>
              <div className="mt-8">
                <Ctas />
              </div>
            </div>
          </motion.div>

          {[
            { slug: "doodl-space", span: "md:col-span-2" },
            { slug: "kindly-objects", span: "" },
            { slug: "robgence-production", span: "" },
          ].map((t, i) => (
            <motion.a
              key={t.slug}
              href={`/portfolio/${t.slug}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.08 }}
              className={`${tile} group relative min-h-[220px] ${t.span}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/projects/${t.slug}.jpg`} alt="" className="absolute inset-0 size-full object-cover" />
            </motion.a>
          ))}

          <div className={`${tile} flex flex-col justify-end p-6`}>
            <p className="font-display text-5xl leading-none">29</p>
            <p className="mt-2 text-sm text-muted">sites shipped</p>
          </div>
          <div className={`${tile} flex flex-col justify-end p-6`}>
            <p className="font-display text-5xl leading-none">5+</p>
            <p className="mt-2 text-sm text-muted">years building</p>
          </div>
          <div className={`${tile} flex flex-wrap content-end gap-2 p-6 md:col-span-2`}>
            {["Shopify", "Webflow", "WordPress", "WooCommerce", "Next.js", "n8n", "AI Agents"].map((s) => (
              <span key={s} className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-sm">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================== F · Dark spotlight reveal ====== */

const spotlightSlugs = [
  "doodl-space", "robgence-production", "kindly-objects", "eye-instruments-india",
  "virusha-tech", "joyeux", "blue-barrows", "meridian-motors", "shipturtle",
  "studio-atelier", "kazanan-agro", "oryn",
];

export function HeroSpotlight() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--sx", `${e.clientX - r.left}px`);
      el.style.setProperty("--sy", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#07060c] [--sx:50%] [--sy:45%]"
    >
      <Label letter="F" name="Dark spotlight reveal" />
      {/* Work grid, only visible inside the cursor's spotlight */}
      {/* Faint base layer so the work is hinted even before the cursor moves */}
      <div className="absolute inset-[-4%] grid grid-cols-4 gap-4 p-4 opacity-[0.13]" aria-hidden>
        {spotlightSlugs.map((s) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={s} src={`/projects/${s}.jpg`} alt="" className="aspect-[4/3] w-full rounded-2xl object-cover" />
        ))}
      </div>
      <div
        className="absolute inset-[-4%] grid grid-cols-4 gap-4 p-4"
        style={{
          WebkitMaskImage: "radial-gradient(420px circle at var(--sx) var(--sy), black 0%, black 35%, transparent 75%)",
          maskImage: "radial-gradient(420px circle at var(--sx) var(--sy), black 0%, black 35%, transparent 75%)",
        }}
        aria-hidden
      >
        {spotlightSlugs.map((s) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={s} src={`/projects/${s}.jpg`} alt="" className="aspect-[4/3] w-full rounded-2xl object-cover" />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(7,6,12,0.55)_20%,rgba(7,6,12,0.2)_55%,#07060c_95%)]" />

      <div className="container-page pointer-events-none relative z-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
          Move your cursor to see the work
        </p>
        <h1 className="mt-6 font-display text-[clamp(3.4rem,11vw,9.5rem)] leading-[0.88] tracking-[-0.045em] text-white">
          Rajat Bharti
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/65">
          Senior Web Developer &amp; AI Automation Engineer.
        </p>
        <div className="pointer-events-auto mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/portfolio" variant="secondary" size="lg" arrow>
            View selected work
          </Button>
          <a
            href="/contact"
            className="inline-flex h-13 items-center rounded-full border border-white/30 px-7 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
          >
            Start a project
          </a>
        </div>
      </div>
    </section>
  );
}

/* ========================================== G · Fanned card stack ======= */

const fanSlugs = ["virusha-tech", "kindly-objects", "robgence-production", "doodl-space", "joyeux"];

export function HeroFan() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32">
      <Label letter="G" name="Fanned project stack" />
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="font-display text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.04em]"
          >
            Rajat Bharti
          </motion.h1>
          <p className="mt-4 text-xl text-accent">Senior Web Developer &amp; AI Automation Engineer</p>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Storefronts, marketing sites and web apps across Shopify, Webflow and WordPress — and the
            AI automation that keeps them fed.
          </p>
          <div className="mt-9">
            <Ctas />
          </div>
        </div>

        {/* Hover the stack to fan it open */}
        <div className="group relative mx-auto h-[380px] w-full max-w-[520px] [perspective:1600px] sm:h-[440px]">
          {fanSlugs.map((s, i) => {
            const mid = (fanSlugs.length - 1) / 2;
            const k = i - mid;
            return (
              <motion.div
                key={s}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.07 }}
                className="absolute inset-x-[10%] top-[12%] aspect-[4/3]"
                style={{ zIndex: i }}
              >
                <div
                  className="size-full overflow-hidden rounded-2xl border border-white/70 shadow-[0_40px_80px_-30px_rgba(20,10,60,0.5)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform:translateX(calc(var(--k)*34px))_translateY(calc(var(--k)*-6px))_rotateZ(calc(var(--k)*5deg))] group-hover:[transform:translateX(calc(var(--k)*84px))_translateY(calc(var(--k)*-2px))_rotateZ(calc(var(--k)*9deg))]"
                  style={{ ["--k" as string]: k, transformOrigin: "50% 120%" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/projects/${s}.jpg`} alt="" className="size-full object-cover" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ========================================== H · Rotating statement ====== */

const rotatingWords = ["storefronts", "brand sites", "web apps", "AI automations", "landing pages"];

export function HeroRotating() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % rotatingWords.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-32">
      <Label letter="H" name="Rotating statement" />
      <div className="container-page">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
          Rajat Bharti · Senior Web Developer &amp; AI Automation Engineer
        </p>
        <h1 className="mt-8 font-display text-[clamp(3rem,9vw,8rem)] leading-[0.92] tracking-[-0.045em]">
          I build
          <br />
          <span className="relative inline-block h-[1.05em] overflow-hidden align-bottom">
            <motion.span
              key={rotatingWords[i]}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.6, ease }}
              className="inline-block bg-[linear-gradient(100deg,var(--color-brand-500),var(--color-cyan-glow))] bg-clip-text text-transparent"
            >
              {rotatingWords[i]}
            </motion.span>
          </span>
          <br />
          that businesses run on.
        </h1>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-8">
          <Ctas />
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-faint">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Built for</span>
            {["Doodl Space", "Robgence", "Shipturtle", "Kindly Objects", "Blue Barrows"].map((c) => (
              <span key={c} className="font-medium text-muted">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== B+ · 3D avatar, layered parallax ========= */

/**
 * Hero B rebuilt around a 3D-rendered avatar. The avatar, the glow behind it
 * and the floating cards sit on different Z planes inside one preserve-3d
 * stage that tilts with the cursor — so they shift against each other the
 * way a real object does, instead of moving as one flat picture.
 */
export function HeroAvatar3D({
  src,
  letter,
  name,
  fadeBottom = false,
}: {
  src: string;
  letter: string;
  name: string;
  /** Waist-up renders end in a hard crop line; fade it into the page. */
  fadeBottom?: boolean;
}) {
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    let raf = 0;
    const cur = { x: 0, y: 0 };
    const tgt = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      tgt.x = (e.clientX / window.innerWidth) * 2 - 1;
      tgt.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const tick = () => {
      cur.x += (tgt.x - cur.x) * 0.07;
      cur.y += (tgt.y - cur.y) * 0.07;
      el.style.transform = `rotateY(${cur.x * 14}deg) rotateX(${-cur.y * 10}deg)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const card = "glass absolute rounded-2xl px-4 py-3 shadow-[0_24px_50px_-20px_rgba(20,10,60,0.4)]";

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32">
      <Label letter={letter} name={name} />
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
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

        <div className="relative mx-auto aspect-[4/5] w-full max-w-[480px] [perspective:1100px]">
          <div ref={stage} className="absolute inset-0 [transform-style:preserve-3d] will-change-transform">
            {/* Back plane: glow disc + ring */}
            <div
              className="absolute inset-[8%] rounded-full [transform:translateZ(-80px)]"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--color-brand-500) 55%, transparent), color-mix(in oklab, var(--color-cyan-glow) 25%, transparent) 55%, transparent 72%)",
              }}
            />
            <div className="absolute inset-[4%] rounded-full border border-line-strong [transform:translateZ(-60px)]" />

            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease }}
              className="absolute inset-0 [transform:translateZ(0px)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={profile.name}
                className="size-full object-contain object-bottom drop-shadow-[0_40px_60px_rgba(20,10,60,0.35)]"
                style={
                  fadeBottom
                    ? {
                        WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
                        maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
                      }
                    : undefined
                }
              />
            </motion.div>

            {/* Front plane: floating cards */}
            <div className={`${card} -left-6 top-[14%] [transform:translateZ(90px)] sm:-left-12`}>
              <p className="font-display text-3xl leading-none">29</p>
              <p className="mt-1 text-xs text-muted">sites shipped</p>
            </div>
            <div className={`${card} -right-4 top-[38%] [transform:translateZ(130px)] sm:-right-10`}>
              <p className="text-xs text-muted">Builds on</p>
              <p className="mt-1 text-sm font-medium">Shopify · Webflow · WordPress</p>
            </div>
            <div className={`${card} -left-4 bottom-[18%] [transform:translateZ(110px)] sm:-left-14`}>
              <p className="text-sm font-medium">Chief of Staff</p>
              <p className="text-xs text-accent">ProductOS</p>
            </div>
            <div className={`${card} right-2 bottom-[4%] [transform:translateZ(70px)]`}>
              <p className="font-display text-3xl leading-none">5+</p>
              <p className="mt-1 text-xs text-muted">years building</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================= I · Mouse-scrub 3D video (turns with cursor) ==== */

/**
 * A pre-rendered clip of the 3D avatar turning from one side to the other.
 * Horizontal mouse movement scrubs it backward/forward, so the character
 * appears to follow the cursor. Seeks are queued through `seeked` so fast
 * mouse moves can't flood the decoder.
 *
 * Until the clip exists (`/hero/rajat-turn.mp4`), the still avatar is shown.
 */
const SCRUB_SENSITIVITY = 0.8;

function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);
  return { displayed, done };
}

export function HeroScrub({ video = "/hero/rajat-turn.mp4" }: { video?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(false);
  const [pillsIn, setPillsIn] = useState(false);
  const [copied, setCopied] = useState(false);
  const { displayed, done } = useTypewriter(
    "Glad you stopped by. I build websites businesses run on — so, what are we building?",
  );

  useEffect(() => {
    const t = setTimeout(() => setPillsIn(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let prevX: number | null = null;
    let target = 0;
    let seeking = false;
    const seek = () => {
      if (!v.duration) return;
      if (Math.abs(v.currentTime - target) < 0.01) return;
      seeking = true;
      v.currentTime = target;
    };
    const onSeeked = () => {
      seeking = false;
      if (Math.abs(v.currentTime - target) > 0.01) seek();
    };
    const onMove = (e: MouseEvent) => {
      if (prevX === null) {
        prevX = e.clientX;
        return;
      }
      const delta = e.clientX - prevX;
      prevX = e.clientX;
      if (!v.duration) return;
      target = Math.min(v.duration, Math.max(0, target + (delta / window.innerWidth) * SCRUB_SENSITIVITY * v.duration));
      if (!seeking) seek();
    };
    const onReady = () => {
      setHasVideo(true);
      target = v.duration / 2; // start facing forward, mid-turn
      seek();
    };
    v.addEventListener("seeked", onSeeked);
    v.addEventListener("loadedmetadata", onReady);
    if (v.readyState >= 1) onReady();
    window.addEventListener("mousemove", onMove);
    return () => {
      v.removeEventListener("seeked", onSeeked);
      v.removeEventListener("loadedmetadata", onReady);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const email = profile.email;
  const pill =
    "inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-[0.3em] text-[13px] transition-colors duration-200 sm:px-5 sm:text-[15px] mx-[0.2em] mb-[0.4em]";

  return (
    <section className="relative flex h-screen flex-col justify-end overflow-hidden bg-[#0b0a12] px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0">
      <Label letter="I" name="Mouse-scrub 3D (turns with cursor)" />

      {/* Clip, or the still avatar until the clip is added */}
      <video
        ref={ref}
        className={`absolute inset-0 size-full object-cover object-[70%_center] ${hasVideo ? "" : "hidden"}`}
        src={video}
        muted
        playsInline
        preload="auto"
        onError={() => setHasVideo(false)}
      />
      {hasVideo ? null : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,#2a2150,#0b0a12_70%)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/avatar-3d-character.webp"
            alt=""
            className="absolute bottom-0 right-[6%] h-[88%] w-auto object-contain [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
          />
        </div>
      )}
      {/* Legibility wash on the text side */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(8,7,14,0.75),rgba(8,7,14,0.2)_55%,transparent)]" />

      <div className="relative z-10 mx-auto w-full max-w-[80rem]">
        <div className="max-w-xl">
          <p
            className="pointer-events-none mb-5 select-none text-white sm:mb-6"
            style={{ fontSize: "clamp(18px,4vw,26px)", lineHeight: 1.3, filter: "blur(4px)" }}
          >
            Hey there, I&apos;m Rajat Bharti,
            <br />
            Senior Web Developer &amp; AI Automation Engineer
          </p>

          <p
            className="mb-5 text-white sm:mb-6"
            style={{ fontSize: "clamp(18px,4vw,26px)", lineHeight: 1.35, minHeight: 54 }}
          >
            {displayed}
            {done ? null : (
              <span className="ml-[2px] inline-block h-[1.1em] w-[2px] animate-[blink_1s_step-end_infinite] bg-white align-middle" />
            )}
          </p>

          <div
            className="flex flex-wrap gap-y-1"
            style={{
              opacity: pillsIn ? 1 : 0,
              transform: pillsIn ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {[
              { l: "Start a project", h: "/contact" },
              { l: "View selected work", h: "/portfolio" },
              { l: "See what I offer", h: "/services" },
              { l: "Read my resume", h: "/resume" },
            ].map((b) => (
              <a key={b.l} href={b.h} className={`${pill} border border-black/10 bg-white text-black hover:bg-black hover:text-white`}>
                {b.l}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(email);
                setCopied(true);
                setTimeout(() => setCopied(false), 1600);
              }}
              className={`${pill} gap-2 border border-white bg-transparent text-white hover:bg-white hover:text-black sm:gap-3`}
            >
              {copied ? "Copied!" : (
                <>
                  Email: <span className="underline underline-offset-1">{email}</span>
                </>
              )}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" />
                <rect x="1.5" y="1.5" width="7" height="7" rx="1" stroke="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
