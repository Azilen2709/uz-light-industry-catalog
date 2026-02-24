"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductType } from "@/lib/data";
import { Product } from "@prisma/client";
import { useT } from "@/contexts/LanguageContext";
import CatalogFilters, { FilterState, DEFAULT_FILTERS } from "@/components/catalog/CatalogFilters";
import ProductCard from "@/components/catalog/ProductCard";

type SortOption = "popular" | "price_asc" | "price_desc" | "newest";

// Local extended type matching our API response
type ProductWithCompany = Product & { company: { name: string, region: string, verified: boolean } };

function ProductsContent() {
    const { t, lang } = useT();
    const L = t.catalog;
    const searchParams = useSearchParams();
    const router = useRouter();

    // Read URL params on mount
    const initialCategory = searchParams.get("category") ?? "";
    const initialSubcategory = searchParams.get("subcategory") ?? "";
    const initialType = (searchParams.get("type") ?? "") as ProductType | "";
    const initialIndustry = searchParams.get("industry") ?? "";
    const initialSearch = searchParams.get("q") ?? "";

    const [filters, setFilters] = useState<FilterState>({
        ...DEFAULT_FILTERS,
        categorySlugs: initialCategory ? [initialCategory] : [],
        subcategorySlugs: initialSubcategory ? [initialSubcategory] : [],
        types: initialType && ["instock", "whitelabel", "rfq"].includes(initialType)
            ? [initialType as ProductType]
            : [],
        industrySlug: initialIndustry,
    });
    const [products, setProducts] = useState<ProductWithCompany[]>([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState<SortOption>("popular");
    const [view, setView] = useState<"grid" | "list">("grid");
    const [search, setSearch] = useState(initialSearch);

    // Fetch products
    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (filters.categorySlugs.length === 1) params.set("category", filters.categorySlugs[0]);
        if (filters.subcategorySlugs.length === 1) params.set("subcategory", filters.subcategorySlugs[0]);
        if (filters.types.length === 1) params.set("type", filters.types[0]);
        if (filters.industrySlug) params.set("industry", filters.industrySlug);
        if (filters.regions.length > 0) params.set("region", filters.regions[0]);

        fetch(`/api/products?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch products:", err);
                setLoading(false);
            });
    }, [search, filters.categorySlugs, filters.subcategorySlugs, filters.types, filters.industrySlug, filters.regions]);

    // Sync URL when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        if (search) params.set("q", search);
        if (filters.categorySlugs.length === 1) params.set("category", filters.categorySlugs[0]);
        if (filters.subcategorySlugs.length === 1) params.set("subcategory", filters.subcategorySlugs[0]);
        if (filters.types.length === 1) params.set("type", filters.types[0]);
        if (filters.industrySlug) params.set("industry", filters.industrySlug);
        const qs = params.toString();
        router.replace(qs ? `/products?${qs}` : "/products", { scroll: false });
    }, [search, filters.categorySlugs, filters.subcategorySlugs, filters.types, filters.industrySlug]); // eslint-disable-line react-hooks/exhaustive-deps

    const filtered = useMemo(() => {
        let result = [...products];

        // Client-side text search (in addition to server-side)
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(p =>
                p.titleRu.toLowerCase().includes(q) ||
                p.titleEn.toLowerCase().includes(q) ||
                (p.company?.name || "").toLowerCase().includes(q) ||
                p.tags.some(tag => tag.toLowerCase().includes(q))
            );
        }

        // Industry direction filter (top-level taxonomy)
        if (filters.industrySlug) {
            result = result.filter(p => p.industrySlug === filters.industrySlug);
        }

        // Category filter (Level 2)
        if (filters.categorySlugs.length > 0) {
            result = result.filter(p => filters.categorySlugs.includes(p.categorySlug));
        }

        // Subcategory filter (Level 3)
        if (filters.subcategorySlugs.length > 0) {
            result = result.filter(p => filters.subcategorySlugs.includes((p as any).subCategorySlug));
        }

        // Type filter
        if (filters.types.length > 0) {
            result = result.filter(p => filters.types.includes(p.type));
        }

        // Region filter
        if (filters.regions.length > 0) {
            result = result.filter(p => filters.regions.includes(p.region));
        }

        // Verified only
        if (filters.verifiedOnly) {
            result = result.filter(p => p.verified);
        }

        // Sort
        if (sort === "price_asc") result.sort((a, b) => a.priceFrom - b.priceFrom);
        if (sort === "price_desc") result.sort((a, b) => b.priceTo - a.priceTo);

        return result;
    }, [filters, sort, search]);

    const sortOptions: { value: SortOption; label: string }[] = [
        { value: "popular", label: L.sortOptions.popular },
        { value: "newest", label: L.sortOptions.newest },
        { value: "price_asc", label: L.sortOptions.price_asc },
        { value: "price_desc", label: L.sortOptions.price_desc },
    ];

    const resetAll = () => { setFilters(DEFAULT_FILTERS); setSearch(""); };

    return (
        <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
            {/* Page Header */}
            <div style={{ background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)", padding: "48px 0 40px" }}>
                <div className="container">
                    <h1 style={{ color: "white", fontSize: 36, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
                        {L.title}
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, marginBottom: 28 }}>
                        {products.length}+ {L.subtitle}
                    </p>
                    {/* Search */}
                    <div style={{ display: "flex", background: "white", borderRadius: "var(--radius-md)", overflow: "hidden", maxWidth: 640, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)" }}>
                        <span style={{ padding: "0 16px 0 20px", display: "flex", alignItems: "center", fontSize: 18, color: "var(--color-text-secondary)" }}>🔍</span>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={L.searchPlaceholder}
                            style={{ flex: 1, border: "none", outline: "none", padding: "16px 0", fontSize: 15, color: "var(--color-text)", fontWeight: 500 }}
                        />
                        {search && (
                            <button onClick={() => setSearch("")} style={{ padding: "0 20px", background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", fontSize: 18, transition: "color 0.2s" }}
                                onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-text)"}
                                onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-muted)"}
                            >✕</button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container" style={{ padding: "32px 24px", display: "flex", gap: 32, alignItems: "flex-start" }}>
                {/* Filters Sidebar */}
                <CatalogFilters filters={filters} onChange={setFilters} />

                {/* Main */}
                <main style={{ flex: 1, minWidth: 0 }}>
                    {/* Sort & View Bar */}
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        marginBottom: 24, background: "var(--color-surface)", border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-lg)", padding: "12px 20px",
                        boxShadow: "var(--shadow-sm)"
                    }}>
                        <div style={{ fontSize: 14, color: "var(--color-text-secondary)", fontWeight: 500 }}>
                            {L.found} <strong style={{ color: "var(--color-primary)", fontWeight: 700 }}>{filtered.length}</strong> {L.products}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ fontSize: 13, color: "var(--color-text-secondary)", fontWeight: 500 }}>{L.sortBy}</span>
                                <select value={sort} onChange={e => setSort(e.target.value as SortOption)} style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "8px 12px", fontSize: 13, color: "var(--color-text)", background: "var(--color-surface)", cursor: "pointer", outline: "none", fontWeight: 500, boxShadow: "var(--shadow-sm)" }}>
                                    {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            </div>
                            <div style={{ display: "flex", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
                                {(["grid", "list"] as const).map(v => (
                                    <button key={v} onClick={() => setView(v)} style={{ padding: "6px 12px", border: "none", cursor: "pointer", background: view === v ? "var(--color-accent)" : "var(--color-surface)", color: view === v ? "white" : "var(--color-text-secondary)", fontSize: 16, transition: "all 0.2s" }}>
                                        {v === "grid" ? "⊞" : "☰"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Active Filter Tags */}
                    {(filters.industrySlug || filters.subcategorySlugs.length > 0 || filters.types.length > 0 || filters.categorySlugs.length > 0 || filters.regions.length > 0 || filters.verifiedOnly) && (
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                            {filters.verifiedOnly && (
                                <span style={tagStyle} onClick={() => setFilters(f => ({ ...f, verifiedOnly: false }))}>
                                    ⭐ {lang === "ru" ? "Проверенные" : "Verified"} ✕
                                </span>
                            )}
                            {filters.industrySlug && (
                                <span style={tagStyle} onClick={() => setFilters(f => ({ ...f, industrySlug: "", subcategorySlugs: [] }))}>
                                    🗂 {filters.industrySlug} ✕
                                </span>
                            )}
                            {filters.subcategorySlugs.map(s => (
                                <span key={s} style={tagStyle} onClick={() => setFilters(f => ({ ...f, subcategorySlugs: f.subcategorySlugs.filter(x => x !== s) }))}>
                                    {s} ✕
                                </span>
                            ))}
                            {filters.types.map(type => (
                                <span key={type} style={tagStyle} onClick={() => setFilters(f => ({ ...f, types: f.types.filter(x => x !== type) }))}>
                                    {type === "instock" ? "In-Stock" : type === "whitelabel" ? "White Label" : "RFQ"} ✕
                                </span>
                            ))}
                            {filters.categorySlugs.map(c => (
                                <span key={c} style={tagStyle} onClick={() => setFilters(f => ({ ...f, categorySlugs: f.categorySlugs.filter(x => x !== c) }))}>
                                    {c} ✕
                                </span>
                            ))}
                            {filters.regions.map(r => (
                                <span key={r} style={tagStyle} onClick={() => setFilters(f => ({ ...f, regions: f.regions.filter(x => x !== r) }))}>
                                    📍 {r} ✕
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Products Grid / List */}
                    {loading ? (
                        <div style={{ textAlign: "center", padding: "80px 0" }}>
                            <div style={{ fontSize: 24, color: "var(--color-muted)" }}>Загрузка...</div>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "80px 0", background: "var(--color-surface)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
                            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                            <h3 style={{ fontSize: 20, marginBottom: 8, color: "var(--color-primary)", fontWeight: 700 }}>{L.emptyTitle}</h3>
                            <p style={{ color: "var(--color-muted)", marginBottom: 20, fontSize: 15 }}>{L.emptyDesc}</p>
                            <button className="btn btn-primary" onClick={resetAll} style={{ borderRadius: "var(--radius-xl)" }}>{L.resetAll}</button>
                        </div>
                    ) : view === "grid" ? (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                            {filtered.map(p => <ProductCard key={p.id} product={p} view="grid" lang={lang} />)}
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {filtered.map(p => <ProductCard key={p.id} product={p} view="list" lang={lang} />)}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

const tagStyle: React.CSSProperties = {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)", /* Less rounded tags */
    padding: "6px 14px",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--color-text-secondary)",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    boxShadow: "var(--shadow-sm)",
    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
};

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div style={{ background: "var(--color-bg)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 48 }}>⏳</div>
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}
