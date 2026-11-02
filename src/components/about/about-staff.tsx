import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AboutLink } from "@/components/about/about-link";
import { aboutMedia } from "@/components/about/about-media";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getNavLabels } from "@/i18n/labels";
import { routePathnames } from "@/i18n/routes";

const paragraphs = ["p1", "p2", "p3", "p4"] as const;
const qualities = ["professionalism", "presence", "involvement"] as const;
const photos = [
  { key: "group", src: aboutMedia.staff.group, lead: true },
  { key: "croupier", src: aboutMedia.staff.croupier, lead: false },
  { key: "guests", src: aboutMedia.staff.guests, lead: false },
] as const;

export async function AboutStaff() {
  const t = await getTranslations("About.staff");
  const labels = await getNavLabels();

  return (
    <section id="il-nostro-staff" className="about-staff" aria-labelledby="about-staff-title">
      <div className="about-staff-body">
        <Container>
          <div className="about-staff-intro about-rise">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 id="about-staff-title" className="type-h1 about-staff-title">
              {t("title")}
            </h2>
            <div className="about-prose about-staff-prose">
              {paragraphs.map((key) => (
                <p key={key} className="type-body">
                  {t(key)}
                </p>
              ))}
            </div>
          </div>
          <ul className="about-gallery about-rise">
            {photos.map((photo) => (
              <li key={photo.key} className={photo.lead ? "about-gallery-lead" : undefined}>
                <figure className={`about-frame about-shot ${photo.lead ? "about-shot-lead" : "about-shot-side"}`}>
                  <Image
                    src={photo.src}
                    alt={t(`images.${photo.key}`)}
                    fill
                    sizes={
                      photo.lead
                        ? "(min-width: 768px) 52vw, 92vw"
                        : "(min-width: 768px) 28vw, 92vw"
                    }
                    quality={85}
                    className={`about-frame-image about-shot-image about-shot-image-${photo.key}`}
                  />
                </figure>
              </li>
            ))}
          </ul>
          <ul className="about-qualities about-rise">
            {qualities.map((key) => (
              <li key={key}>
                <h3 className="about-quality-title">{t(`qualities.${key}.title`)}</h3>
                <p className="about-quality-body">{t(`qualities.${key}.body`)}</p>
              </li>
            ))}
          </ul>
          <div className="about-staff-link about-rise">
            <AboutLink href={routePathnames.quote}>{t("link")}</AboutLink>
          </div>
        </Container>
      </div>
      <div className="about-close">
        <Container>
          <div className="about-close-inner about-rise">
            <div className="about-close-copy">
              <p className="type-h2 about-close-title">{t("cta.title")}</p>
              <p className="type-body about-close-body">{t("cta.body")}</p>
            </div>
            <Button href={routePathnames.quote} className="w-full sm:w-auto">
              {labels.quote}
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}
