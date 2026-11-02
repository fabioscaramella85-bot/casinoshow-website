const css = `
html:has(.gx-index) {
  scroll-behavior: smooth;
}

.gx-index {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.65rem;
  margin: 2.25rem 0 0;
  padding: 0;
  list-style: none;
}

.gx-index > li {
  min-width: 0;
  display: flex;
}

.gx-card {
  position: relative;
  isolation: isolate;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgb(16 17 20 / 0.1);
  border-radius: 10px;
  background: #fcfaf6;
  padding: 0.8rem 0.9rem 0.75rem;
  color: inherit;
  text-decoration: none;
  box-shadow: inset 0 0 0 rgb(198 166 107 / 0);
  transition:
    transform 260ms var(--ease-standard),
    border-color 260ms var(--ease-standard),
    box-shadow 260ms var(--ease-standard);
}

.gx-card-kicker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.45rem;
}

.gx-card-index {
  font-family: var(--font-sans);
  font-size: 0.68rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-gold-ink);
  transition: color 260ms var(--ease-standard);
}

.gx-card-arrow {
  display: flex;
  flex: none;
  width: 0.9rem;
  height: 0.9rem;
  color: rgb(92 67 20 / 0.72);
  transition:
    transform 260ms var(--ease-standard),
    color 260ms var(--ease-standard);
}

.gx-card-arrow svg {
  display: block;
  width: 100%;
  height: 100%;
}

.gx-card-title {
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: var(--color-midnight);
  text-wrap: balance;
  transition: color 260ms var(--ease-standard);
}

.gx-card-summary {
  margin-top: 0.35rem;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.4;
  color: var(--color-text-muted-on-light);
  text-wrap: pretty;
}

.gx-card::after {
  content: "";
  position: absolute;
  right: 1rem;
  bottom: 0.42rem;
  left: 1rem;
  z-index: 1;
  height: 1px;
  background: var(--color-brand-gold);
  transform: scaleX(0);
  transform-origin: left center;
  pointer-events: none;
  transition: transform 260ms var(--ease-standard);
}

.gx-card:focus-visible {
  transform: translateY(-3px);
  border-color: var(--color-brand-gold);
  box-shadow:
    inset 0 0 28px rgb(198 166 107 / 0.16),
    0 8px 16px -14px rgb(16 17 20 / 0.38);
}

.gx-card:focus-visible::after {
  transform: scaleX(1);
}

.gx-card:focus-visible .gx-card-arrow {
  color: var(--color-brand-gold);
  transform: translate(4px, -4px);
}

.gx-card:focus-visible .gx-card-index {
  color: var(--color-midnight);
}

.gx-card:focus-visible .gx-card-title {
  color: var(--color-gold-ink);
}

@media (min-width: 640px) {
  .gx-index {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem 1rem;
  }
}

@media (min-width: 1024px) {
  .gx-index {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.875rem 1.125rem;
    margin-top: 2.5rem;
  }

  .gx-card {
    min-height: 8.5rem;
    padding: 0.9rem 1rem 0.85rem;
  }

  .gx-card-title {
    font-size: 1.1875rem;
  }
}

@media (hover: hover) and (pointer: fine) {
  .gx-card:hover {
    transform: translateY(-3px);
    border-color: var(--color-brand-gold);
    box-shadow:
      inset 0 0 28px rgb(198 166 107 / 0.16),
      0 8px 16px -14px rgb(16 17 20 / 0.38);
  }

  .gx-card:hover::after {
    transform: scaleX(1);
  }

  .gx-card:hover .gx-card-arrow {
    color: var(--color-brand-gold);
    transform: translate(4px, -4px);
  }

  .gx-card:hover .gx-card-index {
    color: var(--color-midnight);
  }

  .gx-card:hover .gx-card-title {
    color: var(--color-gold-ink);
  }

  .gx-fact:hover {
    border-top-color: var(--gx-line-hot);
    background-color: var(--gx-wash);
  }

  .gx-fact:hover .gx-fact-text {
    transform: translateX(6px);
  }

  .gx-fact:hover .gx-fact-mark {
    opacity: 1;
    transform: translateX(0);
  }
}

.gx-facts {
  --gx-line: rgb(16 17 20 / 0.1);
  --gx-line-hot: rgb(198 166 107 / 0.9);
  --gx-wash: rgb(198 166 107 / 0.09);
  display: grid;
  gap: 0.75rem;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
}

.gx-facts[data-tone="dark"] {
  --gx-line: rgb(245 242 235 / 0.15);
  --gx-line-hot: rgb(198 166 107 / 0.85);
  --gx-wash: rgb(198 166 107 / 0.1);
}

.gx-fact {
  position: relative;
  border-top: 1px solid var(--gx-line);
  padding-top: 0.75rem;
  background-color: transparent;
  color: var(--color-text-on-light);
  font-size: 0.95rem;
  line-height: 1.35;
  cursor: default;
  transition:
    background-color 250ms var(--ease-standard),
    border-color 250ms var(--ease-standard);
}

.gx-facts[data-tone="dark"] .gx-fact {
  color: rgb(245 242 235 / 0.9);
}

.gx-fact-text {
  display: block;
  padding-right: 6px;
  transition: transform 250ms var(--ease-standard);
}

.gx-fact-mark {
  position: absolute;
  top: 0.9rem;
  left: -0.8rem;
  display: flex;
  width: 0.7rem;
  height: 0.7rem;
  color: var(--color-brand-gold);
  opacity: 0;
  transform: translateX(-3px);
  pointer-events: none;
  transition:
    opacity 250ms var(--ease-standard),
    transform 250ms var(--ease-standard);
}

.gx-fact-mark svg {
  display: block;
  width: 100%;
  height: 100%;
}

@media (max-width: 639px) {
  .gx-card {
    padding: 0.7rem 0.8rem 0.65rem;
  }

  .gx-card-title {
    font-size: 1.05rem;
  }

  .gx-card-summary {
    font-size: 0.78rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gx-card,
  .gx-card:hover,
  .gx-card:focus-visible,
  .gx-card-arrow,
  .gx-card:hover .gx-card-arrow,
  .gx-card:focus-visible .gx-card-arrow,
  .gx-fact-text,
  .gx-fact:hover .gx-fact-text,
  .gx-fact-mark,
  .gx-fact:hover .gx-fact-mark {
    transform: none;
  }

  .gx-card::after {
    transform: scaleX(0);
    transition: none;
  }

  .gx-card:hover::after,
  .gx-card:focus-visible::after {
    transform: scaleX(1);
  }
}
`;

export function GamesInteractions() {
  return <style>{css}</style>;
}
