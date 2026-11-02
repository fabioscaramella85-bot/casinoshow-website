import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { InternalPathname } from "@/i18n/routes";

type AboutLinkProps = {
  href: InternalPathname | `#${string}` | `https://${string}`;
  children: string;
  tone?: "light" | "dark" | "hero";
};

function isInternal(href: AboutLinkProps["href"]): href is InternalPathname {
  return href.startsWith("/") && !href.startsWith("//");
}

export async function AboutLink({ href, children, tone = "light" }: AboutLinkProps) {
  const shell = await getTranslations("Shell");
  const external = href.startsWith("http");
  const className = `about-link about-link-${tone}`;
  const content = (
    <>
      <span>{children}</span>
      {external ? <span className="sr-only"> ({shell("newTab")})</span> : null}
      <svg aria-hidden="true" viewBox="0 0 16 16" className="about-link-arrow">
        <path
          d="M3 8h10M9 4l4 4-4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </>
  );

  if (isInternal(href)) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : undefined)}
    >
      {content}
    </a>
  );
}
