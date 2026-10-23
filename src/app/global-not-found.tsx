import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fontVariables } from "@/app/fonts";
import { locales } from "@/i18n/routes";
import "./globals.css";

export const metadata: Metadata = {
  title: "404",
  robots: {
    index: false,
    follow: false,
  },
};

const messages = {
  it: "Pagina non trovata.",
  de: "Seite nicht gefunden.",
  fr: "Page introuvable.",
  en: "Page not found.",
} as const;

export default function GlobalNotFound() {
  return (
    <html lang="it" className={`${fontVariables} h-full`}>
      <body className="flex min-h-full flex-col bg-ivory px-4 py-16 font-sans text-midnight antialiased">
        <main className="mx-auto w-full max-w-xl">
          <Link href="/it" className="inline-flex">
            <Image
              src="/loghi/logo-header.png"
              alt="Casino Show"
              width={1600}
              height={437}
              className="h-10 w-auto"
            />
          </Link>
          <h1 className="type-h1 mt-8">404</h1>
          <ul className="mt-6 flex flex-col gap-3">
            {locales.map((locale) => (
              <li key={locale}>
                <p lang={locale}>{messages[locale]}</p>
                <a className="underline" href={`/${locale}`} hrefLang={locale} lang={locale}>
                  {locale.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  );
}
