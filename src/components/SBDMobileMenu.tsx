"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function SBDMobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        className="sbd-hamburger"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={open ? "sbd-bar sbd-bar--open-1" : "sbd-bar"}></span>
        <span className={open ? "sbd-bar sbd-bar--open-2" : "sbd-bar"}></span>
        <span className={open ? "sbd-bar sbd-bar--open-3" : "sbd-bar"}></span>
      </button>

      {mounted && open && createPortal(
        <div className="sbd-mobile-menu">
          <ul>
            <li><a href="#why-sbd" onClick={close}>Why SBD</a></li>
            <li><a href="#what-i-bring" onClick={close}>What I Bring</a></li>
            <li><a href="#work" onClick={close}>Work</a></li>
            <li><a href="#background" onClick={close}>Background</a></li>
            <li><a href="#contact" className="sbd-mobile-cta" onClick={close}>Let's Talk</a></li>
          </ul>
        </div>,
        document.body
      )}
    </>
  );
}
