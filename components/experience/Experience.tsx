"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/data/experience";
import { revealOnScroll } from "@/lib/animations/helpers";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemsRef.current) {
      revealOnScroll(Array.from(itemsRef.current.children), {
        start: "top 85%",
        stagger: 0.16,
      });
    }

    if (lineRef.current && sectionRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="container-edge py-32 sm:py-40">
      <div className="mb-16 font-mono text-xs uppercase tracking-[0.16em] text-muted">
        Experience
      </div>

      <div className="relative">
        <div
          ref={lineRef}
          aria-hidden="true"
          className="absolute left-0 top-0 hidden h-full w-px bg-accent/50 md:block"
        />

        <div ref={itemsRef} className="flex flex-col divide-y divide-border md:pl-10">
          {experience.map((role) => (
            <article
              key={role.company}
              className="grid grid-cols-1 gap-4 py-10 md:grid-cols-[1fr_auto_2fr] md:items-start md:gap-10"
            >
              <div className="flex items-baseline gap-3">
                <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {role.company}
                </h3>
                {role.current && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    Current
                  </span>
                )}
              </div>

              <div className="font-mono text-xs uppercase tracking-[0.1em] text-muted md:text-right">
                {role.period}
              </div>

              <div>
                <p className="mb-4 font-body text-sm text-foreground/90 sm:text-base">
                  {role.role}
                </p>
                <p className="mb-5 max-w-lg font-body text-sm leading-relaxed text-muted">
                  {role.summary}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {role.focus.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
