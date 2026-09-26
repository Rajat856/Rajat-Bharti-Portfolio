export type Experience = {
  id: string;
  company: string;
  role: string;
  employmentType: string;
  start: string;
  end: string | null;
  startISO: string;
  endISO: string | null;
  duration: string;
  location: string;
  workplace: "On-site" | "Remote" | "Hybrid";
  summary: string;
  highlights: string[];
  skills: string[];
  current?: boolean;
};

export const experience: Experience[] = [
  {
    id: "productos",
    company: "ProductOS",
    role: "Chief of Staff",
    employmentType: "Full-time",
    start: "Feb 2026",
    end: null,
    startISO: "2026-02-01",
    endISO: null,
    duration: "7 mos",
    location: "Bengaluru, Karnataka, India",
    workplace: "Hybrid",
    current: true,
    summary:
      "The execution layer of ProductOS. Owns design, QA, and cross-functional delivery — making sure nothing ships broken and nothing falls through the cracks.",
    highlights: [
      "Own the design system and end-to-end product QA across an AI-native product surface.",
      "Run cross-functional delivery between product, engineering and go-to-market so releases land on schedule.",
      "Build internal automation and tooling that removes manual steps from the release and reporting loop.",
      "Translate founder intent into concrete specs, acceptance criteria and shipped increments.",
    ],
    skills: ["Product QA", "Design Systems", "Cross-functional Delivery", "AI Products", "Project Management"],
  },
  {
    id: "virusha",
    company: "Virusha Technologies",
    role: "Senior Web Developer",
    employmentType: "Full-time",
    start: "Oct 2023",
    end: null,
    startISO: "2023-10-01",
    endISO: null,
    duration: "2 yrs 11 mos",
    location: "Noida, Uttar Pradesh, India",
    workplace: "Remote",
    current: true,
    summary:
      "Architecting high-performance websites, custom web applications and AI-powered automation workflows for clients across e-commerce, services and B2B.",
    highlights: [
      "Architecting and developing responsive, high-performance websites using WordPress, Shopify and Webflow.",
      "Building custom web applications tailored to specific business requirements.",
      "Designing and implementing AI-powered automation workflows to streamline operations.",
      "Integrating third-party APIs, payment gateways, CRM systems and marketing tools.",
      "Developing workflow automation systems that reduce manual processes and increase efficiency.",
      "Creating conversion-focused landing pages and sales funnels.",
      "Managing the complete website lifecycle — development, optimization, security and backend operations.",
      "Conducting technical SEO audits and improving Core Web Vitals for better performance and rankings.",
      "Supporting digital marketing strategy through analytics tracking and performance optimization.",
      "Designing brand assets, social media creatives and marketing collateral.",
      "Contributing to mobile application projects (UI integration, API connectivity, web-to-app systems).",
      "Collaborating with cross-functional teams to deliver scalable web and mobile solutions.",
    ],
    skills: ["Shopify", "Webflow", "WordPress", "E-Commerce", "REST APIs", "n8n", "Technical SEO", "Figma"],
  },
  {
    id: "affinityx",
    company: "AffinityX",
    role: "Junior Associate Website Developer",
    employmentType: "Full-time",
    start: "Oct 2022",
    end: "Sep 2023",
    startISO: "2022-10-01",
    endISO: "2023-09-30",
    duration: "1 yr",
    location: "Pune, Maharashtra, India",
    workplace: "On-site",
    summary:
      "Delivered GoDaddy WordPress builds at agency scale, holding a strict brand-guideline bar across a high volume of client sites.",
    highlights: [
      "Creating and maintaining GoDaddy WordPress websites in adherence to brand guidelines.",
      "Implementing custom themes, plugins and design elements.",
      "Conducting thorough testing to ensure optimal website functionality, addressing performance and compatibility issues.",
      "Engaging with GoDaddy to understand project requirements, providing regular updates and incorporating client feedback.",
      "Maintaining detailed project documentation and release notes.",
    ],
    skills: ["WordPress", "JavaScript", "SEO Audits", "Jira", "QA Testing", "Documentation"],
  },
  {
    id: "blue-barrows",
    company: "Blue Barrows",
    role: "WordPress Developer",
    employmentType: "Internship",
    start: "May 2020",
    end: "Sep 2022",
    startISO: "2020-05-01",
    endISO: "2022-09-30",
    duration: "2 yrs 5 mos",
    location: "Noida, Uttar Pradesh, India",
    workplace: "On-site",
    summary:
      "Where it started — designing and shipping micro-sites and company web pages, and owning the CMS end to end.",
    highlights: [
      "Designing and creating micro websites.",
      "Designing and developing company web pages.",
      "Improving the UI/UX and overall customer experience on the website.",
      "Optimizing websites for SEO and page speed.",
      "Handling the complete CMS of the website from the backend.",
    ],
    skills: ["WordPress", "Bootstrap", "JavaScript", "UI/UX", "SEO"],
  },
];

export type Education = {
  institution: string;
  degree: string;
  field?: string;
  start: string;
  end: string;
  grade?: string;
};

export const education: Education[] = [
  {
    institution: "University of Allahabad",
    degree: "Master of Computer Applications (MCA)",
    field: "Computer Programming, Specific Applications",
    start: "Nov 2020",
    end: "Jun 2022",
    grade: "87.97%",
  },
  {
    institution: "Ewing Christian College (Autonomous)",
    degree: "Bachelor of Computer Applications (BCA)",
    field: "Computer Software and Media Applications",
    start: "2016",
    end: "2019",
    grade: "67.80%",
  },
  {
    institution: "Vashisth Vatsalya Public School",
    degree: "Intermediate",
    field: "Physics, Chemistry, Mathematics",
    start: "2015",
    end: "2016",
    grade: "69%",
  },
  {
    institution: "Vashisth Vatsalya Public School",
    degree: "High School",
    start: "2013",
    end: "2014",
    grade: "72%",
  },
];

export const awards = [
  {
    title: '"Customer\'s Delight" Award',
    issuer: "AffinityX",
    date: "Mar 2023",
    description:
      "Recognized for consistently exceeding client expectations on GoDaddy website delivery — quality, turnaround and communication.",
  },
];
