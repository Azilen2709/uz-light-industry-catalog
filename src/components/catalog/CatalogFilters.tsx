"use client";
import { CATEGORIES, REGIONS, ProductType } from "@/lib/data";

interface FilterState {
    categories: string[];
    types: ProductType[];
    regions: string[];
    priceMax: number;
    verifiedOnly: boolean;
}

interface CatalogFiltersProps {
    filters: FilterState;
    onChange: (filters: FilterState) => void;
}

export default function CatalogFilters({ filters, onChange }: CatalogFiltersProps) {
    function toggleCategory(slug: string) {
        const next = filters.categories.includes(slug)
            ? filters.categories.filter(c => c !== slug)
            : [...filters.categories, slug];
        onChange({ ...filters, categories: next });
    }

    function toggleType(type: ProductType) {
        const next = filters.types.includes(type)
            ? filters.types.filter(t => t !== type)
            : [...filters.types, type];
        onChange({ ...filters, types: next });
    }

    function toggleRegion(region: string) {
        const next = filters.regions.includes(region)
            ? filters.regions.filter(r => r !== region)
            : [...filters.regions, region];
        onChange({ ...filters, regions: next });
    }

    const typeOptions: { value: ProductType; label: string; color: string; dot: string }[] = [
        { value: "instock", label: "Со склада (In-Stock)", color: "#16a34a", dot: "#22c55e" },
        { value: "whitelabel", label: "Свой бренд (White Label)", color: "#0e7bc4", dot: "#3b82f6" },
        { value: "rfq", label: "По ТЗ клиента (RFQ)", color: "#7c3aed", dot: "#a855f7" },
    ];

    const activeCount =
        filters.categories.length +
        filters.types.length +
        filters.regions.length +
        (filters.verifiedOnly ? 1 : 0);

    return (
        <aside style={{ width: 260, flexShrink: 0 }}>
            <style>{`
        .filter-section { margin-bottom: 24px; }
        .filter-title {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--color-muted);
          margin-bottom: 12px;
        }
        .filter-check {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 8px; border-radius: 8px;
          cursor: pointer; transition: background 0.15s;
          font-size: 13px; color: var(--color-text-secondary);
          margin-bottom: 2px; border: none; background: transparent;
          width: 100%; text-align: left;
        }
        .filter-check:hover { background: var(--color-bg); }
        .filter-check.active { color: var(--color-text); font-weight: 600; }
        .custom-checkbox {
          width: 16px; height: 16px; border-radius: 4px;
          border: 1.5px solid var(--color-border-strong);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.15s;
        }
        .custom-checkbox.checked {
          background: var(--color-accent);
          border-color: var(--color-accent);
        }
      `}</style>

            <div style={{
                background: "white",
                border: "1px solid var(--color-border)",
                borderRadius: 16,
                padding: "20px 16px",
                position: "sticky",
                top: 84,
            }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "var(--color-text)" }}>
                        Фильтры
                        {activeCount > 0 && (
                            <span style={{
                                marginLeft: 6, background: "var(--color-accent)", color: "white",
                                borderRadius: 10, fontSize: 11, padding: "1px 7px", fontWeight: 700,
                            }}>{activeCount}</span>
                        )}
                    </span>
                    {activeCount > 0 && (
                        <button onClick={() => onChange({ categories: [], types: [], regions: [], priceMax: 999, verifiedOnly: false })} style={{
                            fontSize: 12, color: "var(--color-accent)", fontWeight: 600,
                            background: "none", border: "none", cursor: "pointer",
                        }}>Сбросить</button>
                    )}
                </div>

                {/* Verified */}
                <div className="filter-section">
                    <button
                        className={`filter-check ${filters.verifiedOnly ? "active" : ""}`}
                        onClick={() => onChange({ ...filters, verifiedOnly: !filters.verifiedOnly })}
                    >
                        <div className={`custom-checkbox ${filters.verifiedOnly ? "checked" : ""}`}>
                            {filters.verifiedOnly && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5 L4 7 L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>}
                        </div>
                        <span>⭐ Только проверенные</span>
                    </button>
                </div>

                {/* Type */}
                <div className="filter-section">
                    <div className="filter-title">Тип размещения</div>
                    {typeOptions.map(opt => (
                        <button
                            key={opt.value}
                            className={`filter-check ${filters.types.includes(opt.value) ? "active" : ""}`}
                            onClick={() => toggleType(opt.value)}
                        >
                            <div className={`custom-checkbox ${filters.types.includes(opt.value) ? "checked" : ""}`}
                                style={{
                                    borderColor: filters.types.includes(opt.value) ? opt.color : undefined,
                                    background: filters.types.includes(opt.value) ? opt.color : undefined
                                }}>
                                {filters.types.includes(opt.value) && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5 L4 7 L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>}
                            </div>
                            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <span style={{ width: 7, height: 7, borderRadius: "50%", background: opt.dot, flexShrink: 0 }} />
                                {opt.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Categories */}
                <div className="filter-section">
                    <div className="filter-title">Категория</div>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.slug}
                            className={`filter-check ${filters.categories.includes(cat.slug) ? "active" : ""}`}
                            onClick={() => toggleCategory(cat.slug)}
                        >
                            <div className={`custom-checkbox ${filters.categories.includes(cat.slug) ? "checked" : ""}`}>
                                {filters.categories.includes(cat.slug) && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5 L4 7 L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>}
                            </div>
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Regions */}
                <div className="filter-section" style={{ marginBottom: 0 }}>
                    <div className="filter-title">Регион</div>
                    {REGIONS.map(region => (
                        <button
                            key={region}
                            className={`filter-check ${filters.regions.includes(region) ? "active" : ""}`}
                            onClick={() => toggleRegion(region)}
                        >
                            <div className={`custom-checkbox ${filters.regions.includes(region) ? "checked" : ""}`}>
                                {filters.regions.includes(region) && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5 L4 7 L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>}
                            </div>
                            {region}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
}
