export type SideHustle = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  /** Unique accent colour per project — used for timeline dot only. */
  color: string;
};

export const sideHustles: SideHustle[] = [
  {
    slug: "nostalgic-site-builder",
    title: "Nostalgic Site Builder",
    subtitle: "no-code site generator",
    description:
      "Build a nostalgic ambient music site — no code needed. Paste a YouTube playlist, name your site, pick a background, and download a ready-to-deploy ZIP.",
    technologies: ["react", "typescript", "youtube api", "tailwind", "vercel"],
    image: "/media/side-hustles/nostalgic.png",
    liveUrl: "https://nostalgic-site-builder.vercel.app/",
    color: "#f59e42",
  },
  {
    slug: "quizzo",
    title: "Quizzo",
    subtitle: "trivia game",
    description:
      "Quizzo is a fun trivia app where you can test your general knowledge by attempting random questions on any topic selected and test your general knowledge.",
    technologies: [
      "react native",
      "css",
      "open trivia api",
      "javascript",
      "figma",
    ],
    image: "/media/side-hustles/quizzo.webp",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.deepdhar.quizzo",
    color: "#2e9d8f",
  },
  {
    slug: "tasks",
    title: "Tasks",
    subtitle: "Task Management App",
    description:
      "It is a task management app for everyday use. It lets user create new tasks, update existing tasks and delete completed/previous tasks.",
    technologies: [
      "react-native",
      "tailwind",
      "typescript",
      "css",
      "nodejs",
      "mongo",
      "express",
      "react-native-paper",
      "expo",
    ],
    image: "/media/side-hustles/task.webp",
    liveUrl: "https://expo.dev/artifacts/eas/9pTawagwBKdqYcHG8a4uZH.apk",
    color: "#f1febc",
  },
  {
    slug: "vaccine-tracker",
    title: "Vaccine Tracker",
    subtitle: "Vaccine Tracker App",
    description:
      "Vaccine Tracker is a helpful app that keeps track of your vaccine records and reminds you when it's time for your next shot. It also keeps track of your kids vaccine record and reminds you when it's time for their next shot. (Made during COVID-19 Pandemic)",
    technologies: [
      "react-native",
      "tailwind",
      "typescript",
      "css",
      "nodejs",
      "mongo",
      "express",
      "react-native-paper",
      "expo",
    ],
    image: "/media/side-hustles/vaccine.png",
    liveUrl: "https://github.com/deepdhar/Vaccine-Tracker-App",
    color: "#f1febc",
  },
  {
    slug: "booking-clone",
    title: "Booking.com Clone",
    subtitle: "Hotel Booking",
    description:
      "It is a clone of booking.com website that demonstrates hotel search and booking. It uses real time booking.com api to find and book hotels.",
    technologies: ["next.js", "tailwind", "typescript", "css", "figma"],
    image: "/media/side-hustles/booking.webp",
    liveUrl: "https://github.com/deepdhar/booking-clone",
    color: "#005a96",
  },
  {
    slug: "youtube-clone",
    title: "Youtube Clone",
    subtitle: "online media player",
    description:
      "An online video player to let the user enjoy media on any topic of choice. Created the website with ReactJs and Youtube API.",
    technologies: [
      "react.js",
      "material ui",
      "youtube api",
      "css",
      "javascript",
      "figma",
    ],
    image: "/media/side-hustles/yt.webp",
    liveUrl: "https://cool-sprinkles-f300a5.netlify.app/",
    color: "#fb1505",
  },
];
