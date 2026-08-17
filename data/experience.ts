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
      "Building next-gen digital experiences for a leading Middle Eastern telecom enterprise, engineering micro-frontend architectures and integrating agentic AI workflows into production.",
    focus: [
      "React.js",
      "React Native",
      "Micro Frontend Architecture",
      "Agentic AI",
    ],
  },
  {
    company: "Fleapo",
    role: "Senior Software Developer",
    period: "Mar 2025 — May 2026",
    summary:
      "Architected and shipped full-stack web and mobile applications to production, driving high-impact product launches and business scale.",
    focus: [
      "Next.js",
      "React Native",
      "Performance",
      "AI / LLM integrations",
      "Scalable Product",
    ],
  },
  {
    company: "Streebo",
    role: "Associate Technical Consultant",
    period: "Aug 2022 — Aug 2024",
    summary:
      "Built and maintained mission-critical enterprise web applications, delivering pixel-perfect interfaces and resolving live production issues for tier-1 clients.",
    focus: ["React.js", "JavaScript", "Scrum", "Production Support"],
  },
  {
    company: "Digital Product School",
    role: "Software Engineer",
    period: "Sep 2021 - Dec 2021",
    summary:
      "Collaborated in a 10-week design-led program to develop a full-stack MVP prototype, practicing agile sprints, UX principles, and rapid product iteration.",
    focus: [
      "React Native",
      "Agile",
      "Product Development",
      "UI/UX Principles",
      "Maps",
    ],
  },
];
