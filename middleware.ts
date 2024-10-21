import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";
import { getSession } from "@/lib/auth"; // Import your getSession function

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );
  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Authentication logic: Apply to language-prefixed protected routes
  const protectedRoutes = ["/dashboard", "/profile"]; // Define your protected routes
  const localeRegex = new RegExp(`^/(${i18n.locales.join("|")})`);

  // Check if the request contains a locale prefix and a protected route
  const localeMatch = pathname.match(localeRegex);
  const hasLocalePrefix = localeMatch && localeMatch[0];

  if (hasLocalePrefix) {
    const pathWithoutLocale = pathname.replace(localeRegex, "");

    if (protectedRoutes.some((route) => pathWithoutLocale.includes(route))) {
      // Check if the user is authenticated
      const session = await getSession();

      if (!session) {
        // Redirect to login with the same locale
        const locale = localeMatch[1];
        return NextResponse.redirect(
          new URL(`/${locale}/sign-in`, request.url)
        );
      }
    }
  }

  // Locale check remains the same
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }

  // Continue with request
  return NextResponse.next();
}

export const config = {
  // Matcher ignoring API, Next.js files, and static assets
  matcher: [
    "/((?!api|_next/static|_next/image|images|content|favicon.ico|robots.txt|sitemap.xml|logo.png|white-logo.png|images/|logos/).*)",
  ],
};
