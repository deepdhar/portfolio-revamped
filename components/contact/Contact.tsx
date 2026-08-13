"use client";

import { useEffect, useRef, useState } from "react";
import { splitTextReveal } from "@/lib/animations/helpers";

export function Contact() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (headingRef.current) {
      splitTextReveal(headingRef.current);
    }
  }, []);

  function handleCopy() {
    navigator.clipboard?.writeText("dhar2017.slg@gmail.com").catch(() => { });
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section id="contact" className="container-edge py-32 sm:py-40">
      <div className="mb-16 font-mono text-xs uppercase tracking-[0.16em] text-muted">
        Contact
      </div>

      <button
        onClick={handleCopy}
        data-cursor="link"
        className="block text-left font-display text-display-2 font-extrabold leading-[0.98] text-foreground transition-colors duration-300 hover:text-accent"
      >
        <span ref={headingRef}>Let&rsquo;s build something worth shipping.</span>
      </button>

      <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted">
        {copied ? "Email copied" : "dhar2017.slg@gmail.com — click to copy"}
      </p>

      <div className="mt-24 flex flex-col justify-between gap-6 border-t border-border pt-8 font-mono text-xs uppercase tracking-[0.12em] text-muted sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} Deep Dhar</span>
        <div className="flex gap-6">
          <a href="https://github.com/deepdhar" target="_blank" rel="noreferrer" data-cursor="link" className="hover:text-foreground">
            GitHub
          </a>
          <a href="https://linkedin.com/in/deep-dhar" target="_blank" rel="noreferrer" data-cursor="link" className="hover:text-foreground">
            LinkedIn
          </a>
        </div>
        <span>Kolkata, India</span>
      </div>
    </section>
  );
}
