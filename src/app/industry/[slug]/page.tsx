"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { useT } from "@/contexts/LanguageContext";
import { INDUSTRY_TAXONOMY } from "@/lib/taxonomy";
import { PRODUCTS, COMPANIES } from "@/lib/data";
import ProductCard from "@/components/catalog/ProductCard";

interface Props {
    params: { slug: string };
}

export default function IndustryPage({ params }: Props) {
    const { lang, t } = useT();
    const industry = INDUSTRY_TAXONOMY.find(i => i.slug === params.slug);

    const [activeSubcat, setActiveSubcat] = useState<string | null>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [companies, setCompanies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!industry) return;
        setLoading(true);
        Promise.all([
            fetch(`/api/products?industry=${industry.slug}`).then(res => res.json()),
            fetch(`/api/companies?industry=${industry.slug}`).then(res => res.json())
        ]).then(([prodData, compData]) => {
            if (Array.isArray(prodData)) setProducts(prodData);
            if (Array.isArray(compData)) setCompanies(compData);
            setLoading(false);
        }).catch(err => {
            console.error("Fetch industry data error:", err);
            setLoading(false);
        });
    }, [industry]);

    if (!industry) notFound();

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: "100px 24px" }}>
                <div className="spinner" style={{ margin: "0 auto 20px" }} />
                <p style={{ color: "var(--color-muted)" }}>{t.common.loading}...</p>
            </div>
        );
    }

    // Products filtering (client-side for subcategories)
    const filtered = activeSubcat
        ? products.filter(p => p.categorySlug === activeSubcat || p.tags?.includes(activeSubcat))
        : products;

    // Companies in this industry
    const relatedCompanies = companies.slice(0, 4);

    const L = {
        ru: {
            home: "Главная", catalog: "Каталог",
            all: "Все",
            products: "товаров",
            companies: "Фабрики в направлении",
            viewAll: "Смотреть все фабрики",
            catalogBtn: "Каталог товаров",
            rfqBtn: "Отправить RFQ",
            noProducts: "Товаров пока нет. Добавьте запрос через RFQ.",
            subcatFilter: "Подкатегория",
        },
        en: {
            home: "Home", catalog: "Catalog",
            all: "All",
            products: "products",
            companies: "Factories in this direction",
            viewAll: "View all factories",
            catalogBtn: "View Catalog",
            rfqBtn: "Submit RFQ",
            noProducts: "No products yet. Submit an RFQ request.",
            subcatFilter: "Subcategory",
        },
    }[lang];

    return (
        <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
            {/* ── Hero Banner ── */}
            <div style={{
                background: `linear-gradient(135deg, ${industry.color}ee 0%, ${industry.color}99 50%, ${industry.color}44 100%)`,
                padding: "52px 0 40px",
                position: "relative",
                overflow: "hidden",
            }}>
                {/* Background pattern */}
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `radial-gradient(circle at 80% 50%, ${industry.color}33 0%, transparent 60%)`,
                }} />
                <div className="container" style={{ padding: "0 24px", position: "relative" }}>
                    {/* Breadcrumb */}
                    <div style={{ display: "flex", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.65)", marginBottom: 18 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>{L.home}</Link>
                        <span>›</span>
                        <Link href="/products" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>{L.catalog}</Link>
                        <span>›</span>
                        <span style={{ color: "white", fontWeight: 600 }}>{industry.label[lang]}</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
                        <div style={{
                            width: 72, height: 72, borderRadius: 20,
                            background: "rgba(255,255,255,0.2)",
                            backdropFilter: "blur(8px)",
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38,
                            border: "2px solid rgba(255,255,255,0.3)",
                            flexShrink: 0,
                        }}>
                            {industry.icon}
                        </div>
                        <div>
                            <h1 style={{ color: "white", fontSize: 36, fontWeight: 900, lineHeight: 1.1, marginBottom: 8 }}>
                                {industry.label[lang]}
                            </h1>
                            <div style={{ display: "flex", gap: 12 }}>
                                <span style={{ background: "rgba(255,255,255,0.2)", color: "white", fontSize: 13, fontWeight: 700, borderRadius: 20, padding: "4px 12px", backdropFilter: "blur(4px)" }}>
                                    {products.length} {L.products}
                                </span>
                                <span style={{ background: "rgba(255,255,255,0.2)", color: "white", fontSize: 13, fontWeight: 700, borderRadius: 20, padding: "4px 12px", backdropFilter: "blur(4px)" }}>
                                    {relatedCompanies.length}+ {lang === "ru" ? "фабрик" : "factories"}
                                </span>
                                <span style={{ background: "rgba(255,255,255,0.2)", color: "white", fontSize: 13, fontWeight: 700, borderRadius: 20, padding: "4px 12px", backdropFilter: "blur(4px)" }}>
                                    {industry.subcategories.length} {lang === "ru" ? "подкатегорий" : "subcategories"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* CTA buttons */}
                    <div style={{ display: "flex", gap: 12 }}>
                        <Link href={`/products?industry=${industry.slug}`} style={{
                            background: "white", color: industry.color, padding: "10px 22px",
                            borderRadius: 10, textDecoration: "none", fontWeight: 800, fontSize: 14,
                            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                        }}>
                            📦 {L.catalogBtn}
                        </Link>
                        <Link href="/rfq/new" style={{
                            background: "rgba(255,255,255,0.15)", color: "white", padding: "10px 22px",
                            borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 14,
                            border: "2px solid rgba(255,255,255,0.4)",
                            backdropFilter: "blur(4px)",
                        }}>
                            📐 {L.rfqBtn}
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Subcategory chips ── */}
            <div style={{ background: "white", borderBottom: "1px solid var(--color-border)", position: "sticky", top: 64, zIndex: 10 }}>
                <div className="container" style={{ padding: "0 24px", overflowX: "auto" }}>
                    <div style={{ display: "flex", gap: 8, padding: "12px 0", minWidth: "max-content" }}>
                        {/* "All" chip */}
                        <button
                            onClick={() => setActiveSubcat(null)}
                            style={{
                                padding: "6px 16px", borderRadius: 20, border: "2px solid",
                                borderColor: !activeSubcat ? industry.color : "var(--color-border)",
                                background: !activeSubcat ? `${industry.color}15` : "white",
                                color: !activeSubcat ? industry.color : "var(--color-text-secondary)",
                                fontWeight: !activeSubcat ? 800 : 500, fontSize: 13, cursor: "pointer",
                                transition: "all 0.15s", whiteSpace: "nowrap",
                            }}
                        >
                            {L.all} ({products.length})
                        </button>
                        {industry.subcategories.map(sub => {
                            const count = products.filter(p => p.categorySlug === sub.slug || p.tags?.includes(sub.slug)).length;
                            const isActive = activeSubcat === sub.slug;
                            return (
                                <button
                                    key={sub.slug}
                                    onClick={() => setActiveSubcat(isActive ? null : sub.slug)}
                                    style={{
                                        display: "flex", alignItems: "center", gap: 6,
                                        padding: "6px 16px", borderRadius: 20, border: "2px solid",
                                        borderColor: isActive ? industry.color : "var(--color-border)",
                                        background: isActive ? `${industry.color}15` : "white",
                                        color: isActive ? industry.color : "var(--color-text-secondary)",
                                        fontWeight: isActive ? 800 : 500, fontSize: 13, cursor: "pointer",
                                        transition: "all 0.15s", whiteSpace: "nowrap",
                                    }}
                                >
                                    <span>{sub.icon}</span>
                                    {sub.label[lang]}
                                    {count > 0 && <span style={{ fontSize: 11, opacity: 0.7 }}>({count})</span>}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: "28px 24px", display: "grid", gridTemplateColumns: "1fr 280px", gap: 28, alignItems: "flex-start" }}>
                {/* ── Products grid ── */}
                <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800 }}>
                            {activeSubcat
                                ? industry.subcategories.find(s => s.slug === activeSubcat)?.label[lang]
                                : industry.label[lang]}
                            <span style={{ marginLeft: 8, fontSize: 14, fontWeight: 500, color: "var(--color-muted)" }}>
                                — {filtered.length} {L.products}
                            </span>
                        </h2>
                        <Link href={`/products?industry=${industry.slug}`} style={{ fontSize: 13, color: "var(--color-primary)", textDecoration: "none", fontWeight: 600 }}>
                            {lang === "ru" ? "Все товары" : "All products"} →
                        </Link>
                    </div>

                    {filtered.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "60px 0", background: "white", borderRadius: 16, border: "1px solid var(--color-border)" }}>
                            <div style={{ fontSize: 48, marginBottom: 12 }}>{industry.icon}</div>
                            <p style={{ color: "var(--color-muted)" }}>{L.noProducts}</p>
                            <Link href="/rfq/new" className="btn btn-primary" style={{ marginTop: 16, display: "inline-block" }}>
                                📐 {L.rfqBtn}
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
                            {filtered.map(p => <ProductCard key={p.id} product={p} view="grid" lang={lang} />)}
                        </div>
                    )}
                </div>

                {/* ── Right sidebar ── */}
                <div style={{ position: "sticky", top: 120 }}>
                    {/* Related companies */}
                    <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: "18px 18px 14px" }}>
                        <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 14, color: "var(--color-text)" }}>
                            🏭 {L.companies}
                        </div>
                        {relatedCompanies.length === 0 ? (
                            <p style={{ fontSize: 13, color: "var(--color-muted)" }}>{lang === "ru" ? "Нет фабрик" : "No factories"}</p>
                        ) : (
                            <>
                                {relatedCompanies.map(company => (
                                    <Link key={company.id} href={`/companies/${company.id}`} style={{ textDecoration: "none", display: "block" }}>
                                        <div style={{
                                            display: "flex", alignItems: "center", gap: 10,
                                            padding: "10px 0", borderBottom: "1px solid var(--color-border)",
                                        }}>
                                            <div style={{
                                                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                                                background: `linear-gradient(135deg, ${industry.color}33, ${industry.color}11)`,
                                                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                                            }}>🏭</div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                    {company.name}
                                                </div>
                                                <div style={{ fontSize: 11, color: "var(--color-muted)" }}>
                                                    📍 {company.region}
                                                    {company.verified && <span style={{ marginLeft: 6, color: "#15803d", fontWeight: 700 }}>✓</span>}
                                                </div>
                                            </div>
                                            <span style={{ fontSize: 12, color: "#f59e0b" }}>★ {company.rating}</span>
                                        </div>
                                    </Link>
                                ))}
                                <Link href={`/companies?industry=${industry.slug}`} style={{
                                    display: "block", textAlign: "center", marginTop: 12,
                                    fontSize: 13, fontWeight: 700, color: "var(--color-primary)", textDecoration: "none",
                                }}>
                                    {L.viewAll} →
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Subcategories list */}
                    <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: "18px", marginTop: 16 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12, color: "var(--color-text)" }}>
                            🗂 {L.subcatFilter}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {industry.subcategories.map(sub => (
                                <button
                                    key={sub.slug}
                                    onClick={() => setActiveSubcat(activeSubcat === sub.slug ? null : sub.slug)}
                                    style={{
                                        display: "flex", alignItems: "center", gap: 8, padding: "7px 10px",
                                        borderRadius: 8, border: "none", cursor: "pointer",
                                        background: activeSubcat === sub.slug ? `${industry.color}15` : "transparent",
                                        color: activeSubcat === sub.slug ? industry.color : "var(--color-text-secondary)",
                                        fontWeight: activeSubcat === sub.slug ? 700 : 400, fontSize: 13,
                                        textAlign: "left", transition: "all 0.12s",
                                    }}
                                >
                                    <span style={{ fontSize: 16 }}>{sub.icon}</span>
                                    {sub.label[lang]}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
