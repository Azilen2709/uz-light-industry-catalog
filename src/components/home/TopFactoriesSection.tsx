"use client";
import Link from "next/link";
import { useT } from "@/contexts/LanguageContext";

const factories = [
    {
        id: 1, name: "UzTextile Pro", region: "Ташкент",
        specialization: { ru: "Трикотаж, Худи, Футболки", en: "Knitwear, Hoodies, T-Shirts" },
        moq: { ru: "от 500 шт", en: "from 500 pcs" },
        leadTime: "20–35 дн.",
        verified: true, rating: 4.9, reviews: 42,
        categories: { ru: ["Трикотаж", "White Label"], en: ["Knitwear", "White Label"] },
        emoji: "👕",
    },
    {
        id: 2, name: "CottonLand UZ", region: "Фергана",
        specialization: { ru: "Домашний текстиль, Бельё", en: "Home Textile, Bedding" },
        moq: { ru: "от 200 компл.", en: "from 200 sets" },
        leadTime: "15–25 дн.",
        verified: true, rating: 4.8, reviews: 28,
        categories: { ru: ["Текстиль", "In-Stock"], en: ["Textile", "In-Stock"] },
        emoji: "🛏️",
    },
    {
        id: 6, name: "Bukhara Carpet House", region: "Бухара",
        specialization: { ru: "Ковры ручной работы", en: "Handmade Carpets" },
        moq: { ru: "от 5 шт", en: "from 5 pcs" },
        leadTime: "30–60 дн.",
        verified: true, rating: 5.0, reviews: 19,
        categories: { ru: ["Ковры", "RFQ"], en: ["Carpets", "RFQ"] },
        emoji: "🪣",
    },
    {
        id: 3, name: "StyleFactory", region: "Самарканд",
        specialization: { ru: "Рубашки, Деловая одежда", en: "Shirts, Business Attire" },
        moq: { ru: "от 50 шт", en: "from 50 pcs" },
        leadTime: "15–20 дн.",
        verified: true, rating: 4.6, reviews: 11,
        categories: { ru: ["Одежда", "White Label"], en: ["Clothing", "White Label"] },
        emoji: "👔",
    },
];

export default function TopFactoriesSection() {
    const { t, lang } = useT();
    const tf = t.topFactories;

    return (
        <section className="section" style={{ background: "white" }}>
            <style>{`
        .factory-card {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-card);
          padding: 24px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: block;
        }
        .factory-card:hover {
          border-color: var(--color-accent);
          box-shadow: var(--shadow-card-hover);
          transform: translateY(-1px);
        }
      `}</style>
            <div className="container">
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36 }}>
                    <div>
                        <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent)", marginBottom: 8 }}>
                            {tf.eyebrow}
                        </p>
                        <h2 style={{ fontSize: 32, margin: 0 }}>{tf.title}</h2>
                    </div>
                    <Link href="/companies" style={{ color: "var(--color-accent)", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                        {tf.viewAll}
                    </Link>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
                    {factories.map(f => (
                        <Link key={f.id} href={`/companies/${f.id}`} className="factory-card">
                            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                                <div style={{
                                    width: 60, height: 60,
                                    background: "linear-gradient(135deg, #f0f8ff, #dbeafe)",
                                    borderRadius: 14, fontSize: 28, flexShrink: 0,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    border: "1px solid var(--color-border)",
                                }}>{f.emoji}</div>

                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                                        <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{f.name}</h3>
                                        {f.verified && (
                                            <span className="badge" style={{ background: "var(--color-badge-verified)", color: "var(--color-badge-verified-text)" }}>
                                                ✓ {tf.verified}
                                            </span>
                                        )}
                                    </div>

                                    <div style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 10 }}>
                                        📍 {f.region} · {f.specialization[lang]}
                                    </div>

                                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                                        {f.categories[lang].map(c => (
                                            <span key={c} style={{
                                                fontSize: 11, background: "var(--color-bg)", border: "1px solid var(--color-border)",
                                                borderRadius: 6, padding: "2px 8px", color: "var(--color-text-secondary)", fontWeight: 500,
                                            }}>{c}</span>
                                        ))}
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 13 }}>
                                        <span style={{ color: "var(--color-muted)" }}>
                                            📦 {tf.moq}: <strong style={{ color: "var(--color-text)" }}>{f.moq[lang]}</strong>
                                        </span>
                                        <span style={{ color: "var(--color-muted)" }}>
                                            ⏱ <strong style={{ color: "var(--color-text)" }}>{f.leadTime}</strong>
                                        </span>
                                        <span style={{ color: "#d97706", fontWeight: 700 }}>★ {f.rating} ({f.reviews})</span>
                                    </div>
                                </div>

                                <div style={{ flexShrink: 0 }}>
                                    <span style={{ fontSize: 13, color: "var(--color-accent)", fontWeight: 600 }}>
                                        {tf.viewFactory} →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
