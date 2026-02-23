"use client";
import Link from "next/link";
import { useT } from "@/contexts/LanguageContext";

import { COMPANIES } from "@/lib/data";

const topCompanyIds = [1, 2, 6, 3]; // Sample IDs from generated data
const displayFactories = COMPANIES.filter(f => topCompanyIds.includes(f.id));

export default function TopFactoriesSection() {
    const { t, lang } = useT();
    const tf = t.topFactories;

    return (
        <section className="section" style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border-light)" }}>
            <style>{`
        .factory-card {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
          padding: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: block;
        }
        .factory-card:hover {
          border-color: var(--color-border-strong);
          box-shadow: var(--shadow-card-hover);
          transform: translateY(-2px);
        }
        .factory-card:hover .factory-arrow {
          transform: translateX(4px);
          color: var(--color-accent-hover);
        }
      `}</style>
            <div className="container">
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36 }}>
                    <div>
                        <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-accent)", marginBottom: 8 }}>
                            {tf.eyebrow}
                        </p>
                        <h2 style={{ fontSize: 32, margin: 0, fontWeight: 800, color: "var(--color-primary)", letterSpacing: "-0.02em" }}>{tf.title}</h2>
                    </div>
                    <Link href="/companies" style={{ color: "var(--color-accent)", fontSize: 15, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                        {tf.viewAll} <span style={{ fontSize: 18 }}>→</span>
                    </Link>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
                    {displayFactories.map((f: any) => (
                        <Link key={f.id} href={`/companies/${f.id}`} className="factory-card">
                            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                                <div style={{
                                    width: 72, height: 72,
                                    background: "white",
                                    borderRadius: "var(--radius-md)", flexShrink: 0,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    border: "1px solid var(--color-border)",
                                    overflow: "hidden"
                                }}>
                                    {f.logo ? (
                                        <img src={f.logo} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    ) : (
                                        <span style={{ fontSize: 32 }}>🏭</span>
                                    )}
                                </div>

                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                                        <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "var(--color-text)" }}>{f.name}</h3>
                                        {f.verified && (
                                            <span className="badge" style={{ background: "rgba(22, 163, 74, 0.1)", color: "#16a34a", padding: "4px 8px", fontSize: 11, fontWeight: 700, letterSpacing: "0.02em" }}>
                                                ✓ {tf.verified}
                                            </span>
                                        )}
                                    </div>

                                    <div style={{ fontSize: 14, color: "var(--color-muted)", marginBottom: 12, fontWeight: 500 }}>
                                        <span style={{ color: "var(--color-accent)", marginRight: 4 }}>📍</span> {f.region} · {f.specialization[lang]}
                                    </div>

                                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                                        {f.categories.map((c: string) => (
                                            <span key={c} style={{
                                                fontSize: 12, background: "var(--color-bg)", border: "1px solid var(--color-border)",
                                                borderRadius: "var(--radius-sm)", padding: "4px 10px", color: "var(--color-text-secondary)", fontWeight: 600,
                                            }}>{c}</span>
                                        ))}
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 13, paddingTop: 16, borderTop: "1px solid var(--color-border)" }}>
                                        <span style={{ color: "var(--color-muted)", fontWeight: 500 }}>
                                            <span style={{ marginRight: 6 }}>📦</span> {tf.moq}: <strong style={{ color: "var(--color-text)", fontWeight: 700 }}>{f.moqFrom}</strong>
                                        </span>
                                        <span style={{ color: "var(--color-muted)", fontWeight: 500 }}>
                                            <span style={{ marginRight: 6 }}>⏱</span> <strong style={{ color: "var(--color-text)", fontWeight: 700 }}>{f.leadTime}</strong>
                                        </span>
                                        <span style={{ color: "#d97706", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                                            ★ {f.rating} <span style={{ color: "var(--color-muted)", fontWeight: 500, fontSize: 12 }}>({f.reviewCount})</span>
                                        </span>
                                    </div>
                                </div>

                                <div style={{ flexShrink: 0, display: "flex", alignItems: "flex-start", paddingTop: 4 }}>
                                    <span className="factory-arrow" style={{ fontSize: 18, color: "var(--color-accent)", fontWeight: 600, transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease" }}>
                                        →
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
