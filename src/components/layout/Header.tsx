"use client";
import Link from "next/link";
import { useT } from "@/contexts/LanguageContext";

export default function Header() {
    const { t, lang, setLang } = useT();
    const n = t.nav;

    return (
        <header style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "var(--color-primary)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
        }}>
            <style>{`
        .header-nav-link {
          color: rgba(255,255,255,0.8);
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          padding: 6px 10px;
          border-radius: 6px;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .header-nav-link:hover { color: white; background: rgba(255,255,255,0.08); }
        .lang-btn {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.25);
          transition: all 0.15s;
          letter-spacing: 0.04em;
        }
        .lang-btn.active {
          background: rgba(255,255,255,0.2);
          color: white;
          border-color: rgba(255,255,255,0.5);
        }
        .lang-btn.inactive {
          background: transparent;
          color: rgba(255,255,255,0.55);
        }
        .lang-btn.inactive:hover {
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.85);
        }
      `}</style>

            <div className="container" style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                height: 64,
            }}>
                {/* Logo */}
                <Link href="/" style={{ textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                        width: 34, height: 34,
                        background: "linear-gradient(135deg, #0e7bc4, #5eb8ff)",
                        borderRadius: 8,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 17, flexShrink: 0,
                    }}>🧵</div>
                    <div>
                        <div style={{ fontWeight: 900, fontSize: 12, color: "white", letterSpacing: "0.07em", textTransform: "uppercase", lineHeight: 1.1 }}>
                            UZ Light Industry
                        </div>
                        <div style={{ fontSize: 8.5, color: "rgba(94,184,255,0.85)", letterSpacing: "0.13em", textTransform: "uppercase", fontWeight: 600 }}>
                            Catalog B2B
                        </div>
                    </div>
                </Link>

                {/* Search */}
                <div style={{ flex: 1, maxWidth: 460, position: "relative" }}>
                    <input
                        type="text"
                        placeholder={n.searchPlaceholder}
                        id="header-search"
                        style={{
                            width: "100%",
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            borderRadius: 10,
                            padding: "8px 14px 8px 36px",
                            fontSize: 14,
                            color: "white",
                            outline: "none",
                        }}
                    />
                    <span style={{
                        position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                        fontSize: 15, opacity: 0.6, pointerEvents: "none",
                    }}>🔍</span>
                </div>

                {/* Nav */}
                <nav style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                    <Link href="/products" className="header-nav-link">{n.catalog}</Link>
                    <Link href="/companies" className="header-nav-link">{n.factories}</Link>
                    <Link href="/rfq" className="header-nav-link">{n.rfq}</Link>
                </nav>

                {/* Language Switcher */}
                <div style={{ display: "flex", gap: 4, alignItems: "center", flexShrink: 0 }}>
                    <button
                        onClick={() => setLang("ru")}
                        className={`lang-btn ${lang === "ru" ? "active" : "inactive"}`}
                    >РУС</button>
                    <button
                        onClick={() => setLang("en")}
                        className={`lang-btn ${lang === "en" ? "active" : "inactive"}`}
                    >ENG</button>
                </div>

                {/* Auth */}
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <Link href="/auth/login" style={{
                        color: "rgba(255,255,255,0.85)",
                        fontWeight: 600,
                        fontSize: 14,
                        textDecoration: "none",
                        padding: "7px 14px",
                        borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.2)",
                        transition: "all 0.15s",
                    }}>{n.login}</Link>

                    <Link href="/auth/register" style={{
                        background: "var(--color-accent)",
                        color: "white",
                        fontWeight: 700,
                        fontSize: 14,
                        textDecoration: "none",
                        padding: "7px 16px",
                        borderRadius: 8,
                        transition: "background 0.15s",
                    }}>{n.register}</Link>
                </div>
            </div>
        </header>
    );
}
