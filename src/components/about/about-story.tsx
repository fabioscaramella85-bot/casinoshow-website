import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AboutLink } from "@/components/about/about-link";
import { aboutMedia } from "@/components/about/about-media";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { routePathnames } from "@/i18n/routes";

const paragraphs = ["p2", "p3", "p4"] as const;
const marks = ["founded", "markets", "entertainment"] as const;

export async function AboutStory() {
  const t = await getTranslations("About.story");

  return (
    <Section id="la-nostra-storia" tone="light" labelledBy="about-story-title" className="about-story">
      <Container>
        <div className="about-story-grid">
          <div className="about-rise">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 id="about-story-title" className="type-h1 about-story-title">
              {t("title")}
            </h2>
            <p className="type-body-lg about-story-intro">{t("p1")}</p>
          </div>
          <div className="about-story-aside about-rise">
            <div className="about-prose">
              {paragraphs.map((key) => (
                <p key={key} className="type-body">
                  {t(key)}
                </p>
              ))}
            </div>
            <figure className="about-frame about-story-frame">
              <Image
                src={aboutMedia.story}
                alt={t("imageAlt")}
                fill
                sizes="(min-width: 1024px) 38rem, 92vw"
                quality={85}
                className="about-frame-image"
              />
            </figure>
            <AboutLink href={routePathnames.games}>{t("link")}</AboutLink>
          </div>
        </div>
        <ul className="about-marks about-rise">
          {marks.map((key) => (
            <li key={key}>
              <p className={`about-mark-lead ${key === "founded" ? "about-mark-year" : "about-mark-label"}`}>
                {t(`marks.${key}.lead`)}
              </p>
              <p className="about-mark-note">{t(`marks.${key}.note`)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
