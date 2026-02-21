// ─── useCompanyFilters — encapsulates company list filtering/sorting ──────
// Mirrors useCatalogFilters for the /companies page.

"use client";
import { useState, useMemo } from "react";
import type { Company, ProductType } from "@/lib/data/types";

export interface CompanyFilters {
    search: string;
    types: ProductType[];
    categories: string[];
    regions: string[];
    verifiedOnly: boolean;
    sort: "rating" | "orders" | "newest";
}

const DEFAULT_FILTERS: CompanyFilters = {
    search: "",
    types: [],
    categories: [],
    regions: [],
    verifiedOnly: false,
    sort: "rating",
};

export function useCompanyFilters(companies: Company[]) {
    const [filters, setFilters] = useState<CompanyFilters>(DEFAULT_FILTERS);

    const filtered = useMemo(() => {
        let result = [...companies];

        if (filters.search) {
            const q = filters.search.toLowerCase();
            result = result.filter(c =>
                c.name.toLowerCase().includes(q) ||
                c.region.toLowerCase().includes(q) ||
                c.specialization.ru.toLowerCase().includes(q)
            );
        }
        if (filters.types.length)
            result = result.filter(c => filters.types.some(t => c.flows.includes(t)));
        if (filters.categories.length)
            result = result.filter(c => filters.categories.some(cat => c.categories.includes(cat)));
        if (filters.regions.length)
            result = result.filter(c => filters.regions.includes(c.region));
        if (filters.verifiedOnly)
            result = result.filter(c => c.verified);

        switch (filters.sort) {
            case "orders": result.sort((a, b) => b.stats.ordersCompleted - a.stats.ordersCompleted); break;
            case "newest": result.sort((a, b) => b.founded - a.founded); break;
            default: result.sort((a, b) => b.rating - a.rating); break;
        }

        return result;
    }, [companies, filters]);

    const setSearch = (search: string) => setFilters(f => ({ ...f, search }));
    const setSort = (sort: CompanyFilters["sort"]) => setFilters(f => ({ ...f, sort }));
    const setVerifiedOnly = (v: boolean) => setFilters(f => ({ ...f, verifiedOnly: v }));
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
