import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AboutLink } from "@/components/about/about-link";
import { aboutMedia } from "@/components/about/about-media";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export async function AboutHero() {
  const page = await getTranslations("Pages.about");
  const t = await getTranslations("About");

  return (
    <section className="about-hero" aria-labelledby="about-hero-title">
      <Container className="about-hero-content">
        <div className="about-hero-copy">
          <div className="about-hero-rise">
            <Eyebrow tone="dark">{t("hero.eyebrow")}</Eyebrow>
          </div>
          <h1 id="about-hero-title" className="type-display about-hero-title about-hero-rise">
            {page("heading")}
          </h1>
          <p className="type-body-lg about-hero-lead about-hero-rise">{t("hero.lead")}</p>
          <div className="about-hero-rise">
            <AboutLink href="#la-nostra-storia" tone="hero">
              {t("hero.cta")}
            </AboutLink>
          </div>
        </div>
      </Container>
      <div
        className="about-hero-media"
        style={
          {
            "--about-hero-ratio": `${aboutMedia.hero.width} / ${aboutMedia.hero.height}`,
          } as React.CSSProperties
        }
      >
        <Image
          src={aboutMedia.hero}
          alt={t("hero.imageAlt")}
          fill
          priority
          sizes="100vw"
          quality={85}
          className="about-hero-image"
        />
      </div>
    </section>
  );
}
