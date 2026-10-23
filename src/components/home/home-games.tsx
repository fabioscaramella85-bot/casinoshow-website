import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { gameAnchors, gameBackdrop, gameOrder, gamePhotos } from "@/components/games/game-photos";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import { routePathnames } from "@/i18n/routes";

function emphasis(chunks: ReactNode) {
  return <em className="text-gold-ink italic">{chunks}</em>;
}

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export async function HomeGames() {
  const t = await getTranslations("Home");

  return (
    <Section tone="light" labelledBy="home-games" className="relative overflow-x-clip">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src={gameBackdrop}
          alt=""
          fill
          quality={75}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[rgb(245_242_235/0.9)] sm:bg-[rgb(245_242_235/0.8)]" />
      </div>
      <style>{gameCardStyles}</style>
      <Container className="relative">
        <div className="max-w-3xl">
          <Eyebrow>{t("games.eyebrow")}</Eyebrow>
          <h2 id="home-games" className="type-h1 mt-4 text-balance">
            {t.rich("games.title", { em: emphasis })}
          </h2>
          <p className="type-body-lg mt-5 max-w-2xl text-text-muted-on-light">{t("games.description")}</p>
        </div>
        <ul className="home-games-grid mt-10 grid gap-4 sm:gap-5">
          {gameOrder.map((key, index) => (
            <li key={key} className="min-w-0">
              <Link
                href={{ pathname: routePathnames.games, hash: gameAnchors[key] }}
                className="home-game-card"
              >
                <Image
                  src={gamePhotos[key]}
                  alt={t(`games.items.${key}.alt`)}
                  fill
                  quality={85}
                  sizes="(min-width: 1200px) 22vw, (min-width: 640px) 46vw, 92vw"
                  className="home-game-photo object-cover object-center"
                />
                <span className="home-game-shade" aria-hidden="true" />
                <span className="home-game-shade home-game-shade-strong" aria-hidden="true" />
                <div className="home-game-copy">
                  <div className="home-game-lead">
                    <p className="home-game-index">
                      {String(index + 1).padStart(2, "0")}
                      <span aria-hidden="true"> / </span>
                      08
                    </p>
                    <h3 className="home-game-title">{t(`games.items.${key}.title`)}</h3>
                    <p className="home-game-body">{t(`games.items.${key}.body`)}</p>
                  </div>
                  <p className="home-game-cta">
                    {t("games.cardCta")}
                    <Arrow />
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-14 max-w-2xl text-center sm:mt-16">
          <p className="font-display text-[clamp(1.75rem,1.2rem+1.4vw,2.6rem)] leading-[1.15] text-balance">
            {t.rich("games.closing", { em: emphasis })}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={routePathnames.quote}>{t("games.primaryCta")}</Button>
            <Button href={routePathnames.games} variant="secondary">
              {t("games.secondaryCta")}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

const gameCardStyles = `
.home-games-grid { grid-template-columns: minmax(0, 1fr); }
.home-game-card {
  position: relative;
  display: block;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border: 1px solid rgb(198 166 107 / 0.32);
  border-radius: 5px;
  box-shadow: 0 10px 28px rgb(16 17 20 / 0.06);
  transition: border-color 400ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 400ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.home-game-card:hover,
.home-game-card:focus-visible {
  border-color: #c6a66b;
  box-shadow: 0 14px 32px rgb(16 17 20 / 0.1);
}
.home-game-card:focus-visible {
  outline: 2px solid #c6a66b;
  outline-offset: 3px;
}
.home-game-photo {
  transition: scale 450ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.home-game-card:hover .home-game-photo,
.home-game-card:focus-visible .home-game-photo { scale: 1.04; }
.home-game-shade {
  position: absolute;
  z-index: 1;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgb(0 0 0 / 0) 18%,
    rgb(0 0 0 / 0.06) 36%,
    rgb(0 0 0 / 0.34) 54%,
    rgb(0 0 0 / 0.78) 74%,
    rgb(0 0 0 / 0.94) 90%,
    rgb(0 0 0 / 0.97) 100%
  );
}
.home-game-shade-strong {
  background: linear-gradient(
    to bottom,
    rgb(0 0 0 / 0) 16%,
    rgb(0 0 0 / 0.1) 38%,
    rgb(0 0 0 / 0.42) 56%,
    rgb(0 0 0 / 0.84) 76%,
    rgb(0 0 0 / 0.97) 100%
  );
  opacity: 0;
  transition: opacity 320ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.home-game-card:hover .home-game-shade-strong,
.home-game-card:focus-visible .home-game-shade-strong { opacity: 1; }
.home-game-copy {
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.8rem;
  padding: 1.35rem 1rem 1.05rem;
  pointer-events: none;
  color: #fff;
}
.home-game-lead {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.home-game-index {
  margin: 0 0 0.1rem;
  color: #c6a66b;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  line-height: 1;
  text-transform: uppercase;
}
.home-game-title {
  margin: 0;
  color: #fff;
  font-family: var(--font-display), Georgia, serif;
  font-size: clamp(1.22rem, 1rem + 0.4vw, 1.48rem);
  font-weight: 500;
  line-height: 1.15;
}
.home-game-body {
  margin: 0.15rem 0 0;
  min-height: 4.35em;
  color: rgb(245 242 235 / 0.94);
  font-size: 0.875rem;
  line-height: 1.45;
}
.home-game-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0;
  color: #c6a66b;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  line-height: 1.2;
  text-transform: uppercase;
  transition: color 250ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.home-game-cta svg { transition: translate 250ms cubic-bezier(0.2, 0.8, 0.2, 1); }
.home-game-card:hover .home-game-cta,
.home-game-card:focus-visible .home-game-cta { color: #f3e6c8; }
.home-game-card:hover .home-game-cta svg,
.home-game-card:focus-visible .home-game-cta svg { translate: 4px 0; }
@media (min-width: 640px) {
  .home-games-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .home-game-copy { padding: 1.5rem 1.15rem 1.15rem; }
}
@media (min-width: 1200px) {
  .home-games-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.25rem; }
}
@media (prefers-reduced-motion: reduce) {
  .home-game-card,
  .home-game-photo,
  .home-game-shade-strong,
  .home-game-cta,
  .home-game-cta svg { transition: none; }
  .home-game-card:hover .home-game-photo,
  .home-game-card:focus-visible .home-game-photo { scale: 1; }
  .home-game-card:hover .home-game-cta svg,
  .home-game-card:focus-visible .home-game-cta svg { translate: none; }
}
`;
