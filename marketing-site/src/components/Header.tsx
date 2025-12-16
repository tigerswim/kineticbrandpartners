// src/components/Header.tsx

'use client';

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="site-header">
      <div className="container">
        <nav className="nav-bar">
          <Link href="/" className="logo">
            Kinetic Brand Partners
          </Link>

          <ul className="nav-links">
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
              <a href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
