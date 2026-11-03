import { isLegalContentPublished } from "../../config/legal";
import { getCareersMailConfig } from "../careers/mail";

/**
 * Quote delivery stays off unless CASINO_SHOW_QUOTE_DELIVERY is exactly "enabled".
 * Resend credentials alone do not turn it on. Nothing here sends mail.
 */
export type QuoteSubmissionStatus = "unconfigured" | "ready" | "submitting" | "success" | "error";

export function quoteSendingEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.CASINO_SHOW_QUOTE_DELIVERY === "enabled";
}

export function canTransmitQuote(env: NodeJS.ProcessEnv = process.env): boolean {
  return quoteSendingEnabled(env) && isLegalContentPublished("privacy") && getCareersMailConfig(env).ready;
}

export function quoteSubmissionStatus(env: NodeJS.ProcessEnv = process.env): QuoteSubmissionStatus {
  return canTransmitQuote(env) ? "ready" : "unconfigured";
}
