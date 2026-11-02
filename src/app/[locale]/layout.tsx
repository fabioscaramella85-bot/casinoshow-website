import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { fontVariables } from "@/app/fonts";
import { messagesForClient } from "@/i18n/public-messages";
import { routing } from "@/i18n/routing";
import { previewRobotsDirective } from "@/lib/preview/protection";
import { CANONICAL_ORIGIN } from "@/i18n/site";
import "../globals.css";

export function generateMetadata(): Metadata {
  const robots = previewRobotsDirective();

  return {
    metadataBase: new URL(CANONICAL_ORIGIN),
    title: {
      default: "Casino Show",
      template: "%s · Casino Show",
    },
    icons: {
      icon: [{ url: "/loghi/favicon.png", type: "image/png", sizes: "512x512" }],
    },
    ...(robots ? { robots } : {}),
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = messagesForClient(await getMessages());

  return (
    <html lang={locale} className={`${fontVariables} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
