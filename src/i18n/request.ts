import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import path from 'path';
import fs from 'fs';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = routing.locales.includes(requested as 'en' | 'fi')
    ? (requested as string)
    : routing.defaultLocale || 'en';

  const messagesPath = path.join(process.cwd(), 'messages', `${locale}.json`);
  const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf-8'));

  return {
    locale,
    messages,
  };
});