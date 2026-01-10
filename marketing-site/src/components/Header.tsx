"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="kinetic-header">
        <div className="kinetic-container">
          <Link href="/" onClick={closeMenu}>
            <Image
              src="/logos/kinetic-brand-partners.png"
              alt="Kinetic Brand Partners"
              width={180}
              height={45}
              className="kinetic-logo"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="kinetic-nav">
            <li>
              <Link href="/about">About Me</Link>
            </li>
            <li>
              <Link href="/work">The Work</Link>
            </li>
            <li>
              <Link href="/resume">Resume</Link>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/danhoeller"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#contact" className="kinetic-nav-cta">
                Contact
              </a>
            </li>
          </ul>

          {/* Mobile Hamburger Button */}
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
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`kinetic-mobile-menu ${isMenuOpen ? "is-open" : ""}`}>
        <nav className="kinetic-mobile-nav">
          <Link href="/about" onClick={closeMenu}>
            About Me
          </Link>
          <Link href="/work" onClick={closeMenu}>
            Work
          </Link>
          <Link href="/resume" onClick={closeMenu}>
            Resume
          </Link>
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

      {/* Backdrop */}
      {isMenuOpen && (
        <div className="kinetic-menu-backdrop" onClick={closeMenu}></div>
      )}
    </>
  );
}
