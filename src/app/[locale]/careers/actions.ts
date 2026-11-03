"use server";

import { headers } from "next/headers";
import { careersDeliveryAllowed } from "@/lib/careers/intake";
import { getCareersMailConfig, sendCareersEmail } from "@/lib/careers/mail";
import { processCareersSubmission, type CareersSubmitResult } from "@/lib/careers/process";
import { allowCareersSubmission } from "@/lib/careers/rate-limit";

function clientKey(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const realIp = headerList.get("x-real-ip")?.trim() ?? "";
  return forwarded || realIp || "local";
}

export async function submitCareersApplication(formData: FormData): Promise<CareersSubmitResult> {
  if (!careersDeliveryAllowed()) {
    return { status: "unavailable" };
  }

  const headerList = await headers();
  const key = clientKey(headerList);
  const config = getCareersMailConfig();
  if (!config.ready) {
    console.error(`[careers] delivery not configured: ${config.missing.join(", ")}`);
    return { status: "unavailable" };
  }

  return processCareersSubmission(formData, {
    configured: true,
    allow: () => allowCareersSubmission(key),
    send: sendCareersEmail,
  });
}
