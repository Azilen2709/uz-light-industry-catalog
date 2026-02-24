"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useT } from "@/contexts/LanguageContext";
import { CATEGORIES, getRegionLabel } from "@/lib/data";
import { SIZE_TABLES, INDUSTRY_TAXONOMY } from "@/lib/taxonomy";
import { Product, Company } from "@prisma/client";

const typeColors = {
    instock: { bg: "#dcfce7", text: "#15803d" },
    whitelabel: { bg: "#dbeafe", text: "#1d4ed8" },
    rfq: { bg: "#ede9fe", text: "#6d28d9" },
};

// Map categorySlug → sizeTable type
function getSizeTableType(categorySlug: string): keyof typeof SIZE_TABLES {
    for (const ind of INDUSTRY_TAXONOMY) {
        const sub = ind.subcategories.find(s => s.slug === categorySlug);
        if (sub) return sub.sizeTable;
    }
    // fallback by slug keywords
    if (categorySlug === "footwear") return "footwear";
    if (categorySlug === "carpets") return "carpet";
    if (["outerwear", "knitwear", "dresses", "workwear"].includes(categorySlug)) return "clothing";
    return "none";
}

// Mock extra details per product
const productDetails: Record<number, {
    materials: { ru: string; en: string };
    sizes: string[];
    description: { ru: string; en: string };
    priceTiers: { qty: number; price: number }[];
}> = {
    1: {
        materials: { ru: "Футер 320г/м², 80% хлопок, 20% полиэстер", en: "Fleece 320gsm, 80% cotton, 20% polyester" },
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: {
            ru: "Базовое худи оверсайз из качественного футера. Широкий капюшон с утяжкой, карман кенгуру, рибана на манжетах и поясе. Доступно 4 цвета, упаковка по размерным рядам.",
            en: "Basic oversized hoodie made from quality fleece. Wide drawstring hood, kangaroo pocket, ribbed cuffs and waistband. Available in 4 colors, packed by size run.",
        },
        priceTiers: [
            { qty: 100, price: 5.50 },
            { qty: 300, price: 4.80 },
            { qty: 1000, price: 4.00 },
        ],
    },
    2: {
        materials: { ru: "Сатин 120 нитей, 100% хлопок, страйп", en: "120-thread sateen, 100% cotton, stripe weave" },
        sizes: ["1.5-спальный", "2-спальный", "Евро"],
        description: {
            ru: "Постельный комплект из натурального хлопкового сатина. Пододеяльник на молнии, две наволочки 50×70 и 70×70. Перкаль сохраняет форму после многократных стирок.",
            en: "Bedding set from natural cotton sateen. Duvet cover with zipper, two pillowcases 50×70 and 70×70. Percale holds shape after multiple washes.",
        },
        priceTiers: [
            { qty: 20, price: 12.00 },
            { qty: 100, price: 10.00 },
            { qty: 500, price: 8.00 },
        ],
    },
};

const defaultDetails = {
    materials: { ru: "100% хлопок", en: "100% Cotton" },
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: {
        ru: "Качественный товар от проверенного узбекского производителя. Производство соответствует стандартам B2B-экспорта. Доступна документация и сертификаты по запросу.",
        en: "Quality product from a verified Uzbek manufacturer. Production meets B2B export standards. Documentation and certificates available on request.",
    },
    priceTiers: [
        { qty: 50, price: 7.00 },
        { qty: 200, price: 6.00 },
        { qty: 500, price: 5.00 },
    ],
};

