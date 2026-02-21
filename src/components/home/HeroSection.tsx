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
            background: "linear-gradient(135deg, var(--color-primary) 0%, #1e4976 50%, #0e3a5f 100%)",
            padding: "80px 0 64px",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Background decoration */}
            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(14,123,196,0.25) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(14,123,196,0.15) 0%, transparent 50%)
        `,
                pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", top: -80, right: -80,
                width: 400, height: 400,
                background: "rgba(14,123,196,0.06)",
                borderRadius: "50%",
            }} />

            <div className="container" style={{ position: "relative" }}>
                {/* Badge */}
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "rgba(94,184,255,0.1)", border: "1px solid rgba(94,184,255,0.3)",
                    borderRadius: 30, padding: "6px 16px", marginBottom: 24,
                }}>
                    <div style={{ filter: "drop-shadow(0 0 4px rgba(94,184,255,0.8))" }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="6" stroke="#5eb8ff" strokeWidth="1.5" fill="none" />
                            <path d="M4 7 C4 7 6 5 7 7 C8 9 10 7 10 7" stroke="#5eb8ff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        </svg>
                    </div>
                    <span style={{ color: "#7bcfff", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" }}>
                        {h.badge}
                    </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
                    {/* Left */}
                    <div>
                        <h1 style={{ fontSize: 52, fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.03em" }}>
                            {h.title1}{" "}
                            <span style={{ background: "linear-gradient(90deg, #5eb8ff, #0e7bc4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                {h.title2}
                            </span>
                        </h1>

                        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
                            {h.subtitle}
                        </p>

                        {/* Search */}
                        <div style={{
                            display: "flex", gap: 0, maxWidth: 520,
                            background: "white", borderRadius: 16, overflow: "hidden",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.25)", marginBottom: 24,
                        }}>
                            <input
                                type="text"
                                placeholder={h.searchPlaceholder}
                                style={{ flex: 1, border: "none", outline: "none", padding: "16px 20px", fontSize: 15, color: "var(--color-text)" }}
                            />
                            <button style={{
                                background: "var(--color-accent)", color: "white", border: "none",
                                padding: "16px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer",
                            }}>
                                {h.searchBtn}
                            </button>
                        </div>

                        {/* Popular tags */}
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{h.popular}</span>
                            {(h.popularTags as readonly string[]).map(tag => (
                                <Link key={tag} href={`/products?q=${tag}`} style={{
                                    fontSize: 12, color: "rgba(255,255,255,0.75)",
                                    background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
                                    borderRadius: 20, padding: "4px 12px", textDecoration: "none",
                                }}>{tag}</Link>
                            ))}
                        </div>
                    </div>

                    {/* Right: CTA Cards */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {flows.map(card => (
                            <div key={card.badge} style={{
                                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(94,184,255,0.12)",
                                borderRadius: 14, padding: "18px 20px",
                                display: "flex", alignItems: "center", gap: 16,
                                backdropFilter: "blur(10px)",
                            }}>
                                <div style={{
                                    width: 52, height: 52, background: "#070f1a", borderRadius: 12,
                                    border: "1px solid rgba(94,184,255,0.1)",
                                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                                }}>
                                    <card.IconComp />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                        <span style={{ fontWeight: 700, color: "white", fontSize: 15 }}>{card.title}</span>
                                        <span style={{ fontSize: 10, fontWeight: 700, color: "white", background: card.badgeColor, padding: "2px 8px", borderRadius: 10 }}>{card.badge}</span>
                                    </div>
                                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", margin: 0 }}>{card.desc}</p>
                                </div>
                                <Link href={card.href} style={{ color: "#7bcfff", fontSize: 13, fontWeight: 600, textDecoration: "none", flexShrink: 0, whiteSpace: "nowrap" }}>
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
