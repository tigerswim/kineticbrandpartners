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
      slash.style.width = btnWidth + "px";
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
