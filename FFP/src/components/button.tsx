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
  const base = "inline-flex items-center gap-2 font-medium transition-all duration-300 group";
  const variants = {
    primary: "bg-accent text-white px-6 py-3 rounded hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 hover:scale-105 active:scale-100",
    secondary: "border border-text-primary/20 text-text-primary px-6 py-3 rounded hover:border-accent/50 hover:text-accent hover:shadow-lg hover:shadow-accent/10 hover:scale-105 active:scale-100",
    text: "text-accent hover:text-accent-secondary",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {variant === "text" && (
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          &rarr;
        </span>
      )}
    </Link>
  );
}
