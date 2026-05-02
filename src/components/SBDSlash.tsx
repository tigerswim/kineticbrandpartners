"use client";

import { useEffect, useRef } from "react";

export default function SBDSlash() {
  const slashRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // PNG geometry (measured from sbd-slash.png, 1500×1379):
    //   Bottom-right of yellow shape: x = 705/1500 = 47.0% of image width
    //   Top-right:                    x = 1499/1500 = 100% of image width
    //   Aspect ratio:                 1379/1500 = 0.9193 (height as fraction of width)
    //   Right-edge slope (dy/dx):     1379 / (1500 - 705) = 1.7346 — for every
    //                                 1px right, edge rises 1.7346px (or falls,
    //                                 depending on direction)
    //   Inverse slope (dx/dy):        1 / 1.7346 = 0.5765 — for every 1px down,
    //                                 the right edge moves 0.5765px to the right
    const PNG_BOTTOM_RIGHT_PCT = 0.47;
    const PNG_INV_SLOPE = 0.5765;

    function sync() {
      const btn = document.querySelector<HTMLElement>(".sbd-page .kinetic-btn--primary");
      const slash = slashRef.current;
      if (!btn || !slash) return;
      const btnWidth = btn.offsetWidth;
      const btnHeight = btn.offsetHeight;
      if (btnWidth === 0 || btnHeight === 0) return;

      // Set the button's clip-path so its right edge is parallel to the slash.
      // Right edge runs from top-right (100%, 0) down to (btnWidth - dx, btnHeight)
      // where dx = btnHeight × PNG_INV_SLOPE.
      const dxPx = btnHeight * PNG_INV_SLOPE;
      const dxPct = (dxPx / btnWidth) * 100;
      const rightBottomPct = 100 - dxPct;
      btn.style.clipPath = `polygon(0% 0%, 100% 0%, ${rightBottomPct.toFixed(2)}% 100%, 0% 100%)`;

      // Now size the slash so its right edge is collinear with the button's right edge.
      // Slash right edge: as y increases (down), x decreases (top-right is at 100%,
      // bottom-right is at 47%). Same direction as button right edge.
      //
      // Slash bottom-right corner sits at (0.47 × imageWidth, slashBottom).
      // Extending DOWN through gap g, x continues to decrease by g × PNG_INV_SLOPE.
      // That landing point must equal button top-right: (btnWidth, btnTop).
      //
      //   (0.47 × imageWidth) - g × PNG_INV_SLOPE = btnWidth
      //   imageWidth = (btnWidth + g × PNG_INV_SLOPE) / 0.47
      const gapPx = btn.getBoundingClientRect().top - slash.getBoundingClientRect().bottom;
      const safeGap = Math.max(0, gapPx);
      const imageWidth = (btnWidth + safeGap * PNG_INV_SLOPE) / PNG_BOTTOM_RIGHT_PCT;

      slash.style.width = Math.round(imageWidth) + "px";
    }

    // Run immediately, after fonts settle, and on resize
    sync();
    const t1 = setTimeout(sync, 100);
    const t2 = setTimeout(sync, 500);
    window.addEventListener("resize", sync);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", sync);
    };
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
