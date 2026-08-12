"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    function handleScroll() {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (navRef.current) {
        if (y > lastY && y > 200) {
          gsap.to(navRef.current, { yPercent: -100, duration: 0.4, ease: "power2.out" });
        } else {
          gsap.to(navRef.current, { yPercent: 0, duration: 0.4, ease: "power2.out" });
        }
      }
      lastY = y;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleCopyEmail(e: React.MouseEvent) {
    e.preventDefault();
    navigator.clipboard?.writeText("hello@deepdhar.dev").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <nav
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 flex h-[var(--nav-height)] items-center justify-between border-b transition-colors duration-500 ${
        scrolled ? "border-border bg-background/85 backdrop-blur-md" : "border-transparent"
      } container-edge`}
    >
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-[0.14em] text-foreground"
        data-cursor="link"
      >
        Deep&nbsp;Dhar
      </Link>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1 font-mono text-xs uppercase tracking-[0.1em] text-muted">
          <Link
            href="/info"
            className="transition-colors duration-300 hover:text-foreground"
            data-cursor="link"
          >
            Info
          </Link>
          <span>,</span>
          <button
            onClick={handleCopyEmail}
            className="transition-colors duration-300 hover:text-foreground"
            data-cursor="link"
          >
            {copied ? "Copied!" : "Contact"}
          </button>
        </div>

        <ThemeToggle />
      </div>
    </nav>
  );
}



