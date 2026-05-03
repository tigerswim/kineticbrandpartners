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

      // Size and position the slash so BOTH its right and left edges are collinear
      // with the button's right and left edges respectively.
      //
      // Slash edges slope from upper-right to lower-left: as y goes DOWN, x DECREASES
      // by PNG_INV_SLOPE per pixel (parallelogram has parallel left/right edges).
      //
      // Slash element coords (in wrapper space): img sits at (slashLeft, slashTop).
      //   Yellow bottom-left  = (slashLeft + 0,                          slashBottom)
      //   Yellow bottom-right = (slashLeft + 0.47 × imageWidth,          slashBottom)
      //
      // Button corners (in wrapper space, since button is left-aligned at 0):
      //   Top-left  = (0,        btnTop)
      //   Top-right = (btnWidth, btnTop)
      //
      // Collinearity (extending each slash bottom corner DOWN through gap g):
      //   LEFT:  slashLeft + 0       - g × INV_SLOPE = 0         → slashLeft = g × INV_SLOPE
      //   RIGHT: slashLeft + 0.47×W  - g × INV_SLOPE = btnWidth  → 0.47×W = btnWidth
      //
      // So:  imageWidth = btnWidth / 0.47
      //      slashLeft  = gap × PNG_INV_SLOPE  (shift right by this much)
      const gapPx = btn.getBoundingClientRect().top - slash.getBoundingClientRect().bottom;
      const safeGap = Math.max(0, gapPx);
      const imageWidth = btnWidth / PNG_BOTTOM_RIGHT_PCT;
      const slashLeftPx = safeGap * PNG_INV_SLOPE;

      slash.style.width = Math.round(imageWidth) + "px";
      slash.style.left = Math.round(slashLeftPx) + "px";

      // Clip the top of the slash so it doesn't extend above the headline.
      // Without this, the slash's natural height (≈ 0.92 × width) reaches up
      // past the title and overlaps the badge pill above the wrapper.
      const wrapper = slash.parentElement;
      const title = wrapper?.querySelector<HTMLElement>(".sbd-title-block");
      if (wrapper && title) {
        const wrapperTop = wrapper.getBoundingClientRect().top;
        const titleTop = title.getBoundingClientRect().top;
        const slashRect = slash.getBoundingClientRect();
        const slashTopInWrapper = slashRect.top - wrapperTop;
        const titleTopInWrapper = titleTop - wrapperTop;
        const slashHeight = slashRect.height || imageWidth * (1379 / 1500);
        const cutPx = Math.max(0, titleTopInWrapper - slashTopInWrapper);
        const cutPct = Math.min(100, (cutPx / slashHeight) * 100);
        slash.style.clipPath = `inset(${cutPct.toFixed(2)}% 0 0 0)`;
      }
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
