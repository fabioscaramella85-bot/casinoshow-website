import { Link } from "@/i18n/navigation";
import { routePathnames } from "@/i18n/routes";

type WordmarkProps = {
  label: string;
  tone?: "on-dark" | "on-light";
  linked?: boolean;
};

export function Wordmark({ label, tone = "on-dark", linked = true }: WordmarkProps) {
  const mark = (
    <span className="inline-flex items-baseline gap-[0.35em] font-display text-xl font-semibold leading-none tracking-[0.16em]">
      <span className={tone === "on-dark" ? "text-ivory" : "text-midnight"}>CASINO</span>
      <span className="text-brand-green">SHOW</span>
    </span>
  );

  if (!linked) {
    return mark;
  }

  return (
    <Link href={routePathnames.home} aria-label={label} className="shrink-0">
      {mark}
    </Link>
  );
}
