"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ease } from "@/lib/motion/config";

const CODE_SNIPPETS = [
  "const universe = await init();",
  "import { cosmos } from '@space/core';",
  "renderer.render(scene, camera);",
  "gl.drawArrays(gl.TRIANGLES, 0);",
  "shader.compile({ vertex, fragment });",
  "stars.forEach(s => s.update(dt));",
  "new THREE.WebGLRenderer({ antialias });",
  "gsap.to(planet, { rotation: 360 });",
];

const STARS = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  top: `${5 + ((i * 47 + 13) % 85)}%`,
  left: `${5 + ((i * 31 + 7) % 85)}%`,
  size: 1 + (i % 3) * 0.7,
  delay: (i * 0.17) % 2,
  duration: 1.5 + (i % 5) * 0.4,
}));

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [snippetIndex, setSnippetIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setDone(true);
      onComplete?.();
      return;
    }

    // Cycle code snippets
    const snippetInterval = setInterval(() => {
      setSnippetIndex((i) => (i + 1) % CODE_SNIPPETS.length);
    }, 380);

    // Rotate rings
    if (ring1Ref.current) {
      gsap.to(ring1Ref.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });
    }
    if (ring2Ref.current) {
      gsap.to(ring2Ref.current, {
        rotation: -360,
        duration: 12,
        repeat: -1,
        ease: "none",
      });
    }

    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.round(counter.value));
      },
      onComplete: () => {
        clearInterval(snippetInterval);
        if (wrapRef.current) {
          gsap.to(wrapRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: ease.expo,
            delay: 0.25,
            onComplete: () => {
              setDone(true);
              onComplete?.();
            },
          });
        } else {
          setDone(true);
          onComplete?.();
        }
      },
    });

    return () => {
      tween.kill();
      clearInterval(snippetInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (done) return null;

  const snippet = CODE_SNIPPETS[snippetIndex] ?? CODE_SNIPPETS[0]!;

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[200] overflow-hidden"
      style={{ background: "var(--background)" }}
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${progress} percent`}
    >
      {/* Background starfield */}
      {STARS.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            background: "var(--muted)",
            opacity: 0.35,
            animationName: "pl-twinkle",
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDirection: "alternate",
          }}
        />
      ))}

      {/* Crosshair lines */}
      <div
        style={{
          position: "absolute",
          width: "1px",
          top: 0,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          background: "var(--border)",
          opacity: 0.2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          height: "1px",
          left: 0,
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          background: "var(--border)",
          opacity: 0.2,
          pointerEvents: "none",
        }}
      />

      {/* Corner code — top left */}
      <div
        style={{
          position: "absolute",
          top: "9%",
          left: "5%",
          fontFamily: "monospace",
          fontSize: "11px",
          letterSpacing: "0.04em",
          color: "var(--muted)",
          opacity: 0.28,
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        <span style={{ color: "var(--accent)" }}>import</span> three{" "}
        <span style={{ color: "var(--accent)" }}>from</span>{" "}
        <span style={{ color: "#4ec9b0" }}>&apos;three&apos;</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: "13%",
          left: "5%",
          fontFamily: "monospace",
          fontSize: "11px",
          color: "var(--muted)",
          opacity: 0.18,
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        {`// initialising cosmos…`}
      </div>

      {/* Corner code — bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: "9%",
          right: "5%",
          fontFamily: "monospace",
          fontSize: "11px",
          letterSpacing: "0.04em",
          color: "var(--muted)",
          opacity: 0.28,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          textAlign: "right",
        }}
      >
        <span style={{ color: "var(--accent)" }}>await</span> scene.
        <span style={{ color: "#dcdcaa" }}>load</span>()
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "13%",
          right: "5%",
          fontFamily: "monospace",
          fontSize: "11px",
          color: "var(--muted)",
          opacity: 0.18,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          textAlign: "right",
        }}
      >
        {`/* rendering ${progress}% */`}
      </div>

      {/* Centre content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {/* Orbit rings + orb */}
        <div
          style={{
            position: "relative",
            width: "160px",
            height: "160px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Ring 1 */}
          <div
            ref={ring1Ref}
            style={{
              position: "absolute",
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              border: "1px solid",
              borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--accent)",
                top: "-3px",
                left: "50%",
                transform: "translateX(-50%)",
                boxShadow: "0 0 8px 2px var(--accent)",
              }}
            />
          </div>

          {/* Ring 2 */}
          <div
            ref={ring2Ref}
            style={{
              position: "absolute",
              width: "112px",
              height: "112px",
              borderRadius: "50%",
              border: "1px dashed",
              borderColor: "color-mix(in srgb, var(--muted) 35%, transparent)",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "var(--muted)",
                boxShadow: "0 0 6px 1px var(--muted)",
                bottom: "-2.5px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          </div>

          {/* Planet orb */}
          <div
            style={{
              position: "relative",
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 35%, color-mix(in srgb, var(--accent) 60%, white 40%), color-mix(in srgb, var(--accent) 80%, black 30%) 60%, #000 100%)",
              boxShadow:
                "0 0 32px 10px color-mix(in srgb, var(--accent) 38%, transparent), 0 0 64px 20px color-mix(in srgb, var(--accent) 16%, transparent)",
              animationName: "pl-pulse",
              animationDuration: "2.4s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDirection: "alternate",
            }}
          >
            {/* Orb specular highlight */}
            <div
              style={{
                position: "absolute",
                inset: "6px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), transparent 65%)",
              }}
            />
          </div>
        </div>

        {/* Name label */}
        <p
          style={{
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--muted)",
            margin: 0,
          }}
        >
          Deep Dhar
        </p>

        {/* Cycling code text */}
        <div
          key={snippetIndex}
          style={{
            fontFamily: "monospace",
            fontSize: "11px",
            letterSpacing: "0.04em",
            color: "var(--accent)",
            opacity: 0.6,
            height: "16px",
            whiteSpace: "nowrap",
            animationName: "pl-fade",
            animationDuration: "0.32s",
            animationTimingFunction: "ease",
            animationFillMode: "both",
          }}
        >
          {snippet}
        </div>

        {/* Progress bar */}
        <div
          style={{
            position: "relative",
            width: "260px",
            height: "2px",
            background: "var(--border)",
            borderRadius: "2px",
            overflow: "visible",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              height: "100%",
              width: `${progress}%`,
              borderRadius: "2px",
              background:
                "linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 60%, white 40%))",
              boxShadow:
                "0 0 10px 2px color-mix(in srgb, var(--accent) 55%, transparent)",
              transition: "width 0.1s linear",
            }}
          />
          {[25, 50, 75].map((t) => (
            <div
              key={t}
              style={{
                position: "absolute",
                top: "-3px",
                left: `${t}%`,
                width: "1px",
                height: "8px",
                background: "var(--border)",
                transform: "translateX(-50%)",
              }}
            />
          ))}
        </div>

        {/* Percentage counter */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "2px",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "42px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--foreground)",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {progress}
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "18px",
              fontWeight: 400,
              color: "var(--muted)",
            }}
          >
            %
          </span>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes pl-twinkle {
          from { opacity: 0.08; transform: scale(0.6); }
          to   { opacity: 0.65; transform: scale(1.4); }
        }
        @keyframes pl-pulse {
          from { box-shadow: 0 0 32px 10px color-mix(in srgb, var(--accent) 38%, transparent), 0 0 64px 20px color-mix(in srgb, var(--accent) 16%, transparent); }
          to   { box-shadow: 0 0 50px 16px color-mix(in srgb, var(--accent) 55%, transparent), 0 0 100px 32px color-mix(in srgb, var(--accent) 24%, transparent); }
        }
        @keyframes pl-fade {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 0.6; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
