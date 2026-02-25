import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INDUSTRY_TAXONOMY } from './src/lib/taxonomy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Keywords mapping for better photos
const IMAGE_KEYWORDS: Record<string, string> = {
    // Textile
    'outerwear': 'coat,jacket,outerwear',
    'sportswear': 'sportswear,fitness',
    'knitwear': 'sweater,knit,wool',
    'dresses': 'dress,fashion,woman',
    'children-wear': 'kids,clothing',
    'home-textile': 'bedding,textile,home',
    'workwear': 'uniform,work,safety',
    'accessories': 'scarf,gloves,bag',
    // Silk
    'natural-silk': 'silk,fabric,luxury',
    'silk-dresses': 'silk,dress,fashion',
    'satin-fabric': 'satin,fabric,shiny',
    'silk-scarves': 'silk,scarf,pattern',
    'ikat': 'ikat,traditional,fabric',
    // Leather
    'leather-goods': 'leather,wallet,craft',
    'leather-bags': 'leather,handbag,luxury',
    'leather-jackets': 'leather,jacket,fashion',
    'belts-accessories': 'leather,belt,accessory',
    'raw-leather': 'leather,material,tannery',
    // Footwear
    'mens-footwear': 'men,shoes,leather',
    'womens-footwear': 'women,shoes,heels',
    'children-footwear': 'kids,shoes,sneakers',
    'sports-footwear': 'sneakers,running,sports',
    'national-footwear': 'traditional,shoes,embroidery',
    // Carpets
    'handmade-carpets': 'carpet,handmade,oriental',
    'machine-carpets': 'carpet,machine,modern',
    'silk-carpets': 'silk,carpet,luxury',
    'carpet-runners': 'carpet,runner,hallway',
    'national-carpet': 'oriental,rug,pattern',
};

// 1. Generate Categories
const categories = INDUSTRY_TAXONOMY.flatMap(ind =>
    ind.categories.flatMap(cat =>
        cat.subcategories.map(sub => ({
            slug: sub.slug,
            label: sub.label.ru,
            labelEn: sub.label.en,
            industrySlug: ind.slug
        }))
    )
);

fs.writeFileSync(
    path.join(__dirname, 'src/lib/data/categories.ts'),
    `import type { Category } from "./types";\n\nexport const CATEGORIES: Category[] = ${JSON.stringify(categories, null, 4)};\n\nexport function findCategory(slug: string): Category | undefined { return CATEGORIES.find(c => c.slug === slug); }\nexport function getCategoriesByIndustry(industrySlug: string): Category[] { return CATEGORIES.filter(c => c.industrySlug === industrySlug); }\n`
);

// 2. Generate Companies & Products
const REGIONS = ["Ташкент", "Фергана", "Самарканд", "Наманган", "Бухара", "Андижан"];
const COLORS = ["#1a1a1a", "#f0f0f0", "#4a5568", "#c53030", "#1565c0", "#e8f5e9", "#f3e5f5"];
const BUSINESS_TYPES = ["Manufacturer", "OEM/ODM", "OEM", "Manufacturer + OEM", "Trading + Manufacturing"];
const EXPORT_REGIONS_POOL = ["CIS", "Europe", "Middle East", "Southeast Asia", "Russia", "China", "USA", "Gulf States", "Central Asia"];
const SHIPPING_METHODS_POOL = ["Air freight", "Sea freight", "Rail (China-Europe)", "Road freight", "Express courier"];
const PAYMENT_TERMS_POOL = ["100% prepay", "30/70 prepay", "LC (Letter of Credit)", "CAD", "Escrow", "DAP"];
const PACKAGING_OPTIONS = ["Export cartons (5-layer)", "Poly bags + carton", "Vacuum packing", "Retail boxes", "Bulk packing", "Custom packaging available"];
const QC_POLICIES_RU = [
    "Полный контроль каждой партии перед отгрузкой. Собственная лаборатория тестирования.",
    "Поэтапный AQL-контроль. 100% проверка швов, цвета и отделки.",
    "Контроль AQL 2.5 с правом стороннего аудита перед отгрузкой.",
];
const QC_POLICIES_EN = [
    "Full batch inspection before shipment. In-house testing laboratory.",
    "Step-by-step AQL inspection. 100% check of seams, color, and finishing.",
    "AQL 2.5 control with third-party audit option before shipment.",
];
const pick = (arr: string[], seed: number) => arr[seed % arr.length];
const pickN = (arr: string[], seed: number, n: number) => arr.slice(seed % arr.length, (seed % arr.length) + n).concat(arr.slice(0, Math.max(0, (seed % arr.length) + n - arr.length))).slice(0, n);

const companies: any[] = [];
const products: any[] = [];

let companyId = 1;
let productId = 1;

