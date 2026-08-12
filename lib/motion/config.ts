/**
 * Centralized motion system.
 * Every animation in the app should source its timing values from here
 * rather than hardcoding durations/eases inline.
 */

export const ease = {
  expo: "cubic-bezier(0.16, 1, 0.3, 1)",
  power3: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  power2: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
} as const;

export const duration = {
  instant: 0.2,
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
  cinematic: 1.6,
} as const;

export const stagger = {
  tight: 0.03,
  base: 0.06,
  loose: 0.12,
} as const;

export const motionConfig = {
  duration,
  ease,
  stagger,
  smoothness: {
    lenisLerp: 0.1,
    lenisDuration: 1.1,
    cursorLerp: 0.18,
  },
  pageTransition: {
    duration: 0.75,
    ease: ease.expo,
  },
} as const;
