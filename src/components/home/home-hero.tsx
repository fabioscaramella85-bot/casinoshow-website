"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { routePathnames } from "@/i18n/routes";

const AUTOPLAY_MS = 7000;

const SLIDES = [
  {
    id: "experience",
    src: "/home-page/hero/foto-1.png",
    imageClassName: "object-[74%_64%] sm:object-[68%_62%] lg:object-[64%_70%]",
  },
  {
    id: "switzerland",
    src: "/home-page/hero/foto-2.png",
    imageClassName: "object-[86%_72%] sm:object-[80%_64%] lg:object-[74%_60%]",
  },
  {
    id: "staff",
  },
] as const;

const SLIDE_COUNT = SLIDES.length;

type SlideId = (typeof SLIDES)[number]["id"];

const desktopOverlay =
  "linear-gradient(90deg, rgb(5 11 9 / 0.94) 0%, rgb(6 14 11 / 0.84) 30%, rgb(7 13 11 / 0.55) 56%, rgb(8 12 11 / 0.2) 74%, rgb(8 10 10 / 0) 100%)";

const mobileOverlay =
  "linear-gradient(180deg, rgb(5 10 8 / 0.94) 0%, rgb(5 11 9 / 0.84) 34%, rgb(6 12 10 / 0.48) 68%, rgb(6 11 10 / 0.2) 100%)";

const tabletOverlay =
  "linear-gradient(90deg, rgb(5 10 8 / 0.94) 0%, rgb(6 13 10 / 0.86) 38%, rgb(7 13 11 / 0.58) 64%, rgb(8 12 11 / 0.22) 100%)";

const copyWidth = "w-full max-w-[37.5rem] xl:max-w-[42rem]";
const staffCopyWidth =
  "w-full max-w-[min(37.5rem,calc(58vw-1.5rem))] xl:max-w-[min(42rem,calc(58vw-2rem))]";

const staffOverlay =
  "linear-gradient(90deg, rgb(5 11 9 / 0.94) 0%, rgb(6 14 11 / 0.9) 46%, rgb(7 13 11 / 0.7) 76%, rgb(8 12 11 / 0.34) 100%)";

const staffMain = {
  src: "/chi-siamo/staff/staff%204.jpg",
  className: "object-[82%_42%]",
};

const staffMosaic = [
  {
    src: "/chi-siamo/staff/staff%201.jpg",
    cell: "col-start-1 row-start-1 row-span-2",
    className: "object-[center_28%]",
    sizes: "(min-width: 768px) 18vw, 40vw",
  },
  {
    src: "/chi-siamo/staff/staff%203.jpg",
    cell: "col-start-2 col-span-2 row-start-1",
    className: "object-[center_28%]",
    sizes: "(min-width: 768px) 24vw, 100vw",
  },
  {
    src: "/chi-siamo/staff/staff%205.jpg",
    cell: "col-start-2 row-start-2",
    className: "object-[center_28%]",
    sizes: "(min-width: 768px) 16vw, 40vw",
  },
  {
    src: "/chi-siamo/staff/staff%202.jpg",
    cell: "col-start-3 row-start-2",
    className: "object-[28%_40%]",
    sizes: "(min-width: 768px) 16vw, 40vw",
  },
  {
    src: "/chi-siamo/staff/staff%209.jpg",
    cell: "col-start-1 col-span-2 row-start-3",
    className: "object-[center_32%]",
    sizes: "(min-width: 768px) 24vw, 100vw",
  },
  {
    src: "/chi-siamo/staff/staff%206.jpg",
    cell: "col-start-3 row-start-3",
    className: "object-[center_40%]",
    sizes: "(min-width: 768px) 16vw, 40vw",
  },
] as const;

const staffMobile = [
  {
    src: "/chi-siamo/staff/staff%204.jpg",
    className: "object-[62%_34%]",
    sizes: "100vw",
  },
  {
    src: "/chi-siamo/staff/staff%203.jpg",
    className: "object-[center_26%]",
    sizes: "50vw",
  },
  {
    src: "/chi-siamo/staff/staff%201.jpg",
    className: "object-[center_30%]",
    sizes: "50vw",
  },
] as const;
const copyPadding = "pt-12 pb-28 sm:pt-14 sm:pb-32 lg:pt-16 lg:pb-28";
const copyMinHeight = "lg:min-h-[clamp(38.75rem,calc(100svh-5.5rem),45rem)]";

