"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";

const REPEAT = 5;

export function MobileHorizontalStrip({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  const [isControlled, setIsControlled] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number>(0);
  const touchStartX = useRef<number>(0);
  const isDragging = useRef(false);

  const items = Array.from({ length: REPEAT }, () => projects).flat();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Helper: calculate width of one full project set
    const getSingleWidth = () => container.scrollWidth / REPEAT;

    // Initialize scroll position to center set
    const singleWidth = getSingleWidth();
    if (singleWidth > 0) {
      container.scrollLeft = singleWidth * Math.floor(REPEAT / 2);
    }

    const speed = 0.55; // Pixels per frame (~33px/sec at 60fps)

    function loop() {
      rafRef.current = requestAnimationFrame(loop);
      if (!container) return;

      const sw = getSingleWidth();
      if (sw <= 0) return;

      // Handle infinite wrapping
      if (container.scrollLeft >= sw * (REPEAT - 1.5)) {
        container.scrollLeft -= sw;
      } else if (container.scrollLeft <= sw * 0.5) {
        container.scrollLeft += sw;
      }

      // Auto-scroll when user is not interacting
      if (!isInteracting.current) {
        container.scrollLeft += speed;
      }
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [projects]);

  const handleStart = () => {
    isInteracting.current = true;
    isDragging.current = false;
    setIsControlled(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    handleStart();
    touchStartX.current = e.clientX;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart();
    if (e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (Math.abs(e.clientX - touchStartX.current) > 6) {
      isDragging.current = true;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0] && Math.abs(e.touches[0].clientX - touchStartX.current) > 6) {
      isDragging.current = true;
    }
  };

  const handleEnd = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    // Resume auto-scroll and restore black & white after user control ends
    resumeTimer.current = setTimeout(() => {
      isInteracting.current = false;
      setIsControlled(false);
    }, 600);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Side gradient fade masks */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-6"
        style={{
          background: "linear-gradient(to right, var(--background) 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-6"
        style={{
          background: "linear-gradient(to left, var(--background) 0%, transparent 100%)",
        }}
      />

      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handleEnd}
        onPointerCancel={handleEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
        onTouchCancel={handleEnd}
        className="flex w-full gap-4 overflow-x-auto px-6 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "auto",
        }}
      >
        {items.map((project, i) => (
          <div
            key={`${project.slug}-${i}`}
            className="w-[78vw] max-w-[340px] shrink-0 sm:w-[360px]"
          >
            <Link
              href={`/work/${project.slug}`}
              onClick={(e) => {
                // Prevent accidental navigation if the user was dragging/swiping
                if (isDragging.current) {
                  e.preventDefault();
                }
              }}
              className="group block"
            >
              <div
                className="relative w-full overflow-hidden rounded-sm bg-surface"
                style={{ height: "52vw", maxHeight: 260 }}
              >
                {project.mediaReady === false ? (
                  <div className="flex h-full w-full items-center justify-center bg-surface">
                    <span className="font-mono text-xs text-muted">image coming soon</span>
                  </div>
                ) : (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 360px"
                    className={`object-cover transition-[filter,transform] duration-500 group-hover:scale-105 ${
                      isControlled ? "grayscale-0" : "grayscale"
                    }`}
                    priority={i < projects.length}
                  />
                )}
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-active:bg-foreground/5" />
              </div>
              <p className="mt-2.5 font-body text-sm font-medium text-foreground">
                {project.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
