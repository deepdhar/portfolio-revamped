"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";

// ── Photo sources ──────────────────────────────────────────────────────────
// First slot is your real photo. Replace the Unsplash placeholders with your
// own images whenever you're ready (drop them in /public/media/about/).
const PHOTOS = [
  "/media/about/about.jpg",
  "/media/about/about2.jpg",
  "/media/about/about3.jpg",
  "/media/about/about4.jpg",
];

// ── Stacking photo widget ──────────────────────────────────────────────────
function PhotoStack() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mutable refs — no re-renders during animation
  const currentIdx = useRef(0);
  const isAnimating = useRef(false);
  const isColorful = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Set up initial z-stack on mount
  useEffect(() => {
    PHOTOS.forEach((_, i) => {
      const el = layerRefs.current[i];
      if (!el) return;
      if (i === 0) {
        gsap.set(el, { x: "0%", zIndex: 2, scale: 1, opacity: 1 });
      } else {
        // Pre-position off-screen right, beneath current
        gsap.set(el, { x: "100%", zIndex: 1, scale: 1, opacity: 1 });
      }
    });
  }, []);

  // Slide next photo in from right, push current to shadow behind
  const doSwap = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const curr = currentIdx.current;
    const next = (curr + 1) % PHOTOS.length;

    const currEl = layerRefs.current[curr];
    const nextEl = layerRefs.current[next];
    if (!currEl || !nextEl) { isAnimating.current = false; return; }

    // Stage incoming: off-screen right, highest z, already colored if hovered
    gsap.set(nextEl, { x: "100%", zIndex: 4, scale: 1, opacity: 1 });
    applyFilter(nextEl, isColorful.current);
    // Ensure outgoing is on top of other idle layers
    gsap.set(currEl, { zIndex: 3 });

    const tl = gsap.timeline({
      onComplete: () => {
        // Settle z-indices: incoming becomes new "top", outgoing falls to back
        gsap.set(nextEl, { zIndex: 2 });
        gsap.set(currEl, { zIndex: 1 });
        // Apply colorful filter to incoming layer if hovered
        applyFilter(nextEl, isColorful.current);
        // Remove filter from outgoing layer (it's behind)
        applyFilter(currEl, false);
        currentIdx.current = next;
        isAnimating.current = false;
      },
    });

    // Incoming slides fully into frame
    tl.to(nextEl, { x: "0%", duration: 0.65, ease: "expo.out" }, 0);
    // Outgoing shrinks + fades to look like a shadow behind
    tl.to(currEl, { scale: 0.88, opacity: 0.22, duration: 0.65, ease: "expo.out" }, 0);
  }, []);

  // Apply or remove grayscale filter on a layer element
  function applyFilter(el: HTMLDivElement, colored: boolean) {
    const img = el.querySelector("img");
    if (!img) return;
    img.style.filter = colored ? "grayscale(0)" : "grayscale(1)";
  }

  const startCycling = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(doSwap, 2000);
  }, [doSwap]);

  const stopCycling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    isColorful.current = true;

    // Immediately color the current top layer
    const topEl = layerRefs.current[currentIdx.current];
    if (topEl) applyFilter(topEl, true);

    // Start cycling immediately
    startCycling();
  }, [startCycling]);

  const handleMouseLeave = useCallback(() => {
    // Stop cycling
    stopCycling();
    isColorful.current = false;

    // Reset ALL layers back to grayscale
    layerRefs.current.forEach((el) => {
      if (el) applyFilter(el, false);
    });
  }, [stopCycling]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCycling();
    };
  }, [stopCycling]);

  return (
    <div
      ref={wrapRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="about-photo ml-4 hidden shrink-0 sm:block"
      style={{
        position: "relative",
        width: "clamp(160px, 22vw, 280px)",
        aspectRatio: "3/4",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {PHOTOS.map((src, i) => (
        <div
          key={src}
          ref={(el) => { layerRefs.current[i] = el; }}
          style={{
            position: "absolute",
            inset: 0,
            willChange: "transform, opacity",
          }}
        >
          <Image
            src={src}
            alt={`Deep Dhar ${i + 1}`}
            fill={false}
            width={600}
            height={800}
            className="h-full w-full object-cover"
            style={{
              filter: "grayscale(1)",
              transition: "filter 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
}

// ── Main About section ─────────────────────────────────────────────────────
export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-heading",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" }
      );
      gsap.fromTo(
        ".about-photo",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", delay: 0.1 }
      );
      gsap.fromTo(
        ".about-bio p",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out", stagger: 0.1, delay: 0.2 }
      );
      gsap.fromTo(
        ".about-meta > div",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "expo.out", stagger: 0.07, delay: 0.25 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="container-edge flex min-h-[calc(100svh-var(--nav-height))] flex-col justify-between py-8 pb-10"
    >
      {/* ── Top: giant ABOUT + photo ── */}
      <div className="flex items-start justify-between gap-6">
        <h1
          className="about-heading font-display font-black uppercase leading-[0.88] text-foreground"
          style={{ fontSize: "clamp(4.5rem, 13vw, 11rem)", letterSpacing: "-0.02em" }}
        >
          ABOUT
        </h1>

        <PhotoStack />
      </div>

      {/* ── Bottom: bio + meta grid ── */}
      <div className="mt-auto grid grid-cols-1 gap-10 pt-10 md:grid-cols-2 md:gap-16">
        <div className="about-bio flex flex-col gap-4">
          <p className="font-body text-sm leading-relaxed text-foreground sm:text-base">
            I&rsquo;m Deep, a software developer based in Kolkata, India. My focus is
            building fast, interactive products where engineering quality is
            visible in the experience, not hidden beneath it.
          </p>
          <p className="font-body text-sm leading-relaxed text-muted sm:text-base">
            I work across frontend architecture, full-stack systems, and
            mobile — picking whichever layer gets the product where it
            needs to go. I care about how things feel as much as how they function.
          </p>
          <p className="font-body text-sm leading-relaxed text-muted sm:text-base">
            I also explore AI-assisted delivery pipelines — chaining LLM
            tooling into the workflow from design handoff to test generation,
            so shipping doesn&rsquo;t take longer than it should.
          </p>
        </div>

        <div className="about-meta grid grid-cols-2 gap-x-8 gap-y-8 self-start">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">Tools</p>
            <ul className="flex flex-col gap-0.5 font-body text-sm text-foreground">
              {["React, Next.js", "TypeScript", "Three.js, GSAP", "React Native", "Node.js, NestJS"].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">Focus</p>
            <ul className="flex flex-col gap-0.5 font-body text-sm text-foreground">
              {["Frontend architecture", "Full-stack products", "Mobile (React Native)", "AI dev workflows"].map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">Contact</p>
            <a
              href="mailto:dhar2017.slg@gmail.com"
              className="font-body text-sm text-foreground transition-colors hover:text-muted"
              data-cursor="link"
            >
              dhar2017.slg@gmail.com
            </a>
          </div>

          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">Available</p>
            <p className="font-body text-sm text-foreground">Immediate</p>
          </div>
        </div>
      </div>

      <div className="hairline mt-10" />
    </section>
  );
}
