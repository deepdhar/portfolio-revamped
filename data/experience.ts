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
    company: "Fleapo",
    role: "Senior Software Developer",
    period: "Mar 2025 — Present",
    current: true,
    summary:
      "Leading frontend architecture across web and mobile, shipping AI-integrated features into production.",
    focus: [
      "Next.js",
      "React Native",
      "NestJS",
      "AI / LLM integrations",
      "Mobile releases",
      "Performance",
    ],
  },
  {
    company: "Connect",
    role: "Software Developer",
    period: "Oct 2024 — Jan 2025",
    summary:
      "Built and maintained full-stack features with a focus on clean API integration and interface quality.",
    focus: ["React", "Node.js", "REST APIs", "UI Engineering"],
  },
  {
    company: "Streebo",
    role: "Associate Technical Consultant",
    period: "Aug 2022 — Aug 2024",
    summary:
      "Started a two-year foundation across enterprise frontend systems, translating design into production interfaces.",
    focus: ["Frontend Architecture", "Design-to-Code", "Client Delivery", "JavaScript"],
  },
];
