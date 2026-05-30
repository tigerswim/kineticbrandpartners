"use client";

import { useEffect, useRef, useState } from "react";
import { easeOutCubic, prefersReducedMotion } from "./lib/motion";

type Props = { value?: number; prefix?: string; suffix?: string; decimals?: number; plain?: string };

export default function CountUp({ value = 0, prefix = "", suffix = "", decimals, plain }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(plain ?? `${prefix}0${suffix}`);

  useEffect(() => {
    if (plain) { setText(plain); return; }
    const el = ref.current!;
    const dec = decimals ?? (value % 1 !== 0 ? (value < 10 ? 2 : 1) : 0);
    if (prefersReducedMotion()) {
      setText(`${prefix}${value.toFixed(dec)}${suffix}`); return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        let start: number | null = null;
        const step = (t: number) => {
          if (start === null) start = t;
          const p = Math.min((t - start) / 1500, 1);
          setText(`${prefix}${(value * easeOutCubic(p)).toFixed(dec)}${suffix}`);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, prefix, suffix, decimals, plain]);

  return <div className="res-val" ref={ref}>{plain ? <span className="em">{plain}</span> : text}</div>;
}
