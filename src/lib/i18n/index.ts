// ─── lib/i18n/index.ts — assembles all translation modules ───────────────
// This is the single source of truth for the translations object.
// Each domain is maintained in its own file for easy editing.

import { navTranslations } from "./nav";
import { heroTranslations } from "./hero";
import { statsTranslations } from "./stats";
import { categoriesTranslations } from "./categories";
import { howItWorksTranslations } from "./howItWorks";
import { topProductsTranslations } from "./topProducts";
import { topFactoriesTranslations } from "./topFactories";
import { footerTranslations } from "./footer";
import { catalogTranslations } from "./catalog";
import { productTranslations } from "./product";
import { commonTranslations } from "./common";
import { rfqTranslations } from "./rfq";

export type { Lang } from "./types";

export const translations = {
    ru: {
        nav: navTranslations.ru,
        hero: heroTranslations.ru,
        stats: statsTranslations.ru,
        categories: categoriesTranslations.ru,
        howItWorks: howItWorksTranslations.ru,
        topProducts: topProductsTranslations.ru,
        topFactories: topFactoriesTranslations.ru,
        footer: footerTranslations.ru,
        catalog: catalogTranslations.ru,
        product: productTranslations.ru,
        common: commonTranslations.ru,
        rfq: rfqTranslations.ru,
    },
    en: {
        nav: navTranslations.en,
        hero: heroTranslations.en,
        stats: statsTranslations.en,
        categories: categoriesTranslations.en,
        howItWorks: howItWorksTranslations.en,
        topProducts: topProductsTranslations.en,
        topFactories: topFactoriesTranslations.en,
        footer: footerTranslations.en,
        catalog: catalogTranslations.en,
        product: productTranslations.en,
        common: commonTranslations.en,
        rfq: rfqTranslations.en,
    },
} as const;

export type Translations = typeof translations.ru;
