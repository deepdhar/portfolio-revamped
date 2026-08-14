export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  focus: string[];
  summary: string;
};

export const experience: ExperienceEntry[] = [
  {
    company: "PwC India",
    role: "Associate Consultant",
    period: "May 2026 — Present",
    current: true,
    summary:
      "Currently building features in a micro frontend architecture with agentic ai integration for an Telecom SaaS platform.",
    focus: ["ReactJs", "React Native", "Node.js", "MFE", "Agentic AI", "Enterprise Systems"],
  },
  {
    company: "Fleapo",
    role: "Senior Software Developer",
    period: "Mar 2025 — May 2026",
    summary:
      "Led frontend architecture across web and mobile, shipped AI-integrated features into production.",
    focus: [
      "Next.js",
      "React Native",
      "Google Maps",
      "AI / LLM integrations",
      "Mobile releases",
    ],
  },
  {
    company: "Streebo",
    role: "Associate Technical Consultant",
    period: "Aug 2022 — Aug 2024",
    summary:
      "Started a two-year foundation across enterprise frontend systems, translating design into production interfaces.",
    focus: ["Frontend Architecture", "Design-to-Code", "Client Delivery", "JavaScript"],
  },
  {
    company: "Digital Product School",
    role: "Software Engineer",
    period: "Sep 2021 - Dec 2021",
    summary:
      "Collaborated in a 10-week design-led program to develop a full-stack MVP prototype, practicing agile sprints, UX principles, and rapid product iteration.",
    focus: ["React Native", "Agile", "Product Development", "UI/UX Principles", "Maps"],
  },
];
