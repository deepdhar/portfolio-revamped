import { redirect } from "next/navigation";
import { projects } from "@/data/projects";

/**
 * /work redirects to the first project's dedicated page.
 * Each project lives at /work/[slug] with scroll-to-next behavior.
 */
export default function WorkIndexPage() {
  redirect(`/work/${projects[0]?.slug ?? ""}`);
}
