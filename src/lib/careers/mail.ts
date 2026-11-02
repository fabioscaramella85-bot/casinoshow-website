import { postResendMessage } from "../mail/resend";
import type { CareersInquiry } from "./inquiry";
import type { CareerExperience, CareerLocale } from "./schema";

/**
 * Direct delivery through Resend's HTTPS API. Same approach as Fun Casinò,
 * with Casino Show credentials only. The CV stays in memory for this request.
 */

const experienceLabels: Record<CareerExperience, string> = {
  none: "Nessuna esperienza",
  lt1: "Meno di 1 anno",
  y1_3: "Da 1 a 3 anni",
  y3_5: "Da 3 a 5 anni",
  gt5: "Oltre 5 anni",
};

const countryLabels = {
  ch: "Svizzera",
  it: "Italia",
  fr: "Francia",
  de: "Germania",
  at: "Austria",
  other: "Altro",
} as const;

const gameLabels = {
  roulette: "Roulette",
  blackjack: "Blackjack",
  poker: "Poker",
  other: "Altri giochi",
} as const;

const regionLabels = {
  ticino: "Ticino",
  german: "Svizzera tedesca",
  french: "Svizzera francese",
  all: "Tutta la Svizzera",
} as const;

const availabilityLabels = {
  weekdays: "Giorni feriali",
  weekend: "Fine settimana",
  evening: "Orari serali",
  variable: "Disponibilità variabile",
} as const;

const languageLabels = {
  it: "Italiano",
  de: "Tedesco",
  fr: "Francese",
  en: "Inglese",
  other: "Altre lingue",
} as const;

const localeLabels: Record<CareerLocale, string> = {
  it: "Italiano",
  de: "Tedesco",
  fr: "Francese",
  en: "Inglese",
};

