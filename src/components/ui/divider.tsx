type DividerProps = {
  tone?: "light" | "dark";
};

export function Divider({ tone = "light" }: DividerProps) {
  return (
    <hr
      className={`h-px w-16 border-0 ${tone === "dark" ? "bg-brand-gold" : "bg-gold-ink"}`}
    />
  );
}
