"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function WSMobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        className="ws-hamburger"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={open ? "ws-bar ws-bar--open-1" : "ws-bar"}></span>
        <span className={open ? "ws-bar ws-bar--open-2" : "ws-bar"}></span>
        <span className={open ? "ws-bar ws-bar--open-3" : "ws-bar"}></span>
      </button>

      {mounted && open && createPortal(
        <div className="ws-mobile-menu">
          <ul>
            <li><a href="#bring" onClick={close}>What I Bring</a></li>
            <li><a href="#work" onClick={close}>Selected Work</a></li>
            <li><a href="#background" onClick={close}>Background</a></li>
            <li><a href="#contact" className="ws-mobile-cta" onClick={close}>Contact</a></li>
          </ul>
        </div>,
        document.body
      )}
    </>
  );
}
