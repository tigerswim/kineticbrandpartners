type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-bg-surface border border-border rounded p-6 ${className}`}>
      {children}
    </div>
  );
}
