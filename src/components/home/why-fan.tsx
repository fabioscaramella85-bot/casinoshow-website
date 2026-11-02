"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export type WhyCardContent = {
  key: string;
  index: string;
  suit: "spade" | "heart" | "diamond" | "club";
  tone: "ink" | "red";
  title: string;
  body: string;
};

type Phase = "rest" | "wait" | "enter";

export function WhyFan({ cards }: { cards: WhyCardContent[] }) {
  const fanRef = useRef<HTMLOListElement>(null);
  const [phase, setPhase] = useState<Phase>("rest");

  useEffect(() => {
    const fan = fanRef.current;
    if (!fan) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const play = () => {
      setPhase("wait");
      frame = window.requestAnimationFrame(() => {
        frame = window.requestAnimationFrame(() => setPhase("enter"));
      });
    };

    const rect = fan.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.88 && rect.bottom > 80;
    if (inView) {
      play();
    } else {
      setPhase("wait");
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        play();
        observer.disconnect();
      },
      { threshold: 0.32 },
    );
    if (!inView) observer.observe(fan);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (phase !== "enter") return;
    const timer = window.setTimeout(() => setPhase("rest"), 1100);
    return () => window.clearTimeout(timer);
  }, [phase]);

  return (
    <ol className="why-fan" data-phase={phase} ref={fanRef}>
      {cards.map((card, index) => (
        <li key={card.key} className="why-step" style={{ "--i": index } as CSSProperties}>
          <article className="why-card" data-tone={card.tone}>
            <div className="why-card-frame">
              <span className="why-corners" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className="why-pip why-pip-tl" aria-hidden="true">
                <span>A</span>
                <Suit suit={card.suit} />
              </span>
              <span className="why-pip why-pip-br" aria-hidden="true">
                <span>A</span>
                <Suit suit={card.suit} />
              </span>
              <div className="why-card-copy">
                <CardIcon suit={card.suit} />
                <p className="why-index">{card.index}</p>
                <h3 className="why-card-title">{card.title}</h3>
                <p className="why-card-body">{card.body}</p>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}

function Suit({ suit }: { suit: WhyCardContent["suit"] }) {
  if (suit === "heart") {
    return (
      <svg viewBox="0 0 16 16" className="why-suit" aria-hidden="true">
        <path d="M8 14.2S1.6 10 1.6 6.3A3.2 3.2 0 0 1 8 4.6a3.2 3.2 0 0 1 6.4 1.7c0 3.7-6.4 7.9-6.4 7.9z" />
      </svg>
    );
  }
  if (suit === "diamond") {
    return (
      <svg viewBox="0 0 16 16" className="why-suit" aria-hidden="true">
        <path d="M8 1.4 14.2 8 8 14.6 1.8 8z" />
      </svg>
    );
  }
  if (suit === "club") {
    return (
      <svg viewBox="0 0 16 16" className="why-suit" aria-hidden="true">
        <circle cx="8" cy="5.1" r="2.35" />
        <circle cx="5.15" cy="8.7" r="2.35" />
        <circle cx="10.85" cy="8.7" r="2.35" />
        <path d="M7.2 9.4h1.6l.55 3.5H6.65z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" className="why-suit" aria-hidden="true">
      <path d="M8 1.5c2.2 2.4 4.3 3.9 4.3 6.2a3.15 3.15 0 0 1-2.4 3.05C10.6 12.2 11.3 14.4 12.4 14.4H3.6c1.1 0 1.8-2.2 2.5-3.65A3.15 3.15 0 0 1 3.7 7.7C3.7 5.4 5.8 3.9 8 1.5z" />
    </svg>
  );
}

function CardIcon({ suit }: { suit: WhyCardContent["suit"] }) {
  if (suit === "spade") {
    return (
      <svg viewBox="0 0 64 64" className="why-icon" aria-hidden="true">
        <path d="M22 18h20v7.5a10 10 0 0 1-20 0z" />
        <path d="M22 22H16.5A6.5 6.5 0 0 0 23 32M42 22h5.5A6.5 6.5 0 0 1 41 32" />
        <path d="M32 35.5V43M26 47h12" />
      </svg>
    );
  }
  if (suit === "heart") {
    return (
      <svg viewBox="0 0 64 64" className="why-icon" aria-hidden="true">
        <circle cx="32" cy="22" r="5" />
        <path d="M21 44c1.2-6.4 5-9.6 11-9.6s9.8 3.2 11 9.6" />
        <circle cx="16.5" cy="26.5" r="3.6" />
        <path d="M8.5 45c.8-4.6 3.4-7 8.4-7 1.8 0 3.4.5 4.6 1.5" />
        <circle cx="47.5" cy="26.5" r="3.6" />
        <path d="M55.5 45c-.8-4.6-3.4-7-8.4-7-1.8 0-3.4.5-4.6 1.5" />
      </svg>
    );
  }
  if (suit === "diamond") {
    return (
      <svg viewBox="0 0 64 64" className="why-icon" aria-hidden="true">
        <ellipse cx="32" cy="42" rx="15" ry="5.5" />
        <ellipse cx="32" cy="35" rx="15" ry="5.5" />
        <ellipse cx="32" cy="28" rx="15" ry="5.5" />
        <path d="M17.2 28v14M46.8 28v14" />
        <circle cx="32" cy="28" r="3.2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className="why-icon" aria-hidden="true">
      <path d="M16 16h10" />
      <path d="M16 16c0 12 10 12 10 0" />
      <path d="M21 28v12" />
      <path d="M15 42h12" />
      <path d="M38 16h10" />
      <path d="M38 16c0 12 10 12 10 0" />
      <path d="M43 28v12" />
      <path d="M37 42h12" />
      <path d="M28 21h8" />
    </svg>
  );
}
