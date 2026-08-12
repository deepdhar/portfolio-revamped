import Link from "next/link";
import { projects } from "@/data/projects";

export function IndexList({ activeSlug }: { activeSlug?: string }) {
  return (
    <div className="text-right">
      <div className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">
        Index
      </div>
      <ul className="flex flex-col gap-2">
        {projects.map((project) => {
          const isActive = project.slug === activeSlug;
          return (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                data-cursor="link"
                className={`font-body text-base transition-colors duration-300 ${
                  isActive
                    ? "font-semibold text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
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


