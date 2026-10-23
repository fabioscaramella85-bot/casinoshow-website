import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

const reasons = [
  { key: "award", icon: TrophyIcon },
  { key: "team", icon: TeamIcon },
  { key: "equipment", icon: GemIcon },
  { key: "memory", icon: StarIcon },
] as const;

function emphasis(chunks: ReactNode) {
  return <em className="text-gold-ink italic">{chunks}</em>;
}

export async function HomeWhy() {
  const t = await getTranslations("Home");

  return (
    <Section id="perche-casino-show" labelledBy="home-why" className="why-section relative overflow-x-clip">
      <Container>
        <header className="why-rise mx-auto max-w-3xl text-center">
          <div className="why-kicker">
            <span className="why-kicker-rule" aria-hidden="true" />
            <Eyebrow>{t("why.eyebrow")}</Eyebrow>
            <span className="why-kicker-rule" aria-hidden="true" />
          </div>
          <h2 id="home-why" className="type-h1 mt-4 text-balance text-midnight">
            {t.rich("why.title", { em: emphasis })}
          </h2>
          <p className="type-body-lg mx-auto mt-4 max-w-xl text-text-muted-on-light">
            {t("why.description")}
          </p>
        </header>

        <div className="why-board">
          <div className="why-line" aria-hidden="true">
            <span className="why-line-track" />
            <span className="why-line-fill" />
          </div>
          <ol className="why-steps">
            {reasons.map(({ key, icon: Icon }, index) => (
              <li key={key} className={`why-step why-rise why-d${index + 1}`}>
                <span className="why-marker" aria-hidden="true" />
                <span className="why-rail why-rail-h" aria-hidden="true">
                  <span className="why-rail-track" />
                  <span className="why-rail-fill" />
                </span>
                <span className="why-rail why-rail-v" aria-hidden="true">
                  <span className="why-rail-track" />
                  <span className="why-rail-fill" />
                </span>
                <article className="why-card">
                  <div className="why-icon-wrap">
                    <Icon />
                  </div>
                  <p className="why-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="why-title">{t(`why.items.${key}.title`)}</h3>
                  <p className="why-body">{t(`why.items.${key}.body`)}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>

        <div className="why-close why-rise why-d4">
          <div className="why-ornament" aria-hidden="true">
            <span className="why-close-rule" />
            <SpadeIcon />
            <span className="why-close-rule" />
          </div>
          <p className="why-close-brand">{t("why.closing.brand")}</p>
          <p className="why-close-line">{t("why.closing.line")}</p>
        </div>
      </Container>
      <style>{whyStyles}</style>
    </Section>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="why-icon">
      <path d="M21 20c-6 1-9 6-7 11 4-.8 7-3.4 8-7.2" />
      <path d="M19 28c-5 1.6-7 6-4.2 10.2 3.6-1.6 6.2-4.2 7-8" />
      <path d="M43 20c6 1 9 6 7 11-4-.8-7-3.4-8-7.2" />
      <path d="M45 28c5 1.6 7 6 4.2 10.2-3.6-1.6-6.2-4.2-7-8" />
      <path d="M26 15h12v8a6 6 0 0 1-12 0z" />
      <path d="M26 18.5h-5A4.2 4.2 0 0 0 26 25.5M38 18.5h5A4.2 4.2 0 0 1 38 25.5" />
      <path d="M32 29v6.5M26 39.5h12" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="why-icon">
      <circle cx="32" cy="20" r="5" />
      <path d="M21.5 42.5c1.1-6.2 4.8-9.2 10.5-9.2s9.4 3 10.5 9.2" />
      <circle cx="15.5" cy="25" r="3.5" />
      <path d="M8 44c.9-4.4 3.4-6.6 8.2-6.6 2.1 0 3.8.6 5 1.7" />
      <circle cx="48.5" cy="25" r="3.5" />
      <path d="M56 44c-.9-4.4-3.4-6.6-8.2-6.6-2.1 0-3.8.6-5 1.7" />
    </svg>
  );
}

function GemIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="why-icon">
      <path d="M32 13 49 27 32 51 15 27z" />
      <path d="M15 27h34M32 13 23.5 27 32 51 40.5 27z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="why-icon">
      <path d="M32 12 36.4 27.6 52 32 36.4 36.4 32 52 27.6 36.4 12 32 27.6 27.6z" />
    </svg>
  );
}

function SpadeIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="why-spade">
      <path d="M8 1.8c1.7 1.9 3.2 3.2 3.2 5a3.2 3.2 0 0 1-6.4 0c0-1.8 1.5-3.1 3.2-5z" />
      <path d="M8 10.4v3.1M6.5 13.5h3" />
    </svg>
  );
}

