type EyebrowProps = {
  children: string;
  tone?: "light" | "dark";
  id?: string;
};

export function Eyebrow({ children, tone = "light", id }: EyebrowProps) {
  return (
    <p
      id={id}
      className={`type-eyebrow ${tone === "dark" ? "text-brand-gold" : "text-gold-ink"}`}
    >
      {children}
    </p>
  );
}
