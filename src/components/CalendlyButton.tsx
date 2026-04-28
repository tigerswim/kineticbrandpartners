"use client";

import { useRef } from "react";

interface CalendlyButtonProps {
  className?: string;
  children: React.ReactNode;
}

function loadCalendly(): Promise<void> {
  return new Promise((resolve) => {
    if ((window as any).Calendly) {
      resolve();
      return;
    }

    // Load CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}

export default function CalendlyButton({ className, children }: CalendlyButtonProps) {
  const loaded = useRef(false);

  const openCalendly = async () => {
    if (!loaded.current) {
      await loadCalendly();
      loaded.current = true;
    }
    (window as any).Calendly?.initPopupWidget({
      url: "https://calendly.com/danhoeller/new-meeting",
    });
  };

  return (
    <button onClick={openCalendly} className={className}>
      {children}
    </button>
  );
}
