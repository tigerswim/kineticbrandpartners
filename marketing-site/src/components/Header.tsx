// Server component — renders logo and desktop nav as static HTML.
// Mobile menu interactivity is isolated in MobileMenu (client component).
import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="kinetic-header">
      <div className="kinetic-container">
        <Link href="/">
          <picture>
            <source srcSet="/logos/kinetic-brand-partners.webp" type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/kinetic-brand-partners.png"
              alt="Kinetic Brand Partners"
              width={180}
              height={45}
              className="kinetic-logo"
              fetchPriority="high"
              decoding="sync"
            />
          </picture>
        </Link>

        {/* Desktop Navigation */}
        <ul className="kinetic-nav">
          <li><Link href="/about">About Me</Link></li>
          <li><Link href="/work">The Work</Link></li>
          <li><Link href="/resume">Resume</Link></li>
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
            <a href="#contact" className="kinetic-nav-cta">Contact</a>
          </li>
        </ul>

        {/* Mobile hamburger + overlay (client component) */}
        <MobileMenu />
      </div>
    </header>
  );
}
