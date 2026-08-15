import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Side Hustles — Deep Dhar",
  description:
    "Personal projects and experiments by Deep Dhar — built for learning, curiosity, and the joy of shipping.",
};

export default function SideHustlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
