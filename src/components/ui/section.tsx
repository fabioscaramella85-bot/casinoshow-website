import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  tone?: "light" | "dark" | "muted";
  id?: string;
  labelledBy?: string;
  label?: string;
  className?: string;
};

export function Section({
  children,
  tone = "light",
  id,
  labelledBy,
  label,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
      className={`py-[var(--spacing-section)] ${
        tone === "dark"
          ? "bg-surface-dark text-text-on-dark"
          : tone === "muted"
            ? "bg-surface-muted text-text-on-light"
            : "bg-surface-light text-text-on-light"
      } ${className ?? ""}`}
    >
      {children}
    </section>
  );
}
