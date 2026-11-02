"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { MosaicCardId } from "@/components/events/mosaic-images";

export type MosaicCardContent = {
  id: MosaicCardId;
  image: string | null;
  alt: string;
  frontTitle: string;
  frontText: string;
  backTitle: string;
  backText: string;
};

type MosaicLabels = {
  cta: string;
  hint: string;
  back: string;
  open: string;
  close: string;
};

export function EventsMosaicGrid({
  cards,
  labels,
}: {
  cards: MosaicCardContent[];
  labels: MosaicLabels;
}) {
  const [openId, setOpenId] = useState<MosaicCardId | null>(null);
  const [turned, setTurned] = useState<Partial<Record<MosaicCardId, true>>>({});
  const pendingFocus = useRef<{ id: MosaicCardId; open: boolean } | null>(null);
  const hitRefs = useRef<Partial<Record<MosaicCardId, HTMLButtonElement | null>>>({});
  const returnRefs = useRef<Partial<Record<MosaicCardId, HTMLButtonElement | null>>>({});

  useEffect(() => {
    const pending = pendingFocus.current;
    if (!pending) return;
    pendingFocus.current = null;
    const node = pending.open ? returnRefs.current[pending.id] : hitRefs.current[pending.id];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => node?.focus(), reduce ? 0 : 320);
    return () => window.clearTimeout(timer);
  }, [openId]);

  function toggle(id: MosaicCardId) {
    setTurned((current) => (current[id] ? current : { ...current, [id]: true }));
    const open = openId !== id;
    pendingFocus.current = { id, open };
    setOpenId(open ? id : null);
  }

  return (
    <ul className="ev-mosaic">
      {cards.map((card, index) => {
        const open = openId === card.id;
        const number = String(index + 1).padStart(2, "0");
        return (
          <li key={card.id}>
            <article
              className={`ev-tile${open ? " is-open" : ""}${turned[card.id] ? " has-flipped" : ""}${card.image ? " has-photo" : ""}`}
            >
              <div className="ev-tile-scene">
                <div className="ev-tile-inner">
                  <div className="ev-tile-face ev-tile-front" inert={open ? true : undefined}>
                    {card.image ? (
                      <div className="ev-tile-media">
                        <Image
                          src={card.image}
                          alt={card.alt}
                          fill
                          sizes="(min-width: 1024px) 28vw, (min-width: 640px) 46vw, 92vw"
                          quality={75}
                          className="ev-tile-photo"
                        />
                      </div>
                    ) : null}
                    <span className="ev-tile-index" aria-hidden="true">
                      {number}
                    </span>
                    <span className="ev-tile-front-copy">
                      <h3 id={`mosaic-title-${card.id}`}>{card.frontTitle}</h3>
                      <p id={`mosaic-text-${card.id}`}>{card.frontText}</p>
                    </span>
                    <span className="ev-tile-hint" aria-hidden="true">
                      {labels.hint}
                      <svg viewBox="0 0 16 16">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </span>
                    <button
                      type="button"
                      className="ev-tile-hit"
                      aria-expanded={open}
                      aria-controls={`mosaic-back-${card.id}`}
                      aria-labelledby={`mosaic-title-${card.id}`}
                      aria-describedby={`mosaic-text-${card.id}`}
                      ref={(node) => {
                        hitRefs.current[card.id] = node;
                      }}
                      onClick={() => toggle(card.id)}
                    >
                      <span className="sr-only">{labels.open}</span>
                    </button>
                  </div>
                  <div
                    className="ev-tile-face ev-tile-back"
                    id={`mosaic-back-${card.id}`}
                    inert={open ? undefined : true}
                  >
                    <span className="ev-tile-index" aria-hidden="true">
                      {number}
                    </span>
                    <p className="ev-tile-back-title">{card.backTitle}</p>
                    <p className="ev-tile-back-text">{card.backText}</p>
                    <span className="ev-tile-return" aria-hidden="true">
                      {labels.back}
                    </span>
                    <button
                      type="button"
                      className="ev-tile-hit ev-tile-back-hit"
                      aria-expanded={open}
                      aria-label={labels.close}
                      ref={(node) => {
                        returnRefs.current[card.id] = node;
                      }}
                      onClick={() => toggle(card.id)}
                    />
                    <Link
                      href={{ pathname: "/quote", query: { occasione: card.id } }}
                      className="ev-tile-cta"
                    >
                      {labels.cta}
                      <svg aria-hidden="true" viewBox="0 0 16 16">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
