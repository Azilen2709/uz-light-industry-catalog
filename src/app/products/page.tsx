"use client";
import { useState, useMemo } from "react";
import { PRODUCTS, ProductType } from "@/lib/data";
import CatalogFilters from "@/components/catalog/CatalogFilters";
import ProductCard from "@/components/catalog/ProductCard";

type SortOption = "popular" | "price_asc" | "price_desc" | "newest";

interface FilterState {
    categories: string[];
    types: ProductType[];
    regions: string[];
    priceMax: number;
    verifiedOnly: boolean;
}

const DEFAULT_FILTERS: FilterState = {
    categories: [],
    types: [],
    regions: [],
    priceMax: 999,
    verifiedOnly: false,
};

export default function ProductsPage() {
    const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
    const [sort, setSort] = useState<SortOption>("popular");
    const [view, setView] = useState<"grid" | "list">("grid");
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        let result = [...PRODUCTS];

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.company.toLowerCase().includes(q) ||
                p.tags.some(t => t.toLowerCase().includes(q))
            );
        }
        if (filters.categories.length > 0) {
            result = result.filter(p => filters.categories.includes(p.categorySlug));
        }
        if (filters.types.length > 0) {
            result = result.filter(p => filters.types.includes(p.type));
        }
        if (filters.regions.length > 0) {
            result = result.filter(p => filters.regions.includes(p.region));
        }
        if (filters.verifiedOnly) {
            result = result.filter(p => p.verified);
        }
        if (sort === "price_asc") result.sort((a, b) => a.priceFrom - b.priceFrom);
        if (sort === "price_desc") result.sort((a, b) => b.priceTo - a.priceTo);

        return result;
    }, [filters, sort, search]);

    const sortOptions: { value: SortOption; label: string }[] = [
        { value: "popular", label: "Популярные" },
        { value: "newest", label: "Новые" },
        { value: "price_asc", label: "Цена: дешевле" },
        { value: "price_desc", label: "Цена: дороже" },
    ];

    return (
        <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
            {/* Page Header */}
            <div style={{
                background: "linear-gradient(135deg, var(--color-primary) 0%, #1e4976 100%)",
                padding: "40px 0 32px",
            }}>
                <div className="container">
                    <h1 style={{ color: "white", fontSize: 32, fontWeight: 900, marginBottom: 8 }}>
                        Каталог товаров
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, marginBottom: 24 }}>
                        {PRODUCTS.length}+ товаров от 500+ проверенных фабрик Узбекистана
                    </p>

                    {/* Search Bar */}
                    <div style={{
                        display: "flex",
                        background: "white",
                        borderRadius: 12,
                        overflow: "hidden",
                        maxWidth: 640,
                        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                    }}>
                        <span style={{ padding: "0 14px", display: "flex", alignItems: "center", fontSize: 18 }}>🔍</span>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Худи, постельное бельё, ковры..."
                            style={{
                                flex: 1, border: "none", outline: "none",
                                padding: "14px 0", fontSize: 15, color: "var(--color-text)",
                            }}
                        />
                        {search && (
                            <button onClick={() => setSearch("")} style={{
                                padding: "0 14px", background: "none", border: "none",
                                cursor: "pointer", color: "var(--color-muted)", fontSize: 18,
                            }}>✕</button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container" style={{ padding: "32px 24px", display: "flex", gap: 28, alignItems: "flex-start" }}>
                {/* Filters Sidebar */}
                <CatalogFilters filters={filters} onChange={setFilters} />

                {/* Main Content */}
                <main style={{ flex: 1, minWidth: 0 }}>
                    {/* Sort & View Bar */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 20,
                        background: "white",
                        border: "1px solid var(--color-border)",
                        borderRadius: 12,
                        padding: "10px 16px",
                    }}>
                        <div style={{ fontSize: 14, color: "var(--color-muted)" }}>
                            Найдено: <strong style={{ color: "var(--color-text)" }}>{filtered.length}</strong> товаров
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            {/* Sort */}
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ fontSize: 13, color: "var(--color-muted)" }}>Сортировка:</span>
                                <select
                                    value={sort}
                                    onChange={e => setSort(e.target.value as SortOption)}
                                    style={{
                                        border: "1px solid var(--color-border)",
                                        borderRadius: 8, padding: "4px 10px",
                                        fontSize: 13, color: "var(--color-text)",
                                        background: "white", cursor: "pointer", outline: "none",
                                    }}
                                >
                                    {sortOptions.map(o => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* View toggle */}
                            <div style={{ display: "flex", border: "1px solid var(--color-border)", borderRadius: 8, overflow: "hidden" }}>
                                {(["grid", "list"] as const).map(v => (
                                    <button key={v} onClick={() => setView(v)} style={{
                                        padding: "5px 10px", border: "none", cursor: "pointer",
                                        background: view === v ? "var(--color-accent)" : "white",
                                        color: view === v ? "white" : "var(--color-muted)",
                                        fontSize: 16, transition: "all 0.15s",
                                    }}>
                                        {v === "grid" ? "⊞" : "☰"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Active Filter Tags */}
                    {(filters.types.length > 0 || filters.categories.length > 0 || filters.regions.length > 0 || filters.verifiedOnly) && (
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                            {filters.verifiedOnly && (
                                <span style={tagStyle} onClick={() => setFilters(f => ({ ...f, verifiedOnly: false }))}>
                                    ⭐ Проверенные ✕
                                </span>
                            )}
                            {filters.types.map(t => (
                                <span key={t} style={tagStyle} onClick={() => setFilters(f => ({ ...f, types: f.types.filter(x => x !== t) }))}>
                                    {t === "instock" ? "In-Stock" : t === "whitelabel" ? "White Label" : "RFQ"} ✕
                                </span>
                            ))}
                            {filters.categories.map(c => (
                                <span key={c} style={tagStyle} onClick={() => setFilters(f => ({ ...f, categories: f.categories.filter(x => x !== c) }))}>
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
                    {filtered.length === 0 ? (
                        <div style={{
                            textAlign: "center", padding: "80px 0",
                            background: "white", borderRadius: 16,
                            border: "1px solid var(--color-border)",
                        }}>
                            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                            <h3 style={{ fontSize: 20, marginBottom: 8 }}>Ничего не найдено</h3>
                            <p style={{ color: "var(--color-muted)", marginBottom: 20 }}>Попробуйте изменить фильтры или поисковой запрос</p>
                            <button className="btn btn-primary" onClick={() => { setFilters(DEFAULT_FILTERS); setSearch(""); }}>
                                Сбросить всё
                            </button>
                        </div>
                    ) : view === "grid" ? (
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 18,
                        }}>
                            {filtered.map(p => <ProductCard key={p.id} product={p} view="grid" />)}
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {filtered.map(p => <ProductCard key={p.id} product={p} view="list" />)}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

const tagStyle: React.CSSProperties = {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border-strong)",
    borderRadius: 20,
    padding: "4px 12px",
    fontSize: 12,
    fontWeight: 600,
    color: "var(--color-text-secondary)",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
};
