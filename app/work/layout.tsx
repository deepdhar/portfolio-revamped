import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Deep Dhar",
  description:
    "Featured projects by Deep Dhar — frontend architecture, full-stack systems, and AI-assisted development.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
