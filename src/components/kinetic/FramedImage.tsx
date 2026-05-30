"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./lib/motion";

type Props = {
  src: string; alt: string; width: number; height: number;
  ratio?: string; parallax?: boolean; className?: string;
};

export default function FramedImage({ src, alt, width, height, ratio, parallax, className }: Props) {
  // Parallax is applied to an inner wrapper so it never collides with the
  // outer .frame's [data-reveal] entrance transform (inline style would win
  // over the stylesheet and silently kill the reveal animation).
  const innerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!parallax) return;
    if (prefersReducedMotion()) return;
    const el = innerRef.current!;
    const frame = el.parentElement!;
    const onScroll = () => {
      const r = frame.getBoundingClientRect();
      const prog = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      if (prog > 0 && prog < 1.4) el.style.transform = `translateY(${(prog - 0.5) * 26}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [parallax]);
  return (
    <div className={["frame", className].filter(Boolean).join(" ")} style={ratio ? { aspectRatio: ratio } : undefined} data-reveal>
      <div ref={innerRef} style={{ width: "100%", height: "100%" }}>
        <Image src={src} alt={alt} width={width} height={height} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    </div>
  );
}
