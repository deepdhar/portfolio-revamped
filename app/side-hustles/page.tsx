"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sideHustles } from "@/data/sideHustles";

gsap.registerPlugin(ScrollTrigger);

export default function SideHustlesPage() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the timeline line growing
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 0.6,
            },
          }
        );
      }

      // Animate each project card
      sectionRefs.current.forEach((section) => {
        if (!section) return;

        const image = section.querySelector("[data-hustle-image]");
        const content = section.querySelector("[data-hustle-content]");
        const dot = section.querySelector("[data-hustle-dot]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        });

        if (dot) {
          tl.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" },
            0
          );
        }

        if (content) {
          tl.fromTo(
            content,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" },
            0.1
          );
        }

        if (image) {
          tl.fromTo(
            image,
            { opacity: 0, y: 30, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "expo.out" },
            0.15
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="container-edge pt-[calc(var(--nav-height)+2rem)] pb-12">
        <Link
          href="/"
          data-cursor="link"
          className="inline-block font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
        >
          ← Index
        </Link>

        <h1
          className="mt-8 font-display font-black uppercase text-foreground"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            lineHeight: 0.94,
            letterSpacing: "-0.02em",
          }}
        >
          Side Hustles
        </h1>
        <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-muted">
          Personal projects and experiments — built for learning, curiosity, and
          the joy of shipping.
        </p>
      </div>

      {/* Timeline section */}
      <div className="relative container-edge pb-24">
        {/* Center vertical timeline line */}
        <div
          ref={timelineRef}
          className="absolute left-1/2 top-0 bottom-0 hidden w-[2px] -translate-x-1/2 sm:block"
          style={{
            background: "linear-gradient(to bottom, var(--accent), color-mix(in srgb, var(--accent) 50%, transparent))",
            transformOrigin: "top center",
          }}
        />

        {/* Projects */}
        <div className="flex flex-col gap-16 sm:gap-24">
          {sideHustles.map((hustle, i) => {
            const isEven = i % 2 === 0;

            return (
              <div
                key={hustle.slug}
                ref={(el) => {
                  sectionRefs.current[i] = el;
                }}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  data-hustle-dot
                  className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:block"
                >
                  <div
                    className="h-4 w-4 rounded-full border-[3px] bg-background"
                    style={{
                      borderColor: hustle.color,
                    }}
                  />
                </div>

                {/* Horizontal connector line */}
                <div
                  className="absolute top-1/2 hidden h-[1px] sm:block"
                  style={{
                    background: hustle.color,
                    ...(isEven
                      ? { right: "50%", left: "25%" }
                      : { left: "50%", right: "25%" }),
                  }}
                />

                {/* Content row */}
                <div
                  className={`flex flex-col items-center gap-6 sm:flex-row sm:gap-[80px] ${
                    isEven ? "" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`flex w-full justify-center ${
                      isEven ? "sm:justify-start" : "sm:justify-end"
                    }`}
                  >
                    <a
                      href={hustle.liveUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-hustle-image
                      className="group relative flex flex-col items-center"
                    >
                      <div
                        className="relative max-w-[400px] overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.12]"
                        style={{
                          filter: `drop-shadow(0 0 40px ${hustle.color}40)`,
                        }}
                      >
                        <Image
                          src={hustle.image}
                          alt={hustle.title}
                          width={500}
                          height={350}
                          className="h-auto w-full object-contain"
                          style={{
                            filter: `drop-shadow(0 0 60px ${hustle.color})`,
                          }}
                        />
                      </div>
                      {/* Floating label */}
                      <span
                        className="mt-2 flex items-center gap-1 rounded px-2 py-1 text-sm font-bold transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 sm:absolute sm:left-1/2 sm:top-4 sm:-translate-x-1/2 sm:mt-0"
                        style={{ background: hustle.color, color: isLightColor(hustle.color) ? "#111" : "#fff" }}
                      >
                        {hustle.title}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </span>
                    </a>
                  </div>

                  {/* Text content */}
                  <div data-hustle-content className="w-full">
                    <h3
                      className="font-display text-2xl font-bold md:text-4xl"
                      style={{ color: hustle.color }}
                    >
                      {hustle.title}
                    </h3>
                    <span
                      className="text-base md:text-lg"
                      style={{ color: hustle.color }}
                    >
                      ({hustle.subtitle})
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80 md:text-base">
                      {hustle.description}
                    </p>

                    <ul className="mt-3 flex flex-wrap gap-2">
                      {hustle.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-border px-[10px] py-[5px] font-mono text-xs text-muted"
                        >
                          #{tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="container-edge border-t border-border py-10">
        <Link
          href="/"
          data-cursor="link"
          className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-foreground"
        >
          ← Back to Index
        </Link>
      </div>
    </div>
  );
}

/** Quick helper — returns true if a hex colour is "light" (so we use dark text on it). */
function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  // Perceived luminance
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}
