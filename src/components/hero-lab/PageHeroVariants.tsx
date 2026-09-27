"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { profile } from "@/lib/data/profile";
import { experience } from "@/lib/data/experience";
import { allSkills, skillGroups, toolbelt } from "@/lib/data/skills";
import { certifications } from "@/lib/data/certifications";
import { posts } from "@/lib/data/posts";
import { projects } from "@/lib/data/projects";
import { graphics } from "@/lib/data/graphics";
import { responsiveImage } from "@/lib/utils";

/**
 * Candidate heroes for the remaining pages (About, Skills, Experience, Resume,
 * Certifications, Blog, Contact). Shown side by side on /hero-lab so a design
 * can be picked per page; the chosen ones get promoted into PageHeroes.tsx.
 */

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay: d },
});

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <motion.p
      {...fadeUp()}
      className={`font-mono text-[11px] uppercase tracking-[0.22em] ${light ? "text-white/55" : "text-faint"}`}
    >
      {children}
    </motion.p>
  );
}

const years = new Date().getFullYear() - 2020;

/* ─────────────────────────── A · Portrait Arch (About) ─────────────────── */
export function HeroPortraitArch() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden pt-28">
      <div className="pointer-events-none absolute -left-40 top-20 size-[520px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-brand-500)_22%,transparent),transparent_70%)] blur-2xl" />
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow>About · {profile.locationShort}</Eyebrow>
          <motion.h2 {...fadeUp(0.05)} className="mt-5 font-display text-[clamp(2.8rem,6.5vw,5.8rem)] leading-[0.95] tracking-[-0.04em]">
            I build the web,<br />
            <span className="italic text-accent">then automate it.</span>
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {profile.tagline} Six years across Shopify, Webflow, WordPress, custom web apps and the AI
            systems that run behind them.
          </motion.p>
          <motion.dl {...fadeUp(0.25)} className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
            {[
              [`${years}+`, "years"],
              [`${projects.length}`, "websites"],
              [`${graphics.length}`, "graphics"],
            ].map(([v, l]) => (
              <div key={l}>
                <dd className="font-display text-4xl tracking-tight">{v}</dd>
                <dt className="mt-1 text-xs text-faint">{l}</dt>
              </div>
            ))}
          </motion.dl>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.1 }}
          className="relative mx-auto w-full max-w-[420px]"
        >
          <div className="absolute -inset-6 animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-line-strong" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2.5rem] border border-line bg-surface shadow-[0_40px_80px_-40px_rgba(20,10,60,0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.avatar} alt={profile.name} className="size-full object-cover" />
          </div>
          <div className="absolute -bottom-5 -left-6 rounded-2xl border border-line bg-surface px-4 py-3 text-sm shadow-xl">
            <span className="mr-2 inline-block size-2 rounded-full bg-emerald-500" />
            {profile.availability}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── B · Skill Cloud (Skills) ──────────────────── */
export function HeroSkillCloud() {
  const rows = [allSkills.slice(0, 22), allSkills.slice(22, 44), allSkills.slice(44)];
  return (
    <section className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden pt-28">
      <div className="absolute inset-0 flex flex-col justify-center gap-5 opacity-[0.55] [mask-image:radial-gradient(ellipse_at_center,transparent_18%,black_70%)]" aria-hidden>
        {rows.map((row, r) => (
          <div key={r} className="flex overflow-hidden">
            <div
              className="flex w-max shrink-0 gap-3 pr-3 animate-marquee-slow"
              style={{ animationDirection: r % 2 ? "reverse" : "normal", animationDuration: `${60 + r * 15}s` }}
            >
              {[...row, ...row].map((s, i) => (
                <span key={i} className="whitespace-nowrap rounded-full border border-line bg-surface px-5 py-2.5 text-lg text-muted">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="container-page relative z-10 text-center">
        <Eyebrow>Skills · {allSkills.length} and counting</Eyebrow>
        <motion.h2 {...fadeUp(0.05)} className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.8rem,7vw,6.2rem)] leading-[0.94] tracking-[-0.04em]">
          The full <span className="bg-[linear-gradient(100deg,var(--color-brand-500),var(--color-cyan-glow))] bg-clip-text text-transparent">capability map</span>
        </motion.h2>
        <motion.div {...fadeUp(0.2)} className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
          {skillGroups.map((g) => (
            <span key={g.id} className="rounded-full px-4 py-1.5 text-sm font-medium text-white" style={{ background: g.accent }}>
              {g.title}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── C · Career Rail (Experience) ──────────────── */
export function HeroCareerRail() {
  const path = [...experience].reverse();
  return (
    <section className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden pt-28">
      <div className="container-page">
        <Eyebrow>Experience · 2020 — Now</Eyebrow>
        <motion.h2 {...fadeUp(0.05)} className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,6.5vw,5.8rem)] leading-[0.95] tracking-[-0.04em]">
          Six years, four companies, <span className="text-accent">one direction.</span>
        </motion.h2>
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-[9px] h-px bg-line" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease, delay: 0.3 }}
            className="absolute left-0 right-0 top-[9px] h-[2px] origin-left bg-[linear-gradient(90deg,var(--color-brand-500),var(--color-cyan-glow))]"
          />
          <ol className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
            {path.map((j, i) => (
              <motion.li key={j.id} {...fadeUp(0.4 + i * 0.15)}>
                <span className={`block size-5 rounded-full border-2 ${j.current ? "border-accent bg-accent" : "border-line-strong bg-canvas"}`} />
                <p className="mt-5 font-mono text-xs text-faint">{j.start.split(" ")[1]}</p>
                <p className="mt-1 font-display text-2xl tracking-tight">{j.company}</p>
                <p className="mt-1 text-sm text-muted">{j.role}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── D · Paper Stack (Resume) ──────────────────── */
export function HeroPaperStack() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden pt-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Eyebrow>Resume · one page</Eyebrow>
          <motion.h2 {...fadeUp(0.05)} className="mt-5 font-display text-[clamp(2.8rem,6.5vw,5.8rem)] leading-[0.95] tracking-[-0.04em]">
            Everything, on a single sheet.
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Experience, skills, education and certifications — print-ready, so Save as PDF gives you a clean copy.
          </motion.p>
          <motion.div {...fadeUp(0.25)} className="mt-9 flex flex-wrap gap-3">
            <Button href="#" variant="secondary" size="lg" arrow>Download PDF</Button>
            <Button href="/contact" variant="outline" size="lg">Get in touch</Button>
          </motion.div>
        </div>
        <div className="relative mx-auto h-[520px] w-full max-w-[420px]">
          {[-9, 5, 0].map((rot, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: rot }}
              transition={{ duration: 1, ease, delay: 0.15 + i * 0.12 }}
              className="absolute inset-0 rounded-xl border border-line bg-white p-9 shadow-[0_30px_60px_-30px_rgba(20,10,60,0.45)]"
            >
              {i === 2 ? (
                <div className="text-[#101014]">
                  <p className="font-display text-3xl tracking-tight">{profile.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#6440e8]">{profile.role}</p>
                  {experience.slice(0, 3).map((j) => (
                    <div key={j.id} className="mt-6">
                      <p className="text-sm font-semibold">{j.role}</p>
                      <p className="text-xs text-[#6b6b75]">{j.company} · {j.start}</p>
                      <div className="mt-2 space-y-1.5">
                        <div className="h-1.5 w-full rounded bg-[#ececf1]" />
                        <div className="h-1.5 w-4/5 rounded bg-[#ececf1]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── E · Badge Orbit (Certifications) ─────────── */
export function HeroBadgeOrbit() {
  const issuers = Array.from(new Set(certifications.map((c) => c.issuer)));
  return (
    <section className="relative flex min-h-[92svh] items-center justify-center overflow-hidden pt-28">
      {[340, 480].map((r, ring) => (
        <div
          key={r}
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-line"
          style={{ width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r + 40 }}
          aria-hidden
        >
          {issuers.map((iss, i) =>
            i % 2 === ring ? (
              <span
                key={iss}
                className="absolute left-1/2 top-1/2"
                style={{ transform: `rotate(${(i * 360) / issuers.length + 20}deg) translateY(-${r}px) rotate(-${(i * 360) / issuers.length + 20}deg)` }}
              >
                <span className="block -translate-x-1/2 -translate-y-1/2">
                  <span
                    className="block animate-[float_6s_ease-in-out_infinite] whitespace-nowrap rounded-full border border-line bg-surface px-4 py-2 text-xs text-muted shadow-lg"
                    style={{ animationDelay: `${i * 0.7}s` }}
                  >
                    {iss}
                  </span>
                </span>
              </span>
            ) : null,
          )}
        </div>
      ))}
      <div className="container-page relative z-10 text-center">
        <Eyebrow>Certifications</Eyebrow>
        <motion.h2 {...fadeUp(0.05)} className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.94] tracking-[-0.04em]">
          {certifications.length} credentials,<br />
          <span className="text-accent">{issuers.length} institutions.</span>
        </motion.h2>
        <motion.p {...fadeUp(0.15)} className="mx-auto mt-6 max-w-xl text-lg text-muted">
          From Microsoft and Google to IIT Kanpur — the formal side of the toolkit.
        </motion.p>
      </div>
    </section>
  );
}

/* ─────────────────────────── F · Editorial Masthead (Blog) ─────────────── */
export function HeroEditorial() {
  const lead = posts.find((p) => p.featured) ?? posts[0];
  return (
    <section className="relative overflow-hidden pb-16 pt-32">
      <div className="container-page">
        <div className="flex items-end justify-between border-b-2 border-ink pb-4">
          <motion.h2 {...fadeUp()} className="font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.82] tracking-[-0.05em]">
            Field Notes
          </motion.h2>
          <p className="hidden text-right font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-faint sm:block">
            Issue {String(posts.length).padStart(2, "0")}<br />Web · SEO · Automation
          </p>
        </div>
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <motion.a
            href={`/blog/${lead.slug}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.1 }}
            className="group relative block aspect-[16/10] overflow-hidden rounded-3xl border border-line"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img {...responsiveImage(lead.cover.image)} sizes="60vw" alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          </motion.a>
          <motion.div {...fadeUp(0.2)}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Featured · {lead.category}</p>
            <p className="mt-3 font-display text-4xl leading-tight tracking-tight">{lead.title}</p>
            <p className="mt-4 text-muted">{lead.excerpt}</p>
            <p className="mt-5 text-sm text-faint">{lead.date} · {lead.readingTime}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── G · Chat Hello (Contact) ──────────────────── */
function LiveClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () =>
      setT(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }));
    f();
    const id = setInterval(f, 30000);
    return () => clearInterval(id);
  }, []);
  return <>{t}</>;
}
export function HeroChatHello() {
  const msgs = [
    { me: false, text: "Hey Rajat 👋 we need a new Shopify store." },
    { me: true, text: "Love it. What are you selling, and when do you want to launch?" },
    { me: false, text: "Handmade décor — ideally in 6 weeks." },
    { me: true, text: "Doable. Send me the brief and I'll reply within a day." },
  ];
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden pt-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <motion.h2 {...fadeUp(0.05)} className="mt-5 font-display text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.92] tracking-[-0.045em]">
            Let&apos;s talk.
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="mt-6 max-w-lg text-lg text-muted">
            Websites, stores, web apps or automation — tell me what you&apos;re building.
          </motion.p>
          <motion.div {...fadeUp(0.25)} className="mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-surface px-5 py-2.5 text-sm">
            <span className="relative flex size-2.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" /></span>
            Online · Bengaluru <span className="text-faint">·</span> <LiveClock /> IST
          </motion.div>
        </div>
        <div className="mx-auto w-full max-w-md rounded-[2rem] border border-line bg-surface p-5 shadow-[0_40px_80px_-40px_rgba(20,10,60,0.5)]">
          <div className="flex items-center gap-3 border-b border-line pb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.avatar} alt="" className="size-10 rounded-full object-cover" />
            <div><p className="text-sm font-medium">{profile.name}</p><p className="text-xs text-emerald-600">typically replies within a day</p></div>
          </div>
          <div className="space-y-3 pt-5">
            {msgs.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease, delay: 0.5 + i * 0.7 }}
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.me ? "ml-auto rounded-br-md bg-accent text-white" : "rounded-bl-md bg-surface-2"}`}
              >
                {m.text}
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.4 }} className="flex w-16 gap-1 rounded-2xl bg-surface-2 px-4 py-3">
              {[0, 1, 2].map((d) => <span key={d} className="size-1.5 animate-bounce rounded-full bg-faint" style={{ animationDelay: `${d * 0.15}s` }} />)}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── H · Giant Outline Type (any page) ────────── */
export function HeroGiantType({ word = "ABOUT" }: { word?: string }) {
  return (
    <section className="relative flex min-h-[80svh] flex-col justify-end overflow-hidden pb-16 pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_20%,color-mix(in_oklab,var(--color-brand-500)_20%,transparent),transparent_70%),radial-gradient(ellipse_50%_40%_at_10%_80%,color-mix(in_oklab,var(--color-cyan-glow)_16%,transparent),transparent_70%)]" />
      <div className="container-page relative">
        <motion.p
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease }}
          className="select-none font-display text-[clamp(5rem,20vw,19rem)] leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_var(--ink)]"
          aria-hidden
        >
          {word}
        </motion.p>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
          <motion.h2 {...fadeUp(0.2)} className="max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            A developer who designs, and an engineer who automates.
          </motion.h2>
          <Button href="/contact" variant="secondary" size="lg" arrow>Start a project</Button>
        </div>
      </div>
    </section>
  );
}

export { BentoHero as HeroBento } from "@/components/sections/PageHeroes";

/* ─────────────────────────── J · Magnetic Tilt Title (any page) ────────── */
export function HeroTiltTitle({ eyebrow = "Skills", title = "Tools I reach for, every day." }: { eyebrow?: string; title?: string }) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 18 });
  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      className="relative flex min-h-[85svh] items-center justify-center overflow-hidden bg-[#07060c] pt-28 [perspective:1200px]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="container-page relative text-center [transform-style:preserve-3d]">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.8rem,7vw,6.4rem)] leading-[0.94] tracking-[-0.04em] text-white [transform:translateZ(60px)]">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/65 [transform:translateZ(30px)]">
          Move your cursor — the headline floats in 3D.
        </p>
      </motion.div>
    </section>
  );
}
