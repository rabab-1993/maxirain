import type { Dictionary } from './dictionaries';

export function getNestedValue(obj: Record<string, any>, path: string) {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

export function createTranslator(dictionary: Dictionary) {
    return function t(key: string): string {
        const value = getNestedValue(dictionary, key);
        return typeof value === 'string' ? value : key;
    };
}