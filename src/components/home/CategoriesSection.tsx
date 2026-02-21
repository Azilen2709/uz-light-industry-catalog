"use client";
import Link from "next/link";
import { useT } from "@/contexts/LanguageContext";
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

const baseCategories = [
    { Icon: NeonClothingIcon, color: "blue" as const, slug: "outerwear", count: 1240 },
    { Icon: NeonDressIcon, color: "pink" as const, slug: "dresses", count: 890 },
    { Icon: NeonShoeIcon, color: "orange" as const, slug: "footwear", count: 560 },
    { Icon: NeonBedIcon, color: "cyan" as const, slug: "home-textile", count: 2100 },
    { Icon: NeonKnitwearIcon, color: "purple" as const, slug: "knitwear", count: 1480 },
    { Icon: NeonAccessoriesIcon, color: "gold" as const, slug: "accessories", count: 720 },
    { Icon: NeonCarpetIcon, color: "green" as const, slug: "carpets", count: 380 },
    { Icon: NeonWorkwearIcon, color: "blue" as const, slug: "workwear", count: 310 },
];

export default function CategoriesSection() {
    const { t, lang } = useT();

    const labels: Record<string, { ru: string; en: string }> = {
        outerwear: { ru: "Верхняя одежда", en: "Outerwear" },
        dresses: { ru: "Платья и юбки", en: "Dresses & Skirts" },
        footwear: { ru: "Обувь", en: "Footwear" },
        "home-textile": { ru: "Домашний текстиль", en: "Home Textile" },
        knitwear: { ru: "Трикотаж", en: "Knitwear" },
        accessories: { ru: "Аксессуары", en: "Accessories" },
        carpets: { ru: "Ковры", en: "Carpets" },
        workwear: { ru: "Форменная одежда", en: "Workwear" },
    };

    const productWord = lang === "ru" ? "товаров" : "products";

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
        .category-card:hover .category-label { color: #5eb8ff; }
        .category-count { font-size: 12px; color: rgba(255,255,255,0.35); }
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
                            fontSize: 11, fontWeight: 700,
                            textTransform: "uppercase", letterSpacing: "0.12em",
                            color: "#5eb8ff", marginBottom: 8,
                            textShadow: "0 0 8px rgba(94,184,255,0.5)",
                        }}>
                            {lang === "ru" ? "Каталог по категориям" : "Browse by Category"}
                        </p>
                        <h2 style={{ fontSize: 32, color: "var(--color-text)", margin: 0 }}>
                            {lang === "ru" ? "Что вы ищете?" : "What are you looking for?"}
                        </h2>
                    </div>
                    <Link href="/products" style={{ color: "#5eb8ff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                        {lang === "ru" ? "Все категории →" : "All Categories →"}
                    </Link>
                </div>

                {/* Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                    {baseCategories.map(cat => (
                        <Link key={cat.slug} href={`/products?category=${cat.slug}`} className="category-card">
                            <div style={{
                                width: 52, height: 52, borderRadius: 12,
                                background: "#070f1a",
                                border: "1px solid rgba(94,184,255,0.12)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <cat.Icon size={32} color={cat.color} />
                            </div>
                            <div>
                                <div className="category-label">{labels[cat.slug][lang]}</div>
                                <div className="category-count">{cat.count.toLocaleString()} {productWord}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
