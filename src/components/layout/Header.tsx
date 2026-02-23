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
            boxShadow: "var(--shadow-header)",
        }}>
            <style>{`
        .header-nav-link {
          color: rgba(255,255,255,0.8);
          font-weight: 500;
          font-size: 14px;
          text-decoration: none;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
        }
        .header-nav-link:hover { color: white; background: rgba(255,255,255,0.1); }
        .lang-btn {
          padding: 4px 8px;
          border-radius: var(--radius-xl);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.2);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          letter-spacing: 0.02em;
        }
        .lang-btn.active {
          background: rgba(255,255,255,0.2);
          color: white;
          border-color: rgba(255,255,255,0.4);
        }
        .lang-btn.inactive {
          background: transparent;
          color: rgba(255,255,255,0.6);
        }
        .lang-btn.inactive:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }
      `}</style>

            <div className="container" style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                height: 72, /* Slightly taller header for more air */
            }}>
                {/* Logo */}
                <Link href="/" style={{ textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                        width: 38, height: 38,
                        background: "linear-gradient(135deg, var(--color-accent), #60a5fa)",
                        borderRadius: "var(--radius-xl)", /* Pill shape for logo mark */
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 18, flexShrink: 0,
                        boxShadow: "0 2px 10px rgba(59, 130, 246, 0.4)",
                    }}>🧵</div>
                    <div>
                        <div style={{ fontWeight: 800, fontSize: 13, color: "white", letterSpacing: "0.05em", textTransform: "uppercase", lineHeight: 1.1 }}>
                            UZ Light Industry
                        </div>
                        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
                            Catalog B2B
                        </div>
                    </div>
                </Link>

                {/* Search */}
                <div style={{ flex: 1, maxWidth: 540, position: "relative" }}>
                    <input
                        type="text"
                        placeholder={n.searchPlaceholder}
                        id="header-search"
                        style={{
                            width: "100%",
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "var(--radius-xl)", /* Pill shaped search */
                            padding: "10px 16px 10px 42px",
                            fontSize: 14,
                            color: "white",
                            outline: "none",
                            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.1)";
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    />
                    <span style={{
                        position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                        fontSize: 15, opacity: 0.5, pointerEvents: "none",
                    }}>🔍</span>
                </div>

                {/* Nav */}
                <nav style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                    <Link href="/products" className="header-nav-link">{n.catalog}</Link>
                    <Link href="/companies" className="header-nav-link">{n.factories}</Link>
                    <Link href="/rfq" className="header-nav-link">{n.rfq}</Link>
                </nav>

                {/* Language Switcher */}
                <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0, paddingLeft: 12, borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
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
                <div style={{ display: "flex", gap: 8, flexShrink: 0, marginLeft: 12 }}>
                    <Link href="/auth/login" className="btn" style={{
                        color: "white",
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.2)"
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                        }}
                    >{n.login}</Link>

                    <Link href="/auth/register" className="btn btn-primary"
                    >{n.register}</Link>
                </div>
            </div>
        </header>
    );
}
