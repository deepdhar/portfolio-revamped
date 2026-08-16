"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

// Repeat items enough times that the seam is never visible.
const REPEAT = 5;
const items = Array.from({ length: REPEAT }, () => projects).flat();

export function InfiniteStrip({
  onActiveChange,
  onHoverChange,
}: {
  onActiveChange?: (slug: string) => void;
  onHoverChange?: (hovering: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Scroll state managed in refs (no React re-renders during animation)
  const scrollY = useRef(0);
  const targetY = useRef(0);
  const velocity = useRef(0);
  const mouseY = useRef<number | null>(null); // current cursor Y in viewport coords
  const lastActiveSlug = useRef<string | null>(null);
  const isHovering = useRef(false); // only report active while cursor is over strip

  const reportActive = useCallback(
    (slug: string) => {
      if (!isHovering.current) return; // gate: only highlight during hover
      if (slug !== lastActiveSlug.current) {
        lastActiveSlug.current = slug;
        onActiveChange?.(slug);
      }
    },
    [onActiveChange]
  );

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    // ── Measure a single "page" height (one full set of projects)
    const singleHeight = () => inner.scrollHeight / REPEAT;

    // Start mid-strip so we can scroll both directions freely
    const initialOffset = singleHeight() * Math.floor(REPEAT / 2);
    scrollY.current = initialOffset;
    targetY.current = initialOffset;

    // ── Wheel handler — accumulate into target
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetY.current += e.deltaY * 0.8;
    };
    container.addEventListener("wheel", onWheel, { passive: false });

    // ── Hover tracking
    const onEnter = () => {
      isHovering.current = true;
      onHoverChange?.(true);
    };
    const onLeave = () => {
      isHovering.current = false;
      mouseY.current = null;
      onHoverChange?.(false);
      lastActiveSlug.current = null; // reset so re-entry re-fires
    };
    const onMouseMove = (e: PointerEvent) => {
      mouseY.current = e.clientY;
    };
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);
    container.addEventListener("pointermove", onMouseMove, { passive: true });

    // ── rAF loop
    function tick() {
      rafRef.current = requestAnimationFrame(tick);
      const inner = innerRef.current;
      if (!inner) return;

      const pageH = singleHeight();

      // Smooth scroll: lerp toward target
      const prev = scrollY.current;
      scrollY.current += (targetY.current - scrollY.current) * 0.085;

      // Compute raw velocity then smooth it
      const rawVel = scrollY.current - prev;
      velocity.current = velocity.current * 0.75 + rawVel * 0.25;

      // ── Infinite loop seam
      if (scrollY.current > pageH * (REPEAT - 2)) {
        scrollY.current -= pageH;
        targetY.current -= pageH;
      } else if (scrollY.current < pageH) {
        scrollY.current += pageH;
        targetY.current += pageH;
      }

      // ── Apply translate to the inner strip
      inner.style.transform = `translateY(${-scrollY.current}px)`;

      // ── Distortion: scale each card based on distance from center + velocity
      const c = containerRef.current;
      if (!c) return;
      const containerH = c.clientHeight;
      const containerCenter = containerH / 2;
      const absVel = Math.abs(velocity.current);
      const velNorm = Math.min(absVel / 18, 1);

      const cards = inner.querySelectorAll<HTMLElement>("[data-strip-card]");
      let closestDist = Infinity;
      let closestSlug = "";

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distFromCenter = cardCenter - containerCenter;
        const absDistNorm = Math.min(Math.abs(distFromCenter) / containerCenter, 1);

        const shrink = absDistNorm * velNorm * 0.35;
        const scaleX = 1 - shrink;
        const radius = shrink * 60;

        card.style.transform = `scaleX(${scaleX.toFixed(4)})`;
        card.style.borderRadius = `${radius.toFixed(1)}px`;

        const d = Math.abs(distFromCenter);
        if (d < closestDist) {
          closestDist = d;
          closestSlug = card.dataset.slug ?? "";
        }
      });

      // Prefer the card the mouse is physically over; fall back to center card.
      let activeSlug = closestSlug;
      if (mouseY.current !== null) {
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          if (mouseY.current! >= rect.top && mouseY.current! <= rect.bottom) {
            activeSlug = card.dataset.slug ?? "";
          }
        });
      }
      if (activeSlug) reportActive(activeSlug);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("pointermove", onMouseMove);
    };
  }, [reportActive, onHoverChange]);

  return (
    <div
      ref={containerRef}
      className="relative h-[100svh] overflow-hidden"
    >
      {/* ── The inner strip — positioned absolutely so translateY drives it ── */}
      <div ref={innerRef} className="absolute top-0 left-0 w-full will-change-transform">
        {items.map((project, i) => {
          const heights = ["h-[300px]", "h-[380px]", "h-[260px]", "h-[340px]"];
          const h = heights[i % heights.length];

          return (
            <div
              key={`${project.slug}-${i}`}
              data-strip-card
              data-slug={project.slug}
              className="w-full px-6 py-2 will-change-transform"
              style={{ transformOrigin: "center center" }}
            >
              <Link
                href={`/work/${project.slug}`}
                className={`group relative block w-full overflow-hidden bg-surface ${h}`}
                tabIndex={-1}
              >
                {project.mediaReady === false ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-surface">
                    <span className="font-mono text-xs text-muted">image coming soon</span>
                  </div>
                ) : (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="50vw"
                    className="object-cover grayscale transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:scale-[1.04]"
                    priority={i < projects.length}
                  />
                )}
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/5" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Soft top/bottom fade masks */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 z-10"
        style={{ background: "linear-gradient(to bottom, var(--background) 0%, transparent 100%)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 z-10"
        style={{ background: "linear-gradient(to top, var(--background) 0%, transparent 100%)" }}
      />
    </div>
  );
}