const whyStyles = `
.why-section {
  background-image:
    radial-gradient(ellipse 46% 38% at 0% 0%, rgb(198 166 107 / 0.16), transparent 70%),
    radial-gradient(ellipse 40% 34% at 100% 6%, rgb(198 166 107 / 0.11), transparent 72%),
    radial-gradient(ellipse 80% 42% at 50% 118%, rgb(231 225 214 / 0.95), transparent 62%);
  background-repeat: no-repeat;
}
.why-kicker {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
}
.why-kicker-rule {
  width: 2.4rem;
  height: 1px;
  background: rgb(198 166 107 / 0.75);
}
.why-board { position: relative; margin-top: 3.25rem; }
.why-steps {
  display: grid;
  gap: 1.15rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.why-step { position: relative; min-width: 0; padding-top: 1.7rem; }
.why-marker {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 50%;
  width: 0.85rem;
  height: 0.85rem;
  translate: -50% 0;
  border: 1px solid #c6a66b;
  border-radius: 999px;
  background: #f5f2eb;
  box-shadow: 0 0 0 4px rgb(245 242 235 / 0.9);
  transition: background-color 400ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 400ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.why-line, .why-rail { display: none; }
.why-line-track, .why-line-fill, .why-rail-track, .why-rail-fill { position: absolute; inset: 0; }
.why-line-track, .why-rail-h .why-rail-track { background: rgb(198 166 107 / 0.42); }
.why-rail-v .why-rail-track { background: rgb(198 166 107 / 0.42); }
.why-line-fill, .why-rail-h .why-rail-fill {
  background: #c6a66b;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.why-rail-v .why-rail-fill {
  background: #c6a66b;
  transform: scaleY(0);
  transform-origin: top center;
  transition: transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.why-card {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgb(198 166 107 / 0.5);
  border-radius: 8px;
  background: linear-gradient(180deg, rgb(255 252 247 / 0.94), rgb(245 242 235 / 0.9));
  box-shadow: 0 14px 32px rgb(16 17 20 / 0.06);
  padding: 1.45rem 1.15rem 1.4rem;
  text-align: center;
  transition: translate 420ms cubic-bezier(0.2, 0.8, 0.2, 1), border-color 420ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 420ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.why-icon-wrap {
  display: grid;
  width: 3.4rem;
  height: 3.4rem;
  place-items: center;
  border: 1px solid rgb(198 166 107 / 0.55);
  border-radius: 999px;
  background: rgb(198 166 107 / 0.1);
  color: #c6a66b;
  transition: translate 420ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.why-icon { width: 1.95rem; height: 1.95rem; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linejoin: round; stroke-linecap: round; }
.why-index {
  margin: 0.85rem 0 0;
  color: #5c4314;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
}
.why-title {
  margin: 0.4rem 0 0;
  color: #101114;
  font-family: var(--font-display), Georgia, serif;
  font-size: clamp(1.2rem, 1.05rem + 0.35vw, 1.4rem);
  font-weight: 500;
  line-height: 1.25;
}
.why-body {
  margin: 0.7rem 0 0;
  color: #3d4046;
  font-size: 0.9375rem;
  line-height: 1.55;
}
.why-close { margin-top: 2.75rem; text-align: center; }
.why-ornament { display: flex; align-items: center; justify-content: center; gap: 0.75rem; }
.why-close-rule { width: 3.25rem; height: 1px; background: rgb(198 166 107 / 0.8); }
.why-spade { width: 0.9rem; height: 0.9rem; color: #c6a66b; fill: none; stroke: currentColor; stroke-width: 1.2; stroke-linejoin: round; stroke-linecap: round; }
.why-close-brand {
  margin: 0.85rem 0 0;
  color: #101114;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}
.why-close-line {
  margin: 0.3rem 0 0;
  color: #5c4314;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

@media (max-width: 767px) {
  .why-kicker-rule { width: 1.35rem; }
  .why-step {
    display: grid;
    grid-template-columns: 0.85rem minmax(0, 1fr);
    column-gap: 0.85rem;
    align-items: start;
    padding-top: 0;
  }
  .why-marker { position: relative; top: 1.45rem; left: auto; translate: none; justify-self: center; }
  .why-rail-v {
    display: block;
    position: absolute;
    z-index: 0;
    top: 2.25rem;
    bottom: -1.15rem;
    left: 0.36rem;
    width: 1px;
    overflow: hidden;
  }
  .why-step:last-child .why-rail-v { display: none; }
}
@media (min-width: 768px) and (max-width: 1199.98px) {
  .why-steps { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2.6rem 1.5rem; }
  .why-step:nth-child(odd) .why-rail-h {
    display: block;
    position: absolute;
    z-index: 0;
    top: 6px;
    left: 50%;
    width: calc(100% + 1.5rem);
    height: 1px;
    overflow: hidden;
  }
}
@media (min-width: 1200px) {
  .why-steps {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.2rem;
    align-items: stretch;
  }
  .why-line {
    display: block;
    position: absolute;
    z-index: 0;
    top: 6px;
    left: calc((100% - 3.6rem) / 8);
    right: calc((100% - 3.6rem) / 8);
    height: 1px;
    overflow: hidden;
  }
  .why-card { padding: 1.55rem 1rem 1.45rem; }
  .why-title {
    display: flex;
    width: 100%;
    align-items: flex-end;
    justify-content: center;
    min-height: 2.5em;
  }
}

@media (hover: hover) and (pointer: fine) {
  .why-step:hover .why-card {
    translate: 0 -5px;
    border-color: #c6a66b;
    box-shadow: 0 18px 36px rgb(16 17 20 / 0.1);
  }
  .why-step:hover .why-icon-wrap { translate: 0 -3px; }
  .why-step:hover .why-marker {
    background: #c6a66b;
    box-shadow: 0 0 0 4px rgb(198 166 107 / 0.18);
  }
}
@media (min-width: 1200px) {
  .why-board:has(.why-step:nth-child(2):hover) .why-line-fill { transform: scaleX(0.333); }
  .why-board:has(.why-step:nth-child(3):hover) .why-line-fill { transform: scaleX(0.666); }
  .why-board:has(.why-step:nth-child(4):hover) .why-line-fill { transform: scaleX(1); }
}
@media (min-width: 768px) and (max-width: 1199.98px) {
  .why-board:has(.why-step:nth-child(2):hover) .why-step:nth-child(1) .why-rail-h .why-rail-fill { transform: scaleX(1); }
  .why-board:has(.why-step:nth-child(4):hover) .why-step:nth-child(3) .why-rail-h .why-rail-fill { transform: scaleX(1); }
}
@media (max-width: 767px) {
  .why-board:has(.why-step:nth-child(2):hover) .why-step:nth-child(1) .why-rail-v .why-rail-fill { transform: scaleY(1); }
  .why-board:has(.why-step:nth-child(3):hover) .why-step:nth-child(-n+2) .why-rail-v .why-rail-fill { transform: scaleY(1); }
  .why-board:has(.why-step:nth-child(4):hover) .why-step:nth-child(-n+3) .why-rail-v .why-rail-fill { transform: scaleY(1); }
}

@keyframes why-rise {
  from { opacity: 0; translate: 0 12px; }
  to { opacity: 1; translate: 0 0; }
}
@keyframes why-draw-x { from { scale: 0 1; } to { scale: 1 1; } }
@keyframes why-draw-y { from { scale: 1 0; } to { scale: 1 1; } }
@keyframes why-mark { from { opacity: 0; scale: 0.5; } to { opacity: 1; scale: 1; } }
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .why-rise {
      animation: why-rise 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both;
      animation-timeline: view();
      animation-range: entry 0% entry 34%;
    }
    .why-d2 { animation-range: entry 8% entry 42%; }
    .why-d3 { animation-range: entry 14% entry 48%; }
    .why-d4 { animation-range: entry 20% entry 54%; }
    .why-line-track, .why-rail-h .why-rail-track {
      transform-origin: left center;
      animation: why-draw-x 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both;
      animation-timeline: view();
      animation-range: entry 6% entry 46%;
    }
    .why-rail-v .why-rail-track {
      transform-origin: center top;
      animation: why-draw-y 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both;
      animation-timeline: view();
      animation-range: entry 6% entry 46%;
    }
    .why-marker {
      animation: why-mark 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
      animation-timeline: view();
      animation-range: entry 4% entry 28%;
    }
  }
}
@media (prefers-reduced-motion: reduce) {
  .why-card, .why-icon-wrap, .why-marker, .why-line-fill, .why-rail-fill { transition: none; }
  .why-step:hover .why-card, .why-step:hover .why-icon-wrap { translate: none; }
}
`;
