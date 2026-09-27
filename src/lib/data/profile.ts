export const profile = {
  name: "Rajat Bharti",
  firstName: "Rajat",
  role: "Senior Web Developer",
  headline: "AI Product Developer @ProductOS | 3D Web Design & Automation Systems | AI Product Builder",
  tagline: "I build fast, beautiful web products — and the AI automation that runs behind them.",
  location: "Bengaluru, Karnataka, India",
  locationShort: "Bengaluru, IN",
  timezone: "IST (UTC+5:30)",
  availability: "Available for select freelance & consulting work",
  email: "rajatbharti856@gmail.com",
  website: "https://rajatbharti.com",
  /**
   * Drop a real PDF at `public/Rajat-Bharti-Resume.pdf` and set this to
   * "/Rajat-Bharti-Resume.pdf" to serve it directly. While it's null, every
   * "Download resume" button routes to /resume, which is print-optimised —
   * Cmd/Ctrl+P there produces a clean single-column PDF.
   */
  resumePdf: "/Rajat-Bharti-Resume.pdf" as string | null,
  resumeFile: "/resume",
  avatar: "/images/avatar-v3.jpg",
  ogImage: "/og.png",

  summary:
    "Senior Web Developer with 5+ years of experience building high-performance websites, scalable custom web applications, and AI-driven automation systems. I specialize in WordPress, Shopify, Webflow and modern CMS platforms — but my work goes well beyond traditional site building. I design and develop custom web apps, automate business workflows, and implement AI-powered solutions that cut manual work and improve operational efficiency.",

  summaryLong: [
    "Senior Web Developer with 5+ years of experience building high-performance websites, scalable custom web applications, and AI-driven automation systems.",
    "I specialize in WordPress, Shopify, Webflow and modern CMS platforms, but my expertise goes beyond traditional website development. I design and develop custom web apps, automate business workflows, and implement AI-powered solutions that reduce manual work and improve operational efficiency.",
    "From responsive UI development to backend integrations and API automation, I focus on creating fast, secure, and conversion-focused digital experiences. I also bring a strong design sense through graphic design and brand-focused visuals, ensuring functionality and aesthetics align perfectly.",
    "I'm passionate about building smart digital systems that scale with business growth — constantly learning, experimenting with AI tools, and implementing modern technologies to deliver future-ready solutions.",
  ],

  socials: [
    {
      label: "LinkedIn",
      handle: "in/rajat-bharti-13ab9715b",
      href: "https://www.linkedin.com/in/rajat-bharti-13ab9715b/",
      icon: "linkedin" as const,
    },
    { label: "Email", handle: "rajatbharti856@gmail.com", href: "mailto:rajatbharti856@gmail.com", icon: "mail" as const },
    { label: "Website", handle: "rajatbharti.com", href: "https://rajatbharti.com", icon: "globe" as const },
  ],

  /** Headline numbers used on the Home and About pages. */
  stats: [
    { value: 5, suffix: "+", label: "Years building for the web", detail: "Since 2020" },
    { value: 60, suffix: "+", label: "Websites & apps shipped", detail: "WordPress, Shopify, Webflow, custom" },
    { value: 40, suffix: "+", label: "Automations in production", detail: "n8n, Make.com, Zapier" },
    { value: 62, suffix: "", label: "Endorsed skills", detail: "Across design, dev & AI" },
  ],

  /** Short capability lines under the hero. */
  focus: [
    "3D & motion-led web design",
    "AI automation systems",
    "Custom web applications",
    "Conversion-focused CMS builds",
  ],
} as const;

export type Profile = typeof profile;

/**
 * Where every "resume" button points: the real PDF if one has been added,
 * otherwise the print-optimised /resume page.
 */
export const resumeHref: string = profile.resumePdf ?? "/resume";
