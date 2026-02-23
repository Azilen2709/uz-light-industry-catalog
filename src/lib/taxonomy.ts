// Multi-level Industry Taxonomy for UZ Light Industry Catalog

export interface SizeTable {
    type: "clothing" | "footwear" | "carpet" | "fabric" | "none";
    label: { ru: string; en: string };
}

export interface SubCategory {
    slug: string;
    label: { ru: string; en: string };
    sizeTable: SizeTable["type"];
    icon: string;
}

export interface IndustryCategory {
    slug: string;
    label: { ru: string; en: string };
    icon: string;
    color: string;
    subcategories: SubCategory[];
}

// ─── Size Tables ──────────────────────────────────────────

export const SIZE_TABLES = {
    clothing: {
        label: { ru: "Таблица размеров одежды", en: "Clothing Size Chart" },
        columns: ["EU", "RU", "US", "UK", "Грудь (см) / Chest (cm)", "Талия (см) / Waist (cm)"],
        rows: [
            ["XS", "42", "0 / XS", "6", "82–84", "60–62"],
            ["S", "44", "2 / S", "8", "86–88", "64–66"],
            ["M", "46", "4 / M", "10", "90–92", "68–70"],
            ["L", "48", "6 / L", "12", "94–96", "72–74"],
            ["XL", "50", "8 / XL", "14", "98–100", "76–78"],
            ["2XL", "52", "10 / 2XL", "16", "102–106", "80–84"],
            ["3XL", "54", "12 / 3XL", "18", "108–114", "86–92"],
        ],
    },
    footwear: {
        label: { ru: "Таблица размеров обуви", en: "Footwear Size Chart" },
        columns: ["EU", "RU", "US (M)", "US (W)", "UK", "Длина стельки (мм)"],
        rows: [
            ["36", "36", "4", "5.5", "3", "230"],
            ["37", "37", "4.5", "6", "3.5", "237"],
            ["38", "38", "5.5", "7", "4.5", "244"],
            ["39", "39", "6.5", "8", "5.5", "251"],
            ["40", "40", "7", "8.5", "6", "258"],
            ["41", "41", "8", "9.5", "7", "265"],
            ["42", "42", "8.5", "10", "7.5", "272"],
            ["43", "43", "9.5", "11", "8.5", "279"],
            ["44", "44", "10", "11.5", "9", "286"],
            ["45", "45", "11", "12.5", "10", "293"],
        ],
    },
    carpet: {
        label: { ru: "Стандартные размеры ковров", en: "Standard Carpet Sizes" },
        columns: [
            "Размер / Size",
            "Назначение (RU)",
            "Use (EN)",
            "Площадь (м²) / Area (sqm)",
        ],
        rows: [
            ["0.6 × 1.1 м", "Прикроватный", "Bedside", "0.66"],
            ["0.8 × 1.5 м", "Дорожка", "Runner", "1.20"],
            ["1.2 × 1.8 м", "Малый", "Small", "2.16"],
            ["1.6 × 2.3 м", "Средний", "Medium", "3.68"],
            ["2.0 × 3.0 м", "Стандартный", "Standard", "6.00"],
            ["2.5 × 3.5 м", "Большой", "Large", "8.75"],
            ["3.0 × 4.0 м", "Гостиная XL", "Living Room XL", "12.00"],
            ["По ТЗ", "Индивидуальный", "Custom", "—"],
        ],
    },
    fabric: {
        label: { ru: "Фасовка тканей", en: "Fabric Roll Specs" },
        columns: [
            "Ширина / Width",
            "Длина рулона / Roll Length",
            "Плотность / GSM",
            "МЗК / MOQ",
        ],
        rows: [
            ["90 см", "50–100 м", "80–120 г/м²", "50 м"],
            ["110 см", "50–100 м", "120–180 г/м²", "50 м"],
            ["140 см", "30–50 м", "150–220 г/м²", "30 м"],
            ["150 см", "30–50 м", "180–280 г/м²", "30 м"],
            ["160 см", "20–40 м", "220–350 г/м²", "20 м"],
        ],
    },
    none: {
        label: { ru: "", en: "" },
        columns: [],
        rows: [],
    },
} as const;

// ─── Industry Taxonomy ────────────────────────────────────

