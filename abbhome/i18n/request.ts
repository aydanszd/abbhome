// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

// In-memory cache - server restart-da təmizlənir
const translationCache = new Map<string, any>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 dəqiqə
const cacheTimestamps = new Map<string, number>();

function mapLocaleForApi(locale: string): string {
  if (locale === 'aze') return 'az';
  return locale;
}

async function loadTranslations(locale: string) {
  const apiLocale = mapLocaleForApi(locale);
  const now = Date.now();
  
  if (translationCache.has(apiLocale)) {
    const cacheTime = cacheTimestamps.get(apiLocale) || 0;
    if (now - cacheTime < CACHE_DURATION) {
      return translationCache.get(apiLocale);
    }
  }
  
  const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiUrl) {
    console.error('❌ API URL is not configured');
    return {};
  }

  try {
    const url = `${apiUrl}/translations/${apiLocale}`;
    // Timeout: API yoxdursa və ya yavaşdırsa səhifə yenə də açılsın (30s)
    const timeoutMs = 30000;
    const response = await fetch(url, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`⚠️ No translations for "${apiLocale}" (404). Using empty messages.`);
        return translationCache.get(apiLocale) || {};
      }
      return translationCache.get(apiLocale) || {};
    }

    const data = await response.json();
    translationCache.set(apiLocale, data);
    cacheTimestamps.set(apiLocale, now);
    return data;
  } catch (error: unknown) {
    // Timeout və ya şəbəkə xətası: error çap etmə, sadəcə boş messages ilə davam et
    const isTimeout =
      error instanceof Error &&
      ('name' in error ? error.name === 'TimeoutError' : (error as { code?: number }).code === 23);
    if (isTimeout) {
      console.warn(`⚠️ Translations for "${apiLocale}" timed out. Using empty messages.`);
    }
    return translationCache.get(apiLocale) || {};
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
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