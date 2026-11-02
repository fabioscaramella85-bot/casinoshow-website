import Image from "next/image";
import { getTranslations } from "next-intl/server";
import backdrop from "../../../public/home-page/perchè-casino-show/sfondo.png";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { WhyFan, type WhyCardContent } from "@/components/home/why-fan";

const cards = [
  { key: "award", suit: "spade", tone: "ink" },
  { key: "team", suit: "heart", tone: "red" },
  { key: "equipment", suit: "diamond", tone: "red" },
  { key: "memory", suit: "club", tone: "ink" },
] as const;

export async function HomeWhy() {
  const t = await getTranslations("Home");
  const content: WhyCardContent[] = cards.map((card, index) => ({
    key: card.key,
    suit: card.suit,
    tone: card.tone,
    index: String(index + 1).padStart(2, "0"),
    title: t(`why.items.${card.key}.title`),
    body: t(`why.items.${card.key}.body`),
  }));

  return (
    <Section id="perche-casino-show" labelledBy="home-why" className="why-section relative overflow-x-clip">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src={backdrop}
          alt=""
          fill
          quality={75}
          sizes="100vw"
          className="why-backdrop object-cover"
        />
      </div>
      <Container className="relative">
        <header className="why-header mx-auto max-w-3xl text-center">
          <Eyebrow>{t("why.eyebrow")}</Eyebrow>
          <h2 id="home-why" className="type-h1 why-headline mt-4 text-balance text-midnight">
            {t("why.titleLead")}
            <br />
            <em className="text-gold-ink italic">{t("why.titleAccent")}</em>
          </h2>
          <p className="type-body-lg mx-auto mt-4 max-w-2xl text-text-on-light">{t("why.description")}</p>
        </header>
        <WhyFan cards={content} />
      </Container>
      <style>{whyStyles}</style>
    </Section>
  );
}

