// ─── Uzbekistan regions — bilingual ───────────────────────────────────────

import type { Region } from "./types";

export const REGIONS: Region[] = [
    { slug: "tashkent", ru: "Ташкент", en: "Tashkent" },
    { slug: "fergana", ru: "Фергана", en: "Fergana" },
    { slug: "samarkand", ru: "Самарканд", en: "Samarkand" },
    { slug: "namangan", ru: "Наманган", en: "Namangan" },
    { slug: "bukhara", ru: "Бухара", en: "Bukhara" },
    { slug: "andijan", ru: "Андижан", en: "Andijan" },
];

/** Returns the display label for a region stored in Russian */
export function getRegionLabel(ruName: string, lang: "ru" | "en"): string {
    const found = REGIONS.find(r => r.ru === ruName);
    if (!found) return ruName; // fallback: return as-is
    return lang === "en" ? found.en : found.ru;
}

/** Returns all RU region names (for product data compatibility) */
export function getRegionRuNames(): string[] {
    return REGIONS.map(r => r.ru);
}
