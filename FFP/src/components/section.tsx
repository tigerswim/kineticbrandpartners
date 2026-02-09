type SectionProps = {
  children: React.ReactNode;
  bg?: "primary" | "surface" | "surface-alt";
  className?: string;
  id?: string;
};

export function Section({
  children,
  bg = "primary",
  className = "",
  id,
}: SectionProps) {
  const bgMap = {
    primary: "bg-bg-primary",
    surface: "bg-bg-surface",
    "surface-alt": "bg-bg-surface-alt",
  };

  return (
    <section id={id} className={`${bgMap[bg]} py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-content px-6">{children}</div>
    </section>
  );
}