const plainEmail = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const namedEmail = /^[^<>\r\n]+ <[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>$/;

export type CareersMailConfig =
  | { ready: true; apiKey: string; from: string; to: string }
  | { ready: false; missing: string[] };

export type CareersEmail = {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
  to: string;
  from: string;
  filename: string;
  contentType: string;
  attachment: string;
};

export function getCareersMailConfig(
  env: NodeJS.ProcessEnv = process.env,
): CareersMailConfig {
  const apiKey = env.RESEND_API_KEY?.trim() ?? "";
  const from = env.CASINO_SHOW_EMAIL_FROM?.trim() ?? "";
  const to = env.CASINO_SHOW_EMAIL_TO?.trim() ?? "";
  const missing: string[] = [];

  if (!apiKey) missing.push("RESEND_API_KEY");
  if (!from || from.includes("\n") || from.includes("\r") || (!plainEmail.test(from) && !namedEmail.test(from))) {
    missing.push("CASINO_SHOW_EMAIL_FROM");
  }
  if (!to || !plainEmail.test(to)) missing.push("CASINO_SHOW_EMAIL_TO");

  if (missing.length > 0 || !apiKey) {
    return { ready: false, missing: [...new Set(missing)] };
  }

  return { ready: true, apiKey, from, to };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function line(label: string, value: string): string {
  return `${label}: ${value}`;
}

function htmlLine(label: string, value: string): string {
  return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`;
}

function htmlBlock(label: string, value: string): string {
  return `<p><strong>${escapeHtml(label)}:</strong></p><p>${escapeHtml(value).replaceAll("\n", "<br />")}</p>`;
}

export function formatCareersStamp(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }
  const formatted = new Intl.DateTimeFormat("it-CH", {
    timeZone: "Europe/Zurich",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
  return `${formatted} (Europe/Zurich)`;
}

export function formatBirthDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) {
    return "non indicata";
  }
  return `${match[3]}.${match[2]}.${match[1]}`;
}

function listLabels<T extends string>(
  values: readonly T[],
  labels: Record<T, string>,
  empty: string,
): string {
  if (values.length === 0) {
    return empty;
  }
  return values.map((value) => labels[value]).join(", ");
}

export function careersEmailSubject(inquiry: CareersInquiry): string {
  const name = `${inquiry.firstName} ${inquiry.lastName}`.replace(/[\r\n]+/g, " ").trim();
  return `[Casino Show] Nuova candidatura | ${name}`.slice(0, 180);
}

export function buildCareersEmail(inquiry: CareersInquiry, to: string, from: string): CareersEmail {
  const games = listLabels(inquiry.games, gameLabels, "non indicati");
  const regions = listLabels(inquiry.regions, regionLabels, "non indicate");
  const availability = listLabels(inquiry.availability, availabilityLabels, "non indicata");
  const languages = listLabels(inquiry.languages, languageLabels, "non indicate");
  const hospitality = inquiry.hospitality || "non indicata";
  const birthDate = inquiry.birthDate ? formatBirthDate(inquiry.birthDate) : "non indicata";
  const submitted = formatCareersStamp(inquiry.submittedAt);
  const consent = formatCareersStamp(inquiry.consentedAt);

  const text = [
    "CASINO SHOW",
    "Nuova candidatura spontanea",
    "",
    line("Nome", inquiry.firstName),
    line("Cognome", inquiry.lastName),
    line("Email", inquiry.email),
    line("Telefono", inquiry.phone),
    line("Località di residenza", inquiry.locality),
    line("Paese di residenza", countryLabels[inquiry.country]),
    line("Data di nascita", birthDate),
    "",
    line("Esperienza come croupier", experienceLabels[inquiry.experience]),
    line("Giochi conosciuti", games),
    "",
    "Esperienza in eventi, hospitality o contatto con il pubblico:",
    hospitality,
    "",
    line("Zone di disponibilità", regions),
    line("Disponibilità indicativa", availability),
    line("Lingue parlate", languages),
    "",
    "Breve presentazione:",
    inquiry.presentation,
    "",
    line("Data e ora della candidatura", submitted),
    line("Lingua del modulo", localeLabels[inquiry.locale]),
    line("Consenso privacy", "sì"),
    line("Consenso registrato", consent),
    line("Curriculum", `${inquiry.cv.filename} (${inquiry.cv.contentType}, ${inquiry.cv.size} byte)`),
  ].join("\n");

  const html = `<div>
<p><strong>CASINO SHOW</strong><br />Nuova candidatura spontanea</p>
${htmlLine("Nome", inquiry.firstName)}
${htmlLine("Cognome", inquiry.lastName)}
${htmlLine("Email", inquiry.email)}
${htmlLine("Telefono", inquiry.phone)}
${htmlLine("Località di residenza", inquiry.locality)}
${htmlLine("Paese di residenza", countryLabels[inquiry.country])}
${htmlLine("Data di nascita", birthDate)}
${htmlLine("Esperienza come croupier", experienceLabels[inquiry.experience])}
${htmlLine("Giochi conosciuti", games)}
${htmlBlock("Esperienza in eventi, hospitality o contatto con il pubblico", hospitality)}
${htmlLine("Zone di disponibilità", regions)}
${htmlLine("Disponibilità indicativa", availability)}
${htmlLine("Lingue parlate", languages)}
${htmlBlock("Breve presentazione", inquiry.presentation)}
${htmlLine("Data e ora della candidatura", submitted)}
${htmlLine("Lingua del modulo", localeLabels[inquiry.locale])}
${htmlLine("Consenso privacy", "sì")}
${htmlLine("Consenso registrato", consent)}
${htmlLine("Curriculum", `${inquiry.cv.filename} (${inquiry.cv.contentType})`)}
</div>`;

  return {
    subject: careersEmailSubject(inquiry),
    text,
    html,
    replyTo: inquiry.email,
    to,
    from,
    filename: inquiry.cv.filename,
    contentType: inquiry.cv.contentType,
    attachment: Buffer.from(inquiry.cv.bytes).toString("base64"),
  };
}

export async function sendCareersEmail(inquiry: CareersInquiry): Promise<"sent" | "error"> {
  const config = getCareersMailConfig();
  if (!config.ready) {
    console.error(`[careers] delivery not configured: ${config.missing.join(", ")}`);
    return "error";
  }

  const message = buildCareersEmail(inquiry, config.to, config.from);

  return postResendMessage(
    config.apiKey,
    {
      from: message.from,
      to: message.to,
      replyTo: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
      attachments: [
        {
          filename: message.filename,
          content: message.attachment,
          content_type: message.contentType,
        },
      ],
    },
    "careers",
  );
}
