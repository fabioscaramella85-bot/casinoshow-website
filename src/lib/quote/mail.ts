import { getCareersMailConfig } from "../careers/mail";
import { postResendMessage } from "../mail/resend";
import type { QuoteInquiry } from "./inquiry";

const eventLabels = {
  corporate: "Evento aziendale",
  dinner: "Cena aziendale",
  wedding: "Matrimonio",
  private: "Festa privata",
  gala: "Convenzione o gala",
  other: "Altro",
} as const;

const guestLabels = {
  "up-to-30": "Fino a 30",
  "30-60": "Da 30 a 60",
  "60-100": "Da 60 a 100",
  "100-200": "Da 100 a 200",
  "over-200": "Oltre 200",
  unsure: "Non indicato",
} as const;

const experienceLabels = {
  "casino-party": "Esperienza Casino Party",
  roulette: "Roulette",
  blackjack: "Blackjack",
  poker: "Poker",
  dice: "Dadi",
  "wheel-of-fortune": "Ruota della fortuna",
  "selfie-mirror": "Specchio selfie",
  "experience-360": "Esperienza 360",
  "other-games": "Altri giochi",
  recommendation: "Consigliateci voi",
} as const;

const objectiveLabels = {
  team: "Team building",
  entertainment: "Intrattenimento",
  clients: "Evento clienti",
  dinner: "Cena aziendale",
  celebration: "Celebrazione",
  other: "Altro",
} as const;

const preferenceLabels = {
  email: "Email",
  phone: "Telefono",
  whatsapp: "WhatsApp",
  none: "Nessuna preferenza",
} as const;

const referralLabels = {
  google_search: "Google / Motori di ricerca",
  ai_assistants: "ChatGPT / Altre AI",
  instagram: "Instagram",
  facebook: "Facebook",
  word_of_mouth: "Passaparola",
  previous_event: "Evento precedente",
  event_agency: "Wedding planner / Agenzia eventi",
  other: "Altro",
} as const;

const localeLabels = {
  it: "Italiano",
  de: "Tedesco",
  fr: "Francese",
  en: "Inglese",
} as const;

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

export function quoteEmailSubject(inquiry: QuoteInquiry): string {
  const name = `${inquiry.firstName} ${inquiry.lastName}`.replace(/[\r\n]+/g, " ").trim();
  return `[Casino Show] Richiesta preventivo | ${name}`.slice(0, 180);
}

export function buildQuoteEmail(inquiry: QuoteInquiry, to: string, from: string) {
  const experiences =
    inquiry.experiences.length > 0
      ? inquiry.experiences.map((id) => experienceLabels[id]).join(", ")
      : "non indicate";
  const date = inquiry.dateUndecided ? "non decisa" : inquiry.eventDate;
  const notes = inquiry.additionalNotes || "non indicate";
  const company = inquiry.company || "non indicata";
  const objective = inquiry.eventObjective ? objectiveLabels[inquiry.eventObjective] : "non indicato";
  const referral = inquiry.referralSource
    ? inquiry.referralSource === "other" && inquiry.referralSourceOther
      ? `${referralLabels.other}: ${inquiry.referralSourceOther}`
      : referralLabels[inquiry.referralSource]
    : "non indicata";

  const text = [
    "CASINO SHOW",
    "Nuova richiesta di preventivo",
    "",
    line("Nome", inquiry.firstName),
    line("Cognome", inquiry.lastName),
    line("Email", inquiry.email),
    line("Telefono", inquiry.phone),
    line("Azienda", company),
    line("Preferenza di contatto", preferenceLabels[inquiry.contactPreference]),
    "",
    line("Tipo di evento", eventLabels[inquiry.eventType]),
    line("Località", inquiry.eventLocation),
    line("Data", date),
    line("Ospiti", guestLabels[inquiry.guestRange]),
    line("Esperienze", experiences),
    line("Obiettivo", objective),
    line("Provenienza", referral),
    "",
    "Note:",
    notes,
    "",
    line("Lingua del modulo", localeLabels[inquiry.locale]),
    line("Data e ora della richiesta", inquiry.submittedAt),
  ].join("\n");

  const html = `<div>
<p><strong>CASINO SHOW</strong><br />Nuova richiesta di preventivo</p>
${htmlLine("Nome", inquiry.firstName)}
${htmlLine("Cognome", inquiry.lastName)}
${htmlLine("Email", inquiry.email)}
${htmlLine("Telefono", inquiry.phone)}
${htmlLine("Azienda", company)}
${htmlLine("Preferenza di contatto", preferenceLabels[inquiry.contactPreference])}
${htmlLine("Tipo di evento", eventLabels[inquiry.eventType])}
${htmlLine("Località", inquiry.eventLocation)}
${htmlLine("Data", date)}
${htmlLine("Ospiti", guestLabels[inquiry.guestRange])}
${htmlLine("Esperienze", experiences)}
${htmlLine("Obiettivo", objective)}
${htmlLine("Provenienza", referral)}
${htmlBlock("Note", notes)}
${htmlLine("Lingua del modulo", localeLabels[inquiry.locale])}
${htmlLine("Data e ora della richiesta", inquiry.submittedAt)}
</div>`;

  return {
    subject: quoteEmailSubject(inquiry),
    text,
    html,
    replyTo: inquiry.email,
    to,
    from,
  };
}

export async function sendQuoteEmail(inquiry: QuoteInquiry): Promise<"sent" | "error"> {
  const config = getCareersMailConfig();
  if (!config.ready) {
    console.error(`[quote] delivery not configured: ${config.missing.join(", ")}`);
    return "error";
  }

  const message = buildQuoteEmail(inquiry, config.to, config.from);
  return postResendMessage(
    config.apiKey,
    {
      from: message.from,
      to: message.to,
      replyTo: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
    },
    "quote",
  );
}
