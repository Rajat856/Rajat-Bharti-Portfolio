# Rajat Bharti — Portfolio & Resume

A premium personal portfolio for **Rajat Bharti**, Senior Web Developer & AI Automation Engineer.
Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion and Three.js.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
```

---

## What's in here

**10 pages**, all statically generated:

| Route | What it is |
| --- | --- |
| `/` | Hero with WebGL scene, stats, about, work showcase, services, skills, timeline, testimonials, blog, CTA |
| `/about` | Long-form bio, fact panel, principles, six-step process, education & awards |
| `/portfolio` | Filterable project grid |
| `/portfolio/[slug]` | Case study — brief, approach, deliverables, stack, outcomes |
| `/services` | Eight services in detail, process, three engagement models |
| `/skills` | Tabbed capability map with animated meters + full 62-skill index |
| `/experience` | Scroll-linked career timeline, education, awards |
| `/resume` | Print-optimised one-page resume (Cmd/Ctrl+P → clean PDF) |
| `/certifications` | Filterable certification grid |
| `/blog`, `/blog/[slug]` | Five long-form articles with reading progress |
| `/contact` | Validated contact form, direct channels, FAQ |

Plus `sitemap.xml`, `robots.txt`, generated `opengraph-image`, favicon/apple-icon, and a custom 404.

### Interaction & motion

Smooth scrolling (Lenis), custom two-part cursor, page transitions, scroll-triggered reveals,
word-by-word headline animation, magnetic buttons, 3D tilt cards, parallax, cursor-tracked
sheen, animated counters, marquees, and a WebGL hero scene.

### Progressive enhancement

The site is complete and fully functional without any of it:

- **WebGL** only mounts on `≥1024px` viewports, on devices reporting ≥4 cores / ≥4 GB, with a working
  WebGL context, no `save-data`, and no reduced-motion preference — and only after the browser
  goes idle, so it never competes with LCP. Otherwise a CSS-only orb renders (or nothing on mobile).
- **`prefers-reduced-motion`** disables Lenis, the custom cursor, tilt/magnetic effects and all
  Framer Motion animation (via `MotionConfig reducedMotion="user"`).
- **Light and dark themes**, no flash on load (inline `<head>` script), persisted to `localStorage`.
  The Three.js scene re-themes its materials too.

### Accessibility

Skip link, one `<h1>` per page, real tablist semantics with arrow-key navigation, labelled
controls, `aria-invalid` + `aria-describedby` on form errors, visible focus rings, `role="meter"`
on skill bars, and Escape/scroll-lock on the menu overlay.

---

## Editing content

All content is typed data — no CMS required. Nothing is hardcoded in components.

```
src/lib/data/
├── profile.ts         name, contact, summary, stats, socials
├── experience.ts      roles, education, awards
├── projects.ts        case studies
├── services.ts        services + process steps
├── skills.ts          skill groups, full skill index, toolbelt
├── certifications.ts  certifications
├── testimonials.ts    ⚠️ PLACEHOLDER — see below
└── posts.ts           blog posts (block-based, no MDX pipeline)
```

### Things to do before going live

1. **Replace the testimonials.** `src/lib/data/testimonials.ts` ships three clearly-marked
   placeholder quotes. The section renders a visible "Sample content" notice while any entry has
   `verified: false`. Swap in real quotes (LinkedIn recommendations work well) and set
   `verified: true`, or remove `<Testimonials />` from `src/app/page.tsx`.

2. **Verify the project metrics.** The `metrics` arrays in `src/lib/data/projects.ts` are
   illustrative placeholders. Replace them with real figures or delete the `metrics` key on any
   project you can't substantiate.

3. **Add project screenshots** (optional). Covers are generated artwork by default. Drop a real
   image at `public/projects/<slug>.jpg` and set `cover.image` on that project to use it.

4. **Add a resume PDF** (optional). `/resume` is print-optimised, so Cmd/Ctrl+P already produces a
   clean PDF. To serve a real file instead, put it at `public/Rajat-Bharti-Resume.pdf` and set
   `resumePdf` in `src/lib/data/profile.ts`. Every "resume" button switches to a direct download.

5. **Set the site URL.** Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` —
   it drives canonical URLs, Open Graph tags and the sitemap.

---

## Contact form

`POST /api/contact` validates server-side, blocks bots with a honeypot field, and rate-limits to
5 submissions per IP per 10 minutes.

Without `RESEND_API_KEY` + `CONTACT_TO_EMAIL` set, submissions are **logged to the server console**
rather than dropped, so local development works end to end. Set both to deliver email:

```bash
RESEND_API_KEY=re_xxxxx
CONTACT_TO_EMAIL=rajatbharti856@gmail.com
```

Using Resend's shared `onboarding@resend.dev` sender works for testing; verify your own domain
for production. Swapping in a different provider means editing one `fetch` call in
`src/app/api/contact/route.ts`.

> The in-memory rate limiter is per-instance. On serverless/multi-instance hosting, move it to
> Redis (Upstash) if you need a hard guarantee.

---

## Design system

Semantic CSS variables in `src/app/globals.css` (`--canvas`, `--surface`, `--ink`, `--muted`,
`--line`, `--accent`…) are redeclared per theme and exposed to Tailwind via `@theme`. Components use
`bg-surface` / `text-muted` and stay theme-agnostic — no `dark:` prefixes scattered through the JSX.

Typography: **Instrument Serif** (display), **Inter** (UI), **JetBrains Mono** (labels), all self-hosted
through `next/font` — no layout shift, no external requests.

Reusable primitives live in `src/components/ui/`: `Reveal`, `RevealText`, `Magnetic`, `TiltCard`,
`Button`, `SectionHeading`, `Badge`, `CountUp`, `Marquee`, `Aurora`, `Parallax`, `Spotlight`,
`Starfield`, `ProjectCover`, `PostCard`.

---

## Deploying

Push to a Git repo and import into Vercel — zero configuration needed. Set `NEXT_PUBLIC_SITE_URL`
(and the Resend variables if you want form email) in the project's environment settings.

Every route except `/api/contact` is prerendered as static HTML, so it also works on Netlify,
Cloudflare Pages, or any Node host via `npm run build && npm start`.
