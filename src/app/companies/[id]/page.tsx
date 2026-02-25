"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useT } from "@/contexts/LanguageContext";
import { ProductType, getRegionLabel } from "@/lib/data";
import { Company, Product } from "@prisma/client";

// ─── Static Config ────────────────────────────────────────────────────────

const flowColors: Record<ProductType, { bg: string; text: string; label: { ru: string; en: string } }> = {
    instock: { bg: "#dcfce7", text: "#15803d", label: { ru: "Со склада", en: "In-Stock" } },
    whitelabel: { bg: "#dbeafe", text: "#1d4ed8", label: { ru: "White Label", en: "White Label" } },
    rfq: { bg: "#ede9fe", text: "#6d28d9", label: { ru: "RFQ", en: "RFQ" } },
};

const certConfig: Record<string, { icon: string; color: string }> = {
    "OEKO-TEX Standard 100": { icon: "🌿", color: "#16a34a" },
    "ISO 9001": { icon: "🏅", color: "#2563eb" },
    "ISO 14001": { icon: "♻️", color: "#15803d" },
    "GOTS": { icon: "🌱", color: "#15803d" },
    "UNESCO Heritage Craft": { icon: "🏛️", color: "#854d0e" },
    "Handmade Certificate": { icon: "🤲", color: "#7c3aed" },
};

// Mock production capacities (would come from DB in real app)
const productionCapacity: Record<number, { ru: string; en: string }[]> = {
    1: [
        { ru: "50 000 единиц / месяц", en: "50,000 units / month" },
        { ru: "14 вязальных линий Shima Seiki", en: "14 Shima Seiki knitting lines" },
        { ru: "2 смены (16 ч / сутки)", en: "2 shifts (16 h / day)" },
        { ru: "Собственный красильный цех", en: "In-house dyeing shop" },
        { ru: "Лаборатория контроля качества", en: "Quality control laboratory" },
    ],
    2: [
        { ru: "80 000 комплектов / месяц", en: "80,000 sets / month" },
        { ru: "6 специализированных линий", en: "6 specialized lines" },
        { ru: "3 смены (24 ч / сутки)", en: "3 shifts (24 h / day)" },
        { ru: "Собственная сырьевая база", en: "Own raw material base" },
    ],
    3: [
        { ru: "5 000 единиц / месяц", en: "5,000 units / month" },
        { ru: "Итальянское оборудование Rimoldi", en: "Italian Rimoldi equipment" },
        { ru: "1 смена + сверхурочно", en: "1 shift + overtime" },
    ],
    6: [
        { ru: "300–500 ковров / месяц (ручного)", en: "300–500 handmade carpets / month" },
        { ru: "40+ мастеров-ткачей", en: "40+ master weavers" },
        { ru: "Натуральный краситель собственного производства", en: "In-house natural dyes" },
        { ru: "Индивидуальный заказ от 1 шт", en: "Custom orders from 1 piece" },
    ],
};