export default function ProductPage() {
    const params = useParams();
    const { t, lang } = useT();
    const [product, setProduct] = useState<(Product & { company: Company }) | null>(null);
    const [related, setRelated] = useState<(Product & { company: { name: string } })[]>([]);
    const [loading, setLoading] = useState(true);
    const pt = t.product;

    const productId = parseInt(params.id as string, 10);

    useEffect(() => {
        if (!productId) return;
        setLoading(true);
        fetch(`/api/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setProduct(data);
                    // Fetch related products
                    fetch(`/api/products?category=${data.categorySlug}`)
                        .then(res => res.json())
                        .then(relData => {
                            if (Array.isArray(relData)) {
                                setRelated(relData.filter((p: any) => p.id !== data.id).slice(0, 3));
                            }
                        });
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch product error:", err);
                setLoading(false);
            });
    }, [productId]);

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: "100px 24px" }}>
                <div className="spinner" style={{ margin: "0 auto 20px" }} />
                <p style={{ color: "var(--color-muted)" }}>{t.common.loading}...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{ textAlign: "center", padding: "100px 24px" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>😕</div>
                <h2 style={{ fontSize: 28, marginBottom: 8 }}>{t.common.notFound}</h2>
                <Link href="/products" className="btn btn-primary">{t.common.back}</Link>
            </div>
        );
    }

    const details = productDetails[product.id] ?? defaultDetails;
    const typeConf = typeColors[product.type];
    const typeLabel = product.type === "instock" ? pt.inStock : product.type === "whitelabel" ? pt.whiteLabel : pt.rfq;
    const categoryLabel = lang === "ru"
        ? CATEGORIES.find(c => c.slug === product.categorySlug)?.label
        : CATEGORIES.find(c => c.slug === product.categorySlug)?.labelEn;

    // Size table
    const sizeTableType = getSizeTableType(product.categorySlug);
    const sizeTable = SIZE_TABLES[sizeTableType];

    return (
        <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
            {/* Breadcrumb */}
            <div style={{ background: "white", borderBottom: "1px solid var(--color-border)" }}>
                <div className="container" style={{ padding: "12px 24px", display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-muted)" }}>
                    <Link href="/" style={{ color: "var(--color-muted)", textDecoration: "none" }}>
                        {lang === "ru" ? "Главная" : "Home"}
                    </Link>
                    <span>›</span>
                    <Link href="/products" style={{ color: "var(--color-muted)", textDecoration: "none" }}>
                        {t.nav.catalog}
                    </Link>
                    <span>›</span>
                    <Link href={`/products?category=${product.categorySlug}`} style={{ color: "var(--color-muted)", textDecoration: "none" }}>
                        {categoryLabel}
                    </Link>
                    <span>›</span>
                    <span style={{ color: "var(--color-text)", fontWeight: 600 }}>{lang === "ru" ? product.titleRu : product.titleEn}</span>
                </div>
            </div>

            <div className="container" style={{ padding: "32px 24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 40, alignItems: "flex-start" }}>
                    {/* Left: Image + Details */}
                    <div>
                        {/* Main image placeholder */}
                        <div style={{
                            background: "white",
                            borderRadius: 20, height: 400,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            marginBottom: 20,
                            border: "1px solid var(--color-border)", position: "relative",
                            overflow: "hidden"
                        }}>
                            {(product as any).image ? (
                                <img src={(product as any).image} alt={lang === "ru" ? product.titleRu : product.titleEn} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            ) : (
                                <span style={{ fontSize: 100 }}>🧵</span>
                            )}
                            {product.verified && (
                                <div style={{ position: "absolute", top: 16, right: 16, background: "#fef9c3", color: "#854d0e", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>
                                    ✓ {pt.verified}
                                </div>
                            )}
                        </div>

                        {/* Thumbnail strip */}
                        <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
                            {[product.image, ...Array(3)].map((img, i) => (
                                <div key={i} style={{
                                    width: 80, height: 80, borderRadius: 10, background: "white",
                                    border: i === 0 ? "2px solid var(--color-accent)" : "1px solid var(--color-border)",
                                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                                    overflow: "hidden"
                                }}>
                                    {img ? <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 28 }}>🧵</span>}
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24, marginBottom: 24 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>
                                {lang === "ru" ? "Описание" : "Description"}
                            </h3>
                            <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--color-text-secondary)" }}>
                                {lang === "ru" ? product.company.descriptionRu : product.company.descriptionEn}
                            </p>
                        </div>

                        {/* Specs */}
                        <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24, marginBottom: 24 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
                                {lang === "ru" ? "Характеристики" : "Specifications"}
                            </h3>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <tbody>
                                    {[
                                        [pt.material, lang === "ru" ? details.materials.ru : details.materials.en],
                                        [pt.moq, product.moq],
                                        [pt.leadTime, product.leadTime],
                                        [pt.shipFrom, `${getRegionLabel(product.region, lang)}, ${t.common.country}`],
                                        [lang === "ru" ? "Регион" : "Region", getRegionLabel(product.region, lang)],
                                    ].map(([label, value]) => (
                                        <tr key={label} style={{ borderBottom: "1px solid var(--color-border)" }}>
                                            <td style={{ padding: "10px 0", fontSize: 13, color: "var(--color-muted)", width: 180 }}>{label}</td>
                                            <td style={{ padding: "10px 0", fontSize: 14, fontWeight: 600, color: "var(--color-text)" }}>{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Color swatches */}
                        <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24, marginBottom: 24 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>{pt.colors}</h3>
                            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                {product.colors.map((c, i) => (
                                    <div key={c} style={{
                                        width: 36, height: 36, borderRadius: "50%", background: c,
                                        border: i === 0 ? "3px solid var(--color-accent)" : "2px solid rgba(0,0,0,0.1)",
                                        cursor: "pointer",
                                        boxShadow: i === 0 ? "0 0 0 2px white inset" : undefined,
                                    }} title={c} />
                                ))}
                            </div>
                        </div>

                        {/* Size Table — auto-detected by category */}
                        {sizeTableType !== "none" && sizeTable.columns.length > 0 && (
                            <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24, marginBottom: 24 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
                                    {lang === "ru" ? (sizeTable as any).label.ru : (sizeTable as any).label.en}
                                </h3>
                                <div style={{ overflowX: "auto" }}>
                                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                                        <thead>
                                            <tr style={{ background: "var(--color-primary)", color: "white" }}>
                                                {sizeTable.columns.map((col: string) => (
                                                    <th key={col} style={{ padding: "8px 12px", textAlign: "center", fontWeight: 700, whiteSpace: "nowrap", borderRight: "1px solid rgba(255,255,255,0.15)" }}>
                                                        {col}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sizeTable.rows.map((row: readonly string[], ri: number) => (
                                                <tr key={ri} style={{ background: ri % 2 === 0 ? "white" : "var(--color-bg)" }}>
                                                    {row.map((cell: string, ci: number) => (
                                                        <td key={ci} style={{
                                                            padding: "7px 12px", textAlign: "center",
                                                            borderBottom: "1px solid var(--color-border)",
                                                            borderRight: "1px solid var(--color-border)",
                                                            fontWeight: ci === 0 ? 700 : 400,
                                                            color: ci === 0 ? "var(--color-primary)" : "var(--color-text-secondary)",
                                                        }}>{cell}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p style={{ fontSize: 11, color: "var(--color-muted)", marginTop: 10 }}>
                                    {lang === "ru" ? "* Размеры указаны для ориентира. Уточняйте у фабрики по конкретному артикулу." : "* Sizes are for reference only. Confirm exact measurements with the factory for the specific SKU."}
                                </p>
                            </div>
                        )}
                    </div>
                    {/* Right: Buy panel */}
                    <div style={{ position: "sticky", top: 84 }}>
                        {/* Badges */}
                        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                            <span style={{ background: typeConf.bg, color: typeConf.text, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 12, textTransform: "uppercase" }}>
                                {typeLabel}
                            </span>
                            <span style={{ background: "#f1f5f9", color: "var(--color-muted)", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 12 }}>
                                📍 {getRegionLabel(product.region, lang)}
                            </span>
                            {product.verified && (
                                <span style={{ background: "#fef9c3", color: "#854d0e", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 12 }}>
                                    ✓ {pt.verified}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 style={{ fontSize: 24, fontWeight: 900, color: "var(--color-text)", lineHeight: 1.25, marginBottom: 6 }}>
                            {lang === "ru" ? product.titleRu : product.titleEn}
                        </h1>
                        <div style={{ fontSize: 14, color: "var(--color-muted)", marginBottom: 20 }}>
                            <Link href={`/companies/${product.companyId}`} style={{ color: "var(--color-accent)", fontWeight: 600, textDecoration: "none" }}>
                                {product.company.name}
                            </Link>
                            {" · "}{categoryLabel}
                        </div>

                        {/* Price */}
                        <div style={{
                            background: "linear-gradient(135deg, var(--color-primary), #1e4976)",
                            borderRadius: 16, padding: 20, marginBottom: 20, color: "white",
                        }}>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                                {pt.pricing}
                            </div>
                            <div style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.1, marginBottom: 4 }}>
                                {product.priceCurrency}{product.priceFrom.toFixed(2)} – {product.priceCurrency}{product.priceTo.toFixed(2)}
                                <span style={{ fontSize: 14, fontWeight: 400, opacity: 0.7, marginLeft: 6 }}>{pt.perUnit}</span>
                            </div>
                            <div style={{ fontSize: 13, opacity: 0.75 }}>
                                {pt.moq}: <strong>{product.moq}</strong>
                            </div>
                        </div>

                        {/* Price tiers table */}
                        <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 14, padding: 16, marginBottom: 20 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
                                {pt.priceTiers}
                            </div>
                            {details.priceTiers.map((tier, i) => (
                                <div key={i} style={{
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    padding: "8px 0",
                                    borderBottom: i < details.priceTiers.length - 1 ? "1px solid var(--color-border)" : "none",
                                }}>
                                    <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
                                        {pt.fromQty} <strong style={{ color: "var(--color-text)" }}>{tier.qty}</strong> {pt.units}
                                    </span>
                                    <span style={{ fontSize: 16, fontWeight: 800, color: i === 0 ? "var(--color-text)" : "var(--color-accent)" }}>
                                        ${tier.price.toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {product.type === "instock" && (
                                <Link href="/cart" className="btn btn-primary btn-lg" style={{ width: "100%", fontSize: 16 }}>
                                    🛒 {pt.buyNow}
                                </Link>
                            )}
                            {product.type === "rfq" && (
                                <Link
                                    href={`/rfq/new?category=${product.categorySlug}&flow=rfq`}
                                    className="btn btn-primary btn-lg"
                                    style={{ width: "100%", fontSize: 16, background: "#7c3aed" }}
                                >
                                    📐 {pt.submitRFQ}
                                </Link>
                            )}
                            {product.type === "whitelabel" && (
                                <Link
                                    href={`/rfq/new?category=${product.categorySlug}&flow=whitelabel`}
                                    className="btn btn-primary btn-lg"
                                    style={{ width: "100%", fontSize: 16, background: "#1d4ed8" }}
                                >
                                    🏷️ {pt.requestQuote}
                                </Link>
                            )}
                            <button className="btn btn-secondary btn-lg" style={{ width: "100%" }} onClick={() => alert("Chat modal would open here!")}>
                                💬 {pt.contactFactory}
                            </button>
                        </div>

                        {/* Factory card */}
                        <div style={{
                            marginTop: 20,
                            background: "white", border: "1px solid var(--color-border)",
                            borderRadius: 14, padding: 16,
                        }}>
                            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-muted)", marginBottom: 12 }}>
                                {pt.aboutFactory}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 10,
                                    background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 22, flexShrink: 0,
                                }}>🏭</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 15 }}>{product.company.name}</div>
                                    <div style={{ fontSize: 12, color: "var(--color-muted)" }}>📍 {getRegionLabel(product.region, lang)} · {t.common.country}</div>
                                    {product.verified && (
                                        <div style={{ fontSize: 11, color: "#854d0e", marginTop: 2 }}>✓ {pt.verified}</div>
                                    )}
                                </div>
                            </div>
                            <Link href={`/companies/${product.companyId}`} style={{
                                display: "block", textAlign: "center", marginTop: 12,
                                color: "var(--color-accent)", fontSize: 13, fontWeight: 600, textDecoration: "none",
                            }}>
                                {pt.aboutFactory} →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <div style={{ marginTop: 60 }}>
                        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24 }}>{pt.otherProducts}</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                            {related.map(p => {
                                const tc = typeColors[p.type] || typeColors.instock;
                                const tl = p.type === "instock" ? pt.inStock : p.type === "whitelabel" ? pt.whiteLabel : pt.rfq;
                                return (
                                    <Link key={p.id} href={`/products/${p.id}`} style={{ textDecoration: "none" }}>
                                        <div className="card" style={{ overflow: "hidden", cursor: "pointer" }}>
                                            <div style={{ height: 140, background: "white", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                                                {p.image ? <img src={p.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 48 }}>🧵</span>}
                                                <span style={{ position: "absolute", top: 8, left: 8, background: tc.bg, color: tc.text, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10, textTransform: "uppercase" }}>{tl}</span>
                                            </div>
                                            <div style={{ padding: "12px 14px" }}>
                                                <div style={{ fontSize: 11, color: "var(--color-muted)", textTransform: "uppercase", marginBottom: 4 }}>{p.company.name}</div>
                                                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{lang === "ru" ? (p as any).titleRu : (p as any).titleEn}</h3>
                                                <div style={{ fontSize: 15, fontWeight: 800, color: "var(--color-primary)" }}>
                                                    {p.priceCurrency}{p.priceFrom.toFixed(2)} – {p.priceCurrency}{p.priceTo.toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
