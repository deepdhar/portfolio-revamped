"use client";

import { useEffect, useRef } from "react";

type TrailPoint = { x: number; y: number; born: number };

/**
 * Renders a fullscreen fixed background image hidden by a fullscreen fixed
 * canvas. The canvas is painted with the page background color every frame,
 * so the image is invisible at rest. Moving the pointer anywhere on the page
 * cuts a soft, healing blob trail through the canvas, revealing the image
 * behind. The reveal heals back after the cursor stops.
 *
 * Fixed stacking order:
 *   z-[2]  canvas  — background-color fill with healing holes at cursor trail
 *   z-[1]  image   — full-color photo, revealed through canvas holes
 *          (navigation sits at z-50, safely above both)
 *
 * Children are rendered in normal document flow above both fixed layers.
 */
export function ScratchReveal({
  imageSrc,
  children,
}: {
  imageSrc: string;
  children: React.ReactNode;
}) {
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

    function readBackgroundColor() {
      bgColor =
        getComputedStyle(document.documentElement).getPropertyValue("--background").trim() ||
        "#f7f6f2";
    }

    function resize() {
      if (!canvas) return;
      // Use full viewport — canvas covers the entire screen, not just a column.
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    readBackgroundColor();
    resize();
    window.addEventListener("resize", resize);

    // Repaint background color when theme changes at runtime.
    const themeObserver = new MutationObserver(() => readBackgroundColor());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const TRAIL_LIFETIME_MS = 900;
    const MAX_RADIUS = 90;
    let points: TrailPoint[] = [];

    function handlePointerMove(e: PointerEvent) {
      // Use raw clientX/Y — no container bounds needed, effect covers the whole page.
      points.push({ x: e.clientX, y: e.clientY, born: performance.now() });
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    let rafId: number;

    function render() {
      rafId = requestAnimationFrame(render);
      if (!ctx) return;

      const now = performance.now();
      // Drop fully-aged trail points.
      points = points.filter((p) => now - p.born < TRAIL_LIFETIME_MS);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // ── Step 1: Fill the entire canvas with the page background color ──
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      if (points.length === 0) return;

      // ── Step 2: Punch healing holes at each live trail point ──
      ctx.globalCompositeOperation = "destination-out";
      for (const p of points) {
        const age = (now - p.born) / TRAIL_LIFETIME_MS;
        const eased = 1 - age * age; // ease-in² for smooth organic heal
        const radius = MAX_RADIUS * eased;
        if (radius <= 0.5) continue;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        gradient.addColorStop(0, `rgba(0,0,0,${0.95 * eased})`);
        gradient.addColorStop(0.5, `rgba(0,0,0,${0.6 * eased})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
    }

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resize);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* ── Fullscreen background image (fixed, behind canvas) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* ── Fullscreen canvas (fixed, above image, below content) ── */}
      {/* Painted with bg color each frame; cursor trail punches holes revealing the image */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[2]"
      />

      {/* ── All page content — rendered in normal flow inside <main z-[10]> ── */}
      {children}
    </>
  );
}
