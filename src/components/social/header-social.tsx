"use client";

import { useEffect, useId, useRef, useState, type ReactNode, type RefObject } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { socialSans, socialSerif } from "@/app/fonts";
import {
  facebookArtwork,
  facebookCardName,
  facebookCardStats,
  facebookUrl,
  instagramArtwork,
  instagramCardName,
  instagramCardStats,
  instagramHandle,
  instagramUrl,
  whatsappUrl,
} from "@/config/social";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/social/icons";

type Network = "instagram" | "facebook";

const circle =
  "inline-flex size-9 items-center justify-center rounded-full text-white shadow-[0_6px_16px_rgb(16_17_20/0.16)] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100";

export function HeaderSocialButtons() {
  const social = useTranslations("Social");
  const shell = useTranslations("Shell");
  const [open, setOpen] = useState<Network | null>(null);
  const openRef = useRef<Network | null>(null);
  const pinnedRef = useRef(false);
  const setOpenNetwork = (network: Network | null) => {
    openRef.current = network;
    setOpen(network);
  };
  const rootRef = useRef<HTMLDivElement>(null);
  const instagramRef = useRef<HTMLButtonElement>(null);
  const facebookRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      event.preventDefault();
      setOpenNetwork(null);
      pinnedRef.current = false;
      (open === "instagram" ? instagramRef : facebookRef).current?.focus();
    };

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpenNetwork(null);
        pinnedRef.current = false;
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  const show = (network: Network) => {
    if (openRef.current !== network) {
      pinnedRef.current = false;
    }
    setOpenNetwork(network);
  };

  const hide = () => {
    if (!pinnedRef.current) {
      setOpenNetwork(null);
    }
  };

  const toggle = (network: Network) => {
    if (pinnedRef.current && openRef.current === network) {
      pinnedRef.current = false;
      setOpenNetwork(null);
      return;
    }
    pinnedRef.current = true;
    setOpenNetwork(network);
  };

  return (
    <div ref={rootRef} className="flex items-center gap-2">
      <SocialTrigger
        open={open === "instagram"}
        buttonRef={instagramRef}
        label={social("instagram")}
        className={`${circle} bg-[linear-gradient(135deg,#f9ce34_0%,#ee2a7b_55%,#6228d7_100%)]`}
        icon={<InstagramIcon />}
        onEnter={() => show("instagram")}
        onLeave={hide}
        onToggle={() => toggle("instagram")}
        card={
          <SocialCard
            title={instagramCardName}
            handle={instagramHandle}
            description={social("instagramDescription")}
            href={instagramUrl}
            action={social("visitInstagram")}
            newTab={shell("newTab")}
            artwork={instagramArtwork}
            artworkAlt={social("instagramArtworkAlt")}
            stats={instagramCardStats.map((stat) => ({
              value: stat.value,
              label: social(stat.label),
            }))}
            align="center"
            tone="instagram"
          />
        }
      />
      <SocialTrigger
        open={open === "facebook"}
        buttonRef={facebookRef}
        label={social("facebook")}
        className={`${circle} bg-[#1877F2]`}
        icon={<FacebookIcon />}
        onEnter={() => show("facebook")}
        onLeave={hide}
        onToggle={() => toggle("facebook")}
        card={
          <SocialCard
            title={facebookCardName}
            description={social("facebookDescription")}
            href={facebookUrl}
            action={social("visitFacebook")}
            newTab={shell("newTab")}
            artwork={facebookArtwork}
            artworkAlt={social("facebookArtworkAlt")}
            stats={facebookCardStats.map((stat) => ({
              value: stat.value,
              label: social(stat.label),
              compact: "compact" in stat ? stat.compact : false,
            }))}
            align="end"
            tone="facebook"
          />
        }
      />
      <a
        href={whatsappUrl(social("whatsappMessage"))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${social("whatsapp")} (${shell("newTab")})`}
        className={`${circle} bg-[#25D366]`}
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}

function SocialTrigger({
  open,
  buttonRef,
  label,
  className,
  icon,
  card,
  onEnter,
  onLeave,
  onToggle,
}: {
  open: boolean;
  buttonRef: RefObject<HTMLButtonElement | null>;
  label: string;
  className: string;
  icon: ReactNode;
  card: ReactNode;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
}) {
  const panelId = useId();

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        ref={buttonRef}
        type="button"
        className={className}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-label={label}
        onClick={onToggle}
      >
        {icon}
      </button>
      <div id={panelId}>{open ? card : null}</div>
    </div>
  );
}

function SocialCard({
  title,
  handle,
  description,
  href,
  action,
  newTab,
  artwork,
  artworkAlt,
  stats,
  align,
  tone,
}: {
  title: string;
  handle?: string;
  description: string;
  href: string;
  action: string;
  newTab: string;
  artwork: { src: string; width: number; height: number };
  artworkAlt: string;
  stats: readonly { value: string; label: string; compact?: boolean }[];
  align: "center" | "end";
  tone: Network;
}) {
  const place = align === "end" ? "right-0" : "left-1/2 -translate-x-1/2";
  const cta =
    tone === "instagram"
      ? "bg-[linear-gradient(135deg,#f58529_0%,#dd2a7b_52%,#8134af_78%,#515bd4_100%)]"
      : "bg-[#1877f2]";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={title}
      className={`absolute top-full z-50 w-[21rem] max-w-[min(21rem,calc(100vw-2rem))] pt-[0.7rem] ${place}`}
    >
      <div
        className={`${socialSans.variable} ${socialSerif.variable} rounded-xl border border-[#d9cfc3] bg-[#fffcf8] px-[1.1rem] pt-[1.05rem] pb-4 shadow-[0_10px_28px_rgba(8,40,32,0.12)]`}
        style={{ fontFamily: "var(--font-social-sans), 'Segoe UI', sans-serif" }}
      >
        <p
          className="m-0 text-[1.05rem] leading-[1.2] font-bold tracking-[-0.01em] text-[#08382c]"
          style={{ fontFamily: "var(--font-social-serif), Georgia, 'Times New Roman', serif" }}
        >
          {title}
        </p>
        {handle ? (
          <p className="mt-[0.2rem] text-[0.8125rem] leading-[1.3] font-semibold text-[#5c6b64]">{handle}</p>
        ) : null}
        <dl className="mt-[0.85rem] grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div className="m-0" key={stat.label}>
              <dd
                className={`m-0 font-bold text-[#08382c] ${stat.compact ? "text-[0.95rem] leading-[1.2] tracking-[0.01em]" : "text-[1.45rem] leading-[1.1] tracking-[-0.02em]"}`}
              >
                {stat.value}
              </dd>
              <dt className="text-[0.68rem] leading-[1.2] font-bold tracking-[0.12em] text-[#5c6b64] uppercase">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-[0.78rem] leading-[1.4] font-semibold text-[#5c6b64]">{description}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-[0.85rem] block aspect-[3/2] overflow-hidden rounded-[0.45rem] bg-[#f3eee6]"
          aria-label={`${artworkAlt} (${newTab})`}
        >
          <Image
            alt={artworkAlt}
            className="object-cover object-center"
            fill
            quality={80}
            sizes="336px"
            src={artwork.src}
          />
        </a>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-[0.85rem] flex min-h-11 w-full items-center justify-center rounded-lg px-3 py-[0.65rem] text-center text-[0.72rem] leading-[1.2] font-bold tracking-[0.08em] text-white uppercase transition duration-200 hover:-translate-y-px hover:brightness-110 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${cta}`}
        >
          {action}
          <span aria-hidden="true"> →</span>
          <span className="sr-only"> ({newTab})</span>
        </a>
      </div>
    </div>
  );
}
