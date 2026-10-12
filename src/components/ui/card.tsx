import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { routePathnames, type RouteId } from "@/i18n/routes";

type AppHref = (typeof routePathnames)[RouteId];

type CardProps = {
  title: string;
  description: string;
  tone?: "light" | "dark";
  media?: ReactNode;
  action?: ReactNode;
  href?: AppHref;
  hash?: string;
};

export function Card({
  title,
  description,
  tone = "light",
  media,
  action,
  href,
  hash,
}: CardProps) {
  const dark = tone === "dark";

  return (
    <article
      className={`flex h-full flex-col rounded-[var(--radius-sm)] border p-6 transition-[border-color,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-standard)] ${
        dark
          ? "border-line-on-dark bg-surface-raised text-text-on-dark hover:border-brand-gold/70"
          : "border-line-on-light bg-ivory text-text-on-light shadow-[var(--shadow-card)] hover:border-gold-ink/40"
      }`}
    >
      {media ? <div className="mb-5">{media}</div> : null}
      <h3 className="type-h3">
        {href ? (
          <Link
            href={hash ? { pathname: href, hash } : href}
            className="inline-flex min-h-11 items-center underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:decoration-current"
          >
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>
      <p
        className={`type-body mt-3 ${
          dark ? "text-text-muted-on-dark" : "text-text-muted-on-light"
        }`}
      >
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </article>
  );
}
