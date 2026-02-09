import Link from "next/link";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "text";
  children: React.ReactNode;
  className?: string;
};

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
}: ButtonProps) {
  const base = "inline-flex items-center gap-2 font-medium transition-colors";
  const variants = {
    primary: "bg-accent text-white px-6 py-3 rounded hover:bg-accent/90",
    secondary: "border border-text-primary/20 text-text-primary px-6 py-3 rounded hover:border-text-primary/40",
    text: "text-accent hover:text-accent/80",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {variant === "text" && <span aria-hidden="true">&rarr;</span>}
    </Link>
  );
}