export const INDUSTRY_TAXONOMY: IndustryCategory[] = [
    {
        slug: "textile",
        label: { ru: "Текстиль", en: "Textile" },
        icon: "🧵",
        color: "#3b82f6",
        subcategories: [
            {
                slug: "outerwear",
                label: { ru: "Верхняя одежда", en: "Outerwear" },
                sizeTable: "clothing",
                icon: "🧥",
            },
            {
                slug: "sportswear",
                label: { ru: "Спортивная одежда", en: "Sportswear" },
                sizeTable: "clothing",
                icon: "🏃",
            },
            {
                slug: "knitwear",
                label: { ru: "Трикотаж", en: "Knitwear" },
                sizeTable: "clothing",
                icon: "🧶",
            },
            {
                slug: "dresses",
                label: { ru: "Платья и юбки", en: "Dresses & Skirts" },
                sizeTable: "clothing",
                icon: "👗",
            },
            {
                slug: "children-wear",
                label: { ru: "Детская одежда", en: "Children's Wear" },
                sizeTable: "clothing",
                icon: "👶",
            },
            {
                slug: "home-textile",
                label: { ru: "Домашний текстиль", en: "Home Textile" },
                sizeTable: "none",
                icon: "🛏",
            },
            {
                slug: "workwear",
                label: { ru: "Форменная одежда", en: "Workwear" },
                sizeTable: "clothing",
                icon: "👷",
            },
            {
                slug: "accessories",
                label: { ru: "Аксессуары и галантерея", en: "Accessories" },
                sizeTable: "none",
                icon: "👜",
            },
        ],
    },
    {
        slug: "silk",
        label: { ru: "Шёлк", en: "Silk" },
        icon: "🌸",
        color: "#ec4899",
        subcategories: [
            {
                slug: "natural-silk",
                label: { ru: "Натуральный шёлк", en: "Natural Silk" },
                sizeTable: "fabric",
                icon: "🧣",
            },
            {
                slug: "silk-dresses",
                label: { ru: "Шёлковые платья и блузы", en: "Silk Dresses & Blouses" },
                sizeTable: "clothing",
                icon: "👘",
            },
            {
                slug: "satin-fabric",
                label: { ru: "Атласная ткань", en: "Satin Fabric" },
                sizeTable: "fabric",
                icon: "✨",
            },
            {
                slug: "silk-scarves",
                label: { ru: "Шарфы и платки", en: "Scarves & Shawls" },
                sizeTable: "none",
                icon: "🧣",
            },
            {
                slug: "ikat",
                label: { ru: "Икат и адрас (нац. ткани)", en: "Ikat & Adras (Traditional)" },
                sizeTable: "fabric",
                icon: "🎨",
            },
        ],
    },
    {
        slug: "leather",
        label: { ru: "Кожа", en: "Leather" },
        icon: "🟤",
        color: "#92400e",
        subcategories: [
            {
                slug: "leather-goods",
                label: { ru: "Кожаные изделия", en: "Leather Goods" },
                sizeTable: "none",
                icon: "👛",
            },
            {
                slug: "leather-bags",
                label: { ru: "Сумки и кошельки", en: "Bags & Wallets" },
                sizeTable: "none",
                icon: "👜",
            },
            {
                slug: "leather-jackets",
                label: { ru: "Куртки и верхняя одежда", en: "Jackets & Outerwear" },
                sizeTable: "clothing",
                icon: "🧥",
            },
            {
                slug: "belts-accessories",
                label: { ru: "Ремни и аксессуары", en: "Belts & Accessories" },
                sizeTable: "none",
                icon: "👞",
            },
            {
                slug: "raw-leather",
                label: { ru: "Сырьё — кожевенное полуфабрикат", en: "Raw Leather Material" },
                sizeTable: "fabric",
                icon: "🪵",
            },
        ],
    },
    {
        slug: "footwear",
        label: { ru: "Обувь", en: "Footwear" },
        icon: "👠",
        color: "#7c3aed",
        subcategories: [
            {
                slug: "mens-footwear",
                label: { ru: "Мужская обувь", en: "Men's Footwear" },
                sizeTable: "footwear",
                icon: "👞",
            },
            {
                slug: "womens-footwear",
                label: { ru: "Женская обувь", en: "Women's Footwear" },
                sizeTable: "footwear",
                icon: "👠",
            },
            {
                slug: "children-footwear",
                label: { ru: "Детская обувь", en: "Children's Footwear" },
                sizeTable: "footwear",
                icon: "👟",
            },
            {
                slug: "sports-footwear",
                label: { ru: "Спортивная обувь", en: "Sports Footwear" },
                sizeTable: "footwear",
                icon: "🥾",
            },
            {
                slug: "national-footwear",
                label: { ru: "Национальная обувь (Махси)", en: "National Footwear (Makhsi)" },
                sizeTable: "footwear",
                icon: "🥿",
            },
        ],
    },
    {
        slug: "carpets",
        label: { ru: "Ковры", en: "Carpets" },
        icon: "🔴",
        color: "#dc2626",
        subcategories: [
            {
                slug: "handmade-carpets",
                label: { ru: "Ковры ручной работы", en: "Handmade Carpets" },
                sizeTable: "carpet",
                icon: "🧵",
            },
            {
                slug: "machine-carpets",
                label: { ru: "Машинные ковры", en: "Machine-Made Carpets" },
                sizeTable: "carpet",
                icon: "⚙️",
            },
            {
                slug: "silk-carpets",
                label: { ru: "Шёлковые ковры", en: "Silk Carpets" },
                sizeTable: "carpet",
                icon: "✨",
            },
            {
                slug: "carpet-runners",
                label: { ru: "Дорожки и мини-ковры", en: "Runners & Small Rugs" },
                sizeTable: "carpet",
                icon: "📏",
            },
            {
                slug: "national-carpet",
                label: { ru: "Нац. орнамент (Бухара, Самарканд)", en: "National Ornament (Bukhara, Samarkand)" },
                sizeTable: "carpet",
                icon: "🎨",
            },
        ],
    },
];

