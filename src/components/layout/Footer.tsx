"use client";
import Link from "next/link";
import { useT } from "@/contexts/LanguageContext";

export default function Footer() {
    const { t } = useT();
    const f = t.footer;

    return (
        <footer>
            {/* CTA Banner */}
            <div style={{
                background: "linear-gradient(135deg, var(--color-primary), #0a2a45)",
                padding: "48px 0",
            }}>
                <div className="container" style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 24,
                    flexWrap: "wrap",
                }}>
                    <div>
                        <h3 style={{ color: "white", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{f.ctaTitle}</h3>
                        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15 }}>{f.ctaDesc}</p>
                    </div>
                    <Link href="/auth/register?role=seller" style={{
                        background: "var(--color-accent)",
                        color: "white",
                        fontWeight: 700,
                        fontSize: 15,
                        textDecoration: "none",
                        padding: "12px 28px",
                        borderRadius: 10,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                    }}>{f.ctaBtn}</Link>
                </div>
            </div>

            {/* Links */}
            <div style={{
                background: "#0a1929",
                padding: "52px 0 32px",
            }}>
                <div className="container" style={{
                    display: "grid",
                    gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
                    gap: 40,
                    marginBottom: 40,
                }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                            <div style={{
                                width: 36, height: 36,
                                background: "linear-gradient(135deg, #0e7bc4, #5eb8ff)",
                                borderRadius: 8,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 18,
                            }}>🧵</div>
                            <div>
                                <div style={{ fontWeight: 900, fontSize: 12, color: "white", letterSpacing: "0.07em", textTransform: "uppercase", lineHeight: 1.1 }}>
                                    UZ Light Industry
                                </div>
                                <div style={{ fontSize: 8.5, color: "#5eb8ff", letterSpacing: "0.13em", textTransform: "uppercase", fontWeight: 600 }}>
                                    Catalog B2B
                                </div>
                            </div>
                        </div>
                        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>
                            {f.description}
                        </p>
                        <div style={{ display: "flex", gap: 8 }}>
                            {["T", "L", "I"].map(icon => (
                                <div key={icon} style={{
                                    width: 32, height: 32, borderRadius: 8,
                                    background: "rgba(255,255,255,0.08)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 700, cursor: "pointer",
                                }}>{icon}</div>
                            ))}
                        </div>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 style={{ color: "white", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
                            {f.platform}
                        </h4>
                        {f.links.platform.map((link: string) => (
                            <a key={link} href="#" style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none", marginBottom: 10, transition: "color 0.15s" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                            >{link}</a>
                        ))}
                    </div>

                    {/* Catalog */}
                    <div>
                        <h4 style={{ color: "white", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
                            {f.catalog}
                        </h4>
                        {f.links.catalog.map((link: string) => (
                            <a key={link} href="#" style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none", marginBottom: 10, transition: "color 0.15s" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                            >{link}</a>
                        ))}
                    </div>

                    {/* For Sellers */}
                    <div>
                        <h4 style={{ color: "white", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
                            {f.forSellers}
                        </h4>
                        {f.links.sellers.map((link: string) => (
                            <a key={link} href="#" style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none", marginBottom: 10, transition: "color 0.15s" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                            >{link}</a>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className="container" style={{
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    paddingTop: 20,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 12,
                }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
                        © 2026 UZ Light Industry. {f.rights}
                    </span>
                    <div style={{ display: "flex", gap: 20 }}>
                        {[f.terms, f.privacy, f.contacts].map(item => (
                            <a key={item} href="#" style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, textDecoration: "none" }}>{item}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
