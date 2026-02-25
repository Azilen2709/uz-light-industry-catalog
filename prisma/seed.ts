// ─── Prisma Seed Script ─────────────────────────────────────────────────────
// Run: npx tsx prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting seed...");

    // ─── 1. Clean DB ───────────────────────────────────────────────────────
    await prisma.message.deleteMany();
    await (prisma as any).order?.deleteMany().catch(() => { });
    await prisma.rfqResponse.deleteMany();
    await prisma.rfqRequest.deleteMany();
    await (prisma as any).searchQuery?.deleteMany().catch(() => { });
    await (prisma as any).banner?.deleteMany().catch(() => { });
    await prisma.product.deleteMany();
    await prisma.company.deleteMany();
    await prisma.user.deleteMany();
    console.log("✓ Cleaned existing data");

    // ─── 2. Users ──────────────────────────────────────────────────────────
    const passwordHash = await bcrypt.hash("password123", 10);

    const admin = await prisma.user.create({
        data: {
            name: "Admin",
            email: "admin@b2b.uz",
            password: passwordHash,
            role: "ADMIN",
        },
    });

    const buyer1 = await prisma.user.create({
        data: {
            name: "Mikhail K.",
            email: "buyer@b2b.uz",
            password: passwordHash,
            role: "BUYER",
        },
    });

    const seller1 = await prisma.user.create({
        data: {
            name: "FerTexile Factory",
            email: "seller@b2b.uz",
            password: passwordHash,
            role: "SELLER",
        },
    });

    const seller2 = await prisma.user.create({
        data: {
            name: "SilkRoad Co.",
            email: "seller2@b2b.uz",
            password: passwordHash,
            role: "SELLER",
        },
    });

    console.log("✓ Created users (admin, buyer, 2 sellers)");

    // ─── 3. Companies ──────────────────────────────────────────────────────
    const companies = await Promise.all([
        prisma.company.create({
            data: {
                userId: seller1.id,
                name: "FerTexile Factory",
                slug: "fertextile-factory",
                region: "Фергана",
                country: "Узбекистан",
                verified: true,
                founded: 2008,
                employees: "200-500",
                rating: 4.8,
                reviewCount: 124,
                moqFrom: "100 шт",
                leadTime: "20-35 дн.",
                flows: ["instock", "whitelabel", "rfq"],
                exportCountries: ["Россия", "Казахстан", "Германия", "ОАЭ", "Польша"],
                certifications: ["ISO 9001", "OEKO-TEX Standard 100"],
                descriptionRu: "Ведущий производитель трикотажных изделий в Фергане. Основные направления: базовый трикотаж, спортивная одежда, детский ассортимент.",
                descriptionEn: "Leading knitwear manufacturer in Fergana. Core lines: basics, sportswear, children's clothing.",
                aboutRu: "FerTexile основана в 2008 году. За 16 лет работы компания выросла до 350 сотрудников и 14 вязальных линий Shima Seiki. Экспортируем в 15+ стран мира. Собственная красильня, лаборатория контроля качества, возможность Private Label от 200 шт.",
                aboutEn: "FerTexile was founded in 2008. Over 16 years, the company has grown to 350 employees and 14 Shima Seiki knitting lines. We export to 15+ countries. In-house dyeing shop, QC laboratory, Private Label from 200 pcs.",
                specializationRu: "Трикотаж, Базовые худи, Спортивная форма, OEM/ODM",
                specializationEn: "Knitwear, Basic Hoodies, Sportswear, OEM/ODM",
                telegram: "@fertextile",
                whatsapp: "+998901234567",
                email: "export@fertextile.uz",
                website: "fertextile.uz",
                ordersCompleted: 1840,
                repeatClients: 78,
                onTimeDelivery: 94,
                avgResponseHours: 3,
                // B2B Export fields
                businessType: "Manufacturer + OEM",
                exportYears: 12,
                exportRegions: ["CIS", "Europe", "Middle East"],
                languages: ["ru", "en"],
                productionCapacityRu: "50 000 единиц/месяц. 2 смены (16 ч/сутки). Собственная красильня и лаборатория QC.",
                productionCapacityEn: "50,000 units/month. 2 shifts (16h/day). In-house dyeing shop and QC lab.",
                qualityControlRu: "Поэтапный AQL-контроль. 100% проверка швов, цвета и отделки. Сторонняя инспекция допускается.",
                qualityControlEn: "Step-by-step AQL inspection. 100% seams, color, finishing check. Third-party inspection allowed.",
                thirdPartyInspection: true,
                exportDocs: ["Invoice", "Packing List", "Certificate of Origin", "EUR.1"],
            },
        }),
        prisma.company.create({
            data: {
                userId: seller2.id,
                name: "SilkRoad Textiles",
                slug: "silkroad-textiles",
                region: "Самарканд",
                country: "Узбекистан",
                verified: true,
                founded: 2015,
                employees: "50-100",
                rating: 4.6,
                reviewCount: 57,
                moqFrom: "50 шт",
                leadTime: "15-25 дн.",
                flows: ["instock", "rfq"],
                exportCountries: ["Россия", "Китай", "Франция"],
                certifications: ["GOTS", "ISO 14001"],
                descriptionRu: "Производитель натурального шёлка и постельного белья категории люкс.",
                descriptionEn: "Manufacturer of natural silk and luxury bedding.",
                aboutRu: "SilkRoad Textiles специализируется на производстве шёлковых тканей и готовых изделий из натурального шёлка. Работаем с bridal boutiques, отелями 5* и оптовыми байерами из Европы и Азии.",
                aboutEn: "SilkRoad Textiles specializes in silk fabrics and finished products from natural silk. We work with bridal boutiques, 5-star hotels, and wholesale buyers from Europe and Asia.",
                specializationRu: "Натуральный шёлк, Постельное бельё, Шёлковые платья",
                specializationEn: "Natural Silk, Bedding, Silk Dresses",
                telegram: "@silkroadtex",
                email: "sales@silkroad.uz",
                ordersCompleted: 420,
                repeatClients: 83,
                onTimeDelivery: 97,
                avgResponseHours: 6,
                // B2B Export fields
                businessType: "Manufacturer",
                exportYears: 7,
                exportRegions: ["CIS", "Europe", "China"],
                languages: ["ru", "en", "zh"],
                productionCapacityRu: "15 000 метров ткани / месяц. 3000 готовых изделий.",
                productionCapacityEn: "15,000 m of fabric/month. 3,000 finished products.",
                qualityControlRu: "Полный контроль каждой партии перед отгрузкой. AQL 2.5.",
                qualityControlEn: "Full AQL 2.5 batch inspection before shipment.",
                thirdPartyInspection: true,
                exportDocs: ["Invoice", "Packing List", "Certificate of Origin", "Form A"],
            },
        }),
    ]);
    const [company1, company2] = companies;
    console.log("✓ Created 2 companies");

    // ─── 4. Products ───────────────────────────────────────────────────────
    const products = await Promise.all([
        // FerTexile products
        prisma.product.create({
            data: {
                companyId: company1.id,
                titleRu: "Худи базовое оверсайз",
                titleEn: "Basic Oversized Hoodie",
                categorySlug: "knitwear",
                region: "Фергана",
                type: "instock",
                moq: "100 шт",
                priceFrom: 4.50,
                priceTo: 6.50,
                priceCurrency: "$",
                priceUnit: "шт",
                colors: ["#1a1a1a", "#f0f0f0", "#4a5568", "#c53030"],
                leadTime: "В наличии",
                verified: true,
                tags: ["худи", "оверсайз", "хлопок", "OEM"],
                // B2B fields
                materialComposition: "80% Cotton, 20% Polyester, 320 g/m²",
                hsCode: "6110.20",
                exportDocsReady: true,
                hasCertificates: true,
                samplesAvailable: true,
                samplePrice: "$15",
                shippingFrom: "Fergana, Uzbekistan",
                shippingMethods: ["Air freight", "Road freight"],
                packaging: "Poly bags + export carton (12 pcs/ctn)",
                privateLabel: true,
                paymentTerms: ["30/70 prepay", "LC (Letter of Credit)"],
                views: 245,
                ordersCompleted: 56,
            },
        }),
        prisma.product.create({
            data: {
                companyId: company1.id,
                titleRu: "Футболка поло White Label",
                titleEn: "Polo Shirt White Label",
                categorySlug: "knitwear",
                region: "Фергана",
                type: "whitelabel",
                moq: "200 шт",
                priceFrom: 3.20,
                priceTo: 5.00,
                priceCurrency: "$",
                priceUnit: "шт",
                colors: ["#1a1a1a", "#f0f0f0", "#1565c0"],
                leadTime: "20-30 дн.",
                verified: true,
                tags: ["поло", "white label", "OEM"],
                materialComposition: "100% Cotton pique, 220 g/m²",
                hsCode: "6105.10",
                exportDocsReady: true,
                hasCertificates: true,
                samplesAvailable: true,
                samplePrice: "Free (≥500 pcs order)",
                shippingFrom: "Fergana, Uzbekistan",
                shippingMethods: ["Air freight", "Sea freight"],
                packaging: "Retail boxes on request",
                privateLabel: true,
                paymentTerms: ["30/70 prepay", "Escrow"],
                views: 132,
                ordersCompleted: 22,
            },
        }),
        prisma.product.create({
            data: {
                companyId: company1.id,
                titleRu: "Спортивный костюм на заказ (RFQ)",
                titleEn: "Custom Tracksuit RFQ",
                categorySlug: "sportswear",
                region: "Фергана",
                type: "rfq",
                moq: "500 шт",
                priceFrom: 12.00,
                priceTo: 18.00,
                priceCurrency: "$",
                priceUnit: "шт",
                colors: ["#1a1a1a", "#c53030", "#1565c0"],
                leadTime: "30-45 дн.",
                verified: true,
                tags: ["спорт", "костюм", "RFQ", "OEM"],
                materialComposition: "Polyester 100% microfiber",
                hsCode: "6211.33",
                exportDocsReady: true,
                hasCertificates: false,
                samplesAvailable: true,
                samplePrice: "$30",
                shippingFrom: "Fergana, Uzbekistan",
                shippingMethods: ["Air freight", "Sea freight", "Rail (China-Europe)"],
                packaging: "Export cartons (5-layer)",
                privateLabel: true,
                paymentTerms: ["30/70 prepay", "LC (Letter of Credit)", "Escrow"],
                views: 89,
                ordersCompleted: 8,
            },
        }),
        // SilkRoad products
        prisma.product.create({
            data: {
                companyId: company2.id,
                titleRu: "Постельный комплект шёлк 6D",
                titleEn: "Silk 6D Bedding Set",
                categorySlug: "home-textile",
                region: "Самарканд",
                type: "instock",
                moq: "20 шт",
                priceFrom: 45.00,
                priceTo: 75.00,
                priceCurrency: "$",
                priceUnit: "шт",
                colors: ["#f0f0f0", "#e8f5e9", "#f3e5f5"],
                leadTime: "В наличии",
                verified: true,
                tags: ["шёлк", "постельное", "люкс"],
                materialComposition: "100% Natural Silk 22 momme",
                hsCode: "6302.31",
                exportDocsReady: true,
                hasCertificates: true,
                samplesAvailable: true,
                samplePrice: "$25",
                shippingFrom: "Samarkand, Uzbekistan",
                shippingMethods: ["Air freight", "Express courier"],
                packaging: "Gift boxes with silk ribbon",
                privateLabel: false,
                paymentTerms: ["100% prepay", "30/70 prepay"],
                views: 178,
                ordersCompleted: 31,
            },
        }),
        prisma.product.create({
            data: {
                companyId: company2.id,
                titleRu: "Шёлковое платье натуральный шёлк",
                titleEn: "Natural Silk Dress",
                categorySlug: "silk-dresses",
                region: "Самарканд",
                type: "rfq",
                moq: "50 шт",
                priceFrom: 28.00,
                priceTo: 55.00,
                priceCurrency: "$",
                priceUnit: "шт",
                colors: ["#c53030", "#f3e5f5", "#1a1a1a"],
                leadTime: "25-35 дн.",
                verified: true,
                tags: ["шёлк", "платье", "RFQ", "OEM"],
                materialComposition: "100% Mulberry Silk 16 momme",
                hsCode: "6204.49",
                exportDocsReady: false,
                hasCertificates: false,
                samplesAvailable: true,
                samplePrice: "$40",
                shippingFrom: "Samarkand, Uzbekistan",
                shippingMethods: ["Air freight"],
                packaging: "Custom packaging available",
                privateLabel: true,
                paymentTerms: ["100% prepay", "Escrow"],
                views: 67,
                ordersCompleted: 12,
            },
        }),
    ]);
    console.log(`✓ Created ${products.length} products`);

    // ─── 5. Banners ────────────────────────────────────────────────────────
    await (prisma as any).banner?.createMany({
        data: [
            {
                title: "🏭 Прямые поставки из Узбекистана — без посредников",
                imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80",
                linkUrl: "/companies",
                isActive: true,
                position: 0,
            },
            {
                title: "📐 Разместите RFQ и получите предложения от 50+ фабрик",
                imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1400&q=80",
                linkUrl: "/rfq/new",
                isActive: true,
                position: 1,
            },
            {
                title: "🏷 OEM / White Label — ваш бренд, наше производство",
                imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1400&q=80",
                linkUrl: "/products?type=whitelabel",
                isActive: true,
                position: 2,
            },
        ],
    }).catch(() => console.log("⚠ Banners table not available yet — run prisma generate first"));

    // ─── 6. RFQ Requests ───────────────────────────────────────────────────
    const rfq1 = await prisma.rfqRequest.create({
        data: {
            buyerId: buyer1.id,
            titleRu: "Худи оверсайз 500 шт, 5 цветов",
            titleEn: "Oversized Hoodie 500 pcs, 5 colors",
            categorySlug: "knitwear",
            quantity: 500,
            budget: "$2 000–3 000",
            deadline: "2026-04-01",
            status: "OPEN",
            descriptionRu: "Нужны худи базовые оверсайз 80% хлопок. 5 цветов, размерный ряд S-XXL. Требуется Private Label, бирки под свой бренд.",
            descriptionEn: "Need basic oversized hoodies 80% cotton. 5 colors, size run S-XXL. Private Label required, own brand labels.",
            destinationCountry: "Kazakhstan",
        },
    });

    // ─── 7. Orders ─────────────────────────────────────────────────────────
    await (prisma as any).order?.createMany({
        data: [
            {
                productId: products[0].id,
                buyerId: buyer1.id,
                sellerId: seller1.id,
                quantity: 200,
                totalPrice: 1100,
                status: "PROCESSING",
            },
            {
                productId: products[3].id,
                buyerId: buyer1.id,
                sellerId: seller2.id,
                quantity: 30,
                totalPrice: 1650,
                status: "COMPLETED",
            },
        ],
    }).catch(() => console.log("⚠ Order table not available yet"));

    console.log("✓ Created RFQ & Orders");

    // ─── 8. Search Queries ─────────────────────────────────────────────────
    await (prisma as any).searchQuery?.createMany({
        data: [
            { query: "худи", count: 142 },
            { query: "шёлк", count: 98 },
            { query: "постельное бельё", count: 76 },
            { query: "спортивная форма", count: 54 },
            { query: "polo shirt", count: 43 },
            { query: "футболка", count: 38 },
        ],
    }).catch(() => console.log("⚠ SearchQuery table not available yet"));

    console.log("✅ Seed complete!");
    console.log(`   Users:     ${await prisma.user.count()}`);
    console.log(`   Companies: ${await prisma.company.count()}`);
    console.log(`   Products:  ${await prisma.product.count()}`);
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