// ─── Category → Size Table Mapping ───────────────────────────────────────
// Maps BOTH flat CATEGORIES slugs (from lib/data/categories.ts)
// AND taxonomy subcategory slugs to their size table type.
// This is the single authoritative lookup — use getSizeTableType() everywhere.

export const CATEGORY_SIZE_TABLE_MAP: Record<string, SizeTable["type"]> = {
    // ── Flat CATEGORIES slugs (used as Product.categorySlug) ──
    "outerwear": "clothing",
    "dresses": "clothing",
    "footwear": "footwear",
    "home-textile": "none",
    "knitwear": "clothing",
    "accessories": "none",
    "carpets": "carpet",
    "workwear": "clothing",

    // ── Taxonomy subcategory slugs (Textile) ──
    "sportswear": "clothing",
    "children-wear": "clothing",

    // ── Taxonomy subcategory slugs (Silk) ──
    "natural-silk": "fabric",
    "silk-dresses": "clothing",
    "satin-fabric": "fabric",
    "silk-scarves": "none",
    "ikat": "fabric",

    // ── Taxonomy subcategory slugs (Leather) ──
    "leather-goods": "none",
    "leather-bags": "none",
    "leather-jackets": "clothing",
    "belts-accessories": "none",
    "raw-leather": "fabric",

    // ── Taxonomy subcategory slugs (Footwear) ──
    "mens-footwear": "footwear",
    "womens-footwear": "footwear",
    "children-footwear": "footwear",
    "sports-footwear": "footwear",
    "national-footwear": "footwear",

    // ── Taxonomy subcategory slugs (Carpets) ──
    "handmade-carpets": "carpet",
    "machine-carpets": "carpet",
    "silk-carpets": "carpet",
    "carpet-runners": "carpet",
    "national-carpet": "carpet",
};

// ─── Helpers ──────────────────────────────────────────────────────────────

// Primary function: resolve size table type from ANY slug
export function getSizeTableType(slug: string): SizeTable["type"] {
    return CATEGORY_SIZE_TABLE_MAP[slug] ?? "none";
}

// Get all subcategory slugs flat
export function getAllSubcategorySlugs(): string[] {
    return INDUSTRY_TAXONOMY.flatMap(ind => ind.subcategories.map(s => s.slug));
}

// Find subcategory by slug (within taxonomy)
export function findSubcategory(slug: string): SubCategory | undefined {
    for (const ind of INDUSTRY_TAXONOMY) {
        const sub = ind.subcategories.find(s => s.slug === slug);
        if (sub) return sub;
    }
    return undefined;
}

// Find parent industry by subcategory slug
export function findIndustry(subcategorySlug: string): IndustryCategory | undefined {
    return INDUSTRY_TAXONOMY.find(ind =>
        ind.subcategories.some(s => s.slug === subcategorySlug)
    );
}

// Find parent industry by flat category slug (via CATEGORY_SIZE_TABLE_MAP)
export function findIndustryByCategory(categorySlug: string): IndustryCategory | undefined {
    // First try direct match in subcategories
    const bySubcat = findIndustry(categorySlug);
    if (bySubcat) return bySubcat;
    // Then try matching flat slug against industry-level slugs
    return INDUSTRY_TAXONOMY.find(ind => ind.slug === categorySlug);
}

