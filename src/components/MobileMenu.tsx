"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <button
        className="kinetic-hamburger"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span className={isMenuOpen ? "active" : ""}></span>
        <span className={isMenuOpen ? "active" : ""}></span>
        <span className={isMenuOpen ? "active" : ""}></span>
      </button>

      <div className={`kinetic-mobile-menu ${isMenuOpen ? "is-open" : ""}`}>
        <nav className="kinetic-mobile-nav">
          <Link href="/about" onClick={closeMenu}>About Me</Link>
          <Link href="/work" onClick={closeMenu}>Work</Link>
          <Link href="/resume" onClick={closeMenu}>Resume</Link>
          <a
            href="https://linkedin.com/in/danhoeller"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            LinkedIn
          </a>
          <a href="#contact" onClick={closeMenu} className="kinetic-nav-cta">
            Contact
          </a>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="kinetic-menu-backdrop" onClick={closeMenu}></div>
      )}
    </>
  );
}
