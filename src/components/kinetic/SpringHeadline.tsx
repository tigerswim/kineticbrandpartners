"use client";

import { useEffect, useRef } from "react";
import { splitIntoWords } from "./lib/motion";

type Props = { lead: string; emphasis?: string; as?: "h1" | "h2"; className?: string };

// Must be rendered inside a `.kinetic` container — all .display/.ch/.word/.em
// styling (incl. inline-block needed for the per-letter transforms) is scoped there.
export default function SpringHeadline({ lead, emphasis, as = "h1", className }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const Tag = as;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const el = ref.current!;
    const chs = Array.from(el.querySelectorAll<HTMLElement>(".ch")).map((node) => ({
      el: node, ox: 0, oy: 0, vx: 0, vy: 0,
    }));
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      chs.forEach((o) => {
        const r = o.el.getBoundingClientRect();
        const cxp = r.left + r.width / 2, cyp = r.top + r.height / 2;
        const dx = cxp - e.clientX, dy = cyp - e.clientY, d = Math.hypot(dx, dy), R = 130;
        if (d < R && d > 0) { const f = (1 - d / R) * 22; o.vx += (dx / d) * f * 0.12; o.vy += (dy / d) * f * 0.12; }
      });
    };
    window.addEventListener("mousemove", onMove);
    function loop() {
      raf = requestAnimationFrame(loop);
      chs.forEach((o) => {
        o.vx += -o.ox * 0.12; o.vy += -o.oy * 0.12; o.vx *= 0.8; o.vy *= 0.8;
        o.ox += o.vx; o.oy += o.vy;
        o.el.style.transform = `translate(${o.ox}px,${o.oy}px)`;
      });
    }
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, [lead, emphasis]);

  const renderSegment = (text: string, em: boolean, keyBase: string) =>
    splitIntoWords(text).map((tok, i) =>
      tok.type === "space" ? (
        <span className="ch sp" key={`${keyBase}-s${i}`}> </span>
      ) : (
        <span className="word" key={`${keyBase}-w${i}`}>
          {tok.chars.map((c, j) => (
            <span className={em ? "ch em" : "ch"} key={`${keyBase}-w${i}-${j}`}>{c}</span>
          ))}
        </span>
      )
    );

  return (
    <Tag ref={ref} className={["display", className].filter(Boolean).join(" ")}>
      {renderSegment(lead, false, "lead")}
      {emphasis ? <>{" "}{renderSegment(emphasis, true, "em")}</> : null}
    </Tag>
  );
}
