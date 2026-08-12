"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { revealOnScroll } from "@/lib/animations/helpers";

/**
 * Varied panel heights so the stack doesn't read as a uniform grid —
 * matches the reference's mix of tall/short photo crops.
 */
const PANEL_HEIGHTS = ["h-[440px]", "h-[520px]", "h-[380px]", "h-[460px]"];

export function ImageStack({
  onActiveChange,
}: {
  onActiveChange?: (slug: string) => void;
}) {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stackRef.current) {
      revealOnScroll(Array.from(stackRef.current.children), {
        start: "top 95%",
        y: 24,
        stagger: 0.1,
      });
    }
  }, []);

  // Tracks which panel is most centered in its scroll container and reports
  // it upward so the Index list can bold the matching entry — mirrors the
  // reference's scroll-synced index highlight.
  useEffect(() => {
    if (!onActiveChange || !stackRef.current) return;

    const panels = Array.from(stackRef.current.children) as HTMLElement[];
    const scrollRoot = stackRef.current.closest("[data-scroll-root]") as HTMLElement | null;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const slug = (visible.target as HTMLElement).dataset.slug;
          if (slug) onActiveChange(slug);
        }
      },
      { root: scrollRoot, threshold: [0.5, 0.75] }
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, [onActiveChange]);

  return (
    <div ref={stackRef} className="flex flex-col">
      {projects.map((project, i) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          data-slug={project.slug}
          data-cursor="view"
          className={`group relative block w-full overflow-hidden bg-surface ${
            PANEL_HEIGHTS[i % PANEL_HEIGHTS.length]
          }`}
        >
          {/* Temporary stock cover photo (Unsplash, free-to-use license) — swap for your
              own project screenshot at public/media/work/<slug>/cover.jpg, see data/projects.ts */}
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover grayscale transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/10" />
        </Link>
      ))}
    </div>
  );
}



