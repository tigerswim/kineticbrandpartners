// src/components/Footer.tsx

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; {"2025 Kinetic Brand Partners, LLC. All rights reserved."}</p>
        <nav style={{ margin: '1rem 0' }}>
          <Link href="/consumer" style={{ margin: '0 1rem', color: 'inherit', textDecoration: 'none' }}>
            Consumer Brands
          </Link>
          |
          <Link href="/b2b" style={{ margin: '0 1rem', color: 'inherit', textDecoration: 'none' }}>
            B2B Brands
          </Link>
        </nav>
        <p style={{ fontSize: '0.85rem', marginTop: '1rem' }}>
          {"Consumer Brand Strategy | CPG Launch Expertise | B2B Positioning | Fractional CMO Services"}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
