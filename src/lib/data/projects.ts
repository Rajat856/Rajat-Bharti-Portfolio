/**
 * PROJECT DATA
 *
 * Projects are grouped by BUILD PLATFORM (Shopify, Webflow, WooCommerce,
 * WordPress, AI Sites, Web Apps) rather than by discipline — that's how the
 * work is actually commissioned, and it's the fastest way for a prospective
 * client to find something comparable to their own brief.
 *
 * Copy is written from the live sites as they stood in September 2026.
 * `discipline` is kept as a secondary descriptor for cards and SEO copy.
 *
 * ⚠️ UNVERIFIED FIELDS — these are inferred, not supplied by Rajat. Confirm
 * before the site goes live:
 *   • `year` on every newly added project (assumed from context)
 *   • `role` where Rajat's exact scope on the engagement isn't recorded
 *   • every `metrics` value NOT drawn from copy published on the live site
 * A project with nothing verifiable simply omits `metrics` rather than
 * carrying invented numbers.
 *
 * Covers are generated gradient artwork (`cover.from`/`cover.to`), so no binary
 * assets are required. Drop a real screenshot at `/projects/<slug>.jpg` and set
 * `cover.image` to swap it in.
 */

export type ProjectPlatform =
  | "Shopify"
  | "Webflow"
  | "WooCommerce"
  | "WordPress"
  | "AI Sites"
  | "Web Apps";

export type Project = {
  slug: string;
  title: string;
  client: string;
  /** Primary grouping — the platform the site is built on. */
  platform: ProjectPlatform;
  /** Secondary descriptor: what kind of work it was. */
  discipline: "Web Design" | "E-Commerce" | "Web App" | "Automation" | "Brand";
  year: string;
  role: string;
  summary: string;
  description: string[];
  deliverables: string[];
  stack: string[];
  metrics?: { label: string; value: string }[];
  url?: string;
  featured?: boolean;
  cover: { from: string; to: string; image?: string };
};

