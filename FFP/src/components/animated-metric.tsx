"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedMetricProps = {
  value: string;
  label: string;
  sublabel?: string;
  gradient?: boolean;
};

export function AnimatedMetric({
  value,
  label,
  sublabel,
  gradient = false,
}: AnimatedMetricProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const textClasses = gradient
    ? "bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent"
    : "text-accent";

  return (
    <div
      ref={ref}
      className={`${isVisible ? "animate-scale-in" : "opacity-0"}`}
    >
      <p className={`text-5xl md:text-6xl font-bold ${textClasses}`}>
        {value}
      </p>
      <h3 className="mt-4">{label}</h3>
      {sublabel && <p className="mt-2 text-text-muted">{sublabel}</p>}
    </div>
  );
}
