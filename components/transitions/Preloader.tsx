"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ease } from "@/lib/motion/config";

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setDone(true);
      onComplete?.();
      return;
    }

    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.round(counter.value)),
      onComplete: () => {
        if (wrapRef.current) {
          gsap.to(wrapRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: ease.expo,
            delay: 0.15,
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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (done) return null;

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[200] flex items-end justify-between bg-background p-6 sm:p-10"
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${progress} percent`}
    >
      <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
        Deep&nbsp;Dhar
      </span>
      <span ref={digitsRef} className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
        {progress}%
      </span>
    </div>
  );
}
