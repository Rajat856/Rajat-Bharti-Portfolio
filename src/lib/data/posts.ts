/**
 * Blog content. Bodies are authored as lightweight blocks so posts render
 * without an MDX pipeline — swap this for MDX/a CMS later without touching
 * the page components.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; lang: string; code: string };

export type Post = {
  slug: string;
  title: string;
  /** Shorter title for search results / share cards when `title` runs past ~45 chars. */
  seoTitle?: string;
  excerpt: string;
  date: string;
  dateISO: string;
  readingTime: string;
  category: "Performance" | "Automation" | "Design" | "SEO" | "Career";
  tags: string[];
  featured?: boolean;
  /** Gradient is the fallback; `image` (in /public/blog) takes over when set. */
  cover: { from: string; to: string; image?: string };
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "core-web-vitals-wordpress",
    title: "Core Web Vitals on WordPress: what actually moves the number",
    seoTitle: "WordPress Core Web Vitals: What Actually Works",
    excerpt:
      "Most WordPress speed advice is a list of plugins. Here's the shorter list of things that genuinely shift LCP, CLS and INP — in the order I do them on client sites.",
    date: "12 June 2026",
    dateISO: "2026-06-12",
    readingTime: "8 min read",
    category: "Performance",
    tags: ["WordPress", "Core Web Vitals", "Performance"],
    featured: true,
    cover: { from: "#7c5cff", to: "#22d3ee", image: "/blog/core-web-vitals-wordpress.jpg" },
    body: [
      {
        type: "p",
        text: "Every WordPress performance audit I inherit has the same shape: four caching plugins, three of them fighting each other, and a Lighthouse score that hasn't moved in a year. The plugins aren't the problem. The order of operations is.",
      },
      {
        type: "p",
        text: "Core Web Vitals measure three specific things, and each one has a small number of real causes. If you fix causes instead of installing tools, most sites get to green in a day.",
      },
      { type: "h2", text: "1. LCP is almost always an image or a font" },
      {
        type: "p",
        text: "Largest Contentful Paint is the moment the biggest thing above the fold finishes rendering. On nine out of ten marketing sites that's a hero image or a headline waiting on a web font.",
      },
      {
        type: "ul",
        items: [
          "Serve the hero as AVIF or WebP with explicit width and height attributes — no lazy-loading on the LCP element, ever.",
          "Preload the hero image and the single font file used in the headline. One preload each, not eight.",
          "Use font-display: swap and subset the font to the characters you actually ship.",
          "Kill the slider. Carousels above the fold are the single most reliable way to destroy LCP.",
        ],
      },
      { type: "h2", text: "2. CLS is a reservation problem" },
      {
        type: "p",
        text: "Cumulative Layout Shift happens when the browser doesn't know how much room something needs until it arrives. The fix is always the same: reserve the space up front.",
      },
      {
        type: "ul",
        items: [
          "Width and height (or aspect-ratio) on every image, iframe and video embed.",
          "Fixed min-height on ad slots, cookie banners and anything injected by a third-party script.",
          "Fallback fonts sized with size-adjust so the swap doesn't reflow the paragraph.",
        ],
      },
      { type: "h2", text: "3. INP is your JavaScript budget" },
      {
        type: "p",
        text: "Interaction to Next Paint replaced FID because FID was too forgiving. INP measures how long the page takes to respond after a real interaction — and on WordPress, the answer is usually 'after jQuery and six tracking scripts finish arguing'.",
      },
      {
        type: "ol",
        items: [
          "Open the Coverage panel and find the JavaScript that never executes on that template. Dequeue it per-page rather than globally.",
          "Move analytics, chat widgets and heatmaps behind an interaction or idle callback.",
          "Replace jQuery-dependent plugins on critical templates. One plugin swap often halves main-thread time.",
          "Defer everything that isn't required for the first interaction.",
        ],
      },
      { type: "h2", text: "The order I actually work in" },
      {
        type: "p",
        text: "Measure on real field data first — CrUX or Search Console, not a single Lighthouse run on your office fibre connection. Lab tools tell you what could be slow; field data tells you what is slow for the people you care about.",
      },
      {
        type: "quote",
        text: "A 95 in Lighthouse and a failing CrUX report means you optimized for the test, not the visitor.",
      },
      {
        type: "p",
        text: "Then: images, fonts, layout reservations, JavaScript diet, caching last. Caching is the amplifier — it makes a fast site faster and a slow site slow-but-cached.",
      },
    ],
  },
  {
    slug: "automation-that-does-not-break",
    title: "Building automations that don't quietly break",
    excerpt:
      "An n8n workflow that fails silently is worse than no workflow at all. The five things I add to every automation before it goes anywhere near production.",
    date: "28 April 2026",
    dateISO: "2026-04-28",
    readingTime: "6 min read",
    category: "Automation",
    tags: ["n8n", "Make.com", "Zapier", "Reliability"],
    featured: true,
    cover: { from: "#22d3ee", to: "#4e2fc0", image: "/blog/automation-that-does-not-break.jpg" },
    body: [
      {
        type: "p",
        text: "The failure mode nobody warns you about isn't the automation that crashes. It's the one that stops running in March and nobody notices until July, when someone asks why the pipeline report looks thin.",
      },
      {
        type: "p",
        text: "Every workflow I hand over gets the same five additions, regardless of platform. They take about twenty minutes and they are the difference between a demo and a system.",
      },
      { type: "h2", text: "1. An error branch that talks to a human" },
      {
        type: "p",
        text: "Every flow gets an error handler that posts to a Slack channel or an email alias with the workflow name, the failing step, and the payload that caused it. Not a log file someone would have to think to check.",
      },
      { type: "h2", text: "2. Retries with backoff — but bounded" },
      {
        type: "p",
        text: "Third-party APIs fail transiently. Three retries with exponential backoff handles the vast majority. What matters is that attempt four gives up loudly instead of retrying forever and burning your operation quota.",
      },
      { type: "h2", text: "3. Idempotency on anything that writes" },
      {
        type: "p",
        text: "If a workflow can create a record, it can create it twice. Dedupe on a stable external key before the write, not after. This is the single most common cause of 'why do we have four of this lead'.",
      },
      { type: "h2", text: "4. A human gate on anything AI generates" },
      {
        type: "p",
        text: "AI drafting is genuinely useful for follow-ups, summaries and classification. Fully autonomous AI sending client-facing email is a reputational risk with no upside. Draft, queue, approve, send.",
      },
      { type: "h2", text: "5. A heartbeat" },
      {
        type: "p",
        text: "A scheduled workflow that hasn't run is invisible. A daily heartbeat that pings a monitor makes absence loud. This is the one people skip and the one that catches the March-to-July failure.",
      },
      {
        type: "quote",
        text: "Automation is not about removing humans. It's about removing the parts of the job that a human does worse than a script — and keeping them exactly where judgement is required.",
      },
    ],
  },
  {
    slug: "wordpress-to-webflow-migration",
    title: "Migrating WordPress to Webflow without losing your rankings",
    seoTitle: "Move WordPress to Webflow Without Losing SEO",
    excerpt:
      "Replatforming is where SEO goes to die. A field-tested checklist for moving a site to Webflow and keeping every position you earned.",
    date: "3 March 2026",
    dateISO: "2026-03-03",
    readingTime: "9 min read",
    category: "SEO",
    tags: ["Webflow", "WordPress", "Migration", "SEO"],
    cover: { from: "#ff8a5b", to: "#7c5cff", image: "/blog/wordpress-to-webflow-migration.jpg" },
    body: [
      {
        type: "p",
        text: "A replatform is the highest-risk thing you can do to an organic channel. Done carelessly, six years of accumulated authority evaporates in a fortnight. Done properly, nothing happens at all — which is exactly the goal.",
      },
      { type: "h2", text: "Before you design anything: crawl the old site" },
      {
        type: "p",
        text: "Full crawl, exported. Every URL, its status code, its title, its meta description, its canonical, its inbound internal links. This export is your contract with the new site. You cannot map redirects for pages you didn't know existed.",
      },
      { type: "h2", text: "Build the redirect map before the build, not after" },
      {
        type: "ul",
        items: [
          "Every old URL maps to exactly one new URL, or is a deliberate, documented 410.",
          "301, never 302. Never chain more than one hop.",
          "Watch trailing slashes and case sensitivity — Webflow and WordPress disagree, and that disagreement is a redirect loop.",
          "Preserve query-string handling for any paid campaign landing pages.",
        ],
      },
      { type: "h2", text: "Match the content model, not just the pages" },
      {
        type: "p",
        text: "WordPress custom post types become Webflow CMS collections. Get the field-level mapping right — including the fields the old theme rendered but nobody remembers, like schema data hiding in a custom field.",
      },
      { type: "h2", text: "Launch day sequence" },
      {
        type: "ol",
        items: [
          "Publish to the staging domain and crawl it. Fix everything before DNS changes.",
          "Verify the redirect map against the old crawl export, URL by URL, automated.",
          "Cut DNS at a low-traffic hour. Keep the old host live and reachable for at least 30 days.",
          "Submit the new sitemap in Search Console immediately, and request indexing on the top 20 revenue pages.",
          "Watch Search Console coverage daily for two weeks. Most problems surface on day three, not day one.",
        ],
      },
      {
        type: "quote",
        text: "The measure of a successful migration is that nobody outside the project ever notices it happened.",
      },
    ],
  },
  {
    slug: "3d-on-the-web-restraint",
    title: "3D on the web is a garnish, not the meal",
    excerpt:
      "Three.js can make a site unforgettable or unusable, and the gap between the two is almost entirely about restraint. How I decide when 3D earns its megabytes.",
    date: "15 January 2026",
    dateISO: "2026-01-15",
    readingTime: "7 min read",
    category: "Design",
    tags: ["Three.js", "WebGL", "Design", "Performance"],
    cover: { from: "#8d78f5", to: "#0ea5e9", image: "/blog/3d-on-the-web-restraint.jpg" },
    body: [
      {
        type: "p",
        text: "The Awwwards front page is full of sites you would never build for a client. Beautiful, ten seconds to first paint, and unusable on the mid-range Android phone that most of the client's customers are actually holding.",
      },
      {
        type: "p",
        text: "That doesn't mean 3D is decoration. It means it needs a job.",
      },
      { type: "h2", text: "Three questions before any WebGL goes in" },
      {
        type: "ol",
        items: [
          "Does it communicate something a flat image cannot? Product configurators, spatial data and material previews all pass. A rotating abstract blob behind a headline does not.",
          "Does it survive being switched off? If the page is broken without the canvas, the 3D is load-bearing and it shouldn't be.",
          "What's the budget? A hero scene should cost under 300KB compressed and hold 60fps on a four-year-old phone. If it can't, it gets simpler.",
        ],
      },
      { type: "h2", text: "The techniques that pay for themselves" },
      {
        type: "ul",
        items: [
          "Instanced geometry over individual meshes — thousands of objects, one draw call.",
          "Shader-driven motion instead of per-frame JavaScript. The GPU is right there.",
          "Draco or Meshopt compression on every model, without exception.",
          "Render on demand rather than a permanent animation loop when the scene is static.",
          "prefers-reduced-motion respected properly: freeze the scene, don't just slow it down.",
        ],
      },
      { type: "h2", text: "Progressive enhancement, seriously" },
      {
        type: "p",
        text: "The canvas mounts after the page is interactive, behind a dynamic import, only when the device reports enough capability and the user hasn't asked for reduced motion. Everyone gets the content. Some people get the atmosphere.",
      },
      {
        type: "quote",
        text: "If removing the 3D makes the page worse but not broken, you've used it correctly.",
      },
    ],
  },
  {
    slug: "developer-who-designs",
    title: "The case for being the developer who designs",
    excerpt:
      "Specialization is good advice that's slightly wrong at the edges. What five years of holding both roles on the same project actually taught me.",
    date: "8 December 2025",
    dateISO: "2025-12-08",
    readingTime: "5 min read",
    category: "Career",
    tags: ["Career", "Design", "Craft"],
    cover: { from: "#d97706", to: "#4e2fc0", image: "/blog/developer-who-designs.jpg" },
    body: [
      {
        type: "p",
        text: "The standard advice is to pick a lane. It's mostly right — depth beats breadth in a big organisation with dedicated roles for everything.",
      },
      {
        type: "p",
        text: "It's less right on small teams and client work, where the expensive failure isn't a weak design or a weak build. It's the gap between them.",
      },
      { type: "h2", text: "What the gap costs" },
      {
        type: "ul",
        items: [
          "Designs that specify states nobody can build in the timeline, discovered in week three.",
          "Builds that quietly drop the hover state, the empty state and the error state because they weren't in the mockup.",
          "Two rounds of revision spent translating between two vocabularies for the same thing.",
        ],
      },
      { type: "h2", text: "What closing it buys" },
      {
        type: "p",
        text: "When the same person designs and builds, the design is already a specification of something buildable, and the build already knows the intent behind every spacing decision. Revision cycles collapse. So does the class of bug where the site technically matches the mockup and still feels wrong.",
      },
      { type: "h2", text: "The honest trade-off" },
      {
        type: "p",
        text: "You will not be the best designer in the room or the best engineer in the room. You'll be the person who can get a considered thing shipped without a translation layer — and for a lot of projects that's the more valuable role.",
      },
      {
        type: "quote",
        text: "Learn enough of the adjacent craft to respect its constraints. That's usually the whole return.",
      },
    ],
  },
];

export const postCategories = ["All", "Performance", "Automation", "Design", "SEO", "Career"] as const;

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export const featuredPosts = posts.filter((p) => p.featured);
