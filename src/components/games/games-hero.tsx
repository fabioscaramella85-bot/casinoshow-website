import { getTranslations } from "next-intl/server";
import { MediaFrame } from "@/components/home/media-frame";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { getNavLabels } from "@/i18n/labels";
import { routePathnames } from "@/i18n/routes";

const categories = [
  { id: "roulette", key: "roulette" },
  { id: "blackjack", key: "blackjack" },
  { id: "poker", key: "poker" },
  { id: "other-games", key: "other" },
  { id: "extras", key: "extras" },
] as const;

export async function GamesHero() {
  const page = await getTranslations("Pages.games");
  const t = await getTranslations("Games");
  const labels = await getNavLabels();

  return (
    <Section tone="dark">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow tone="dark">{t("hero.eyebrow")}</Eyebrow>
          <h1 className="type-display mt-4 max-w-xl text-balance">{page("heading")}</h1>
          <p className="type-body-lg mt-6 max-w-xl text-text-on-dark">{t("hero.support")}</p>
          <p className="type-body mt-4 max-w-xl text-text-muted-on-dark">{t("hero.lead")}</p>
          <div className="mt-8">
            <Button href={routePathnames.quote}>{labels.quote}</Button>
          </div>
          <nav aria-label={t("hero.navLabel")} className="mt-6">
            <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-6">
              {categories.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="type-nav inline-flex min-h-11 items-center text-ivory/80 transition-colors duration-[var(--duration-fast)] hover:text-ivory"
                  >
                    {t(`overview.items.${item.key}.title`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <MediaFrame
          accent="red"
          label={t("hero.mediaLabel")}
          className="aspect-[4/3] lg:aspect-[4/5]"
        />
      </Container>
    </Section>
  );
}
