export type Certification = {
  name: string;
  issuer: string;
  category: "Security" | "Development" | "Design" | "Marketing" | "Infrastructure";
  description: string;
};

export const certifications: Certification[] = [
  {
    name: "Windows Server Administration",
    issuer: "Microsoft",
    category: "Infrastructure",
    description:
      "Server roles, Active Directory, storage and networking fundamentals — the layer underneath everything that gets deployed.",
  },
  {
    name: "Digital Marketing",
    issuer: "Google",
    category: "Marketing",
    description:
      "Search, display, analytics and campaign measurement — the vocabulary that lets development and marketing actually agree on a goal.",
  },
  {
    name: "Ethical Hacking",
    issuer: "Indian Institute of Technology, Kanpur",
    category: "Security",
    description:
      "Offensive security fundamentals, reconnaissance and vulnerability assessment — applied day to day as WordPress and web-app hardening.",
  },
  {
    name: "Ethical Hacking",
    issuer: "Effervescence, IIIT Allahabad",
    category: "Security",
    description:
      "Practical penetration-testing workshop covering common web attack surfaces and how to close them.",
  },
  {
    name: "Cyber Security",
    issuer: "Motilal Nehru National Institute of Technology",
    category: "Security",
    description:
      "Threat models, secure configuration and defensive practice for web-facing systems.",
  },
  {
    name: "Linux and Advanced Java",
    issuer: "Motilal Nehru National Institute of Technology",
    category: "Development",
    description:
      "Linux system administration alongside advanced Java — the server-side grounding behind backend and API work.",
  },
  {
    name: "WordPress and Magento",
    issuer: "Arohha",
    category: "Development",
    description:
      "Deep-dive into the two CMS platforms that underpin a large share of client delivery — themes, plugins, extensions and commerce.",
  },
  {
    name: "Graphic Designing",
    issuer: "Arohha",
    category: "Design",
    description:
      "Composition, typography and brand systems — the formal grounding behind the design half of the work.",
  },
];

export const certificationCategories = [
  "All",
  "Security",
  "Development",
  "Design",
  "Marketing",
  "Infrastructure",
] as const;
