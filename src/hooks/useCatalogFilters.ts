// ─── useCatalogFilters — encapsulates product catalog filtering/sorting ───
// Extracts the useMemo filter logic from /app/products/page.tsx
// Usage: const { filtered, setSearch, setType, ... } = useCatalogFilters(PRODUCTS);

"use client";
import { useState, useMemo } from "react";
import type { Product, ProductType } from "@/lib/data/types";

export interface CatalogFilters {
    search: string;
    types: ProductType[];
    categories: string[];
    regions: string[];
    verifiedOnly: boolean;
    sort: "popular" | "newest" | "price_asc" | "price_desc";
}

const DEFAULT_FILTERS: CatalogFilters = {
    search: "",
    types: [],
    categories: [],
    regions: [],
    verifiedOnly: false,
    sort: "popular",
};

export function useCatalogFilters(products: Product[]) {
    const [filters, setFilters] = useState<CatalogFilters>(DEFAULT_FILTERS);

    const filtered = useMemo(() => {
        let result = [...products];

        if (filters.search) {
            const q = filters.search.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.company.toLowerCase().includes(q) ||
                p.tags.some(t => t.toLowerCase().includes(q))
            );
        }
        if (filters.types.length) result = result.filter(p => filters.types.includes(p.type));
        if (filters.categories.length) result = result.filter(p => filters.categories.includes(p.categorySlug));
        if (filters.regions.length) result = result.filter(p => filters.regions.includes(p.region));
        if (filters.verifiedOnly) result = result.filter(p => p.verified);

        switch (filters.sort) {
            case "price_asc": result.sort((a, b) => a.priceFrom - b.priceFrom); break;
            case "price_desc": result.sort((a, b) => b.priceFrom - a.priceFrom); break;
            case "newest": result.sort((a, b) => b.id - a.id); break;
            default: break; // "popular" — keep original order
        }

        return result;
    }, [products, filters]);

    // Setters
    const setSearch = (search: string) => setFilters(f => ({ ...f, search }));
    const setSort = (sort: CatalogFilters["sort"]) => setFilters(f => ({ ...f, sort }));
    const setVerifiedOnly = (verifiedOnly: boolean) => setFilters(f => ({ ...f, verifiedOnly }));
    const reset = () => setFilters(DEFAULT_FILTERS);

    const toggleType = (type: ProductType) =>
        setFilters(f => ({
            ...f,
            types: f.types.includes(type) ? f.types.filter(t => t !== type) : [...f.types, type],
        }));

    const toggleCategory = (slug: string) =>
        setFilters(f => ({
            ...f,
            categories: f.categories.includes(slug)
                ? f.categories.filter(c => c !== slug)
                : [...f.categories, slug],
        }));

    const toggleRegion = (region: string) =>
        setFilters(f => ({
            ...f,
            regions: f.regions.includes(region)
                ? f.regions.filter(r => r !== region)
                : [...f.regions, region],
        }));

    const activeCount =
        filters.types.length +
        filters.categories.length +
        filters.regions.length +
        (filters.verifiedOnly ? 1 : 0);

    return {
        filters,
        filtered,
        activeCount,
        setSearch,
        setSort,
        setVerifiedOnly,
        toggleType,
        toggleCategory,
        toggleRegion,
        reset,
    };
}
