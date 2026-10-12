import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/navigation";
import { routePathnames } from "@/i18n/routes";

const links = [
  { key: "events", href: routePathnames.events },
  { key: "games", href: routePathnames.games },
  { key: "gallery", href: routePathnames.gallery },
] as const;

export async function AboutExplore() {
  const t = await getTranslations("About");

  return (
    <Section tone="muted" labelledBy="about-explore">
      <Container>
        <SectionHeading
          id="about-explore"
          eyebrow={t("explore.eyebrow")}
          title={t("explore.title")}
          description={t("explore.body")}
        />
        <ul className="mt-12 grid gap-10 lg:grid-cols-3">
          {links.map((item, index) => (
            <li key={item.key} className="border-t border-line-on-light pt-6">
              <p className="type-eyebrow text-gold-ink">0{index + 1}</p>
              <h3 className="type-h3 mt-4">
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:decoration-current"
                >
                  {t(`explore.items.${item.key}.title`)}
                </Link>
              </h3>
              <p className="type-body mt-3 text-text-muted-on-light">
                {t(`explore.items.${item.key}.body`)}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
