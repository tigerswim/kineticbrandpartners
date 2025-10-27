// src/components/Header.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  currentPage: 'home' | 'consumer' | 'b2b';
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'consumer', label: 'Consumer Brands', path: '/consumer' },
    { id: 'b2b', label: 'B2B Brands', path: '/b2b' }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="site-header">
      <div className="container">
        <nav className="nav-bar">
          <Link href="/" className="logo">
            Kinetic Brand Partners
          </Link>

          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            {navigationItems.map(item => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={currentPage === item.id ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
