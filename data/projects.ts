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
    role: "Full-Stack Developer",
    description:
      "Doreme is a homegrown clothing brand for which the e-commerce platform was built from scratch using Next.js, TypeScript, and Shopify. Developed and launched the complete web storefront, integrating Shopify for product, inventory, and commerce operations. Scaled the platform to support ₹250Cr in business turnover and delivered the brand’s mobile application using Expo and React Native, extending the shopping experience across web and mobile.",
    technologies: ["Next.js", "TypeScript", "Shopify", "Expo", "React Native"],
    metric: "Scaled to ₹250Cr in business turnover",
    mediaSrc: "/media/work/doreme/doreme.png",
    mediaType: "image",
    coverImage: "/media/work/doreme/doreme.png",
  },
  {
    slug: "mobily",
    title: "Mobily",
    year: "2026",
    role: "Frontend Engineer",
    description:
      "Mobily, a leading Middle Eastern telecom provider, underwent a frontend revamp of its React, TypeScript, and Micro Frontend-based web portal. Shipped 2 MFE shells and major portal features, improving application responsiveness and performance through modern frontend practices. Automated post-integration test execution and addressed issues identified through test reports, while also shipping features for the React Native mobile app.",
    technologies: ["React", "React Native", "Micro Frontend", "TypeScript"],
    metric: "Improved application responsiveness and performance",
    mediaSrc: "/media/work/mobily/mobily.png",
    mediaType: "image",
    coverImage: "/media/work/mobily/mobily.png",
  },
  {
    slug: "biter",
    title: "Biter",
    year: "2025",
    role: "Mobile Developer",
    description:
      "Biter is a restaurant discovery platform that helps users find and rate nearby restaurants and cafés through a live map, community reviews, and Biter ratings. Led the mobile application revamp and development independently using React Native, shipping features rapidly across discovery, maps, reviews, and user experiences. Increased user acquisition by 450% and helped achieve a 4.5-star rating at launch through a faster, more stable, and polished mobile experience.",
    technologies: [
      "React Native",
      "Google Maps",
      "Android SDK",
      "Location and Core Android Services",
    ],
    metric: "Increased user acquisition by 450%",
    mediaSrc: "/media/work/biter/biter.png",
    mediaType: "image",
    coverImage: "/media/work/biter/biter.png",
  },
  {
    slug: "ai-fiesta",
    title: "AI Fiesta",
    year: "2024",
    role: "Frontend Engineer",
    description:
      "AI Fiesta is a multi-model AI platform that brings leading AI models into a single interface, enabling users to compare and interact with different models from one place. Built its first mobile application using React Native and helped take the app from development to launch in just 2 weeks, delivering a fast and polished mobile experience under a tight timeline.",
    technologies: ["React Native", "Modular Architecture", "LLM Integrations"],
    mediaSrc: "/media/work/ai-fiesta/ai-fiesta.png",
    mediaType: "image",
    coverImage: "/media/work/ai-fiesta/ai-fiesta.png",
  },
];
