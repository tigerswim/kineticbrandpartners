"use client";

import { useEffect } from "react";

export default function AshleyScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cols = document.querySelectorAll<HTMLElement>(".brief-col");

    if (prefersReduced) {
      cols.forEach((c) => c.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    cols.forEach((col) => {
      const rect = col.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        requestAnimationFrame(() => col.classList.add("is-visible"));
      } else {
        io.observe(col);
      }
    });

    return () => io.disconnect();
  }, []);

  return null;
}
