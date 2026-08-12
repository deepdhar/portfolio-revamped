import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { duration, ease, stagger } from "@/lib/motion/config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Simple fade + rise entrance, used for generic elements. */
export function fadeIn(
  target: gsap.TweenTarget,
  opts: { delay?: number; y?: number; d?: number } = {}
) {
  const reduced = prefersReducedMotion();
  return gsap.fromTo(
    target,
    { opacity: 0, y: reduced ? 0 : opts.y ?? 24 },
    {
      opacity: 1,
      y: 0,
      duration: reduced ? 0.01 : opts.d ?? duration.base,
      ease: ease.expo,
      delay: opts.delay ?? 0,
    }
  );
}

/** Scroll-triggered reveal: element rises + fades as it enters viewport. */
export function revealOnScroll(
  target: gsap.TweenTarget,
  opts: { start?: string; y?: number; stagger?: number } = {}
) {
  const reduced = prefersReducedMotion();
  const triggerEl = resolveTriggerElement(target);
  return gsap.fromTo(
    target,
    { opacity: 0, y: reduced ? 0 : opts.y ?? 40 },
    {
      opacity: 1,
      y: 0,
      duration: reduced ? 0.01 : duration.slow,
      ease: ease.expo,
      stagger: reduced ? 0 : opts.stagger ?? stagger.base,
      scrollTrigger: triggerEl
        ? {
            trigger: triggerEl,
            start: opts.start ?? "top 85%",
            toggleActions: "play none none reverse",
          }
        : undefined,
    }
  );
}

/** Resolves a usable ScrollTrigger `trigger` element from a variety of gsap target shapes. */
function resolveTriggerElement(target: gsap.TweenTarget): Element | string | null {
  if (typeof target === "string") return target;
  if (target instanceof Element) return target;
  if (typeof target === "object" && target !== null && "length" in target) {
    const first = (target as ArrayLike<Element>)[0];
    return first instanceof Element ? first : null;
  }
  return null;
}

/** Splits text into line-spans for a masked reveal animation. Call after DOM mount. */
export function splitTextReveal(el: HTMLElement, opts: { delay?: number } = {}) {
  const reduced = prefersReducedMotion();
  const text = el.textContent ?? "";
  const words = text.split(" ");
  el.innerHTML = words
    .map(
      (w) =>
        `<span class="split-line"><span style="transform: translateY(${
          reduced ? "0" : "110%"
        })">${w}&nbsp;</span></span>`
    )
    .join("");

  const spans = el.querySelectorAll("span > span");
  return gsap.to(spans, {
    y: 0,
    duration: reduced ? 0.01 : duration.slow,
    ease: ease.expo,
    stagger: reduced ? 0 : stagger.tight,
    delay: opts.delay ?? 0,
  });
}

/** Parallax translation tied to scroll position of a trigger element. */
export function parallax(target: gsap.TweenTarget, trigger: Element, amount = 80) {
  const reduced = prefersReducedMotion();
  if (reduced) return;
  return gsap.fromTo(
    target,
    { y: -amount },
    {
      y: amount,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
}

/** Scales an element down slightly as it scrolls past, for editorial depth. */
export function scaleOnScroll(target: gsap.TweenTarget, trigger: Element) {
  const reduced = prefersReducedMotion();
  if (reduced) return;
  return gsap.fromTo(
    target,
    { scale: 1.08 },
    {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "top 20%",
        scrub: true,
      },
    }
  );
}

/** Magnetic hover effect: element subtly follows cursor within its bounds. */
export function magneticHover(el: HTMLElement, strength = 0.35) {
  if (prefersReducedMotion()) return () => {};

  const handleMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: relX * strength,
      y: relY * strength,
      duration: 0.5,
      ease: ease.power3,
    });
  };

  const handleLeave = () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: ease.expo });
  };

  el.addEventListener("mousemove", handleMove);
  el.addEventListener("mouseleave", handleLeave);

  return () => {
    el.removeEventListener("mousemove", handleMove);
    el.removeEventListener("mouseleave", handleLeave);
  };
}
