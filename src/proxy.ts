import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { isKnownUnprefixedPath, locales } from "./i18n/routes";
import { routing } from "./i18n/routing";
import { deploymentNoindexTag } from "./lib/seo/deployment-host";
import {
  PREVIEW_PROTECTION_HEADER,
  PREVIEW_ROBOTS_TAG,
  previewModeEnabled,
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
  if (!previewModeEnabled()) {
    return response;
  }

  const location = response.headers.get("location");
  if (response.headers.has("x-middleware-rewrite") && location && sameRequestPath(location, request)) {
    response.headers.delete("location");
  }

  response.headers.set(PREVIEW_PROTECTION_HEADER, PREVIEW_ROBOTS_TAG);
  return response;
}

function seal(response: NextResponse, request: NextRequest): NextResponse {
  const marked = markPreview(response, request);
  if (previewModeEnabled()) return marked;

  const tag = deploymentNoindexTag(request.headers.get("host"));
  if (tag) marked.headers.set(PREVIEW_PROTECTION_HEADER, tag);
  return marked;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (previewModeEnabled() && pathname === "/robots.txt") {
    return seal(
      new NextResponse(PREVIEW_ROBOTS_BODY, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }),
      request,
    );
  }

  if (previewModeEnabled() && pathname === "/sitemap.xml") {
    return seal(
      new NextResponse(PREVIEW_SITEMAP_BODY, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
      }),
      request,
    );
  }

  if (isFileRequest(pathname)) {
    return seal(NextResponse.next(), request);
  }

  const [firstSegment] = pathname.split("/").filter(Boolean);

  if (firstSegment && !supportedLocales.has(firstSegment)) {
    if (!isKnownUnprefixedPath(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = "/__unmatched";
      return seal(NextResponse.rewrite(url), request);
    }
  }

  return seal(handleI18nRouting(request), request);
}
