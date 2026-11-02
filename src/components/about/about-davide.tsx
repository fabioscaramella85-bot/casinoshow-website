import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AboutLink } from "@/components/about/about-link";
import { aboutMedia } from "@/components/about/about-media";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { routePathnames } from "@/i18n/routes";

const paragraphs = ["p1", "p2", "p3", "p4", "p5", "p6"] as const;
const milestones = ["start", "founded", "champion"] as const;

export async function AboutDavide() {
  const t = await getTranslations("About.davide");

  return (
    <Section id="davide-merli" tone="dark" labelledBy="about-davide-title" className="about-davide">
      <Container>
        <div className="about-davide-grid">
          <div className="about-davide-intro about-rise">
            <Eyebrow tone="dark">{t("eyebrow")}</Eyebrow>
            <h2 id="about-davide-title" className="type-h1 about-davide-title">
              {t("title")}
            </h2>
            <p className="about-davide-subtitle">{t("subtitle")}</p>
          </div>
          <figure className="about-frame about-portrait about-rise">
            <Image
              src={aboutMedia.davide}
              alt={t("imageAlt")}
              fill
              sizes="(min-width: 1024px) 26rem, 92vw"
              quality={85}
              className="about-frame-image about-portrait-image"
            />
          </figure>
          <div className="about-davide-rest about-rise">
            <div className="about-prose about-prose-dark">
              {paragraphs.map((key) => (
                <p key={key} className="type-body">
                  {t(key)}
                </p>
              ))}
            </div>
            <ul className="about-marks about-marks-dark">
              {milestones.map((key) => (
                <li key={key}>
                  <p className="about-mark-lead about-mark-year">{t(`milestones.${key}.lead`)}</p>
                  <p className="about-mark-note">{t(`milestones.${key}.note`)}</p>
                </li>
              ))}
            </ul>
            <AboutLink href={routePathnames.events} tone="dark">
              {t("link")}
            </AboutLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
