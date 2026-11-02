"use server";

import { headers } from "next/headers";
import { getCareersMailConfig, sendCareersEmail } from "@/lib/careers/mail";
import { previewOutboundMailBlocked } from "@/lib/preview/protection";
import { processCareersSubmission, type CareersSubmitResult } from "@/lib/careers/process";
import { allowCareersSubmission } from "@/lib/careers/rate-limit";

function clientKey(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const realIp = headerList.get("x-real-ip")?.trim() ?? "";
  return forwarded || realIp || "local";
}

export async function submitCareersApplication(formData: FormData): Promise<CareersSubmitResult> {
  const headerList = await headers();
  const key = clientKey(headerList);
  const config = getCareersMailConfig();
  if (!config.ready) {
    console.error(`[careers] delivery not configured: ${config.missing.join(", ")}`);
  }

  return processCareersSubmission(formData, {
    configured: config.ready && !previewOutboundMailBlocked(),
    allow: () => allowCareersSubmission(key),
    send: sendCareersEmail,
  });
}
