export const i18n = {
    defaultLocale: 'ar',
    locales: ['ar', 'en'] as const,
} as const;

export type Lang = (typeof i18n.locales)[number];

export function isValidLocale(locale: string): locale is Lang {
    return i18n.locales.includes(locale as Lang);
}

export function getDirection(locale: Lang) {
    return locale === 'ar' ? 'rtl' : 'ltr';
}