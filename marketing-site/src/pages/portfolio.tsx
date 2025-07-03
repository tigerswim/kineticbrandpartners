import Link from "next/link";
import { useEffect, useState } from "react";

export default function Portfolio() {
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
            <li><Link href="/leadership">Leadership</Link></li>
            <li><Link href="/portfolio" className="active">Portfolio</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <main className="container">
        <h1>Signature Campaigns &amp; Business Impact</h1>
        <table className="case-table">
          <thead>
            <tr>
              <th>Case Study</th>
              <th>Challenge</th>
              <th>Strategy</th>
              <th>Results</th>
              <th>Awards</th>
            </tr>
          </thead>
          <tbody>
            <tr id="fliptheturf">
              <td>#FlipTheTurf</td>
              <td>Break category noise</td>
              <td>Controversial stance on turf safety + petition drive</td>
              <td>3.95 B impressions; 110 % media efficiency</td>
              <td>Clio Silver &amp; Bronze</td>
            </tr>
            <tr>
              <td>Pennington Reposition</td>
              <td>Modernize 70-year brand</td>
              <td>Consumer insights, MLB partnerships, DTC pilot</td>
              <td>+8.2 % sales; +10 pts awareness</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Johnson&apos;s &quot;Thanks, Mom&quot;</td>
              <td>Reinforce emotional bond</td>
              <td>Debbie Phelps storytelling</td>
              <td>290 M impressions</td>
              <td>J&amp;J Burke Award</td>
            </tr>
            <tr>
              <td>Tucks Revival</td>
              <td>Reverse decline</td>
              <td>Supply-chain fixes + targeted demand gen</td>
              <td>+26.8 % sales</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Ortho Clinical Digital</td>
              <td>Outdated sales enablement</td>
              <td>iPad/app rollout</td>
              <td>Faster sales cycles; stronger HCP KPIs</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </main>
      <footer className="site-footer">
        <p>© <span>{year}</span> Dan Hoeller</p>
      </footer>
    </>
  );
} 