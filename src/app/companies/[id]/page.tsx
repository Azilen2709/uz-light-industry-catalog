"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useT } from "@/contexts/LanguageContext";
import { COMPANIES, PRODUCTS, CATEGORIES } from "@/lib/data";

const flowColors: Record<string, { bg: string; text: string; label: { ru: string; en: string } }> = {
    instock: { bg: "#dcfce7", text: "#15803d", label: { ru: "Со склада", en: "In-Stock" } },
    whitelabel: { bg: "#dbeafe", text: "#1d4ed8", label: { ru: "White Label", en: "White Label" } },
    rfq: { bg: "#ede9fe", text: "#6d28d9", label: { ru: "RFQ", en: "RFQ" } },
};

function StarRating({ rating }: { rating: number }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill={i <= Math.round(rating) ? "#f59e0b" : "#e2e8f0"}>
                    <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10.1l-3.6 1.9.7-4L2.2 5.2l4-.6z" />
                </svg>
            ))}
        </div>
    );
}

export default function CompanyPage() {
    const params = useParams();
    const { t, lang } = useT();
    const companyId = parseInt(params.id as string, 10);
    const company = COMPANIES.find(c => c.id === companyId);

    const labels = {
        ru: {
            home: "Главная", factories: "Фабрики",
            verified: "Проверена", founded: "Основана", employees: "Сотрудников",
            moq: "МЗК от", leadTime: "Срок", rating: "рейтинг",
            reviews: "отзывов",
            ordersCompleted: "Выполнено заказов", repeatClients: "Повторных клиентов",
            onTime: "В срок", response: "Ответ за",
            hours: "ч.", about: "О фабрике", specialization: "Специализация",
            flows: "Форматы работы", certs: "Сертификаты", export: "Экспорт в",
            products: "Товары фабрики", contacts: "Контакты",
            sendRFQ: "Разместить RFQ", writeMsg: "Написать сообщение",
            notFound: "Фабрика не найдена",
            contactVia: "Связаться",
        },
        en: {
            home: "Home", factories: "Factories",
            verified: "Verified", founded: "Founded", employees: "Employees",
            moq: "MOQ from", leadTime: "Lead Time", rating: "rating",
            reviews: "reviews",
            ordersCompleted: "Orders Completed", repeatClients: "Repeat Clients",
            onTime: "On Time", response: "Avg Response",
            hours: "h.", about: "About Factory", specialization: "Specialization",
            flows: "Cooperation Types", certs: "Certifications", export: "Exports to",
            products: "Factory Products", contacts: "Contacts",
            sendRFQ: "Submit RFQ", writeMsg: "Send Message",
            notFound: "Factory Not Found",
            contactVia: "Contact via",
        },
    };

    const L = labels[lang];

    if (!company) {
        return (
            <div style={{ textAlign: "center", padding: "100px 24px" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>🏭</div>
                <h2 style={{ fontSize: 28, marginBottom: 16 }}>{L.notFound}</h2>
                <Link href="/companies" className="btn btn-primary">{t.common.back}</Link>
            </div>
        );
    }

    const companyProducts = PRODUCTS.filter(p => p.companyId === company.id);

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
                padding: "40px 0 0",
                position: "relative",
                overflow: "hidden",
            }}>
                {/* Background pattern */}
                <div style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
                    {[...Array(6)].map((_, i) => (
                        <div key={i} style={{
                            position: "absolute", borderRadius: "50%",
                            border: "1px solid white",
                            width: 200 + i * 80, height: 200 + i * 80,
                            top: "50%", left: "60%",
                            transform: "translate(-50%, -50%)",
                        }} />
                    ))}
                </div>

                <div className="container" style={{ padding: "0 24px 40px", position: "relative" }}>
                    <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
                        {/* Avatar */}
                        <div style={{
                            width: 100, height: 100, borderRadius: 20, flexShrink: 0,
                            background: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
                            border: "2px solid rgba(255,255,255,0.2)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 48,
                        }}>🏭</div>

                        <div style={{ flex: 1 }}>
                            {/* Badges */}
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
                                {company.description[lang]}
                            </p>

                            {/* Quick info row */}
                            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                                {[
                                    { label: "📍", value: `${company.region}, ${company.country}` },
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
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            borderRadius: 16, padding: "16px 20px",
                            textAlign: "center", flexShrink: 0,
                        }}>
                            <div style={{ fontSize: 36, fontWeight: 900, color: "white", lineHeight: 1 }}>{company.rating.toFixed(1)}</div>
                            <div style={{ marginTop: 6, marginBottom: 4 }}><StarRating rating={company.rating} /></div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{company.reviewCount} {L.reviews}</div>
                        </div>
                    </div>
                </div>

                {/* Stats bar */}
                <div style={{ background: "rgba(0,0,0,0.25)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="container" style={{ padding: "0 24px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", textAlign: "center" }}>
                            {[
                                { value: company.stats.ordersCompleted.toLocaleString(), label: L.ordersCompleted },
                                { value: `${company.stats.repeatClients}%`, label: L.repeatClients },
                                { value: `${company.stats.onTimeDelivery}%`, label: L.onTime },
                                { value: `${company.stats.avgResponseHours}${L.hours}`, label: L.response },
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
                {/* Left column */}
                <div>
                    {/* About */}
                    <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24, marginBottom: 20 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 14 }}>🏭 {L.about}</h2>
                        <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--color-text-secondary)" }}>
                            {company.about[lang]}
                        </p>
                    </div>

                    {/* Specialization */}
                    <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24, marginBottom: 20 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 14 }}>🎯 {L.specialization}</h2>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {company.specialization[lang].split(", ").map(s => (
                                <span key={s} style={{
                                    background: "var(--color-surface)", border: "1px solid var(--color-border-strong)",
                                    borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: 600,
                                    color: "var(--color-text-secondary)",
                                }}>{s}</span>
                            ))}
                        </div>

                        <div style={{ marginTop: 18 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "var(--color-muted)", letterSpacing: "0.06em", marginBottom: 10 }}>
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
                    </div>

                    {/* Certs + Export */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                        <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 20 }}>
                            <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                                🏅 {L.certs}
                            </h3>
                            {company.certifications.map(cert => (
                                <div key={cert} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid var(--color-border)", fontSize: 13, color: "var(--color-text-secondary)" }}>
                                    <span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span> {cert}
                                </div>
                            ))}
                        </div>

                        <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 20 }}>
                            <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                                🌍 {L.export}
                            </h3>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {company.exportCountries.map(c => (
                                    <span key={c} style={{ background: "#f0f9ff", color: "#0369a1", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 12 }}>
                                        {c}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    {companyProducts.length > 0 && (
                        <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 18 }}>📦 {L.products}</h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                                {companyProducts.map(p => {
                                    const fc = flowColors[p.type];
                                    return (
                                        <Link key={p.id} href={`/products/${p.id}`} style={{ textDecoration: "none" }}>
                                            <div className="card" style={{ overflow: "hidden", cursor: "pointer" }}>
                                                <div style={{ height: 110, background: "linear-gradient(135deg,#f0f6ff,#e8f4ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, position: "relative" }}>
                                                    🧵
                                                    <span style={{ position: "absolute", top: 6, left: 6, background: fc.bg, color: fc.text, fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 8, textTransform: "uppercase" }}>
                                                        {fc.label[lang]}
                                                    </span>
                                                </div>
                                                <div style={{ padding: "10px 12px" }}>
                                                    <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>{p.title}</h4>
                                                    <div style={{ fontSize: 13, fontWeight: 800, color: "var(--color-primary)" }}>
                                                        ${p.priceFrom.toFixed(2)} – ${p.priceTo.toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Contact sidebar */}
                <div style={{ position: "sticky", top: 84 }}>
                    <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
                        {/* Header */}
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
                            {/* Contact buttons */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {company.contacts.telegram && (
                                    <a href={`https://t.me/${company.contacts.telegram.replace("@", "")}`} target="_blank" rel="noopener" style={{
                                        display: "flex", alignItems: "center", gap: 10,
                                        padding: "10px 14px", borderRadius: 10, textDecoration: "none",
                                        background: "#e8f4fd", color: "#0088cc", fontWeight: 700, fontSize: 14,
                                        transition: "background 0.15s",
                                    }}>
                                        <span style={{ fontSize: 20 }}>✈️</span>
                                        Telegram · {company.contacts.telegram}
                                    </a>
                                )}
                                {company.contacts.whatsapp && (
                                    <a href={`https://wa.me/${company.contacts.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener" style={{
                                        display: "flex", alignItems: "center", gap: 10,
                                        padding: "10px 14px", borderRadius: 10, textDecoration: "none",
                                        background: "#e8f8f0", color: "#128c7e", fontWeight: 700, fontSize: 14,
                                    }}>
                                        <span style={{ fontSize: 20 }}>💬</span>
                                        WhatsApp
                                    </a>
                                )}
                                {company.contacts.email && (
                                    <a href={`mailto:${company.contacts.email}`} style={{
                                        display: "flex", alignItems: "center", gap: 10,
                                        padding: "10px 14px", borderRadius: 10, textDecoration: "none",
                                        background: "#fef3f2", color: "#c0392b", fontWeight: 700, fontSize: 14,
                                    }}>
                                        <span style={{ fontSize: 20 }}>📧</span>
                                        {company.contacts.email}
                                    </a>
                                )}
                                {company.contacts.website && (
                                    <a href={`https://${company.contacts.website}`} target="_blank" rel="noopener" style={{
                                        display: "flex", alignItems: "center", gap: 10,
                                        padding: "10px 14px", borderRadius: 10, textDecoration: "none",
                                        background: "var(--color-surface)", color: "var(--color-text-secondary)", fontWeight: 600, fontSize: 14,
                                    }}>
                                        <span style={{ fontSize: 20 }}>🌐</span>
                                        {company.contacts.website}
                                    </a>
                                )}
                            </div>

                            <div style={{ height: 1, background: "var(--color-border)", margin: "16px 0" }} />

                            {/* RFQ CTA */}
                            <button className="btn btn-primary" style={{ width: "100%", fontSize: 15, marginBottom: 8 }}>
                                📐 {L.sendRFQ}
                            </button>
                            <button className="btn btn-secondary" style={{ width: "100%" }}>
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
                                padding: "8px 0", borderBottom: "1px solid var(--color-border)",
                                fontSize: 13,
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
