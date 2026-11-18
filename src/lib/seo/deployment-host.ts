import { PREVIEW_ROBOTS_TAG } from "../preview/protection";

const OFFICIAL_HOSTS = new Set(["casinoshow.ch", "www.casinoshow.ch"]);

export function hostnameFromHostHeader(host: string | null | undefined): string {
  const value = host?.trim().toLowerCase() ?? "";
  if (!value) return "";
  if (value.startsWith("[")) {
    const end = value.indexOf("]");
    return end > 1 ? value.slice(1, end) : "";
  }
  return value.replace(/:\d+$/, "");
}

export function isOfficialProductionHost(hostname: string): boolean {
  return OFFICIAL_HOSTS.has(hostname);
}

export function isVercelDeploymentHost(hostname: string): boolean {
  return hostname === "vercel.app" || hostname.endsWith(".vercel.app");
}

/** Noindex for Vercel deployment hosts only. Official hosts stay indexable. */
export function deploymentNoindexTag(host: string | null | undefined): typeof PREVIEW_ROBOTS_TAG | null {
  const hostname = hostnameFromHostHeader(host);
  if (!hostname || isOfficialProductionHost(hostname)) return null;
  return isVercelDeploymentHost(hostname) ? PREVIEW_ROBOTS_TAG : null;
}

export function responseRobotsTag(preview: boolean, host: string | null | undefined): typeof PREVIEW_ROBOTS_TAG | null {
  if (preview) return PREVIEW_ROBOTS_TAG;
  return deploymentNoindexTag(host);
}
