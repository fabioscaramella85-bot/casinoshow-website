"use server";

import { headers } from "next/headers";
import { getCareersMailConfig } from "@/lib/careers/mail";
import { sendQuoteEmail } from "@/lib/quote/mail";
import { processQuoteSubmission, type QuoteSubmitResult } from "@/lib/quote/process";
import { allowQuoteSubmission } from "@/lib/quote/rate-limit";
import { previewOutboundMailBlocked } from "@/lib/preview/protection";
import { quoteSendingEnabled } from "@/lib/quote/submission";

function clientKey(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const realIp = headerList.get("x-real-ip")?.trim() ?? "";
  return forwarded || realIp || "local";
}

export async function submitQuoteRequest(formData: FormData): Promise<QuoteSubmitResult> {
  if (previewOutboundMailBlocked() || !quoteSendingEnabled()) {
    return { status: "unavailable" };
  }

  const headerList = await headers();
  const config = getCareersMailConfig();
  if (!config.ready) {
    console.error(`[quote] delivery not configured: ${config.missing.join(", ")}`);
  }

  return processQuoteSubmission(formData, {
    enabled: true,
    configured: config.ready,
    allow: () => allowQuoteSubmission(clientKey(headerList)),
    send: sendQuoteEmail,
  });
}
