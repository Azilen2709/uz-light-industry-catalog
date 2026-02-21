"use client";
import Link from "next/link";
import { useT } from "@/contexts/LanguageContext";

const products = [
    {
        id: 1,
        title: { ru: "Худи базовое оверсайз", en: "Basic Oversized Hoodie" },
        category: { ru: "Верхняя одежда", en: "Outerwear" },
        company: "UzTextile Pro",
        region: { ru: "Ташкент", en: "Tashkent" },
        moq: { ru: "10 коробов (100 шт)", en: "10 boxes (100 pcs)" },
        price: "$4.00 – $5.50",
        priceNote: { ru: "за шт", en: "per pc" },
        type: "instock",
        badge: { ru: "В наличии", en: "In Stock" },
        badgeColor: "var(--color-badge-instock)",
        badgeTextColor: "var(--color-badge-instock-text)",
        colors: ["#1a1a1a", "#f0f0f0", "#4a5568", "#c53030"],
        emoji: "👕",
    },
    {
        id: 2,
        title: { ru: "Постельный комплект Satin", en: "Satin Bedding Set" },
        category: { ru: "Домашний текстиль", en: "Home Textile" },
        company: "CottonLand UZ",
        region: { ru: "Фергана", en: "Fergana" },
        moq: { ru: "20 комплектов", en: "20 sets" },
        price: "$8.00 – $12.00",
        priceNote: { ru: "за компл.", en: "per set" },
        type: "instock",
        badge: { ru: "В наличии", en: "In Stock" },
        badgeColor: "var(--color-badge-instock)",
        badgeTextColor: "var(--color-badge-instock-text)",
        colors: ["#e8f5e9", "#f3e5f5", "#e3f2fd", "#fff8e1"],
        emoji: "🛏️",
    },
    {
        id: 3,
        title: { ru: "Мужская рубашка Poplin", en: "Men's Poplin Shirt" },
        category: { ru: "Мужская одежда", en: "Men's Clothing" },
        company: "StyleFactory",
        region: { ru: "Самарканд", en: "Samarkand" },
        moq: { ru: "50 шт", en: "50 pcs" },
        price: "$5.50 – $7.00",
        priceNote: { ru: "за шт", en: "per pc" },
        type: "whitelabel",
        badge: { ru: "White Label", en: "White Label" },
        badgeColor: "var(--color-badge-oem)",
        badgeTextColor: "var(--color-badge-oem-text)",
        colors: ["#1a1a1a", "#f5f5f5", "#1565c0", "#6d4c41"],
        emoji: "👔",
    },
    {
        id: 4,
        title: { ru: "Спортивный костюм двухнитка", en: "Fleece Tracksuit" },
        category: { ru: "Спортивная одежда", en: "Sportswear" },
        company: "SportTex UZ",
        region: { ru: "Наманган", en: "Namangan" },
        moq: { ru: "30 костюмов", en: "30 suits" },
        price: "$12.00 – $16.00",
        priceNote: { ru: "за костюм", en: "per suit" },
        type: "instock",
        badge: { ru: "В наличии", en: "In Stock" },
        badgeColor: "var(--color-badge-instock)",
        badgeTextColor: "var(--color-badge-instock-text)",
        colors: ["#1a237e", "#212121", "#b71c1c"],
        emoji: "🏃",
    },
];

export default function TopProductsSection() {
    const { t, lang } = useT();
    const tp = t.topProducts;

    return (
        <section className="section" style={{ background: "var(--color-bg)" }}>
            <div className="container">
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36 }}>
                    <div>
                        <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent)", marginBottom: 8 }}>
                            {tp.eyebrow}
                        </p>
                        <h2 style={{ fontSize: 32, margin: 0 }}>{tp.title}</h2>
                    </div>
                    <Link href="/products" style={{ color: "var(--color-accent)", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                        {tp.viewAll}
                    </Link>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
                    {products.map(p => (
                        <Link key={p.id} href={`/products/${p.id}`} style={{ textDecoration: "none" }}>
                            <div className="card" style={{ overflow: "hidden", cursor: "pointer" }}>
                                <div style={{
                                    height: 180, background: "linear-gradient(135deg, #f0f6ff 0%, #e8f4ff 100%)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 56, position: "relative",
                                }}>
                                    {p.emoji}
                                    <div style={{ position: "absolute", top: 12, left: 12 }}>
                                        <span className="badge" style={{ background: p.badgeColor, color: p.badgeTextColor }}>
                                            {p.badge[lang]}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ padding: 16 }}>
                                    <div style={{ fontSize: 11, color: "var(--color-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>
                                        {p.category[lang]}
                                    </div>
                                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>{p.title[lang]}</h3>
                                    <div style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 12 }}>
                                        {p.company} · {p.region[lang]}
                                    </div>

                                    <div style={{ display: "flex", gap: 5, marginBottom: 12 }}>
                                        {p.colors.map(c => (
                                            <div key={c} style={{ width: 16, height: 16, borderRadius: "50%", background: c, border: "1.5px solid rgba(0,0,0,0.1)" }} />
                                        ))}
                                    </div>

                                    <div style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid var(--color-border)" }}>
                                        📦 MOQ: {p.moq[lang]}
                                    </div>

                                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                                        <div>
                                            <span style={{ fontSize: 17, fontWeight: 800, color: "var(--color-primary)" }}>{p.price}</span>
                                            <span style={{ fontSize: 12, color: "var(--color-muted)", marginLeft: 4 }}>{p.priceNote[lang]}</span>
                                        </div>
                                        <span style={{ fontSize: 12, color: "var(--color-accent)", fontWeight: 600 }}>
                                            {t.catalog.details}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
