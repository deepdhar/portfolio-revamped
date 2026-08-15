"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { projects } from "@/data/projects";

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const index = projects.findIndex((p) => p.slug === params.slug);
  const project = projects[index];

  // Refs
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const overscrollAccum = useRef(0);
  const lastScrollY = useRef(0);

  // Entrance animation
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!pageRef.current) return;

    // Reset scroll to top on route change
    window.scrollTo(0, 0);

    // Entrance animation: fade + slide up
    const tl = gsap.timeline({
      onComplete: () => setEntered(true),
    });

    tl.fromTo(
      pageRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" }
    );

    return () => {
      tl.kill();
    };
  }, [params.slug]);

  // Transition to next project
  const goToNextProject = useCallback(() => {
    if (isTransitioning.current || !project) return;
    isTransitioning.current = true;

    const nextProject = projects[(index + 1) % projects.length]!;

    // Exit animation: slide up + fade out
    if (pageRef.current) {
      gsap.to(pageRef.current, {
        opacity: 0,
        y: -80,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          router.push(`/work/${nextProject.slug}`);
        },
      });
    } else {
      router.push(`/work/${nextProject.slug}`);
    }
  }, [index, project, router]);

  // Scroll / wheel detection: trigger next project when user overscrolls past content bottom
  useEffect(() => {
    if (!project) return;

    const OVERSCROLL_THRESHOLD = 150; // pixels of "extra" scroll needed to trigger

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) {
        e.preventDefault();
        return;
      }

      // Only care about scrolling DOWN (positive deltaY)
      if (e.deltaY <= 0) {
        overscrollAccum.current = 0;
        return;
      }

      const scrollTop = window.scrollY;
      const windowH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      const atBottom = scrollTop + windowH >= docH - 5;

      if (atBottom) {
        overscrollAccum.current += e.deltaY;
        e.preventDefault(); // prevent rubber-band bounce

        if (overscrollAccum.current >= OVERSCROLL_THRESHOLD) {
          overscrollAccum.current = 0;
          goToNextProject();
        }
      } else {
        overscrollAccum.current = 0;
      }
    };

    // Touch handling for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
      lastScrollY.current = window.scrollY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioning.current) return;

      const touchY = e.touches[0]?.clientY ?? 0;
      const deltaY = touchStartY - touchY; // positive = scrolling down

      if (deltaY <= 0) {
        overscrollAccum.current = 0;
        return;
      }

      const scrollTop = window.scrollY;
      const windowH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      const atBottom = scrollTop + windowH >= docH - 5;

      if (atBottom) {
        overscrollAccum.current += deltaY * 0.5;

        if (overscrollAccum.current >= OVERSCROLL_THRESHOLD) {
          overscrollAccum.current = 0;
          goToNextProject();
        }
      }
    };

    const handleTouchEnd = () => {
      overscrollAccum.current = 0;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [project, goToNextProject]);

  // Reset overscroll + transitioning on slug change
  useEffect(() => {
    isTransitioning.current = false;
    overscrollAccum.current = 0;
  }, [params.slug]);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-[var(--nav-height)]">
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          Project not found
        </div>
      </div>
    );
  }

  const nextProject = projects[(index + 1) % projects.length]!;

  return (
    <div
      ref={pageRef}
      className="pt-[var(--nav-height)]"
      style={{ opacity: 0 }} /* starts hidden, GSAP reveals */
    >
      {/* Back link */}
      <div className="container-edge flex items-center gap-2 pt-8 font-mono text-xs uppercase tracking-[0.14em] text-muted">
        <Link
          href="/"
          data-cursor="link"
          className="transition-colors hover:text-foreground"
        >
          ← Index
        </Link>
      </div>

      {/* Main content: two-column layout */}
      <div
        ref={contentRef}
        className="container-edge grid min-h-[calc(100svh-var(--nav-height)-3rem)] grid-cols-1 items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16"
      >
        {/* ── Left panel ── */}
        <div>
          <h1
            className="font-display font-black uppercase text-foreground"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              lineHeight: 0.94,
              letterSpacing: "-0.02em",
            }}
          >
            {project.title}
          </h1>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="mt-4 inline-flex items-center gap-1 font-body text-sm text-accent transition-colors hover:text-foreground"
            >
              View {project.title} →
            </a>
          ) : (
            <span className="mt-4 inline-block font-body text-sm text-muted">
              View {project.title}
            </span>
          )}

          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-foreground/80">
            {project.description}
          </p>

          {/* Tech stack pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.metric && (
            <div className="mt-5">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                {project.metric}
              </span>
            </div>
          )}

          {/* Meta row */}
          <div className="mt-8 flex gap-10">
            <div>
              <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Year
              </div>
              <div className="font-body text-sm text-foreground">
                {project.year}
              </div>
            </div>
            <div>
              <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Role
              </div>
              <div className="font-body text-sm text-foreground">
                {project.role}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right panel — project image ── */}
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-lg overflow-hidden">
            <Image
              src={project.coverImage}
              alt={project.title}
              width={800}
              height={600}
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* ── Next project hint at bottom ── */}
      <div className="container-edge border-t border-border py-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Next Project
            </div>
            <div className="font-display text-lg font-bold text-foreground sm:text-2xl">
              {nextProject.title}
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 text-muted">
            <span className="font-mono text-[9px] uppercase tracking-wider">
              Scroll down
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="animate-bounce"
            >
              <path
                d="M8 3v10M4 9l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
