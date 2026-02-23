"use client";
import Link from "next/link";
import { useT } from "@/contexts/LanguageContext";
import { NeonBoxIcon, NeonTagIcon, NeonRFQIcon } from "@/components/icons/NeonIcons";

export default function HeroSection() {
    const { t } = useT();
    const h = t.hero;

    const flows = [
        {
            IconComp: () => <NeonBoxIcon size={32} color="green" />,
            title: h.flow1Title, desc: h.flow1Desc,
            badge: "In-Stock", badgeColor: "#16a34a",
            href: "/products?type=instock", btnLabel: h.flow1Btn,
        },
        {
            IconComp: () => <NeonTagIcon size={32} color="cyan" />,
            title: h.flow2Title, desc: h.flow2Desc,
            badge: "White Label", badgeColor: "#0e7bc4",
            href: "/products?type=whitelabel", btnLabel: h.flow2Btn,
        },
        {
            IconComp: () => <NeonRFQIcon size={32} color="purple" />,
            title: h.flow3Title, desc: h.flow3Desc,
            badge: "RFQ", badgeColor: "#7c3aed",
            href: "/rfq/new", btnLabel: h.flow3Btn,
        },
    ];

    return (
        <section style={{
            background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)", /* Deep Ocean bg */
            padding: "80px 0 64px",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Background decoration */}
            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(59,130,246,0.1) 0%, transparent 40%),
          radial-gradient(circle at 80% 20%, rgba(59,130,246,0.08) 0%, transparent 40%)
        `,
                pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", top: -80, right: -80,
                width: 400, height: 400,
                background: "rgba(59,130,246,0.05)",
                borderRadius: "50%",
            }} />

            <div className="container" style={{ position: "relative" }}>
                {/* Badge */}
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "var(--radius-xl)", padding: "6px 16px", marginBottom: 24,
                    backdropFilter: "blur(12px)",
                }}>
                    <div style={{ filter: "drop-shadow(0 0 6px rgba(59,130,246,0.5))" }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="6" stroke="var(--color-accent)" strokeWidth="1.5" fill="none" />
                            <path d="M4 7 C4 7 6 5 7 7 C8 9 10 7 10 7" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        </svg>
                    </div>
                    <span style={{ color: "white", fontSize: 13, fontWeight: 600, letterSpacing: "0.02em" }}>
                        {h.badge}
                    </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
                    {/* Left */}
                    <div>
                        <h1 style={{ fontSize: 56, fontWeight: 800, color: "white", lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.04em" }}>
                            {h.title1}{" "}
                            <span style={{ color: "var(--color-accent)" }}>
                                {h.title2}
                            </span>
                        </h1>

                        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 36, maxWidth: 480, fontWeight: 400 }}>
                            {h.subtitle}
                        </p>

                        {/* Search */}
                        <div style={{
                            display: "flex", gap: 0, maxWidth: 520,
                            background: "white", borderRadius: "100px", overflow: "hidden", /* Pill shape */
                            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2), 0 8px 10px -6px rgba(0,0,0,0.1)", marginBottom: 24,
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}>
                            <input
                                type="text"
                                placeholder={h.searchPlaceholder}
                                style={{ flex: 1, border: "none", outline: "none", padding: "16px 24px", fontSize: 15, color: "var(--color-text)", fontWeight: 500 }}
                            />
                            <button style={{
                                background: "var(--color-accent)", color: "white", border: "none",
                                padding: "16px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer",
                                transition: "background 0.2s ease",
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-accent-hover)"}
                                onMouseLeave={(e) => e.currentTarget.style.background = "var(--color-accent)"}
                            >
                                {h.searchBtn}
                            </button>
                        </div>

                        {/* Popular tags */}
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{h.popular}</span>
                            {(h.popularTags as readonly string[]).map(tag => (
                                <Link key={tag} href={`/products?q=${tag}`} style={{
                                    fontSize: 12, color: "rgba(255,255,255,0.8)",
                                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)",
                                    borderRadius: 20, padding: "4px 12px", textDecoration: "none",
                                    transition: "all 0.15s ease",
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                                >{tag}</Link>
                            ))}
                        </div>
                    </div>

                    {/* Right: CTA Cards */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {flows.map(card => (
                            <div key={card.badge} style={{
                                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "var(--radius-lg)", padding: "20px",
                                display: "flex", alignItems: "center", gap: 16,
                                backdropFilter: "blur(12px)",
                                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                cursor: "pointer",
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                                    e.currentTarget.style.transform = "translateY(-4px)";
                                    e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0,0,0,0.2)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)";
                                }}
                            >
                                <div style={{
                                    width: 52, height: 52, background: "rgba(255,255,255,0.05)", borderRadius: "var(--radius-md)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                                }}>
                                    <card.IconComp />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                        <span style={{ fontWeight: 600, color: "white", fontSize: 15 }}>{card.title}</span>
                                        <span style={{ fontSize: 10, fontWeight: 700, color: "white", background: card.badgeColor, padding: "2px 8px", borderRadius: "100px", letterSpacing: "0.02em" }}>{card.badge}</span>
                                    </div>
                                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0 }}>{card.desc}</p>
                                </div>
                                <Link href={card.href} style={{ color: "var(--color-surface)", fontSize: 13, fontWeight: 500, textDecoration: "none", flexShrink: 0, whiteSpace: "nowrap" }}>
                                    {card.btnLabel} →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
