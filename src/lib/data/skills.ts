export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  accent: string;
  skills: { name: string; level: number; note?: string }[];
};

/**
 * `level` is a self-assessed proficiency (0–100) used to drive the animated
 * meters. Keep the ordering high → low inside each group.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "web",
    title: "Web & Frontend",
    blurb: "Interfaces that load fast, feel alive and hold up on every screen.",
    accent: "#7c5cff",
    skills: [
      { name: "HTML5", level: 95 },
      { name: "CSS3 / Tailwind", level: 93 },
      { name: "JavaScript", level: 88 },
      { name: "Responsive Web Design", level: 95 },
      { name: "Bootstrap", level: 88 },
      { name: "Web Performance Optimization", level: 90, note: "Core Web Vitals" },
      { name: "Motion & Micro-interactions", level: 85 },
      { name: "PHP", level: 78 },
    ],
  },
  {
    id: "cms",
    title: "CMS & E-commerce",
    blurb: "Five years deep in the platforms that most of the web actually runs on.",
    accent: "#22d3ee",
    skills: [
      { name: "WordPress", level: 96, note: "Themes, plugins, full lifecycle" },
      { name: "Webflow", level: 90 },
      { name: "Shopify", level: 88 },
      { name: "WooCommerce", level: 88 },
      { name: "Magento", level: 75 },
      { name: "Wix", level: 80 },
      { name: "Content Management Systems", level: 92 },
      { name: "E-Commerce", level: 88 },
    ],
  },
  {
    id: "ai",
    title: "AI & Automation",
    blurb: "Workflow systems that quietly delete hours of manual work every week.",
    accent: "#ff8a5b",
    skills: [
      { name: "n8n Automation", level: 92 },
      { name: "Make.com", level: 88 },
      { name: "Zapier", level: 88 },
      { name: "AI Automation", level: 90 },
      { name: "Generative AI Tools", level: 88 },
      { name: "Workflow Automation", level: 92 },
      { name: "REST APIs / Web Services", level: 90 },
      { name: "API Integration", level: 92 },
    ],
  },
  {
    id: "design",
    title: "Design & Brand",
    blurb: "A developer who can hold the design line — and draw it in the first place.",
    accent: "#8d78f5",
    skills: [
      { name: "Figma", level: 90 },
      { name: "Web Design", level: 92 },
      { name: "Graphic Design", level: 88 },
      { name: "Adobe Photoshop", level: 86 },
      { name: "Logo & Brand Identity", level: 82 },
      { name: "Canva", level: 90 },
      { name: "CorelDRAW", level: 78 },
      { name: "Motion Graphics", level: 75 },
    ],
  },
  {
    id: "growth",
    title: "SEO & Growth",
    blurb: "Sites that rank, convert and can prove it with numbers.",
    accent: "#22d3ee",
    skills: [
      { name: "Technical SEO", level: 90 },
      { name: "On-Page Optimization", level: 90 },
      { name: "SEO Audits", level: 88 },
      { name: "Google Ads", level: 78 },
      { name: "Digital Marketing", level: 82 },
      { name: "Meta / Facebook Ads Manager", level: 78 },
      { name: "Analytics & Tracking", level: 84 },
      { name: "Landing Pages & Funnels", level: 90 },
    ],
  },
  {
    id: "delivery",
    title: "Delivery & Tooling",
    blurb: "The unglamorous discipline that keeps projects on the rails.",
    accent: "#7c5cff",
    skills: [
      { name: "Git / Version Control", level: 85 },
      { name: "Project Management", level: 88 },
      { name: "Jira", level: 85 },
      { name: "QA & Release Notes", level: 90 },
      { name: "Mobile App UI Integration", level: 78 },
      { name: "Mobile Application Development", level: 72 },
      { name: "Java", level: 70 },
      { name: "Microsoft Office Suite", level: 88 },
    ],
  },
];

/** Flat marquee list — the full endorsed-skill set from LinkedIn. */
export const allSkills: string[] = [
  "REST APIs", "API Integration", "Web Performance Optimization", "Mobile App UI Integration",
  "Responsive Web Design", "Git / Version Control", "Make.com", "Zapier", "n8n Automation",
  "Technical SEO", "On-Page Optimization", "Motion Graphics", "Web Services API", "AI",
  "AI Automation", "Workflow Automation", "Generative AI", "Generative AI Tools",
  "Artificial Intelligence (AI)", "Canva", "E-Commerce", "Webflow",
  "Content Management Systems (CMS)", "Figma", "Web Applications",
  "Mobile Application Development", "Wix", "Shopify", "Magento", "WordPress Design",
  "WordPress Development", "Search Engine Optimization (SEO)", "SEO Audits", "Jira",
  "Web Design", "WooCommerce", "Bootstrap", "JavaScript", "PHP", "Java", "Microsoft Office",
  "Microsoft Word", "Microsoft Excel", "Project Management", "Graphic Design",
  "Web Development", "Logo Design", "Microsoft PowerPoint", "HTML", "Cascading Style Sheets (CSS)",
  "Adobe Photoshop", "Photography", "CorelDRAW", "Advertising", "WordPress", "Google Ads",
  "Digital Marketing", "Facebook Ads Manager", "Facebook Ads", "Instagram Marketing",
  "Instagram Advertising", "Video Editing",
];

/** Compact chips used in the hero / about strip. */
export const topSkills = [
  "Shopify", "Webflow", "Generative AI", "Workflow Automation", "Artificial Intelligence (AI)",
] as const;

/** Tools shown in the logo marquee. */
export const toolbelt = [
  "WordPress", "Webflow", "Shopify", "Figma", "n8n", "Make.com", "Zapier", "WooCommerce",
  "Tailwind CSS", "JavaScript", "PHP", "Photoshop", "Jira", "Google Analytics",
] as const;
