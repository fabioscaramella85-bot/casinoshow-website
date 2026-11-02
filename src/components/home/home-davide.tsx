import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import portrait from "../../../public/home-page/davide-merli/Davide con coppa.png";
import medal from "../../../public/home-page/davide-merli/davide-merli-premiazione-02.jpg";
import ceremony from "../../../public/home-page/davide-merli/davide-merli-premiazione-03.jpg";
import stage from "../../../public/home-page/davide-merli/davide-merli-premiazione-04.jpg";
import screen from "../../../public/home-page/davide-merli/davide-merli-premiazione-05.jpg";
import backdrop from "../../../public/home-page/davide-merli/sfondo.png";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import { routePathnames } from "@/i18n/routes";

const archives = [
  { key: "medal", src: medal, wide: "46vw" },
  { key: "ceremony", src: ceremony, wide: "46vw" },
  { key: "stage", src: stage, wide: "46vw" },
  { key: "screen", src: screen, wide: "46vw" },
] as const;

const values = [
  { key: "skill", icon: BadgeIcon },
  { key: "together", icon: PeopleIcon },
  { key: "care", icon: DiamondIcon },
] as const;

function emphasis(chunks: ReactNode) {
  return <em className="text-gold-ink italic">{chunks}</em>;
}

export async function HomeDavide() {
  const t = await getTranslations("Home.davide");

  return (
    <Section id="davide-merli" labelledBy="davide-merli-heading" className="relative overflow-x-clip">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image src={backdrop} alt="" fill quality={75} sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[rgb(245_242_235/0.84)]" />
      </div>
      <Container className="relative">
        <div className="davide-layout">
          <div className="davide-intro davide-rise">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 id="davide-merli-heading" className="davide-title type-h1 mt-4 max-w-xl text-balance">
              {t.rich("title", { em: emphasis })}
            </h2>
          </div>

          <div className="davide-photos">
            <figure className="davide-rise">
              <div className="davide-shot relative aspect-[5/4] overflow-hidden rounded-[5px] border border-brand-gold/45 shadow-[0_18px_40px_rgb(16_17_20/0.12)]">
                <Image
                  src={portrait}
                  alt={t("images.portrait")}
                  fill
                  quality={85}
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="object-cover object-center"
                />
              </div>
            </figure>
            <ul className="davide-archive">
              {archives.map((item, index) => (
                <li key={item.key} className={index > 0 ? "davide-rise davide-rise-late" : "davide-rise"}>
                  <figure>
                    <div className="davide-shot relative aspect-[3/2] overflow-hidden rounded-[5px] border border-brand-gold/40 bg-ivory shadow-[0_10px_24px_rgb(16_17_20/0.1)]">
                      <Image
                        src={item.src}
                        alt={t(`images.${item.key}`)}
                        fill
                        quality={85}
                        sizes={`(min-width: 1024px) 12vw, ${item.wide}`}
                        className="object-cover object-center"
                      />
                    </div>
                    <figcaption className="mt-2 text-[0.75rem] leading-snug text-text-muted-on-light">
                      {t(`captions.${item.key}`)}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>

          <div className="davide-copy">
            <p className="davide-rise font-display text-[clamp(1.75rem,1.3rem+1vw,2.4rem)] leading-none text-midnight">
              {t("name")}
            </p>
            <div className="davide-prose davide-rise davide-rise-late mt-5 grid max-w-xl gap-4">
              <p className="type-body text-text-on-light">{t("lead")}</p>
              <p className="type-body text-text-muted-on-light">{t("championship")}</p>
              <p className="type-body text-text-muted-on-light">{t("today")}</p>
            </div>

            <div className="davide-award davide-rise davide-rise-late mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-brand-gold/40 py-5">
              <TrophyIcon />
              <p className="davide-year font-display text-[clamp(3rem,2rem+2vw,4.25rem)] leading-none tracking-[-0.03em] text-midnight">
                {t("award.year")}
              </p>
              <span className="davide-award-line hidden h-12 w-px bg-brand-gold sm:block" aria-hidden="true" />
              <div className="davide-award-text">
                <p className="text-[0.72rem] tracking-[0.16em] text-gold-ink uppercase">{t("award.label")}</p>
                <p className="mt-1 text-[0.95rem] text-text-on-light">{t("award.name")}</p>
                <p className="text-[0.95rem] text-text-muted-on-light">{t("award.place")}</p>
              </div>
            </div>

            <ul className="davide-values mt-2">
              {values.map(({ key, icon: Icon }) => (
                <li key={key} className="davide-value davide-rise flex gap-4 border-b border-brand-gold/25 py-4">
                  <Icon />
                  <div>
                    <h3 className="davide-value-title font-display text-[1.25rem] leading-tight text-midnight">
                      {t(`values.${key}.title`)}
                    </h3>
                    <p className="davide-value-body mt-1 text-[0.9375rem] leading-snug text-text-muted-on-light">
                      {t(`values.${key}.body`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="davide-cta davide-rise mt-8">
              <Link
                href={routePathnames.about}
                className="group type-button inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-sm)] bg-brand-green px-5 text-ivory transition-colors duration-300 ease-standard hover:bg-[#0e6324] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-green"
              >
                {t("cta")}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-4 transition-transform duration-300 ease-standard group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 motion-reduce:transform-none"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <style>{davideStyles}</style>
    </Section>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="size-8 shrink-0 text-gold-ink">
      <path
        d="M9 6h14v6a7 7 0 0 1-14 0zM12 22h8M16 19v3M8 8H5.5A3.5 3.5 0 0 0 9 14M24 8h2.5A3.5 3.5 0 0 1 23 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold-ink">
      <circle cx="16" cy="13" r="6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 18.5 10 26l6-3 6 3-2-7.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold-ink">
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="21" cy="13" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.5 23c.8-3 2.8-4.5 5.5-4.5s4.7 1.5 5.5 4.5M18 18.6c1.6-.5 3.2-.4 4.6.6 1.2 1.6 1.5 3 1.4 3.8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold-ink">
      <path d="M16 6.5 25 14 16 26 7 14z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7 14h18M16 6.5 12.5 14 16 26l3.5-12z" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

const davideStyles = `
.davide-layout { display: grid; gap: 2rem; }
.davide-archive {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem 0.75rem;
  margin: 0.9rem 0 0;
  padding: 0;
  list-style: none;
}
.davide-shot { transition: translate 400ms cubic-bezier(0.2, 0.8, 0.2, 1), scale 400ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 400ms cubic-bezier(0.2, 0.8, 0.2, 1); }
@media (min-width: 768px) {
  .davide-archive { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
@media (min-width: 1024px) {
  .davide-layout {
    grid-template-columns: minmax(0, 1.18fr) minmax(0, 0.82fr);
    grid-template-areas: "photos intro" "photos copy";
    column-gap: 3.5rem;
    row-gap: 0.5rem;
    align-items: start;
  }
  .davide-photos { grid-area: photos; }
  .davide-intro { grid-area: intro; align-self: start; }
  .davide-copy { grid-area: copy; }
  .davide-title { margin-top: 0.4rem; line-height: 1.02; }
  .davide-prose { margin-top: 0.6rem; gap: 0.4rem; }
  .davide-prose p { line-height: 1.38; }
  .davide-award {
    margin-top: 0.7rem;
    padding-block: 0.35rem;
    column-gap: 0.85rem;
    row-gap: 0.35rem;
    flex-wrap: nowrap;
  }
  .davide-year { font-size: clamp(2.15rem, 1.35rem + 1.15vw, 2.7rem); }
  .davide-award-line { height: 2rem; }
  .davide-award-text { line-height: 1.25; }
  .davide-award-text p + p { margin-top: 0; }
  .davide-values { margin-top: 0.1rem; }
  .davide-value { gap: 0.65rem; padding-block: 0.3rem; }
  .davide-value-title { line-height: 1.15; }
  .davide-value-body { margin-top: 0.1rem; line-height: 1.32; }
  .davide-cta { margin-top: 0.7rem; }
  .davide-archive {
    position: relative;
    z-index: 2;
    margin-top: -2.4rem;
    padding: 0 0.85rem;
  }
}
@media (hover: hover) and (pointer: fine) {
  .davide-shot:hover {
    translate: 0 -4px;
    scale: 1.02;
    box-shadow: 0 18px 36px rgb(16 17 20 / 0.16);
    z-index: 3;
  }
}
@keyframes davide-rise {
  from { opacity: 0; translate: 0 12px; }
  to { opacity: 1; translate: 0 0; }
}
@keyframes davide-line {
  from { scale: 0 1; }
  to { scale: 1 1; }
}
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .davide-rise {
      animation: davide-rise 0.85s cubic-bezier(0.2, 0.8, 0.2, 1) both;
      animation-timeline: view();
      animation-range: entry 0% entry 36%;
    }
    .davide-rise-late { animation-range: entry 10% entry 48%; }
    .davide-award-line {
      transform-origin: center top;
      animation: davide-line 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
      animation-timeline: view();
      animation-range: entry 18% entry 46%;
    }
  }
}
@media (prefers-reduced-motion: reduce) {
  .davide-shot { transition: none; }
}
`;
