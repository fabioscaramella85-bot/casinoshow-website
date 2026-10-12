import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import { routePathnames } from "@/i18n/routes";

const links = [
  { key: "events", href: routePathnames.events },
  { key: "games", href: routePathnames.games },
] as const;

export async function ContactFinalCta() {
  const t = await getTranslations("Contact");

  return (
    <Section tone="dark" labelledBy="contact-final">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="dark">{t("final.eyebrow")}</Eyebrow>
          <h2 id="contact-final" className="type-h1 mt-4 text-balance">
            {t("final.title")}
          </h2>
          <p className="type-body-lg mt-6 text-text-muted-on-dark">{t("final.body")}</p>
          <div className="mt-8 flex justify-center">
            <Divider tone="dark" />
          </div>
        </div>
        <ul className="mx-auto mt-12 grid max-w-3xl gap-10 sm:grid-cols-2">
          {links.map((item) => (
            <li key={item.key} className="border-t border-brand-gold/50 pt-6 text-left">
              <h3 className="type-h3">
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center underline decoration-transparent underline-offset-4 hover:decoration-current"
                >
                  {t(`final.items.${item.key}.title`)}
                </Link>
              </h3>
              <p className="type-body mt-3 text-text-muted-on-dark">
                {t(`final.items.${item.key}.body`)}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
