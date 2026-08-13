export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  description: string;
  technologies: string[];
  metric?: string;
  /** Path under /public — drop a real featured.mp4 (or .jpg/.png) here to replace the placeholder. */
  mediaSrc: string;
  mediaType: "video" | "image";
  /** Set to true once a real file exists at mediaSrc — controls whether the placeholder or the video tag renders. */
  mediaReady?: boolean;
  /** Optional live URL — shown on the case-study page's "Visit" field when set. */
  liveUrl?: string;
  /**
   * Temporary stand-in cover photo, sourced from Unsplash (free-to-use license,
   * no attribution required). Swap for your own project screenshot/photo at
   * public/media/work/<slug>/cover.jpg — see mediaSrc.
   */
  coverImage: string;
};

export const projects: Project[] = [
  {
    slug: "doreme",
    title: "Doreme",
    year: "2025",
    role: "Workflow engineering",
    description:
      "An internal workflow chaining AI tools across Figma-to-code, user stories and test generation — built to compress delivery time, not just automate steps.",
    technologies: ["Figma", "LLM", "Test Automation", "CI"],
    metric: "50% reduction in frontend effort",
    mediaSrc: "/media/work/doreme/doreme.png",
    mediaType: "image",
    coverImage:
      "/media/work/doreme/doreme.png",
  },
  {
    slug: "mobily",
    title: "Mobily",
    year: "2026",
    role: "Mobile architecture",
    description:
      "A modular React Native architecture that lets independent product sectors ship inside one shell app without stepping on each other.",
    technologies: ["React Native", "Re.Pack", "Metro", "TypeScript"],
    mediaSrc: "/media/work/mobily/mobily.png",
    mediaType: "image",
    coverImage:
      "/media/work/mobily/mobily.png",
  },
  {
    slug: "biter",
    title: "Biter",
    year: "2025",
    role: "Full-stack development",
    description:
      "An AI-powered WhatsApp assistant that turns messages into calendar events, reminders and structured tasks — no app switching required.",
    technologies: ["NestJS", "n8n", "Google Calendar", "MCP", "LLM", "PostgreSQL"],
    mediaSrc: "/media/work/biter/biter.png",
    mediaType: "image",
    coverImage:
      "/media/work/biter/biter.png",
  },
  {
    slug: "ai-fiesta",
    title: "AI Fiesta",
    year: "2024",
    role: "Full-stack development",
    description:
      "A full-stack platform for organizing and delivering large media libraries at speed, from upload pipeline to CDN.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "AWS S3", "Material UI"],
    mediaSrc: "/media/work/ai-fiesta/ai-fiesta.png",
    mediaType: "image",
    coverImage:
      "/media/work/ai-fiesta/ai-fiesta.png",
  }
];



