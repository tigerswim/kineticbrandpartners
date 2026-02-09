import Link from "next/link";
import { Button } from "./button";

const companyLinks = [
  { href: "/services", label: "Services" },
  { href: "/talent", label: "Talent" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services#strategic-assessments", label: "Strategic Assessments" },
  { href: "/services#product-market-fit", label: "Product Market Fit & GTM" },
  { href: "/services#product-delivery", label: "Product Delivery" },
  { href: "/services#project-rollouts", label: "Project Rollouts" },
  { href: "/services#ai-implementation", label: "AI & Modernization" },
];

export function Footer() {
  return (
    <footer className="bg-bg-surface-alt border-t border-border">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h4 className="text-sm font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-muted hover:text-text-secondary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-muted hover:text-text-secondary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <a href="mailto:jeff@futureforwardpartners.com" className="hover:text-text-secondary transition-colors">
                  jeff@futureforwardpartners.com
                </a>
              </li>
              <li>Atlanta, Georgia</li>
              <li>
                <a href="https://www.linkedin.com/company/future-forward-partners" target="_blank" rel="noopener noreferrer" className="hover:text-text-secondary transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-4">Ready to move forward?</h4>
            <p className="text-text-muted text-sm mb-4">Book a free strategy session.</p>
            <Button href="/contact" variant="text">Let&apos;s talk</Button>
          </div>
        </div>
        <div className="mt-16 pt-6 border-t border-border text-text-muted text-xs">
          &copy; {new Date().getFullYear()} Future Forward Partners. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
