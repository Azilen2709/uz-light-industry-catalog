import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const links = {
        platform: [
            { label: "О платформе", href: "/about" },
            { label: "Как это работает", href: "/how-it-works" },
            { label: "Тарифы", href: "/pricing" },
            { label: "FAQ", href: "/faq" },
        ],
        catalog: [
            { label: "Одежда", href: "/products?category=clothing" },
            { label: "Текстиль для дома", href: "/products?category=home-textile" },
            { label: "Обувь", href: "/products?category=footwear" },
            { label: "Ковры", href: "/products?category=carpets" },
        ],
        sellers: [
            { label: "Разместить мини-сайт", href: "/auth/register?role=seller" },
            { label: "Личный кабинет", href: "/dashboard" },
            { label: "Добавить товары", href: "/dashboard/products/new" },
            { label: "Получать RFQ", href: "/rfq" },
        ],
    };

    return (
        <footer style={{
            background: "var(--color-primary)",
            color: "rgba(255,255,255,0.75)",
            marginTop: "auto",
        }}>
            <style>{`
        .footer-link {
          color: rgba(255,255,255,0.65);
          font-size: 14px;
          text-decoration: none;
          transition: color 0.15s;
          display: block;
        }
        .footer-link:hover { color: white; }
        .footer-legal-link {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.15s;
        }
        .footer-legal-link:hover { color: rgba(255,255,255,0.8); }
        .footer-social {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          border-radius: 8px;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.6);
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.15s;
        }
        .footer-social:hover {
          background: rgba(255,255,255,0.18);
          color: white;
        }
        .footer-cta-btn {
          background: white;
          color: var(--color-accent);
          font-weight: 700;
          padding: 12px 28px;
          border-radius: 12px;
          font-size: 15px;
          flex-shrink: 0;
          text-decoration: none;
          display: inline-block;
          transition: all 0.15s;
        }
        .footer-cta-btn:hover {
          background: #f0f8ff;
          transform: translateY(-1px);
        }
      `}</style>

            {/* Top CTA Banner */}
            <div style={{
                background: "linear-gradient(135deg, var(--color-accent) 0%, #1a5fa0 100%)",
                padding: "40px 0",
            }}>
                <div className="container" style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 20,
                }}>
                    <div>
                        <h3 style={{ color: "white", fontSize: 22, marginBottom: 6 }}>
                            🏭 Вы производитель?
                        </h3>
                        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15 }}>
                            Создайте мини-сайт фабрики бесплатно и получайте B2B-заказы из СНГ и Европы
                        </p>
                    </div>
                    <Link href="/auth/register?role=seller" className="footer-cta-btn">
                        Добавить фабрику →
                    </Link>
                </div>
            </div>

            {/* Main Footer */}
            <div className="container" style={{ padding: "48px 24px 32px" }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr",
                    gap: 40,
                    marginBottom: 40,
                }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                            <div style={{
                                width: 36, height: 36,
                                background: "linear-gradient(135deg, #0e7bc4, #5eb8ff)",
                                borderRadius: 8,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 18,
                            }}>🧵</div>
                            <div>
                                <div style={{ fontWeight: 900, fontSize: 13, color: "white", letterSpacing: "0.06em", textTransform: "uppercase" }}>UZ Light Industry</div>
                                <div style={{ fontSize: 9, color: "rgba(94,184,255,0.8)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Catalog B2B</div>
                            </div>
                        </div>
                        <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
                            Единая B2B-платформа для лёгкой промышленности Узбекистана. Производители и покупатели со всего мира в одном месте.
                        </p>
                        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                            {["T", "L", "I"].map((s, i) => (
                                <a key={i} href="#" className="footer-social">{s}</a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {[
                        { title: "Платформа", items: links.platform },
                        { title: "Каталог", items: links.catalog },
                        { title: "Для продавцов", items: links.sellers },
                    ].map(group => (
                        <div key={group.title}>
                            <h4 style={{ color: "white", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>
                                {group.title}
                            </h4>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                                {group.items.map(link => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="footer-link">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    paddingTop: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                }}>
                    <p style={{ fontSize: 13, margin: 0 }}>© {currentYear} TextileHub. Все права защищены.</p>
                    <div style={{ display: "flex", gap: 20 }}>
                        {["Условия использования", "Политика конфиденциальности", "Контакты"].map(t => (
                            <a key={t} href="#" className="footer-legal-link">{t}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
