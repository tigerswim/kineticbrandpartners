"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Props = {
  src: string; alt: string; width: number; height: number;
  ratio?: string; parallax?: boolean; className?: string;
};

export default function FramedImage({ src, alt, width, height, ratio, parallax, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!parallax) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const prog = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      if (prog > 0 && prog < 1.4) el.style.transform = `translateY(${(prog - 0.5) * 26}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [parallax]);
  return (
    <div ref={ref} className={["frame", className].filter(Boolean).join(" ")} style={ratio ? { aspectRatio: ratio } : undefined} data-reveal>
      <Image src={src} alt={alt} width={width} height={height} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
}
