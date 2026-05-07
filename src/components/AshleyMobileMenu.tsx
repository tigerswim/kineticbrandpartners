"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function AshleyMobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        className="ashley-hamburger"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={open ? "ashley-bar ashley-bar--open-1" : "ashley-bar"}></span>
        <span className={open ? "ashley-bar ashley-bar--open-2" : "ashley-bar"}></span>
        <span className={open ? "ashley-bar ashley-bar--open-3" : "ashley-bar"}></span>
      </button>

      {mounted && open && createPortal(
        <div className="ashley-mobile-menu">
          <ul>
            <li><a href="#why" onClick={close}>Three Challenges</a></li>
            <li><a href="#bring" onClick={close}>What I Bring</a></li>
            <li><a href="#work" onClick={close}>Selected Work</a></li>
            <li><a href="#background" onClick={close}>Background</a></li>
            <li><a href="#contact" className="ashley-mobile-cta" onClick={close}>Let&apos;s Talk</a></li>
          </ul>
        </div>,
        document.body
      )}
    </>
  );
}
