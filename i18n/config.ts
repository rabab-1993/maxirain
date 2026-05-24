export const i18n = {
  defaultLocale: "ar",
  languages: ["ar", "en"] as const,
} as const;

export type Lang = (typeof i18n.languages)[number];

export function isValidLocale(language: string): language is Lang {
  return i18n.languages.includes(language as Lang);
}

export function getDirection(language: Lang) {
  return language === "ar" ? "rtl" : "ltr";
}
