"use client";

import { useEffect, useRef } from "react";

export default function SBDSlash() {
  const slashRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    function sync() {
      const btn = document.querySelector<HTMLElement>(".sbd-page .kinetic-btn--primary");
      const slash = slashRef.current;
      if (!btn || !slash) return;
      const btnWidth = btn.offsetWidth;
      // PNG geometry (measured): yellow shape bottom-right is at 47% of image width.
      // Button clip-path bottom-right corner is at 88% of button width.
      // So: 0.47 * imageWidth = 0.88 * btnWidth → imageWidth = btnWidth * (0.88 / 0.47)
      const imageWidth = btnWidth * (0.88 / 0.47);
      slash.style.width = Math.round(imageWidth) + "px";
    }

    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <img
      ref={slashRef}
      src="/sbd/sbd-slash.png"
      alt=""
      aria-hidden="true"
      className="sbd-slash-accent"
    />
  );
}
