"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { instagramUrl, whatsappUrl } from "@/config/social";
import { InstagramIcon, WhatsAppIcon } from "@/components/social/icons";
import { planSocialObserver } from "@/components/social/social-observer";

const buttonClass =
  "inline-flex size-12 items-center justify-center rounded-full text-white shadow-[0_8px_20px_rgb(16_17_20/0.2)] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100 xl:size-14";

const CTA_SELECTOR = "a.type-button, button.type-button, a.ev-button-light, button.ev-button-light";
const DESKTOP_QUERY = "(min-width: 1280px)";
/** A CTA must enter this far into the stack before the buttons hide. */
const HIDE_INSET = 6;
/** Once hidden, the CTA must clear the stack by this far before the buttons return. */
const SHOW_OUTSET = 8;

function isRelevantCta(element: Element) {
  if (!(element instanceof HTMLAnchorElement || element instanceof HTMLButtonElement)) {
    return false;
  }
  if (element.closest(".floating-social")) return false;

  const { classList } = element;
  if (classList.contains("px-0") || classList.contains("underline")) return false;
  if (classList.contains("ev-button-light") || classList.contains("about-italy-cta")) return true;
  if (!classList.contains("type-button")) return false;

  return (
    classList.contains("px-3") ||
    classList.contains("px-4") ||
    classList.contains("px-5") ||
    classList.contains("w-full")
  );
}

function isActiveCta(element: Element) {
  if (element.closest("[inert], [aria-hidden='true'], .invisible")) return false;
  const style = getComputedStyle(element);
  return style.display !== "none" && style.visibility !== "hidden";
}

function rootMarginFor(rect: DOMRect, inset: number) {
  const top = rect.top + inset;
  const left = rect.left + inset;
  const rightGap = window.innerWidth - rect.right + inset;
  const bottomGap = window.innerHeight - rect.bottom + inset;
  return `${-top}px ${-rightGap}px ${-bottomGap}px ${-left}px`;
}

function controlRect(rect: DOMRect, inset: number) {
  return {
    left: rect.left + inset,
    right: rect.right - inset,
    top: rect.top + inset,
    bottom: rect.bottom - inset,
  };
}

function overlapsControl(target: DOMRect, zone: ReturnType<typeof controlRect>) {
  return (
    target.width > 0 &&
    target.height > 0 &&
    target.left < zone.right &&
    target.right > zone.left &&
    target.top < zone.bottom &&
    target.bottom > zone.top
  );
}

export function FloatingSocial() {
  const social = useTranslations("Social");
  const shell = useTranslations("Shell");
  const pathname = usePathname();
  const stackRef = useRef<HTMLDivElement>(null);
  const [blocked, setBlocked] = useState(false);

  useLayoutEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const desktop = window.matchMedia(DESKTOP_QUERY);
    let observer: IntersectionObserver | null = null;
    let generation = 0;
    let blockedNow = false;
    let frame = 0;

    const blurIfFocused = () => {
      const active = document.activeElement;
      if (active instanceof HTMLElement && stack.contains(active)) {
        active.blur();
      }
    };

    const ctaBlocksStack = (inset: number) => {
      const rect = stack.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return false;
      const zone = controlRect(rect, inset);
      for (const node of document.querySelectorAll(CTA_SELECTOR)) {
        if (!isRelevantCta(node) || !isActiveCta(node)) continue;
        if (overlapsControl(node.getBoundingClientRect(), zone)) return true;
      }
      return false;
    };

    const disconnect = () => {
      generation += 1;
      observer?.disconnect();
      observer = null;
    };

    const connect = () => {
      disconnect();
      if (desktop.matches) return;

      const rect = stack.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;

      const gen = generation;
      const inset = blockedNow ? -SHOW_OUTSET : HIDE_INSET;
      const next = new IntersectionObserver(
        () => {
          if (gen !== generation) return;
          update();
        },
        { root: null, rootMargin: rootMarginFor(rect, inset), threshold: 0 },
      );
      observer = next;

      for (const node of document.querySelectorAll(CTA_SELECTOR)) {
        if (isRelevantCta(node)) next.observe(node);
      }
    };

    const update = () => {
      const desktopNow = desktop.matches;
      const nextBlocked = desktopNow
        ? false
        : ctaBlocksStack(blockedNow ? -SHOW_OUTSET : HIDE_INSET);
      const plan = planSocialObserver({
        desktop: desktopNow,
        blocked: blockedNow,
        nextBlocked,
        hasObserver: observer !== null,
      });

      if (plan.blocked !== blockedNow) {
        blockedNow = plan.blocked;
        setBlocked(plan.blocked);
        if (plan.blocked) blurIfFocused();
      }

      if (plan.action === "disconnect") disconnect();
      else if (plan.action === "connect") connect();
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    const onMutations = (records: MutationRecord[]) => {
      const relevant = records.some((record) => {
        const target = record.target;
        return target instanceof Node && target !== stack && !stack.contains(target);
      });
      if (!relevant) return;
      schedule();
    };

    const mutations = new MutationObserver(onMutations);
    mutations.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["class", "aria-hidden", "inert", "hidden"],
    });

    connect();
    update();
    desktop.addEventListener("change", schedule);
    window.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("resize", schedule);

    return () => {
      generation += 1;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      mutations.disconnect();
      desktop.removeEventListener("change", schedule);
      window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  if (pathname === "/quote" || pathname === "/careers") {
    return null;
  }

  const newTab = shell("newTab");

  return (
    <div
      ref={stackRef}
      data-cta-blocked={blocked ? "true" : "false"}
      aria-hidden={blocked ? true : undefined}
      className={`floating-social fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-30 flex flex-col gap-2.5 xl:right-6 xl:bottom-6 xl:gap-3 ${blocked ? "pointer-events-none invisible" : ""}`}
    >
      {instagramUrl ? (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${social("instagram")} (${newTab})`}
          className={`${buttonClass} bg-[linear-gradient(135deg,#f9ce34_0%,#ee2a7b_55%,#6228d7_100%)]`}
        >
          <InstagramIcon className="size-6" />
        </a>
      ) : null}
      <a
        href={whatsappUrl(social("whatsappMessage"))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${social("whatsapp")} (${newTab})`}
        className={`${buttonClass} bg-[#25D366]`}
      >
        <WhatsAppIcon className="size-6" />
      </a>
    </div>
  );
}