for (const ind of INDUSTRY_TAXONOMY) {
    for (const cat of ind.categories) {
        for (const sub of cat.subcategories) {
            // Create 1 company for this subcategory
            const region = REGIONS[companyId % REGIONS.length];
            const kw = IMAGE_KEYWORDS[sub.slug] || 'factory,industry';

            const exportYears = 2 + (companyId % 18);
            const company = {
                id: companyId,
                name: sub.label.en.split(' ')[0] + " Factory " + companyId,
                slug: "factory-" + companyId,
                region: region,
                country: "Узбекистан",
                verified: true,
                founded: 2000 + (companyId % 20),
                employees: companyId % 3 === 0 ? "200-500" : companyId % 3 === 1 ? "50-100" : "100-200",
                rating: 4.5 + (companyId % 5) / 10,
                reviewCount: 10 + companyId * 2,
                moqFrom: "50 шт",
                leadTime: "15-30 дн.",
                categories: [sub.slug],
                industrySlugs: [ind.slug],
                flows: ["instock", "whitelabel", "rfq"],
                exportCountries: ["Россия", "Казахстан", "Европа"],
                certifications: ["ISO 9001"],
                description: {
                    ru: "Надёжный производитель в категории " + sub.label.ru + ". Большой опыт работы на экспорт.",
                    en: "Reliable manufacturer in " + sub.label.en + " category. Great experience in export."
                },
                about: {
                    ru: "Фабрика специализируется на производстве: " + sub.label.ru + ". Мы предлагаем высокое качество и гибкие условия сотрудничества для B2B клиентов со всего мира.",
                    en: "The factory specializes in: " + sub.label.en + ". We offer high quality and flexible terms of cooperation for B2B clients worldwide."
                },
                specialization: {
                    ru: sub.label.ru,
                    en: sub.label.en
                },
                stats: {
                    ordersCompleted: 100 + companyId * 10,
                    repeatClients: 80,
                    onTimeDelivery: 95,
                    avgResponseHours: 2
                },
                contacts: {
                    telegram: "@factory" + companyId,
                    email: "info@factory" + companyId + ".uz"
                },
                logo: `https://loremflickr.com/200/200/abstract,logo?lock=${companyId}`,
                // ─── B2B Export Profile Fields ───
                businessType: pick(BUSINESS_TYPES, companyId),
                exportYears,
                exportRegions: pickN(EXPORT_REGIONS_POOL, companyId, 3),
                languages: companyId % 3 === 0 ? ["ru", "en", "zh"] : companyId % 3 === 1 ? ["ru", "en"] : ["ru", "en", "ar"],
                productionCapacityRu: `Около ${(companyId % 10 + 1) * 10} 000 единиц в месяц. ${companyId % 2 === 0 ? "2 смены (16 ч/сутки)." : "3 смены (24 ч/сутки)."} Собственный цех контроля качества.`,
                productionCapacityEn: `About ${(companyId % 10 + 1) * 10},000 units/month. ${companyId % 2 === 0 ? "2 shifts (16h/day)." : "3 shifts (24h/day)."} In-house QC lab.`,
                qualityControlRu: pick(QC_POLICIES_RU, companyId),
                qualityControlEn: pick(QC_POLICIES_EN, companyId),
                thirdPartyInspection: companyId % 2 === 0,
                exportDocs: ["Invoice", "Packing List", "Certificate of Origin", companyId % 3 === 0 ? "EUR.1" : "Form A"],
            };

            companies.push(company);

            // Create 3 products for this company (instock, whitelabel, rfq)
            const types = ["instock", "whitelabel", "rfq"];
            for (const type of types) {
                const isInstock = type === "instock";
                const titlePrefix = {
                    ru: isInstock ? "Готовый товар" : type === "whitelabel" ? "Под ваш бренд" : "Пошив на заказ",
                    en: isInstock ? "In-stock Product" : type === "whitelabel" ? "White Label" : "Custom Order"
                };

                products.push({
                    id: productId,
                    title: {
                        ru: titlePrefix.ru + ": " + sub.label.ru + " (" + productId + ")",
                        en: titlePrefix.en + ": " + sub.label.en + " (" + productId + ")"
                    },
                    category: {
                        ru: sub.label.ru,
                        en: sub.label.en
                    },
                    categorySlug: sub.slug,
                    industrySlug: ind.slug,
                    company: company.name,
                    companyId: company.id,
                    region: company.region,
                    moq: isInstock ? "10 шт" : "100 шт",
                    priceFrom: 10 + (productId % 50),
                    priceTo: 20 + (productId % 50),
                    priceCurrency: "$",
                    priceUnit: "шт",
                    type: type,
                    colors: [COLORS[productId % COLORS.length], COLORS[(productId + 1) % COLORS.length]],
                    leadTime: isInstock ? "В наличии" : "15-30 дн.",
                    verified: true,
                    tags: [sub.label.ru, type],
                    image: `https://loremflickr.com/600/600/${kw}?lock=${productId}`,
                    // ─── B2B Export Fields ───
                    hsCode: `${6100 + (productId % 200)}.${String(productId % 90 + 10).padStart(2, "0")}`,
                    materialComposition: productId % 4 === 0 ? "100% Cotton" : productId % 4 === 1 ? "80% Cotton, 20% Polyester" : productId % 4 === 2 ? "100% Silk" : "60% Cotton, 40% Linen",
                    exportDocsReady: productId % 3 !== 0,
                    hasCertificates: productId % 2 === 0,
                    samplesAvailable: productId % 3 !== 2,
                    samplePrice: productId % 3 === 0 ? "Free" : `$${10 + (productId % 20)}`,
                    shippingFrom: company.region + ", Uzbekistan",
                    shippingMethods: pickN(SHIPPING_METHODS_POOL, productId, 2),
                    packaging: pick(PACKAGING_OPTIONS, productId),
                    privateLabel: type === "whitelabel",
                    paymentTerms: pickN(PAYMENT_TERMS_POOL, productId, 2),
                });
                productId++;
            }

            companyId++;
        }
    }
}

fs.writeFileSync(
    path.join(__dirname, 'src/lib/data/companies.ts'),
    `import type { Company } from "./types";\n\nexport const COMPANIES: Company[] = ${JSON.stringify(companies, null, 4)};\n`
);

fs.writeFileSync(
    path.join(__dirname, 'src/lib/data/products.ts'),
    `import type { Product } from "./types";\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(products, null, 4)};\n\nexport const countByCategory = (slug: string) => PRODUCTS.filter(p => p.categorySlug === slug).length;\nexport const countByIndustry = (slug: string) => PRODUCTS.filter(p => p.industrySlug === slug).length;\n`
);

console.log(`Successfully generated ${categories.length} categories, ${companies.length} companies, and ${products.length} products with category-specific images.`);
