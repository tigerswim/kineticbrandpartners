// Custom navigation for Earnix page
// Clean, minimal nav with About, Work, Resume download

"use client";

import Link from "next/link";
import { Download, Briefcase, Home, Mail } from "react-feather";

export default function EarnixNav() {
  return (
    <nav className="earnix-nav">
      <div className="earnix-nav-container">
        <div className="earnix-nav-links">
          <Link href="/earnix" className="earnix-nav-link">
            <Home size={16} />
            <span>The Opportunity</span>
          </Link>
          <Link href="/earnix/work" className="earnix-nav-link">
            <Briefcase size={16} />
            <span>Impact</span>
          </Link>
          <a
            href="mailto:danhoeller@gmail.com"
            className="earnix-nav-link earnix-nav-download"
          >
            <Mail size={16} />
            <span>Email</span>
          </a>
          <a
            href="/Dan-Hoeller-Resume-Earnix.pdf"
            className="earnix-nav-link earnix-nav-download"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download size={16} />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
