import { readFileSync } from "node:fs";
import { join } from "node:path";
import { legalContentPublished } from "../../config/legal";
import type { LegalRouteId } from "@/i18n/routes";

export const DRAFT_MARKER = "[DA CONFERMARE]";

const locales = ["it", "de", "fr", "en"] as const;

export type LegalPublicSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

export type LegalPublicCopy = {
  title: string;
  summary: string;
  sections: LegalPublicSection[];
};

function marked(value: string): boolean {
  return value.includes(DRAFT_MARKER);
}

function filled(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "" && !marked(value);
}

export function legalCopyIsPublishable(value: unknown): value is LegalPublicCopy {
  if (!value || typeof value !== "object") return false;
  const copy = value as Partial<LegalPublicCopy>;
  if (!filled(copy.title) || !filled(copy.summary)) return false;
  if (!Array.isArray(copy.sections) || copy.sections.length === 0) return false;

  return copy.sections.every((section) => {
    if (!section || typeof section !== "object") return false;
    const item = section as Partial<LegalPublicSection>;
    if (!filled(item.title)) return false;
    if (!Array.isArray(item.paragraphs) || item.paragraphs.length === 0) return false;
    if (!item.paragraphs.every(filled)) return false;
    if (item.items === undefined) return true;
    return Array.isArray(item.items) && item.items.length > 0 && item.items.every(filled);
  });
}

export function publicLegalCopy(messages: unknown, routeId: LegalRouteId): unknown {
  if (!messages || typeof messages !== "object") return undefined;
  const legal = (messages as { Legal?: unknown }).Legal;
  if (!legal || typeof legal !== "object") return undefined;
  const published = (legal as { public?: unknown }).public;
  if (!published || typeof published !== "object") return undefined;
  return (published as Record<string, unknown>)[routeId];
}

/**
 * A route is public only when its flag is on and every locale has approved copy.
 * Draft sections under Legal.privacy, Legal.cookies and Legal.legalNotice are ignored.
 */
export function isLegalRoutePublicFrom(
  routeId: LegalRouteId,
  published: Record<LegalRouteId, boolean>,
  localeMessages: readonly unknown[],
): boolean {
  if (published[routeId] !== true) return false;
  if (localeMessages.length !== locales.length) return false;
  return localeMessages.every((messages) => legalCopyIsPublishable(publicLegalCopy(messages, routeId)));
}

let cachedMessages: unknown[] | undefined;

function loadLocaleMessages(): unknown[] {
  if (!cachedMessages) {
    cachedMessages = locales.map((locale) =>
      JSON.parse(readFileSync(join(process.cwd(), "src", "messages", `${locale}.json`), "utf8")),
    );
  }
  return cachedMessages;
}

export function isLegalRoutePublic(routeId: LegalRouteId): boolean {
  return isLegalRoutePublicFrom(routeId, legalContentPublished, loadLocaleMessages());
}
