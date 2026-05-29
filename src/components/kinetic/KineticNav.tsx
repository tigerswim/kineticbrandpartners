import Image from "next/image";
import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";
import NavScroll from "./NavScroll";

type Item = { label: string; href: string };
const ITEMS: Item[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Resume", href: "/resume" },
];

export default function KineticNav({ active }: { active: string }) {
  return (
    <>
      <NavScroll />
      <nav className="knav">
        <div className="klogo">
          <Link href="/" aria-label="Kinetic Brand Partners">
            <Image src="/logos/kinetic-brand-partners.png" alt="Kinetic Brand Partners" width={180} height={73} />
          </Link>
        </div>
        <ul>
          {ITEMS.map((it) => (
            <li key={it.href}>
              <Link href={it.href} className={active === it.href ? "active" : undefined}>{it.label}</Link>
            </li>
          ))}
          <li><CalendlyButton className="cta">Let&apos;s Talk</CalendlyButton></li>
        </ul>
      </nav>
    </>
  );
}
