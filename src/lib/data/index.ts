// ─── lib/data/index.ts — barrel export ───────────────────────────────────
// Import everything from sub-modules and re-export as one surface.

export type { ProductType, Product, Company, Category } from "./types";
export { CATEGORIES } from "./categories";
export { REGIONS } from "./regions";
export { PRODUCTS } from "./products";
export { COMPANIES } from "./companies";
