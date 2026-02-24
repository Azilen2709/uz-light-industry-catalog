import Link from "next/link";
import { Product } from "@prisma/client";

const typeConfig = {
    instock: { label: "В наличии", bg: "#dcfce7", text: "#15803d" },
    whitelabel: { label: "White Label", bg: "#dbeafe", text: "#1d4ed8" },
    rfq: { label: "RFQ", bg: "#ede9fe", text: "#6d28d9" },
};

type ProductWithCompany = Product & {
    company?: { name: string, region: string, verified: boolean },
    title?: any // Support both object and string
};

interface ProductCardProps {
    product: ProductWithCompany;
    view: "grid" | "list";
    lang?: "ru" | "en";
}

export default function ProductCard({ product: p, view, lang = "ru" }: ProductCardProps) {
    const type = typeConfig[p.type];
    const displayTitle = typeof p.title === 'object'
        ? (p.title[lang] || p.title['ru'])
        : (lang === 'ru' ? ((p as any).titleRu || p.title) : ((p as any).titleEn || p.title || (p as any).titleRu));

    if (view === "list") {
        return (
            <Link href={`/products/${p.id}`} style={{ textDecoration: "none" }}>
                <style>{`
          .product-card-list {
            display: flex; align-items: stretch; gap: 24px; padding: 16px;
            background: white; border: 1px solid var(--color-border);
            border-radius: var(--radius-lg); cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: var(--shadow-sm);
          }
          .product-card-list:hover {
            transform: translateX(4px);
            box-shadow: var(--shadow-card-hover);
            border-color: rgba(59, 130, 246, 0.3);
          }
          .list-img-wrap {
            width: 140px; border-radius: 12px; flex-shrink: 0;
            background: linear-gradient(135deg, #f8fafc, #f1f5f9);
            display: flex; align-items: center; justify-content: center;
            font-size: 48px; border: 1px solid var(--color-border);
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .product-card-list:hover .list-img-wrap {
            background: linear-gradient(135deg, #f0f6ff, #e0f2fe);
          }
        `}</style>
                <div className="product-card-list">
                    {/* Image */}
                    <div className="list-img-wrap">
                        {p.image ? (
                            <img
                                src={p.image}
                                alt={p.title}
                                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
                            />
                        ) : (
                            "🧵"
                        )}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                            <span style={{
                                background: type.bg, color: type.text, fontSize: 10, fontWeight: 700,
                                padding: "4px 10px", borderRadius: "var(--radius-xl)", letterSpacing: "0.02em",
                                textTransform: "uppercase", boxShadow: "var(--shadow-sm)"
                            }}>
                                {type.label}
                            </span>
                            {p.verified && (
                                <span style={{
                                    fontSize: 10, color: "#854d0e", background: "#fef9c3",
                                    padding: "4px 10px", borderRadius: "var(--radius-xl)", fontWeight: 700,
                                    boxShadow: "var(--shadow-sm)"
                                }}>
                                    ✓ Проверен
                                </span>
                            )}
                        </div>
                        <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--color-primary)", marginBottom: 6, letterSpacing: "-0.01em" }}>{displayTitle}</h3>
                        <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 10, fontWeight: 500 }}>
                            {p.company?.name || p.companyId} <span style={{ color: "var(--color-muted)" }}>·</span> 📍 {p.region}
                        </div>
                        <div style={{ display: "flex", gap: 6 }}>
                            {p.colors.map(c => (
                                <div key={c} style={{ width: 16, height: 16, borderRadius: "50%", background: c, border: "2px solid rgba(0,0,0,0.05)", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }} />
                            ))}
                        </div>
                    </div>

                    {/* Right: MOQ + Price + CTA */}
                    <div style={{ textAlign: "right", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 200, paddingLeft: 24, borderLeft: "1px solid var(--color-border-strong)" }}>
                        <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 4, fontWeight: 500 }}>
                            MOQ: <strong style={{ color: "var(--color-primary)", fontWeight: 700 }}>{p.moq}</strong>
                        </div>
                        <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 16, fontWeight: 500 }}>
                            ⏱ {p.leadTime}
                        </div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text)", marginBottom: 16, letterSpacing: "-0.01em" }}>
                            {p.priceCurrency}{p.priceFrom.toFixed(2)} – {p.priceCurrency}{p.priceTo.toFixed(2)}
                            <span style={{ fontSize: 12, color: "var(--color-muted)", fontWeight: 600, marginLeft: 4 }}>{p.priceUnit}</span>
                        </div>
                        <span className="btn btn-primary" style={{ borderRadius: "var(--radius-xl)", padding: "10px 20px" }}>Подробнее →</span>
                    </div>
                </div>
            </Link>
        );
    }

    // Grid view
    return (
        <Link href={`/products/${p.id}`} style={{ textDecoration: "none" }}>
            <style>{`
        .product-card-hover {
          overflow: hidden; cursor: pointer; height: 100%; border-radius: var(--radius-lg);
          background: white; border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex; flex-direction: column;
        }
        .product-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-card-hover);
          border-color: rgba(59, 130, 246, 0.3);
        }
        .product-img-wrap {
          height: 200px;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          display: flex; alignItems: center; justify-content: center;
          font-size: 64px; position: relative;
          border-bottom: 1px solid var(--color-border);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .product-card-hover:hover .product-img-wrap {
          background: linear-gradient(135deg, #f0f6ff, #e0f2fe);
        }
      `}</style>
            <div className="product-card-hover">
                {/* Image */}
                <div className="product-img-wrap">
                    {p.image ? (
                        <img
                            src={p.image}
                            alt={p.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    ) : (
                        "🧵"
                    )}
                    <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
                        <span style={{
                            background: type.bg, color: type.text, fontSize: 10, fontWeight: 700,
                            padding: "4px 10px", borderRadius: "var(--radius-xl)", /* Pill shape */
                            textTransform: "uppercase", letterSpacing: "0.02em", boxShadow: "var(--shadow-sm)"
                        }}>
                            {type.label}
                        </span>
                    </div>
                    {p.verified && (
                        <div style={{ position: "absolute", top: 12, right: 12 }}>
                            <span style={{
                                fontSize: 11, color: "#854d0e", background: "#fef9c3",
                                padding: "4px 10px", borderRadius: "var(--radius-xl)", fontWeight: 700,
                                boxShadow: "var(--shadow-sm)"
                            }}>
                                ✓
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div style={{ padding: "16px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 11, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 700, marginBottom: 6 }}>
                        {p.categorySlug}
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--color-primary)", marginBottom: 6, lineHeight: 1.3, letterSpacing: "-0.01em" }}>{displayTitle}</h3>
                    <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 12, fontWeight: 500 }}>
                        {p.company?.name || p.companyId} <span style={{ color: "var(--color-muted)" }}>·</span> {p.region}
                    </div>

                    {/* Color swatches */}
                    <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                        {p.colors.map(c => (
                            <div key={c} style={{ width: 16, height: 16, borderRadius: "50%", background: c, border: "2px solid rgba(0,0,0,0.05)", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }} />
                        ))}
                    </div>

                    <div style={{ marginTop: "auto" }}>
                        {/* MOQ */}
                        <div style={{
                            fontSize: 12, color: "var(--color-text-secondary)",
                            paddingBottom: 12, marginBottom: 12,
                            borderBottom: "1px solid var(--color-border-strong)",
                            display: "flex", justifyContent: "space-between", fontWeight: 500
                        }}>
                            <span>📦 MOQ: <strong style={{ color: "var(--color-primary)", fontWeight: 700 }}>{p.moq}</strong></span>
                            <span>⏱ {p.leadTime}</span>
                        </div>

                        {/* Price */}
                        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                            <div>
                                <span style={{ fontSize: 18, fontWeight: 800, color: "var(--color-text)", letterSpacing: "-0.01em" }}>
                                    {p.priceCurrency}{p.priceFrom.toFixed(2)} – {p.priceCurrency}{p.priceTo.toFixed(2)}
                                </span>
                                <span style={{ fontSize: 11, color: "var(--color-muted)", marginLeft: 4, fontWeight: 600 }}>{p.priceUnit}</span>
                            </div>
                            <div style={{
                                width: 28, height: 28, borderRadius: "var(--radius-xl)", background: "var(--color-surface)",
                                border: "1px solid var(--color-border-strong)", display: "flex", alignItems: "center", justifyContent: "center",
                                color: "var(--color-accent)", fontSize: 12, fontWeight: 700, transition: "all 0.2s"
                            }}>
                                →
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
