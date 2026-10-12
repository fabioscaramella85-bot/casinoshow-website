import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { locales, routePathnames, type Locale, type RouteId } from "@/i18n/routes";

type LanguageSwitcherProps = {
  routeId: RouteId | null;
};

export async function LanguageSwitcher({ routeId }: LanguageSwitcherProps) {
  const current = (await getLocale()) as Locale;
  const t = await getTranslations("Shell");
  const languages = await getTranslations("Languages");
  const href = routeId ? routePathnames[routeId] : routePathnames.home;

  return (
    <nav aria-label={t("languageNav")} data-language-switcher="true">
      <ul className="flex flex-wrap">
        {locales.map((locale) => {
          const active = locale === current;
          return (
            <li key={locale}>
              <Link
                href={href}
                locale={locale}
                hrefLang={locale}
                lang={locale}
                aria-current={active ? "true" : undefined}
                aria-label={languages(locale)}
                data-active={active ? "true" : "false"}
                className="type-nav inline-flex size-11 items-center justify-center text-ivory/75 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-ivory data-[active=true]:text-ivory data-[active=true]:shadow-[inset_0_-1px_0_0_var(--color-brand-gold)]"
              >
                {locale.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
