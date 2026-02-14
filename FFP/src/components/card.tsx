type CardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient-border" | "hover-lift";
};

export function Card({ children, className = "", variant = "default" }: CardProps) {
  if (variant === "gradient-border") {
    return (
      <div className={`relative p-[1px] rounded-lg bg-gradient-to-br from-accent to-accent-secondary group ${className}`}>
        <div className="bg-bg-surface rounded-lg p-6 h-full transition-all duration-300 group-hover:bg-bg-surface/80">
          {children}
        </div>
      </div>
    );
  }

  const baseStyles = "bg-bg-surface border border-border rounded-lg p-6 transition-all duration-300";
  const hoverStyles = variant === "hover-lift"
    ? "hover:border-accent/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10"
    : "hover:border-border/60";

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
