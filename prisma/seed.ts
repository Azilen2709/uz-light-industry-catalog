// ─── Seed Script ───────────────────────────────────────────────────────────
// Run with: npx prisma db seed

import { PrismaClient, ProductFlow } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

// Initialize properly to avoid PrismaClientInitializationError in Prisma v7
const pool = new Pool({ connectionString: process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/b2b_portal?schema=public" });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🌱 Seeding database...");

    // ─── Demo Users ────────────────────────────────────────────────────────
    const buyerPass = await bcrypt.hash("demo123", 12);
    const sellerPass = await bcrypt.hash("demo123", 12);

    const buyer = await prisma.user.upsert({
        where: { email: "buyer@demo.uz" },
        update: {},
        create: {
            email: "buyer@demo.uz",
            password: buyerPass,
            name: "Demo Buyer",
            role: "BUYER",
        },
    });
    console.log("✅ Buyer created:", buyer.email);

    // ─── Companies ─────────────────────────────────────────────────────────
    const company1 = await prisma.company.upsert({
        where: { slug: "uztextile-pro" },
        update: {},
        create: {
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
            industrySlugs: ["textile"],
            flows: ["instock", "whitelabel"] as ProductFlow[],
            exportCountries: ["Россия", "Казахстан", "Германия", "Польша"],
            certifications: ["OEKO-TEX Standard 100", "ISO 9001", "GOTS"],
            descriptionRu: "UzTextile Pro — ведущий производитель трикотажных изделий в Узбекистане.",
            descriptionEn: "UzTextile Pro is a leading knitwear manufacturer in Uzbekistan.",
            aboutRu: "Основана в 2015 году. 14 вязальных линий Shima Seiki, собственный красильный цех.",
            aboutEn: "Founded in 2015. 14 Shima Seiki knitting lines, in-house dyeing shop.",
            specializationRu: "Трикотаж, Худи оверсайз, Свитшоты, Базовые футболки",
            specializationEn: "Knitwear, Oversized Hoodies, Sweatshirts, Basic T-shirts",
            ordersCompleted: 1847,
            repeatClients: 78,
            onTimeDelivery: 96,
            avgResponseHours: 2,
            telegram: "@uztextile_pro",
            whatsapp: "+998901234567",
            email: "sales@uztextile.uz",
            website: "uztextile.uz",
        },
    });

    const company2 = await prisma.company.upsert({
        where: { slug: "cottonland-uz" },
        update: {},
        create: {
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
            industrySlugs: ["textile"],
            flows: ["instock", "rfq"] as ProductFlow[],
            exportCountries: ["Россия", "ОАЭ", "Турция", "США"],
            certifications: ["OEKO-TEX Standard 100", "ISO 14001"],
            descriptionRu: "CottonLand UZ — один из крупнейших производителей домашнего текстиля в Центральной Азии.",
            descriptionEn: "CottonLand UZ is one of the largest home textile manufacturers in Central Asia.",
            aboutRu: "Расположена в Ферганской долине. 6 специализированных линий.",
            aboutEn: "Located in the Fergana Valley. 6 specialized lines.",
            specializationRu: "Постельное бельё, Полотенца, Домашний декор",
            specializationEn: "Bedding Sets, Towels, Home Décor",
            ordersCompleted: 2340,
            repeatClients: 82,
            onTimeDelivery: 94,
            avgResponseHours: 4,
            telegram: "@cottonland_uz",
            whatsapp: "+998907654321",
            email: "export@cottonland.uz",
            website: "cottonland.uz",
        },
    });

    const company3 = await prisma.company.upsert({
        where: { slug: "stylefactory" },
        update: {},
        create: {
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
            categories: ["outerwear", "apparel-women"],
            industrySlugs: ["textile"],
            flows: ["whitelabel"] as ProductFlow[],
            exportCountries: ["Россия", "Беларусь", "Чехия"],
            certifications: ["ISO 9001"],
            descriptionRu: "StyleFactory — бутиковое производство мужских рубашек и деловой одежды.",
            descriptionEn: "StyleFactory is a boutique manufacturer of men's shirts and business attire.",
            aboutRu: "Производим деловую одежду для B2B-клиентов из Европы и СНГ.",
            aboutEn: "We manufacture business attire for B2B clients from Europe and the CIS.",
            specializationRu: "Мужские рубашки, Деловые костюмы, White Label пошив",
            specializationEn: "Men's Shirts, Business Suits, White Label Sewing",
            ordersCompleted: 412,
            repeatClients: 91,
            onTimeDelivery: 89,
            avgResponseHours: 6,
            telegram: "@stylefactory_uz",
            email: "whitelabel@stylefactory.uz",
        },
    });

    const company4 = await prisma.company.upsert({
        where: { slug: "bukhara-carpet-house" },
        update: {},
        create: {
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
            categories: ["home-carpets", "handmade-carpets"],
            industrySlugs: ["carpets"],
            flows: ["rfq", "instock"] as ProductFlow[],
            exportCountries: ["Германия", "Франция", "Италия", "США", "ОАЭ"],
            certifications: ["UNESCO Heritage Craft", "Handmade Certificate"],
            descriptionRu: "Bukhara Carpet House — мастерская ручной работы с 25-летней историей.",
            descriptionEn: "Bukhara Carpet House — a handcraft workshop with 25 years of history.",
            aboutRu: "Потомственные мастера сохраняют традиции бухарского ковроткачества.",
            aboutEn: "Hereditary craftsmen preserve the traditions of Bukhara carpet weaving.",
            specializationRu: "Ковры ручной работы, Шерстяные ковры, Бухарский орнамент",
            specializationEn: "Handmade Carpets, Wool Carpets, Bukhara Ornament",
            ordersCompleted: 3102,
            repeatClients: 85,
            onTimeDelivery: 91,
            avgResponseHours: 8,
            telegram: "@bukhara_carpets",
            whatsapp: "+998903331122",
            email: "orders@bukharacarpet.uz",
            website: "bukharacarpet.uz",
        },
    });

    console.log("✅ Companies created:", company1.slug, company2.slug, company3.slug, company4.slug);

    // ─── Seller user (linked to company1) ─────────────────────────────────
    const seller = await prisma.user.upsert({
        where: { email: "seller@demo.uz" },
        update: {},
        create: {
            email: "seller@demo.uz",
            password: sellerPass,
            name: "Demo Seller 1",
            role: "SELLER",
            companyId: company1.id,
        },
    });
    const seller2 = await prisma.user.upsert({
        where: { email: "seller2@demo.uz" },
        update: {},
        create: {
            email: "seller2@demo.uz",
            password: sellerPass,
            name: "Demo Seller 2",
            role: "SELLER",
            companyId: company2.id,
        },
    });
    const seller3 = await prisma.user.upsert({
        where: { email: "seller3@demo.uz" },
        update: {},
        create: {
            email: "seller3@demo.uz",
            password: sellerPass,
            name: "Demo Seller 3",
            role: "SELLER",
            companyId: company3.id,
        },
    });
    const seller4 = await prisma.user.upsert({
        where: { email: "seller4@demo.uz" },
        update: {},
        create: {
            email: "seller4@demo.uz",
            password: sellerPass,
            name: "Demo Seller 4",
            role: "SELLER",
            companyId: company4.id,
        },
    });
    console.log("✅ Sellers created");

    // ─── Products ──────────────────────────────────────────────────────────
    const products = [
        {
            id: 1,
            titleRu: "Худи базовое оверсайз",
            titleEn: "Basic Oversized Hoodie",
            descriptionRu: "Плотный трикотаж (футер 3-х нитка с начесом). Идеально для прохладной погоды. Можно брендировать вышивкой или шелкографией.",
            descriptionEn: "Thick knitwear (3-thread fleece with fleece lining). Perfect for cool weather. Can be branded with embroidery or silkscreen printing.",
            industrySlug: "textile",
            categorySlug: "apparel-men",
            subCategorySlug: "outerwear",
            companyId: company1.id,
            region: "Ташкент",
            moq: "10 коробов (100 шт)",
            priceFrom: 4.0,
            priceTo: 5.5,
            priceCurrency: "$",
            priceUnit: "за шт",
            type: "instock" as ProductFlow,
            colors: ["#1a1a1a", "#f0f0f0", "#4a5568", "#c53030"],
            leadTime: "2–5 дней",
            verified: true,
            tags: ["худи", "оверсайз", "трикотаж"],
        },
        {
            id: 2,
            titleRu: "Постельный комплект Satin 2-спальный",
            titleEn: "Satin Bedding Set (Double)",
            descriptionRu: "100% хлопок высшего качества (сатин). Гладкая текстура, долго сохраняет цвет после стирок.",
            descriptionEn: "100% premium cotton (satin). Smooth texture, retains color long after washing.",
            industrySlug: "textile",
            categorySlug: "home-textile",
            subCategorySlug: "",
            companyId: company2.id,
            region: "Фергана",
            moq: "20 комплектов",
            priceFrom: 8.0,
            priceTo: 12.0,
            priceCurrency: "$",
            priceUnit: "за комплект",
            type: "instock" as ProductFlow,
            colors: ["#e8f5e9", "#f3e5f5", "#e3f2fd", "#fff8e1"],
            leadTime: "3–7 дней",
            verified: true,
            tags: ["постельное", "сатин", "текстиль"],
        },
        {
            id: 3,
            titleRu: "Мужская рубашка Poplin Premium",
            titleEn: "Premium Poplin Men's Shirt",
            descriptionRu: "Классическая кроя, дышащая поплиновая ткань. Идеально для корпоративной формы.",
            descriptionEn: "Classic fit, breathable poplin fabric. Ideal for corporate uniforms.",
            industrySlug: "textile",
            categorySlug: "apparel-men",
            subCategorySlug: "workwear",
            companyId: company3.id,
            region: "Самарканд",
            moq: "50 шт",
            priceFrom: 5.5,
            priceTo: 7.0,
            priceCurrency: "$",
            priceUnit: "за шт",
            type: "whitelabel" as ProductFlow,
            colors: ["#1a1a1a", "#f5f5f5", "#1565c0", "#6d4c41"],
            leadTime: "15–20 дней",
            verified: true,
            tags: ["рубашка", "белый лейбл", "формальная"],
        },
        {
            id: 4,
            titleRu: "Ковёр ручной работы Bukhara",
            titleEn: "Bukhara Handmade Carpet",
            descriptionRu: "Традиционный бухарский орнамент. Отборная шерсть. Плетение 100 узлов на дюйм.",
            descriptionEn: "Traditional Bukhara ornament. Selected wool. Weaving 100 knots per inch.",
            industrySlug: "carpets",
            categorySlug: "home-carpets",
            subCategorySlug: "handmade-carpets",
            companyId: company4.id,
            region: "Бухара",
            moq: "10 шт",
            priceFrom: 45.0,
            priceTo: 120.0,
            priceCurrency: "$",
            priceUnit: "за шт",
            type: "rfq" as ProductFlow,
            colors: ["#c0392b", "#2c3e50", "#f39c12"],
            leadTime: "30–60 дней",
            verified: true,
            tags: ["ковёр", "ручная работа", "бухара"],
        },
    ];

    for (const product of products) {
        await prisma.product.upsert({
            where: { id: product.id },
            update: {},
            create: product,
        });
    }
    console.log("✅ Products created:", products.length);

    // ─── Demo RFQ ──────────────────────────────────────────────────────────
    await prisma.rfqRequest.create({
        data: {
            title: "Корпоративная форма для 200 сотрудников",
            category: "Форменная одежда",
            categorySlug: "workwear",
            quantity: "200 комплектов",
            budget: "$15 000",
            deadline: "2026-04-01",
            description: "Нужна рабочая форма: брюки + рубашка. Цвет — тёмно-синий. Ткань — смесовая.",
            status: "OPEN",
            buyerId: buyer.id,
        },
    });
    console.log("✅ Demo RFQ created");

    console.log("\n🎉 Seed complete!");
    console.log("Логины пользователей для входа в систему:");
    console.log("-----------------------------------------");
    console.log("🛒 ПОКУПАТЕЛЬ:");
    console.log("   Email: buyer@demo.uz\n   Pass:  demo123\n");
    console.log("🏭 ФАБРИКА 1 (UzTextile Pro):");
    console.log("   Email: seller@demo.uz\n   Pass:  demo123\n");
    console.log("🏭 ФАБРИКА 2 (CottonLand UZ):");
    console.log("   Email: seller2@demo.uz\n   Pass:  demo123\n");
    console.log("🏭 ФАБРИКА 3 (StyleFactory):");
    console.log("   Email: seller3@demo.uz\n   Pass:  demo123\n");
    console.log("🏭 ФАБРИКА 4 (Bukhara Carpet House):");
    console.log("   Email: seller4@demo.uz\n   Pass:  demo123\n");
    console.log("-----------------------------------------");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
