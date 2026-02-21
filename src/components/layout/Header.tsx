"use client";
import Link from "next/link";
import { useState } from "react";
import { NeonSearchIcon } from "@/components/icons/NeonIcons";

// Neon logo SVG — thread/fabric icon
function NeonLogoIcon({ size = 36 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" style={{
            filter: `
        drop-shadow(0 0 4px rgba(94,184,255,0.9))
        drop-shadow(0 0 12px rgba(94,184,255,0.6))
        drop-shadow(0 0 24px rgba(94,184,255,0.3))
      `,
        }}>
            {/* Textile/bolt of fabric */}
            <path d="M6 10 C6 10 16 8 24 12 C32 16 30 26 30 26" stroke="#5eb8ff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M6 18 C6 18 14 16 22 20 C30 24 30 26 30 26" stroke="#5eb8ff" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
            <circle cx="6" cy="10" r="2" stroke="#5eb8ff" strokeWidth="2" fill="none" />
            <circle cx="30" cy="26" r="2" stroke="#00e5ff" strokeWidth="2" fill="none" style={{
                filter: "drop-shadow(0 0 4px rgba(0,229,255,0.9))",
            }} />
        </svg>
    );
}

export default function Header() {
    const [lang, setLang] = useState<"RU" | "EN">("RU");

    return (
        <>
            <style>{`
        .nav-link {
          color: rgba(255,255,255,0.75);
          font-size: 13px;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
          letter-spacing: 0.02em;
        }
        .nav-link:hover {
          background: rgba(94,184,255,0.12);
          color: #5eb8ff;
          text-shadow: 0 0 8px rgba(94,184,255,0.6);
        }
        .header-login {
          color: rgba(255,255,255,0.8);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          padding: 7px 14px;
          border-radius: 8px;
          border: 1px solid rgba(94,184,255,0.35);
          transition: all 0.2s;
        }
        .header-login:hover {
          border-color: rgba(94,184,255,0.7);
          color: #5eb8ff;
          box-shadow: 0 0 12px rgba(94,184,255,0.2);
        }
        .header-search-btn:hover {
          background: #0b6aa8 !important;
          box-shadow: 0 0 16px rgba(14,123,196,0.5);
        }
        .brand-name {
          font-weight: 900;
          font-size: 13px;
          color: white;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          line-height: 1.1;
        }
        .brand-sub {
          font-size: 9px;
          color: rgba(94,184,255,0.8);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
          text-shadow: 0 0 6px rgba(94,184,255,0.5);
        }
      `}</style>
            <header style={{
                background: "linear-gradient(180deg, #0a1f35 0%, var(--color-primary) 100%)",
                boxShadow: "0 2px 20px rgba(0,0,0,0.3), 0 1px 0 rgba(94,184,255,0.1)",
                position: "sticky",
                top: 0,
                zIndex: 100,
            }}>
                <div className="container" style={{
                    display: "flex",
                    alignItems: "center",
                    height: 68,
                    gap: 20,
                }}>
                    {/* Logo + Brand Name */}
                    <Link href="/" style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        textDecoration: "none",
                        flexShrink: 0,
                    }}>
                        <NeonLogoIcon size={36} />
                        <div>
                            <div className="brand-name">UZ Light Industry</div>
                            <div className="brand-sub">Catalog B2B</div>
                        </div>
                    </Link>

                    {/* Search Bar */}
                    <div style={{
                        flex: 1,
                        maxWidth: 520,
                        display: "flex",
                        alignItems: "center",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(94,184,255,0.2)",
                        borderRadius: 10,
                        overflow: "hidden",
                        transition: "border-color 0.2s",
                    }}>
                        <span style={{ padding: "0 10px", display: "flex", alignItems: "center" }}>
                            <NeonSearchIcon size={16} color="blue" />
                        </span>
                        <input
                            type="text"
                            placeholder={lang === "RU" ? "Поиск товаров, фабрик, категорий..." : "Search products, factories, categories..."}
                            style={{
                                flex: 1,
                                background: "transparent",
                                border: "none",
                                outline: "none",
                                color: "white",
                                fontSize: 13,
                                padding: "10px 0",
                            }}
                        />
                        <button className="header-search-btn" style={{
                            background: "var(--color-accent)",
                            border: "none",
                            color: "white",
                            padding: "10px 16px",
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            transition: "all 0.2s",
                            letterSpacing: "0.04em",
                        }}>
                            {lang === "RU" ? "НАЙТИ" : "SEARCH"}
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
                        {[
                            { label: lang === "RU" ? "Каталог" : "Catalog", href: "/products" },
                            { label: lang === "RU" ? "Фабрики" : "Factories", href: "/companies" },
                            { label: "RFQ", href: "/rfq" },
                        ].map(item => (
                            <Link key={item.href} href={item.href} className="nav-link">
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto", flexShrink: 0 }}>
                        {/* Lang switcher */}
                        <div style={{
                            display: "flex",
                            background: "rgba(0,0,0,0.2)",
                            borderRadius: 8,
                            overflow: "hidden",
                            border: "1px solid rgba(94,184,255,0.2)",
                        }}>
                            {(["RU", "EN"] as const).map(l => (
                                <button
                                    key={l}
                                    onClick={() => setLang(l)}
                                    style={{
                                        padding: "5px 10px",
                                        fontSize: 11,
                                        fontWeight: 800,
                                        border: "none",
                                        cursor: "pointer",
                                        background: lang === l ? "var(--color-accent)" : "transparent",
                                        color: lang === l ? "white" : "rgba(255,255,255,0.5)",
                                        transition: "all 0.15s",
                                        letterSpacing: "0.04em",
                                        boxShadow: lang === l ? "0 0 10px rgba(14,123,196,0.5)" : "none",
                                    }}
                                >{l}</button>
                            ))}
                        </div>

                        <Link href="/auth/login" className="header-login">
                            {lang === "RU" ? "Войти" : "Login"}
                        </Link>
                        <Link href="/auth/register" className="btn btn-primary" style={{ fontSize: 12, padding: "7px 14px", letterSpacing: "0.04em" }}>
                            {lang === "RU" ? "Регистрация" : "Register"}
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}
