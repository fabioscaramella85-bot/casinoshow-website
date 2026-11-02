import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getNavLabels } from "@/i18n/labels";
import { routePathnames } from "@/i18n/routes";

const heroImage = "/giochi-e-servizi/sfondo-hero.png";

const desktopScrim =
  "linear-gradient(90deg, rgb(16 17 20 / 0.42) 0%, rgb(16 17 20 / 0.22) 24%, rgb(16 17 20 / 0.06) 40%, rgb(16 17 20 / 0) 54%)";

const tabletScrim =
  "linear-gradient(90deg, rgb(16 17 20 / 0.84) 0%, rgb(16 17 20 / 0.62) 40%, rgb(16 17 20 / 0.28) 64%, rgb(16 17 20 / 0) 84%)";

export async function GamesHero() {
  const page = await getTranslations("Pages.games");
  const t = await getTranslations("Games");
  const labels = await getNavLabels();

  return (
    <section
      className="grid overflow-hidden bg-midnight text-text-on-dark"
      aria-labelledby="games-hero-title"
    >
      <div className="relative col-start-1 row-start-1 aspect-[4/3] md:aspect-auto md:min-h-[32rem] lg:min-h-[36.25rem]">
        <Image
          src={heroImage}
          alt=""
          fill
          preload
          quality={85}
          sizes="100vw"
          className="object-cover object-[88%_center] md:object-[58%_center] lg:object-center"
        />
        <div
          className="absolute inset-0 hidden md:block lg:hidden"
          style={{ background: tabletScrim }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ background: desktopScrim }}
          aria-hidden="true"
        />
      </div>
      <div className="relative z-10 col-start-1 row-start-2 bg-midnight md:row-start-1 md:flex md:min-h-[32rem] md:items-center md:bg-transparent lg:min-h-[36.25rem]">
        <Container className="py-8 max-md:px-5 md:py-14 lg:py-16">
          <div className="w-full max-w-[28rem]">
            <Eyebrow tone="dark">{t("hero.eyebrow")}</Eyebrow>
            <h1 id="games-hero-title" className="type-display mt-4 text-balance">
              {page("heading")}
            </h1>
            <p className="type-body-lg mt-5 text-text-on-dark">{t("hero.support")}</p>
            <p className="type-body mt-3 text-text-muted-on-dark">{t("hero.lead")}</p>
            <div className="mt-7">
              <Button href={routePathnames.quote} className="w-full md:w-auto">
                {labels.quote}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
