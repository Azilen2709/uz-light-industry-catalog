"use client";
import Link from "next/link";
import { useT } from "@/contexts/LanguageContext";

export default function RfqPage() {
    const { t, lang } = useT();
    const L = t.rfq;

    const howItWorks = [
        { icon: "📝", text: L.step1Info },
        { icon: "🏭", text: L.step2Info },
        { icon: "📊", text: L.step3Info },
        { icon: "🚀", text: L.step4Info },
    ];

    return (
        <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
            {/* Hero */}
            <div style={{
                background: "linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)",
                padding: "48px 0 40px",
            }}>
                <div className="container">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                                <span style={{ fontSize: 32 }}>📐</span>
                                <h1 style={{ color: "white", fontSize: 30, fontWeight: 900 }}>{L.title}</h1>
                            </div>
                            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, maxWidth: 480 }}>
                                {L.subtitle}
                            </p>
                        </div>
                        <Link
                            href="/rfq/new"
                            className="btn btn-lg"
                            style={{ background: "white", color: "#6d28d9", fontWeight: 800, flexShrink: 0 }}
                        >
                            📐 {L.newRfq}
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: "40px 24px", display: "grid", gridTemplateColumns: "1fr 300px", gap: 32, alignItems: "flex-start" }}>
                {/* Empty state */}
                <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 20, padding: "80px 32px", textAlign: "center" }}>
                    <div style={{ fontSize: 64, marginBottom: 16 }}>📋</div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>{L.noRfqs}</h2>
                    <p style={{ color: "var(--color-muted)", fontSize: 15, maxWidth: 380, margin: "0 auto 28px" }}>
                        {L.noRfqsDesc}
                    </p>
                    <Link href="/rfq/new" className="btn btn-primary btn-lg">
                        📐 {L.createFirst}
                    </Link>
                </div>

                {/* How it works sidebar */}
                <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 20, color: "var(--color-text)" }}>
                        ✨ {L.howItWorksTitle}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {howItWorks.map((step, i) => (
                            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                                    background: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
                                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                                }}>
                                    {step.icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: "#6d28d9", marginBottom: 2 }}>
                                        {lang === "ru" ? `Шаг ${i + 1}` : `Step ${i + 1}`}
                                    </div>
                                    <div style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                                        {step.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        marginTop: 20, background: "#f5f3ff", borderRadius: 10,
                        padding: "10px 14px", fontSize: 12, color: "#6d28d9", fontWeight: 600,
                        textAlign: "center",
                    }}>
                        🎉 {L.freeNote}
                    </div>
                </div>
            </div>
        </div>
    );
}
