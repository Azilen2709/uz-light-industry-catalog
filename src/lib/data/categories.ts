// ─── Product categories (aligned with taxonomy.ts subcategories) ──────────

import type { Category } from "./types";

export const CATEGORIES: Category[] = [
    { slug: "outerwear", label: "Верхняя одежда", labelEn: "Outerwear" },
    { slug: "dresses", label: "Платья и юбки", labelEn: "Dresses & Skirts" },
    { slug: "footwear", label: "Обувь", labelEn: "Footwear" },
    { slug: "home-textile", label: "Домашний текстиль", labelEn: "Home Textile" },
    { slug: "knitwear", label: "Трикотаж", labelEn: "Knitwear" },
    { slug: "accessories", label: "Аксессуары", labelEn: "Accessories" },
    { slug: "carpets", label: "Ковры", labelEn: "Carpets" },
    { slug: "workwear", label: "Форменная одежда", labelEn: "Workwear" },
];