function gold(chunks: ReactNode) {
  return <span className="text-brand-gold">{chunks}</span>;
}

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function readReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4">
      <path
        d={direction === "left" ? "M10 3.5 5.5 8 10 12.5" : "M6 3.5 10.5 8 6 12.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MosaicPhoto({
  src,
  className,
  sizes,
}: {
  src: string;
  className: string;
  sizes: string;
}) {
  return (
    <div className="relative h-full min-h-0 min-w-0 overflow-hidden">
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        quality={85}
        loading="lazy"
        className={`object-cover ${className}`}
      />
    </div>
  );
}

function StaffMosaic({ compact = false }: { compact?: boolean }) {
  if (compact) {
    const [lead, left, right] = staffMobile;

    return (
      <div className="grid h-full grid-rows-[1.35fr_1fr] gap-0.5 bg-[#07110d]">
        <MosaicPhoto src={lead.src} className={lead.className} sizes={lead.sizes} />
        <div className="grid min-h-0 grid-cols-2 gap-0.5">
          <MosaicPhoto src={left.src} className={left.className} sizes={left.sizes} />
          <MosaicPhoto src={right.src} className={right.className} sizes={right.sizes} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid h-full grid-cols-[1.15fr_0.9fr_1fr] grid-rows-[1.2fr_0.95fr_1fr] gap-0.5 bg-[#07110d]">
      {staffMosaic.map((photo) => (
        <div key={photo.src} className={`relative min-h-0 min-w-0 overflow-hidden ${photo.cell}`}>
          <Image
            src={photo.src}
            alt=""
            fill
            sizes={photo.sizes}
            quality={85}
            loading="lazy"
            className={`object-cover ${photo.className}`}
          />
        </div>
      ))}
    </div>
  );
}

function StaffBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute inset-y-0 left-0 w-[65%] overflow-hidden">
        <Image
          src={staffMain.src}
          alt=""
          fill
          sizes="65vw"
          quality={85}
          loading="lazy"
          className={`object-cover ${staffMain.className}`}
        />
        <div className="absolute inset-0" style={{ background: staffOverlay }} />
      </div>
      <div className="absolute inset-y-0 right-0 w-[35%]">
        <StaffMosaic />
      </div>
    </div>
  );
}

function layerVisibility(active: boolean, reduced: boolean) {
  return [
    active ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0",
    reduced
      ? "transition-none"
      : "transition-opacity duration-[900ms] ease-[var(--ease-standard)] motion-reduce:transition-none",
  ].join(" ");
}

