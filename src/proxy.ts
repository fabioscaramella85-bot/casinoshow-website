import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { isKnownUnprefixedPath, locales } from "./i18n/routes";
import { routing } from "./i18n/routing";
import {
  PREVIEW_PROTECTION_HEADER,
  PREVIEW_ROBOTS_TAG,
  previewAccessDecision,
  previewProtectionEnabled,
} from "./lib/preview/protection";

const handleI18nRouting = createMiddleware(routing);
const supportedLocales = new Set<string>(locales);

const PREVIEW_ROBOTS_BODY = "User-agent: *\nDisallow: /\n";
const PREVIEW_SITEMAP_BODY =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n';

/**
 * No matcher on purpose. Next.js 16 runs this proxy on every request,
 * including public files, /_next/static and /_next/image, only when the
 * matcher is omitted. A negative matcher would leave those assets public.
 */

function isFileRequest(pathname: string): boolean {
  if (pathname.startsWith("/_next/") || pathname.startsWith("/_vercel")) {
    return true;
  }
  const leaf = pathname.split("/").pop() ?? "";
  return leaf.includes(".");
}

function sameRequestPath(location: string, request: NextRequest): boolean {
  try {
    return new URL(location, request.url).pathname === request.nextUrl.pathname;
  } catch {
    return false;
  }
}

function markPreview(response: NextResponse, request: NextRequest): NextResponse {
  if (!previewProtectionEnabled()) {
    return response;
  }

  const location = response.headers.get("location");
  if (response.headers.has("x-middleware-rewrite") && location && sameRequestPath(location, request)) {
    response.headers.delete("location");
  }

  response.headers.set(PREVIEW_PROTECTION_HEADER, PREVIEW_ROBOTS_TAG);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Authorization");
  return response;
}

function previewChallenge(status: 401 | 503): NextResponse {
  const headers = new Headers({
    [PREVIEW_PROTECTION_HEADER]: PREVIEW_ROBOTS_TAG,
    "Cache-Control": "no-store",
    "Content-Type": "text/plain; charset=utf-8",
  });
  if (status === 401) {
    headers.set("WWW-Authenticate", 'Basic realm="Casino Show preview", charset="UTF-8"');
  }
  const body = status === 401 ? "Authentication required." : "Preview access is unavailable.";
  return new NextResponse(body, { status, headers });
}

export default function proxy(request: NextRequest) {
  const decision = previewAccessDecision(request.headers.get("authorization"));
  if (decision === "unavailable") {
    return previewChallenge(503);
  }
  if (decision === "challenge") {
    return previewChallenge(401);
  }

  const { pathname } = request.nextUrl;

  if (previewProtectionEnabled() && pathname === "/robots.txt") {
    return markPreview(
      new NextResponse(PREVIEW_ROBOTS_BODY, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }),
      request,
    );
  }

  if (previewProtectionEnabled() && pathname === "/sitemap.xml") {
    return markPreview(
      new NextResponse(PREVIEW_SITEMAP_BODY, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
      }),
      request,
    );
  }

  if (isFileRequest(pathname)) {
    return markPreview(NextResponse.next(), request);
  }

  const [firstSegment] = pathname.split("/").filter(Boolean);

  if (firstSegment && !supportedLocales.has(firstSegment)) {
    if (!isKnownUnprefixedPath(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = "/__unmatched";
      return markPreview(NextResponse.rewrite(url), request);
    }
  }

  return markPreview(handleI18nRouting(request), request);
}
