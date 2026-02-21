import Link from "next/link";

const products = [
    {
        id: 1,
        title: "Худи базовое оверсайз",
        category: "Верхняя одежда",
        company: "UzTextile Pro",
        region: "Ташкент",
        moq: "10 коробов (100 шт)",
        price: "$4.00 – $5.50",
        priceNote: "за шт",
        type: "instock",
        badge: "В наличии",
        badgeColor: "var(--color-badge-instock)",
        badgeTextColor: "var(--color-badge-instock-text)",
        colors: ["#1a1a1a", "#f0f0f0", "#4a5568", "#c53030"],
        emoji: "👕",
    },
    {
        id: 2,
        title: "Постельный комплект Satin",
        category: "Домашний текстиль",
        company: "CottonLand UZ",
        region: "Фергана",
        moq: "20 комплектов",
        price: "$8.00 – $12.00",
        priceNote: "за комплект",
        type: "instock",
        badge: "В наличии",
        badgeColor: "var(--color-badge-instock)",
        badgeTextColor: "var(--color-badge-instock-text)",
        colors: ["#e8f5e9", "#f3e5f5", "#e3f2fd", "#fff8e1"],
        emoji: "🛏️",
    },
    {
        id: 3,
        title: "Мужская рубашка Poplin",
        category: "Мужская одежда",
        company: "StyleFactory",
        region: "Самарканд",
        moq: "50 шт",
        price: "$5.50 – $7.00",
        priceNote: "за шт",
        type: "whitelabel",
        badge: "White Label",
        badgeColor: "var(--color-badge-oem)",
        badgeTextColor: "var(--color-badge-oem-text)",
        colors: ["#1a1a1a", "#f5f5f5", "#1565c0", "#6d4c41"],
        emoji: "👔",
    },
    {
        id: 4,
        title: "Спортивный костюм (2 ед.)",
        category: "Спортивная одежда",
        company: "SportTex UZ",
        region: "Наманган",
        moq: "30 костюмов",
        price: "$12.00 – $16.00",
        priceNote: "за костюм",
        type: "instock",
        badge: "В наличии",
        badgeColor: "var(--color-badge-instock)",
        badgeTextColor: "var(--color-badge-instock-text)",
        colors: ["#1a237e", "#212121", "#b71c1c"],
        emoji: "🏃",
    },
];

export default function TopProductsSection() {
    return (
        <section className="section" style={{ background: "var(--color-bg)" }}>
            <div className="container">
                <div style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    marginBottom: 36,
                }}>
                    <div>
                        <p style={{
                            fontSize: 12,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "var(--color-accent)",
                            marginBottom: 8,
                        }}>Актуальные предложения</p>
                        <h2 style={{ fontSize: 32, margin: 0 }}>Топ товаров недели</h2>
                    </div>
                    <Link href="/products" style={{
                        color: "var(--color-accent)",
                        fontSize: 14,
                        fontWeight: 600,
                        textDecoration: "none",
                    }}>Все товары →</Link>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 20,
                }}>
                    {products.map(p => (
                        <Link key={p.id} href={`/products/${p.id}`} style={{ textDecoration: "none" }}>
                            <div className="card" style={{ overflow: "hidden", cursor: "pointer" }}>
                                {/* Image placeholder */}
                                <div style={{
                                    height: 180,
                                    background: `linear-gradient(135deg, #f0f6ff 0%, #e8f4ff 100%)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 56,
                                    position: "relative",
                                }}>
                                    {p.emoji}
                                    <div style={{
                                        position: "absolute",
                                        top: 12,
                                        left: 12,
                                    }}>
                                        <span className="badge" style={{
                                            background: p.badgeColor,
                                            color: p.badgeTextColor,
                                        }}>{p.badge}</span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div style={{ padding: "16px" }}>
                                    <div style={{
                                        fontSize: 11,
                                        color: "var(--color-muted)",
                                        marginBottom: 4,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.04em",
                                        fontWeight: 600,
                                    }}>{p.category}</div>
                                    <h3 style={{
                                        fontSize: 15,
                                        fontWeight: 700,
                                        color: "var(--color-text)",
                                        marginBottom: 4,
                                        lineHeight: 1.3,
                                    }}>{p.title}</h3>
                                    <div style={{
                                        fontSize: 12,
                                        color: "var(--color-muted)",
                                        marginBottom: 12,
                                    }}>
                                        {p.company} · {p.region}
                                    </div>

                                    {/* Color dots */}
                                    <div style={{ display: "flex", gap: 5, marginBottom: 12 }}>
                                        {p.colors.map(c => (
                                            <div key={c} style={{
                                                width: 16, height: 16,
                                                borderRadius: "50%",
                                                background: c,
                                                border: "1.5px solid rgba(0,0,0,0.1)",
                                            }} />
                                        ))}
                                    </div>

                                    {/* MOQ */}
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                        fontSize: 12,
                                        color: "var(--color-muted)",
                                        marginBottom: 10,
                                        paddingBottom: 10,
                                        borderBottom: "1px solid var(--color-border)",
                                    }}>
                                        <span>📦</span>
                                        <span>MOQ: {p.moq}</span>
                                    </div>

                                    {/* Price */}
                                    <div style={{
                                        display: "flex",
                                        alignItems: "baseline",
                                        justifyContent: "space-between",
                                    }}>
                                        <div>
                                            <span style={{
                                                fontSize: 17,
                                                fontWeight: 800,
                                                color: "var(--color-primary)",
                                            }}>{p.price}</span>
                                            <span style={{ fontSize: 12, color: "var(--color-muted)", marginLeft: 4 }}>
                                                {p.priceNote}
                                            </span>
                                        </div>
                                        <span style={{
                                            fontSize: 12,
                                            color: "var(--color-accent)",
                                            fontWeight: 600,
                                        }}>Подробнее →</span>
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
