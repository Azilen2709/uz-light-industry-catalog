"use client";
import Link from "next/link";
import {
    NeonClothingIcon,
    NeonDressIcon,
    NeonShoeIcon,
    NeonBedIcon,
    NeonKnitwearIcon,
    NeonAccessoriesIcon,
    NeonCarpetIcon,
    NeonWorkwearIcon,
} from "@/components/icons/NeonIcons";

const categories = [
    { Icon: NeonClothingIcon, color: "blue" as const, label: "Верхняя одежда", count: 1240, href: "/products?category=outerwear" },
    { Icon: NeonDressIcon, color: "pink" as const, label: "Платья и юбки", count: 890, href: "/products?category=dresses" },
    { Icon: NeonShoeIcon, color: "orange" as const, label: "Обувь", count: 560, href: "/products?category=footwear" },
    { Icon: NeonBedIcon, color: "cyan" as const, label: "Домашний текстиль", count: 2100, href: "/products?category=home-textile" },
    { Icon: NeonKnitwearIcon, color: "purple" as const, label: "Трикотаж", count: 1480, href: "/products?category=knitwear" },
    { Icon: NeonAccessoriesIcon, color: "gold" as const, label: "Аксессуары", count: 720, href: "/products?category=accessories" },
    { Icon: NeonCarpetIcon, color: "green" as const, label: "Ковры", count: 380, href: "/products?category=carpets" },
    { Icon: NeonWorkwearIcon, color: "blue" as const, label: "Форменная одежда", count: 310, href: "/products?category=workwear" },
];

export default function CategoriesSection() {
    return (
        <section className="section" style={{ background: "var(--color-bg)" }}>
            <style>{`
        .category-card {
          background: #0e1e30;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(94,184,255,0.15);
          padding: 20px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          transition: all 0.25s;
          text-decoration: none;
        }
        .category-card:hover {
          border-color: rgba(94,184,255,0.5);
          background: #122033;
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(0,0,0,0.3), 0 0 20px rgba(94,184,255,0.08);
        }
        .category-label {
          font-weight: 600;
          font-size: 14px;
          color: rgba(255,255,255,0.9);
          margin-bottom: 2px;
          transition: color 0.2s;
        }
        .category-card:hover .category-label {
          color: #5eb8ff;
        }
        .category-count {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
        }
      `}</style>
            <div className="container">
                {/* Header */}
                <div style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    marginBottom: 36,
                }}>
                    <div>
                        <p style={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                            color: "#5eb8ff",
                            marginBottom: 8,
                            textShadow: "0 0 8px rgba(94,184,255,0.5)",
                        }}>Каталог по категориям</p>
                        <h2 style={{ fontSize: 32, color: "var(--color-text)", margin: 0 }}>
                            Что вы ищете?
                        </h2>
                    </div>
                    <Link href="/products" style={{
                        color: "#5eb8ff",
                        fontSize: 14,
                        fontWeight: 600,
                        textDecoration: "none",
                    }}>
                        Все категории →
                    </Link>
                </div>

                {/* Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 14,
                }}>
                    {categories.map(cat => (
                        <Link key={cat.label} href={cat.href} className="category-card">
                            <div style={{
                                width: 52,
                                height: 52,
                                borderRadius: 12,
                                background: "#070f1a",
                                border: "1px solid rgba(94,184,255,0.12)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <cat.Icon size={32} color={cat.color} />
                            </div>
                            <div>
                                <div className="category-label">{cat.label}</div>
                                <div className="category-count">{cat.count.toLocaleString()} товаров</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
