import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Preview lock for every host of a deployment, including *.vercel.app.
 * Production leaves CASINO_SHOW_PREVIEW_PROTECTION unset.
 * The password never leaves this module and is never written to a log.
 */

export const PREVIEW_PROTECTION_HEADER = "X-Robots-Tag";
export const PREVIEW_ROBOTS_TAG = "noindex, nofollow";
const MINIMUM_PASSWORD_LENGTH = 12;

type PreviewEnv = Record<string, string | undefined>;

export type PreviewGate =
  | { state: "off" }
  | { state: "misconfigured" }
  | { state: "ready"; user: string; password: string };

export type PreviewAccess = "allow" | "challenge" | "unavailable";

function digest(value: string): Buffer {
  return createHash("sha256").update(value, "utf8").digest();
}

function sameSecret(left: string, right: string): boolean {
  return timingSafeEqual(digest(left), digest(right));
}

export function readPreviewGate(env: PreviewEnv = process.env): PreviewGate {
  if (env.CASINO_SHOW_PREVIEW_PROTECTION !== "enabled") {
    return { state: "off" };
  }

  const user = env.CASINO_SHOW_PREVIEW_USER ?? "";
  const password = env.CASINO_SHOW_PREVIEW_PASSWORD ?? "";
  const userInvalid = user.length === 0 || user.includes(":") || /[\r\n]/.test(user);
  const passwordInvalid = password.length < MINIMUM_PASSWORD_LENGTH || /[\r\n]/.test(password);

  if (userInvalid || passwordInvalid) {
    return { state: "misconfigured" };
  }

  return { state: "ready", user, password };
}

export function previewProtectionEnabled(env: PreviewEnv = process.env): boolean {
  return readPreviewGate(env).state !== "off";
}

/** Real Resend delivery stays off for the whole preview deployment. */
export function previewOutboundMailBlocked(env: PreviewEnv = process.env): boolean {
  return previewProtectionEnabled(env);
}

export function previewAuthorizationMatches(
  authorization: string | null,
  user: string,
  password: string,
): boolean {
  if (!authorization?.startsWith("Basic ")) {
    return false;
  }

  let decoded = "";
  try {
    decoded = Buffer.from(authorization.slice("Basic ".length).trim(), "base64").toString("utf8");
  } catch {
    decoded = "";
  }

  const separator = decoded.indexOf(":");
  const givenUser = separator >= 0 ? decoded.slice(0, separator) : "";
  const givenPassword = separator >= 0 ? decoded.slice(separator + 1) : "";
  const userMatches = sameSecret(givenUser, user);
  const passwordMatches = sameSecret(givenPassword, password);
  return userMatches && passwordMatches;
}

export function previewAccessDecision(
  authorization: string | null,
  env: PreviewEnv = process.env,
): PreviewAccess {
  const gate = readPreviewGate(env);
  if (gate.state === "off") return "allow";
  if (gate.state === "misconfigured") return "unavailable";
  return previewAuthorizationMatches(authorization, gate.user, gate.password) ? "allow" : "challenge";
}

export function previewRobotsDirective(env: PreviewEnv = process.env): { index: false; follow: false } | undefined {
  return previewProtectionEnabled(env) ? { index: false, follow: false } : undefined;
}
