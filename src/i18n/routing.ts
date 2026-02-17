import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
    localeDetection: false // Force default locale for root domain
});
