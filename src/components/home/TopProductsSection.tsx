"use client";
import Link from "next/link";
import { useT } from "@/contexts/LanguageContext";

import { PRODUCTS } from "@/lib/data";

const topProductIds = [1, 4, 7, 10]; // Sample IDs from generated data
const displayProducts = PRODUCTS.filter(p => topProductIds.includes(p.id));

export default function TopProductsSection() {
    const { t, lang } = useT();
    const tp = t.topProducts;

    return (
        <section className="section" style={{ background: "var(--color-bg)" }}>
            <div className="container">
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36 }}>
                    <div>
                        <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-accent)", marginBottom: 8 }}>
                            {tp.eyebrow}
                        </p>
                        <h2 style={{ fontSize: 32, margin: 0, fontWeight: 800, color: "var(--color-primary)", letterSpacing: "-0.02em" }}>{tp.title}</h2>
                    </div>
                    <Link href="/products" style={{ color: "var(--color-accent)", fontSize: 15, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                        {tp.viewAll} <span style={{ fontSize: 18 }}>→</span>
                    </Link>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
                    {displayProducts.map((p: any) => (
                        <Link key={p.id} href={`/products/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
                            <div className="card" style={{
                                overflow: "hidden",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <div style={{
                                    height: 200,
                                    background: "white",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    position: "relative",
                                    borderBottom: "1px solid var(--color-border)",
                                    overflow: "hidden"
                                }}>
                                    {p.image ? (
                                        <img src={p.image} alt={p.title[lang]} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    ) : (
                                        <div style={{ fontSize: 64 }}>👕</div>
                                    )}
                                    <div style={{ position: "absolute", top: 16, left: 16 }}>
                                        <span className="badge" style={{
                                            background: "rgba(255,255,255,0.9)",
                                            color: "var(--color-primary)",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                            fontWeight: 700,
                                            letterSpacing: "0.02em",
                                            padding: "4px 10px"
                                        }}>
                                            {p.type === 'instock' ? (lang === 'ru' ? 'В наличии' : 'In Stock') : 'B2B'}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ padding: "20px 20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                                    <div style={{ fontSize: 12, color: "var(--color-accent)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>
                                        {p.category[lang]}
                                    </div>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, lineHeight: 1.4, color: "var(--color-text)" }}>{p.title[lang]}</h3>
                                    <div style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 16, fontWeight: 500 }}>
                                        {p.company} · {p.region}
                                    </div>

                                    <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                                        {p.colors.map((c: string) => (
                                            <div key={c} style={{ width: 14, height: 14, borderRadius: "50%", background: c, border: "1px solid rgba(0,0,0,0.15)", boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2)" }} />
                                        ))}
                                    </div>

                                    <div style={{ marginTop: "auto" }}>
                                        <div style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid var(--color-border-strong)", fontWeight: 500 }}>
                                            <span style={{ marginRight: 6 }}>📦</span> MOQ: {p.moq}
                                        </div>

                                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                                            <div>
                                                <div style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text)", lineHeight: 1 }}>{p.priceCurrency}{p.priceFrom}</div>
                                                <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 4, fontWeight: 500 }}>{p.priceUnit}</div>
                                            </div>
                                            <div style={{
                                                width: 40, height: 40,
                                                borderRadius: "var(--radius-xl)", /* Circular */
                                                background: "var(--color-bg)",
                                                border: "1px solid var(--color-border)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color: "var(--color-accent)",
                                                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                                            }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = "var(--color-accent)";
                                                    e.currentTarget.style.color = "white";
                                                    e.currentTarget.style.borderColor = "var(--color-accent)";
                                                    e.currentTarget.style.transform = "scale(1.05)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = "var(--color-bg)";
                                                    e.currentTarget.style.color = "var(--color-accent)";
                                                    e.currentTarget.style.borderColor = "var(--color-border)";
                                                    e.currentTarget.style.transform = "scale(1)";
                                                }}
                                            >
                                                →
                                            </div>
                                        </div>
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