const whyStyles = `
.why-section { isolation: isolate; }
.why-backdrop { object-position: center 42%; }
.why-header { position: relative; z-index: 2; max-width: 46rem; }
.why-headline { max-width: 16em; margin-inline: auto; }
.why-fan {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem 0.7rem;
  margin: 2.2rem auto 0;
  padding: 0 0 0.6rem;
  list-style: none;
  max-width: 42rem;
}
.why-step { position: relative; min-width: 0; --tilt: 0deg; --drop: 0px; }
.why-card {
  position: relative;
  height: 100%;
  border-radius: 12px;
  background:
    radial-gradient(120% 70% at 50% 0%, rgb(255 252 246 / 0.95), transparent 58%),
    linear-gradient(180deg, #fbf6ec 0%, #f3e7d2 100%);
  box-shadow:
    0 0 0 1px #c6a66b,
    0 16px 28px rgb(8 22 16 / 0.2),
    0 2px 6px rgb(8 22 16 / 0.1);
  opacity: 1;
  transform: translateY(var(--drop)) rotate(var(--tilt));
  transform-origin: center 58%;
  transition:
    transform 400ms cubic-bezier(0.22, 0.61, 0.36, 1),
    box-shadow 400ms cubic-bezier(0.22, 0.61, 0.36, 1),
    opacity 520ms cubic-bezier(0.22, 0.61, 0.36, 1);
}
.why-fan[data-phase="wait"] .why-card {
  opacity: 0;
  transform: translateY(1.35rem) rotate(var(--tilt));
}
.why-fan[data-phase="enter"] .why-card {
  opacity: 1;
  transform: translateY(var(--drop)) rotate(var(--tilt));
  transition-delay: calc(var(--i) * 85ms);
}
.why-card-frame {
  position: relative;
  height: 100%;
  min-height: 19.5rem;
  margin: 0.42rem;
  border: 1px solid rgb(198 166 107 / 0.92);
  border-radius: 8px;
}
.why-corners { pointer-events: none; }
.why-corners i {
  position: absolute;
  width: 0.72rem;
  height: 0.72rem;
  border-color: #c6a66b;
  border-style: solid;
  border-width: 0;
}
.why-corners i:nth-child(1) { top: 0.42rem; left: 0.42rem; border-top-width: 1px; border-left-width: 1px; }
.why-corners i:nth-child(2) { top: 0.42rem; right: 0.42rem; border-top-width: 1px; border-right-width: 1px; }
.why-corners i:nth-child(3) { bottom: 0.42rem; left: 0.42rem; border-bottom-width: 1px; border-left-width: 1px; }
.why-corners i:nth-child(4) { bottom: 0.42rem; right: 0.42rem; border-bottom-width: 1px; border-right-width: 1px; }
.why-pip {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.02rem;
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 0.9;
}
.why-pip-tl { top: 0.72rem; left: 0.62rem; }
.why-pip-br { right: 0.62rem; bottom: 0.72rem; transform: rotate(180deg); }
.why-card[data-tone="ink"] .why-pip { color: #101114; }
.why-card[data-tone="red"] .why-pip { color: #b1121b; }
.why-suit { display: block; width: 0.86rem; height: 0.86rem; }
.why-suit path,
.why-suit circle { fill: currentColor; stroke: none; }
.why-card-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.55rem 1.05rem 1.15rem;
  text-align: center;
}
.why-icon {
  width: 2.55rem;
  height: 2.55rem;
  color: #5c4314;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linejoin: round;
  stroke-linecap: round;
}
.why-index {
  margin: 0.72rem 0 0;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #5c4314;
}
.why-card-title {
  margin: 0.4rem 0 0;
  max-width: 12em;
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 1.05rem + 0.4vw, 1.45rem);
  font-weight: 500;
  line-height: 1.12;
  letter-spacing: -0.02em;
  text-wrap: balance;
  color: #101114;
}
.why-card-body {
  margin: 0.45rem 0 0;
  max-width: 22em;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.45;
  text-wrap: pretty;
  color: #3d4046;
}
@media (min-width: 700px) {
  .why-step:nth-child(1) { --tilt: -3deg; --drop: 0.35rem; }
  .why-step:nth-child(2) { --tilt: 2.5deg; }
  .why-step:nth-child(3) { --tilt: -2deg; --drop: 0.2rem; }
  .why-step:nth-child(4) { --tilt: 3deg; }
  .why-card-frame { min-height: 20.5rem; }
  .why-card-body { font-size: 0.92rem; }
}
@media (min-width: 1024px) {
  .why-backdrop { object-position: center 46%; }
  .why-fan {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 0.85rem;
    max-width: none;
    margin-top: 2.75rem;
    padding-bottom: 1.6rem;
  }
  .why-step {
    width: clamp(12.6rem, 16vw, 15.1rem);
    flex: 0 0 auto;
    margin-inline: 0;
    z-index: 1;
  }
  .why-step:nth-child(1) { --tilt: -7deg; --drop: 1.15rem; }
  .why-step:nth-child(2) { --tilt: -2deg; --drop: 0.28rem; }
  .why-step:nth-child(3) { --tilt: 2deg; --drop: 0.28rem; }
  .why-step:nth-child(4) { --tilt: 7deg; --drop: 1.15rem; }
  .why-card-frame { min-height: 22.25rem; }
}
@media (hover: hover) and (pointer: fine) {
  .why-fan[data-phase="enter"] .why-card:hover,
  .why-fan[data-phase="rest"] .why-card:hover {
    z-index: 3;
    transition-delay: 0ms;
    transform: translateY(-1.65rem) rotate(0deg) scale(1.05);
    box-shadow:
      0 0 0 1px #e4d2a4,
      0 30px 42px rgb(8 22 16 / 0.3),
      0 10px 16px rgb(8 22 16 / 0.14),
      0 0 22px rgb(198 166 107 / 0.38);
  }
  .why-step:hover { z-index: 4; }
}
@media (max-width: 699px) {
  .why-backdrop { object-position: center 36%; }
  .why-card-frame { min-height: 0; }
  .why-card-copy { padding: 2.45rem 0.7rem 0.95rem; }
  .why-card-body { font-size: 0.82rem; line-height: 1.4; }
  .why-pip { font-size: 1.02rem; }
}
@media (prefers-reduced-motion: reduce) {
  .why-card { transition: none; }
  .why-fan[data-phase="wait"] .why-card,
  .why-fan[data-phase="enter"] .why-card,
  .why-fan[data-phase="rest"] .why-card,
  .why-fan[data-phase="enter"] .why-card:hover,
  .why-fan[data-phase="rest"] .why-card:hover {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
`;
