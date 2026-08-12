"use client";

import { useEffect, useRef } from "react";
import { revealOnScroll } from "@/lib/animations/helpers";

const DETAILS = [
  {
    label: "Focus",
    body: "Frontend architecture, React and Next.js systems, and full-stack products where interaction quality is part of the engineering spec.",
  },
  {
    label: "AI-assisted development",
    body: "Chaining LLM tools into the delivery pipeline itself — from Figma-to-code through to test generation — to compress how fast an idea reaches production.",
  },
  {
    label: "Mobile",
    body: "React Native architecture for products that need to feel native without duplicating engineering effort across platforms.",
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statementRef.current) {
      revealOnScroll(statementRef.current.querySelectorAll("span"), {
        start: "top 80%",
        stagger: 0.02,
      });
    }
    if (detailsRef.current) {
      revealOnScroll(detailsRef.current.children, { start: "top 85%", stagger: 0.12 });
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="container-edge py-32 sm:py-40">
      <div className="mb-16 font-mono text-xs uppercase tracking-[0.16em] text-muted">
        About
      </div>

      <p
        ref={statementRef}
        className="max-w-4xl font-display text-display-2 font-extrabold leading-[1.05] text-foreground"
      >
        {"I build interfaces where engineering disappears into the experience."
          .split(" ")
          .map((word, i) => (
            <span
              key={i}
              className="inline-block opacity-100"
              style={{ marginRight: "0.28em" }}
            >
              {word}
            </span>
          ))}
      </p>

      <div
        ref={detailsRef}
        className="mt-24 grid grid-cols-1 gap-12 border-t border-border pt-12 md:grid-cols-3"
      >
        {DETAILS.map((detail) => (
          <div key={detail.label}>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-accent">
              {detail.label}
            </h3>
            <p className="font-body text-base leading-relaxed text-muted">{detail.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
