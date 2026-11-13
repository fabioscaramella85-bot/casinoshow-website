"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "@/i18n/navigation";

const MobileMenuContext = createContext({ open: false });

export function useMobileMenu() {
  return useContext(MobileMenuContext);
}

type MobileNavProps = {
  openLabel: string;
  closeLabel: string;
  children: ReactNode;
};

export function MobileNav({ openLabel, closeLabel, children }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };

    desktop.addEventListener("change", closeOnDesktop);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    const header = buttonRef.current?.closest("header");
    const panel = panelRef.current;
    const root = document.documentElement;
    const body = document.body;
    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    const lockedScroll = window.scrollY;
    const previousAnchor = body.style.overflowAnchor;
    body.style.overflowAnchor = "none";
    const previousHeaderStyle = header
      ? {
          position: header.style.position,
          top: header.style.top,
          left: header.style.left,
          right: header.style.right,
          width: header.style.width,
        }
      : null;
    const previousBodyPadding = body.style.paddingTop;

    if (header instanceof HTMLElement) {
      body.style.paddingTop = `${headerHeight}px`;
      header.style.position = "fixed";
      header.style.top = "0px";
      header.style.left = "0px";
      header.style.right = "0px";
      header.style.width = "100%";
    }

    const place = () => {
      const top = header?.getBoundingClientRect().bottom ?? 0;
      panel?.style.setProperty("top", `${Math.max(0, Math.round(top))}px`);
    };

    place();
    window.scrollTo(0, lockedScroll);
    window.addEventListener("resize", place);

    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    const freezeScroll = () => {
      if (window.scrollY !== lockedScroll) {
        window.scrollTo(0, lockedScroll);
      }
    };
    window.addEventListener("scroll", freezeScroll);

    const inerted: HTMLElement[] = [];
    for (const child of body.children) {
      if (!(child instanceof HTMLElement) || child === header || (header && child.contains(header))) {
        continue;
      }
      if (child.hasAttribute("inert")) {
        continue;
      }
      child.setAttribute("inert", "");
      inerted.push(child);
    }

    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", freezeScroll);
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingTop = previousBodyPadding;
      body.style.overflowAnchor = previousAnchor;
      if (header instanceof HTMLElement && previousHeaderStyle) {
        header.style.position = previousHeaderStyle.position;
        header.style.top = previousHeaderStyle.top;
        header.style.left = previousHeaderStyle.left;
        header.style.right = previousHeaderStyle.right;
        header.style.width = previousHeaderStyle.width;
      }
      window.scrollTo(0, lockedScroll);
      for (const element of inerted) {
        element.removeAttribute("inert");
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const panel = panelRef.current;
      const button = buttonRef.current;
      if (!panel || !button) {
        return;
      }

      const items = [button, ...panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")].filter(
        (element) => element.getClientRects().length > 0,
      );

      if (items.length === 0) {
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <MobileMenuContext.Provider value={{ open }}>
    <div className="xl:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex size-11 items-center justify-center"
        data-mobile-nav=""
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>
      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-line-on-light bg-white"
      >
        {children}
      </div>
    </div>
    </MobileMenuContext.Provider>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6">
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
