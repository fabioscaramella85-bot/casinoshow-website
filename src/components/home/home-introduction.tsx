import Image, { type StaticImageData } from "next/image";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import mainPhoto from "../../../public/home-page/sezione servizi/foto-1-croupier-al-tavolo.png";
import roulettePhoto from "../../../public/home-page/sezione servizi/foto-2-roulette.png";
import tablePhoto from "../../../public/home-page/sezione servizi/foto-3-tavolo.png";
import luganoPhoto from "../../../public/home-page/sezione servizi/foto-4- lugano.png";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { routePathnames } from "@/i18n/routes";

const stepKeys = ["tell", "proposal", "welcome", "enjoy"] as const;

const ivoryFade =
  "linear-gradient(90deg, #f5f2eb 0%, #f5f2eb 42%, rgb(245 242 235 / 0.9) 52%, rgb(245 242 235 / 0.46) 63%, rgb(245 242 235 / 0.1) 76%, rgb(245 242 235 / 0) 86%)";

function emphasis(chunks: ReactNode) {
  return <em className="text-gold-ink italic">{chunks}</em>;
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7" fill="none">
      <rect x="3.5" y="4.5" width="17" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GuestsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7" fill="none">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 19.2v-.4A4.6 4.6 0 0 1 8.1 14.2h1.8a4.6 4.6 0 0 1 4.6 4.6v.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="17" cy="8.5" r="2.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16.2 14.4a4.1 4.1 0 0 1 4.3 4v.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WelcomeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7" fill="none">
      <circle cx="10" cy="8" r="3.15" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.8 19.2v-.35A4.7 4.7 0 0 1 8.5 14.15H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="m14.5 16.2 2.1 2.1 4.2-4.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7" fill="none">
      <path
        d="M12 3.4 14.2 8.7l5.8.5-4.4 3.7 1.4 5.6L12 15.8 6 18.5l1.4-5.6L3 9.2l5.8-.5L12 3.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const stepIcons = [CalendarIcon, GuestsIcon, WelcomeIcon, StarIcon] as const;

function FloatPhoto({
  src,
  alt,
  className,
  imageClassName,
  sizes,
}: {
  src: StaticImageData;
  alt: string;
  className: string;
  imageClassName: string;
  sizes: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[0.4rem] border border-brand-gold/80 bg-graphite shadow-[0_18px_42px_rgb(16_17_20/0.22)] transition duration-300 ease-[var(--ease-standard)] hover:-translate-y-1.5 hover:shadow-[0_22px_48px_rgb(16_17_20/0.3)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={85}
        className={`object-cover transition duration-300 ease-[var(--ease-standard)] group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${imageClassName}`}
      />
    </div>
  );
}

export async function HomeIntroduction() {
  const t = await getTranslations("Home");

  return (
    <section aria-labelledby="home-intro" className="relative overflow-x-clip bg-ivory text-midnight">
      <div className="relative xl:min-h-[40rem] min-[1440px]:min-h-[44rem] min-[1800px]:min-h-[48rem]">
        <div className="relative z-10 mx-auto w-full max-w-[80rem] px-4 pt-14 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20 xl:pt-24">
          <div className="max-w-[40rem] xl:max-w-[31rem]">
            <Eyebrow>{t("intro.eyebrow")}</Eyebrow>
            <h2
              id="home-intro"
              className="mt-4 font-display text-[clamp(2.15rem,1.35rem+2vw,3.45rem)] font-medium leading-[1.08] tracking-[-0.02em] text-balance"
            >
              {t.rich("intro.title", { em: emphasis })}
            </h2>
            <p className="type-body-lg mt-6">{t("intro.body")}</p>
            <p className="type-body mt-4 text-text-muted-on-light">{t("intro.detail")}</p>
          </div>
        </div>
        <div className="relative z-0 mt-8 aspect-[3/2] sm:aspect-[16/10] xl:absolute xl:inset-y-0 xl:right-0 xl:mt-0 xl:aspect-auto xl:w-[58%] min-[1680px]:w-[56%]">
          <Image
            src={mainPhoto}
            alt={t("intro.images.main")}
            fill
            sizes="(min-width: 1280px) 60vw, 100vw"
            quality={85}
            className="object-cover object-[54%_42%] xl:object-[60%_40%]"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] hidden xl:block"
          style={{ background: ivoryFade }}
        />
        <div className="relative z-20 mt-4 grid grid-cols-2 items-end gap-2.5 px-4 sm:grid-cols-3 sm:gap-3 sm:px-6 lg:px-8 xl:absolute xl:right-[3%] xl:bottom-8 xl:mt-0 xl:flex xl:w-[min(44rem,48%)] xl:items-end xl:justify-end xl:gap-0 xl:px-0 min-[1680px]:right-[max(1.25rem,calc((100%-80rem)/2))]">
          <FloatPhoto
            src={roulettePhoto}
            alt={t("intro.images.roulette")}
            sizes="(min-width: 1280px) 220px, (min-width: 640px) 30vw, 46vw"
            imageClassName="object-[76%_center]"
            className="z-10 aspect-[4/3] xl:mb-14 xl:aspect-[5/4] xl:w-[34%]"
          />
          <FloatPhoto
            src={tablePhoto}
            alt={t("intro.images.table")}
            sizes="(min-width: 1280px) 250px, (min-width: 640px) 30vw, 46vw"
            imageClassName="object-[center_42%]"
            className="z-20 aspect-[4/3] xl:-ml-8 xl:mb-1 xl:aspect-[4/3] xl:w-[38%]"
          />
          <FloatPhoto
            src={luganoPhoto}
            alt={t("intro.images.lugano")}
            sizes="(min-width: 1280px) 210px, (min-width: 640px) 30vw, 92vw"
            imageClassName="object-[center_58%]"
            className="z-30 col-span-2 aspect-[16/8] sm:col-span-1 sm:aspect-[4/3] xl:-ml-7 xl:mb-9 xl:aspect-[3/4] xl:w-[32%]"
          />
        </div>
      </div>

      <Container className="relative z-10 pt-12 pb-[var(--spacing-section)] xl:pt-6">
        <ol className="grid list-none gap-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {stepKeys.map((key, index) => {
            const Icon = stepIcons[index];
            return (
              <li key={key} className="group relative flex flex-col items-center text-center">
                {index < stepKeys.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-[2.35rem] left-[calc(50%+2.45rem)] hidden h-px w-[calc(100%-4.9rem)] bg-brand-gold/70 xl:block"
                  />
                ) : null}
                <div className="relative z-10 size-[4.75rem] text-gold-ink transition duration-300 ease-[var(--ease-standard)] group-hover:-translate-y-1.5 group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100">
                  <span
                    aria-hidden="true"
                    className="absolute -top-2 left-1/2 flex size-7 -translate-x-1/2 items-center justify-center rounded-full bg-brand-gold text-[0.68rem] font-semibold tracking-[0.04em] text-midnight transition duration-300 group-hover:brightness-110 motion-reduce:transition-none"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex size-full items-center justify-center rounded-full border-[1.5px] border-brand-gold/75 bg-ivory transition duration-300 ease-[var(--ease-standard)] group-hover:border-brand-gold group-hover:bg-brand-gold/15 group-hover:shadow-[0_12px_28px_rgb(198_166_107/0.28)] motion-reduce:transition-none">
                    <Icon />
                  </div>
                </div>
                <h3 className="mt-4 max-w-[16rem] font-sans text-[0.78rem] font-semibold tracking-[0.11em] text-midnight uppercase">
                  {t(`intro.steps.${key}.title`)}
                </h3>
                <p className="type-small mt-2 max-w-[16rem] text-text-muted-on-light">
                  {t(`intro.steps.${key}.body`)}
                </p>
              </li>
            );
          })}
        </ol>
        <div className="mt-11 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button href={routePathnames.quote} className="w-full sm:w-auto">
            {t("intro.primaryCta")}
          </Button>
          <Button href={routePathnames.events} variant="secondary" className="w-full sm:w-auto">
            {t("intro.secondaryCta")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
