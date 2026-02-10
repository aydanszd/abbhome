// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

// URL locale -> API locale xəritəsi
function mapLocaleForApi(locale: string): string {
  // Frontda "aze" işlənir, backend hələ "az" gözləyirsə, burada çevrilir
  if (locale === 'aze') return 'az';
  return locale;
}

// API-dən tərcümələri yükləyən funksiya
async function loadTranslations(locale: string) {
  const apiLocale = mapLocaleForApi(locale);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/translations/${apiLocale}`,
      {
        cache: 'force-cache', // Cache et
        next: { revalidate: 3600 } // 1 saat sonra yenilə
      }
    );

    if (!response.ok) {
      throw new Error('Translation fetch failed');
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to load translations for ${locale}:`, error);
    return {};
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  // next-intl-in tövsiyə etdiyi şəkildə locale-ni tapırıq
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales as any, requested)
    ? (requested as string)
    : (routing.defaultLocale as string);

  const messages = await loadTranslations(locale);

  return {
    locale,
    messages,
    timeZone: 'Asia/Baku',
    now: new Date()
  };
});