"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

type Step = { title: string; body: string };
type LineBox = { vertical: boolean; x: number; y: number; length: number };

const desktopQuery = "(hover: hover) and (pointer: fine) and (min-width: 1024px)";

function progressFor(active: number) {
  if (active <= 0) return 0;
  if (active === 1) return 0.08;
  if (active === 2) return 1 / 3;
  if (active === 3) return 2 / 3;
  return 1;
}

export function EventsProcessTrack({ steps }: { steps: Step[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [line, setLine] = useState<LineBox | null>(null);

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const dots = [...wrap.querySelectorAll<HTMLElement>(".ev-step-index")];
    if (dots.length < 2) return;
    const box = wrap.getBoundingClientRect();
    const first = dots[0].getBoundingClientRect();
    const last = dots[dots.length - 1].getBoundingClientRect();
    const x1 = first.left + first.width / 2 - box.left;
    const y1 = first.top + first.height / 2 - box.top;
    const x2 = last.left + last.width / 2 - box.left;
    const y2 = last.top + last.height / 2 - box.top;
    const vertical = Math.abs(y2 - y1) > Math.abs(x2 - x1);
    setLine(
      vertical
        ? { vertical: true, x: x1, y: y1, length: Math.max(0, y2 - y1) }
        : { vertical: false, x: x1, y: y1, length: Math.max(0, x2 - x1) },
    );
  }, []);

  useLayoutEffect(() => {
    measure();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const desktop = window.matchMedia(desktopQuery);
    const items = [...wrap.querySelectorAll<HTMLElement>(".ev-step")];
    const ratios = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        if (desktop.matches) return;
        for (const entry of entries) ratios.set(entry.target, entry.intersectionRatio);
        let best = -1;
        let bestRatio = 0.5;
        items.forEach((item, index) => {
          const ratio = ratios.get(item) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = index;
          }
        });
        setActive(best < 0 ? 0 : best + 1);
      },
      { threshold: [0.35, 0.55, 0.75] },
    );

    const connect = () => {
      observer.disconnect();
      if (desktop.matches) {
        setActive(0);
        return;
      }
      items.forEach((item) => observer.observe(item));
    };

    connect();
    desktop.addEventListener("change", connect);
    return () => {
      observer.disconnect();
      desktop.removeEventListener("change", connect);
    };
  }, []);

  function activate(index: number) {
    if (window.matchMedia(desktopQuery).matches) setActive(index);
  }

  return (
    <div
      className="ev-steps-wrap"
      ref={wrapRef}
      onMouseLeave={() => activate(0)}
    >
      <div
        className="ev-steps-line"
        aria-hidden="true"
        data-vertical={line ? String(line.vertical) : undefined}
        style={
          line
            ? line.vertical
              ? { top: line.y, left: line.x, height: line.length, width: 1, right: "auto", bottom: "auto" }
              : { top: line.y, left: line.x, width: line.length, height: 1, right: "auto", bottom: "auto" }
            : undefined
        }
      >
        <span style={{ ["--ev-line" as string]: String(progressFor(active)) }} />
      </div>
      <ol className="ev-steps">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={`ev-step${index < active ? " is-reached" : ""}`}
            onMouseEnter={() => activate(index + 1)}
          >
            <span className="ev-step-index">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="type-h4">{step.title}</h3>
            <p className="type-body text-text-muted-on-light">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
