"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A restrained generative field of connected points that drifts slowly
 * and bends subtly toward the cursor — meant to feel like a trace of
 * signal/connection rather than decoration. Renders behind the hero
 * typography at low opacity so it never competes with the text.
 */
export function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmallViewport = window.innerWidth < 768;
    const isLowPower =
      // heuristic: fewer logical cores often correlates with lower-power devices
      (navigator.hardwareConcurrency ?? 8) <= 4;

    if (reducedMotion) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmallViewport ? 1.5 : 2));
    container.appendChild(renderer.domElement);

    const COUNT = isSmallViewport || isLowPower ? 120 : 260;
    const positions = new Float32Array(COUNT * 3);
    const basePositions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 34;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 14;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;
      speeds[i] = 0.2 + Math.random() * 0.6;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: new THREE.Color("#a8bdff"),
      size: 0.055,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Sparse connecting lines for a "circuit trace" feel — only nearest neighbors.
    const lineGeometry = new THREE.BufferGeometry();
    const maxLines = COUNT * 2;
    const linePositions = new Float32Array(maxLines * 2 * 3);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color("#a8bdff"),
      transparent: true,
      opacity: 0.08,
    });
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    function updateLines() {
      let idx = 0;
      const threshold = 4.2;
      for (let i = 0; i < COUNT && idx < maxLines; i++) {
        const ax = positions[i * 3]!;
        const ay = positions[i * 3 + 1]!;
        const az = positions[i * 3 + 2]!;
        for (let j = i + 1; j < COUNT && idx < maxLines; j++) {
          const bx = positions[j * 3]!;
          const by = positions[j * 3 + 1]!;
          const bz = positions[j * 3 + 2]!;
          const dx = ax - bx;
          const dy = ay - by;
          const dz = az - bz;
          const distSq = dx * dx + dy * dy + dz * dz;
          if (distSq < threshold * threshold) {
            linePositions[idx * 6] = ax;
            linePositions[idx * 6 + 1] = ay;
            linePositions[idx * 6 + 2] = az;
            linePositions[idx * 6 + 3] = bx;
            linePositions[idx * 6 + 4] = by;
            linePositions[idx * 6 + 5] = bz;
            idx++;
          }
        }
      }
      lineGeometry.setDrawRange(0, idx * 2);
      if (lineGeometry.attributes.position) {
        lineGeometry.attributes.position.needsUpdate = true;
      }
    }

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    function handlePointerMove(e: PointerEvent) {
      pointer.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    let scrollY = 0;
    function handleScroll() {
      scrollY = window.scrollY;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    let rafId: number;
    let lastLineUpdate = 0;

    function animate(time: number) {
      rafId = requestAnimationFrame(animate);

      pointer.x += (pointer.targetX - pointer.x) * 0.04;
      pointer.y += (pointer.targetY - pointer.y) * 0.04;

      const t = time * 0.0001;
      for (let i = 0; i < COUNT; i++) {
        const bx = basePositions[i * 3]!;
        const by = basePositions[i * 3 + 1]!;
        const bz = basePositions[i * 3 + 2]!;
        const speed = speeds[i]!;
        positions[i * 3] = bx + Math.sin(t * speed + i) * 0.6 + pointer.x * 1.4;
        positions[i * 3 + 1] =
          by + Math.cos(t * speed + i * 1.3) * 0.5 + pointer.y * 1.1 - scrollY * 0.002;
        positions[i * 3 + 2] = bz + Math.sin(t * speed * 0.7 + i) * 0.4;
      }
      if (geometry.attributes.position) {
        geometry.attributes.position.needsUpdate = true;
      }

      // recompute connective lines only every few frames — expensive O(n^2)
      if (time - lastLineUpdate > 140) {
        updateLines();
        lastLineUpdate = time;
      }

      camera.position.x += (pointer.x * 1.5 - camera.position.x) * 0.02;
      camera.position.y += (-pointer.y * 1 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    rafId = requestAnimationFrame(animate);

    function handleResize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", handleResize);

    let visibilityPaused = false;
    function handleVisibility() {
      if (document.hidden) {
        visibilityPaused = true;
        cancelAnimationFrame(rafId);
      } else if (visibilityPaused) {
        visibilityPaused = false;
        rafId = requestAnimationFrame(animate);
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-80"
    />
  );
}
