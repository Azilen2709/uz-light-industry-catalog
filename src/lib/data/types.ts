// ─── Shared types for the B2B portal data layer ───────────────────────────

export type ProductType = "instock" | "whitelabel" | "rfq";

export interface Product {
    id: number;
    title: string;
    category: string;
    categorySlug: string;
    /** Top-level industry direction slug (from INDUSTRY_TAXONOMY) */
    industrySlug: string;
    company: string;
    companyId: number;
    region: string;          // stored in Russian (canonical)
    moq: string;
    priceFrom: number;
    priceTo: number;
    priceCurrency: string;
    priceUnit: string;
    type: ProductType;
    colors: string[];
    image?: string;
    leadTime: string;
    verified: boolean;
    tags: string[];
}

export interface Company {
    id: number;
    name: string;
    slug: string;
    region: string;          // stored in Russian (canonical)
    country: string;
    verified: boolean;
    founded: number;
    employees: string;
    rating: number;
    reviewCount: number;
    moqFrom: string;
    leadTime: string;
    categories: string[];      // category slugs
    /** Top-level industry direction slugs */
    industrySlugs: string[];
    flows: ProductType[];
    exportCountries: string[];
    certifications: string[];
    description: { ru: string; en: string };
    about: { ru: string; en: string };
    specialization: { ru: string; en: string };
    stats: {
        ordersCompleted: number;
        repeatClients: number;   // percent
        onTimeDelivery: number;  // percent
        avgResponseHours: number;
    };
    contacts: {
        telegram?: string;
        whatsapp?: string;
        email?: string;
        website?: string;
    };
    logo?: string;
}

export interface Category {
    slug: string;
    label: string;       // RU
    labelEn: string;     // EN
    industrySlug: string; // which top-level industry this belongs to
}

/** Bilingual region record */
export interface Region {
    slug: string;
    ru: string;
    en: string;
}
