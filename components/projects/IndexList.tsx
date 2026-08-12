import Link from "next/link";
import { projects } from "@/data/projects";

/**
 * Shows the project index list.
 * - When `hovering` is false (default): all names are dark/foreground — equally prominent.
 * - When `hovering` is true (mouse is over the InfiniteStrip): the active (centred)
 *   project is bold/dark and the rest dim to muted.
 */
export function IndexList({
  activeSlug,
  hovering = false,
}: {
  activeSlug?: string;
  hovering?: boolean;
}) {
  return (
    <div className="text-right">
      <div className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">
        Index
      </div>
      <ul className="flex flex-col gap-2">
        {projects.map((project) => {
          const isActive = project.slug === activeSlug;

          // When not hovering: every item is dark + normal weight (equally visible).
          // When hovering: active item bolds up, others dim to muted.
          const className = hovering
            ? `font-body text-base transition-colors duration-200 ${
                isActive
                  ? "font-semibold text-foreground"
                  : "text-muted hover:text-foreground"
              }`
            : "font-body text-base text-foreground transition-colors duration-200 hover:text-muted";

          return (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                data-cursor="link"
                className={className}
              >
                {project.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
