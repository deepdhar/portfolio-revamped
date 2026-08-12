import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { CaseStudyCarousel } from "@/components/projects/CaseStudyCarousel";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Deep Dhar`,
    description: project.description,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const index = projects.findIndex((p) => p.slug === params.slug);
  const project = projects[index];
  if (!project) notFound();

  const nextProject = projects[(index + 1) % projects.length]!;

  return (
    <div className="pt-[var(--nav-height)]">
      <div className="container-edge flex items-center gap-2 pt-8 font-mono text-xs uppercase tracking-[0.14em] text-muted">
        <Link href="/" data-cursor="link" className="transition-colors hover:text-foreground">
          ← Index
        </Link>
      </div>

      <div className="container-edge flex justify-center py-20 sm:py-28">
        <h1 className="font-display text-display-1 font-black uppercase text-foreground">
          {project.title}
        </h1>
      </div>

      <CaseStudyCarousel slug={project.slug} />

      <div className="container-edge grid grid-cols-1 gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_auto_auto_auto] lg:items-start lg:gap-16">
        <p className="max-w-md font-body text-base leading-relaxed text-foreground/90">
          {project.description}
        </p>

        <div>
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Year
          </div>
          <div className="font-body text-sm text-foreground">{project.year}</div>
        </div>

        <div>
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Role
          </div>
          <div className="font-body text-sm text-foreground">{project.role}</div>
        </div>

        <div>
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Stack
          </div>
          <div className="flex max-w-xs flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {project.metric && (
        <div className="container-edge pb-16">
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            {project.metric}
          </span>
        </div>
      )}

      <Link
        href={`/work/${nextProject.slug}`}
        data-cursor="link"
        className="container-edge flex items-center justify-between border-t border-border py-10 transition-colors hover:bg-surface"
      >
        <div>
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Next Project
          </div>
          <div className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            {nextProject.title}
          </div>
        </div>
        <span className="font-mono text-xs uppercase tracking-wider text-muted">→</span>
      </Link>
    </div>
  );
}