export function HomeHero() {
  const t = useTranslations("Home");
  const nav = useTranslations("Nav");
  const rootRef = useRef<HTMLElement>(null);
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const indexRef = useRef(0);
  const elapsedRef = useRef(0);
  const pausedRef = useRef(false);
  const hiddenRef = useRef(false);
  const reducedRef = useRef(false);
  const hoverCapableRef = useRef(false);
  const [index, setIndex] = useState(0);
  const [secondImage, setSecondImage] = useState(false);
  const reduced = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, () => false);

  useEffect(() => {
    hoverCapableRef.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    hiddenRef.current = document.hidden;

    const onVisibility = () => {
      hiddenRef.current = document.hidden;
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (secondImage) {
      return;
    }

    const id = window.setTimeout(() => setSecondImage(true), index === 0 ? 1200 : 0);
    return () => window.clearTimeout(id);
  }, [index, secondImage]);

  useEffect(() => {
    reducedRef.current = reduced;

    if (reduced) {
      barsRef.current.forEach((bar, slide) => {
        if (bar) {
          bar.style.transform = slide === indexRef.current ? "scaleX(1)" : "scaleX(0)";
        }
      });
      return;
    }

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = now - last;
      last = now;

      if (!pausedRef.current && !hiddenRef.current && !reducedRef.current) {
        elapsedRef.current += delta;
        if (elapsedRef.current >= AUTOPLAY_MS) {
          elapsedRef.current = 0;
          const next = (indexRef.current + 1) % SLIDE_COUNT;
          indexRef.current = next;
          setIndex(next);
        }

        const ratio = Math.min(elapsedRef.current / AUTOPLAY_MS, 1);
        const current = indexRef.current;
        barsRef.current.forEach((bar, slide) => {
          if (!bar) {
            return;
          }
          bar.style.transform = `scaleX(${slide === current ? ratio : 0})`;
        });
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  const goTo = (nextRaw: number) => {
    const next = ((nextRaw % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT;
    elapsedRef.current = 0;
    indexRef.current = next;
    setIndex(next);
  };

  const syncPause = (hovered: boolean) => {
    const root = rootRef.current;
    const focused = root?.contains(document.activeElement) ?? false;
    pausedRef.current = focused || (hovered && hoverCapableRef.current);
  };

  const onBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    if (next instanceof Node && rootRef.current?.contains(next)) {
      pausedRef.current = true;
      return;
    }
    syncPause(rootRef.current?.matches(":hover") ?? false);
  };

  const quote = nav("quote");

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={t("hero.carouselLabel")}
      className="relative isolate w-full overflow-hidden bg-[#07110d] text-ivory"
      onMouseEnter={() => syncPause(true)}
      onMouseLeave={() => syncPause(false)}
      onFocusCapture={() => {
        pausedRef.current = true;
      }}
      onBlurCapture={onBlur}
    >
      <div className="relative h-[clamp(14.375rem,56vw,18.125rem)] overflow-hidden md:hidden" aria-hidden="true">
        {SLIDES.map((slide, slideIndex) => {
          const active = slideIndex === index;
          const showImage = slideIndex === 0 || secondImage;

          return (
            <div key={slide.id} className={`absolute inset-0 ${layerVisibility(active, reduced)}`}>
              {showImage && slide.id === "staff" ? <StaffMosaic compact /> : null}
              {showImage && slide.id !== "staff" ? (
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  sizes="100vw"
                  quality={85}
                  preload={slideIndex === 0}
                  loading={slideIndex === 0 ? "eager" : "lazy"}
                  className={`object-cover ${slide.imageClassName}`}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="relative hidden md:block">
      <div aria-hidden="true" inert className="invisible">
        <Container>
          <div className={`grid items-center ${copyPadding} ${copyMinHeight}`}>
            {SLIDES.map((slide) => (
              <div
                key={slide.id}
                className={`col-start-1 row-start-1 ${slide.id === "staff" ? staffCopyWidth : copyWidth}`}
              >
                <SlideCopy id={slide.id} quote={quote} decorative />
              </div>
            ))}
          </div>
        </Container>
      </div>

      {SLIDES.map((slide, slideIndex) => {
        const active = slideIndex === index;
        const showImage = slideIndex === 0 || secondImage;

        return (
          <div key={slide.id} className={`absolute inset-0 ${layerVisibility(active, reduced)}`}>
            {showImage && slide.id === "experience" ? (
              <Image
                src={slide.src}
                alt=""
                fill
                sizes="100vw"
                quality={85}
                preload
                className={`object-cover ${slide.imageClassName}`}
              />
            ) : null}
            {showImage && slide.id === "switzerland" ? (
              <Image
                src={slide.src}
                alt=""
                fill
                sizes="100vw"
                quality={85}
                loading="lazy"
                className={`object-cover ${slide.imageClassName}`}
              />
            ) : null}
            {showImage && slide.id === "staff" ? <StaffBackdrop /> : null}
            {slide.id === "staff" ? null : (
              <>
                <div className="absolute inset-0 md:hidden" style={{ background: mobileOverlay }} />
                <div
                  className="absolute inset-0 hidden md:block lg:hidden"
                  style={{ background: tabletOverlay }}
                />
                <div
                  className="absolute inset-0 hidden lg:block"
                  style={{ background: desktopOverlay }}
                />
              </>
            )}
            <div className="relative z-10 flex h-full items-center">
              <Container className={`flex h-full w-full items-center ${copyPadding}`}>
                <div
                  role="group"
                  aria-roledescription="slide"
                  aria-label={t("hero.slideStatus", {
                    number: slideIndex + 1,
                    total: SLIDE_COUNT,
                  })}
                  aria-hidden={active ? undefined : true}
                  inert={active ? undefined : true}
                  className={slide.id === "staff" ? staffCopyWidth : copyWidth}
                >
                  <SlideCopy id={slide.id} quote={quote} />
                </div>
              </Container>
            </div>
          </div>
        );
      })}
      </div>

      <div className="relative z-30 bg-[#07110d] py-4 md:absolute md:inset-x-0 md:bottom-0 md:bg-transparent md:py-0 md:pb-6">
        <Container>
          <div
            className="flex items-center gap-3"
            role="group"
            aria-label={t("hero.pagination")}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                goTo(indexRef.current - 1);
              }
              if (event.key === "ArrowRight") {
                event.preventDefault();
                goTo(indexRef.current + 1);
              }
            }}
          >
            <button
              type="button"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-ivory/40 bg-midnight/55 text-ivory transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-brand-gold hover:text-brand-gold"
              aria-label={t("hero.previous")}
              onClick={() => goTo(index - 1)}
            >
              <Chevron direction="left" />
            </button>
            {SLIDES.map((slide, slideIndex) => {
              const active = slideIndex === index;
              const title =
                slide.id === "experience"
                  ? t("hero.slides.experience.title")
                  : slide.id === "switzerland"
                    ? t("hero.slides.switzerland.title")
                    : t("hero.slides.staff.title");

              return (
                <button
                  key={slide.id}
                  type="button"
                  className="inline-flex h-11 w-16 items-center sm:w-24"
                  aria-current={active ? "true" : undefined}
                  aria-label={t("hero.goTo", { number: slideIndex + 1, title })}
                  onClick={() => goTo(slideIndex)}
                >
                  <span
                    className={`block h-0.5 w-full overflow-hidden rounded-full ${active ? "bg-ivory/40" : "bg-ivory/25"}`}
                  >
                    <span
                      ref={(node) => {
                        barsRef.current[slideIndex] = node;
                      }}
                      className="block h-full w-full origin-left bg-brand-gold will-change-transform"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </span>
                </button>
              );
            })}
            <button
              type="button"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-ivory/40 bg-midnight/55 text-ivory transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-brand-gold hover:text-brand-gold"
              aria-label={t("hero.next")}
              onClick={() => goTo(index + 1)}
            >
              <Chevron direction="right" />
            </button>
          </div>
        </Container>
      </div>

      <div className="grid bg-[#07110d] px-5 pt-1 pb-8 sm:px-6 md:hidden">
        {SLIDES.map((slide, slideIndex) => {
          const active = slideIndex === index;

          return (
            <div
              key={slide.id}
              className={`col-start-1 row-start-1 ${active ? "" : "invisible"}`}
              role="group"
              aria-roledescription="slide"
              aria-label={t("hero.slideStatus", {
                number: slideIndex + 1,
                total: SLIDE_COUNT,
              })}
              aria-hidden={active ? undefined : true}
              inert={active ? undefined : true}
            >
              <SlideCopy id={slide.id} quote={quote} stacked />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SlideCopy({
  id,
  quote,
  decorative = false,
  stacked = false,
}: {
  id: SlideId;
  quote: string;
  decorative?: boolean;
  stacked?: boolean;
}) {
  const t = useTranslations("Home");
  const page = useTranslations("Pages.home");
  const Title = "p";
  const Subtitle = decorative ? "p" : "h2";
  const actionsClass = stacked
    ? "mt-7 flex flex-col gap-3"
    : "mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-start";
  const buttonClass = stacked ? "w-full" : "w-full sm:w-auto";
  const metaClass = stacked
    ? "type-eyebrow mt-6 text-brand-gold"
    : "type-eyebrow mt-6 hidden text-brand-gold sm:block";

  if (id === "experience") {
    return (
      <>
        <Eyebrow tone="dark">{t("hero.slides.experience.eyebrow")}</Eyebrow>
        {decorative ? null : <h1 className="sr-only">{page("heading")}</h1>}
        <Title className="mt-4">
          <span className="inline-flex items-baseline gap-x-[0.28em] font-sans text-[clamp(2.05rem,1rem+2.6vw,3.9rem)] font-bold leading-none tracking-[-0.03em] text-ivory">
            <span>CASINO</span>
            <span className="text-brand-green">SHOW</span>
          </span>
          <span className="mt-3 block font-display text-[clamp(1.7rem,1.05rem+1.65vw,2.7rem)] font-medium leading-[1.12] tracking-[-0.02em] text-ivory italic">
            {t.rich("hero.slides.experience.slogan", { gold })}
          </span>
        </Title>
        <p className="mt-5 font-display text-[clamp(1.15rem,1rem+0.4vw,1.45rem)] font-medium leading-snug text-ivory">
          {t("hero.slides.experience.secondary")}
        </p>
        <p className="type-body mt-3 max-w-[38rem] text-pretty text-text-muted-on-dark">
          {t("hero.slides.experience.description")}
        </p>
        <div className={actionsClass}>
          <Button href={routePathnames.quote} className={buttonClass}>
            {quote}
          </Button>
          <Button href={routePathnames.events} variant="light" className={buttonClass}>
            {t("hero.slides.experience.secondaryCta")}
          </Button>
        </div>
        <p className={metaClass}>{t("hero.slides.experience.meta")}</p>
      </>
    );
  }

  if (id === "staff") {
    return (
      <>
        <Eyebrow tone="dark">{t("hero.slides.staff.eyebrow")}</Eyebrow>
        <Subtitle className="mt-4 font-sans text-[clamp(1.55rem,0.85rem+3vw,2.2rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ivory uppercase md:text-[clamp(1.85rem,0.7rem+2.5vw,3.4rem)]">
          {t("hero.slides.staff.headingLead")}{" "}
          <span className="block text-brand-green md:inline">Show.</span>
        </Subtitle>
        <p className="mt-3 font-display text-[clamp(1.35rem,0.95rem+1vw,2rem)] font-medium leading-[1.2] text-ivory italic">
          {t("hero.slides.staff.subtitle")}
        </p>
        <p className="mt-5 font-display text-[clamp(1.15rem,1rem+0.4vw,1.45rem)] font-medium leading-snug text-ivory">
          {t("hero.slides.staff.secondary")}
        </p>
        <p className="type-body mt-3 max-w-[38rem] text-pretty text-text-muted-on-dark">
          {t("hero.slides.staff.description")}
        </p>
        <div className={actionsClass}>
          <Button href={routePathnames.about} className={buttonClass}>
            {t("hero.slides.staff.primaryCta")}
          </Button>
          <Button href={routePathnames.quote} variant="light" className={buttonClass}>
            {quote}
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Eyebrow tone="dark">{t("hero.slides.switzerland.eyebrow")}</Eyebrow>
      <Subtitle className="mt-4 font-sans text-[clamp(2.15rem,0.9rem+4vw,4rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ivory uppercase">
        {t.rich("hero.slides.switzerland.heading", { gold })}
      </Subtitle>
      <p className="mt-3 max-w-[18em] font-display text-[clamp(1.45rem,1rem+1.15vw,2.15rem)] font-medium leading-[1.2] text-ivory italic">
        {t("hero.slides.switzerland.emotional")}
      </p>
      <p className="mt-5 font-display text-[clamp(1.15rem,1rem+0.4vw,1.45rem)] font-medium leading-snug text-ivory">
        {t("hero.slides.switzerland.secondary")}
      </p>
      <p className="type-body mt-3 max-w-[38rem] text-pretty text-text-muted-on-dark">
        {t("hero.slides.switzerland.description")}
      </p>
      <div className={actionsClass}>
        <Button href={routePathnames.quote} className={buttonClass}>
          {quote}
        </Button>
        <Button href={routePathnames.events} variant="light" className={buttonClass}>
          {t("hero.slides.switzerland.secondaryCta")}
        </Button>
      </div>
      <p className={metaClass}>{t("hero.slides.switzerland.meta")}</p>
    </>
  );
}
