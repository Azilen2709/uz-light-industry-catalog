// Multi-level Industry Taxonomy for UZ Light Industry Catalog

export interface SizeTable {
    type: "clothing" | "footwear" | "carpet" | "fabric" | "none";
    label: { ru: string; en: string };
}

export interface SubCategory {
    slug: string;
    code: string; // Official code from Reference Catalog (e.g. A1.1.1)
    label: { ru: string; en: string };
    sizeTable: SizeTable["type"];
    icon?: string;
}

export interface Category {
    slug: string;
    code: string; // Official category code (e.g. A1.1)
    label: { ru: string; en: string };
    icon: string;
    subcategories: SubCategory[];
    sizeTable?: SizeTable["type"]; // Fallback if subcategory missing
}

export interface IndustryCategory {
    slug: string;
    code: string; // Official sector code (e.g. A1)
    label: { ru: string; en: string };
    icon: string;
    color: string;
    categories: Category[];
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

// ─── Industry Taxonomy (3 Levels) ────────────────────────────────────

export const INDUSTRY_TAXONOMY: IndustryCategory[] = [
    {
        slug: "textile",
        code: "A1",
        label: { ru: "Текстиль", en: "Textile" },
        icon: "🧵",
        color: "#3b82f6",
        categories: [
            {
                slug: "apparel-men",
                code: "A1.1",
                label: { ru: "Мужская одежда", en: "Men's Apparel" },
                icon: "👔",
                sizeTable: "clothing",
                subcategories: [
                    { slug: "outerwear", code: "A1.1.1", label: { ru: "Верхняя одежда", en: "Outerwear" }, sizeTable: "clothing", icon: "🧥" },
                    { slug: "tops", code: "A1.1.2", label: { ru: "Футболки и поло", en: "T-shirts & Polo" }, sizeTable: "clothing", icon: "👕" },
                    { slug: "bottoms", code: "A1.1.3", label: { ru: "Брюки и джинсы", en: "Trousers & Jeans" }, sizeTable: "clothing", icon: "👖" },
                    { slug: "sportswear", code: "A1.1.4", label: { ru: "Спортивная одежда", en: "Sportswear" }, sizeTable: "clothing", icon: "🏃" },
                    { slug: "workwear", code: "A1.1.5", label: { ru: "Форменная одежда", en: "Workwear" }, sizeTable: "clothing", icon: "👷" },
                    { slug: "knitwear", code: "A1.1.6", label: { ru: "Трикотаж", en: "Knitwear" }, sizeTable: "clothing", icon: "🧶" },
                ],
            },
            {
                slug: "apparel-women",
                code: "A1.1",
                label: { ru: "Женская одежда", en: "Women's Apparel" },
                icon: "👗",
                sizeTable: "clothing",
                subcategories: [
                    { slug: "dresses", code: "A1.1.1", label: { ru: "Платья и юбки", en: "Dresses & Skirts" }, sizeTable: "clothing", icon: "👗" },
                    { slug: "tops-women", code: "A1.1.2", label: { ru: "Блузки и футболки", en: "Blouses & T-shirts" }, sizeTable: "clothing", icon: "👚" },
                    { slug: "outerwear-women", code: "A1.1.3", label: { ru: "Верхняя одежда", en: "Outerwear" }, sizeTable: "clothing", icon: "🧥" },
                ]
            },
            {
                slug: "home-textile",
                code: "A1.2",
                label: { ru: "Домашний текстиль", en: "Home Textile" },
                icon: "🛏",
                sizeTable: "none",
                subcategories: [
                    { slug: "bedding", code: "A1.2.1", label: { ru: "Постельное белье", en: "Bedding Sets" }, sizeTable: "none" },
                    { slug: "towels", code: "A1.2.2", label: { ru: "Полотенца", en: "Towels" }, sizeTable: "none" },
                    { slug: "curtains", code: "A1.2.3", label: { ru: "Шторы", en: "Curtains" }, sizeTable: "none" },
                ],
            }
        ],
    },
    {
        slug: "silk",
        code: "A2",
        label: { ru: "Шёлк", en: "Silk" },
        icon: "🌸",
        color: "#ec4899",
        categories: [
            {
                slug: "silk-fabric",
                code: "A2.1",
                label: { ru: "Шёлковые ткани", en: "Silk Fabrics" },
                icon: "🧣",
                sizeTable: "fabric",
                subcategories: [],
            },
            {
                slug: "silk-apparel",
                code: "A2.2",
                label: { ru: "Одежда из шёлка", en: "Silk Apparel" },
                icon: "👘",
                sizeTable: "clothing",
                subcategories: [],
            },
            {
                slug: "silk-accessories",
                code: "A2.3",
                label: { ru: "Шёлковые аксессуары", en: "Silk Accessories" },
                icon: "🧣",
                sizeTable: "none",
                subcategories: [],
            },
        ],
    },
    {
        slug: "leather",
        code: "A3",
        label: { ru: "Кожаные изделия", en: "Leather Goods" },
        icon: "🟤",
        color: "#92400e",
        categories: [
            {
                slug: "leather-bags",
                code: "A3.1",
                label: { ru: "Сумки и рюкзаки", en: "Bags & Backpacks" },
                icon: "👜",
                sizeTable: "none",
                subcategories: [],
            },
            {
                slug: "leather-accessories",
                code: "A3.2",
                label: { ru: "Мелкая галантерея", en: "Small Leather Goods" },
                icon: "👛",
                sizeTable: "none",
                subcategories: [],
            },
            {
                slug: "leather-belts",
                code: "A3.3",
                label: { ru: "Ремни", en: "Belts" },
                icon: "👞",
                sizeTable: "none",
                subcategories: [],
            },
        ],
    },
    {
        slug: "footwear",
        code: "A4",
        label: { ru: "Обувь", en: "Footwear" },
        icon: "👠",
        color: "#7c3aed",
        categories: [
            {
                slug: "shoes-classic",
                code: "A4.1",
                label: { ru: "Классическая обувь", en: "Classic Footwear" },
                icon: "👞",
                sizeTable: "footwear",
                subcategories: [],
            },
            {
                slug: "shoes-casual",
                code: "A4.2",
                label: { ru: "Повседневная обувь", en: "Casual Footwear" },
                icon: "👟",
                sizeTable: "footwear",
                subcategories: [],
            },
            {
                slug: "shoes-sport",
                code: "A4.3",
                label: { ru: "Спортивная обувь", en: "Sport Footwear" },
                icon: "🥾",
                sizeTable: "footwear",
                subcategories: [],
            },
            {
                slug: "shoes-special",
                code: "A4.5",
                label: { ru: "Спецобувь", en: "Specialized Footwear" },
                icon: "🩺",
                sizeTable: "footwear",
                subcategories: [],
            },
        ],
    },
    {
        slug: "carpets",
        code: "A5",
        label: { ru: "Ковры", en: "Carpets" },
        icon: "🔴",
        color: "#dc2626",
        categories: [
            {
                slug: "home-carpets",
                code: "A5.1",
                label: { ru: "Ковры для дома", en: "Home Carpets" },
                icon: "🏡",
                sizeTable: "carpet",
                subcategories: [
                    { slug: "handmade-carpets", code: "A5.1.4", label: { ru: "Ковры ручной работы", en: "Handmade Carpets" }, sizeTable: "carpet", icon: "✨" },
                    { slug: "machine-carpets", code: "A5.1.5", label: { ru: "Ковры машинной работы", en: "Machine Carpets" }, sizeTable: "carpet", icon: "🏭" },
                ],
            },
            {
                slug: "contract-carpets",
                code: "A5.2",
                label: { ru: "Контрактные ковры (Отели/Офисы)", en: "Contract Carpets (Hotel/Office)" },
                icon: "🏢",
                sizeTable: "carpet",
                subcategories: [],
            },
        ],
    },
];

// ─── Size Table Mapping (Dynamic from Tree) ────────────────────────────────

export function getSizeTableType(slug: string): SizeTable["type"] {
    for (const ind of INDUSTRY_TAXONOMY) {
        for (const cat of ind.categories) {
            if (cat.slug === slug) return cat.sizeTable || "none";
            for (const sub of cat.subcategories) {
                if (sub.slug === slug) return sub.sizeTable;
            }
        }
    }
    return "none";
}

// ─── Helpers ──────────────────────────────────────────────────────────────

export function getAllCategorySlugs(): string[] {
    return INDUSTRY_TAXONOMY.flatMap(ind => ind.categories.map(c => c.slug));
}

export function getAllSubcategorySlugs(): string[] {
    return INDUSTRY_TAXONOMY.flatMap(ind => ind.categories.flatMap(c => c.subcategories.map(s => s.slug)));
}

export function findCategory(slug: string): Category | undefined {
    for (const ind of INDUSTRY_TAXONOMY) {
        const cat = ind.categories.find(c => c.slug === slug);
        if (cat) return cat;
    }
    return undefined;
}

export function findSubcategory(slug: string): SubCategory | undefined {
    for (const ind of INDUSTRY_TAXONOMY) {
        for (const cat of ind.categories) {
            const sub = cat.subcategories.find(s => s.slug === slug);
            if (sub) return sub;
        }
    }
    return undefined;
}

export function findIndustry(slugOrChildSlug: string): IndustryCategory | undefined {
    // 1. match exactly industry
    const ind = INDUSTRY_TAXONOMY.find(i => i.slug === slugOrChildSlug);
    if (ind) return ind;

    // 2. match child (category)
    const indByCat = INDUSTRY_TAXONOMY.find(i => i.categories.some(c => c.slug === slugOrChildSlug));
    if (indByCat) return indByCat;

    // 3. match grandchild (subcategory)
    return INDUSTRY_TAXONOMY.find(i => i.categories.some(c => c.subcategories.some(s => s.slug === slugOrChildSlug)));
}

export function findCategoryBySubcategory(subcategorySlug: string): Category | undefined {
    for (const ind of INDUSTRY_TAXONOMY) {
        for (const cat of ind.categories) {
            if (cat.subcategories.some(s => s.slug === subcategorySlug)) return cat;
        }
    }
    return undefined;
}
