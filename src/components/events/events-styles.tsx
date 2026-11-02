const css = `
.ev-page {
  overflow-x: clip;
}
.ev-gold-rule {
  display: block;
  width: 2.5rem;
  height: 1px;
  margin-top: 0.9rem;
  background: var(--color-brand-gold);
}
.ev-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex: none;
}
.ev-frame {
  position: relative;
  overflow: hidden;
  background: var(--color-graphite);
}
.ev-frame-image {
  object-fit: cover;
  transition: transform 700ms var(--ease-standard);
}
.ev-zoom:hover .ev-frame-image,
.ev-zoom:focus-visible .ev-frame-image {
  transform: scale(1.05);
}
.ev-button-light {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid rgb(245 242 235 / 0.45);
  border-radius: var(--radius-sm);
  background: transparent;
  padding-inline: 1.25rem;
  color: var(--color-ivory);
  font-family: var(--font-sans);
  font-size: var(--text-button);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition:
    border-color var(--duration-fast) var(--ease-standard),
    background-color var(--duration-fast) var(--ease-standard),
    transform var(--duration-fast) var(--ease-standard);
}
.ev-button-light:hover {
  border-color: var(--color-ivory);
  background: rgb(245 242 235 / 0.1);
  transform: translateY(-1px);
}
.ev-page a.bg-brand-red {
  transition:
    background-color var(--duration-fast) var(--ease-standard),
    transform var(--duration-fast) var(--ease-standard);
}
.ev-page a.bg-brand-red:hover {
  transform: translateY(-1px);
}

.ev-hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  min-height: 34rem;
  background: #07080b;
  color: var(--color-text-on-dark);
}
.ev-hero-media,
.ev-hero-scrim {
  position: absolute;
  inset: 0;
}
.ev-hero-image {
  object-fit: cover;
  object-position: 20% center;
}
.ev-hero-scrim {
  background: linear-gradient(
    90deg,
    rgb(6 6 8 / 0.62) 0%,
    rgb(6 6 8 / 0.34) 42%,
    rgb(6 6 8 / 0.08) 68%,
    transparent 82%
  );
}
.ev-hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  min-height: 34rem;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding-top: 2.75rem;
  padding-bottom: 1.5rem;
}
.ev-hero-copy {
  max-width: 38rem;
}
.ev-hero-title {
  margin-top: 1rem;
  font-size: clamp(2.3rem, 1.25rem + 2.5vw, 4rem);
  line-height: 1.02;
  text-wrap: balance;
}
.ev-hero-support {
  margin-top: 1.25rem;
  max-width: 36rem;
  color: var(--color-ivory);
}
.ev-hero-lead {
  margin-top: 0.85rem;
  max-width: 36rem;
  color: var(--color-text-muted-on-dark);
}
.ev-hero-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
.ev-highlights {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem 1rem;
  margin: 0;
  padding: 1rem 0 0;
  list-style: none;
  border-top: 1px solid rgb(198 166 107 / 0.45);
}
.ev-highlight {
  display: flex;
  min-width: 0;
  align-items: flex-start;
  gap: 0.55rem;
  color: var(--color-brand-gold);
}
.ev-highlight span {
  color: var(--color-ivory);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.ev-rise {
  animation: ev-rise 0.85s var(--ease-standard) both;
}
.ev-hero-copy .ev-rise:nth-child(1) { animation-delay: 0.04s; }
.ev-hero-copy .ev-rise:nth-child(2) { animation-delay: 0.12s; }
.ev-hero-copy .ev-rise:nth-child(3) { animation-delay: 0.2s; }
.ev-hero-copy .ev-rise:nth-child(4) { animation-delay: 0.28s; }
.ev-hero-copy .ev-rise:nth-child(5) { animation-delay: 0.36s; }
.ev-highlights.ev-rise { animation-delay: 0.44s; }
@keyframes ev-rise {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}
@keyframes ev-drift {
  from { transform: scale(1); }
  to { transform: scale(1.045); }
}

.ev-occasions {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}
.ev-occasions-media,
.ev-occasions-veil {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.ev-occasions-image {
  object-fit: cover;
  object-position: center;
}
.ev-occasions-veil {
  background: rgb(245 242 235 / 0.32);
}
.ev-occasions-content {
  position: relative;
  z-index: 1;
}
.ev-card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 2.25rem;
  list-style: none;
  padding: 0;
}
.ev-card-grid > li {
  display: flex;
  min-width: 0;
}
.ev-card .ev-frame {
  position: absolute;
  inset: 0;
}
.ev-card {
  position: relative;
  display: flex;
  width: 100%;
  min-height: 18rem;
  aspect-ratio: 5 / 4;
  overflow: hidden;
  border-radius: 2px;
  color: var(--color-ivory);
  box-shadow: 0 12px 30px rgb(16 17 20 / 0.08);
  transition:
    translate 420ms var(--ease-standard),
    box-shadow 420ms var(--ease-standard);
}
.ev-card .ev-frame-image {
  transition: transform 420ms var(--ease-standard);
}
.ev-card-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgb(8 8 10 / 0.88) 0%,
    rgb(8 8 10 / 0.46) 42%,
    rgb(8 8 10 / 0.1) 68%,
    transparent 100%
  );
  transition: background 420ms var(--ease-standard);
}
.ev-card-index,
.ev-card-copy {
  position: relative;
  z-index: 1;
}
.ev-card-index {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 1rem 1.1rem;
  color: var(--color-ivory);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
}
.ev-card-slash,
.ev-card-total {
  color: var(--color-brand-gold);
}
.ev-card-tick {
  display: block;
  width: 1.75rem;
  height: 1px;
  background: var(--color-brand-gold);
}
.ev-card-copy {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.45rem;
  width: 100%;
  margin-top: auto;
  padding: 1.15rem 1.15rem 1.2rem;
}
.ev-card-copy h3 {
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 1.2rem + 0.6vw, 1.9rem);
  font-weight: 500;
  line-height: 1.15;
}
.ev-card-copy p {
  max-width: 28rem;
  color: rgb(245 242 235 / 0.92);
  font-size: 0.9375rem;
  line-height: 1.45;
}
.ev-card-more {
  display: inline-flex;
  flex-direction: column;
  align-self: flex-start;
  margin-top: 0.35rem;
  color: var(--color-brand-gold);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.ev-card-more-label {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.ev-card-arrow {
  width: 0.85rem;
  height: 0.85rem;
  flex: none;
  transition: transform 420ms var(--ease-standard);
}
.ev-card-line {
  display: block;
  width: 2rem;
  height: 1px;
  margin-top: 0.4rem;
  background: var(--color-brand-gold);
  transition: width 420ms var(--ease-standard);
}
.ev-card:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 3px;
  animation: none;
  translate: 0 -4px;
  box-shadow:
    0 18px 36px rgb(16 17 20 / 0.14),
    inset 0 0 0 1px rgb(198 166 107 / 0.55);
}
.ev-card:focus-visible .ev-frame-image {
  transform: scale(1.04);
}
.ev-card:focus-visible .ev-card-shade {
  background: linear-gradient(
    to top,
    rgb(8 8 10 / 0.94) 0%,
    rgb(8 8 10 / 0.58) 46%,
    rgb(8 8 10 / 0.16) 72%,
    transparent 100%
  );
}
.ev-card:focus-visible .ev-card-line {
  width: 100%;
}
.ev-card:focus-visible .ev-card-arrow {
  transform: translateX(0.25rem);
}
@media (hover: hover) and (pointer: fine) {
  .ev-card:hover {
    animation: none;
    translate: 0 -4px;
    box-shadow:
      0 18px 36px rgb(16 17 20 / 0.14),
      inset 0 0 0 1px rgb(198 166 107 / 0.45);
  }
  .ev-card:hover .ev-frame-image {
    transform: scale(1.04);
  }
  .ev-card:hover .ev-card-shade {
    background: linear-gradient(
      to top,
      rgb(8 8 10 / 0.94) 0%,
      rgb(8 8 10 / 0.58) 46%,
      rgb(8 8 10 / 0.16) 72%,
      transparent 100%
    );
  }
  .ev-card:hover .ev-card-line {
    width: 100%;
  }
  .ev-card:hover .ev-card-arrow {
    transform: translateX(0.25rem);
  }
}
@media (max-width: 767px) {
  .ev-occasions-image { object-position: center 40%; }
  .ev-occasions-veil { background: rgb(245 242 235 / 0.58); }
}

.ev-corporate {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}
.ev-corporate-media {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.ev-corporate-image {
  object-fit: cover;
  object-position: center;
}
.ev-corporate-content {
  position: relative;
  z-index: 1;
}
.ev-corporate .ev-check-label {
  position: relative;
  display: inline-block;
  transition: transform 300ms var(--ease-standard);
}
.ev-corporate .ev-check-line {
  position: absolute;
  right: 0;
  bottom: -0.28rem;
  left: 0;
  height: 1px;
  background: var(--color-brand-gold);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 300ms var(--ease-standard);
}
.ev-corporate .ev-check-list .ev-icon {
  transition:
    transform 300ms var(--ease-standard),
    color 300ms var(--ease-standard),
    filter 300ms var(--ease-standard);
}
@media (hover: hover) and (pointer: fine) {
  .ev-corporate .ev-check-list li:hover .ev-icon {
    transform: translateX(5px);
    color: #f0d7a2;
    filter: brightness(1.18);
  }
  .ev-corporate .ev-check-list li:hover .ev-check-label {
    transform: translateX(4px);
  }
  .ev-corporate .ev-check-list li:hover .ev-check-line {
    transform: scaleX(1);
  }
}
@media (max-width: 767px) {
  .ev-corporate-image { object-position: 64% center; }
}

.ev-split {
  display: grid;
  gap: 1.75rem;
  align-items: center;
}
.ev-check-list {
  display: grid;
  gap: 0.85rem;
  margin-top: 1.5rem;
  padding: 0;
  list-style: none;
}
.ev-check-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
}
.ev-check-list .ev-icon {
  margin-top: 0.15rem;
  color: var(--color-brand-gold);
}
.ev-note {
  margin-top: 1.25rem;
  border-left: 1px solid var(--color-brand-gold);
  padding-left: 0.9rem;
}
.ev-pair {
  display: grid;
  gap: 3.5rem;
}
.ev-editorial {
  display: grid;
  gap: 1.35rem;
  align-items: center;
}

.ev-steps-wrap {
  position: relative;
}
.ev-steps {
  position: relative;
  display: grid;
  gap: 1.35rem;
  margin: 2.25rem 0 0;
  padding: 0;
  list-style: none;
}
.ev-steps-line {
  position: absolute;
  top: 0.35rem;
  bottom: 0.35rem;
  left: 1.05rem;
  width: 1px;
  background: rgb(92 67 20 / 0.28);
}
.ev-steps-line span {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--color-brand-gold);
  transform: scaleY(var(--ev-line, 0));
  transform-origin: top center;
  transition: transform 420ms var(--ease-standard);
}
.ev-steps-line[data-vertical="false"] span {
  transform: scaleX(var(--ev-line, 0));
  transform-origin: left center;
}
.ev-step.is-reached .ev-step-index {
  border-color: var(--color-brand-gold);
  background: var(--color-brand-gold);
  color: #1a1408;
}
.ev-step-index {
  position: relative;
  z-index: 1;
  display: grid;
  width: 2.15rem;
  height: 2.15rem;
  place-items: center;
  border: 1px solid var(--color-brand-gold);
  background: var(--color-surface-muted);
  color: var(--color-gold-ink);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
}
.ev-step {
  display: grid;
  grid-template-columns: 2.15rem minmax(0, 1fr);
  gap: 0.85rem 0.9rem;
}
.ev-step h3,
.ev-step p {
  grid-column: 2;
}
.ev-step h3 { margin-top: 0.35rem; }
.ev-step p { margin-top: 0.35rem; }

.ev-benefits {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  min-height: 36rem;
  background: #07080b;
  color: var(--color-text-on-dark);
}
.ev-benefits-media,
.ev-benefits-scrim {
  position: absolute;
  inset: 0;
}
.ev-benefits-image {
  object-fit: cover;
  object-position: 72% center;
}
.ev-benefits-scrim {
  background: linear-gradient(
    180deg,
    rgb(6 6 8 / 0.28) 0%,
    rgb(6 6 8 / 0.18) 42%,
    rgb(6 6 8 / 0.55) 100%
  );
}
.ev-benefit-grid {
  display: grid;
  gap: 0.8rem;
  margin-top: 1.75rem;
  padding: 0;
  list-style: none;
}
.ev-benefit {
  border: 1px solid rgb(198 166 107 / 0.38);
  background: rgb(10 10 12 / 0.4);
  padding: 1.1rem 1.15rem 1.2rem;
  transition:
    translate 400ms var(--ease-standard),
    border-color 400ms var(--ease-standard),
    background-color 400ms var(--ease-standard);
}
.ev-benefit .ev-icon {
  color: var(--color-brand-gold);
}
.ev-benefit:hover,
.ev-benefit:focus-within {
  translate: 0 -4px;
  border-color: rgb(198 166 107 / 0.85);
  background: rgb(10 10 12 / 0.52);
}
.ev-benefit-rule {
  display: block;
  width: 1.75rem;
  height: 1px;
  margin: 0.8rem 0 0.85rem;
  background: var(--color-brand-gold);
  transition: width 400ms var(--ease-standard);
}
.ev-benefit:hover .ev-benefit-rule,
.ev-benefit:focus-within .ev-benefit-rule {
  width: 3.25rem;
}

.ev-gallery-nav {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.25rem;
}
.ev-gallery-nav button {
  display: inline-flex;
  min-width: 2.75rem;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(16 17 20 / 0.2);
  background: transparent;
  color: var(--color-midnight);
}
.ev-gallery-nav button:hover {
  border-color: var(--color-gold-ink);
  color: var(--color-gold-ink);
}
.ev-gallery-track {
  display: flex;
  gap: 0.75rem;
  margin: 1.25rem 0 0;
  padding: 0 0 0.25rem;
  overflow-x: auto;
  list-style: none;
  scroll-snap-type: x mandatory;
  scrollbar-color: rgb(198 166 107 / 0.8) transparent;
}
.ev-gallery-track > li {
  flex: 0 0 84%;
  scroll-snap-align: start;
}
.ev-shot {
  position: relative;
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--color-graphite);
}
.ev-shot img {
  object-fit: cover;
  transition: transform 700ms var(--ease-standard);
}
.ev-shot:hover img,
.ev-shot:focus-visible img {
  transform: scale(1.05);
}
.ev-closing {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  overflow: hidden;
  min-height: 26rem;
  background: #07080b;
  color: var(--color-text-on-dark);
}
.ev-closing-media,
.ev-closing-scrim {
  position: absolute;
  inset: 0;
}
.ev-closing-image {
  object-fit: cover;
  object-position: 70% center;
}
.ev-closing-scrim {
  background: linear-gradient(
    90deg,
    rgb(6 6 8 / 0.5) 0%,
    rgb(6 6 8 / 0.22) 46%,
    transparent 72%
  );
}
.ev-closing-copy {
  position: relative;
  z-index: 1;
  max-width: 34rem;
  padding-top: 3.25rem;
  padding-bottom: 3.25rem;
}

@media (min-width: 430px) {
  .ev-hero { min-height: 36rem; }
  .ev-hero-content { min-height: 36rem; }
}
@media (min-width: 640px) {
  .ev-hero-actions { flex-direction: row; flex-wrap: wrap; }
  .ev-card-grid { grid-template-columns: 1fr 1fr; gap: 1.15rem; }
  .ev-card { aspect-ratio: 4 / 5; }
  .ev-card-copy h3 {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 2.3em;
  }
  .ev-card-copy p { min-height: calc(1.45em * 3); }
  .ev-benefit-grid { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 768px) {
  .ev-hero { min-height: 42rem; }
  .ev-hero-content { min-height: 42rem; padding-top: 3.5rem; padding-bottom: 2rem; }
  .ev-hero-image { object-position: center center; }
  .ev-editorial { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 2.5rem; }
  .ev-editorial-reverse .ev-editorial-copy { order: 2; }
  .ev-gallery-nav { display: none; }
  .ev-gallery-track {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    overflow: visible;
  }
  .ev-gallery-track > li { flex: none; }
}
@media (min-width: 1024px) {
  .ev-hero {
    min-height: calc(100svh - 5.25rem);
    max-height: 56rem;
  }
  .ev-hero-content {
    min-height: calc(100svh - 5.25rem);
    max-height: 56rem;
    justify-content: center;
    gap: 2.5rem;
    padding-top: 3rem;
    padding-bottom: 2.25rem;
  }
  .ev-hero-scrim {
    background: linear-gradient(90deg, rgb(6 6 8 / 0.22) 0%, transparent 46%);
  }
  .ev-hero-copy { max-width: 34rem; }
  .ev-highlights { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .ev-split { grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr); gap: 3.5rem; }
  .ev-split-reverse .ev-split-copy { order: 2; }
  .ev-media-tall { aspect-ratio: 3 / 4; min-height: 32rem; }
  .ev-steps {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.5rem;
  }
  .ev-steps-line {
    top: 1.05rem;
    right: 1rem;
    bottom: auto;
    left: 1rem;
    width: auto;
    height: 1px;
  }
  .ev-step-index { justify-self: center; }
  .ev-step {
    grid-template-columns: 1fr;
    align-content: start;
  }
  .ev-step h3,
  .ev-step p { grid-column: auto; }
  .ev-benefit-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 2.5rem; }
  .ev-benefits { min-height: 44rem; }
  .ev-closing { min-height: 32rem; }
  .ev-closing-copy { padding-top: 5.5rem; padding-bottom: 5.5rem; }
}
@media (min-width: 1200px) {
  .ev-card-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 2.75rem; }
  .ev-card { aspect-ratio: 3 / 4; min-height: 0; }
}
@media (min-width: 1280px) {
  .ev-hero-copy { max-width: 36rem; }
  .ev-pair { gap: 5rem; }
}
@media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
  .ev-hero-image {
    animation: ev-drift 32s ease-in-out infinite alternate;
  }
}
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .ev-card {
      animation: ev-card-in linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 34%;
    }
    .ev-card:nth-child(2) { animation-range: entry 8% entry 42%; }
    .ev-card:nth-child(3) { animation-range: entry 14% entry 48%; }
    .ev-card:nth-child(4) { animation-range: entry 20% entry 54%; }
    .ev-step {
      animation: ev-step-in linear both;
      animation-timeline: view();
      animation-range: entry 12% entry 42%;
    }
  }
}
@keyframes ev-card-in {
  from { translate: 0 16px; }
  to { translate: 0 0; }
}
@keyframes ev-fill-y {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}
@keyframes ev-fill-x {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@keyframes ev-step-in {
  from { translate: 0 10px; }
  to { translate: 0 0; }
}
@media (max-width: 1023px) {
  .ev-media-tall { aspect-ratio: 16 / 10; }
  .ev-media-wide { aspect-ratio: 16 / 10; }
}
@media (min-width: 1024px) {
  .ev-media-wide { aspect-ratio: 4 / 3; }
}
@media (prefers-reduced-motion: reduce) {
  .ev-rise,
  .ev-card,
  .ev-step,
  .ev-hero-image {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    translate: none !important;
  }
  .ev-steps-line span {
    animation: none !important;
  }
  .ev-card:hover,
  .ev-card:focus-visible,
  .ev-benefit:hover,
  .ev-benefit:focus-within,
  .ev-button-light:hover,
  .ev-page a.bg-brand-red:hover,
  .ev-card:hover .ev-frame-image,
  .ev-card:focus-visible .ev-frame-image,
  .ev-card:hover .ev-card-arrow,
  .ev-card:focus-visible .ev-card-arrow,
  .ev-zoom:hover .ev-frame-image,
  .ev-zoom:focus-visible .ev-frame-image,
  .ev-shot:hover img,
  .ev-shot:focus-visible img,
  .ev-corporate .ev-check-list li:hover .ev-icon,
  .ev-corporate .ev-check-list li:hover .ev-check-label,
  .ev-corporate .ev-check-list li:hover .ev-check-line {
    transform: none;
    translate: none;
    filter: none;
  }
}

.ev-mosaic {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 3px;
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
}
.ev-mosaic > li { min-width: 0; }
.ev-tile-scene {
  aspect-ratio: 1 / 1;
  perspective: 1200px;
  -webkit-perspective: 1200px;
}
.ev-tile-inner {
  position: relative;
  height: 100%;
  transform: rotateY(0deg);
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
}
.ev-tile.is-open .ev-tile-inner { transform: rotateY(180deg); }
.ev-tile.has-flipped.is-open .ev-tile-inner { animation: ev-flip-open 600ms linear both; }
.ev-tile.has-flipped:not(.is-open) .ev-tile-inner { animation: ev-flip-close 600ms linear both; }
.ev-tile-face {
  position: absolute;
  inset: 0;
  display: grid;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.ev-tile-front { transform: rotateY(0deg); }
.ev-tile:not(.is-open) .ev-tile-back,
.ev-tile.is-open .ev-tile-front { visibility: hidden; }
.ev-tile.has-flipped.is-open .ev-tile-front { animation: ev-face-hide 600ms linear both; }
.ev-tile.has-flipped.is-open .ev-tile-back { animation: ev-face-show 600ms linear both; }
.ev-tile.has-flipped:not(.is-open) .ev-tile-front { animation: ev-face-show 600ms linear both; }
.ev-tile.has-flipped:not(.is-open) .ev-tile-back { animation: ev-face-hide 600ms linear both; }
@keyframes ev-flip-open {
  0% { transform: rotateY(0deg); animation-timing-function: cubic-bezier(0.45, 0.05, 0.85, 0.4); }
  50% { transform: rotateY(90deg); animation-timing-function: cubic-bezier(0.15, 0.6, 0.3, 1); }
  100% { transform: rotateY(180deg); }
}
@keyframes ev-flip-close {
  0% { transform: rotateY(180deg); animation-timing-function: cubic-bezier(0.45, 0.05, 0.85, 0.4); }
  50% { transform: rotateY(90deg); animation-timing-function: cubic-bezier(0.15, 0.6, 0.3, 1); }
  100% { transform: rotateY(0deg); }
}
@keyframes ev-face-hide {
  0%, 49.9% { visibility: visible; }
  50%, 100% { visibility: hidden; }
}
@keyframes ev-face-show {
  0%, 49.9% { visibility: hidden; }
  50%, 100% { visibility: visible; }
}
.ev-tile-front {
  grid-template-rows: auto minmax(0, 1fr) auto;
  padding: clamp(0.7rem, 1.6vw, 1.05rem);
  background:
    radial-gradient(90% 70% at 100% 0%, rgb(198 166 107 / 0.14), transparent 46%),
    linear-gradient(165deg, #1c1e22 0%, #101114 68%);
  color: var(--color-ivory);
}
.ev-mosaic > li:nth-child(3n + 2) .ev-tile-front {
  background:
    radial-gradient(80% 60% at 0% 100%, rgb(198 166 107 / 0.1), transparent 48%),
    linear-gradient(165deg, #17191d 0%, #0d0e11 70%);
}
.ev-mosaic > li:nth-child(4n) .ev-tile-front {
  background:
    linear-gradient(180deg, rgb(198 166 107 / 0.08), transparent 28%),
    linear-gradient(165deg, #14161a 0%, #101114 72%);
}
.ev-tile.has-photo .ev-tile-front { background: #101114; }
.ev-tile-media {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.ev-tile-media::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgb(8 9 12 / 0) 0%,
    rgb(8 9 12 / 0.08) 20%,
    rgb(8 9 12 / 0.3) 35%,
    rgb(8 9 12 / 0.65) 48%,
    rgb(8 9 12 / 0.9) 58%,
    rgb(8 9 12 / 0.96) 78%,
    rgb(8 9 12 / 0.99) 100%
  );
}
.ev-tile-photo {
  object-fit: cover;
  object-position: center;
  pointer-events: none;
  transition: transform 520ms cubic-bezier(0.22, 0.61, 0.36, 1);
}
.ev-tile-back {
  display: grid;
  padding: clamp(0.7rem, 1.6vw, 1.05rem);
  text-align: left;
}
.ev-tile-hit {
  position: absolute;
  inset: 0;
  z-index: 2;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.ev-tile-index,
.ev-tile-front-copy,
.ev-tile-hint {
  position: relative;
}
.ev-tile-index {
  color: var(--color-brand-gold);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.16em;
}
.ev-tile-front-copy {
  display: grid;
  align-content: end;
  gap: 0.35rem;
}
.ev-tile-front-copy h3 {
  display: flex;
  align-items: flex-start;
  min-height: 2.3em;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 0.92rem + 0.45vw, 1.45rem);
  font-weight: 500;
  line-height: 1.15;
}
.ev-tile-front-copy p {
  min-height: calc(1.35em * 3);
  margin: 0;
  color: rgb(245 242 235 / 0.82);
  font-size: clamp(0.75rem, 0.7rem + 0.15vw, 0.875rem);
  line-height: 1.35;
}
.ev-tile-hint,
.ev-tile-cta,
.ev-tile-return {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--color-brand-gold);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.ev-tile-hint { margin-top: 0.65rem; }
.ev-tile-hint svg,
.ev-tile-cta svg {
  width: 0.8rem;
  height: 0.8rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  transition: transform 300ms var(--ease-standard);
}
.ev-tile-back {
  transform: rotateY(180deg);
  grid-template-rows: auto auto minmax(0, 1fr) auto auto;
  background-color: #101114;
  background-image:
    radial-gradient(80% 50% at 0% 0%, rgb(198 166 107 / 0.16), rgb(16 17 20 / 0) 42%),
    linear-gradient(180deg, #0c0d10 0%, #1a1814 100%);
  color: var(--color-ivory);
}
.ev-tile-back .ev-tile-index,
.ev-tile-back-title,
.ev-tile-back-text,
.ev-tile-return { pointer-events: none; }
.ev-tile-back .ev-tile-index { grid-row: 1; }
.ev-tile-back-title {
  grid-row: 2;
  margin: 0.45rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.02rem, 0.9rem + 0.35vw, 1.3rem);
  font-weight: 500;
  line-height: 1.15;
}
.ev-tile-back-text {
  grid-row: 3;
  margin: 0.55rem 0 0;
  color: rgb(245 242 235 / 0.86);
  font-size: clamp(0.75rem, 0.68rem + 0.22vw, 0.9rem);
  line-height: 1.4;
}
.ev-tile-cta {
  position: relative;
  z-index: 3;
  grid-row: 4;
  align-self: end;
  justify-self: start;
  margin-top: 0.7rem;
  text-decoration: none;
}
.ev-tile-return {
  position: relative;
  grid-row: 5;
  margin-top: 0.45rem;
  letter-spacing: 0.12em;
}
@media (hover: hover) and (pointer: fine) {
  .ev-tile:not(.is-open):hover .ev-tile-front {
    box-shadow: inset 0 0 0 1px rgb(198 166 107 / 0.55);
  }
  .ev-tile:not(.is-open):hover .ev-tile-hint svg,
  .ev-tile-cta:hover svg {
    transform: translateX(3px);
  }
  .ev-tile:not(.is-open):hover .ev-tile-photo {
    transform: scale(1.035);
  }
}
.ev-tile-hit:focus-visible,
.ev-tile-return:focus-visible,
.ev-tile-cta:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: -3px;
}
@media (min-width: 640px) {
  .ev-mosaic { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 1024px) {
  .ev-mosaic { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (prefers-reduced-motion: reduce) {
  .ev-tile-inner,
  .ev-tile-front,
  .ev-tile-back {
    animation: none !important;
    transition: none;
    transform: none !important;
  }
  .ev-tile:not(.is-open) .ev-tile-back,
  .ev-tile.is-open .ev-tile-front {
    visibility: hidden !important;
  }
  .ev-tile-hint svg,
  .ev-tile-cta svg,
  .ev-tile-photo {
    transition: none;
    transform: none !important;
  }
}
@media (max-width: 390px) {
  .ev-tile-back-text { font-size: 0.75rem; line-height: 1.35; }
  .ev-tile-back-title { font-size: 1rem; }
}
@media (max-width: 767px) {
  .ev-hero {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .ev-hero-media {
    position: relative;
    inset: auto;
    width: 100%;
    aspect-ratio: 4 / 3;
  }
  .ev-hero-image { object-position: 82% 46%; }
  .ev-hero-scrim { display: none; }
  .ev-hero .ev-hero-content {
    min-height: 0;
    justify-content: flex-start;
    gap: 1.5rem;
    padding: 1.5rem 1.25rem 2rem;
  }
  .ev-hero-actions { flex-direction: column; }
  .ev-hero-actions > a { width: 100%; }
}
`;

export function EventsStyles() {
  return <style>{css}</style>;
}
