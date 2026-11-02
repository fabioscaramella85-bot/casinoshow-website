import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

const heroSrc = "/images/gallery/fc-blackjack-croupier-guests-006.webp";

export async function CareersHero() {
  const page = await getTranslations("Pages.careers");
  const t = await getTranslations("Careers.hero");

  if (t("title") !== page("heading")) {
    throw new Error("Careers hero title must match Pages.careers.heading.");
  }

  return (
    <section className="grid overflow-hidden bg-[#07080b] text-ivory" aria-labelledby="careers-hero-title">
      <div className="relative col-start-1 row-start-1 aspect-[4/3] md:aspect-auto md:min-h-[32rem]">
        <Image
          src={heroSrc}
          alt={t("imageAlt")}
          fill
          preload
          sizes="100vw"
          quality={85}
          className="object-cover object-[center_42%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(6_6_8/0.82)_0%,rgb(6_6_8/0.62)_38%,rgb(6_6_8/0.28)_72%,rgb(6_6_8/0.18)_100%)] md:block"
        />
      </div>
      <div className="relative z-10 col-start-1 row-start-2 bg-[#07080b] md:row-start-1 md:flex md:min-h-[32rem] md:items-center md:bg-transparent">
        <Container className="py-8 max-md:px-5 md:py-16">
          <div className="max-w-xl">
            <Eyebrow tone="dark">{t("eyebrow")}</Eyebrow>
            <span className="mt-4 block h-px w-12 bg-brand-gold" aria-hidden="true" />
            <h1 id="careers-hero-title" className="type-display mt-4 text-balance">
              {t("title")}
            </h1>
            <p className="type-body-lg mt-4 max-w-xl text-ivory">{t("lead")}</p>
            <a
              href="#candidatura"
              className="type-button mt-8 inline-flex min-h-12 w-full items-center justify-center bg-brand-red px-5 text-white transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-brand-red-hover md:min-h-11 md:w-auto"
            >
              {t("cta")}
            </a>
          </div>
        </Container>
      </div>
    </section>
  );
}
