"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { splitTextReveal, fadeIn } from "@/lib/animations/helpers";
import { IndexList } from "@/components/projects/IndexList";
import { InfiniteStrip } from "@/components/projects/InfiniteStrip";
import { HeroFooter } from "@/components/hero/HeroFooter";
import { projects } from "@/data/projects";

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const [activeSlug, setActiveSlug] = useState<string | undefined>(projects[0]?.slug);
  const [stripHovered, setStripHovered] = useState(false);
  // Mobile contact copy state (separate from desktop HeroFooter)
  const [mobileCopied, setMobileCopied] = useState(false);

  function handleMobileCopy() {
    navigator.clipboard?.writeText("dhar2017.slg@gmail.com").catch(() => { });
    setMobileCopied(true);
    setTimeout(() => setMobileCopied(false), 1800);
  }

  useEffect(() => {
    const STORAGE_KEY = "hero-intro-done";
    const alreadyPlayed = sessionStorage.getItem(STORAGE_KEY);

    if (alreadyPlayed) {
      if (roleRef.current) gsap.set(roleRef.current, { opacity: 1, y: 0 });
      if (indexRef.current) gsap.set(indexRef.current, { opacity: 1, y: 0 });
      if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1 });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "expo.out" },
      delay: 1.9,
      onComplete: () => sessionStorage.setItem(STORAGE_KEY, "true"),
    });


    if (headlineRef.current) tl.add(splitTextReveal(headlineRef.current, { delay: 0 }), 0.1);
    if (roleRef.current) tl.add(fadeIn(roleRef.current, { d: 0.7 }), 0.55);
    if (indexRef.current) tl.add(fadeIn(indexRef.current, { d: 0.7 }), 0.75);

    return () => { tl.kill(); };
  }, []);

  return (
    <section id="top" className="grid grid-cols-1 lg:grid-cols-2">
      {/* ── Left column: identity, headline, index, footer ── */}
      <div className="container-edge flex flex-col justify-between pb-16 pt-[calc(var(--nav-height)+0.5rem)] lg:min-h-[100svh] lg:pb-12">
        <div>
          <h1
            ref={headlineRef}
            className="max-w-xl font-display text-display-1 font-black uppercase text-foreground"
          >
            Software
            <br />
            Engineer
          </h1>

          <p
            ref={roleRef}
            className="mt-6 max-w-sm font-body text-base leading-relaxed text-muted sm:text-lg"
          >
            I design and build software that feels intuitive and works reliably.
            I focus on systems that stay fast as they grow, and on integrating intelligence without adding unnecessary complexity.
          </p>
        </div>

        {/* Index list — desktop only */}
        <div ref={indexRef} className="mt-20 hidden lg:block lg:mt-0">
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

      {/* ── Mobile: project cards + contact at bottom ── */}
      <div className="lg:hidden">
        {/* Project cards — normal page scroll */}
        <div className="container-edge mt-8 flex flex-col gap-1">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block"
            >
              <div
                className="relative w-full overflow-hidden"
                style={{ height: "64vw", maxHeight: 320 }}
              >
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="object-cover grayscale transition-[filter,transform] duration-700 group-active:grayscale-0"
                  priority={project.slug === projects[0]?.slug}
                />
              </div>
              <p className="mt-2 mb-6 font-body text-sm font-medium text-foreground">
                {project.title}
              </p>
            </Link>
          ))}
        </div>

        {/* Contact — mobile only, below carousel */}
        <div className="container-edge mt-4 pb-16">
          <div className="hairline mb-8" />
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
      </div>
    </section>
  );
}
