// ─── lib/data/index.ts — barrel export ───────────────────────────────────

export type { ProductType, Product, Company, Category, Region } from "./types";
export { CATEGORIES, findCategory, getCategoriesByIndustry } from "./categories";
export { REGIONS, getRegionLabel, getRegionRuNames } from "./regions";
export { PRODUCTS, countByCategory, countByIndustry } from "./products";
export { COMPANIES } from "./companies";
