type SectionProps = {
  children: React.ReactNode;
  bg?: "primary" | "surface" | "surface-alt" | "gradient" | "gradient-mesh";
  className?: string;
  id?: string;
  withNoise?: boolean;
  withLines?: boolean;
};

export function Section({
  children,
  bg = "primary",
  className = "",
  id,
  withNoise = false,
  withLines = false,
}: SectionProps) {
  const bgMap = {
    primary: "bg-bg-primary",
    surface: "bg-bg-surface",
    "surface-alt": "bg-bg-surface-alt",
    gradient: "gradient-radial",
    "gradient-mesh": "gradient-mesh",
  };

  const decorativeClasses = [
    withNoise && "noise-texture",
    withLines && "geometric-lines",
  ].filter(Boolean).join(" ");

  return (
    <section
      id={id}
      className={`${bgMap[bg]} ${decorativeClasses} py-20 md:py-28 relative ${className}`}
    >
      <div className="mx-auto max-w-content px-6">{children}</div>
    </section>
  );
}
