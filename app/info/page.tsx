import type { Metadata } from "next";
import { About } from "@/components/about/About";
import { Experience } from "@/components/experience/Experience";
import { Contact } from "@/components/contact/Contact";

export const metadata: Metadata = {
  title: "Info — Deep Dhar",
  description: "About Deep Dhar — Senior Software Developer. Experience, focus, and background.",
};

export default function InfoPage() {
  return (
    <div className="pt-[var(--nav-height)]">
      <About />
      <Experience />
      <Contact />
    </div>
  );
}
