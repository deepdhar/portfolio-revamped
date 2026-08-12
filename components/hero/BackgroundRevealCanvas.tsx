"use client";

import { useEffect, useRef } from "react";

type TrailPoint = { x: number; y: number; born: number };

/**
 * Renders a fullscreen fixed background image and a fullscreen fixed canvas.
 * The canvas is painted every frame with the page background color, hiding
 * the image at rest. Moving the cursor anywhere on the page cuts a soft,
 * healing blob trail through the canvas paint, revealing the image beneath.
 *
 * This component renders NO children and has NO stacking-context side-effects
 * on page content — it must be placed in the DOM before <main> so both layers
 * live in the root stacking context (z-[1] and z-[2]), safely below <main z-[10]>.
 */
export function BackgroundRevealCanvas({ imageSrc }: { imageSrc: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let bgColor = "#f7f6f2";

    function readBg() {
      bgColor =
        getComputedStyle(document.documentElement).getPropertyValue("--background").trim() ||
        "#f7f6f2";
    }

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    readBg();
    resize();
    window.addEventListener("resize", resize);

    const themeObserver = new MutationObserver(readBg);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const TRAIL_MS = 900;
    const MAX_R = 90;
    let points: TrailPoint[] = [];

    const onMove = (e: PointerEvent) => {
      points.push({ x: e.clientX, y: e.clientY, born: performance.now() });
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Touch: also trail on touchmove for mobile blob reveal on scroll
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) points.push({ x: t.clientX, y: t.clientY, born: performance.now() });
    };
    window.addEventListener("touchmove", onTouch, { passive: true });

    let raf: number;
    function render() {
      raf = requestAnimationFrame(render);
      if (!ctx) return;

      const now = performance.now();
      points = points.filter((p) => now - p.born < TRAIL_MS);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Fill with background color — hides the image at rest.
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      if (!points.length) return;

      // Punch healing holes at each trail point — reveals image beneath.
      ctx.globalCompositeOperation = "destination-out";
      for (const p of points) {
        const age = (now - p.born) / TRAIL_MS;
        const eased = 1 - age * age;
        const r = MAX_R * eased;
        if (r <= 0.5) continue;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, `rgba(0,0,0,${0.95 * eased})`);
        g.addColorStop(0.5, `rgba(0,0,0,${0.6 * eased})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
    }
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", resize);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Background image — z-[1] in root stacking context */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt="" className="h-full w-full object-cover" />
      </div>

      {/* Canvas — z-[2] in root stacking context.
          <main> is at z-[10] so all page content sits cleanly above this. */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[2]"
      />
    </>
  );
}
