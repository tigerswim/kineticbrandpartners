"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";

type Item = { label: string; href: string };
const ITEMS: Item[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Resume", href: "/resume" },
];

export default function KineticMobileMenu({ active }: { active: string }) {
  const [open, setOpen] = useState(false);

  // Close on route change / resize above breakpoint
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        className="kmobile-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`kmobile-bar ${open ? "open" : ""}`} />
        <span className={`kmobile-bar ${open ? "open" : ""}`} />
        <span className={`kmobile-bar ${open ? "open" : ""}`} />
      </button>

      {open && (
        <div className="kmobile-dropdown" role="dialog" aria-label="Navigation">
          <ul>
            {ITEMS.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  className={active === it.href ? "active" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                </Link>
              </li>
            ))}
            <li>
              <CalendlyButton className="cta">Let&apos;s Talk</CalendlyButton>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
