"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function GCMobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        className="gc-hamburger"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={open ? "gc-bar gc-bar--open-1" : "gc-bar"}></span>
        <span className={open ? "gc-bar gc-bar--open-2" : "gc-bar"}></span>
        <span className={open ? "gc-bar gc-bar--open-3" : "gc-bar"}></span>
      </button>

      {mounted && open && createPortal(
        <div className="gc-mobile-menu">
          <ul>
            <li><a href="#why" onClick={close}>Why GC</a></li>
            <li><a href="#bring" onClick={close}>What I Bring</a></li>
            <li><a href="#work" onClick={close}>Selected Work</a></li>
            <li><a href="#background" onClick={close}>Background</a></li>
            <li><a href="#contact" className="gc-mobile-cta" onClick={close}>Contact</a></li>
          </ul>
        </div>,
        document.body
      )}
    </>
  );
}
