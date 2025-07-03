import Link from "next/link";
import { useEffect, useState } from "react";

export default function Leadership() {
  const [year, setYear] = useState(0);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <>
      <header className="site-header">
        <nav className="container nav-bar">
          <Link href="/" className="logo">Dan Hoeller</Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/leadership" className="active">Leadership</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <main className="container">
        <blockquote className="hero-quote">
          &quot;Great leaders clear paths, not just set direction.&quot;
        </blockquote>

        <h2>Key Leadership Metrics</h2>
        <ul className="metrics-list">
          <li>25-person cross-functional team (Insights, Innovation, Digital, Creative, Customer Marketing & Care)</li>
          <li>Built multi-year innovation pipeline launching <strong>$20 MM+</strong> sustainable products annually</li>
          <li>Managed <strong>$10 – 20 MM+</strong> marketing budgets optimized via Marketing Mix Modeling</li>
        </ul>

        <h2>Case Studies</h2>
        <article className="case">
          <h3>Garden Division Re-org</h3>
          <p>Created a new Innovation team; delivered $20 MM+ pipeline annually.</p>
        </article>
        <article className="case">
          <h3>Digital Field Enablement (Ortho)</h3>
          <p>Rolled out iPads and a custom app to 150+ reps, shortening sales cycles and
            improving HCP engagement.</p>
        </article>
      </main>
      <footer className="site-footer">
        <p>© <span>{year}</span> Dan Hoeller</p>
      </footer>
    </>
  );
} 