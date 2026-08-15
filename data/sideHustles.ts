export type SideHustle = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  /** Unique accent colour per project — used for timeline dot, glow, and heading. */
  color: string;
};

export const sideHustles: SideHustle[] = [
  {
    slug: "youtube-clone",
    title: "Youtube Clone",
    subtitle: "online media player",
    description:
      "An online video player to let the user enjoy media on any topic of choice. Created the website with ReactJs and Youtube API.",
    technologies: ["react.js", "material ui", "youtube api", "css", "javascript", "figma"],
    image: "/media/side-hustles/yt.webp",
    liveUrl: "https://cool-sprinkles-f300a5.netlify.app/",
    color: "#fb1505",
  },
  {
    slug: "connect",
    title: "Connect Solutionss",
    subtitle: "Super app",
    description:
      "Connect is an all-in-one platform for fulfilling all kinds of services, needs and entertainment. Worked with the team as a founding engineer and created the app from scratch.",
    technologies: ["react-native", "tailwind", "typescript", "aws", "nodejs"],
    image: "/media/side-hustles/connect.webp",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.connectsolutionss&pli=1",
    color: "#fcd663",
  },
  {
    slug: "absli",
    title: "Aditya Birla Sun Life",
    subtitle: "Insurance Company",
    description:
      "It is a leading insurance company in India. Worked on the UI as well as backend development of 3 new plans and handled live hotfixes with client dev team and brought down ticket sizes by 90% during peak business hours.",
    technologies: ["react.js", "javascript", "java", "sql", "spring", "html", "css"],
    image: "/media/side-hustles/absli.webp",
    liveUrl: "https://lifeinsurance.adityabirlacapital.com/",
    color: "#eb4270",
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
    slug: "quizzo",
    title: "Quizzo",
    subtitle: "trivia game",
    description:
      "Quizzo is a fun trivia app where you can test your general knowledge by attempting random questions on any topic selected and test your general knowledge.",
    technologies: ["react native", "css", "open trivia api", "javascript", "figma"],
    image: "/media/side-hustles/quizzo.webp",
    liveUrl: "https://github.com/deepdhar/Quizzo",
    color: "#2e9d8f",
  },
];
