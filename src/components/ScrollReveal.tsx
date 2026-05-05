"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const root = document.querySelector(".kbp-main");
    if (root) {
      // Trigger headline word stagger on next frame so initial transform is committed first
      requestAnimationFrame(() => root.classList.add("is-loaded"));
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (prefersReduced) {
      els.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        requestAnimationFrame(() => el.classList.add("is-revealed"));
      } else {
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, []);

  return null;
}
