import Link from "next/link";
import { useEffect, useState } from "react";

export default function Contact() {
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
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/contact" className="active">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <main className="container">
        <h1>Let&apos;s Connect</h1>
        <p>Email: <a href="mailto:danhoeller@gmail.com">danhoeller@gmail.com</a></p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/danhoeller" target="_blank" rel="noopener noreferrer">linkedin.com/in/danhoeller</a></p>
        <p>Location: Atlanta, GA (open to relocation)</p>

        <h2>Resume Downloads</h2>
        <ul className="resume-list">
          <li><a href="/assets/resumes/dan-hoeller-resume-cpg.pdf">CPG Resume</a></li>
          <li><a href="/assets/resumes/dan-hoeller-resume-healthcare.pdf">Healthcare Resume</a></li>
          <li><a href="/assets/resumes/dan-hoeller-resume-brand-strategy.pdf">Brand Strategy Resume</a></li>
        </ul>

        <h2>Book a Meeting</h2>
        <iframe
          src="https://calendly.com/danhoeller/30min"
          width="100%"
          height="650"
          frameBorder="0"
          scrolling="no"
          title="Calendly Schedule"
        ></iframe>
      </main>
      <footer className="site-footer">
        <p>© <span>{year}</span> Dan Hoeller</p>
      </footer>
    </>
  );
} 