import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AboutLink } from "@/components/about/about-link";
import { aboutMedia } from "@/components/about/about-media";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

const shots = [
  {
    key: "lead",
    src: aboutMedia.hero.lead,
    className: "about-hero-shot-lead",
    imageClassName: "about-hero-image-lead",
    sizes: "(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), 42vw",
    priority: true,
  },
  {
    key: "side",
    src: aboutMedia.hero.side,
    className: "about-hero-shot-side",
    imageClassName: "about-hero-image-side",
    sizes: "(min-width: 768px) 22vw, 1px",
    priority: false,
  },
  {
    key: "wide",
    src: aboutMedia.hero.wide,
    className: "about-hero-shot-wide",
    imageClassName: "about-hero-image-wide",
    sizes: "(min-width: 768px) 28vw, 1px",
    priority: false,
  },
] as const;

export async function AboutHero() {
  const page = await getTranslations("Pages.about");
  const t = await getTranslations("About");

  return (
    <section className="about-hero" aria-labelledby="about-hero-title">
      <Container className="about-hero-content">
        <div className="about-hero-media">
          <div className="about-hero-mosaic">
            {shots.map((shot) => (
              <div
                key={shot.key}
                className={`about-hero-shot ${shot.className}`}
                aria-hidden={shot.key === "lead" ? undefined : true}
              >
                <Image
                  src={shot.src}
                  alt={shot.key === "lead" ? t("hero.imageAlt") : ""}
                  fill
                  priority={shot.priority}
                  sizes={shot.sizes}
                  quality={85}
                  className={`about-hero-image ${shot.imageClassName}`}
                />
              </div>
            ))}
          </div>
        </div>
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
    </section>
  );
}
