import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { gameAnchors, gamePhotos, type GameKey } from "@/components/games/game-photos";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { gameLandingHref } from "@/i18n/game-landings";
import { Link } from "@/i18n/navigation";
import { routePathnames } from "@/i18n/routes";

const discoverHref = {
  roulette: gameLandingHref.roulette,
  blackjack: gameLandingHref.blackjack,
  poker: gameLandingHref.poker,
  wheel: gameLandingHref["wheel-of-fortune"],
  dice: gameLandingHref["chuck-a-luck"],
} as const;

const highlightKeys = ["a", "b", "c"] as const;

const groups: { tone: "light" | "dark"; id?: string; items: GameKey[] }[] = [
  { tone: "light", items: ["roulette", "blackjack"] },
  { tone: "dark", items: ["poker", "wheel"] },
  { tone: "light", id: "other-games", items: ["dice", "selfie"] },
  { tone: "dark", id: "extras", items: ["experience", "custom"] },
];

export async function ExperienceGroups() {
  const t = await getTranslations("Games");
  const sequence = groups.flatMap((group) => group.items);

  return (
    <>
      {groups.map((group) => (
        <section
          key={group.items.join("-")}
          id={group.id}
          className={`py-[var(--spacing-section)] ${
            group.tone === "dark" ? "bg-surface-dark text-text-on-dark" : "bg-surface-light text-text-on-light"
          }`}
        >
          <Container className="grid gap-16 lg:gap-24">
            {group.items.map((key) => {
              const imageLeft = sequence.indexOf(key) % 2 === 0;
              const dark = group.tone === "dark";

              const article = (
                <article
                  id={gameAnchors[key]}
                  className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
                >
                  <div className={imageLeft ? "" : "lg:order-2"}>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[5px] border border-brand-gold/45 shadow-[0_18px_48px_rgb(16_17_20/0.12)]">
                      <Image
                        src={gamePhotos[key]}
                        alt={t(`experiences.${key}.alt`)}
                        fill
                        quality={85}
                        sizes="(min-width: 1024px) 40vw, 92vw"
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className={imageLeft ? "" : "lg:order-1"}>
                    <p
                      className={`text-[0.72rem] tracking-[0.16em] uppercase ${
                        dark ? "text-brand-gold" : "text-gold-ink"
                      }`}
                    >
                      {t(`experiences.${key}.index`)}
                      <span aria-hidden="true"> · </span>
                      {t(`experiences.${key}.category`)}
                    </p>
                    <h2 className="type-h2 mt-3 text-balance">{t(`experiences.${key}.title`)}</h2>
                    <p className={`type-body-lg mt-5 ${dark ? "text-ivory" : ""}`}>
                      {t(`experiences.${key}.lead`)}
                    </p>
                    <p className={`type-body mt-4 ${dark ? "text-ivory/80" : "text-text-muted-on-light"}`}>
                      {t(`experiences.${key}.body`)}
                    </p>
                    <p className={`type-body mt-4 ${dark ? "text-ivory/80" : "text-text-muted-on-light"}`}>
                      {t(`experiences.${key}.atmosphere`)}
                    </p>
                    <p className={`type-body mt-4 ${dark ? "text-ivory/80" : "text-text-muted-on-light"}`}>
                      {t(`experiences.${key}.occasions`)}
                    </p>
                    <ul className="gx-facts" data-tone={dark ? "dark" : "light"}>
                      {highlightKeys.map((item) => (
                        <li key={item} className="gx-fact">
                          <span className="gx-fact-mark" aria-hidden="true">
                            <svg viewBox="0 0 12 12">
                              <path
                                d="M2.25 6h7.1M6.4 3.15 9.35 6 6.4 8.85"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className="gx-fact-text">{t(`experiences.${key}.highlights.${item}`)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <Button href={routePathnames.quote}>{t("experiences.cta")}</Button>
                      {key in discoverHref ? (
                        <Link
                          href={discoverHref[key as keyof typeof discoverHref]}
                          className="type-button inline-flex min-h-11 items-center text-brand-red transition-colors hover:text-brand-red-hover"
                        >
                          {t("experiences.discover")}
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </article>
              );

              return <div key={key}>{article}</div>;
            })}
          </Container>
        </section>
      ))}
    </>
  );
}
