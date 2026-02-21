import Link from "next/link";
import { Product } from "@/lib/data";

const typeConfig = {
    instock: { label: "В наличии", bg: "#dcfce7", text: "#15803d" },
    whitelabel: { label: "White Label", bg: "#dbeafe", text: "#1d4ed8" },
    rfq: { label: "RFQ", bg: "#ede9fe", text: "#6d28d9" },
};

interface ProductCardProps {
    product: Product;
    view: "grid" | "list";
}

export default function ProductCard({ product: p, view }: ProductCardProps) {
    const type = typeConfig[p.type];

    if (view === "list") {
        return (
            <Link href={`/products/${p.id}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    padding: 16,
                    cursor: "pointer",
                }}>
                    {/* Image */}
                    <div style={{
                        width: 100, height: 100, flexShrink: 0, borderRadius: 10,
                        background: "linear-gradient(135deg, #f0f6ff, #e8f4ff)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 40, border: "1px solid var(--color-border)",
                    }}>🧵</div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <span style={{ background: type.bg, color: type.text, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                                {type.label}
                            </span>
                            {p.verified && (
                                <span style={{ fontSize: 10, color: "#854d0e", background: "#fef9c3", padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>
                                    ✓ Проверен
                                </span>
                            )}
                        </div>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>{p.title}</h3>
                        <div style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 6 }}>
                            {p.company} · 📍 {p.region}
                        </div>
                        <div style={{ display: "flex", gap: 5 }}>
                            {p.colors.map(c => (
                                <div key={c} style={{ width: 14, height: 14, borderRadius: "50%", background: c, border: "1.5px solid rgba(0,0,0,0.1)" }} />
                            ))}
                        </div>
                    </div>

                    {/* Right: MOQ + Price + CTA */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 11, color: "var(--color-muted)", marginBottom: 2 }}>MOQ: <strong style={{ color: "var(--color-text)" }}>{p.moq}</strong></div>
                        <div style={{ fontSize: 11, color: "var(--color-muted)", marginBottom: 8 }}>⏱ {p.leadTime}</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: "var(--color-primary)", marginBottom: 8 }}>
                            {p.priceCurrency}{p.priceFrom.toFixed(2)} – {p.priceCurrency}{p.priceTo.toFixed(2)}
                            <span style={{ fontSize: 12, color: "var(--color-muted)", fontWeight: 400, marginLeft: 4 }}>{p.priceUnit}</span>
                        </div>
                        <span className="btn btn-primary btn-sm">Подробнее →</span>
                    </div>
                </div>
            </Link>
        );
    }

    // Grid view
    return (
        <Link href={`/products/${p.id}`} style={{ textDecoration: "none" }}>
            <div className="card" style={{ overflow: "hidden", cursor: "pointer", height: "100%" }}>
                {/* Image */}
                <div style={{
                    height: 180, background: "linear-gradient(135deg, #f0f6ff, #e8f4ff)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 56, position: "relative",
                }}>
                    🧵
                    <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 4 }}>
                        <span style={{ background: type.bg, color: type.text, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10, textTransform: "uppercase" }}>
                            {type.label}
                        </span>
                    </div>
                    {p.verified && (
                        <div style={{ position: "absolute", top: 10, right: 10 }}>
                            <span style={{ fontSize: 10, color: "#854d0e", background: "#fef9c3", padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>
                                ✓
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div style={{ padding: "14px 16px" }}>
                    <div style={{ fontSize: 11, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600, marginBottom: 4 }}>
                        {p.category}
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)", marginBottom: 4, lineHeight: 1.3 }}>{p.title}</h3>
                    <div style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 10 }}>
                        {p.company} · {p.region}
                    </div>

                    {/* Color swatches */}
                    <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
                        {p.colors.map(c => (
                            <div key={c} style={{ width: 14, height: 14, borderRadius: "50%", background: c, border: "1.5px solid rgba(0,0,0,0.1)" }} />
                        ))}
                    </div>

                    {/* MOQ */}
                    <div style={{
                        fontSize: 12, color: "var(--color-muted)",
                        paddingBottom: 10, marginBottom: 10,
                        borderBottom: "1px solid var(--color-border)",
                    }}>
                        📦 MOQ: <strong style={{ color: "var(--color-text)" }}>{p.moq}</strong>
                        <span style={{ marginLeft: 10 }}>⏱ {p.leadTime}</span>
                    </div>

                    {/* Price */}
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                        <div>
                            <span style={{ fontSize: 16, fontWeight: 800, color: "var(--color-primary)" }}>
                                {p.priceCurrency}{p.priceFrom.toFixed(2)} – {p.priceCurrency}{p.priceTo.toFixed(2)}
                            </span>
                            <span style={{ fontSize: 11, color: "var(--color-muted)", marginLeft: 4 }}>{p.priceUnit}</span>
                        </div>
                        <span style={{ fontSize: 12, color: "var(--color-accent)", fontWeight: 600 }}>→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
