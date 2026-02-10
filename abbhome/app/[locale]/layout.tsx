import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales as any, locale)) {
    notFound();
  }

  // next-intl üçün request locale-ni qur
  setRequestLocale(locale);

  // HTML/BODY artıq kök layout-dadır; burada yalnız intl provider var
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}


