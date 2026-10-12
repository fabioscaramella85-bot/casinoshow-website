/**
 * Future statuses exist so a delivery adapter can be added later.
 * Phase 10 may only report "unconfigured". Nothing in this module
 * sends, stores or logs a quote.
 */
export type QuoteSubmissionStatus = "unconfigured" | "ready" | "submitting" | "success" | "error";

export function quoteSubmissionStatus(): QuoteSubmissionStatus {
  return "unconfigured";
}

export function canTransmitQuote(): boolean {
  return false;
}