// Mock reviews
const mockReviews: Record<number, { author: string; country: string; rating: number; date: string; text: { ru: string; en: string } }[]> = {
    1: [
        { author: "Михаил К.", country: "🇷🇺", rating: 5, date: "2024-11", text: { ru: "Качество выше ожиданий. Первая поставка 500 шт прошла без брака. Уже размещаем второй заказ.", en: "Quality exceeded expectations. First delivery of 500 pcs with zero defects. Already placing a second order." } },
        { author: "Tomasz W.", country: "🇵🇱", rating: 5, date: "2024-10", text: { ru: "Работаем 2 года. Всегда в срок, всегда на уровне. Рекомендую всем байерам из Европы.", en: "Working together for 2 years. Always on time, always top quality. I recommend to all European buyers." } },
        { author: "Азиза Р.", country: "🇰🇿", rating: 4, date: "2024-09", text: { ru: "Немного задержали отгрузку, но предупредили заранее. По качеству претензий нет.", en: "Slight shipping delay but notified in advance. No quality complaints at all." } },
    ],
    2: [
        { author: "Ahmed A.", country: "🇦🇪", rating: 5, date: "2024-12", text: { ru: "Отличный партнёр для экспорта. Быстрая обработка документов, стабильное качество.", en: "Excellent export partner. Fast document processing, stable quality." } },
        { author: "Дмитрий С.", country: "🇷🇺", rating: 5, date: "2024-11", text: { ru: "Сатиновое бельё от них продаётся на ура. МЗК 20 комплектов — очень удобно для среднего опта.", en: "Their sateen bedding sells like hotcakes. MOQ 20 sets — very convenient for mid-volume wholesale." } },
    ],
    6: [
        { author: "Marie D.", country: "🇫🇷", rating: 5, date: "2024-12", text: { ru: "Заказывали ковёр по нашему эскизу 3×4 м. Потрясающее исполнение, строго по срокам.", en: "We ordered a custom 3×4m carpet based on our sketch. Stunning craftmanship, strictly on schedule." } },
        { author: "Klaus M.", country: "🇩🇪", rating: 5, date: "2024-10", text: { ru: "Уже третий заказ. Это настоящее искусство. Наши клиенты в восторге.", en: "This is our third order. True art. Our customers are thrilled." } },
    ],
};

