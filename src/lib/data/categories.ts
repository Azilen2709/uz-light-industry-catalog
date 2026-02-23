import type { Category } from "./types";

export const CATEGORIES: Category[] = [
    {
        "slug": "outerwear",
        "label": "Верхняя одежда",
        "labelEn": "Outerwear",
        "industrySlug": "textile"
    },
    {
        "slug": "sportswear",
        "label": "Спортивная одежда",
        "labelEn": "Sportswear",
        "industrySlug": "textile"
    },
    {
        "slug": "knitwear",
        "label": "Трикотаж",
        "labelEn": "Knitwear",
        "industrySlug": "textile"
    },
    {
        "slug": "dresses",
        "label": "Платья и юбки",
        "labelEn": "Dresses & Skirts",
        "industrySlug": "textile"
    },
    {
        "slug": "children-wear",
        "label": "Детская одежда",
        "labelEn": "Children's Wear",
        "industrySlug": "textile"
    },
    {
        "slug": "home-textile",
        "label": "Домашний текстиль",
        "labelEn": "Home Textile",
        "industrySlug": "textile"
    },
    {
        "slug": "workwear",
        "label": "Форменная одежда",
        "labelEn": "Workwear",
        "industrySlug": "textile"
    },
    {
        "slug": "accessories",
        "label": "Аксессуары и галантерея",
        "labelEn": "Accessories",
        "industrySlug": "textile"
    },
    {
        "slug": "natural-silk",
        "label": "Натуральный шёлк",
        "labelEn": "Natural Silk",
        "industrySlug": "silk"
    },
    {
        "slug": "silk-dresses",
        "label": "Шёлковые платья и блузы",
        "labelEn": "Silk Dresses & Blouses",
        "industrySlug": "silk"
    },
    {
        "slug": "satin-fabric",
        "label": "Атласная ткань",
        "labelEn": "Satin Fabric",
        "industrySlug": "silk"
    },
    {
        "slug": "silk-scarves",
        "label": "Шарфы и платки",
        "labelEn": "Scarves & Shawls",
        "industrySlug": "silk"
    },
    {
        "slug": "ikat",
        "label": "Икат и адрас (нац. ткани)",
        "labelEn": "Ikat & Adras (Traditional)",
        "industrySlug": "silk"
    },
    {
        "slug": "leather-goods",
        "label": "Кожаные изделия",
        "labelEn": "Leather Goods",
        "industrySlug": "leather"
    },
    {
        "slug": "leather-bags",
        "label": "Сумки и кошельки",
        "labelEn": "Bags & Wallets",
        "industrySlug": "leather"
    },
    {
        "slug": "leather-jackets",
        "label": "Куртки и верхняя одежда",
        "labelEn": "Jackets & Outerwear",
        "industrySlug": "leather"
    },
    {
        "slug": "belts-accessories",
        "label": "Ремни и аксессуары",
        "labelEn": "Belts & Accessories",
        "industrySlug": "leather"
    },
    {
        "slug": "raw-leather",
        "label": "Сырьё — кожевенное полуфабрикат",
        "labelEn": "Raw Leather Material",
        "industrySlug": "leather"
    },
    {
        "slug": "mens-footwear",
        "label": "Мужская обувь",
        "labelEn": "Men's Footwear",
        "industrySlug": "footwear"
    },
    {
        "slug": "womens-footwear",
        "label": "Женская обувь",
        "labelEn": "Women's Footwear",
        "industrySlug": "footwear"
    },
    {
        "slug": "children-footwear",
        "label": "Детская обувь",
        "labelEn": "Children's Footwear",
        "industrySlug": "footwear"
    },
    {
        "slug": "sports-footwear",
        "label": "Спортивная обувь",
        "labelEn": "Sports Footwear",
        "industrySlug": "footwear"
    },
    {
        "slug": "national-footwear",
        "label": "Национальная обувь (Махси)",
        "labelEn": "National Footwear (Makhsi)",
        "industrySlug": "footwear"
    },
    {
        "slug": "handmade-carpets",
        "label": "Ковры ручной работы",
        "labelEn": "Handmade Carpets",
        "industrySlug": "carpets"
    },
    {
        "slug": "machine-carpets",
        "label": "Машинные ковры",
        "labelEn": "Machine-Made Carpets",
        "industrySlug": "carpets"
    },
    {
        "slug": "silk-carpets",
        "label": "Шёлковые ковры",
        "labelEn": "Silk Carpets",
        "industrySlug": "carpets"
    },
    {
        "slug": "carpet-runners",
        "label": "Дорожки и мини-ковры",
        "labelEn": "Runners & Small Rugs",
        "industrySlug": "carpets"
    },
    {
        "slug": "national-carpet",
        "label": "Нац. орнамент (Бухара, Самарканд)",
        "labelEn": "National Ornament (Bukhara, Samarkand)",
        "industrySlug": "carpets"
    }
];

export function findCategory(slug: string): Category | undefined { return CATEGORIES.find(c => c.slug === slug); }
export function getCategoriesByIndustry(industrySlug: string): Category[] { return CATEGORIES.filter(c => c.industrySlug === industrySlug); }
