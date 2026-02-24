import type { Category } from "./types";

export const CATEGORIES: (Category & { code: string })[] = [
    { slug: "apparel-men", code: "A1.1", label: "Мужская одежда", labelEn: "Men's Apparel", industrySlug: "textile" },
    { slug: "apparel-women", code: "A1.1", label: "Женская одежда", labelEn: "Women's Apparel", industrySlug: "textile" },
    { slug: "outerwear", code: "A1.1.1", label: "Верхняя одежда", labelEn: "Outerwear", industrySlug: "textile" },
    { slug: "sportswear", code: "A1.1.4", label: "Спортивная одежда", labelEn: "Sportswear", industrySlug: "textile" },
    { slug: "knitwear", code: "A1.1.6", label: "Трикотаж", labelEn: "Knitwear", industrySlug: "textile" },
    { slug: "home-textile", code: "A1.2", label: "Домашний текстиль", labelEn: "Home Textile", industrySlug: "textile" },
    { slug: "workwear", code: "A1.1.5", label: "Форменная одежда", labelEn: "Workwear / Uniforms", industrySlug: "textile" },
    { slug: "silk-fabric", code: "A2.1", label: "Шёлковые ткани", labelEn: "Silk Fabrics", industrySlug: "silk" },
    { slug: "silk-apparel", code: "A2.2", label: "Одежда из шёлка", labelEn: "Silk Apparel", industrySlug: "silk" },
    { slug: "silk-accessories", code: "A2.3", label: "Шёлковые аксессуары", labelEn: "Silk Accessories", industrySlug: "silk" },
    { slug: "leather-bags", code: "A3.1", label: "Сумки и рюкзаки", labelEn: "Bags & Backpacks", industrySlug: "leather" },
    { slug: "leather-accessories", code: "A3.2", label: "Мелкая галантерея", labelEn: "Small Leather Goods", industrySlug: "leather" },
    { slug: "leather-belts", code: "A3.3", label: "Ремни", labelEn: "Belts", industrySlug: "leather" },
    { slug: "shoes-classic", code: "A4.1", label: "Классическая обувь", labelEn: "Classic Footwear", industrySlug: "footwear" },
    { slug: "shoes-casual", code: "A4.2", label: "Повседневная обувь", labelEn: "Casual Footwear", industrySlug: "footwear" },
    { slug: "shoes-sport", code: "A4.3", label: "Спортивная обувь", labelEn: "Sport Footwear", industrySlug: "footwear" },
    { slug: "shoes-special", code: "A4.5", label: "Спецобувь", labelEn: "Specialized Footwear", industrySlug: "footwear" },
    { slug: "home-carpets", code: "A5.1", label: "Ковры для дома", labelEn: "Home Carpets", industrySlug: "carpets" },
    { slug: "contract-carpets", code: "A5.2", label: "Контрактные ковры (Отели/Офисы)", labelEn: "Contract Carpets (Hotel/Office)", industrySlug: "carpets" },
    { slug: "handmade-carpets", code: "A5.1.4", label: "Ковры ручной работы", labelEn: "Handmade Carpets", industrySlug: "carpets" },
];

export function findCategory(slug: string): Category | undefined { return CATEGORIES.find(c => c.slug === slug); }
export function getCategoriesByIndustry(industrySlug: string): Category[] { return CATEGORIES.filter(c => c.industrySlug === industrySlug); }
