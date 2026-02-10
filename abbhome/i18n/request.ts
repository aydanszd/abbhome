import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as any)) {
    return {
      messages: {}
    };
  }

  return {
    messages: {},
    timeZone: 'Asia/Baku',
    now: new Date()
  };
});