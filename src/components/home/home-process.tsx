"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { routePathnames } from "@/i18n/routes";

const DURATION = 6000;

const steps = [
  {
    key: "tell",
    src: "/home-page/come-funziona/raccontaci-il-tuo-evento-alpha.webp",
    width: 1024,
    height: 1536,
    figure: "88%",
  },
  {
    key: "proposal",
    src: "/home-page/come-funziona/progettiamo-la-proposta-alpha.webp",
    width: 1024,
    height: 1536,
    figure: "90%",
  },
  {
    key: "setup",
    src: "/home-page/come-funziona/allestiamo-la-location-alpha.webp",
    width: 1312,
    height: 1199,
    figure: "70%",
  },
  {
    key: "enjoy",
    src: "/home-page/come-funziona/vivete-la-serata.png",
    width: 1536,
    height: 1024,
    figure: "62%",
  },
] as const;

const processStyles = `
.process-stage {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: #101114;
  color: #f5f2eb;
  min-height: 46rem;
}
.process-stage-bg {
  position: absolute;
  z-index: 0;
  inset: auto 0 6.75rem 0;
  height: min(28rem, 58%);
  pointer-events: none;
}
.process-stage-photo {
  object-fit: cover;
  object-position: 90% 62%;
}
.process-layout {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-areas: "copy" "figures" "nav";
  min-height: 46rem;
}
.process-copy {
  grid-area: copy;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-block: 3.25rem 0.25rem;
}
.process-nav { grid-area: nav; padding-bottom: 2.75rem; }
.process-kicker {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #c6a66b;
}
.process-index {
  margin: 1.35rem 0 0;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  color: #c6a66b;
}
.process-index span { color: rgb(245 242 235 / 0.46); }
.process-copy-stack { display: grid; margin-top: 0.85rem; }
.process-cta { margin-top: 1.7rem; align-self: flex-start; }
.process-cta:focus-visible {
  outline: 2px solid #f5f2eb;
  outline-offset: 3px;
}
.process-phase {
  grid-area: 1 / 1;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 650ms cubic-bezier(0.22, 0.61, 0.36, 1), transform 650ms cubic-bezier(0.22, 0.61, 0.36, 1);
  pointer-events: none;
}
.process-phase[data-active="true"] {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
.process-phase-title {
  margin: 0;
  max-width: 10em;
  font-family: var(--font-display);
  font-size: clamp(2.15rem, 1.2rem + 2.4vw, 4.25rem);
  font-weight: 500;
  line-height: 1.02;
  letter-spacing: -0.025em;
  text-wrap: balance;
  color: #f5f2eb;
}
.process-phase-body {
  margin: 1.15rem 0 0;
  max-width: 34rem;
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.65;
  color: rgb(245 242 235 / 0.78);
}
.process-progress {
  display: flex;
  gap: 0.7rem;
  margin-top: 1.35rem;
  max-width: 22rem;
}
.process-tab {
  flex: 1;
  min-height: 2.75rem;
  padding: 1.15rem 0 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}
.process-tab-track {
  display: block;
  height: 2px;
  overflow: hidden;
  background: rgb(245 242 235 / 0.22);
}
.process-tab-fill {
  display: block;
  height: 100%;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left center;
  background: #c6a66b;
}
.process-tab[data-state="complete"] .process-tab-fill,
.process-stage[data-reduced="true"] .process-tab[data-state="current"] .process-tab-fill {
  transform: scaleX(1);
}
.process-controls {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.35rem;
}
.process-arrow {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid rgb(198 166 107 / 0.45);
  border-radius: 999px;
  background: transparent;
  color: #f5f2eb;
  cursor: pointer;
  transition: border-color 250ms ease, background-color 250ms ease;
}
.process-arrow:hover { border-color: #c6a66b; background: rgb(198 166 107 / 0.08); }
.process-arrow svg { width: 1.05rem; height: 1.05rem; }
.process-tab:focus-visible,
.process-arrow:focus-visible {
  outline: 1px solid #c6a66b;
  outline-offset: 3px;
}
.process-figures {
  grid-area: figures;
  position: relative;
  height: 24rem;
}
.process-figure {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  opacity: 0;
  transform: translate(14px, 12px);
  transform-origin: center bottom;
  transition: opacity 700ms cubic-bezier(0.22, 0.61, 0.36, 1), transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1);
  pointer-events: none;
}
.process-figure[data-active="true"] {
  opacity: 1;
  transform: none;
}
.process-figure img {
  width: auto;
  max-width: 100%;
  height: var(--figure-h);
  object-fit: contain;
  object-position: bottom center;
  filter: drop-shadow(0 14px 12px rgb(16 17 20 / 0.14));
}
.process-figure[data-step="tell"] img { transform: translateX(-2%); }
.process-figure[data-step="enjoy"] img { transform: translateX(-1%); }
.process-figure[data-step="setup"] img,
.process-figure[data-step="enjoy"] img {
  width: min(100%, 38rem);
  height: auto;
  max-height: var(--figure-h);
}
@media (min-width: 768px) and (max-width: 1023px) {
  .process-stage-bg { height: min(34rem, 64%); }
  .process-stage-photo { object-position: 62% 62%; }
}
@media (min-width: 1024px) {
  .process-stage,
  .process-layout { min-height: 44rem; }
  .process-stage-bg { inset: 0 auto 0 0; width: 140%; height: auto; }
  .process-stage-photo { object-position: left 68%; }
  .process-layout {
    grid-template-columns: 45% 55%;
    grid-template-areas:
      "copy figures"
      "nav figures";
  }
  .process-copy { justify-content: flex-end; padding-block: 4.5rem 0.5rem; }
  .process-nav { align-self: start; padding-bottom: 4.5rem; }
  .process-stage {
    --content-left: calc((100vw - min(100vw, 80rem)) / 2 + 2rem);
    --content-width: calc(min(100vw, 80rem) - 4rem);
    --figures-left: calc(var(--content-left) + var(--content-width) * 0.45);
  }
  .process-figures { height: auto; }
  .process-figure {
    justify-content: center;
    left: calc(58.8vw - var(--figures-left));
    right: calc(1.5vw - (100vw - var(--content-left) - var(--content-width)));
  }
  .process-phase-body { font-size: 1.05rem; }
}
@media (prefers-reduced-motion: reduce) {
  .process-phase,
  .process-figure {
    transition: none;
    transform: none;
  }
  .process-phase:not([data-active="true"]),
  .process-figure:not([data-active="true"]) { opacity: 0; }
}
`;

function Arrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d={direction === "prev" ? "M14.5 5.5 8 12l6.5 6.5" : "M9.5 5.5 16 12l-6.5 6.5"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeProcess() {
  const t = useTranslations("Home");
  const nav = useTranslations("Nav");
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const fillsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const indexRef = useRef(0);
  const elapsedRef = useRef(0);
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const hiddenRef = useRef(true);
  const reducedRef = useRef(false);
  const finePointerRef = useRef(false);
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);
  const tickRef = useRef<(now: number) => void>(() => {});

  const paint = useCallback((value: number) => {
    const fill = fillsRef.current[indexRef.current];
    if (fill) fill.style.transform = `scaleX(${Math.min(1, Math.max(0, value))})`;
  }, []);

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  }, []);

  const start = useCallback(() => {
    if (hoverRef.current || focusRef.current || hiddenRef.current || reducedRef.current) return;
    stop();
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame((now) => tickRef.current(now));
  }, [stop]);

  useEffect(() => {
    tickRef.current = (now: number) => {
      if (hoverRef.current || focusRef.current || hiddenRef.current || reducedRef.current) return;
      const delta = Math.min(64, now - lastRef.current);
      lastRef.current = now;
      elapsedRef.current += delta;
      if (elapsedRef.current >= DURATION) {
        elapsedRef.current = 0;
        const next = (indexRef.current + 1) % steps.length;
        indexRef.current = next;
        setIndex(next);
        paint(0);
      } else {
        paint(elapsedRef.current / DURATION);
      }
      rafRef.current = requestAnimationFrame((frame) => tickRef.current(frame));
    };
  }, [paint]);

  const go = useCallback(
    (next: number) => {
      const total = steps.length;
      const resolved = (next + total) % total;
      indexRef.current = resolved;
      elapsedRef.current = 0;
      setIndex(resolved);
      paint(0);
      start();
    },
    [paint, start],
  );

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => {
      reducedRef.current = motion.matches;
      finePointerRef.current = fine.matches;
      setReduced(motion.matches);
      if (motion.matches) stop();
    };
    apply();
    motion.addEventListener("change", apply);
    fine.addEventListener("change", apply);

    const node = rootRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        hiddenRef.current = !entry?.isIntersecting;
        if (entry?.isIntersecting) start();
        else stop();
      },
      { threshold: 0.35 },
    );
    if (node) observer.observe(node);

    return () => {
      stop();
      observer.disconnect();
      motion.removeEventListener("change", apply);
      fine.removeEventListener("change", apply);
    };
  }, [start, stop]);

  useEffect(() => {
    fillsRef.current.forEach((fill, fillIndex) => {
      if (!fill) return;
      if (fillIndex === index) fill.style.transform = reduced ? "" : `scaleX(${elapsedRef.current / DURATION})`;
      else fill.style.transform = "";
    });
  }, [index, reduced]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(indexRef.current + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(indexRef.current - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      go(0);
    } else if (event.key === "End") {
      event.preventDefault();
      go(steps.length - 1);
    }
  };

  return (
    <section
      ref={rootRef}
      className="process-stage"
      aria-labelledby="home-process"
      data-reduced={reduced ? "true" : "false"}
      onMouseEnter={() => {
        if (!finePointerRef.current) return;
        hoverRef.current = true;
        stop();
      }}
      onMouseLeave={() => {
        if (!finePointerRef.current) return;
        hoverRef.current = false;
        start();
      }}
      onFocus={() => {
        focusRef.current = true;
        stop();
      }}
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return;
        focusRef.current = false;
        start();
      }}
      onPointerDown={(event) => {
        if (event.pointerType === "mouse") return;
        swipeRef.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={(event) => {
        const startPoint = swipeRef.current;
        swipeRef.current = null;
        if (!startPoint || event.pointerType === "mouse") return;
        const dx = event.clientX - startPoint.x;
        const dy = event.clientY - startPoint.y;
        if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
        go(indexRef.current + (dx < 0 ? 1 : -1));
      }}
    >
      <style>{processStyles}</style>
      <div className="process-stage-bg" aria-hidden="true">
        <Image
          src="/home-page/come-funziona/sfondo-stage.png"
          alt=""
          fill
          sizes="100vw"
          quality={75}
          className="process-stage-photo"
        />
      </div>
      <Container>
        <div className="process-layout">
          <div className="process-copy">
            <h2 id="home-process" className="process-kicker">
              {t("process.eyebrow")}
            </h2>
            <p className="process-index">
              {String(index + 1).padStart(2, "0")}
              <span> / {String(steps.length).padStart(2, "0")}</span>
            </p>
            <div className="process-copy-stack">
              {steps.map((step, stepIndex) => {
                const active = stepIndex === index;
                return (
                  <div
                    key={step.key}
                    id={`process-phase-${step.key}`}
                    className="process-phase"
                    data-active={active ? "true" : "false"}
                    aria-hidden={active ? undefined : true}
                  >
                    <h3 className="process-phase-title">{t(`process.steps.${step.key}.title`)}</h3>
                    <p className="process-phase-body">{t(`process.steps.${step.key}.body`)}</p>
                  </div>
                );
              })}
            </div>
            <Button href={routePathnames.quote} className="process-cta">
              {nav("quote")}
            </Button>
          </div>
          <div className="process-nav">
            <div
              className="process-progress"
              role="tablist"
              aria-label={t("process.phases")}
              onKeyDown={onKeyDown}
            >
              {steps.map((step, stepIndex) => {
                const state = stepIndex < index ? "complete" : stepIndex === index ? "current" : "future";
                return (
                  <button
                    key={step.key}
                    type="button"
                    className="process-tab"
                    role="tab"
                    aria-selected={stepIndex === index}
                    aria-controls={`process-phase-${step.key}`}
                    tabIndex={stepIndex === index ? 0 : -1}
                    data-state={state}
                    onClick={() => go(stepIndex)}
                  >
                    <span className="process-tab-track">
                      <span
                        className="process-tab-fill"
                        ref={(node) => {
                          fillsRef.current[stepIndex] = node;
                        }}
                      />
                    </span>
                    <span className="sr-only">{t(`process.steps.${step.key}.title`)}</span>
                  </button>
                );
              })}
            </div>
            <div className="process-controls">
              <button type="button" className="process-arrow" aria-label={t("process.previous")} onClick={() => go(index - 1)}>
                <Arrow direction="prev" />
              </button>
              <button type="button" className="process-arrow" aria-label={t("process.next")} onClick={() => go(index + 1)}>
                <Arrow direction="next" />
              </button>
            </div>
          </div>
          <div className="process-figures">
            {steps.map((step, stepIndex) => {
              const active = stepIndex === index;
              return (
                <figure
                  key={step.key}
                  className="process-figure"
                  data-step={step.key}
                  data-active={active ? "true" : "false"}
                  aria-hidden={active ? undefined : true}
                  style={{ "--figure-h": step.figure } as CSSProperties}
                >
                  <Image
                    src={step.src}
                    alt={t(`process.steps.${step.key}.alt`)}
                    width={step.width}
                    height={step.height}
                    unoptimized
                    sizes="(min-width: 1024px) 52vw, 92vw"
                  />
                </figure>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
