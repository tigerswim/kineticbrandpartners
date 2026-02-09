"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./button";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/talent", label: "Talent" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        scrolled ? "bg-bg-primary/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-content px-6 flex items-center justify-between h-16">
        <Link href="/" className="text-text-primary font-bold text-lg">
          FFP
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact" className="text-sm">
            Book a Call
          </Button>
        </nav>

        <button
          className="md:hidden text-text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-bg-primary border-t border-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact" className="w-fit">
            Book a Call
          </Button>
        </nav>
      )}
    </header>
  );
}
