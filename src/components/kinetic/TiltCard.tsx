"use client";

import { useRef } from "react";

type Props = { children: React.ReactNode; className?: string };

export default function TiltCard({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const card = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    card.style.transform = `perspective(800px) rotateX(${(py - 0.5) * -8}deg) rotateY(${(px - 0.5) * 10}deg) translateY(-4px)`;
    card.style.setProperty("--mx", `${px * 100}%`);
    card.style.setProperty("--my", `${py * 100}%`);
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div ref={ref} className={["pcard", className].filter(Boolean).join(" ")} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}
