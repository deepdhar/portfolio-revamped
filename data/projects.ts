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
    slug: "concierge",
    title: "Concierge",
    year: "2025",
    role: "Full-stack development",
    description:
      "An AI-powered WhatsApp assistant that turns messages into calendar events, reminders and structured tasks — no app switching required.",
    technologies: ["NestJS", "n8n", "Google Calendar", "MCP", "LLM", "PostgreSQL"],
    mediaSrc: "/media/work/concierge/featured.mp4",
    mediaType: "video",
    coverImage:
      "https://images.unsplash.com/photo-1754548930550-be9fa88874f4?w=900&q=80&auto=format&fit=crop",
  },
  {
    slug: "media-gallery",
    title: "Media Gallery",
    year: "2024",
    role: "Full-stack development",
    description:
      "A full-stack platform for organizing and delivering large media libraries at speed, from upload pipeline to CDN.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "AWS S3", "Material UI"],
    mediaSrc: "/media/work/media-gallery/featured.mp4",
    mediaType: "video",
    coverImage:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=80&auto=format&fit=crop",
  },
  {
    slug: "super-app",
    title: "Super App",
    year: "2025",
    role: "Mobile architecture",
    description:
      "A modular React Native architecture that lets independent product sectors ship inside one shell app without stepping on each other.",
    technologies: ["React Native", "Re.Pack", "Metro", "TypeScript"],
    mediaSrc: "/media/work/super-app/featured.mp4",
    mediaType: "video",
    coverImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80&auto=format&fit=crop",
  },
  {
    slug: "ai-workflow",
    title: "AI Dev Workflow",
    year: "2025",
    role: "Workflow engineering",
    description:
      "An internal workflow chaining AI tools across Figma-to-code, user stories and test generation — built to compress delivery time, not just automate steps.",
    technologies: ["Figma", "LLM", "Test Automation", "CI"],
    metric: "50% reduction in frontend effort",
    mediaSrc: "/media/work/ai-workflow/featured.mp4",
    mediaType: "video",
    coverImage:
      "https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?w=900&q=80&auto=format&fit=crop",
  },
];



