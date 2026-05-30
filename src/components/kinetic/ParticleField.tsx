"use client";

import { useEffect, useRef } from "react";
import { particleCount, prefersReducedMotion } from "./lib/motion";

type Props = { scope?: "page" | "hero" };

export default function ParticleField({ scope = "hero" }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const cv = ref.current!;
    const cx = cv.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    let W = 0, H = 0, raf = 0, running = true;
    const mouse = { x: -9999, y: -9999 };
    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let parts: P[] = [];

    function resize() {
      W = cv.width = window.innerWidth * dpr;
      H = cv.height = window.innerHeight * dpr;
      cv.style.width = window.innerWidth + "px";
      cv.style.height = window.innerHeight + "px";
    }
    function seed() {
      const n = particleCount(window.innerWidth);
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: (Math.random() * 1.6 + 0.6) * dpr,
      }));
    }
    resize(); seed();

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; };
    const onOut = () => { mouse.x = -9999; mouse.y = -9999; };
    const onResize = () => { resize(); seed(); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("resize", onResize);

    // For hero scope, pause the loop once the hero is scrolled past (perf).
    const onScroll = () => {
      if (scope === "page") return;
      running = window.scrollY < window.innerHeight;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const ACC = "rgba(120,210,225,";
    function tick() {
      raf = requestAnimationFrame(tick);
      if (!running) { cx.clearRect(0, 0, W, H); return; }
      cx.clearRect(0, 0, W, H);
      const R = 170 * dpr;
      for (const p of parts) {
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
        if (d < R && d > 0) { const f = (1 - d / R) * 0.6; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
        p.vx *= 0.95; p.vy *= 0.95; p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
        p.x = Math.max(0, Math.min(W, p.x)); p.y = Math.max(0, Math.min(H, p.y));
        cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 7); cx.fillStyle = ACC + ".5)"; cx.fill();
      }
      // O(n^2) over particles, but particleCount() caps N at 90 (~4k pairs/frame) — safe.
      const L = 110 * dpr;
      for (let i = 0; i < parts.length; i++)
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i], b = parts[j], dd = Math.hypot(a.x - b.x, a.y - b.y);
          if (dd < L) { cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.strokeStyle = ACC + (0.14 * (1 - dd / L)) + ")"; cx.lineWidth = dpr; cx.stroke(); }
        }
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [scope]);

  return <canvas id="kfield" ref={ref} aria-hidden="true" />;
}
