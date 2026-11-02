"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageFlag } from "@/components/social/language-flags";
import {
  languageSwitchHref,
  locales,
  type Locale,
  type ShellRouteId,
} from "@/i18n/routes";

type LanguageSwitcherProps = {
  routeId: ShellRouteId | null;
  align?: "start" | "end";
  placement?: "overlay" | "flow";
};

export function LanguageSwitcher({
  routeId,
  align = "end",
  placement = "overlay",
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const shell = useTranslations("Shell");
  const languages = useTranslations("Languages");
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const [trackedPath, setTrackedPath] = useState(pathname);

  if (trackedPath !== pathname) {
    setTrackedPath(pathname);
    setOpen(false);
  }
  const rootRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const currentName = languages(locale);

  useEffect(() => {
    const readHash = () => setHash(window.location.hash.replace(/^#/, ""));
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const active = rootRef.current?.querySelector<HTMLAnchorElement>('[aria-current="true"]');
    active?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }

      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
        return;
      }

      const items = rootRef.current?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]');
      if (!items || items.length === 0) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      const list = [...items];
      const index = list.findIndex((item) => item === document.activeElement);
      const next =
        event.key === "ArrowDown"
          ? list[(index + 1) % list.length]
          : list[(index - 1 + list.length) % list.length];
      next?.focus();
    };

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  return (
    <nav
      ref={rootRef}
      aria-label={shell("languageNav")}
      data-language-switcher="true"
      className="relative"
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex min-h-11 items-center gap-1.5 px-2 font-sans text-sm font-medium text-midnight transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-brand-green"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-label={shell("languageCurrent", { language: currentName })}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <LanguageFlag code={locale} />
        {placement === "flow" ? <span lang={locale}>{currentName}</span> : null}
        <Chevron open={open} />
      </button>
      <ul
        id={menuId}
        role="menu"
        aria-label={shell("languageNav")}
        hidden={!open}
        className={`z-50 min-w-44 border border-line-on-light bg-white py-1 text-midnight shadow-[0_12px_32px_rgb(16_17_20/0.12)] ${
          placement === "flow"
            ? "relative mt-2 w-full"
            : `absolute top-[calc(100%+0.35rem)] ${align === "start" ? "left-0" : "right-0"}`
        }`}
      >
        {locales.map((code) => {
          const active = code === locale;
          const href = languageSwitchHref(pathname, code, routeId);
          const keepHash = Boolean(hash) && href === pathname;
          return (
            <li key={code} role="none">
              <Link
                href={keepHash ? { pathname: href, hash } : href}
                locale={code}
                hrefLang={code}
                lang={code}
                role="menuitem"
                aria-current={active ? "true" : undefined}
                data-active={active ? "true" : "false"}
                className="flex min-h-11 items-center gap-3 px-4 font-sans text-sm text-midnight/80 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-midnight/5 hover:text-midnight data-[active=true]:text-brand-green data-[active=true]:shadow-[inset_2px_0_0_0_var(--color-brand-green)]"
                onClick={() => setOpen(false)}
              >
                <LanguageFlag code={code} />
                {languages(code)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`size-3.5 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] motion-reduce:transition-none ${
        open ? "rotate-180" : ""
      }`}
    >
      <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
