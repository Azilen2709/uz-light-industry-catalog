"use client";
import { useState } from "react";
import { useT } from "@/contexts/LanguageContext";
import { REGIONS, ProductType } from "@/lib/data";
import { INDUSTRY_TAXONOMY, Category } from "@/lib/taxonomy";

// FilterState is exported so both this component and the page share one definition
export interface FilterState {
    industrySlug: string;       // top-level direction from taxonomy, "" = all
    categorySlugs: string[];    // level 2 (categories)
    subcategorySlugs: string[]; // level 3 (subcategories)
    types: ProductType[];
    regions: string[];
    priceMax: number;
    verifiedOnly: boolean;
}

export const DEFAULT_FILTERS: FilterState = {
    industrySlug: "",
    categorySlugs: [],
    subcategorySlugs: [],
    types: [],
    regions: [],
    priceMax: 999,
    verifiedOnly: false,
};

interface CatalogFiltersProps {
    filters: FilterState;
    onChange: (filters: FilterState) => void;
}

export default function CatalogFilters({ filters, onChange }: CatalogFiltersProps) {
    const { t, lang } = useT();
    const L = t.catalog;
    const [expandedIndustry, setExpandedIndustry] = useState<string | null>(
        filters.industrySlug || null
    );
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    function selectIndustry(slug: string) {
        const isDeselecting = filters.industrySlug === slug;
        setExpandedIndustry(isDeselecting ? null : slug);
        setExpandedCategory(null);
        onChange({
            ...filters,
            industrySlug: isDeselecting ? "" : slug,
            categorySlugs: [],
            subcategorySlugs: [],
        });
    }

    function toggleCategory(slug: string) {
        const next = filters.categorySlugs.includes(slug)
            ? filters.categorySlugs.filter(s => s !== slug)
            : [...filters.categorySlugs, slug];

        // If expanding/collapsing local state
        if (expandedCategory === slug) {
            setExpandedCategory(null);
        } else {
            setExpandedCategory(slug);
        }

        onChange({ ...filters, categorySlugs: next });
    }

    function toggleSubcategory(slug: string) {
        const next = filters.subcategorySlugs.includes(slug)
            ? filters.subcategorySlugs.filter(s => s !== slug)
            : [...filters.subcategorySlugs, slug];
        onChange({ ...filters, subcategorySlugs: next });
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
        { value: "instock", label: lang === "ru" ? "Со склада (In-Stock)" : "In-Stock (Ready Goods)", color: "#16a34a", dot: "#22c55e" },
        { value: "whitelabel", label: lang === "ru" ? "Свой бренд (White Label)" : "Own Brand (White Label)", color: "#0e7bc4", dot: "#3b82f6" },
        { value: "rfq", label: lang === "ru" ? "По ТЗ клиента (RFQ)" : "Custom Production (RFQ)", color: "#7c3aed", dot: "#a855f7" },
    ];

    const activeCount =
        (filters.industrySlug ? 1 : 0) +
        filters.categorySlugs.length +
        filters.subcategorySlugs.length +
        filters.types.length +
        filters.regions.length +
        (filters.verifiedOnly ? 1 : 0);

    return (
        <aside style={{ width: 268, flexShrink: 0 }}>
            <style>{`
        .filter-section { margin-bottom: 24px; }
        .filter-title {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--color-muted);
          margin-bottom: 12px;
        }
        .filter-check {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 10px; border-radius: 12px;
          cursor: pointer; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          font-size: 13px; color: var(--color-text-secondary);
          margin-bottom: 4px; border: none; background: transparent;
          width: 100%; text-align: left;
        }
        .filter-check:hover { background: var(--color-bg); transform: translateX(2px); }
        .filter-check.active { color: var(--color-text); font-weight: 600; background: var(--color-bg); }
        .custom-checkbox {
          width: 18px; height: 18px; border-radius: 6px;
          border: 1.5px solid var(--color-border-strong);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .custom-checkbox.checked {
          background: var(--color-accent);
          border-color: var(--color-accent);
          box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
        }
        .industry-btn {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 10px 14px; border-radius: var(--radius-md);
          border: 1.5px solid var(--color-border); cursor: pointer;
          font-size: 13px; font-weight: 600; text-align: left;
          background: white; margin-bottom: 6px; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .industry-btn:hover { border-color: var(--color-primary); transform: translateY(-1px); box-shadow: var(--shadow-sm); }
        .industry-btn.selected { border-color: var(--color-primary); background: #f0f6ff; color: var(--color-primary); box-shadow: inset 0 0 0 1px var(--color-primary); }
        .cat-btn {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 6px 10px 6px 14px; border-radius: 10px;
          border: none; cursor: pointer; font-size: 13px; background: transparent;
          text-align: left; color: var(--color-text-secondary); transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          margin-bottom: 2px;
        }
        .cat-btn:hover { background: var(--color-bg); color: var(--color-text); }
        .cat-btn.active { color: var(--color-primary); font-weight: 700; background: var(--color-bg); }
        
        .subcat-btn {
          display: flex; align-items: center; gap: 8px;
          width: 100%; padding: 5px 10px 5px 32px; border-radius: 8px;
          border: none; cursor: pointer; font-size: 12px; background: transparent;
          text-align: left; color: var(--color-text-secondary); transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          margin-bottom: 2px;
        }
        .subcat-btn:hover { background: var(--color-bg); color: var(--color-text); }
        .subcat-btn.active { color: var(--color-primary); font-weight: 600; background: var(--color-bg); }
      `}</style>

            <div style={{
                background: "white", border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)", padding: "26px 20px", position: "sticky", top: 90,
                boxShadow: "var(--shadow-card)",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "var(--color-text)" }}>
                        {L.filters}
                        {activeCount > 0 && (
                            <span style={{ marginLeft: 6, background: "var(--color-accent)", color: "white", borderRadius: 10, fontSize: 11, padding: "1px 7px", fontWeight: 700 }}>
                                {activeCount}
                            </span>
                        )}
                    </span>
                    {activeCount > 0 && (
                        <button onClick={() => { setExpandedIndustry(null); setExpandedCategory(null); onChange(DEFAULT_FILTERS); }} style={{ fontSize: 12, color: "var(--color-accent)", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
                            {L.reset}
                        </button>
                    )}
                </div>

                {/* ── Taxonomy: 3-Level ── */}
                <div className="filter-section">
                    <div className="filter-title">
                        🗂 {lang === "ru" ? "Направление" : "Direction"}
                    </div>
                    {INDUSTRY_TAXONOMY.map(industry => {
                        const isSelected = filters.industrySlug === industry.slug;
                        const isExpanded = expandedIndustry === industry.slug;
                        return (
                            <div key={industry.slug}>
                                {/* LEVEL 1: INDUSTRY */}
                                <button
                                    className={`industry-btn ${isSelected ? "selected" : ""}`}
                                    onClick={() => selectIndustry(industry.slug)}
                                    style={{ borderColor: isSelected ? industry.color : undefined, color: isSelected ? industry.color : undefined, background: isSelected ? `${industry.color}10` : undefined }}
                                >
                                    <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                                        <span style={{ fontSize: 16 }}>{industry.icon}</span>
                                        {industry.label[lang]}
                                    </span>
                                    <span style={{ fontSize: 11, color: isSelected ? industry.color : "var(--color-muted)", transition: "transform 0.2s", display: "inline-block", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                                </button>

                                {/* LEVEL 2: CATEGORY */}
                                {isExpanded && (
                                    <div style={{ marginBottom: 6 }}>
                                        {industry.categories.map((cat: Category) => {
                                            const isCatActive = filters.categorySlugs.includes(cat.slug);
                                            const isCatExpanded = expandedCategory === cat.slug;
                                            return (
                                                <div key={cat.slug}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                        <div className={`custom-checkbox ${isCatActive ? "checked" : ""}`} style={{ width: 14, height: 14, borderColor: isCatActive ? industry.color : undefined, background: isCatActive ? industry.color : undefined, cursor: "pointer", marginLeft: 4 }} onClick={() => toggleCategory(cat.slug)}>
                                                            {isCatActive && <svg width="9" height="9" viewBox="0 0 10 10"><path d="M2 5 L4 7 L8 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" /></svg>}
                                                        </div>
                                                        <button className={`cat-btn ${isCatActive ? "active" : ""}`} onClick={() => setExpandedCategory(isCatExpanded ? null : cat.slug)} style={{ flex: 1 }}>
                                                            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                                                <span style={{ fontSize: 14 }}>{cat.icon}</span>
                                                                <span>{cat.label[lang]}</span>
                                                            </div>
                                                            {cat.subcategories.length > 0 && (
                                                                <span style={{ fontSize: 10, color: "var(--color-muted)", transform: isCatExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▾</span>
                                                            )}
                                                        </button>
                                                    </div>

                                                    {/* LEVEL 3: SUBCATEGORY */}
                                                    {isCatExpanded && cat.subcategories.length > 0 && (
                                                        <div style={{ marginTop: 2, marginBottom: 4 }}>
                                                            {cat.subcategories.map(sub => {
                                                                const isSubActive = filters.subcategorySlugs.includes(sub.slug);
                                                                return (
                                                                    <button key={sub.slug} className={`subcat-btn ${isSubActive ? "active" : ""}`} onClick={() => toggleSubcategory(sub.slug)}>
                                                                        <div className={`custom-checkbox ${isSubActive ? "checked" : ""}`} style={{ width: 12, height: 12, borderRadius: 4, borderColor: isSubActive ? industry.color : undefined, background: isSubActive ? industry.color : undefined }}>
                                                                            {isSubActive && <svg width="8" height="8" viewBox="0 0 10 10"><path d="M2 5 L4 7 L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>}
                                                                        </div>
                                                                        <span>{sub.icon} {sub.label[lang]}</span>
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "0 0 24px 0" }} />

                {/* ── FLOW / TYPE ── */}
                <div className="filter-section">
                    <div className="filter-title">
                        📦 {lang === "ru" ? "Тип отгрузки" : "Order Type"}
                    </div>
                    {typeOptions.map(opt => (
                        <button key={opt.value} className={`filter-check ${filters.types.includes(opt.value) ? "active" : ""}`} onClick={() => toggleType(opt.value)}>
                            <div className={`custom-checkbox ${filters.types.includes(opt.value) ? "checked" : ""}`}>
                                {filters.types.includes(opt.value) && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5 L4 7 L8 3" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>}
                            </div>
                            <span style={{ width: 8, height: 8, borderRadius: "50%", background: opt.dot }} />
                            {opt.label}
                        </button>
                    ))}
                </div>

                <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "0 0 24px 0" }} />

                {/* ── REGION ── */}
                <div className="filter-section">
                    <div className="filter-title">
                        📍 {lang === "ru" ? "Регион" : "Region"}
                    </div>
                    {REGIONS.map(reg => {
                        const localLabel = lang === "ru" ? reg.ru : reg.en;
                        return (
                            <button key={reg.slug} className={`filter-check ${filters.regions.includes(reg.slug) ? "active" : ""}`} onClick={() => toggleRegion(reg.slug)}>
                                <div className={`custom-checkbox ${filters.regions.includes(reg.slug) ? "checked" : ""}`}>
                                    {filters.regions.includes(reg.slug) && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5 L4 7 L8 3" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>}
                                </div>
                                {localLabel}
                            </button>
                        );
                    })}
                </div>

                {/* ── TRUST & VERIFICATION ── */}
                <div className="filter-section" style={{ marginBottom: 0 }}>
                    <label className="filter-check" style={{ background: filters.verifiedOnly ? "#fef9c3" : "var(--color-surface)", padding: "12px 14px" }}>
                        <div className={`custom-checkbox ${filters.verifiedOnly ? "checked" : ""}`} style={{ borderColor: filters.verifiedOnly ? "#ca8a04" : undefined, background: filters.verifiedOnly ? "#ca8a04" : undefined }}>
                            {filters.verifiedOnly && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5 L4 7 L8 3" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>}
                        </div>
                        <input
                            type="checkbox"
                            checked={filters.verifiedOnly}
                            onChange={(e) => onChange({ ...filters, verifiedOnly: e.target.checked })}
                            style={{ display: "none" }}
                        />
                        <span style={{ fontWeight: 600, color: filters.verifiedOnly ? "#854d0e" : "inherit" }}>
                            {lang === "ru" ? "🏆 Только проверенные фабрики" : "🏆 Verified Factories Only"}
                        </span>
                    </label>
                </div>
            </div>
        </aside>
    );
}
