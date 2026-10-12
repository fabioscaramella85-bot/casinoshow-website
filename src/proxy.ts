import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { isKnownUnprefixedPath, locales } from "./i18n/routes";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);
const supportedLocales = new Set<string>(locales);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [firstSegment] = pathname.split("/").filter(Boolean);

  if (firstSegment && !supportedLocales.has(firstSegment)) {
    if (!isKnownUnprefixedPath(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = "/__unmatched";
      return NextResponse.rewrite(url);
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
