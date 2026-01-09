import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="kinetic-header">
      <div className="kinetic-container">
        <Link href="/">
          <Image
            src="/logos/kinetic-brand-partners.png"
            alt="Kinetic Brand Partners"
            width={180}
            height={45}
            className="kinetic-logo"
            priority
          />
        </Link>
        <ul className="kinetic-nav">
          <li>
            <Link href="/work">Work</Link>
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
      </div>
    </header>
  );
}
