import Image from "next/image";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { galleryPhotos } from "@/data/gallery";
import {
  gameLandings,
  isGameLandingPublic,
  type GameLandingId,
  type GameLandingPathname,
} from "@/i18n/game-landings";
import { getNavLabels } from "@/i18n/labels";
import { absoluteGameLandingUrl } from "@/i18n/metadata";
import { getPathname, Link } from "@/i18n/navigation";
import { routePathnames } from "@/i18n/routes";
import { routing } from "@/i18n/routing";
import { CANONICAL_ORIGIN } from "@/i18n/site";

type GameLandingPageProps = {
  gameId: GameLandingId;
};

export async function GameLandingPage({ gameId }: GameLandingPageProps) {
  const locale = await getLocale();

  if (!hasLocale(routing.locales, locale) || !isGameLandingPublic(gameId, locale)) {
    notFound();
  }

  const game = gameLandings[gameId];
  const pathname = game.internalPath as GameLandingPathname;
  const t = await getTranslations("GameLandings");
  const labels = await getNavLabels();
  const pageUrl = absoluteGameLandingUrl(pathname, locale);
  const homeUrl = new URL(getPathname({ locale, href: routePathnames.home }), CANONICAL_ORIGIN).href;
  const gamesUrl = new URL(getPathname({ locale, href: routePathnames.games }), CANONICAL_ORIGIN).href;
  const name = t(`${gameId}.name`);
  const description = t(`${gameId}.seoDescription`);
  const eventPhotos = game.gallery.map((id) => {
    const photo = galleryPhotos.find((item) => item.id === id);
    if (!photo) {
      throw new Error(`Game gallery photo "${id}" is not in the gallery manifest.`);
    }
    return {
      id: photo.id,
      src: photo.src,
      width: photo.width,
      height: photo.height,
      alt: photo.alt[locale],
    };
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: labels.home, item: homeUrl },
          { "@type": "ListItem", position: 2, name: labels.games, item: gamesUrl },
          { "@type": "ListItem", position: 3, name, item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        name: t(`${gameId}.heroTitle`),
        description,
        serviceType: t("serviceType"),
        url: pageUrl,
        provider: {
          "@type": "Organization",
          name: "Casino Show",
          url: CANONICAL_ORIGIN,
        },
        areaServed: {
          "@type": "Country",
          name: t("areaServed"),
        },
      },
    ],
  };

  const gallery =
    eventPhotos.length > 0
      ? await import("@/components/games/game-event-gallery").then(({ GameEventGallery }) => (
          <GameEventGallery heading={t(`${gameId}.galleryTitle`)} photos={eventPhotos} />
        ))
      : null;

  return (
    <SiteShell routeId="games">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <section className="bg-surface-light text-text-on-light" aria-labelledby="game-landing-title">
        <Container className="py-10 sm:py-12 lg:py-14">
          <nav aria-label={t("breadcrumbLabel")}>
            <ol className="type-small flex flex-wrap items-center gap-x-2 gap-y-1 text-text-muted-on-light">
              <li className="inline-flex items-center gap-2">
                <Link href={routePathnames.home} className="transition-colors hover:text-midnight">
                  {labels.home}
                </Link>
                <span aria-hidden="true" className="text-brand-gold">
                  /
                </span>
              </li>
              <li className="inline-flex items-center gap-2">
                <Link href={routePathnames.games} className="transition-colors hover:text-midnight">
                  {labels.games}
                </Link>
                <span aria-hidden="true" className="text-brand-gold">
                  /
                </span>
              </li>
              <li aria-current="page" className="text-midnight">
                {name}
              </li>
            </ol>
          </nav>
          <h1 id="game-landing-title" className="type-h1 mt-6 max-w-3xl text-balance">
            {t(`${gameId}.heroTitle`)}
          </h1>
          <p className="type-body-lg mt-4 max-w-2xl text-text-muted-on-light">
            {t(`${gameId}.heroSubtitle`)}
          </p>
        </Container>
      </section>

      <section className="bg-surface-muted text-text-on-light" aria-labelledby="game-presentation-title">
        <Container className="grid items-center gap-10 py-12 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:py-16">
          <div className="bg-surface-light">
            <Image
              src={game.image.src}
              alt={t(`${gameId}.imageAlt`)}
              width={game.image.width}
              height={game.image.height}
              quality={85}
              priority
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="h-auto w-full object-contain"
            />
          </div>
          <div>
            <h2 id="game-presentation-title" className="type-h2 text-balance">
              {t(`${gameId}.presentationTitle`)}
            </h2>
            <p className="type-body-lg mt-5">{t(`${gameId}.presentationLead`)}</p>
            <p className="type-body mt-4 text-text-muted-on-light">{t(`${gameId}.presentationBody`)}</p>
            <p className="type-body mt-4 text-text-muted-on-light">
              {t(`${gameId}.presentationAtmosphere`)}
            </p>
            <p className="type-body mt-4 text-text-muted-on-light">
              {t(`${gameId}.presentationOccasions`)}
            </p>
          </div>
        </Container>
      </section>

      {gallery}

      <section className="bg-surface-dark py-14 text-text-on-dark sm:py-16" aria-labelledby="game-landing-cta">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 id="game-landing-cta" className="type-h1 text-balance">
              {t(`${gameId}.ctaTitle`)}
            </h2>
            <p className="type-body-lg mt-6 max-w-xl text-text-muted-on-dark">{t(`${gameId}.ctaBody`)}</p>
            <div className="mt-8">
              <Divider tone="dark" />
            </div>
            <div className="mt-8">
              <Button href={routePathnames.quote}>{labels.quote}</Button>
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
