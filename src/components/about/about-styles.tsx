const css = `
.about-page {
  overflow-x: clip;
  background: var(--color-ivory);
}

.about-hero {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #07080b;
  color: var(--color-ivory);
}
.about-hero-media {
  position: relative;
  z-index: 0;
  order: 1;
  width: 100%;
  aspect-ratio: var(--about-hero-ratio, 16 / 9);
}
.about-hero-image {
  object-fit: cover;
  object-position: center center;
}
.about-hero-content {
  position: relative;
  z-index: 1;
  order: 2;
  padding-top: 1.75rem;
  padding-bottom: 2.75rem;
}
.about-hero-copy { max-width: 38rem; }
.about-hero-title {
  margin-top: 0.85rem;
  font-size: clamp(2.15rem, 1.15rem + 4vw, 4.35rem);
  line-height: 1.04;
  text-wrap: balance;
}
.about-hero-lead {
  margin-top: 1.15rem;
  max-width: 36rem;
  color: var(--color-ivory);
}
.about-hero-rise { animation: about-rise 0.8s var(--ease-standard) both; }
.about-hero-copy .about-hero-rise:nth-child(1) { animation-delay: 0.04s; }
.about-hero-copy .about-hero-rise:nth-child(2) { animation-delay: 0.12s; }
.about-hero-copy .about-hero-rise:nth-child(3) { animation-delay: 0.2s; }
.about-hero-copy .about-hero-rise:nth-child(4) { animation-delay: 0.28s; }

.about-link {
  display: inline-flex;
  max-width: 100%;
  min-height: 2.75rem;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.35rem;
  color: var(--color-gold-ink);
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.01em;
  text-decoration: underline;
  text-decoration-color: rgb(92 67 20 / 0.45);
  text-underline-offset: 0.28em;
  transition: color var(--duration-fast) var(--ease-standard), text-decoration-color var(--duration-fast) var(--ease-standard);
}
.about-link-dark {
  color: var(--color-brand-gold);
  text-decoration-color: rgb(198 166 107 / 0.55);
}
.about-link-hero {
  margin-top: 1.5rem;
  color: var(--color-ivory);
  font-size: var(--text-button);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration-color: var(--color-brand-gold);
}
.about-link:hover {
  color: var(--color-brand-red);
  text-decoration-color: currentColor;
}
.about-link-dark:hover,
.about-link-hero:hover {
  color: var(--color-brand-gold);
}
.about-link-arrow {
  width: 1rem;
  height: 1rem;
  flex: none;
  transition: transform var(--duration-base) var(--ease-standard);
}

.about-story-title,
.about-davide-title,
.about-staff-title {
  margin-top: 0.85rem;
  text-wrap: balance;
}
.about-story-intro {
  margin-top: 1.35rem;
  max-width: 38rem;
  color: var(--color-text-on-light);
}
.about-story-grid,
.about-davide-grid {
  display: grid;
  gap: 2.25rem;
}
.about-story-aside {
  min-width: 0;
  padding-top: 0.25rem;
}
.about-prose {
  display: grid;
  gap: 1rem;
}
.about-prose p { color: var(--color-text-muted-on-light); }
.about-prose-dark p { color: var(--color-text-muted-on-dark); }
.about-frame {
  position: relative;
  overflow: hidden;
  margin: 0;
  background: var(--color-graphite);
}
.about-story-frame {
  aspect-ratio: 4 / 3;
  margin-top: 1.75rem;
}
.about-frame-image {
  object-fit: cover;
  object-position: center center;
}
.about-marks,
.about-qualities {
  display: grid;
  gap: 0;
  margin: 2.75rem 0 0;
  padding: 0;
  list-style: none;
}
.about-marks li,
.about-qualities li {
  min-width: 0;
  padding-block: 1.1rem;
  border-top: 1px solid rgb(92 67 20 / 0.35);
}
.about-mark-lead {
  margin: 0;
  color: var(--color-midnight);
  text-wrap: balance;
}
.about-mark-year {
  font-family: var(--font-display);
  font-size: clamp(2rem, 1.4rem + 1.1vw, 2.75rem);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.03em;
}
.about-mark-label {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.about-mark-note,
.about-quality-body {
  margin: 0.4rem 0 0;
  color: var(--color-text-muted-on-light);
  font-size: 0.9375rem;
  line-height: 1.5;
}
.about-marks-dark { margin-top: 1.75rem; }
.about-marks-dark li { border-top-color: rgb(198 166 107 / 0.4); }
.about-marks-dark .about-mark-lead { color: var(--color-brand-gold); }
.about-marks-dark .about-mark-note { color: var(--color-text-muted-on-dark); }

.about-davide-intro,
.about-davide-rest { min-width: 0; }
.about-portrait { aspect-ratio: 4 / 5; max-width: 28rem; background: #16181c; }
.about-davide-rest .about-prose { margin-top: 0; }
.about-portrait-image { object-position: 74% 22%; }
.about-davide-subtitle {
  margin-top: 1rem;
  max-width: 36rem;
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 1.05rem + 0.45vw, 1.55rem);
  font-style: italic;
  font-weight: 500;
  line-height: 1.35;
  color: var(--color-ivory);
}
.about-davide-intro .about-davide-subtitle { margin-top: 0.85rem; }

.about-staff { background: var(--color-surface-light); color: var(--color-text-on-light); }
.about-staff-body { padding-top: var(--spacing-section); }
.about-staff-intro { max-width: 46rem; }
.about-staff-prose { margin-top: 1.35rem; max-width: 42rem; }
.about-gallery {
  display: grid;
  gap: 0.75rem;
  margin: 2.5rem 0 0;
  padding: 0;
  list-style: none;
}
.about-shot-lead { aspect-ratio: 4 / 3; }
.about-shot-side { aspect-ratio: 3 / 4; }
.about-shot-image-group { object-position: center 42%; }
.about-shot-image-croupier { object-position: center 28%; }
.about-shot-image-guests { object-position: center 32%; }
.about-qualities { margin-top: 2.25rem; }
.about-quality-title {
  margin: 0;
  color: var(--color-gold-ink);
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.about-staff-link { margin-top: 0.5rem; padding-bottom: clamp(2rem, 1rem + 2vw, 3.25rem); }
.about-close {
  border-top: 1px solid rgb(198 166 107 / 0.55);
  background: var(--color-surface-muted);
  padding-block: clamp(2.25rem, 1.4rem + 2vw, 3.75rem);
}
.about-close-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
}
.about-close-title { text-wrap: balance; }
.about-close-body {
  margin-top: 0.7rem;
  max-width: 36rem;
  color: var(--color-text-muted-on-light);
}

.about-italy {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #07080b;
  color: var(--color-ivory);
}
.about-italy-media {
  position: relative;
  z-index: 0;
  order: 1;
  width: 100%;
  aspect-ratio: var(--about-italy-ratio, 16 / 9);
}
.about-italy-image {
  object-fit: cover;
  object-position: center center;
}
.about-italy-content {
  position: relative;
  z-index: 1;
  order: 2;
  padding-top: 1.75rem;
  padding-bottom: 2.75rem;
}
.about-italy-copy { max-width: 38rem; }
.about-italy-title {
  margin-top: 0.85rem;
  max-width: 15rem;
  font-size: clamp(2.05rem, 1.15rem + 1.8vw, 3.15rem);
  line-height: 1.08;
  text-wrap: balance;
}
.about-italy-title-lead,
.about-italy-title-accent { display: block; }
.about-italy-title-accent { color: var(--color-brand-gold); }
.about-italy-prose {
  display: grid;
  gap: 1rem;
  margin-top: 1.35rem;
  max-width: 36rem;
}
.about-italy-prose p { margin: 0; color: var(--color-text-muted-on-dark); }
.about-italy-logo-frame {
  position: relative;
  width: min(100%, 17.5rem);
  margin-top: 1.75rem;
}
.about-italy-logo { object-fit: contain; object-position: left center; }
.about-italy-wordmark {
  margin: 1.75rem 0 0;
  max-width: 18rem;
  color: var(--color-ivory);
  font-family: var(--font-display);
  font-size: clamp(2rem, 1.4rem + 1.4vw, 2.75rem);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: 0.01em;
}
.about-italy-cta {
  display: inline-flex;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  margin-top: 1.75rem;
  padding: 0.9rem 1.35rem;
  border: 1px solid var(--color-brand-gold);
  background: transparent;
  color: var(--color-brand-gold);
  text-align: center;
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard);
}
.about-italy-cta:hover {
  background: var(--color-brand-gold);
  color: var(--color-midnight);
}
.about-italy-cta-arrow {
  width: 1rem;
  height: 1rem;
  flex: none;
}

@keyframes about-rise {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}

@media (min-width: 768px) {
  .about-story-grid {
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
    gap: 3rem;
    align-items: start;
  }
  .about-story-aside {
    border-left: 1px solid rgb(198 166 107 / 0.7);
    padding-left: 2.25rem;
  }
  .about-marks,
  .about-qualities {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .about-marks li,
  .about-qualities li {
    padding: 0.15rem 1.5rem 0;
    border-top: 0;
    border-left: 1px solid rgb(92 67 20 / 0.35);
  }
  .about-marks li:first-child,
  .about-qualities li:first-child {
    padding-left: 0;
    border-left: 0;
  }
  .about-mark-lead { display: flex; min-height: 2.75rem; align-items: flex-end; }
  .about-marks-dark li { border-left-color: rgb(198 166 107 / 0.4); }
  .about-gallery {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.9fr);
    grid-template-rows: 1fr 1fr;
    height: clamp(30rem, 46vw, 40rem);
    gap: 0.85rem;
  }
  .about-gallery-lead { grid-row: span 2; }
  .about-shot-lead,
  .about-shot-side { height: 100%; aspect-ratio: auto; }
  .about-close-inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }
  .about-close-copy { max-width: 40rem; }
}

@media (min-width: 1024px) {
  .about-hero-media {
    position: absolute;
    inset: 0;
    order: 0;
    height: 100%;
    aspect-ratio: auto;
  }
  .about-hero-image { object-position: center 38%; }
  .about-italy-media {
    position: absolute;
    inset: 0;
    order: 0;
    height: 100%;
    aspect-ratio: auto;
  }
  .about-italy-image { object-position: center 36%; }
  .about-italy-content {
    order: 0;
    display: flex;
    align-items: center;
    min-height: clamp(40.625rem, 70vh, 46.875rem);
    padding-top: 3.75rem;
    padding-bottom: 3.75rem;
  }
  .about-italy-copy { max-width: 22rem; }
  .about-italy-title { max-width: 16.5rem; }
  .about-italy-prose { max-width: 20rem; }
  .about-italy-logo-frame { width: min(100%, 22.5rem); }
  .about-hero-content {
    order: 0;
    display: flex;
    align-items: center;
    min-height: clamp(38.75rem, 62vh, 43.75rem);
    padding-top: 3.75rem;
    padding-bottom: 3.75rem;
  }
  .about-hero-copy { max-width: 26rem; }
  .about-hero-lead { max-width: 19rem; }
  .about-davide-grid {
    grid-template-columns: minmax(0, 24rem) minmax(0, 1fr);
    grid-template-areas: "portrait intro" "portrait rest";
    gap: 1.25rem 4.5rem;
    align-items: start;
  }
  .about-portrait { grid-area: portrait; max-width: none; align-self: start; }
  .about-davide-intro { grid-area: intro; }
  .about-davide-rest { grid-area: rest; }
  .about-story-grid { gap: 4rem; }
}

@media (min-width: 1280px) {
  .about-hero-copy { max-width: 34rem; }
  .about-hero-lead { max-width: 28rem; }
  .about-italy-copy { max-width: 26rem; }
  .about-italy-title { max-width: 17rem; }
  .about-italy-prose { max-width: 24rem; }
  .about-davide-grid {
    grid-template-columns: minmax(0, 26rem) minmax(0, 1fr);
    gap: 1.25rem 5.5rem;
  }
}

@media (min-width: 1440px) {
  .about-hero-copy { max-width: 38rem; }
  .about-hero-lead { max-width: 34rem; }
  .about-italy-copy { max-width: 30rem; }
  .about-italy-title { max-width: 17.5rem; }
  .about-italy-prose { max-width: 26rem; }
}

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .about-link:hover .about-link-arrow { transform: translateX(4px); }
  .about-story-frame .about-frame-image,
  .about-shot .about-frame-image {
    transition: transform 700ms var(--ease-standard);
  }
  .about-story-frame:hover .about-frame-image,
  .about-shot:hover .about-frame-image {
    transform: scale(1.03);
  }
}

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .about-rise {
      animation: about-rise 0.85s var(--ease-standard) both;
      animation-timeline: view();
      animation-range: entry 0% entry 34%;
    }
  }
}

@media (max-width: 767px) {
  .about-hero-media { aspect-ratio: 4 / 5; }
  .about-hero-image { object-position: right center; }
}

@media (prefers-reduced-motion: reduce) {
  .about-hero-rise,
  .about-rise,
  .about-frame-image,
  .about-link-arrow,
  .about-italy-cta,
  .about-italy-image {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
`;

export function AboutStyles() {
  return <style>{css}</style>;
}
