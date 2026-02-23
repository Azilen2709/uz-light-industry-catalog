import type { Product } from "./types";

export const PRODUCTS: Product[] = [
    {
        "id": 1,
        "title": {
            "ru": "Готовый товар: Верхняя одежда (1)",
            "en": "In-stock Product: Outerwear (1)"
        },
        "category": {
            "ru": "Верхняя одежда",
            "en": "Outerwear"
        },
        "categorySlug": "outerwear",
        "industrySlug": "textile",
        "company": "Outerwear Factory 1",
        "companyId": 1,
        "region": "Фергана",
        "moq": "10 шт",
        "priceFrom": 11,
        "priceTo": 21,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#f0f0f0",
            "#4a5568"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Верхняя одежда",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/coat,jacket,outerwear?lock=1"
    },
    {
        "id": 2,
        "title": {
            "ru": "Под ваш бренд: Верхняя одежда (2)",
            "en": "White Label: Outerwear (2)"
        },
        "category": {
            "ru": "Верхняя одежда",
            "en": "Outerwear"
        },
        "categorySlug": "outerwear",
        "industrySlug": "textile",
        "company": "Outerwear Factory 1",
        "companyId": 1,
        "region": "Фергана",
        "moq": "100 шт",
        "priceFrom": 12,
        "priceTo": 22,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#4a5568",
            "#c53030"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Верхняя одежда",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/coat,jacket,outerwear?lock=2"
    },
    {
        "id": 3,
        "title": {
            "ru": "Пошив на заказ: Верхняя одежда (3)",
            "en": "Custom Order: Outerwear (3)"
        },
        "category": {
            "ru": "Верхняя одежда",
            "en": "Outerwear"
        },
        "categorySlug": "outerwear",
        "industrySlug": "textile",
        "company": "Outerwear Factory 1",
        "companyId": 1,
        "region": "Фергана",
        "moq": "100 шт",
        "priceFrom": 13,
        "priceTo": 23,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#c53030",
            "#1565c0"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Верхняя одежда",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/coat,jacket,outerwear?lock=3"
    },
    {
        "id": 4,
        "title": {
            "ru": "Готовый товар: Спортивная одежда (4)",
            "en": "In-stock Product: Sportswear (4)"
        },
        "category": {
            "ru": "Спортивная одежда",
            "en": "Sportswear"
        },
        "categorySlug": "sportswear",
        "industrySlug": "textile",
        "company": "Sportswear Factory 2",
        "companyId": 2,
        "region": "Самарканд",
        "moq": "10 шт",
        "priceFrom": 14,
        "priceTo": 24,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#1565c0",
            "#e8f5e9"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Спортивная одежда",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/sportswear,fitness?lock=4"
    },
    {
        "id": 5,
        "title": {
            "ru": "Под ваш бренд: Спортивная одежда (5)",
            "en": "White Label: Sportswear (5)"
        },
        "category": {
            "ru": "Спортивная одежда",
            "en": "Sportswear"
        },
        "categorySlug": "sportswear",
        "industrySlug": "textile",
        "company": "Sportswear Factory 2",
        "companyId": 2,
        "region": "Самарканд",
        "moq": "100 шт",
        "priceFrom": 15,
        "priceTo": 25,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#e8f5e9",
            "#f3e5f5"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Спортивная одежда",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/sportswear,fitness?lock=5"
    },
    {
        "id": 6,
        "title": {
            "ru": "Пошив на заказ: Спортивная одежда (6)",
            "en": "Custom Order: Sportswear (6)"
        },
        "category": {
            "ru": "Спортивная одежда",
            "en": "Sportswear"
        },
        "categorySlug": "sportswear",
        "industrySlug": "textile",
        "company": "Sportswear Factory 2",
        "companyId": 2,
        "region": "Самарканд",
        "moq": "100 шт",
        "priceFrom": 16,
        "priceTo": 26,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#f3e5f5",
            "#1a1a1a"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Спортивная одежда",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/sportswear,fitness?lock=6"
    },
    {
        "id": 7,
        "title": {
            "ru": "Готовый товар: Трикотаж (7)",
            "en": "In-stock Product: Knitwear (7)"
        },
        "category": {
            "ru": "Трикотаж",
            "en": "Knitwear"
        },
        "categorySlug": "knitwear",
        "industrySlug": "textile",
        "company": "Knitwear Factory 3",
        "companyId": 3,
        "region": "Наманган",
        "moq": "10 шт",
        "priceFrom": 17,
        "priceTo": 27,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#1a1a1a",
            "#f0f0f0"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Трикотаж",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/sweater,knit,wool?lock=7"
    },
    {
        "id": 8,
        "title": {
            "ru": "Под ваш бренд: Трикотаж (8)",
            "en": "White Label: Knitwear (8)"
        },
        "category": {
            "ru": "Трикотаж",
            "en": "Knitwear"
        },
        "categorySlug": "knitwear",
        "industrySlug": "textile",
        "company": "Knitwear Factory 3",
        "companyId": 3,
        "region": "Наманган",
        "moq": "100 шт",
        "priceFrom": 18,
        "priceTo": 28,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#f0f0f0",
            "#4a5568"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Трикотаж",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/sweater,knit,wool?lock=8"
    },
    {
        "id": 9,
        "title": {
            "ru": "Пошив на заказ: Трикотаж (9)",
            "en": "Custom Order: Knitwear (9)"
        },
        "category": {
            "ru": "Трикотаж",
            "en": "Knitwear"
        },
        "categorySlug": "knitwear",
        "industrySlug": "textile",
        "company": "Knitwear Factory 3",
        "companyId": 3,
        "region": "Наманган",
        "moq": "100 шт",
        "priceFrom": 19,
        "priceTo": 29,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#4a5568",
            "#c53030"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Трикотаж",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/sweater,knit,wool?lock=9"
    },
    {
        "id": 10,
        "title": {
            "ru": "Готовый товар: Платья и юбки (10)",
            "en": "In-stock Product: Dresses & Skirts (10)"
        },
        "category": {
            "ru": "Платья и юбки",
            "en": "Dresses & Skirts"
        },
        "categorySlug": "dresses",
        "industrySlug": "textile",
        "company": "Dresses Factory 4",
        "companyId": 4,
        "region": "Бухара",
        "moq": "10 шт",
        "priceFrom": 20,
        "priceTo": 30,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#c53030",
            "#1565c0"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Платья и юбки",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/dress,fashion,woman?lock=10"
    },
    {
        "id": 11,
        "title": {
            "ru": "Под ваш бренд: Платья и юбки (11)",
            "en": "White Label: Dresses & Skirts (11)"
        },
        "category": {
            "ru": "Платья и юбки",
            "en": "Dresses & Skirts"
        },
        "categorySlug": "dresses",
        "industrySlug": "textile",
        "company": "Dresses Factory 4",
        "companyId": 4,
        "region": "Бухара",
        "moq": "100 шт",
        "priceFrom": 21,
        "priceTo": 31,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#1565c0",
            "#e8f5e9"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Платья и юбки",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/dress,fashion,woman?lock=11"
    },
    {
        "id": 12,
        "title": {
            "ru": "Пошив на заказ: Платья и юбки (12)",
            "en": "Custom Order: Dresses & Skirts (12)"
        },
        "category": {
            "ru": "Платья и юбки",
            "en": "Dresses & Skirts"
        },
        "categorySlug": "dresses",
        "industrySlug": "textile",
        "company": "Dresses Factory 4",
        "companyId": 4,
        "region": "Бухара",
        "moq": "100 шт",
        "priceFrom": 22,
        "priceTo": 32,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#e8f5e9",
            "#f3e5f5"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Платья и юбки",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/dress,fashion,woman?lock=12"
    },
    {
        "id": 13,
        "title": {
            "ru": "Готовый товар: Детская одежда (13)",
            "en": "In-stock Product: Children's Wear (13)"
        },
        "category": {
            "ru": "Детская одежда",
            "en": "Children's Wear"
        },
        "categorySlug": "children-wear",
        "industrySlug": "textile",
        "company": "Children's Factory 5",
        "companyId": 5,
        "region": "Андижан",
        "moq": "10 шт",
        "priceFrom": 23,
        "priceTo": 33,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#f3e5f5",
            "#1a1a1a"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Детская одежда",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/kids,clothing?lock=13"
    },
    {
        "id": 14,
        "title": {
            "ru": "Под ваш бренд: Детская одежда (14)",
            "en": "White Label: Children's Wear (14)"
        },
        "category": {
            "ru": "Детская одежда",
            "en": "Children's Wear"
        },
        "categorySlug": "children-wear",
        "industrySlug": "textile",
        "company": "Children's Factory 5",
        "companyId": 5,
        "region": "Андижан",
        "moq": "100 шт",
        "priceFrom": 24,
        "priceTo": 34,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#1a1a1a",
            "#f0f0f0"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Детская одежда",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/kids,clothing?lock=14"
    },
    {
        "id": 15,
        "title": {
            "ru": "Пошив на заказ: Детская одежда (15)",
            "en": "Custom Order: Children's Wear (15)"
        },
        "category": {
            "ru": "Детская одежда",
            "en": "Children's Wear"
        },
        "categorySlug": "children-wear",
        "industrySlug": "textile",
        "company": "Children's Factory 5",
        "companyId": 5,
        "region": "Андижан",
        "moq": "100 шт",
        "priceFrom": 25,
        "priceTo": 35,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#f0f0f0",
            "#4a5568"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Детская одежда",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/kids,clothing?lock=15"
    },
    {
        "id": 16,
        "title": {
            "ru": "Готовый товар: Домашний текстиль (16)",
            "en": "In-stock Product: Home Textile (16)"
        },
        "category": {
            "ru": "Домашний текстиль",
            "en": "Home Textile"
        },
        "categorySlug": "home-textile",
        "industrySlug": "textile",
        "company": "Home Factory 6",
        "companyId": 6,
        "region": "Ташкент",
        "moq": "10 шт",
        "priceFrom": 26,
        "priceTo": 36,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#4a5568",
            "#c53030"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Домашний текстиль",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/bedding,textile,home?lock=16"
    },
    {
        "id": 17,
        "title": {
            "ru": "Под ваш бренд: Домашний текстиль (17)",
            "en": "White Label: Home Textile (17)"
        },
        "category": {
            "ru": "Домашний текстиль",
            "en": "Home Textile"
        },
        "categorySlug": "home-textile",
        "industrySlug": "textile",
        "company": "Home Factory 6",
        "companyId": 6,
        "region": "Ташкент",
        "moq": "100 шт",
        "priceFrom": 27,
        "priceTo": 37,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#c53030",
            "#1565c0"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Домашний текстиль",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/bedding,textile,home?lock=17"
    },
    {
        "id": 18,
        "title": {
            "ru": "Пошив на заказ: Домашний текстиль (18)",
            "en": "Custom Order: Home Textile (18)"
        },
        "category": {
            "ru": "Домашний текстиль",
            "en": "Home Textile"
        },
        "categorySlug": "home-textile",
        "industrySlug": "textile",
        "company": "Home Factory 6",
        "companyId": 6,
        "region": "Ташкент",
        "moq": "100 шт",
        "priceFrom": 28,
        "priceTo": 38,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#1565c0",
            "#e8f5e9"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Домашний текстиль",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/bedding,textile,home?lock=18"
    },
    {
        "id": 19,
        "title": {
            "ru": "Готовый товар: Форменная одежда (19)",
            "en": "In-stock Product: Workwear (19)"
        },
        "category": {
            "ru": "Форменная одежда",
            "en": "Workwear"
        },
        "categorySlug": "workwear",
        "industrySlug": "textile",
        "company": "Workwear Factory 7",
        "companyId": 7,
        "region": "Фергана",
        "moq": "10 шт",
        "priceFrom": 29,
        "priceTo": 39,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#e8f5e9",
            "#f3e5f5"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Форменная одежда",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/uniform,work,safety?lock=19"
    },
    {
        "id": 20,
        "title": {
            "ru": "Под ваш бренд: Форменная одежда (20)",
            "en": "White Label: Workwear (20)"
        },
        "category": {
            "ru": "Форменная одежда",
            "en": "Workwear"
        },
        "categorySlug": "workwear",
        "industrySlug": "textile",
        "company": "Workwear Factory 7",
        "companyId": 7,
        "region": "Фергана",
        "moq": "100 шт",
        "priceFrom": 30,
        "priceTo": 40,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#f3e5f5",
            "#1a1a1a"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Форменная одежда",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/uniform,work,safety?lock=20"
    },
    {
        "id": 21,
        "title": {
            "ru": "Пошив на заказ: Форменная одежда (21)",
            "en": "Custom Order: Workwear (21)"
        },
        "category": {
            "ru": "Форменная одежда",
            "en": "Workwear"
        },
        "categorySlug": "workwear",
        "industrySlug": "textile",
        "company": "Workwear Factory 7",
        "companyId": 7,
        "region": "Фергана",
        "moq": "100 шт",
        "priceFrom": 31,
        "priceTo": 41,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#1a1a1a",
            "#f0f0f0"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Форменная одежда",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/uniform,work,safety?lock=21"
    },
    {
        "id": 22,
        "title": {
            "ru": "Готовый товар: Аксессуары и галантерея (22)",
            "en": "In-stock Product: Accessories (22)"
        },
        "category": {
            "ru": "Аксессуары и галантерея",
            "en": "Accessories"
        },
        "categorySlug": "accessories",
        "industrySlug": "textile",
        "company": "Accessories Factory 8",
        "companyId": 8,
        "region": "Самарканд",
        "moq": "10 шт",
        "priceFrom": 32,
        "priceTo": 42,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#f0f0f0",
            "#4a5568"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Аксессуары и галантерея",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/scarf,gloves,bag?lock=22"
    },
    {
        "id": 23,
        "title": {
            "ru": "Под ваш бренд: Аксессуары и галантерея (23)",
            "en": "White Label: Accessories (23)"
        },
        "category": {
            "ru": "Аксессуары и галантерея",
            "en": "Accessories"
        },
        "categorySlug": "accessories",
        "industrySlug": "textile",
        "company": "Accessories Factory 8",
        "companyId": 8,
        "region": "Самарканд",
        "moq": "100 шт",
        "priceFrom": 33,
        "priceTo": 43,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#4a5568",
            "#c53030"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Аксессуары и галантерея",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/scarf,gloves,bag?lock=23"
    },
    {
        "id": 24,
        "title": {
            "ru": "Пошив на заказ: Аксессуары и галантерея (24)",
            "en": "Custom Order: Accessories (24)"
        },
        "category": {
            "ru": "Аксессуары и галантерея",
            "en": "Accessories"
        },
        "categorySlug": "accessories",
        "industrySlug": "textile",
        "company": "Accessories Factory 8",
        "companyId": 8,
        "region": "Самарканд",
        "moq": "100 шт",
        "priceFrom": 34,
        "priceTo": 44,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#c53030",
            "#1565c0"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Аксессуары и галантерея",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/scarf,gloves,bag?lock=24"
    },
    {
        "id": 25,
        "title": {
            "ru": "Готовый товар: Натуральный шёлк (25)",
            "en": "In-stock Product: Natural Silk (25)"
        },
        "category": {
            "ru": "Натуральный шёлк",
            "en": "Natural Silk"
        },
        "categorySlug": "natural-silk",
        "industrySlug": "silk",
        "company": "Natural Factory 9",
        "companyId": 9,
        "region": "Наманган",
        "moq": "10 шт",
        "priceFrom": 35,
        "priceTo": 45,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#1565c0",
            "#e8f5e9"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Натуральный шёлк",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/silk,fabric,luxury?lock=25"
    },
    {
        "id": 26,
        "title": {
            "ru": "Под ваш бренд: Натуральный шёлк (26)",
            "en": "White Label: Natural Silk (26)"
        },
        "category": {
            "ru": "Натуральный шёлк",
            "en": "Natural Silk"
        },
        "categorySlug": "natural-silk",
        "industrySlug": "silk",
        "company": "Natural Factory 9",
        "companyId": 9,
        "region": "Наманган",
        "moq": "100 шт",
        "priceFrom": 36,
        "priceTo": 46,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#e8f5e9",
            "#f3e5f5"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Натуральный шёлк",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/silk,fabric,luxury?lock=26"
    },
    {
        "id": 27,
        "title": {
            "ru": "Пошив на заказ: Натуральный шёлк (27)",
            "en": "Custom Order: Natural Silk (27)"
        },
        "category": {
            "ru": "Натуральный шёлк",
            "en": "Natural Silk"
        },
        "categorySlug": "natural-silk",
        "industrySlug": "silk",
        "company": "Natural Factory 9",
        "companyId": 9,
        "region": "Наманган",
        "moq": "100 шт",
        "priceFrom": 37,
        "priceTo": 47,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#f3e5f5",
            "#1a1a1a"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Натуральный шёлк",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/silk,fabric,luxury?lock=27"
    },
    {
        "id": 28,
        "title": {
            "ru": "Готовый товар: Шёлковые платья и блузы (28)",
            "en": "In-stock Product: Silk Dresses & Blouses (28)"
        },
        "category": {
            "ru": "Шёлковые платья и блузы",
            "en": "Silk Dresses & Blouses"
        },
        "categorySlug": "silk-dresses",
        "industrySlug": "silk",
        "company": "Silk Factory 10",
        "companyId": 10,
        "region": "Бухара",
        "moq": "10 шт",
        "priceFrom": 38,
        "priceTo": 48,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#1a1a1a",
            "#f0f0f0"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Шёлковые платья и блузы",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/silk,dress,fashion?lock=28"
    },
    {
        "id": 29,
        "title": {
            "ru": "Под ваш бренд: Шёлковые платья и блузы (29)",
            "en": "White Label: Silk Dresses & Blouses (29)"
        },
        "category": {
            "ru": "Шёлковые платья и блузы",
            "en": "Silk Dresses & Blouses"
        },
        "categorySlug": "silk-dresses",
        "industrySlug": "silk",
        "company": "Silk Factory 10",
        "companyId": 10,
        "region": "Бухара",
        "moq": "100 шт",
        "priceFrom": 39,
        "priceTo": 49,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#f0f0f0",
            "#4a5568"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Шёлковые платья и блузы",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/silk,dress,fashion?lock=29"
    },
    {
        "id": 30,
        "title": {
            "ru": "Пошив на заказ: Шёлковые платья и блузы (30)",
            "en": "Custom Order: Silk Dresses & Blouses (30)"
        },
        "category": {
            "ru": "Шёлковые платья и блузы",
            "en": "Silk Dresses & Blouses"
        },
        "categorySlug": "silk-dresses",
        "industrySlug": "silk",
        "company": "Silk Factory 10",
        "companyId": 10,
        "region": "Бухара",
        "moq": "100 шт",
        "priceFrom": 40,
        "priceTo": 50,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#4a5568",
            "#c53030"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Шёлковые платья и блузы",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/silk,dress,fashion?lock=30"
    },
    {
        "id": 31,
        "title": {
            "ru": "Готовый товар: Атласная ткань (31)",
            "en": "In-stock Product: Satin Fabric (31)"
        },
        "category": {
            "ru": "Атласная ткань",
            "en": "Satin Fabric"
        },
        "categorySlug": "satin-fabric",
        "industrySlug": "silk",
        "company": "Satin Factory 11",
        "companyId": 11,
        "region": "Андижан",
        "moq": "10 шт",
        "priceFrom": 41,
        "priceTo": 51,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#c53030",
            "#1565c0"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Атласная ткань",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/satin,fabric,shiny?lock=31"
    },
    {
        "id": 32,
        "title": {
            "ru": "Под ваш бренд: Атласная ткань (32)",
            "en": "White Label: Satin Fabric (32)"
        },
        "category": {
            "ru": "Атласная ткань",
            "en": "Satin Fabric"
        },
        "categorySlug": "satin-fabric",
        "industrySlug": "silk",
        "company": "Satin Factory 11",
        "companyId": 11,
        "region": "Андижан",
        "moq": "100 шт",
        "priceFrom": 42,
        "priceTo": 52,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#1565c0",
            "#e8f5e9"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Атласная ткань",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/satin,fabric,shiny?lock=32"
    },
    {
        "id": 33,
        "title": {
            "ru": "Пошив на заказ: Атласная ткань (33)",
            "en": "Custom Order: Satin Fabric (33)"
        },
        "category": {
            "ru": "Атласная ткань",
            "en": "Satin Fabric"
        },
        "categorySlug": "satin-fabric",
        "industrySlug": "silk",
        "company": "Satin Factory 11",
        "companyId": 11,
        "region": "Андижан",
        "moq": "100 шт",
        "priceFrom": 43,
        "priceTo": 53,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#e8f5e9",
            "#f3e5f5"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Атласная ткань",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/satin,fabric,shiny?lock=33"
    },
    {
        "id": 34,
        "title": {
            "ru": "Готовый товар: Шарфы и платки (34)",
            "en": "In-stock Product: Scarves & Shawls (34)"
        },
        "category": {
            "ru": "Шарфы и платки",
            "en": "Scarves & Shawls"
        },
        "categorySlug": "silk-scarves",
        "industrySlug": "silk",
        "company": "Scarves Factory 12",
        "companyId": 12,
        "region": "Ташкент",
        "moq": "10 шт",
        "priceFrom": 44,
        "priceTo": 54,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#f3e5f5",
            "#1a1a1a"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Шарфы и платки",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/silk,scarf,pattern?lock=34"
    },
    {
        "id": 35,
        "title": {
            "ru": "Под ваш бренд: Шарфы и платки (35)",
            "en": "White Label: Scarves & Shawls (35)"
        },
        "category": {
            "ru": "Шарфы и платки",
            "en": "Scarves & Shawls"
        },
        "categorySlug": "silk-scarves",
        "industrySlug": "silk",
        "company": "Scarves Factory 12",
        "companyId": 12,
        "region": "Ташкент",
        "moq": "100 шт",
        "priceFrom": 45,
        "priceTo": 55,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#1a1a1a",
            "#f0f0f0"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Шарфы и платки",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/silk,scarf,pattern?lock=35"
    },
    {
        "id": 36,
        "title": {
            "ru": "Пошив на заказ: Шарфы и платки (36)",
            "en": "Custom Order: Scarves & Shawls (36)"
        },
        "category": {
            "ru": "Шарфы и платки",
            "en": "Scarves & Shawls"
        },
        "categorySlug": "silk-scarves",
        "industrySlug": "silk",
        "company": "Scarves Factory 12",
        "companyId": 12,
        "region": "Ташкент",
        "moq": "100 шт",
        "priceFrom": 46,
        "priceTo": 56,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#f0f0f0",
            "#4a5568"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Шарфы и платки",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/silk,scarf,pattern?lock=36"
    },
    {
        "id": 37,
        "title": {
            "ru": "Готовый товар: Икат и адрас (нац. ткани) (37)",
            "en": "In-stock Product: Ikat & Adras (Traditional) (37)"
        },
        "category": {
            "ru": "Икат и адрас (нац. ткани)",
            "en": "Ikat & Adras (Traditional)"
        },
        "categorySlug": "ikat",
        "industrySlug": "silk",
        "company": "Ikat Factory 13",
        "companyId": 13,
        "region": "Фергана",
        "moq": "10 шт",
        "priceFrom": 47,
        "priceTo": 57,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#4a5568",
            "#c53030"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Икат и адрас (нац. ткани)",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/ikat,traditional,fabric?lock=37"
    },
    {
        "id": 38,
        "title": {
            "ru": "Под ваш бренд: Икат и адрас (нац. ткани) (38)",
            "en": "White Label: Ikat & Adras (Traditional) (38)"
        },
        "category": {
            "ru": "Икат и адрас (нац. ткани)",
            "en": "Ikat & Adras (Traditional)"
        },
        "categorySlug": "ikat",
        "industrySlug": "silk",
        "company": "Ikat Factory 13",
        "companyId": 13,
        "region": "Фергана",
        "moq": "100 шт",
        "priceFrom": 48,
        "priceTo": 58,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#c53030",
            "#1565c0"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Икат и адрас (нац. ткани)",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/ikat,traditional,fabric?lock=38"
    },
    {
        "id": 39,
        "title": {
            "ru": "Пошив на заказ: Икат и адрас (нац. ткани) (39)",
            "en": "Custom Order: Ikat & Adras (Traditional) (39)"
        },
        "category": {
            "ru": "Икат и адрас (нац. ткани)",
            "en": "Ikat & Adras (Traditional)"
        },
        "categorySlug": "ikat",
        "industrySlug": "silk",
        "company": "Ikat Factory 13",
        "companyId": 13,
        "region": "Фергана",
        "moq": "100 шт",
        "priceFrom": 49,
        "priceTo": 59,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#1565c0",
            "#e8f5e9"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Икат и адрас (нац. ткани)",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/ikat,traditional,fabric?lock=39"
    },
    {
        "id": 40,
        "title": {
            "ru": "Готовый товар: Кожаные изделия (40)",
            "en": "In-stock Product: Leather Goods (40)"
        },
        "category": {
            "ru": "Кожаные изделия",
            "en": "Leather Goods"
        },
        "categorySlug": "leather-goods",
        "industrySlug": "leather",
        "company": "Leather Factory 14",
        "companyId": 14,
        "region": "Самарканд",
        "moq": "10 шт",
        "priceFrom": 50,
        "priceTo": 60,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#e8f5e9",
            "#f3e5f5"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Кожаные изделия",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/leather,wallet,craft?lock=40"
    },
    {
        "id": 41,
        "title": {
            "ru": "Под ваш бренд: Кожаные изделия (41)",
            "en": "White Label: Leather Goods (41)"
        },
        "category": {
            "ru": "Кожаные изделия",
            "en": "Leather Goods"
        },
        "categorySlug": "leather-goods",
        "industrySlug": "leather",
        "company": "Leather Factory 14",
        "companyId": 14,
        "region": "Самарканд",
        "moq": "100 шт",
        "priceFrom": 51,
        "priceTo": 61,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#f3e5f5",
            "#1a1a1a"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Кожаные изделия",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/leather,wallet,craft?lock=41"
    },
    {
        "id": 42,
        "title": {
            "ru": "Пошив на заказ: Кожаные изделия (42)",
            "en": "Custom Order: Leather Goods (42)"
        },
        "category": {
            "ru": "Кожаные изделия",
            "en": "Leather Goods"
        },
        "categorySlug": "leather-goods",
        "industrySlug": "leather",
        "company": "Leather Factory 14",
        "companyId": 14,
        "region": "Самарканд",
        "moq": "100 шт",
        "priceFrom": 52,
        "priceTo": 62,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#1a1a1a",
            "#f0f0f0"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Кожаные изделия",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/leather,wallet,craft?lock=42"
    },
    {
        "id": 43,
        "title": {
            "ru": "Готовый товар: Сумки и кошельки (43)",
            "en": "In-stock Product: Bags & Wallets (43)"
        },
        "category": {
            "ru": "Сумки и кошельки",
            "en": "Bags & Wallets"
        },
        "categorySlug": "leather-bags",
        "industrySlug": "leather",
        "company": "Bags Factory 15",
        "companyId": 15,
        "region": "Наманган",
        "moq": "10 шт",
        "priceFrom": 53,
        "priceTo": 63,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#f0f0f0",
            "#4a5568"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Сумки и кошельки",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/leather,handbag,luxury?lock=43"
    },
    {
        "id": 44,
        "title": {
            "ru": "Под ваш бренд: Сумки и кошельки (44)",
            "en": "White Label: Bags & Wallets (44)"
        },
        "category": {
            "ru": "Сумки и кошельки",
            "en": "Bags & Wallets"
        },
        "categorySlug": "leather-bags",
        "industrySlug": "leather",
        "company": "Bags Factory 15",
        "companyId": 15,
        "region": "Наманган",
        "moq": "100 шт",
        "priceFrom": 54,
        "priceTo": 64,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#4a5568",
            "#c53030"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Сумки и кошельки",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/leather,handbag,luxury?lock=44"
    },
    {
        "id": 45,
        "title": {
            "ru": "Пошив на заказ: Сумки и кошельки (45)",
            "en": "Custom Order: Bags & Wallets (45)"
        },
        "category": {
            "ru": "Сумки и кошельки",
            "en": "Bags & Wallets"
        },
        "categorySlug": "leather-bags",
        "industrySlug": "leather",
        "company": "Bags Factory 15",
        "companyId": 15,
        "region": "Наманган",
        "moq": "100 шт",
        "priceFrom": 55,
        "priceTo": 65,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#c53030",
            "#1565c0"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Сумки и кошельки",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/leather,handbag,luxury?lock=45"
    },
    {
        "id": 46,
        "title": {
            "ru": "Готовый товар: Куртки и верхняя одежда (46)",
            "en": "In-stock Product: Jackets & Outerwear (46)"
        },
        "category": {
            "ru": "Куртки и верхняя одежда",
            "en": "Jackets & Outerwear"
        },
        "categorySlug": "leather-jackets",
        "industrySlug": "leather",
        "company": "Jackets Factory 16",
        "companyId": 16,
        "region": "Бухара",
        "moq": "10 шт",
        "priceFrom": 56,
        "priceTo": 66,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#1565c0",
            "#e8f5e9"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Куртки и верхняя одежда",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/leather,jacket,fashion?lock=46"
    },
    {
        "id": 47,
        "title": {
            "ru": "Под ваш бренд: Куртки и верхняя одежда (47)",
            "en": "White Label: Jackets & Outerwear (47)"
        },
        "category": {
            "ru": "Куртки и верхняя одежда",
            "en": "Jackets & Outerwear"
        },
        "categorySlug": "leather-jackets",
        "industrySlug": "leather",
        "company": "Jackets Factory 16",
        "companyId": 16,
        "region": "Бухара",
        "moq": "100 шт",
        "priceFrom": 57,
        "priceTo": 67,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#e8f5e9",
            "#f3e5f5"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Куртки и верхняя одежда",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/leather,jacket,fashion?lock=47"
    },
    {
        "id": 48,
        "title": {
            "ru": "Пошив на заказ: Куртки и верхняя одежда (48)",
            "en": "Custom Order: Jackets & Outerwear (48)"
        },
        "category": {
            "ru": "Куртки и верхняя одежда",
            "en": "Jackets & Outerwear"
        },
        "categorySlug": "leather-jackets",
        "industrySlug": "leather",
        "company": "Jackets Factory 16",
        "companyId": 16,
        "region": "Бухара",
        "moq": "100 шт",
        "priceFrom": 58,
        "priceTo": 68,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#f3e5f5",
            "#1a1a1a"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Куртки и верхняя одежда",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/leather,jacket,fashion?lock=48"
    },
    {
        "id": 49,
        "title": {
            "ru": "Готовый товар: Ремни и аксессуары (49)",
            "en": "In-stock Product: Belts & Accessories (49)"
        },
        "category": {
            "ru": "Ремни и аксессуары",
            "en": "Belts & Accessories"
        },
        "categorySlug": "belts-accessories",
        "industrySlug": "leather",
        "company": "Belts Factory 17",
        "companyId": 17,
        "region": "Андижан",
        "moq": "10 шт",
        "priceFrom": 59,
        "priceTo": 69,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#1a1a1a",
            "#f0f0f0"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Ремни и аксессуары",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/leather,belt,accessory?lock=49"
    },
    {
        "id": 50,
        "title": {
            "ru": "Под ваш бренд: Ремни и аксессуары (50)",
            "en": "White Label: Belts & Accessories (50)"
        },
        "category": {
            "ru": "Ремни и аксессуары",
            "en": "Belts & Accessories"
        },
        "categorySlug": "belts-accessories",
        "industrySlug": "leather",
        "company": "Belts Factory 17",
        "companyId": 17,
        "region": "Андижан",
        "moq": "100 шт",
        "priceFrom": 10,
        "priceTo": 20,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#f0f0f0",
            "#4a5568"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Ремни и аксессуары",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/leather,belt,accessory?lock=50"
    },
    {
        "id": 51,
        "title": {
            "ru": "Пошив на заказ: Ремни и аксессуары (51)",
            "en": "Custom Order: Belts & Accessories (51)"
        },
        "category": {
            "ru": "Ремни и аксессуары",
            "en": "Belts & Accessories"
        },
        "categorySlug": "belts-accessories",
        "industrySlug": "leather",
        "company": "Belts Factory 17",
        "companyId": 17,
        "region": "Андижан",
        "moq": "100 шт",
        "priceFrom": 11,
        "priceTo": 21,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#4a5568",
            "#c53030"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Ремни и аксессуары",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/leather,belt,accessory?lock=51"
    },
    {
        "id": 52,
        "title": {
            "ru": "Готовый товар: Сырьё — кожевенное полуфабрикат (52)",
            "en": "In-stock Product: Raw Leather Material (52)"
        },
        "category": {
            "ru": "Сырьё — кожевенное полуфабрикат",
            "en": "Raw Leather Material"
        },
        "categorySlug": "raw-leather",
        "industrySlug": "leather",
        "company": "Raw Factory 18",
        "companyId": 18,
        "region": "Ташкент",
        "moq": "10 шт",
        "priceFrom": 12,
        "priceTo": 22,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#c53030",
            "#1565c0"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Сырьё — кожевенное полуфабрикат",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/leather,material,tannery?lock=52"
    },
    {
        "id": 53,
        "title": {
            "ru": "Под ваш бренд: Сырьё — кожевенное полуфабрикат (53)",
            "en": "White Label: Raw Leather Material (53)"
        },
        "category": {
            "ru": "Сырьё — кожевенное полуфабрикат",
            "en": "Raw Leather Material"
        },
        "categorySlug": "raw-leather",
        "industrySlug": "leather",
        "company": "Raw Factory 18",
        "companyId": 18,
        "region": "Ташкент",
        "moq": "100 шт",
        "priceFrom": 13,
        "priceTo": 23,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#1565c0",
            "#e8f5e9"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Сырьё — кожевенное полуфабрикат",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/leather,material,tannery?lock=53"
    },
    {
        "id": 54,
        "title": {
            "ru": "Пошив на заказ: Сырьё — кожевенное полуфабрикат (54)",
            "en": "Custom Order: Raw Leather Material (54)"
        },
        "category": {
            "ru": "Сырьё — кожевенное полуфабрикат",
            "en": "Raw Leather Material"
        },
        "categorySlug": "raw-leather",
        "industrySlug": "leather",
        "company": "Raw Factory 18",
        "companyId": 18,
        "region": "Ташкент",
        "moq": "100 шт",
        "priceFrom": 14,
        "priceTo": 24,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#e8f5e9",
            "#f3e5f5"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Сырьё — кожевенное полуфабрикат",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/leather,material,tannery?lock=54"
    },
    {
        "id": 55,
        "title": {
            "ru": "Готовый товар: Мужская обувь (55)",
            "en": "In-stock Product: Men's Footwear (55)"
        },
        "category": {
            "ru": "Мужская обувь",
            "en": "Men's Footwear"
        },
        "categorySlug": "mens-footwear",
        "industrySlug": "footwear",
        "company": "Men's Factory 19",
        "companyId": 19,
        "region": "Фергана",
        "moq": "10 шт",
        "priceFrom": 15,
        "priceTo": 25,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#f3e5f5",
            "#1a1a1a"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Мужская обувь",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/men,shoes,leather?lock=55"
    },
    {
        "id": 56,
        "title": {
            "ru": "Под ваш бренд: Мужская обувь (56)",
            "en": "White Label: Men's Footwear (56)"
        },
        "category": {
            "ru": "Мужская обувь",
            "en": "Men's Footwear"
        },
        "categorySlug": "mens-footwear",
        "industrySlug": "footwear",
        "company": "Men's Factory 19",
        "companyId": 19,
        "region": "Фергана",
        "moq": "100 шт",
        "priceFrom": 16,
        "priceTo": 26,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#1a1a1a",
            "#f0f0f0"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Мужская обувь",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/men,shoes,leather?lock=56"
    },
    {
        "id": 57,
        "title": {
            "ru": "Пошив на заказ: Мужская обувь (57)",
            "en": "Custom Order: Men's Footwear (57)"
        },
        "category": {
            "ru": "Мужская обувь",
            "en": "Men's Footwear"
        },
        "categorySlug": "mens-footwear",
        "industrySlug": "footwear",
        "company": "Men's Factory 19",
        "companyId": 19,
        "region": "Фергана",
        "moq": "100 шт",
        "priceFrom": 17,
        "priceTo": 27,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#f0f0f0",
            "#4a5568"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Мужская обувь",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/men,shoes,leather?lock=57"
    },
    {
        "id": 58,
        "title": {
            "ru": "Готовый товар: Женская обувь (58)",
            "en": "In-stock Product: Women's Footwear (58)"
        },
        "category": {
            "ru": "Женская обувь",
            "en": "Women's Footwear"
        },
        "categorySlug": "womens-footwear",
        "industrySlug": "footwear",
        "company": "Women's Factory 20",
        "companyId": 20,
        "region": "Самарканд",
        "moq": "10 шт",
        "priceFrom": 18,
        "priceTo": 28,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#4a5568",
            "#c53030"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Женская обувь",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/women,shoes,heels?lock=58"
    },
    {
        "id": 59,
        "title": {
            "ru": "Под ваш бренд: Женская обувь (59)",
            "en": "White Label: Women's Footwear (59)"
        },
        "category": {
            "ru": "Женская обувь",
            "en": "Women's Footwear"
        },
        "categorySlug": "womens-footwear",
        "industrySlug": "footwear",
        "company": "Women's Factory 20",
        "companyId": 20,
        "region": "Самарканд",
        "moq": "100 шт",
        "priceFrom": 19,
        "priceTo": 29,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#c53030",
            "#1565c0"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Женская обувь",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/women,shoes,heels?lock=59"
    },
    {
        "id": 60,
        "title": {
            "ru": "Пошив на заказ: Женская обувь (60)",
            "en": "Custom Order: Women's Footwear (60)"
        },
        "category": {
            "ru": "Женская обувь",
            "en": "Women's Footwear"
        },
        "categorySlug": "womens-footwear",
        "industrySlug": "footwear",
        "company": "Women's Factory 20",
        "companyId": 20,
        "region": "Самарканд",
        "moq": "100 шт",
        "priceFrom": 20,
        "priceTo": 30,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#1565c0",
            "#e8f5e9"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Женская обувь",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/women,shoes,heels?lock=60"
    },
    {
        "id": 61,
        "title": {
            "ru": "Готовый товар: Детская обувь (61)",
            "en": "In-stock Product: Children's Footwear (61)"
        },
        "category": {
            "ru": "Детская обувь",
            "en": "Children's Footwear"
        },
        "categorySlug": "children-footwear",
        "industrySlug": "footwear",
        "company": "Children's Factory 21",
        "companyId": 21,
        "region": "Наманган",
        "moq": "10 шт",
        "priceFrom": 21,
        "priceTo": 31,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#e8f5e9",
            "#f3e5f5"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Детская обувь",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/kids,shoes,sneakers?lock=61"
    },
    {
        "id": 62,
        "title": {
            "ru": "Под ваш бренд: Детская обувь (62)",
            "en": "White Label: Children's Footwear (62)"
        },
        "category": {
            "ru": "Детская обувь",
            "en": "Children's Footwear"
        },
        "categorySlug": "children-footwear",
        "industrySlug": "footwear",
        "company": "Children's Factory 21",
        "companyId": 21,
        "region": "Наманган",
        "moq": "100 шт",
        "priceFrom": 22,
        "priceTo": 32,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#f3e5f5",
            "#1a1a1a"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Детская обувь",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/kids,shoes,sneakers?lock=62"
    },
    {
        "id": 63,
        "title": {
            "ru": "Пошив на заказ: Детская обувь (63)",
            "en": "Custom Order: Children's Footwear (63)"
        },
        "category": {
            "ru": "Детская обувь",
            "en": "Children's Footwear"
        },
        "categorySlug": "children-footwear",
        "industrySlug": "footwear",
        "company": "Children's Factory 21",
        "companyId": 21,
        "region": "Наманган",
        "moq": "100 шт",
        "priceFrom": 23,
        "priceTo": 33,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#1a1a1a",
            "#f0f0f0"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Детская обувь",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/kids,shoes,sneakers?lock=63"
    },
    {
        "id": 64,
        "title": {
            "ru": "Готовый товар: Спортивная обувь (64)",
            "en": "In-stock Product: Sports Footwear (64)"
        },
        "category": {
            "ru": "Спортивная обувь",
            "en": "Sports Footwear"
        },
        "categorySlug": "sports-footwear",
        "industrySlug": "footwear",
        "company": "Sports Factory 22",
        "companyId": 22,
        "region": "Бухара",
        "moq": "10 шт",
        "priceFrom": 24,
        "priceTo": 34,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#f0f0f0",
            "#4a5568"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Спортивная обувь",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/sneakers,running,sports?lock=64"
    },
    {
        "id": 65,
        "title": {
            "ru": "Под ваш бренд: Спортивная обувь (65)",
            "en": "White Label: Sports Footwear (65)"
        },
        "category": {
            "ru": "Спортивная обувь",
            "en": "Sports Footwear"
        },
        "categorySlug": "sports-footwear",
        "industrySlug": "footwear",
        "company": "Sports Factory 22",
        "companyId": 22,
        "region": "Бухара",
        "moq": "100 шт",
        "priceFrom": 25,
        "priceTo": 35,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#4a5568",
            "#c53030"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Спортивная обувь",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/sneakers,running,sports?lock=65"
    },
    {
        "id": 66,
        "title": {
            "ru": "Пошив на заказ: Спортивная обувь (66)",
            "en": "Custom Order: Sports Footwear (66)"
        },
        "category": {
            "ru": "Спортивная обувь",
            "en": "Sports Footwear"
        },
        "categorySlug": "sports-footwear",
        "industrySlug": "footwear",
        "company": "Sports Factory 22",
        "companyId": 22,
        "region": "Бухара",
        "moq": "100 шт",
        "priceFrom": 26,
        "priceTo": 36,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#c53030",
            "#1565c0"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Спортивная обувь",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/sneakers,running,sports?lock=66"
    },
    {
        "id": 67,
        "title": {
            "ru": "Готовый товар: Национальная обувь (Махси) (67)",
            "en": "In-stock Product: National Footwear (Makhsi) (67)"
        },
        "category": {
            "ru": "Национальная обувь (Махси)",
            "en": "National Footwear (Makhsi)"
        },
        "categorySlug": "national-footwear",
        "industrySlug": "footwear",
        "company": "National Factory 23",
        "companyId": 23,
        "region": "Андижан",
        "moq": "10 шт",
        "priceFrom": 27,
        "priceTo": 37,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#1565c0",
            "#e8f5e9"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Национальная обувь (Махси)",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/traditional,shoes,embroidery?lock=67"
    },
    {
        "id": 68,
        "title": {
            "ru": "Под ваш бренд: Национальная обувь (Махси) (68)",
            "en": "White Label: National Footwear (Makhsi) (68)"
        },
        "category": {
            "ru": "Национальная обувь (Махси)",
            "en": "National Footwear (Makhsi)"
        },
        "categorySlug": "national-footwear",
        "industrySlug": "footwear",
        "company": "National Factory 23",
        "companyId": 23,
        "region": "Андижан",
        "moq": "100 шт",
        "priceFrom": 28,
        "priceTo": 38,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#e8f5e9",
            "#f3e5f5"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Национальная обувь (Махси)",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/traditional,shoes,embroidery?lock=68"
    },
    {
        "id": 69,
        "title": {
            "ru": "Пошив на заказ: Национальная обувь (Махси) (69)",
            "en": "Custom Order: National Footwear (Makhsi) (69)"
        },
        "category": {
            "ru": "Национальная обувь (Махси)",
            "en": "National Footwear (Makhsi)"
        },
        "categorySlug": "national-footwear",
        "industrySlug": "footwear",
        "company": "National Factory 23",
        "companyId": 23,
        "region": "Андижан",
        "moq": "100 шт",
        "priceFrom": 29,
        "priceTo": 39,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#f3e5f5",
            "#1a1a1a"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Национальная обувь (Махси)",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/traditional,shoes,embroidery?lock=69"
    },
    {
        "id": 70,
        "title": {
            "ru": "Готовый товар: Ковры ручной работы (70)",
            "en": "In-stock Product: Handmade Carpets (70)"
        },
        "category": {
            "ru": "Ковры ручной работы",
            "en": "Handmade Carpets"
        },
        "categorySlug": "handmade-carpets",
        "industrySlug": "carpets",
        "company": "Handmade Factory 24",
        "companyId": 24,
        "region": "Ташкент",
        "moq": "10 шт",
        "priceFrom": 30,
        "priceTo": 40,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#1a1a1a",
            "#f0f0f0"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Ковры ручной работы",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/carpet,handmade,oriental?lock=70"
    },
    {
        "id": 71,
        "title": {
            "ru": "Под ваш бренд: Ковры ручной работы (71)",
            "en": "White Label: Handmade Carpets (71)"
        },
        "category": {
            "ru": "Ковры ручной работы",
            "en": "Handmade Carpets"
        },
        "categorySlug": "handmade-carpets",
        "industrySlug": "carpets",
        "company": "Handmade Factory 24",
        "companyId": 24,
        "region": "Ташкент",
        "moq": "100 шт",
        "priceFrom": 31,
        "priceTo": 41,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#f0f0f0",
            "#4a5568"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Ковры ручной работы",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/carpet,handmade,oriental?lock=71"
    },
    {
        "id": 72,
        "title": {
            "ru": "Пошив на заказ: Ковры ручной работы (72)",
            "en": "Custom Order: Handmade Carpets (72)"
        },
        "category": {
            "ru": "Ковры ручной работы",
            "en": "Handmade Carpets"
        },
        "categorySlug": "handmade-carpets",
        "industrySlug": "carpets",
        "company": "Handmade Factory 24",
        "companyId": 24,
        "region": "Ташкент",
        "moq": "100 шт",
        "priceFrom": 32,
        "priceTo": 42,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#4a5568",
            "#c53030"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Ковры ручной работы",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/carpet,handmade,oriental?lock=72"
    },
    {
        "id": 73,
        "title": {
            "ru": "Готовый товар: Машинные ковры (73)",
            "en": "In-stock Product: Machine-Made Carpets (73)"
        },
        "category": {
            "ru": "Машинные ковры",
            "en": "Machine-Made Carpets"
        },
        "categorySlug": "machine-carpets",
        "industrySlug": "carpets",
        "company": "Machine-Made Factory 25",
        "companyId": 25,
        "region": "Фергана",
        "moq": "10 шт",
        "priceFrom": 33,
        "priceTo": 43,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#c53030",
            "#1565c0"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Машинные ковры",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/carpet,machine,modern?lock=73"
    },
    {
        "id": 74,
        "title": {
            "ru": "Под ваш бренд: Машинные ковры (74)",
            "en": "White Label: Machine-Made Carpets (74)"
        },
        "category": {
            "ru": "Машинные ковры",
            "en": "Machine-Made Carpets"
        },
        "categorySlug": "machine-carpets",
        "industrySlug": "carpets",
        "company": "Machine-Made Factory 25",
        "companyId": 25,
        "region": "Фергана",
        "moq": "100 шт",
        "priceFrom": 34,
        "priceTo": 44,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#1565c0",
            "#e8f5e9"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Машинные ковры",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/carpet,machine,modern?lock=74"
    },
    {
        "id": 75,
        "title": {
            "ru": "Пошив на заказ: Машинные ковры (75)",
            "en": "Custom Order: Machine-Made Carpets (75)"
        },
        "category": {
            "ru": "Машинные ковры",
            "en": "Machine-Made Carpets"
        },
        "categorySlug": "machine-carpets",
        "industrySlug": "carpets",
        "company": "Machine-Made Factory 25",
        "companyId": 25,
        "region": "Фергана",
        "moq": "100 шт",
        "priceFrom": 35,
        "priceTo": 45,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#e8f5e9",
            "#f3e5f5"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Машинные ковры",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/carpet,machine,modern?lock=75"
    },
    {
        "id": 76,
        "title": {
            "ru": "Готовый товар: Шёлковые ковры (76)",
            "en": "In-stock Product: Silk Carpets (76)"
        },
        "category": {
            "ru": "Шёлковые ковры",
            "en": "Silk Carpets"
        },
        "categorySlug": "silk-carpets",
        "industrySlug": "carpets",
        "company": "Silk Factory 26",
        "companyId": 26,
        "region": "Самарканд",
        "moq": "10 шт",
        "priceFrom": 36,
        "priceTo": 46,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#f3e5f5",
            "#1a1a1a"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Шёлковые ковры",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/silk,carpet,luxury?lock=76"
    },
    {
        "id": 77,
        "title": {
            "ru": "Под ваш бренд: Шёлковые ковры (77)",
            "en": "White Label: Silk Carpets (77)"
        },
        "category": {
            "ru": "Шёлковые ковры",
            "en": "Silk Carpets"
        },
        "categorySlug": "silk-carpets",
        "industrySlug": "carpets",
        "company": "Silk Factory 26",
        "companyId": 26,
        "region": "Самарканд",
        "moq": "100 шт",
        "priceFrom": 37,
        "priceTo": 47,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#1a1a1a",
            "#f0f0f0"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Шёлковые ковры",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/silk,carpet,luxury?lock=77"
    },
    {
        "id": 78,
        "title": {
            "ru": "Пошив на заказ: Шёлковые ковры (78)",
            "en": "Custom Order: Silk Carpets (78)"
        },
        "category": {
            "ru": "Шёлковые ковры",
            "en": "Silk Carpets"
        },
        "categorySlug": "silk-carpets",
        "industrySlug": "carpets",
        "company": "Silk Factory 26",
        "companyId": 26,
        "region": "Самарканд",
        "moq": "100 шт",
        "priceFrom": 38,
        "priceTo": 48,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#f0f0f0",
            "#4a5568"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Шёлковые ковры",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/silk,carpet,luxury?lock=78"
    },
    {
        "id": 79,
        "title": {
            "ru": "Готовый товар: Дорожки и мини-ковры (79)",
            "en": "In-stock Product: Runners & Small Rugs (79)"
        },
        "category": {
            "ru": "Дорожки и мини-ковры",
            "en": "Runners & Small Rugs"
        },
        "categorySlug": "carpet-runners",
        "industrySlug": "carpets",
        "company": "Runners Factory 27",
        "companyId": 27,
        "region": "Наманган",
        "moq": "10 шт",
        "priceFrom": 39,
        "priceTo": 49,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#4a5568",
            "#c53030"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Дорожки и мини-ковры",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/carpet,runner,hallway?lock=79"
    },
    {
        "id": 80,
        "title": {
            "ru": "Под ваш бренд: Дорожки и мини-ковры (80)",
            "en": "White Label: Runners & Small Rugs (80)"
        },
        "category": {
            "ru": "Дорожки и мини-ковры",
            "en": "Runners & Small Rugs"
        },
        "categorySlug": "carpet-runners",
        "industrySlug": "carpets",
        "company": "Runners Factory 27",
        "companyId": 27,
        "region": "Наманган",
        "moq": "100 шт",
        "priceFrom": 40,
        "priceTo": 50,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#c53030",
            "#1565c0"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Дорожки и мини-ковры",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/carpet,runner,hallway?lock=80"
    },
    {
        "id": 81,
        "title": {
            "ru": "Пошив на заказ: Дорожки и мини-ковры (81)",
            "en": "Custom Order: Runners & Small Rugs (81)"
        },
        "category": {
            "ru": "Дорожки и мини-ковры",
            "en": "Runners & Small Rugs"
        },
        "categorySlug": "carpet-runners",
        "industrySlug": "carpets",
        "company": "Runners Factory 27",
        "companyId": 27,
        "region": "Наманган",
        "moq": "100 шт",
        "priceFrom": 41,
        "priceTo": 51,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#1565c0",
            "#e8f5e9"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Дорожки и мини-ковры",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/carpet,runner,hallway?lock=81"
    },
    {
        "id": 82,
        "title": {
            "ru": "Готовый товар: Нац. орнамент (Бухара, Самарканд) (82)",
            "en": "In-stock Product: National Ornament (Bukhara, Samarkand) (82)"
        },
        "category": {
            "ru": "Нац. орнамент (Бухара, Самарканд)",
            "en": "National Ornament (Bukhara, Samarkand)"
        },
        "categorySlug": "national-carpet",
        "industrySlug": "carpets",
        "company": "National Factory 28",
        "companyId": 28,
        "region": "Бухара",
        "moq": "10 шт",
        "priceFrom": 42,
        "priceTo": 52,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "instock",
        "colors": [
            "#e8f5e9",
            "#f3e5f5"
        ],
        "leadTime": "В наличии",
        "verified": true,
        "tags": [
            "Нац. орнамент (Бухара, Самарканд)",
            "instock"
        ],
        "image": "https://loremflickr.com/600/600/oriental,rug,pattern?lock=82"
    },
    {
        "id": 83,
        "title": {
            "ru": "Под ваш бренд: Нац. орнамент (Бухара, Самарканд) (83)",
            "en": "White Label: National Ornament (Bukhara, Samarkand) (83)"
        },
        "category": {
            "ru": "Нац. орнамент (Бухара, Самарканд)",
            "en": "National Ornament (Bukhara, Samarkand)"
        },
        "categorySlug": "national-carpet",
        "industrySlug": "carpets",
        "company": "National Factory 28",
        "companyId": 28,
        "region": "Бухара",
        "moq": "100 шт",
        "priceFrom": 43,
        "priceTo": 53,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "whitelabel",
        "colors": [
            "#f3e5f5",
            "#1a1a1a"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Нац. орнамент (Бухара, Самарканд)",
            "whitelabel"
        ],
        "image": "https://loremflickr.com/600/600/oriental,rug,pattern?lock=83"
    },
    {
        "id": 84,
        "title": {
            "ru": "Пошив на заказ: Нац. орнамент (Бухара, Самарканд) (84)",
            "en": "Custom Order: National Ornament (Bukhara, Samarkand) (84)"
        },
        "category": {
            "ru": "Нац. орнамент (Бухара, Самарканд)",
            "en": "National Ornament (Bukhara, Samarkand)"
        },
        "categorySlug": "national-carpet",
        "industrySlug": "carpets",
        "company": "National Factory 28",
        "companyId": 28,
        "region": "Бухара",
        "moq": "100 шт",
        "priceFrom": 44,
        "priceTo": 54,
        "priceCurrency": "$",
        "priceUnit": "шт",
        "type": "rfq",
        "colors": [
            "#1a1a1a",
            "#f0f0f0"
        ],
        "leadTime": "15-30 дн.",
        "verified": true,
        "tags": [
            "Нац. орнамент (Бухара, Самарканд)",
            "rfq"
        ],
        "image": "https://loremflickr.com/600/600/oriental,rug,pattern?lock=84"
    }
];

export const countByCategory = (slug: string) => PRODUCTS.filter(p => p.categorySlug === slug).length;
export const countByIndustry = (slug: string) => PRODUCTS.filter(p => p.industrySlug === slug).length;
