"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function CalendlyMobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        className="calendly-hamburger"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={open ? "calendly-bar calendly-bar--open-1" : "calendly-bar"}></span>
        <span className={open ? "calendly-bar calendly-bar--open-2" : "calendly-bar"}></span>
        <span className={open ? "calendly-bar calendly-bar--open-3" : "calendly-bar"}></span>
      </button>

      {mounted && open && createPortal(
        <div className="calendly-mobile-menu">
          <ul>
            <li><a href="#why" onClick={close}>The Move</a></li>
            <li><a href="#bring" onClick={close}>What I Bring</a></li>
            <li><a href="#work" onClick={close}>Selected Work</a></li>
            <li><a href="#background" onClick={close}>Background</a></li>
            <li><a href="#contact" className="calendly-mobile-cta" onClick={close}>Let&apos;s Talk</a></li>
          </ul>
        </div>,
        document.body
      )}
    </>
  );
}
