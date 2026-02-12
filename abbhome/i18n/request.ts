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
  
  // Cache yoxla və vaxtı yoxla
  if (translationCache.has(apiLocale)) {
    const cacheTime = cacheTimestamps.get(apiLocale) || 0;
    if (now - cacheTime < CACHE_DURATION) {
      console.log(`✅ Cache hit for ${apiLocale}`);
      return translationCache.get(apiLocale);
    } else {
      console.log(`⏰ Cache expired for ${apiLocale}`);
    }
  }
  
  const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiUrl) {
    console.error('❌ API URL is not configured');
    return {};
  }

  try {
    const url = `${apiUrl}/translations/${apiLocale}`;
    console.log(`📡 Fetching translations from: ${url}`);
    
    const response = await fetch(url, {
      cache: 'no-store', // Server cache-ni söndür, öz cache-imizi istifadə edirik
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error(`❌ Translation fetch failed: ${response.status}`);
      // Köhnə cache varsa, onu qaytar
      return translationCache.get(apiLocale) || {};
    }

    const data = await response.json();
    
    // Cache-ə əlavə et
    translationCache.set(apiLocale, data);
    cacheTimestamps.set(apiLocale, now);
    console.log(`✅ Translations cached for ${apiLocale}`);
    
    return data;
    
  } catch (error) {
    console.error(`❌ Failed to load translations for ${locale}:`, error);
    // Köhnə cache varsa, onu qaytar
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