export type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  startingAt?: string;
  timeline: string;
  icon: "layout" | "shopping" | "cpu" | "code" | "search" | "palette" | "smartphone" | "megaphone";
  /** Editorial photo shown beside the service on /services (4:3, /public/services). */
  image: string;
};

export const services: Service[] = [
  {
    id: "web-design",
    title: "Web Design & Development",
    tagline: "Sites that look expensive and load like they're free.",
    description:
      "End-to-end design and build — from the first Figma frame to a live, indexed, fast site. Motion and 3D where it earns its place, never for its own sake.",
    deliverables: [
      "Discovery, sitemap and content strategy",
      "Figma design system with responsive rules",
      "Production build (Webflow, WordPress or custom)",
      "Core Web Vitals tuning and accessibility pass",
      "CMS setup, training and handover docs",
    ],
    timeline: "3–6 weeks",
    icon: "layout",
    image: "/services/web-design.jpg",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Builds",
    tagline: "Storefronts engineered around the checkout.",
    description:
      "Shopify and WooCommerce stores built for conversion — catalogue architecture, payment and shipping configuration, and the analytics to see where money leaks.",
    deliverables: [
      "Store architecture, collections and variants",
      "Payment gateway and shipping-rule setup",
      "Conversion-focused PDP and checkout flow",
      "Product schema and merchandising SEO",
      "Order, inventory and email automation",
    ],
    timeline: "4–8 weeks",
    icon: "shopping",
    image: "/services/ecommerce.jpg",
  },
  {
    id: "ai-automation",
    title: "AI & Workflow Automation",
    tagline: "Delete the copy-paste layer from your business.",
    description:
      "n8n, Make.com and Zapier systems that connect the tools you already pay for — with AI in the loop where it genuinely helps and a human gate where it matters.",
    deliverables: [
      "Process audit and automation opportunity map",
      "Workflow build across your existing stack",
      "AI drafting/classification with approval gates",
      "Error handling, retries and failure alerts",
      "Documentation and team enablement",
    ],
    timeline: "2–5 weeks",
    icon: "cpu",
    image: "/services/ai-automation.jpg",
  },
  {
    id: "web-apps",
    title: "Custom Web Applications",
    tagline: "When an off-the-shelf tool stops fitting.",
    description:
      "Bespoke internal tools, dashboards, portals and calculators — built around your actual process rather than forcing your process into someone else's product.",
    deliverables: [
      "Requirements mapping and technical scoping",
      "UI/UX design and interaction prototypes",
      "Application build with API integrations",
      "Auth, roles and permission modelling",
      "Deployment, monitoring and handover",
    ],
    timeline: "6–12 weeks",
    icon: "code",
    image: "/services/web-apps.jpg",
  },
  {
    id: "seo",
    title: "Technical SEO & Performance",
    tagline: "Fix what's actually holding the site back.",
    description:
      "A forensic audit of crawlability, structure, speed and Core Web Vitals — followed by the remediation work, not just a PDF of problems.",
    deliverables: [
      "Full technical crawl and index audit",
      "Core Web Vitals diagnosis and fixes",
      "On-page structure, schema and internal linking",
      "Redirect mapping and migration safety",
      "Analytics, Search Console and reporting setup",
    ],
    timeline: "1–3 weeks",
    icon: "search",
    image: "/services/seo.jpg",
  },
  {
    id: "brand",
    title: "Brand & Graphic Design",
    tagline: "A visual system, not a one-off logo.",
    description:
      "Identity, marketing collateral and social creative built to stay consistent across every surface your business shows up on.",
    deliverables: [
      "Logo and identity system",
      "Colour, type and usage guidelines",
      "Social and ad creative templates",
      "Presentation and document templates",
      "Asset library handover",
    ],
    timeline: "2–4 weeks",
    icon: "palette",
    image: "/services/brand.jpg",
  },
  {
    id: "mobile",
    title: "Mobile App Support",
    tagline: "The web half of your mobile product.",
    description:
      "UI integration, API connectivity and web-to-app systems — landing pages, deep links and store funnels that make the jump from browser to app feel seamless.",
    deliverables: [
      "App landing pages and store funnels",
      "Deep linking and attribution setup",
      "UI integration against the app design language",
      "API connectivity and data plumbing",
      "Cross-device QA",
    ],
    timeline: "2–4 weeks",
    icon: "smartphone",
    image: "/services/mobile.jpg",
  },
  {
    id: "growth",
    title: "Digital Marketing Support",
    tagline: "Make the traffic you're buying actually land.",
    description:
      "Conversion-focused landing pages, funnel builds, and the tracking layer that tells you which half of the spend is working.",
    deliverables: [
      "Landing page design and build",
      "Funnel architecture and A/B variants",
      "Google Ads and Meta Ads campaign setup",
      "Event tracking and conversion attribution",
      "Performance reporting dashboards",
    ],
    timeline: "1–3 weeks",
    icon: "megaphone",
    image: "/services/growth.jpg",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description:
      "A short, direct conversation about the business, the constraint and what success actually looks like. I'd rather scope honestly than sell you a bigger project.",
  },
  {
    step: "02",
    title: "Architecture",
    description:
      "Sitemap, content model, technical approach and a fixed scope with milestones. You know what you're getting and when before a pixel is drawn.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "A Figma system — not just screens. Type scale, spacing rhythm, component states and responsive rules, reviewed together before build starts.",
  },
  {
    step: "04",
    title: "Build",
    description:
      "Clean, componentized development against the design system. Staging link from day one so you watch it come together, not just the reveal.",
  },
  {
    step: "05",
    title: "Optimize",
    description:
      "Performance, accessibility, SEO and cross-device QA. Core Web Vitals in the green before anything ships, not after someone complains.",
  },
  {
    step: "06",
    title: "Handover",
    description:
      "Documentation, a walkthrough recording and training so your team owns the site. Plus a support window for the things you only notice in week two.",
  },
];
