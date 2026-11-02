import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const previewProtection = process.env.CASINO_SHOW_PREVIEW_PROTECTION === "enabled";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80, 85],
    // The image optimizer fetches local files through the server without the
    // caller's Authorization header. In preview that internal fetch is blocked,
    // so the preview build serves the original files. Production keeps optimization.
    ...(previewProtection ? { unoptimized: true } : {}),
  },
  experimental: {
    globalNotFound: true,
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
