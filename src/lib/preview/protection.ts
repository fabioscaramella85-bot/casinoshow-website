/**
 * Public preview mode for a deployment that is not casinoshow.ch.
 * Production leaves CASINO_SHOW_PREVIEW_MODE unset.
 * The flag is read at build time and again at runtime. It never asks for a password.
 */

export const PREVIEW_PROTECTION_HEADER = "X-Robots-Tag";
export const PREVIEW_ROBOTS_TAG = "noindex, nofollow";

type PreviewEnv = Record<string, string | undefined>;

export function previewModeEnabled(env: PreviewEnv = process.env): boolean {
  return env.CASINO_SHOW_PREVIEW_MODE === "enabled";
}

export function previewProtectionEnabled(env: PreviewEnv = process.env): boolean {
  return previewModeEnabled(env);
}

/** Real Resend delivery stays off for the whole preview deployment. */
export function previewOutboundMailBlocked(env: PreviewEnv = process.env): boolean {
  return previewModeEnabled(env);
}

export function previewRobotsDirective(
  env: PreviewEnv = process.env,
): { index: false; follow: false } | undefined {
  return previewModeEnabled(env) ? { index: false, follow: false } : undefined;
}