function StarDisplay({ rating, size = 16 }: { rating: number; size?: number }) {
    return (
        <span style={{ color: "#f59e0b", fontSize: size }}>
            {"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}
        </span>
    );
}

// ─── Component ────────────────────────────────────────────────────────────

export default function CompanyPage() {
    const params = useParams();
    const { t, lang } = useT();
    const [activeTab, setActiveTab] = useState<ProductType | "all">("all");
    const [company, setCompany] = useState<(Company & { products: Product[] }) | null>(null);
    const [loading, setLoading] = useState(true);

    const companyId = parseInt(params.id as string, 10);

    useEffect(() => {
        if (!companyId) return;
        setLoading(true);
        fetch(`/api/companies/${companyId}`)
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setCompany(data);
                    // Track view (fire and forget)
                    fetch(`/api/companies/${companyId}/view`, { method: "POST" }).catch(() => { });
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch company error:", err);
                setLoading(false);
            });
    }, [companyId]);


    const L = {
        ru: {
            home: "Главная", factories: "Фабрики",
            verified: "Проверена", founded: "Основана", employees: "Сотрудников",
            moq: "МЗК от", leadTime: "Срок", rating: "рейтинг", reviews: "отзывов",
            ordersCompleted: "Выполнено заказов", repeatClients: "Повторных клиентов",
            onTime: "В срок", response: "Ответ за", hours: "ч.",
            about: "О фабрике", specialization: "Специализация",
            flows: "Форматы работы", certs: "Сертификаты", export: "Экспорт в",
            products: "Товары фабрики", contacts: "Контакты",
            sendRFQ: "Разместить RFQ", writeMsg: "Написать сообщение",
            notFound: "Фабрика не найдена",
            production: "Производственные мощности",
            reviewsTitle: "Отзывы покупателей",
            all: "Все", noProducts: "Нет товаров в этой категории",
            trustTitle: "Доверие и качество",
            certNote: "Все сертификаты доступны по запросу",
        },
        en: {
            home: "Home", factories: "Factories",
            verified: "Verified", founded: "Founded", employees: "Employees",
            moq: "MOQ from", leadTime: "Lead Time", rating: "rating", reviews: "reviews",
            ordersCompleted: "Orders Completed", repeatClients: "Repeat Clients",
            onTime: "On Time", response: "Avg Response", hours: "h.",
            about: "About Factory", specialization: "Specialization",
            flows: "Cooperation Types", certs: "Certifications", export: "Exports to",
            products: "Factory Products", contacts: "Contacts",
            sendRFQ: "Submit RFQ", writeMsg: "Send Message",
            notFound: "Factory Not Found",
            production: "Production Capacity",
            reviewsTitle: "Buyer Reviews",
            all: "All", noProducts: "No products in this category",
            trustTitle: "Trust & Quality",
            certNote: "All certificates available on request",
        },
    }[lang];

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: "100px 24px" }}>
                <div className="spinner" style={{ margin: "0 auto 20px" }} />
                <p style={{ color: "var(--color-muted)" }}>{t.common.loading}...</p>
            </div>
        );
    }

    if (!company) {
        return (
            <div style={{ textAlign: "center", padding: "100px 24px" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>🏭</div>
                <h2 style={{ fontSize: 28, marginBottom: 16 }}>{L.notFound}</h2>
                <Link href="/companies" className="btn btn-primary">{t.common.back}</Link>
            </div>
        );
    }

    const allProducts = company.products || [];
    const filteredProducts = activeTab === "all" ? allProducts : allProducts.filter(p => p.type === activeTab);
    const capacity = productionCapacity[company.id] ?? [];
    const reviews = mockReviews[company.id] ?? [];

    // Tab counts
    const tabCounts: Record<string, number> = {
        all: allProducts.length,
        instock: allProducts.filter(p => p.type === "instock").length,
        whitelabel: allProducts.filter(p => p.type === "whitelabel").length,
        rfq: allProducts.filter(p => p.type === "rfq").length,
    };

    return (
        <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
            {/* Breadcrumb */}
            <div style={{ background: "white", borderBottom: "1px solid var(--color-border)" }}>
                <div className="container" style={{ padding: "12px 24px", display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-muted)" }}>
                    <Link href="/" style={{ color: "var(--color-muted)", textDecoration: "none" }}>{L.home}</Link>
                    <span>›</span>
                    <Link href="/companies" style={{ color: "var(--color-muted)", textDecoration: "none" }}>{L.factories}</Link>
                    <span>›</span>
                    <span style={{ color: "var(--color-text)", fontWeight: 600 }}>{company.name}</span>
                </div>
            </div>

            {/* Hero Banner */}
            <div style={{
                background: "linear-gradient(135deg, var(--color-primary) 0%, #0a2a45 100%)",
                padding: "40px 0 0", position: "relative", overflow: "hidden",
            }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
                    {[...Array(6)].map((_, i) => (
                        <div key={i} style={{
                            position: "absolute", borderRadius: "50%", border: "1px solid white",
                            width: 200 + i * 80, height: 200 + i * 80,
                            top: "50%", left: "60%", transform: "translate(-50%, -50%)",
                        }} />
                    ))}
                </div>

                <div className="container" style={{ padding: "0 24px 40px", position: "relative" }}>
                    <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
                        {/* Avatar / Logo */}
                        <div style={{
                            width: 100, height: 100, borderRadius: 20, flexShrink: 0,
                            background: "white",
                            border: "2px solid rgba(255,255,255,0.2)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            overflow: "hidden"
                        }}>
                            {(company as any).logo ? (
                                <img src={(company as any).logo} alt={company.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            ) : (
                                <span style={{ fontSize: 48 }}>🏭</span>
                            )}
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                                {company.verified && (
                                    <span style={{ background: "rgba(34,197,94,0.2)", color: "#86efac", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 12 }}>
                                        ✓ {L.verified}
                                    </span>
                                )}
                                {company.flows.map(f => (
                                    <span key={f} style={{ background: flowColors[f].bg, color: flowColors[f].text, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 12 }}>
                                        {flowColors[f].label[lang]}
                                    </span>
                                ))}
                            </div>
                            <h1 style={{ color: "white", fontSize: 34, fontWeight: 900, marginBottom: 6, lineHeight: 1.15 }}>
                                {company.name}
                            </h1>
                            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, marginBottom: 14, maxWidth: 560 }}>
                                {lang === "ru" ? company.descriptionRu : company.descriptionEn}
                            </p>
                            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                                {[
                                    { label: "📍", value: `${getRegionLabel(company.region, lang)}, ${company.country}` },
                                    { label: L.founded, value: String(company.founded) },
                                    { label: L.employees, value: company.employees },
                                    { label: L.moq, value: company.moqFrom },
                                    { label: L.leadTime, value: company.leadTime },
                                ].map(item => (
                                    <div key={item.label}>
                                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.label}</div>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Rating box */}
                        <div style={{
                            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                            borderRadius: 16, padding: "16px 20px", textAlign: "center", flexShrink: 0,
                        }}>
                            <div style={{ fontSize: 36, fontWeight: 900, color: "white", lineHeight: 1 }}>{company.rating.toFixed(1)}</div>
                            <div style={{ marginTop: 6, marginBottom: 4 }}><StarDisplay rating={company.rating} /></div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{company.reviewCount} {L.reviews}</div>
                        </div>
                    </div>
                </div>

                {/* Stats bar */}
                <div style={{ background: "rgba(0,0,0,0.25)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="container" style={{ padding: "0 24px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", textAlign: "center" }}>
                            {[
                                { value: company.ordersCompleted?.toLocaleString() || "0", label: L.ordersCompleted },
                                { value: `${company.repeatClients || 0}%`, label: L.repeatClients },
                                { value: `${company.onTimeDelivery || 0}%`, label: L.onTime },
                                { value: `${company.avgResponseHours || 0}${L.hours}`, label: L.response },
                            ].map(stat => (
                                <div key={stat.label} style={{ padding: "14px 0", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
                                    <div style={{ fontSize: 22, fontWeight: 900, color: "#5eb8ff" }}>{stat.value}</div>
                                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="container" style={{ padding: "32px 24px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 28, alignItems: "flex-start" }}>
                {/* ── Left column ── */}
                <div>
                    {/* About */}
                    <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24, marginBottom: 20 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 14 }}>🏭 {L.about}</h2>
                        <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--color-text-secondary)" }}>
                            {lang === "ru" ? company.aboutRu : company.aboutEn}
                        </p>
                    </div>

                    {/* B2B Export Profile — NEW */}
                    {(() => {
                        const c = company as any;
                        const hasData = c.businessType || c.exportYears > 0 || c.exportRegions?.length || c.qualityControlRu || c.productionCapacityRu;
                        if (!hasData) return null;
                        return (
                            <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24, marginBottom: 20, borderLeft: "4px solid #3b82f6" }}>
                                <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, color: "#1e40af" }}>
                                    🌍 {lang === "ru" ? "B2B-профиль экспортёра" : "B2B Export Profile"}
                                </h2>

                                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 16 }}>
                                    {[
                                        c.businessType && {
                                            icon: "🏗️",
                                            label: lang === "ru" ? "Тип производства" : "Business Type",
                                            value: c.businessType
                                        },
                                        c.exportYears > 0 && {
                                            icon: "📅",
                                            label: lang === "ru" ? "Опыт экспорта" : "Export Experience",
                                            value: lang === "ru" ? `${c.exportYears} лет` : `${c.exportYears} years`
                                        },
                                        c.thirdPartyInspection && {
                                            icon: "🔍",
                                            label: lang === "ru" ? "Инспекция" : "Inspection",
                                            value: lang === "ru" ? "Допускается сторонняя инспекция" : "Third-party inspection allowed"
                                        },
                                        c.languages?.length > 0 && {
                                            icon: "💬",
                                            label: lang === "ru" ? "Языки" : "Languages",
                                            value: (c.languages as string[]).join(", ").toUpperCase()
                                        },
                                    ].filter(Boolean).map((item: any) => (
                                        <div key={item.label} style={{
                                            background: "#eff6ff", borderRadius: 12,
                                            padding: "12px 14px", border: "1px solid #bfdbfe",
                                        }}>
                                            <div style={{ fontSize: 11, color: "#3b82f6", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                                                {item.icon} {item.label}
                                            </div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: "#1e3a5f" }}>{item.value}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Export regions */}
                                {c.exportRegions?.length > 0 && (
                                    <div style={{ marginBottom: 14 }}>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                                            🗺️ {lang === "ru" ? "Регионы экспорта" : "Export Regions"}
                                        </div>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                            {(c.exportRegions as string[]).map((r: string) => (
                                                <span key={r} style={{ fontSize: 12, fontWeight: 600, background: "#f0f9ff", color: "#0369a1", padding: "4px 12px", borderRadius: 20, border: "1px solid #bae6fd" }}>
                                                    {r}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Production capacity from DB */}
                                {(c.productionCapacityRu || c.productionCapacityEn) && (
                                    <div style={{ marginBottom: 14 }}>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                                            ⚙️ {lang === "ru" ? "Производственные мощности" : "Production Capacity"}
                                        </div>
                                        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6, margin: 0 }}>
                                            {lang === "ru" ? c.productionCapacityRu : c.productionCapacityEn}
                                        </p>
                                    </div>
                                )}

                                {/* Quality control policy */}
                                {(c.qualityControlRu || c.qualityControlEn) && (
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                                            ✅ {lang === "ru" ? "Контроль качества" : "Quality Control"}
                                        </div>
                                        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6, margin: 0 }}>
                                            {lang === "ru" ? c.qualityControlRu : c.qualityControlEn}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })()}

                    {/* Production Capacity — static fallback for mock data */}
                    {capacity.length > 0 && (

                        <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24, marginBottom: 20 }}>
                            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>⚙️ {L.production}</h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                                {capacity.map((item: any, i) => (
                                    <div key={i} style={{
                                        display: "flex", alignItems: "flex-start", gap: 10,
                                        background: "var(--color-surface)", borderRadius: 12,
                                        padding: "12px 14px",
                                    }}>
                                        <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>
                                            {["📊", "🏗️", "🕐", "🧪", "🔬", "🎯"][i % 6]}
                                        </span>
                                        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-secondary)", lineHeight: 1.4 }}>
                                            {lang === "ru" ? item.ru : item.en}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Specialization */}
                    <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24, marginBottom: 20 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 14 }}>🎯 {L.specialization}</h2>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                            {((company as any).specializationRu || "").split(", ").filter(Boolean).map((s: any) => (
                                <span key={s} style={{
                                    background: "var(--color-surface)", border: "1px solid var(--color-border-strong)",
                                    borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: 600,
                                    color: "var(--color-text-secondary)",
                                }}>{s}</span>
                            ))}
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "var(--color-muted)", letterSpacing: "0.06em", marginBottom: 8 }}>
                            {L.flows}
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                            {company.flows.map(f => (
                                <span key={f} style={{ background: flowColors[f].bg, color: flowColors[f].text, fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 20 }}>
                                    {flowColors[f].label[lang]}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Trust Block — Certs + Export — ENHANCED */}
                    <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24, marginBottom: 20 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>🏅 {L.trustTitle}</h2>
                        <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 16 }}>{L.certNote}</p>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 20 }}>
                            {company.certifications.map(cert => {
                                const cfg = certConfig[cert] ?? { icon: "📋", color: "#6b7280" };
                                return (
                                    <div key={cert} style={{
                                        display: "flex", alignItems: "center", gap: 10,
                                        background: "var(--color-surface)", borderRadius: 12,
                                        padding: "12px 14px", border: `1px solid ${cfg.color}22`,
                                    }}>
                                        <span style={{
                                            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                                            background: `${cfg.color}15`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 18,
                                        }}>{cfg.icon}</span>
                                        <div>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: cfg.color }}>{cert}</div>
                                            <div style={{ fontSize: 10, color: "var(--color-muted)" }}>
                                                {lang === "ru" ? "Действующий" : "Active"}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "var(--color-muted)", letterSpacing: "0.06em", marginBottom: 10 }}>
                            🌍 {L.export}
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {company.exportCountries.map(c => (
                                <span key={c} style={{ background: "#f0f9ff", color: "#0369a1", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 12 }}>
                                    {c}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Products with Tabs — NEW */}
                    {allProducts.length > 0 && (
                        <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24, marginBottom: 20 }}>
                            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>📦 {L.products}</h2>

                            {/* Tab bar */}
                            <div style={{
                                display: "flex", gap: 0, marginBottom: 20,
                                background: "var(--color-surface)", borderRadius: 12, padding: 4,
                            }}>
                                {([
                                    { key: "all" as const, label: L.all, count: tabCounts.all },
                                    { key: "instock" as const, label: flowColors.instock.label[lang], count: tabCounts.instock },
                                    { key: "whitelabel" as const, label: flowColors.whitelabel.label[lang], count: tabCounts.whitelabel },
                                    { key: "rfq" as const, label: flowColors.rfq.label[lang], count: tabCounts.rfq },
                                ] as const).filter(tab => tab.count > 0 || tab.key === "all").map(tab => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        style={{
                                            flex: 1, padding: "8px 12px", border: "none", cursor: "pointer",
                                            borderRadius: 8, fontSize: 13, fontWeight: 600,
                                            background: activeTab === tab.key ? "white" : "transparent",
                                            color: activeTab === tab.key ? "var(--color-primary)" : "var(--color-muted)",
                                            boxShadow: activeTab === tab.key ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                                            transition: "all 0.15s",
                                        }}
                                    >
                                        {tab.label}
                                        {tab.count > 0 && (
                                            <span style={{
                                                marginLeft: 6, fontSize: 10, fontWeight: 700,
                                                background: activeTab === tab.key ? "var(--color-primary)" : "var(--color-border-strong)",
                                                color: activeTab === tab.key ? "white" : "var(--color-muted)",
                                                borderRadius: 10, padding: "1px 6px",
                                            }}>{tab.count}</span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {filteredProducts.length === 0 ? (
                                <div style={{ textAlign: "center", padding: "40px 0", color: "var(--color-muted)" }}>
                                    {L.noProducts}
                                </div>
                            ) : (
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                                    {filteredProducts.map((p: any) => {
                                        const fc = flowColors[p.type as ProductType] || flowColors.instock;
                                        return (
                                            <Link key={p.id} href={`/products/${p.id}`} style={{ textDecoration: "none" }}>
                                                <div className="card" style={{ overflow: "hidden", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }}
                                                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
                                                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}>
                                                    <div style={{ height: 110, background: "white", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                                                        {p.image ? (
                                                            <img src={p.image} alt={lang === "ru" ? p.titleRu : p.titleEn} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                        ) : (
                                                            <span style={{ fontSize: 40 }}>🧵</span>
                                                        )}
                                                        <span style={{ position: "absolute", top: 6, left: 6, background: fc.bg, color: fc.text, fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 8, textTransform: "uppercase" }}>
                                                            {fc.label[lang]}
                                                        </span>
                                                        {p.verified && (
                                                            <span style={{ position: "absolute", top: 6, right: 6, background: "#fef9c3", color: "#854d0e", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 8 }}>
                                                                ✓
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div style={{ padding: "10px 12px" }}>
                                                        <div style={{ fontSize: 10, color: "var(--color-muted)", marginBottom: 2, textTransform: "uppercase" }}>{p.category}</div>
                                                        <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{lang === "ru" ? p.titleRu : p.titleEn}</h4>
                                                        <div style={{ fontSize: 13, fontWeight: 800, color: "var(--color-primary)" }}>
                                                            {p.priceCurrency}{p.priceFrom.toFixed(2)} – {p.priceCurrency}{p.priceTo.toFixed(2)}
                                                        </div>
                                                        <div style={{ fontSize: 11, color: "var(--color-muted)", marginTop: 4 }}>
                                                            MOQ: {p.moq}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Reviews — NEW */}
                    {reviews.length > 0 && (
                        <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                                <h2 style={{ fontSize: 18, fontWeight: 800 }}>⭐ {L.reviewsTitle}</h2>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <StarDisplay rating={company.rating} size={18} />
                                    <span style={{ fontSize: 20, fontWeight: 900, color: "var(--color-text)" }}>{company.rating.toFixed(1)}</span>
                                    <span style={{ fontSize: 13, color: "var(--color-muted)" }}>({company.reviewCount} {L.reviews})</span>
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                {reviews.map((rev, i) => (
                                    <div key={i} style={{
                                        background: "var(--color-surface)", borderRadius: 12,
                                        padding: "16px 18px", border: "1px solid var(--color-border)",
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <div style={{
                                                    width: 36, height: 36, borderRadius: "50%",
                                                    background: "linear-gradient(135deg, var(--color-primary), #5eb8ff)",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    fontSize: 14, fontWeight: 800, color: "white",
                                                }}>
                                                    {rev.author[0]}
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: 13, fontWeight: 700 }}>
                                                        {rev.country} {rev.author}
                                                    </div>
                                                    <div style={{ fontSize: 11, color: "var(--color-muted)" }}>{rev.date}</div>
                                                </div>
                                            </div>
                                            <StarDisplay rating={rev.rating} size={14} />
                                        </div>
                                        <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--color-text-secondary)", margin: 0 }}>
                                            {rev.text[lang]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Right: Contact sidebar ── */}
                <div style={{ position: "sticky", top: 84 }}>
                    <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
                        <div style={{ background: "linear-gradient(135deg, var(--color-primary), #1e4976)", padding: "20px 20px 16px" }}>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                                {L.contacts}
                            </div>
                            <div style={{ fontWeight: 800, fontSize: 17, color: "white" }}>{company.name}</div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>
                                📍 {company.region} · {lang === "ru" ? "Узбекистан" : "Uzbekistan"}
                            </div>
                        </div>

                        <div style={{ padding: 16 }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {company.telegram && (
                                    <a href={`https://t.me/${company.telegram.replace("@", "")}`} target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, textDecoration: "none", background: "#e8f4fd", color: "#0088cc", fontWeight: 700, fontSize: 14 }}>
                                        <span style={{ fontSize: 20 }}>✈️</span> Telegram · {company.telegram}
                                    </a>
                                )}
                                {company.whatsapp && (
                                    <a href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, textDecoration: "none", background: "#e8f8f0", color: "#128c7e", fontWeight: 700, fontSize: 14 }}>
                                        <span style={{ fontSize: 20 }}>💬</span> WhatsApp
                                    </a>
                                )}
                                {company.email && (
                                    <a href={`mailto:${company.email}`} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, textDecoration: "none", background: "#fef3f2", color: "#c0392b", fontWeight: 700, fontSize: 14 }}>
                                        <span style={{ fontSize: 20 }}>📧</span> {company.email}
                                    </a>
                                )}
                                {company.website && (
                                    <a href={`https://${company.website}`} target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, textDecoration: "none", background: "var(--color-surface)", color: "var(--color-text-secondary)", fontWeight: 600, fontSize: 14 }}>
                                        <span style={{ fontSize: 20 }}>🌐</span> {company.website}
                                    </a>
                                )}
                            </div>

                            <div style={{ height: 1, background: "var(--color-border)", margin: "16px 0" }} />

                            <Link href={`/rfq/new?factory_id=${company.id}`} className="btn btn-primary" style={{ width: "100%", fontSize: 15, marginBottom: 8, display: "block", textAlign: "center" }}>
                                📐 {L.sendRFQ}
                            </Link>
                            <button className="btn btn-secondary" style={{ width: "100%" }} onClick={() => alert("Chat modal would open here!")}>
                                💬 {L.writeMsg}
                            </button>
                        </div>
                    </div>

                    {/* Mini stats card */}
                    <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 16 }}>
                        {[
                            { icon: "📅", label: lang === "ru" ? "Год основания" : "Founded", value: String(company.founded) },
                            { icon: "👥", label: lang === "ru" ? "Сотрудников" : "Employees", value: company.employees },
                            { icon: "⏱", label: lang === "ru" ? "Срок производства" : "Lead Time", value: company.leadTime },
                            { icon: "📦", label: lang === "ru" ? "Минимальный заказ" : "Min Order", value: company.moqFrom },
                        ].map(item => (
                            <div key={item.label} style={{
                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                padding: "8px 0", borderBottom: "1px solid var(--color-border)", fontSize: 13,
                            }}>
                                <span style={{ color: "var(--color-muted)" }}>{item.icon} {item.label}</span>
                                <strong style={{ color: "var(--color-text)" }}>{item.value}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
