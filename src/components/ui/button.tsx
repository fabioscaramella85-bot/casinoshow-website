import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { routePathnames, type RouteId } from "@/i18n/routes";

type AppHref = (typeof routePathnames)[RouteId];
type ButtonVariant = "primary" | "secondary" | "light" | "text";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: AppHref;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
  ariaCurrent?: "page" | "true";
  onClick?: () => void;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-red text-white hover:bg-brand-red-hover active:bg-brand-red-hover",
  secondary:
    "border border-midnight/25 bg-transparent text-midnight hover:border-midnight active:bg-midnight/5",
  light:
    "border border-ivory/45 bg-transparent text-ivory hover:border-ivory hover:bg-ivory/10 active:bg-ivory/15",
  text: "min-h-11 bg-transparent px-0 text-current hover:text-brand-red",
};

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover:translate-x-0.5 motion-reduce:transform-none"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Button({
  children,
  variant = "primary",
  href,
  icon,
  disabled = false,
  className,
  ariaCurrent,
  onClick,
}: ButtonProps) {
  const classes = [
    "group type-button inline-flex min-h-11 items-center justify-center gap-2 px-5 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
    variant === "text" ? "" : "rounded-[var(--radius-sm)]",
    variants[variant],
    disabled ? "pointer-events-none opacity-45" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {variant === "text" ? <Arrow /> : null}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} aria-current={ariaCurrent} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}
