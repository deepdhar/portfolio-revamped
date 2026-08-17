"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { splitTextReveal, fadeIn } from "@/lib/animations/helpers";
import { IndexList } from "@/components/projects/IndexList";
import { InfiniteStrip } from "@/components/projects/InfiniteStrip";
import { MobileHorizontalStrip } from "@/components/projects/MobileHorizontalStrip";
import { HeroFooter } from "@/components/hero/HeroFooter";
import { SocialLinks } from "@/components/common/SocialLinks";
import { projects } from "@/data/projects";

// Module-level in-memory flag across client-side page navigations
let hasHeroIntroPlayed = false;

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const [activeSlug, setActiveSlug] = useState<string | undefined>(projects[0]?.slug);
  const [stripHovered, setStripHovered] = useState(false);
  // Mobile contact copy state (separate from desktop HeroFooter)
  const [mobileCopied, setMobileCopied] = useState(false);

  // If returning to home page via client-side navigation, elements are already ready
  const isAlreadyDone = typeof window !== "undefined" && ((window as any).__PRELOADER_DONE__ || hasHeroIntroPlayed);

  function handleMobileCopy() {
    navigator.clipboard?.writeText("dhar2017.slg@gmail.com").catch(() => { });
    setMobileCopied(true);
    setTimeout(() => setMobileCopied(false), 1800);
  }

  useEffect(() => {
    // If preloader already finished or intro already played (e.g. navigated back from another page),
    // immediately show everything without re-triggering entrance animations
    if ((window as any).__PRELOADER_DONE__ || hasHeroIntroPlayed) {
      hasHeroIntroPlayed = true;
      if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1 });
      if (roleRef.current) gsap.set(roleRef.current, { opacity: 1, y: 0 });
      if (indexRef.current) gsap.set(indexRef.current, { opacity: 1, y: 0 });
      return;
    }

    function runIntro() {
      if (hasHeroIntroPlayed) return;
      hasHeroIntroPlayed = true;

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
      });

      if (headlineRef.current) {
        tl.to(headlineRef.current, { opacity: 1, duration: 0.01 }, 0);
      }
      // Animate each line independently so the <br /> layout is preserved
      if (headlineLine1Ref.current) {
        tl.add(splitTextReveal(headlineLine1Ref.current, { delay: 0 }), 0);
      }
      if (headlineLine2Ref.current) {
        tl.add(splitTextReveal(headlineLine2Ref.current, { delay: 0 }), 0.08);
      }
      if (roleRef.current) tl.add(fadeIn(roleRef.current, { d: 0.7 }), 0.45);
      if (indexRef.current) tl.add(fadeIn(indexRef.current, { d: 0.7 }), 0.65);
    }

    document.addEventListener("preloader:done", runIntro, { once: true });

    // Safety fallback timer to guarantee reveal if preloader was skipped
    const fallbackTimer = setTimeout(() => {
      runIntro();
    }, 4000);

    return () => {
      document.removeEventListener("preloader:done", runIntro);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section id="top" className="grid grid-cols-1 lg:grid-cols-2">
      {/* ── Left column: identity, headline, index, footer ── */}
      <div className="container-edge flex flex-col justify-between pb-16 pt-[calc(var(--nav-height)+0.5rem)] lg:min-h-[100svh] lg:pb-12">
        <div>
          <h1
            ref={headlineRef}
            className="max-w-xl font-display text-display-1 font-black uppercase text-foreground"
            style={isAlreadyDone ? undefined : { opacity: 0 }}
          >
            {/* Each word is its own block span so splitTextReveal reads clean textContent per line */}
            <span ref={headlineLine1Ref} className="block">Software</span>
            <span ref={headlineLine2Ref} className="block">Engineer</span>
          </h1>

          <p
            ref={roleRef}
            className="mt-6 max-w-sm font-body text-base leading-relaxed text-muted sm:text-lg"
            style={isAlreadyDone ? undefined : { opacity: 0 }}
          >
            I design and build software that feels intuitive and works reliably.
            I focus on systems that stay fast as they grow, and on integrating intelligence without adding unnecessary complexity.
          </p>
        </div>

        {/* Index list — desktop only */}
        <div ref={indexRef} className="mt-20 hidden lg:block lg:mt-0" style={isAlreadyDone ? undefined : { opacity: 0 }}>
          <IndexList activeSlug={activeSlug} hovering={stripHovered} />
        </div>

        {/* Footer with Contact + Available — desktop only */}
        <div className="hidden lg:block">
          <HeroFooter />
        </div>
      </div>

      {/* ── Right column: infinite strip (desktop only) ── */}
      <div className="hidden lg:block">
        <InfiniteStrip
          onActiveChange={setActiveSlug}
          onHoverChange={setStripHovered}
        />
      </div>

      {/* ── Mobile: horizontal infinite strip + contact at bottom ── */}
      <div className="lg:hidden">
        {/* Work Header */}
        <div className="container-edge mt-12 mb-3 flex items-center justify-between">
          <Link
            href="/work"
            className="font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
          >
            Work →
          </Link>
        </div>

        {/* Project cards — horizontal infinite marquee */}
        <div>
          <MobileHorizontalStrip projects={projects} />
        </div>

        {/* Side Hustles button below strip */}
        <div className="container-edge mt-5 flex items-center justify-between">
          <Link
            href="/side-hustles"
            className="font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
          >
            Side Hustles →
          </Link>
        </div>

        {/* Contact + Socials — mobile only, below carousel */}
        <div className="container-edge mt-8 pb-16">
          <div className="hairline mb-8" />
          <div className="flex items-end justify-between">
            <div>
              <div className="mb-1 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                Contact
              </div>
              <button
                onClick={handleMobileCopy}
                className="font-body text-sm text-foreground transition-colors duration-300 hover:text-muted"
              >
                {mobileCopied ? "Email copied!" : "dhar2017.slg@gmail.com"}
              </button>
            </div>

            <SocialLinks className="flex items-center gap-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
