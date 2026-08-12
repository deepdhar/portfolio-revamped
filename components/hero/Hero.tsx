"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { splitTextReveal, fadeIn } from "@/lib/animations/helpers";
import { IndexList } from "@/components/projects/IndexList";
import { ImageStack } from "@/components/projects/ImageStack";
import { HeroFooter } from "@/components/hero/HeroFooter";
import { projects } from "@/data/projects";

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const [activeSlug, setActiveSlug] = useState<string | undefined>(projects[0]?.slug);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 1.9 });

    if (metaRef.current) {
      tl.add(fadeIn(metaRef.current, { d: 0.6 }), 0);
    }
    if (headlineRef.current) {
      tl.add(splitTextReveal(headlineRef.current, { delay: 0 }), 0.1);
    }
    if (roleRef.current) {
      tl.add(fadeIn(roleRef.current, { d: 0.7 }), 0.55);
    }
    if (indexRef.current) {
      tl.add(fadeIn(indexRef.current, { d: 0.7 }), 0.75);
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="top" className="grid grid-cols-1 lg:grid-cols-2">
      {/* Left column: identity, headline, index, footer */}
      <div className="container-edge flex flex-col justify-between pb-16 pt-[calc(var(--nav-height)+2.5rem)] lg:min-h-[100svh] lg:pb-12">
        <div>
          <div
            ref={metaRef}
            className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Available for select engagements
          </div>

          <h1
            ref={headlineRef}
            className="max-w-xl font-display text-display-1 font-black uppercase text-foreground"
          >
            Senior Developer
          </h1>

          <p
            ref={roleRef}
            className="mt-6 max-w-sm font-body text-base leading-relaxed text-muted sm:text-lg"
          >
            Building fast, intelligent products with more engineering underneath
            than the surface shows.
          </p>
        </div>

        <div ref={indexRef} className="mt-20 lg:mt-0">
          <IndexList activeSlug={activeSlug} />
        </div>

        <HeroFooter />
      </div>

      {/* Right column: stacked project imagery, scrolls independently on desktop */}
      <div data-scroll-root className="lg:h-[100svh] lg:overflow-y-auto">
        <ImageStack onActiveChange={setActiveSlug} />
      </div>
    </section>
  );
}




