// Shared types and mock data for the B2B portal

export type ProductType = "instock" | "whitelabel" | "rfq";

export interface Product {
    id: number;
    title: string;
    category: string;
    categorySlug: string;
    company: string;
    companyId: number;
    region: string;
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

export const CATEGORIES = [
    { slug: "outerwear", label: "Верхняя одежда", labelEn: "Outerwear" },
    { slug: "dresses", label: "Платья и юбки", labelEn: "Dresses & Skirts" },
    { slug: "footwear", label: "Обувь", labelEn: "Footwear" },
    { slug: "home-textile", label: "Домашний текстиль", labelEn: "Home Textile" },
    { slug: "knitwear", label: "Трикотаж", labelEn: "Knitwear" },
    { slug: "accessories", label: "Аксессуары", labelEn: "Accessories" },
    { slug: "carpets", label: "Ковры", labelEn: "Carpets" },
    { slug: "workwear", label: "Форменная одежда", labelEn: "Workwear" },
];

export const REGIONS = [
    "Ташкент",
    "Фергана",
    "Самарканд",
    "Наманган",
    "Бухара",
    "Андижан",
];

export const PRODUCTS: Product[] = [
    {
        id: 1,
        title: "Худи базовое оверсайз",
        category: "Верхняя одежда",
        categorySlug: "outerwear",
        company: "UzTextile Pro",
        companyId: 1,
        region: "Ташкент",
        moq: "10 коробов (100 шт)",
        priceFrom: 4.0,
        priceTo: 5.5,
        priceCurrency: "$",
        priceUnit: "за шт",
        type: "instock",
        colors: ["#1a1a1a", "#f0f0f0", "#4a5568", "#c53030"],
        leadTime: "2–5 дней",
        verified: true,
        tags: ["худи", "оверсайз", "трикотаж"],
    },
    {
        id: 2,
        title: "Постельный комплект Satin 2-спальный",
        category: "Домашний текстиль",
        categorySlug: "home-textile",
        company: "CottonLand UZ",
        companyId: 2,
        region: "Фергана",
        moq: "20 комплектов",
        priceFrom: 8.0,
        priceTo: 12.0,
        priceCurrency: "$",
        priceUnit: "за комплект",
        type: "instock",
        colors: ["#e8f5e9", "#f3e5f5", "#e3f2fd", "#fff8e1"],
        leadTime: "3–7 дней",
        verified: true,
        tags: ["постельное", "сатин", "текстиль"],
    },
    {
        id: 3,
        title: "Мужская рубашка Poplin Premium",
        category: "Верхняя одежда",
        categorySlug: "outerwear",
        company: "StyleFactory",
        companyId: 3,
        region: "Самарканд",
        moq: "50 шт",
        priceFrom: 5.5,
        priceTo: 7.0,
        priceCurrency: "$",
        priceUnit: "за шт",
        type: "whitelabel",
        colors: ["#1a1a1a", "#f5f5f5", "#1565c0", "#6d4c41"],
        leadTime: "15–20 дней",
        verified: true,
        tags: ["рубашка", "белый лейбл", "формальная"],
    },
    {
        id: 4,
        title: "Спортивный костюм двухнитка",
        category: "Верхняя одежда",
        categorySlug: "outerwear",
        company: "SportTex UZ",
        companyId: 4,
        region: "Наманган",
        moq: "30 костюмов",
        priceFrom: 12.0,
        priceTo: 16.0,
        priceCurrency: "$",
        priceUnit: "за костюм",
        type: "instock",
        colors: ["#1a237e", "#212121", "#b71c1c"],
        leadTime: "5–10 дней",
        verified: false,
        tags: ["спорт", "костюм", "трикотаж"],
    },
    {
        id: 5,
        title: "Женское платье трапеция лён",
        category: "Платья и юбки",
        categorySlug: "dresses",
        company: "Fergana Fashion",
        companyId: 5,
        region: "Фергана",
        moq: "100 шт",
        priceFrom: 6.0,
        priceTo: 9.0,
        priceCurrency: "$",
        priceUnit: "за шт",
        type: "whitelabel",
        colors: ["#f5f0e8", "#d4a574", "#8b4513"],
        leadTime: "20–25 дней",
        verified: true,
        tags: ["платье", "лён", "летняя"],
    },
    {
        id: 6,
        title: "Ковёр ручной работы Bukhara",
        category: "Ковры",
        categorySlug: "carpets",
        company: "Bukhara Carpet House",
        companyId: 6,
        region: "Бухара",
        moq: "10 шт",
        priceFrom: 45.0,
        priceTo: 120.0,
        priceCurrency: "$",
        priceUnit: "за шт",
        type: "rfq",
        colors: ["#c0392b", "#2c3e50", "#f39c12"],
        leadTime: "30–60 дней",
        verified: true,
        tags: ["ковёр", "ручная работа", "бухара"],
    },
    {
        id: 7,
        title: "Форма медицинская (комплект)",
        category: "Форменная одежда",
        categorySlug: "workwear",
        company: "UniForm Pro",
        companyId: 7,
        region: "Ташкент",
        moq: "50 комплектов",
        priceFrom: 8.0,
        priceTo: 11.0,
        priceCurrency: "$",
        priceUnit: "за комплект",
        type: "rfq",
        colors: ["#e3f2fd", "#ffffff", "#1565c0"],
        leadTime: "25–35 дней",
        verified: false,
        tags: ["форма", "медицина", "спецодежда"],
    },
    {
        id: 8,
        title: "Детский трикотажный костюм",
        category: "Трикотаж",
        categorySlug: "knitwear",
        company: "KidsFashion UZ",
        companyId: 8,
        region: "Андижан",
        moq: "200 шт",
        priceFrom: 3.0,
        priceTo: 4.5,
        priceCurrency: "$",
        priceUnit: "за шт",
        type: "instock",
        colors: ["#ff8a65", "#81c784", "#64b5f6", "#f06292"],
        leadTime: "7–14 дней",
        verified: true,
        tags: ["детский", "трикотаж", "костюм"],
    },
];

// ─── Companies ───────────────────────────────────────────

export interface Company {
    id: number;
    name: string;
    slug: string;
    region: string;
    country: string;
    verified: boolean;
    founded: number;
    employees: string;
    rating: number;
    reviewCount: number;
    moqFrom: string;
    leadTime: string;
    categories: string[];      // category slugs
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
}

export const COMPANIES: Company[] = [
    {
        id: 1,
        name: "UzTextile Pro",
        slug: "uztextile-pro",
        region: "Ташкент",
        country: "Узбекистан",
        verified: true,
        founded: 2015,
        employees: "120–200",
        rating: 4.8,
        reviewCount: 142,
        moqFrom: "100 шт",
        leadTime: "2–5 дней",
        categories: ["outerwear", "knitwear"],
        flows: ["instock", "whitelabel"],
        exportCountries: ["Россия", "Казахстан", "Германия", "Польша"],
        certifications: ["OEKO-TEX Standard 100", "ISO 9001", "GOTS"],
        description: {
            ru: "UzTextile Pro — ведущий производитель трикотажных изделий в Узбекистане. Специализируемся на худи, свитшотах и базовых футболках повышенного качества.",
            en: "UzTextile Pro is a leading knitwear manufacturer in Uzbekistan. We specialize in hoodies, sweatshirts, and premium basic t-shirts.",
        },
        about: {
            ru: "Основана в 2015 году, фабрика прошла путь от малого ателье до полноцикличного производства мощностью 50 000 единиц в месяц. 14 вязальных линий Shima Seiki, собственный красильный цех, лаборатория контроля качества.",
            en: "Founded in 2015, the factory grew from a small atelier to a full-cycle production facility with a capacity of 50,000 units per month. 14 Shima Seiki knitting lines, in-house dyeing shop, quality control laboratory.",
        },
        specialization: {
            ru: "Трикотаж, Худи оверсайз, Свитшоты, Базовые футболки",
            en: "Knitwear, Oversized Hoodies, Sweatshirts, Basic T-shirts",
        },
        stats: {
            ordersCompleted: 1847,
            repeatClients: 78,
            onTimeDelivery: 96,
            avgResponseHours: 2,
        },
        contacts: {
            telegram: "@uztextile_pro",
            whatsapp: "+998901234567",
            email: "sales@uztextile.uz",
            website: "uztextile.uz",
        },
    },
    {
        id: 2,
        name: "CottonLand UZ",
        slug: "cottonland-uz",
        region: "Фергана",
        country: "Узбекистан",
        verified: true,
        founded: 2010,
        employees: "200–400",
        rating: 4.7,
        reviewCount: 89,
        moqFrom: "20 комплектов",
        leadTime: "3–7 дней",
        categories: ["home-textile"],
        flows: ["instock", "rfq"],
        exportCountries: ["Россия", "ОАЭ", "Турция", "США"],
        certifications: ["OEKO-TEX Standard 100", "ISO 14001"],
        description: {
            ru: "CottonLand UZ — один из крупнейших производителей домашнего текстиля в Центральной Азии. Постельное бельё, полотенца и декор из египетского хлопка.",
            en: "CottonLand UZ is one of the largest home textile manufacturers in Central Asia. Bedding, towels and décor made from Egyptian cotton.",
        },
        about: {
            ru: "Расположена в Ферганской долине — самом богатом хлопковом регионе Узбекистана. Сырьё выращивается на собственных правах. 6 специализированных линий: сатин, перкаль, жаккард, махра, вафля и муслин.",
            en: "Located in the Fergana Valley — the richest cotton region of Uzbekistan. Raw materials are grown under their own rights. 6 specialized lines: sateen, percale, jacquard, terry, waffle and muslin.",
        },
        specialization: {
            ru: "Постельное бельё, Полотенца, Домашний декор",
            en: "Bedding Sets, Towels, Home Décor",
        },
        stats: {
            ordersCompleted: 2340,
            repeatClients: 82,
            onTimeDelivery: 94,
            avgResponseHours: 4,
        },
        contacts: {
            telegram: "@cottonland_uz",
            whatsapp: "+998907654321",
            email: "export@cottonland.uz",
            website: "cottonland.uz",
        },
    },
    {
        id: 3,
        name: "StyleFactory",
        slug: "stylefactory",
        region: "Самарканд",
        country: "Узбекистан",
        verified: true,
        founded: 2018,
        employees: "50–120",
        rating: 4.6,
        reviewCount: 54,
        moqFrom: "50 шт",
        leadTime: "15–20 дней",
        categories: ["outerwear", "dresses"],
        flows: ["whitelabel"],
        exportCountries: ["Россия", "Беларусь", "Чехия"],
        certifications: ["ISO 9001"],
        description: {
            ru: "StyleFactory — бутиковое производство мужских рубашек и деловой одежды. White Label — наш основной профиль. Работаем с европейскими брендами.",
            en: "StyleFactory is a boutique manufacturer of men's shirts and business attire. White label is our core profile. We work with European brands.",
        },
        about: {
            ru: "Производим деловую одежду для B2B-клиентов из Европы и СНГ. Принимаем индивидуальный пошив по техническим заданиям и образцам. Опыт работы с брендами 5+ лет.",
            en: "We manufacture business attire for B2B clients from Europe and the CIS. We accept custom sewing based on technical specifications and samples. 5+ years of experience working with brands.",
        },
        specialization: {
            ru: "Мужские рубашки, Деловые костюмы, White Label пошив",
            en: "Men's Shirts, Business Suits, White Label Sewing",
        },
        stats: {
            ordersCompleted: 412,
            repeatClients: 91,
            onTimeDelivery: 89,
            avgResponseHours: 6,
        },
        contacts: {
            telegram: "@stylefactory_uz",
            email: "whitelabel@stylefactory.uz",
        },
    },
    {
        id: 6,
        name: "Bukhara Carpet House",
        slug: "bukhara-carpet-house",
        region: "Бухара",
        country: "Узбекистан",
        verified: true,
        founded: 1998,
        employees: "30–80",
        rating: 4.9,
        reviewCount: 207,
        moqFrom: "5 шт",
        leadTime: "30–60 дней",
        categories: ["carpets"],
        flows: ["rfq", "instock"],
        exportCountries: ["Германия", "Франция", "Италия", "США", "ОАЭ"],
        certifications: ["UNESCO Heritage Craft", "Handmade Certificate"],
        description: {
            ru: "Bukhara Carpet House — мастерская ручной работы с 25-летней историей. Традиционные бухарские ковры ручного ткачества для оптовых покупателей по всему миру.",
            en: "Bukhara Carpet House — a handcraft workshop with 25 years of history. Traditional handwoven Bukhara carpets for wholesale buyers worldwide.",
        },
        about: {
            ru: "Потомственные мастера сохраняют традиции бухарского ковроткачества. Каждый ковёр — уникальное изделие. Экспортируем в 15+ стран мира. Принимаем индивидуальные заказы по эскизам клиента.",
            en: "Hereditary craftsmen preserve the traditions of Bukhara carpet weaving. Each carpet is a unique item. We export to 15+ countries worldwide. Custom orders accepted based on client sketches.",
        },
        specialization: {
            ru: "Ковры ручной работы, Шерстяные ковры, Бухарский орнамент",
            en: "Handmade Carpets, Wool Carpets, Bukhara Ornament",
        },
        stats: {
            ordersCompleted: 3102,
            repeatClients: 85,
            onTimeDelivery: 91,
            avgResponseHours: 8,
        },
        contacts: {
            telegram: "@bukhara_carpets",
            whatsapp: "+998903331122",
            email: "orders@bukharacarpet.uz",
            website: "bukharacarpet.uz",
        },
    },
];