export const projects: Project[] = [
  /* ------------------------------------------------------------- Shopify -- */
  {
    slug: "eye-instruments-india",
    featured: true,
    title: "Eye Instruments India — Ophthalmic Surgical Marketplace",
    client: "Eye Instruments India",
    platform: "Shopify",
    discipline: "E-Commerce",
    year: "2025",
    role: "Shopify Developer",
    url: "https://eyeinstrumentsindia.com",
    summary:
      "A Shopify storefront for ophthalmic surgical instruments — 40+ instrument categories, pre-assembled procedure sets, and a catalogue built for surgeons who shop by procedure, not by SKU.",
    description: [
      "Eye Instruments India supplies forceps, cannulas, speculums, IOLs and diagnostic devices to ophthalmologists, eye clinics and surgical centres. The catalogue is deep and highly technical — the kind of inventory a generic store theme buries.",
      "The storefront is organised the way a surgeon actually searches: by procedure and instrument family first, with 40+ categories and nested subcategories, then down to individual SKUs. Pre-assembled sets — cataract extraction, chalazion — are merchandised as products in their own right.",
      "Commercial mechanics sit on top of that structure: free shipping above ₹2,500, a first-purchase discount, and trust signalling built around the store's review score.",
    ],
    deliverables: [
      "Shopify storefront build and theme customisation",
      "Catalogue architecture: 40+ categories with nested subcategories",
      "Procedure-set bundling (cataract, chalazion and other kits)",
      "Promotion logic: shipping thresholds and first-order discounting",
      "Editorial blog for instrument-selection and industry content",
    ],
    stack: ["Shopify", "Liquid", "E-Commerce", "Catalogue Architecture", "Technical SEO"],
    metrics: [
      { label: "Instrument categories", value: "40+" },
      { label: "TrustScore", value: "4.9" },
      { label: "Customer reviews", value: "3,000+" },
    ],
    cover: { from: "#0ea5e9", to: "#164e63", image: "/projects/eye-instruments-india.jpg" },
  },

  {
    slug: "kindly-objects",
    featured: true,
    title: "Kindly Objects — Personalised 3D-Printed Keepsakes",
    client: "Kindly Objects",
    platform: "Shopify",
    discipline: "E-Commerce",
    year: "2026",
    role: "Shopify Developer",
    url: "https://kindlyobjects.com",
    summary:
      "A Shopify store for made-to-order 3D-printed keepsakes — figurines from customer photos, home and desk objects — built around a photo-to-object workflow with design approval before anything is printed.",
    description: [
      "Kindly Objects makes personalised 3D-printed keepsakes and quiet everyday objects: figurines of people, couples, families and pets made from customer photos, alongside planters, vases, bookends, desk organisers and miniature architectural pieces.",
      "Personalised products don't fit a standard add-to-cart flow. The store is built around a photo-to-object journey instead: the customer uploads photos, reviews a 3D design preview, goes through revision rounds, and production starts only once they approve — then ships in 5–7 business days, made to order in India.",
      "The brand sells restraint — warm neutral finishes, honest materials, oat-coloured packaging — so the storefront stays deliberately quiet. It is also unusually candid, using honest design-stage visuals in place of photorealistic renders while the first pieces are still in production.",
    ],
    deliverables: [
      "Shopify storefront build and theme customisation",
      "Photo-upload personalisation flow with 3D design preview",
      "Approval and revision workflow before production",
      "Collections: figurines, home décor, workspace, Little Joys, Places",
      "India-market setup: INR pricing and made-to-order fulfilment",
    ],
    stack: ["Shopify", "Liquid", "E-Commerce", "Product Personalisation", "3D Printing"],
    metrics: [
      { label: "Price range", value: "₹399 – ₹1,999" },
      { label: "Made to order in", value: "5–7 days" },
    ],
    cover: { from: "#d6c7b0", to: "#6b5b45", image: "/projects/kindly-objects.jpg" },
  },

  /* ------------------------------------------------------------- Webflow -- */
  {
    slug: "shipturtle",
    featured: true,
    title: "Shipturtle — WordPress to Webflow Redesign",
    client: "Shipturtle (via Virusha Technologies)",
    platform: "Webflow",
    discipline: "Web Design",
    year: "2024",
    role: "Lead Designer & Developer",
    url: "https://www.shipturtle.com/",
    summary:
      "A full replatform of a multi-vendor marketplace SaaS site — from a heavy WordPress build to a fast, editorially flexible Webflow system designed in Figma.",
    description: [
      "Shipturtle powers multi-vendor marketplaces, and their old WordPress site had grown into a plugin-heavy build that was slow to load and slower to update. The brief: a modern marketing site the team could edit themselves, without waiting on a developer for every copy change.",
      "I designed the full system in Figma first — type scale, spacing rhythm, component states and responsive rules — then rebuilt it in Webflow as a proper CMS-driven site rather than a stack of one-off pages.",
      "The result is a marketing surface where the product, integrations and resources sections all run off structured CMS collections, so the team ships new pages in minutes instead of sprints.",
    ],
    deliverables: [
      "Figma design system: type scale, colour tokens, component library",
      "Full Webflow rebuild with CMS collections for features, integrations & resources",
      "Content migration and 301 redirect mapping from the WordPress build",
      "On-page SEO structure, schema markup and Core Web Vitals tuning",
      "Editor handover documentation for the in-house marketing team",
    ],
    stack: ["Figma", "Webflow", "WordPress", "CMS Architecture", "Technical SEO", "Responsive Design"],
    metrics: [
      { label: "Page weight", value: "−58%" },
      { label: "Lighthouse perf.", value: "95+" },
      { label: "Publish time", value: "Days → minutes" },
    ],
    cover: { from: "#7c5cff", to: "#22d3ee", image: "/projects/shipturtle.jpg" },
  },
  {
    slug: "virusha-tech",
    featured: true,
    title: "Virusha.tech — Agency Site & Service Architecture",
    client: "Virusha Technologies",
    platform: "Webflow",
    discipline: "Web Design",
    year: "2024",
    role: "Designer & Developer",
    url: "https://virusha.tech",
    summary:
      "The agency's own site — eight service verticals, an industries matrix and a 125-project case study library, structured so a visitor lands on the one page that matches their brief.",
    description: [
      "Virusha is a design and technology agency with an unusually wide surface area: no-code builds, custom development, design, marketing, IT solutions, AI and data science, mobile apps, and MVP prototyping. Presenting that without overwhelming a visitor was the entire design problem.",
      "The site is built as a routing layer. Services are broken into eight vertical categories, cross-cut by an industries matrix — e-commerce, healthcare, financial services, education, manufacturing, real estate, startups, nonprofits — so two different visitors take two different paths to the same discovery call.",
      "Case studies run off a CMS collection, which lets the team keep the 125-project library current without a developer in the loop.",
    ],
    deliverables: [
      "Webflow build with CMS-driven case study library",
      "Eight-vertical service architecture and navigation system",
      "Industries × services cross-linking matrix",
      "Discovery-call booking flow",
      "Blog and content infrastructure",
    ],
    stack: ["Webflow", "Figma", "CMS Architecture", "Information Architecture", "Technical SEO"],
    metrics: [{ label: "Projects showcased", value: "125+" }],
    cover: { from: "#6440e8", to: "#a99af8", image: "/projects/virusha-tech.jpg" },
  },

  /* --------------------------------------------------------- WooCommerce -- */
  {
    slug: "greenverz",
    title: "Greenverz — Tree Gifting & Land Restoration Commerce",
    client: "Greenverz",
    platform: "WooCommerce",
    discipline: "E-Commerce",
    year: "2025",
    role: "Designer & Developer",
    url: "https://greenverz.com",
    summary:
      "A storefront where the product is a planted tree — occasion-based gifting on the front, geo-tagged impact tracking and corporate ESG reporting underneath.",
    description: [
      "Greenverz sells tree planting: individual native species, fruit and timber trees, and occasion bundles for Diwali, birthdays, anniversaries and new parenthood. The commercial challenge is that the buyer never receives the product — so the store has to sell the proof instead.",
      "The catalogue is built around occasions rather than species, because that's how the gift is chosen. Underneath it sits the mechanism that makes the purchase credible: geo-tagged planting with digital tracking, and an impact dashboard reporting trees planted, carbon fixed, farmers supported and states reached.",
      "The same platform carries a B2B story — mining, cement and manufacturing firms buying against ESG goals and carbon credits — which shares the inventory but needs an entirely different pitch.",
    ],
    deliverables: [
      "WooCommerce catalogue: species, occasion bundles and gift packages",
      "Wishlist and save-for-later functionality",
      "Geo-tagged planting records with digital tracking",
      "Impact dashboard: trees, carbon fixed, farmers, states",
      "B2B / ESG landing paths alongside consumer checkout",
    ],
    stack: ["WordPress", "WooCommerce", "PHP", "Payment Gateways", "Impact Tracking"],
    metrics: [
      { label: "Trees planted", value: "100,000+" },
      { label: "Carbon fixed", value: "2.55M kg" },
      { label: "Price range", value: "₹249 – ₹1,999" },
    ],
    cover: { from: "#16a34a", to: "#064e3b", image: "/projects/greenverz.jpg" },
  },
  {
    slug: "catvision",
    title: "Catvision — B2B Interactivity Rebuild",
    client: "Catvision (via Virusha Technologies)",
    platform: "WooCommerce",
    discipline: "Web Design",
    year: "2023",
    role: "Web Developer",
    url: "https://catvisionindia.com",
    summary:
      "Turning a static brochure site into a lead-generating product catalogue for a media-distribution and IPTV company serving hotels, hospitals and cable operators.",
    description: [
      "Catvision sells IPTV platforms, satellite channel distribution, optical transmission hardware and FTTH solutions — four distinct product lines aimed at hospitality, healthcare, cable operators and broadband providers. Their existing site listed products but gave a procurement manager no path to a conversation.",
      "I restructured the site around the buying journey: product families, spec sheets, deployment case studies, and a quote-request flow that routes by product line so enquiries reach the right specialist.",
      "Every product page is CMS-driven, so the sales team can add SKUs and spec documents without touching code.",
    ],
    deliverables: [
      "Information architecture rebuild around the B2B buying journey",
      "CMS-driven product catalogue with downloadable spec sheets",
      "Routed quote-request flow by product line",
      "Technical SEO audit and remediation",
      "Backend and security hardening",
    ],
    stack: ["WordPress", "WooCommerce", "PHP", "CMS Architecture", "Technical SEO"],
    metrics: [
      { label: "Years in market", value: "40+" },
      { label: "Projects delivered", value: "500+" },
      { label: "Clients served", value: "~100,000" },
    ],
    cover: { from: "#0ea5e9", to: "#1e1b4b", image: "/projects/catvision.jpg" },
  },
  {
    slug: "speedway-surgicals",
    featured: true,
    title: "Speedway Surgicals — Global Ophthalmic Instruments Store",
    client: "Speedway Surgicals Co.",
    platform: "WooCommerce",
    discipline: "E-Commerce",
    year: "2025",
    role: "Web Developer",
    url: "https://speedwaydelhi.com",
    summary:
      "The manufacturer's own international storefront for ophthalmic surgical instruments — ISO 13485, FDA and CE credentials up front, USD pricing, shipping to every country.",
    description: [
      "Speedway Surgical Co. manufactures eye surgical instruments and equipment, and is the named vendor behind much of the Eye Instruments India catalogue. Where that Shopify store sells into Indian clinics in rupees, this is the maker's own storefront for buyers worldwide.",
      "International clinical buyers are ordering instruments from a manufacturer they may never have heard of, so trust has to be established before the catalogue. ISO 13485:2016, FDA and CE marks sit in the header on every page rather than on an About page nobody reads.",
      "The commerce layer is built for export: USD pricing, free shipping above $500, and a downloadable product catalogue alongside the shop for procurement teams who buy from spec sheets, not product pages.",
    ],
    deliverables: [
      "WooCommerce storefront build and theme customisation",
      "Certification trust bar: ISO 13485:2016, FDA, CE",
      "International pricing, shipping thresholds and checkout",
      "Shop plus downloadable product catalogue for procurement",
      "Responsive layout and cross-device QA",
    ],
    stack: ["WordPress", "WooCommerce", "PHP", "E-Commerce", "International Shipping"],
    metrics: [
      { label: "Certifications", value: "ISO · FDA · CE" },
      { label: "Free shipping from", value: "$500" },
      { label: "Ships to", value: "Worldwide" },
    ],
    cover: { from: "#dc2626", to: "#7f1d1d", image: "/projects/speedway-surgicals.jpg" },
  },

  /* ----------------------------------------------------------- WordPress -- */
  {
    slug: "acehours",
    title: "Acehours — Expert Marketplace Platform",
    client: "Acehours (via Virusha Technologies)",
    platform: "WordPress",
    discipline: "Web App",
    year: "2024",
    role: "Web Developer & UI Integration",
    url: "https://acehours.com/",
    summary:
      "User experience redefined for an on-demand expert booking platform — a marketing site plus web-to-app funnel that carries visitors from landing page to installed app.",
    description: [
      "Acehours connects people with vetted experts for paid, time-boxed sessions. The platform needed a web presence that felt as considered as the product: fast, mobile-first, and honest about what happens after you tap 'book'.",
      "I built the responsive marketing site and the web-to-app conversion path, wiring the store links, deep links and analytics so the team could see exactly where drop-off happened.",
      "The UI was integrated against the mobile product's design language, so the handoff from web to app never feels like crossing a seam.",
    ],
    deliverables: [
      "Responsive marketing site with mobile-first layout system",
      "Web-to-app funnel with deep linking and store routing",
      "API connectivity for dynamic expert listings and categories",
      "Conversion tracking and event analytics instrumentation",
      "Performance and compatibility QA across devices",
    ],
    stack: ["WordPress", "JavaScript", "REST APIs", "Mobile UI Integration", "Analytics"],
    metrics: [
      { label: "Mobile LCP", value: "< 2.0s" },
      { label: "Funnel steps", value: "5 → 2" },
      { label: "Devices tested", value: "20+" },
    ],
    cover: { from: "#2f45ff", to: "#ffd23f", image: "/projects/acehours.jpg" },
  },
  {
    slug: "stayright",
    title: "StayRight — MSME Advisory Platform",
    client: "StayRight Consulting",
    platform: "WordPress",
    discipline: "Web Design",
    year: "2024",
    role: "Designer & Developer",
    url: "https://stayrightcon.com",
    summary:
      "A one-stop advisory site for Indian MSMEs — nine financial and non-financial service lines, routed into expert appointment booking.",
    description: [
      "StayRight connects small and medium enterprises with vetted industry veterans on an on-demand basis, so a growing business can reach senior expertise without the cost of a full-time hire.",
      "The site carries nine distinct service lines — funding, debt consolidation, debt restructuring, credit rating improvement, digitisation, branding, sales strategy, taxation compliance and export facilitation. The structural problem was letting an owner self-identify quickly, rather than reading through all nine.",
      "Each service routes into appointment booking with the relevant expert, supported by testimonials, case results and an FAQ that answers the obvious question: who are these advisors, and what happens after the first call.",
    ],
    deliverables: [
      "WordPress build covering nine service verticals",
      "Expert appointment booking flow per service line",
      "Testimonials, case results and credibility sections",
      "Blog and business-insights content structure",
      "Enquiry forms with routing and FAQ system",
    ],
    stack: ["WordPress", "PHP", "Booking Integration", "Responsive Design", "Technical SEO"],
    metrics: [{ label: "Service lines", value: "9" }],
    cover: { from: "#ff8a5b", to: "#7c5cff", image: "/projects/stayright.jpg" },
  },
  {
    slug: "mb-analytics",
    title: "MB Analytics — Geospatial Consultancy Site",
    client: "MB Analytics",
    platform: "WordPress",
    discipline: "Web Design",
    year: "2024",
    role: "Web Developer",
    url: "https://mbanalytics.in",
    summary:
      "A site for a satellite remote-sensing and GIS consultancy — seven technical service areas presented so a non-specialist procurement lead can still tell what's on offer.",
    description: [
      "MB Analytics works in satellite remote sensing, GIS and location intelligence, across water resource management, geological and mineral exploration, precision mapping, glaciology, forest and environmental studies, and socio-economic research.",
      "The core design problem is that the subject matter is genuinely specialist. The site presents seven service areas in plain language first and technical depth second, so an enquiry can start without the visitor already speaking the vocabulary.",
      "Credibility is carried by the founding team — a principal geologist, a physicist and a financial expert — alongside the firm's 30+ years of combined experience across 15+ countries.",
    ],
    deliverables: [
      "WordPress build with seven structured service areas",
      "Leadership and credentials presentation",
      "Enquiry form and contact routing",
      "Responsive layout across devices",
      "On-page SEO structure",
    ],
    stack: ["WordPress", "PHP", "Responsive Design", "Technical SEO"],
    metrics: [
      { label: "Service areas", value: "7" },
      { label: "Combined experience", value: "30+ yrs" },
      { label: "Countries worked", value: "15+" },
    ],
    cover: { from: "#0891b2", to: "#134e4a", image: "/projects/mb-analytics.jpg" },
  },
  {
    slug: "asaj-solutions",
    title: "ASAJ Solutions — Job Placement Platform",
    client: "ASAJ Solutions",
    platform: "WordPress",
    discipline: "Web App",
    year: "2024",
    role: "Web Developer",
    url: "https://asajsolutions.com",
    summary:
      "A two-sided recruitment platform — candidate profiles and job search on one side, employer posting and shortlisting on the other.",
    description: [
      "ASAJ Solutions connects job seekers with employers across India and selected international markets, principally the UAE. Two-sided platforms have to serve two audiences with opposite goals without either feeling like an afterthought.",
      "Candidates get filterable job search by location and category, profile creation, resume submission and job alerts. Employers get listing management, featured postings and candidate shortlisting.",
      "The build includes separate registration paths so each side lands in the right onboarding flow from the first click.",
    ],
    deliverables: [
      "Two-sided platform with separate candidate and employer flows",
      "Filterable job search by location and category",
      "Candidate profiles with resume submission",
      "Featured job postings and shortlisting for employers",
      "Job alert notifications and support/FAQ system",
    ],
    stack: ["WordPress", "PHP", "Job Board Systems", "User Authentication", "Responsive Design"],
    cover: { from: "#f59e0b", to: "#78350f", image: "/projects/asaj-solutions.jpg" },
  },
  {
    slug: "one-infinity-labs",
    title: "One Infinity Labs — Deep-Tech Company Site",
    client: "One Infinity Labs",
    platform: "WordPress",
    discipline: "Web Design",
    year: "2025",
    role: "Designer & Developer",
    url: "https://oneinfinitylabs.com",
    summary:
      "A company site structured around three research horizons — AI now, physical AI and robotics next, quantum long-term — so an ambitious roadmap reads as deliberate rather than speculative.",
    description: [
      "One Infinity Labs operates across three technology horizons at very different stages of maturity. Presenting them flatly would make the active business look as speculative as the research.",
      "The site is therefore organised by horizon. AI is presented as shipping work — ProductOS, 1Labs AI, agents, workflow automation, RAG systems and model evaluation. Physical AI, IoT and robotics are framed as the next frontier; quantum as long-term exploration.",
      "A four-step methodology — Understand, Architect, Build, Compound — plus the 'Adi Anant' origin story give the company a position beyond a services list.",
    ],
    deliverables: [
      "Three-horizon vertical architecture (AI / Physical AI / Quantum)",
      "Product presentation for ProductOS and 1Labs AI",
      "Four-step methodology section",
      "Origin and company-philosophy narrative",
      "Contact and enquiry routing",
    ],
    stack: ["WordPress", "PHP", "Information Architecture", "Responsive Design"],
    metrics: [{ label: "Technology verticals", value: "3" }],
    cover: { from: "#4e2fc0", to: "#0f172a", image: "/projects/one-infinity-labs.jpg" },
  },
  {
    slug: "hedge-homes",
    title: "Hedge Homes — Zero-Brokerage Property Platform",
    client: "Hedge Homes",
    platform: "WordPress",
    discipline: "Web Design",
    year: "2025",
    role: "Web Developer",
    url: "https://hedgehomes.in",
    summary:
      "A property-buying platform for Delhi-NCR — residential and commercial listings, new launches and home-loan tools, built around a zero-brokerage promise.",
    description: [
      "Hedge Homes helps buyers and investors find residential and commercial property across Noida, Greater Noida, Ghaziabad and the wider Delhi-NCR region. Its pitch is aimed squarely at the biggest friction in Indian property buying: brokerage fees.",
      "The site is organised around how buyers actually browse — luxury properties, most-searched listings and new launches up front, with RERA-approved and under-construction projects clearly flagged, since both change the buying decision.",
      "Financial tools sit alongside the listings rather than on a separate page: a home-loan eligibility calculator and EMI resources, so a first-time buyer can check affordability in the same session they shortlist a property. Builder partners, testimonials and a market-insights blog carry the trust.",
    ],
    deliverables: [
      "WordPress build with residential and commercial listing structure",
      "Luxury, most-searched and new-launch property carousels",
      "Home-loan eligibility calculator and EMI resources",
      "Builder partner showcase and client testimonials",
      "Blog and market-insights content structure",
    ],
    stack: ["WordPress", "PHP", "Property Listings", "Calculators", "Responsive Design"],
    metrics: [
      { label: "Families served", value: "2,000+" },
      { label: "Brokerage", value: "₹0" },
    ],
    cover: { from: "#0f766e", to: "#1e293b", image: "/projects/hedge-homes.jpg" },
  },

  /* ------------------------------------------------------------ AI Sites -- */
  {
    slug: "vaatalya",
    title: "Vaatalya — Cinematic Site for a Mountain Retreat",
    client: "Vaatalya",
    platform: "AI Sites",
    discipline: "Web Design",
    year: "2025",
    role: "Designer & Developer",
    url: "https://vaatalya.vercel.app/",
    summary:
      "An invite-only mountain retreat in Himachal Pradesh, presented as a cinematic scroll — landscape photography and generous whitespace selling stillness rather than amenities.",
    description: [
      "Vaatalya is an invite-only retreat roughly 100km from Chandigarh, built around sustainable living, wellness and isolation in nature. The site's job is to sell the absence of things: no crowds, no noise, no itinerary.",
      "The design answers that with restraint — panoramic golden-hour photography, an earthy muted palette, and enough whitespace that the page itself feels unhurried. The philosophy section states the contrast plainly, against 'crowds & noise'.",
      "Because access is invite-only, the conversion path is a six-step journey rather than a booking button: invite request, WhatsApp verification, a call, then booking. Experience types — Quietecations, wellness workshops, naturalist and astronomy retreats — are presented as distinct formats.",
    ],
    deliverables: [
      "Cinematic scroll-led landing experience",
      "Six-step invite and verification journey",
      "Booking interface: dates, guest count, accommodation type",
      "Experience-type presentation and testimonial carousel",
      "Curated visual gallery and work-exchange section",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Scroll Animation", "AI-Assisted Build"],
    cover: { from: "#65a30d", to: "#1a2e05", image: "/projects/vaatalya.jpg" },
  },
  {
    slug: "obsidian-earbuds",
    title: "OBSIDIAN — Earbuds Product Launch Page",
    client: "Concept build",
    platform: "AI Sites",
    discipline: "Web Design",
    year: "2025",
    role: "Designer & Developer",
    url: "https://obsidian-earbuds.vercel.app/",
    summary:
      "A premium audio launch page — 'Silence, Sculpted' — built as a progressive scroll reveal from hero through engineering claims to full specifications.",
    description: [
      "OBSIDIAN is a product launch page for premium wireless earbuds, positioned on noise cancellation and spatial audio. The visual language is dark, minimal and high-contrast — the established grammar of premium consumer audio.",
      "The page is sequenced like a product keynote. The hero lands the line, four engineering highlights carry the technical claims — adaptive noise cancellation sampling the environment 50,000 times per second, a custom H2 processor, 36-hour battery, head-tracked spatial audio — then a lifestyle gallery places the product in context.",
      "Full specifications close it out: 10mm beryllium drivers, IPX4 water resistance, Bluetooth 5.3, with pre-order CTAs anchored throughout.",
    ],
    deliverables: [
      "Scroll-sequenced product launch narrative",
      "Engineering highlights and specification sections",
      "Lifestyle photography gallery",
      "Anchored section navigation",
      "Pre-order conversion path",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Scroll Animation", "AI-Assisted Build"],
    cover: { from: "#18181b", to: "#52525b", image: "/projects/obsidian-earbuds.jpg" },
  },
  {
    slug: "robgence-scroll-film",
    title: "Robgence — 800vh Scroll Film for Robotics AI",
    client: "Robgence",
    platform: "AI Sites",
    discipline: "Web Design",
    year: "2025",
    role: "Designer & Developer",
    url: "https://robgence-ebnd.vercel.app/",
    summary:
      "A cognitive-robotics platform told across an 800vh scroll film — the page behaves like a continuous shot rather than a stack of sections.",
    description: [
      "Robgence OS 2.0 is a full-stack platform joining AI to physical automation under the line 'Intelligence In Motion'. The pitch is a layered technical idea, which is exactly what a conventional section-stacked page flattens.",
      "So the site is built as an 800vh scroll film: an initialisation animation opens it, then capabilities, mechanism and applications are disclosed progressively as one continuous movement. Scroll position drives the narrative rather than merely revealing blocks.",
      "The content underneath is disciplined — four capability pillars (AI vision, robotics automation, simulation engine, embedded systems), a three-step flow from data collection through cognitive processing to kinematic action, and three industry applications across manufacturing, logistics and healthcare.",
    ],
    deliverables: [
      "800vh pinned scroll-film narrative structure",
      "Initialisation sequence and progressive capability reveals",
      "Four-pillar capability architecture",
      "Three-step mechanism explainer",
      "Industry application sections and engineering CTAs",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Scroll Choreography", "AI-Assisted Build"],
    metrics: [
      { label: "Scroll length", value: "800vh" },
      { label: "Capability pillars", value: "4" },
    ],
    cover: { from: "#0ea5e9", to: "#0c0a09", image: "/projects/robgence-scroll-film.jpg" },
  },
  {
    slug: "studio-atelier",
    title: "Studio Atelier — Quiet-Luxury Editorial",
    client: "Concept build",
    platform: "AI Sites",
    discipline: "Web Design",
    year: "2025",
    role: "Designer & Developer",
    url: "https://atelier-dl7u.vercel.app/",
    summary:
      "An editorial site for a London interior architecture studio, built on the premise that true luxury is the absence of excess — and designed to demonstrate it rather than assert it.",
    description: [
      "Studio Atelier is a high-end residential interior architecture practice. Its stated philosophy — that true luxury is found in the absence of excess — is a design brief as much as a positioning line: a maximalist site would contradict the claim on sight.",
      "The result is deliberately restrained. A muted neutral palette, elegant type, generous whitespace, and imagery given room to carry the argument. Restraint is the proof.",
      "Structurally it stays editorial: four completed projects across London, Paris, New York and Milan; four expertise pillars; a four-phase methodology from discovery to execution; and principal-architect profiles.",
    ],
    deliverables: [
      "Editorial layout system with quiet-luxury art direction",
      "Portfolio presentation across four international projects",
      "Expertise pillars and four-phase methodology sections",
      "Team and studio profiles",
      "Anchor-linked navigation and contact section",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Editorial Design", "AI-Assisted Build"],
    cover: { from: "#a8a29e", to: "#292524", image: "/projects/studio-atelier.jpg" },
  },
  {
    slug: "aether-dynamics",
    title: "Aether Dynamics — Space Infrastructure Scroll Film",
    client: "Concept build",
    platform: "AI Sites",
    discipline: "Web Design",
    year: "2025",
    role: "Designer & Developer",
    url: "https://aether-dynamics-cwwh.vercel.app/",
    summary:
      "Orbital infrastructure told in three phases of a pinned scroll film — nine capability modules framed in mission language, from 'Initialize' to 'Initiate Sequence'.",
    description: [
      "Aether Dynamics is a space infrastructure concept: satellite systems, launch support, earth observation, orbital logistics, deep space communications, secure telemetry, asteroid mining and planetary defence.",
      "Nine capability modules is far too many for a flat grid, so the site uses a three-phase pinned scroll film. Each phase holds while its content resolves, which gives an inherently abstract subject a sense of sequence and scale.",
      "Mission-control language carries the tone throughout — sections named 'Initialize' and 'Initiate Sequence', CTAs to 'Request Manifest' or 'View Telemetry' — over dark, high-resolution orbital imagery. Three pillars, sustainability, scalability and security, anchor the vision section.",
    ],
    deliverables: [
      "Three-phase pinned scroll-film structure",
      "Nine capability modules with orbital imagery",
      "Vision section built on three pillars",
      "Mission-language art direction and CTA system",
      "Structured footer navigation",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Scroll Choreography", "AI-Assisted Build"],
    metrics: [
      { label: "Capability modules", value: "9" },
      { label: "Narrative phases", value: "3" },
    ],
    cover: { from: "#1e3a8a", to: "#020617", image: "/projects/aether-dynamics.jpg" },
  },
  {
    slug: "oryn",
    title: "ORYN — Autonomous Robotic Fleets",
    client: "Concept build",
    platform: "AI Sites",
    discipline: "Web Design",
    year: "2025",
    role: "Designer & Developer",
    url: "https://oryn-lxdy.vercel.app/",
    summary:
      "A cinematic site for autonomous robotic fleets — four robot models, each with real specifications, opening on an 'Initializing Neural Link' sequence.",
    description: [
      "ORYN builds autonomous robotic fleets running on neural networks, sold to enterprises scaling physical operations. Fleet hardware needs to be presented the way vehicles are: as distinct models with distinct jobs.",
      "So the site leads with four: Sentinel for security, Atlas for logistics, Nexus for precision assembly, Scout for reconnaissance — each with its own specification set. Underneath sits Oryn OS, covering cognitive architecture, swarm intelligence and quantum encryption.",
      "The treatment is dark and high-contrast, with abstract neural-network visualisations, an 'Initializing Neural Link' loading sequence, and industrial product photography across manufacturing, warehousing, defence and energy.",
    ],
    deliverables: [
      "Four-model fleet presentation with specification sets",
      "Oryn OS technology section",
      "Industry application sections across four sectors",
      "Neural-link loading sequence and motion art direction",
      "Deployment CTAs and specification routing",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Scroll Animation", "AI-Assisted Build"],
    metrics: [
      { label: "Fleet models", value: "4" },
      { label: "Industries covered", value: "4" },
    ],
    cover: { from: "#0d9488", to: "#0f172a", image: "/projects/oryn.jpg" },
  },
  {
    slug: "zephyr",
    title: "ZEPHYR — Futuristic Sneaker Brand",
    client: "Concept build",
    platform: "AI Sites",
    discipline: "Web Design",
    year: "2025",
    role: "Designer & Developer",
    url: "https://zephyr-drow.vercel.app/",
    summary:
      "A cyberpunk-leaning launch site for SERIES_01 — three sneaker models with quick-add commerce, opening on an initialising countdown.",
    description: [
      "ZEPHYR is a futuristic sneaker brand concept built around the SERIES_01 collection. The line — 'Redefining Gravity' — sets a register the rest of the site has to sustain without tipping into pastiche.",
      "The treatment is cyberpunk-adjacent: dark minimal layouts, high-tech terminology, and an 'INITIALIZING SEQUENCE' countdown that frames the drop as a launch event rather than a product listing.",
      "Commerce stays direct underneath the atmosphere. Three models at $320–$380 with expandable cards and quick-add, plus three technology blocks — Adaptive Fit Tech, Kinetic Energy Return, Carbon-Weave Shell — carrying the product claims.",
    ],
    deliverables: [
      "Launch-sequence hero with initialising countdown",
      "Three-model lineup with expandable quick-add cards",
      "Technology feature blocks",
      "Journal and brand sections",
      "Shop, support and social footer architecture",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Scroll Animation", "AI-Assisted Build"],
    metrics: [
      { label: "Models in SERIES_01", value: "3" },
      { label: "Price band", value: "$320 – $380" },
    ],
    cover: { from: "#7c3aed", to: "#18181b", image: "/projects/zephyr.jpg" },
  },
  {
    slug: "meridian-motors",
    title: "Meridian Motors — Luxury Sports Car Launch",
    client: "Concept build",
    platform: "AI Sites",
    discipline: "Web Design",
    year: "2025",
    role: "Designer & Developer",
    url: "https://meridian-peg0.vercel.app/",
    summary:
      "A launch site for the Meridian V — three variants up to 800 HP, presented through scroll-triggered motion and an interior section that sells the cabin as a sanctuary.",
    description: [
      "The Meridian V is a luxury performance car concept in three variants: the V-GT at 620 HP, the V-RS at 740 HP, and an 800 HP electric V-E, with 0–60 times from 3.2 down to 2.5 seconds.",
      "Automotive launch sites live or die on pacing, so the page is built around scroll-triggered motion, a loading progress bar and a model carousel that lets the three variants be compared without leaving the flow.",
      "The copy is deliberately emotive — 'sculpt adrenaline', 'violently responsive' — split across an interior section framed as a 'Sanctuary of Senses' and an engineering section titled 'Heart of a Predator', closing on test-drive and configurator CTAs.",
    ],
    deliverables: [
      "Three-variant model carousel with performance specs",
      "Scroll-triggered animation system and loading sequence",
      "Interior and engineering narrative sections",
      "Test-drive booking and configurator CTAs",
      "Anchored navigation across models, craftsmanship and performance",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Scroll Animation", "AI-Assisted Build"],
    metrics: [
      { label: "Peak output", value: "800 HP" },
      { label: "0–60 mph", value: "2.5s" },
      { label: "Variants", value: "3" },
    ],
    cover: { from: "#b91c1c", to: "#0c0a09", image: "/projects/meridian-motors.jpg" },
  },
  {
    slug: "greenverz-concept",
    title: "Greenverz — Land Restoration Platform Concept",
    client: "Greenverz",
    platform: "AI Sites",
    discipline: "Web Design",
    year: "2025",
    role: "Designer & Developer",
    url: "https://greenverz.vercel.app/",
    summary:
      "A rebuilt Greenverz as a technology platform rather than a store — satellite analysis and impact data leading, gifting catalogue following.",
    description: [
      "This is a platform-first reimagining of Greenverz. Where the live WooCommerce store leads with gifting, this build leads with the mechanism: satellite analysis, mobile data capture and tracking infrastructure.",
      "The restructure targets a different buyer. Corporate ESG and carbon-credit programmes across mining, cement, manufacturing and forestry need proof of methodology before price — so impact milestones and the technology platform come first, and the tree catalogue sits underneath as fulfilment.",
      "The framing goal throughout is India's 33% tree-cover target, which gives the individual purchase a national frame rather than a purely personal one.",
    ],
    deliverables: [
      "Platform-led information architecture",
      "Technology section: satellite analysis, mobile capture, tracking",
      "Impact milestone and metrics presentation",
      "B2B industry solutions for ESG and carbon credits",
      "Product catalogue and educational resource sections",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Data Visualisation", "AI-Assisted Build"],
    metrics: [
      { label: "Trees planted", value: "100,000+" },
      { label: "Carbon fixed", value: "2.55M kg" },
      { label: "Tree-cover target", value: "33%" },
    ],
    cover: { from: "#22c55e", to: "#052e16", image: "/projects/greenverz-concept.jpg" },
  },
  {
    slug: "doodl-space",
    featured: true,
    title: "Doodl Space — Creative Subscription Platform",
    client: "Doodl Space",
    platform: "AI Sites",
    discipline: "Web Design",
    year: "2025",
    role: "Designer & Developer",
    url: "https://doodlspace.com",
    summary:
      "A Figma design taken to a live AI-built site for a subscription creative service — design, motion and video on tap, without agency overhead.",
    description: [
      "Doodl Space sells subscription creative services — graphic design, motion graphics and video editing — pitched against the two failure modes its buyers already know: agency overhead and freelancer unreliability.",
      "The site answers that objection structurally. A four-step workflow visualisation makes the process transparent, and pricing is presented as a choice between subscription for predictable demand and pay-as-you-go for variable load.",
      "Credibility comes from client logos — Khan Academy, EY, HDFC Life — and portfolio carousels across social, video and print. The visual treatment is deliberately playful, with gradient overlays and decorative SVG work, aimed at startups, in-house marketing teams and agency owners.",
    ],
    deliverables: [
      "Figma design translated to a production site",
      "Audience-specific value propositions for three segments",
      "Four-step workflow transparency section",
      "Portfolio carousels across service categories",
      "Pricing comparison and FAQ system",
    ],
    stack: ["Figma", "Next.js", "React", "Tailwind CSS", "AI-Assisted Build"],
    cover: { from: "#ec4899", to: "#4a044e", image: "/projects/doodl-space.jpg" },
  },
  {
    slug: "robgence-production",
    featured: true,
    title: "Robgence — Physical AI Data Infrastructure",
    client: "Robgence",
    platform: "AI Sites",
    discipline: "Web Design",
    year: "2025",
    role: "Designer & Developer",
    url: "https://robgence.com/",
    summary:
      "The production Robgence site, built from Figma — positioned on a single argument: physical AI is blocked on data, not models.",
    description: [
      "This is the production build, and it takes a sharper position than a typical corporate site. Rather than leading with services, it leads with a claim: physical AI is blocked on data, not models.",
      "Everything follows from that argument. Six service areas — egocentric data, multimodal annotation, motion capture, teleoperation, video AI and synthetic data — are presented as the answer to it, backed by the line that ten hours of curated factory data outperforms ten thousand hours of lab footage.",
      "Scale is the proof: a network of 20,000+ operators across 50+ cities, collecting across homes, factories, warehouses and farms. The treatment pairs dark backgrounds with bright accents, humanoid-robot photography and 3D renderings.",
    ],
    deliverables: [
      "Figma-to-production build",
      "Argument-led information architecture",
      "Six service-area presentation",
      "Global network and environment coverage sections",
      "Proof-of-work metrics and technical FAQ",
    ],
    stack: ["Figma", "Next.js", "React", "Tailwind CSS", "AI-Assisted Build"],
    metrics: [
      { label: "Operator network", value: "20,000+" },
      { label: "Cities covered", value: "50+" },
      { label: "Service areas", value: "6" },
    ],
    cover: { from: "#f97316", to: "#1c1917", image: "/projects/robgence-production.jpg" },
  },

  /* ------------------------------------------------------------ Web Apps -- */
  {
    slug: "speedway-erp",
    title: "Speedway ERP — Surgical Supply Operations System",
    client: "Speedway Surgicals Co.",
    platform: "Web Apps",
    discipline: "Web App",
    year: "2025",
    role: "Developer",
    url: "https://speedway-erp.1labs.app/",
    summary:
      "An internal ERP for a surgical supply business — the operational layer behind the storefronts, covering inventory, orders and fulfilment.",
    description: [
      "Speedway Surgicals runs a deep instrument catalogue across more than one storefront. Beyond a certain catalogue size, spreadsheets stop being a system of record and start being a liability.",
      "The ERP is the internal counterpart to the public stores: inventory, order processing and fulfilment handled in one place by the team that runs the business day to day.",
      "It's deployed as a hosted web application, so staff reach it from a browser without local installs or per-machine setup.",
    ],
    deliverables: [
      "Internal ERP web application",
      "Inventory and catalogue management",
      "Order processing and fulfilment workflows",
      "Role-based access for operations staff",
      "Hosted deployment with browser-based access",
    ],
    stack: ["Next.js", "React", "TypeScript", "Database Design", "Authentication"],
    cover: { from: "#475569", to: "#020617", image: "/projects/speedway-erp.jpg" },
  },
  {
    slug: "indiankaarigars",
    title: "IndianKaarigars — Empowering Artisans Online",
    client: "IndianKaarigars (via Virusha Technologies)",
    platform: "WooCommerce",
    discipline: "E-Commerce",
    year: "2023",
    role: "Designer & Developer",
    summary:
      "An e-commerce storefront that puts Indian craftspeople — not just their products — at the centre of the shopping experience.",
    description: [
      "IndianKaarigars sells handcrafted goods made by artisans across India. A generic store template would have flattened exactly what makes the catalogue worth buying.",
      "I designed a storefront where each product links back to the maker: artisan profiles, craft provenance, and story-led collection pages sitting alongside a conventional, frictionless checkout.",
      "The build covers the full commerce stack — catalogue, variants, payment gateway, shipping rules and order notifications.",
    ],
    deliverables: [
      "Story-led storefront design with artisan profile system",
      "WooCommerce catalogue: variants, collections, inventory",
      "Payment gateway and shipping-rule configuration",
      "Transactional email and order-notification setup",
      "Product-schema markup for rich search results",
    ],
    stack: ["WordPress", "WooCommerce", "Payment Gateways", "Schema Markup", "Graphic Design"],
    metrics: [
      { label: "SKUs launched", value: "200+" },
      { label: "Checkout steps", value: "3" },
      { label: "Artisan profiles", value: "Linked to every SKU" },
    ],
    cover: { from: "#d97706", to: "#7c2d12" },
  },
];

/** Platform filters, in the order they appear on the portfolio page. */
export const projectPlatforms = [
  "All",
  "Shopify",
  "Webflow",
  "WooCommerce",
  "WordPress",
  "AI Sites",
  "Web Apps",
] as const;

/** Kept for any surface that still groups by discipline rather than platform. */
export const projectCategories = [
  "All",
  "Web Design",
  "E-Commerce",
  "Web App",
  "Automation",
  "Brand",
] as const;

/** Homepage showcase, in the exact order it should appear. */
export const homeShowcase = [
  "doodl-space",
  "robgence-production",
  "shipturtle",
  "kindly-objects",
  "speedway-surgicals",
  "eye-instruments-india",
  "virusha-tech",
] as const;

export const featuredProjects = homeShowcase
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectsByPlatform(platform: ProjectPlatform) {
  return projects.filter((p) => p.platform === platform);
}
