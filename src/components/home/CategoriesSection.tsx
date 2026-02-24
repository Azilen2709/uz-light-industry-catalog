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
import { PRODUCTS } from "@/lib/data";

const baseCategories = [
    { Icon: NeonClothingIcon, color: "blue" as const, slug: "apparel-men" },
    { Icon: NeonDressIcon, color: "pink" as const, slug: "apparel-women" },
    { Icon: NeonShoeIcon, color: "orange" as const, slug: "shoes-casual" },
    { Icon: NeonBedIcon, color: "cyan" as const, slug: "home-textile" },
    { Icon: NeonKnitwearIcon, color: "purple" as const, slug: "knitwear" },
    { Icon: NeonAccessoriesIcon, color: "gold" as const, slug: "silk-accessories" },
    { Icon: NeonCarpetIcon, color: "green" as const, slug: "home-carpets" },
    { Icon: NeonWorkwearIcon, color: "blue" as const, slug: "workwear" },
];

export default function CategoriesSection() {
    const { t, lang } = useT();

    const labels: Record<string, { ru: string; en: string }> = {
        "apparel-men": { ru: "Мужская одежда", en: "Men's Apparel" },
        "apparel-women": { ru: "Женская одежда", en: "Women's Apparel" },
        "shoes-casual": { ru: "Обувь", en: "Footwear" },
        "home-textile": { ru: "Домашний текстиль", en: "Home Textile" },
        knitwear: { ru: "Трикотаж", en: "Knitwear" },
        "silk-accessories": { ru: "Аксессуары", en: "Accessories" },
        "home-carpets": { ru: "Ковры", en: "Carpets" },
        workwear: { ru: "Форменная одежда", en: "Workwear" },
    };

    const productWord = lang === "ru" ? "товаров" : "products";

    return (
        <section className="section" style={{ background: "var(--color-bg)" }}>
            <style>{`
        .category-card {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          padding: 20px 18px;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          box-shadow: var(--shadow-sm);
        }
        .category-card:hover {
          border-color: var(--color-accent);
          transform: translateY(-4px);
          box-shadow: var(--shadow-card-hover);
        }
        .category-label {
          font-weight: 700;
          font-size: 15px;
          color: var(--color-text);
          margin-bottom: 2px;
          transition: color 0.2s;
        }
        .category-card:hover .category-label { color: var(--color-accent); }
        .category-count { font-size: 13px; color: var(--color-muted); font-weight: 500; }
        .category-icon-box {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl); /* Circular */
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .category-card:hover .category-icon-box {
          background: rgba(59, 130, 246, 0.08); /* Tailwind blue-500 equivalent */
          border-color: rgba(59, 130, 246, 0.2);
          transform: scale(1.05);
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
                            fontSize: 12, fontWeight: 700,
                            textTransform: "uppercase", letterSpacing: "0.06em",
                            color: "var(--color-accent)", marginBottom: 8,
                        }}>
                            {lang === "ru" ? "Каталог по категориям" : "Browse by Category"}
                        </p>
                        <h2 style={{ fontSize: 32, color: "var(--color-text)", margin: 0, fontWeight: 800, letterSpacing: "-0.02em" }}>
                            {lang === "ru" ? "Что вы ищете?" : "What are you looking for?"}
                        </h2>
                    </div>
                    <Link href="/products" style={{ color: "var(--color-accent)", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                        {lang === "ru" ? "Все категории →" : "All Categories →"}
                    </Link>
                </div>

                {/* Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                    {baseCategories.map(cat => {
                        const count = PRODUCTS.filter(p => p.categorySlug === cat.slug).length;
                        return (
                            <Link key={cat.slug} href={`/products?category=${cat.slug}`} className="category-card">
                                <div className="category-icon-box" style={{
                                    width: 56, height: 56, borderRadius: "var(--radius-md)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    flexShrink: 0, transition: "all 0.2s",
                                }}>
                                    <cat.Icon size={32} color={cat.color} />
                                </div>
                                <div>
                                    <div className="category-label">{labels[cat.slug][lang]}</div>
                                    <div className="category-count">{count.toLocaleString()} {productWord}</div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
