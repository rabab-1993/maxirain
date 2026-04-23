import 'server-only';
import type { Lang } from './config';

const dictionaries = {
    ar: () => import('../app/dictionaries/ar.json').then((module) => module.default),
    en: () => import('../app/dictionaries/en.json').then((module) => module.default),
};

export async function getDictionary(lang: Lang) {
    return dictionaries[lang]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;