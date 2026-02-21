"use client";
import { useT } from "@/contexts/LanguageContext";

export default function StatsSection() {
    const { t } = useT();
    const s = t.stats;

    const stats = [
        { value: "500+", label: s.factories, icon: "🏭" },
        { value: "15,000+", label: s.products, icon: "👕" },
        { value: "2", label: s.languages, icon: "🌍" },
        { value: "3", label: s.flows, icon: "⚡" },
    ];

    return (
        <section style={{
            background: "white",
            borderBottom: "1px solid var(--color-border)",
        }}>
            <div className="container">
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 0,
                }}>
                    {stats.map((stat, i) => (
                        <div key={i} style={{
                            padding: "28px 24px",
                            borderRight: i < stats.length - 1 ? "1px solid var(--color-border)" : "none",
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                        }}>
                            <div style={{ fontSize: 32 }}>{stat.icon}</div>
                            <div>
                                <div style={{
                                    fontSize: 26,
                                    fontWeight: 800,
                                    color: "var(--color-primary)",
                                    lineHeight: 1.1,
                                }}>{stat.value}</div>
                                <div style={{
                                    fontSize: 13,
                                    color: "var(--color-muted)",
                                    marginTop: 2,
                                }}>{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
