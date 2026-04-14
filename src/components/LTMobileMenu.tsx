"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function LTMobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const close = () => setOpen(false);

  // Wait for client mount before rendering portal
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Hamburger button — stays inside the header */}
      <button
        className="lt-hamburger"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={open ? "lt-bar lt-bar--open-1" : "lt-bar"}></span>
        <span className={open ? "lt-bar lt-bar--open-2" : "lt-bar"}></span>
        <span className={open ? "lt-bar lt-bar--open-3" : "lt-bar"}></span>
      </button>

      {/* Full-screen overlay — portaled to document.body to escape header stacking context */}
      {mounted && open && createPortal(
        <div className="lt-mobile-menu">
          <ul>
            <li><a href="#hearing" onClick={close}>What I'm Hearing</a></li>
            <li><a href="#bring" onClick={close}>What I Bring</a></li>
            <li><a href="#disc" onClick={close}>DISC</a></li>
            <li><a href="#work" onClick={close}>Selected Work</a></li>
            <li><a href="#background" onClick={close}>Background</a></li>
            <li><a href="#contact" className="lt-mobile-cta" onClick={close}>Contact</a></li>
          </ul>
        </div>,
        document.body
      )}
    </>
  );
}
