import type { MetadataRoute } from "next";
import { CANONICAL_ORIGIN } from "@/i18n/site";
import { previewProtectionEnabled } from "@/lib/preview/protection";

/**
 * Public robots for casinoshow.ch.
 * Preview deployments keep the disallow response from src/proxy.ts.
 * This route is the production file when that short-circuit is off.
 */
export default function robots(): MetadataRoute.Robots {
  if (previewProtectionEnabled()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${CANONICAL_ORIGIN}/sitemap.xml`,
  };
}
