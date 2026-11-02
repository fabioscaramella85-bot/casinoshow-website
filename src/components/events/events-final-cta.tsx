import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getNavLabels } from "@/i18n/labels";
import { routePathnames } from "@/i18n/routes";

export async function EventsFinalCta() {
  const t = await getTranslations("Events");
  const labels = await getNavLabels();

  return (
    <section className="ev-closing" aria-labelledby="events-final">
      <div className="ev-closing-media" aria-hidden="true">
        <Image
          src="/eventi/sfondo-cta-finale.png"
          alt=""
          fill
          sizes="100vw"
          quality={75}
          className="ev-closing-image"
        />
      </div>
      <div className="ev-closing-scrim" aria-hidden="true" />
      <Container className="ev-closing-copy">
        <Eyebrow tone="dark">{t("final.eyebrow")}</Eyebrow>
        <h2 id="events-final" className="type-h1 mt-4 text-balance">
          {t("final.title")}
        </h2>
        <p className="type-body-lg mt-5 max-w-xl text-text-muted-on-dark">{t("final.body")}</p>
        <div className="mt-8">
          <Button href={routePathnames.quote} className="w-full sm:w-auto">
            {labels.quote}
          </Button>
        </div>
      </Container>
    </section>
  );
}
