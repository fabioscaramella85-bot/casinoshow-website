import Image, { type StaticImageData } from "next/image";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import corporatePhoto from "../../../public/home-page/eventi/foto-eventi-aziendali.png";
import teamPhoto from "../../../public/home-page/eventi/foto-team-building.png";
import weddingPhoto from "../../../public/home-page/eventi/foto-matrimoni.png";
import privatePhoto from "../../../public/home-page/eventi/foto-feste-private.png";
import sectionBackdrop from "../../../public/home-page/eventi/sfondo-sezione-eventi.png";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import { routePathnames } from "@/i18n/routes";

const events = [
  {
    key: "corporate",
    hash: "corporate",
    src: corporatePhoto,
    imageClassName: "object-[center_34%]",
  },
  {
    key: "team",
    hash: "team",
    src: teamPhoto,
    imageClassName: "object-[center_30%]",
  },
  {
    key: "wedding",
    hash: "weddings",
    src: weddingPhoto,
    imageClassName: "object-[center_42%]",
  },
  {
    key: "private",
    hash: "private",
    src: privatePhoto,
    imageClassName: "object-[center_38%]",
  },
] as const;

const cardOverlay =
  "linear-gradient(to bottom, rgb(0 0 0 / 0.12) 0%, rgb(0 0 0 / 0.08) 35%, rgb(0 0 0 / 0.58) 65%, rgb(0 0 0 / 0.94) 100%)";

const motion =
  "transition duration-500 ease-[var(--ease-standard)] motion-reduce:transition-none";

function emphasis(chunks: ReactNode) {
  return <em className="text-brand-gold italic">{chunks}</em>;
}

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={`size-4 ${motion} group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-focus-visible:translate-x-0`}>
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function EventCard({
  index,
  hash,
  src,
  imageClassName,
  title,
  body,
  alt,
  cta,
}: {
  index: number;
  hash: string;
  src: StaticImageData;
  imageClassName: string;
  title: string;
  body: string;
  alt: string;
  cta: string;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <li className="min-w-0">
      <Link
        href={{ pathname: routePathnames.events, hash }}
        className={`group relative block aspect-[4/5] overflow-hidden rounded-[5px] border border-brand-gold/55 md:aspect-[3/4] ${motion} hover:-translate-y-1.5 hover:border-brand-gold focus-visible:-translate-y-1.5 focus-visible:border-brand-gold motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1200px) 22vw, (min-width: 768px) 46vw, 92vw"
          quality={85}
          className={`object-cover ${imageClassName} ${motion} group-hover:scale-[1.05] group-focus-visible:scale-[1.05] motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100`}
        />
        <div aria-hidden="true" className="absolute inset-0" style={{ background: cardOverlay }} />
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-0 ${motion} group-hover:opacity-100 group-focus-visible:opacity-100`}
        />
        <div className="absolute top-0 left-0 z-10 flex items-center gap-3 p-4 sm:p-5">
          <p className="font-sans text-[0.7rem] font-semibold tracking-[0.18em] text-ivory uppercase">
            {number}
            <span className="mx-1.5 text-brand-gold">/</span>
            <span className="text-brand-gold">04</span>
          </p>
          <span aria-hidden="true" className="h-px w-8 bg-brand-gold sm:w-10" />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 grid gap-2 p-4 sm:p-5">
          <div className="flex h-[2.55em] items-end font-display text-[clamp(1.5rem,1.2rem+0.7vw,2rem)] leading-[1.15] text-ivory">
            <h3 className="min-w-0 font-medium leading-[1.15]">{title}</h3>
          </div>
          <p className="home-event-body min-w-0 font-sans text-[0.9375rem] leading-[1.45] text-ivory/90 md:h-[4.35em]">
            {body}
          </p>
          <span className="inline-flex flex-col self-start">
            <span className="inline-flex items-center gap-2 font-sans text-[0.75rem] font-semibold tracking-[0.14em] text-brand-gold uppercase">
              {cta}
              <Arrow />
            </span>
            <span
              aria-hidden="true"
              className={`mt-1.5 h-px w-8 bg-brand-gold ${motion} group-hover:w-full group-focus-visible:w-full`}
            />
          </span>
        </div>
      </Link>
    </li>
  );
}

export async function HomeEvents() {
  const t = await getTranslations("Home");

  return (
    <Section tone="dark" labelledBy="home-events" className="relative overflow-x-clip">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src={sectionBackdrop}
          alt=""
          fill
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[rgb(16_17_20/0.15)]" />
      </div>
      <style>{`
        @media (min-width: 1200px) {
          .home-events-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 1.25rem;
          }
        }
      `}</style>
      <Container className="relative">
        <div className="max-w-[40rem]">
          <Eyebrow tone="dark">{t("events.eyebrow")}</Eyebrow>
          <h2
            id="home-events"
            className="mt-3 font-display text-[clamp(2.05rem,1.35rem+1.7vw,3.15rem)] font-medium leading-[1.12] tracking-[-0.02em] text-balance text-ivory"
          >
            {t.rich("events.title", { em: emphasis })}
          </h2>
          <p className="type-body-lg mt-4 max-w-[38rem] text-text-muted-on-dark">{t("events.description")}</p>
        </div>
        <ul className="home-events-grid mt-10 grid list-none grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {events.map((event, index) => (
            <EventCard
              key={event.key}
              index={index}
              hash={event.hash}
              src={event.src}
              imageClassName={event.imageClassName}
              title={t(`events.items.${event.key}.title`)}
              body={t(`events.items.${event.key}.body`)}
              alt={t(`events.items.${event.key}.alt`)}
              cta={t("events.cardCta")}
            />
          ))}
        </ul>
        <div className="mx-auto mt-14 flex max-w-4xl items-center justify-center gap-5 lg:mt-16 lg:gap-8">
          <span aria-hidden="true" className="hidden h-px w-14 bg-brand-gold/75 lg:block xl:w-20" />
          <p className="text-center font-display text-[clamp(1.65rem,1.15rem+1.3vw,2.45rem)] font-medium leading-tight text-balance text-ivory">
            {t.rich("events.closing", { em: emphasis })}
          </p>
          <span aria-hidden="true" className="hidden h-px w-14 bg-brand-gold/75 lg:block xl:w-20" />
        </div>
        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          <Link
            href={routePathnames.quote}
            className={`group type-button inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-brand-red px-5 text-white hover:bg-brand-red-hover sm:w-auto ${motion}`}
          >
            {t("events.primaryCta")}
            <Arrow />
          </Link>
          <Link
            href={routePathnames.events}
            className={`group type-button inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-brand-gold/80 bg-transparent px-5 text-ivory hover:border-brand-gold hover:bg-brand-gold/10 sm:w-auto ${motion}`}
          >
            {t("events.secondaryCta")}
            <Arrow />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
