import type { Metadata } from "next";
import { Archivo, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/transitions/SmoothScrollProvider";
import { Preloader } from "@/components/transitions/Preloader";
import { Navigation } from "@/components/navigation/Navigation";

const display = Archivo({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deep Dhar — Senior Software Developer",
  description:
    "Senior Software Developer crafting fast, intelligent and expressive digital experiences. Frontend architecture, full-stack systems, and AI-assisted development.",
  metadataBase: new URL("https://deepdhar.dev"),
  openGraph: {
    title: "Deep Dhar — Senior Software Developer",
    description:
      "Frontend architecture, full-stack systems, and AI-assisted development.",
    url: "https://deepdhar.dev",
    siteName: "Deep Dhar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deep Dhar — Senior Software Developer",
    description:
      "Frontend architecture, full-stack systems, and AI-assisted development.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        {/* Runs before hydration to avoid a flash of the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <a
          href="#page-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:text-background"
        >
          Skip to content
        </a>
        <div className="noise-overlay" />
        <Preloader />
        <SmoothScrollProvider>
          <Navigation />
          <main id="page-content">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
