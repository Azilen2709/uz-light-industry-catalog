"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useT } from "@/contexts/LanguageContext";
import { CATEGORIES, REGIONS, ProductType } from "@/lib/data";
import { Company } from "@prisma/client";

type SortCompany = "rating" | "orders" | "newest" | "ontime";

const flowColors: Record<string, { bg: string; text: string }> = {
    instock: { bg: "#dcfce7", text: "#15803d" },
    whitelabel: { bg: "#dbeafe", text: "#1d4ed8" },
    rfq: { bg: "#ede9fe", text: "#6d28d9" },
};

function StarRating({ rating, small }: { rating: number; small?: boolean }) {
    const size = small ? 13 : 15;
    return (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
            {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} width={size} height={size} viewBox="0 0 16 16" fill={i <= Math.round(rating) ? "#f59e0b" : "#e2e8f0"}>
                    <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10.1l-3.6 1.9.7-4L2.2 5.2l4-.6z" />
                </svg>
            ))}
        </span>
    );
}

export default function CompaniesPage() {
    const { lang } = useT();

    const L = {
        ru: {
            title: "Фабрики Узбекистана",
            subtitle: "фабрик и производителей лёгкой промышленности",
            searchPlaceholder: "UzTextile Pro, ковры, Фергана...",
            filters: "Фильтры", reset: "Сбросить",
            verifiedOnly: "⭐ Только проверенные",
            typeLabel: "Тип сотрудничества",
            categoryLabel: "Категория товаров",
            regionLabel: "Регион",
            found: "Найдено:", companies: "фабрик",
            sortBy: "Сортировка:",
            sortOptions: { rating: "По рейтингу", orders: "По заказам", newest: "Новые", ontime: "По срокам" },
            reviews: "отзывов", orders: "заказов",
            repeatClients: "повт. клиентов", onTime: "в срок",
            response: "ответ за", hours: "ч",
            viewFactory: "Открыть →",
            noResults: "Фабрики не найдены",
            noResultsDesc: "Попробуйте изменить фильтры или поисковой запрос",
            resetAll: "Сбросить всё",
            verified: "Проверена",
            moq: "МЗК", leadTime: "Срок",
            employees: "Сотрудников", founded: "С",
        },
        en: {
            title: "Uzbekistan Factories",
            subtitle: "light industry manufacturers and factories",
            searchPlaceholder: "UzTextile Pro, carpets, Fergana...",
            filters: "Filters", reset: "Reset",
            verifiedOnly: "⭐ Verified Only",
            typeLabel: "Cooperation Type",
            categoryLabel: "Product Category",
            regionLabel: "Region",
            found: "Found:", companies: "factories",
            sortBy: "Sort by:",
            sortOptions: { rating: "By Rating", orders: "By Orders", newest: "Newest", ontime: "On-Time Rate" },
            reviews: "reviews", orders: "orders",
            repeatClients: "repeat clients", onTime: "on time",
            response: "response in", hours: "h",
            viewFactory: "View →",
            noResults: "No Factories Found",
            noResultsDesc: "Try changing filters or your search query",
            resetAll: "Reset All",
            verified: "Verified",
            moq: "MOQ", leadTime: "Lead Time",
            employees: "Employees", founded: "Est.",
        },
    }[lang];

    const flowLabels: Record<string, { ru: string; en: string }> = {
        instock: { ru: "Со склада", en: "In-Stock" },
        whitelabel: { ru: "White Label", en: "White Label" },
        rfq: { ru: "RFQ", en: "RFQ" },
    };

    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [flows, setFlows] = useState<ProductType[]>([]);
    const [regions, setRegions] = useState<string[]>([]);
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [sort, setSort] = useState<SortCompany>("rating");

    useEffect(() => {
        fetch("/api/companies")
            .then(res => res.json())
            .then(data => {
                setCompanies(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch companies:", err);
                setLoading(false);
            });
    }, []);

    function toggle<T>(arr: T[], val: T): T[] {
        return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];
    }

    const resetAll = () => { setCategories([]); setFlows([]); setRegions([]); setVerifiedOnly(false); setSearch(""); };
    const activeCount = categories.length + flows.length + regions.length + (verifiedOnly ? 1 : 0);

    const filtered = useMemo(() => {
        let res = [...companies];
        if (search.trim()) {
            const q = search.toLowerCase();
            res = res.filter(c =>
                c.name.toLowerCase().includes(q) ||
                c.region.toLowerCase().includes(q) ||
                (lang === "ru" ? c.specializationRu : c.specializationEn).toLowerCase().includes(q)
            );
        }
        if (verifiedOnly) res = res.filter(c => c.verified);
        if (flows.length) res = res.filter(c => flows.some(f => c.flows.includes(f)));
        if (categories.length) res = res.filter(c => categories.some(cat => c.categories.includes(cat)));
        if (regions.length) res = res.filter(c => regions.includes(c.region));

        if (sort === "rating") res.sort((a, b) => b.rating - a.rating);
        else if (sort === "orders") res.sort((a, b) => b.ordersCompleted - a.ordersCompleted);
        else if (sort === "ontime") res.sort((a, b) => b.onTimeDelivery - a.onTimeDelivery);
        else if (sort === "newest") res.sort((a, b) => b.founded - a.founded);
        return res;
    }, [companies, search, verifiedOnly, flows, categories, regions, sort, lang]);

    return (
        <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
            {/* Page header */}
            <div style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, #1a3f60 100%)", padding: "40px 0 32px" }}>
                <div className="container">
                    <h1 style={{ color: "white", fontSize: 32, fontWeight: 900, marginBottom: 6 }}>{L.title}</h1>
                    <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, marginBottom: 24 }}>
                        {companies.length}+ {L.subtitle}
                    </p>
                    {/* Search */}
                    <div style={{ display: "flex", background: "white", borderRadius: 12, overflow: "hidden", maxWidth: 560, boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
                        <span style={{ padding: "0 14px", display: "flex", alignItems: "center", fontSize: 18 }}>🏭</span>
                        <input
                            type="text" value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={L.searchPlaceholder}
                            style={{ flex: 1, border: "none", outline: "none", padding: "14px 0", fontSize: 15, color: "var(--color-text)" }}
                        />
                        {search && (
                            <button onClick={() => setSearch("")} style={{ padding: "0 14px", background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", fontSize: 18 }}>✕</button>
                        )}
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: "32px 24px", display: "flex", gap: 28, alignItems: "flex-start" }}>
                {/* Sidebar */}
                <aside style={{ width: 250, flexShrink: 0 }}>
                    <style>{`
            .fc { display:flex; align-items:center; gap:8px; padding:6px 8px; border-radius:8px; cursor:pointer; transition:background 0.15s; font-size:13px; color:var(--color-text-secondary); margin-bottom:2px; border:none; background:transparent; width:100%; text-align:left; }
            .fc:hover { background:var(--color-bg); }
            .fc.on { color:var(--color-text); font-weight:600; }
            .cb { width:16px; height:16px; border-radius:4px; border:1.5px solid var(--color-border-strong); display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all 0.15s; }
            .cb.on { background:var(--color-accent); border-color:var(--color-accent); }
            .fs { margin-bottom:20px; }
            .ft { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:var(--color-muted); margin-bottom:10px; }
          `}</style>
                    <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: "18px 14px", position: "sticky", top: 84 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                            <span style={{ fontWeight: 700, fontSize: 15 }}>
                                {L.filters}
                                {activeCount > 0 && <span style={{ marginLeft: 6, background: "var(--color-accent)", color: "white", borderRadius: 10, fontSize: 11, padding: "1px 7px", fontWeight: 700 }}>{activeCount}</span>}
                            </span>
                            {activeCount > 0 && <button onClick={resetAll} style={{ fontSize: 12, color: "var(--color-accent)", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>{L.reset}</button>}
                        </div>

                        {/* Verified */}
                        <div className="fs">
                            <button className={`fc ${verifiedOnly ? "on" : ""}`} onClick={() => setVerifiedOnly(!verifiedOnly)}>
                                <div className={`cb ${verifiedOnly ? "on" : ""}`}>{verifiedOnly && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5 L4 7 L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>}</div>
                                {L.verifiedOnly}
                            </button>
                        </div>

                        {/* Flow type */}
                        <div className="fs">
                            <div className="ft">{L.typeLabel}</div>
                            {(["instock", "whitelabel", "rfq"] as ProductType[]).map(f => (
                                <button key={f} className={`fc ${flows.includes(f) ? "on" : ""}`} onClick={() => setFlows(toggle(flows, f))}>
                                    <div className={`cb ${flows.includes(f) ? "on" : ""}`} style={{ borderColor: flows.includes(f) ? flowColors[f].text : undefined, background: flows.includes(f) ? flowColors[f].text : undefined }}>
                                        {flows.includes(f) && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5 L4 7 L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>}
                                    </div>
                                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: flowColors[f].text, flexShrink: 0 }} />
                                        {flowLabels[f][lang]}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Categories */}
                        <div className="fs">
                            <div className="ft">{L.categoryLabel}</div>
                            {CATEGORIES.map(cat => (
                                <button key={cat.slug} className={`fc ${categories.includes(cat.slug) ? "on" : ""}`} onClick={() => setCategories(toggle(categories, cat.slug))}>
                                    <div className={`cb ${categories.includes(cat.slug) ? "on" : ""}`}>{categories.includes(cat.slug) && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5 L4 7 L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>}</div>
                                    {lang === "ru" ? cat.label : cat.labelEn}
                                </button>
                            ))}
                        </div>

                        {/* Regions */}
                        <div className="fs" style={{ marginBottom: 0 }}>
                            <div className="ft">{L.regionLabel}</div>
                            {REGIONS.map(r => (
                                <button key={r} className={`fc ${regions.includes(r) ? "on" : ""}`} onClick={() => setRegions(toggle(regions, r))}>
                                    <div className={`cb ${regions.includes(r) ? "on" : ""}`}>{regions.includes(r) && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5 L4 7 L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>}</div>
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main */}
                <main style={{ flex: 1, minWidth: 0 }}>
                    {/* Sort bar */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "white", border: "1px solid var(--color-border)", borderRadius: 12, padding: "10px 16px", marginBottom: 18 }}>
                        <span style={{ fontSize: 14, color: "var(--color-muted)" }}>
                            {L.found} <strong style={{ color: "var(--color-text)" }}>{filtered.length}</strong> {L.companies}
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 13, color: "var(--color-muted)" }}>{L.sortBy}</span>
                            <select value={sort} onChange={e => setSort(e.target.value as SortCompany)} style={{ border: "1px solid var(--color-border)", borderRadius: 8, padding: "4px 10px", fontSize: 13, color: "var(--color-text)", background: "white", cursor: "pointer", outline: "none" }}>
                                {(Object.entries(L.sortOptions) as [SortCompany, string][]).map(([v, label]) => (
                                    <option key={v} value={v}>{label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Active tags */}
                    {(flows.length > 0 || categories.length > 0 || regions.length > 0 || verifiedOnly) && (
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                            {verifiedOnly && <span style={tagStyle} onClick={() => setVerifiedOnly(false)}>⭐ Verified ✕</span>}
                            {flows.map(f => <span key={f} style={tagStyle} onClick={() => setFlows(toggle(flows, f))}>{flowLabels[f][lang]} ✕</span>)}
                            {categories.map(c => <span key={c} style={tagStyle} onClick={() => setCategories(toggle(categories, c))}>{CATEGORIES.find(x => x.slug === c)?.[lang === "ru" ? "label" : "labelEn"]} ✕</span>)}
                            {regions.map(r => <span key={r} style={tagStyle} onClick={() => setRegions(toggle(regions, r))}>📍{r} ✕</span>)}
                        </div>
                    )}

                    {/* Cards */}
                    {filtered.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "80px 0", background: "white", borderRadius: 16, border: "1px solid var(--color-border)" }}>
                            <div style={{ fontSize: 48, marginBottom: 16 }}>🏭</div>
                            <h3 style={{ fontSize: 20, marginBottom: 8 }}>{L.noResults}</h3>
                            <p style={{ color: "var(--color-muted)", marginBottom: 20 }}>{L.noResultsDesc}</p>
                            <button className="btn btn-primary" onClick={resetAll}>{L.resetAll}</button>
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            {filtered.map(c => (
                                <div key={c.id} className="card" style={{ padding: 0, overflow: "hidden" }}>
                                    <div style={{ display: "flex", gap: 0 }}>
                                        {/* Accent strip */}
                                        <div style={{ width: 5, background: c.verified ? "var(--color-accent)" : "var(--color-border-strong)", flexShrink: 0 }} />

                                        {/* Avatar */}
                                        <div style={{ width: 90, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#f0f6ff,#e8f4ff)", borderRight: "1px solid var(--color-border)" }}>
                                            <div style={{ fontSize: 38 }}>🏭</div>
                                        </div>

                                        {/* Main info */}
                                        <div style={{ flex: 1, padding: "16px 18px", minWidth: 0 }}>
                                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                                                <div style={{ minWidth: 0 }}>
                                                    {/* Badges */}
                                                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
                                                        {c.verified && (
                                                            <span style={{ background: "#fef9c3", color: "#854d0e", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>✓ {L.verified}</span>
                                                        )}
                                                        {c.flows.map(f => (
                                                            <span key={f} style={{ background: flowColors[f].bg, color: flowColors[f].text, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10, textTransform: "uppercase" }}>
                                                                {flowLabels[f][lang]}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {/* Name */}
                                                    <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--color-text)", marginBottom: 3 }}>{c.name}</h2>
                                                    <div style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 8 }}>
                                                        📍 {c.region} · {L.founded} {c.founded} · {L.employees}: {c.employees}
                                                    </div>

                                                    {/* Description */}
                                                    <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.55, marginBottom: 10, maxWidth: 500 }}>
                                                        {lang === "ru" ? c.descriptionRu : c.descriptionEn}
                                                    </p>

                                                    {/* Specialization tags */}
                                                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                                        {(lang === "ru" ? c.specializationRu : c.specializationEn).split(", ").slice(0, 3).map((s: string) => (
                                                            <span key={s} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-strong)", borderRadius: 14, padding: "3px 10px", fontSize: 11, fontWeight: 600, color: "var(--color-text-secondary)" }}>{s}</span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Right panel: rating + stats + CTA */}
                                                <div style={{ flexShrink: 0, textAlign: "right", minWidth: 180 }}>
                                                    {/* Rating */}
                                                    <div style={{ marginBottom: 8 }}>
                                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, marginBottom: 2 }}>
                                                            <StarRating rating={c.rating} small />
                                                            <span style={{ fontSize: 16, fontWeight: 800, color: "var(--color-text)" }}>{c.rating.toFixed(1)}</span>
                                                        </div>
                                                        <div style={{ fontSize: 11, color: "var(--color-muted)" }}>{c.reviewCount} {L.reviews}</div>
                                                    </div>

                                                    {/* Mini stats */}
                                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 12px", marginBottom: 12 }}>
                                                        {[
                                                            { v: c.ordersCompleted.toLocaleString(), l: L.orders },
                                                            { v: `${c.repeatClients}%`, l: L.repeatClients },
                                                            { v: `${c.onTimeDelivery}%`, l: L.onTime },
                                                            { v: `${c.avgResponseHours}${L.hours}`, l: L.response },
                                                        ].map((s: any) => (
                                                            <div key={s.l} style={{ textAlign: "right" }}>
                                                                <div style={{ fontSize: 14, fontWeight: 800, color: "var(--color-primary)" }}>{s.v}</div>
                                                                <div style={{ fontSize: 10, color: "var(--color-muted)" }}>{s.l}</div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div style={{ marginBottom: 8, fontSize: 12, color: "var(--color-muted)", textAlign: "right" }}>
                                                        <span>{L.moq}: <strong>{c.moqFrom}</strong></span>
                                                        <span style={{ marginLeft: 10 }}>⏱ {c.leadTime}</span>
                                                    </div>

                                                    <Link href={`/companies/${c.id}`} className="btn btn-primary btn-sm" style={{ display: "inline-block", textDecoration: "none", whiteSpace: "nowrap" }}>
                                                        {L.viewFactory}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
    borderRadius: 20, padding: "4px 12px",
    fontSize: 12, fontWeight: 600,
    color: "var(--color-text-secondary)",
    cursor: "pointer",
    display: "inline-flex", alignItems: "center", gap: 4,
};
