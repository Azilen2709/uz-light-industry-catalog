"use client";
import Link from "next/link";
import { useState } from "react";
import { useT } from "@/contexts/LanguageContext";
import { COMPANIES } from "@/lib/data";

// ─── Mock data ────────────────────────────────────────────────────────────

const MOCK_RFQ = {
    id: 1,
    title: "Худи базовое оверсайз",
    flow: "rfq" as const,
    industry: { ru: "Текстиль", en: "Textile" },
    quantity: "500",
    unit: "шт",
    status: "active" as const,
    createdAt: "23 февраля 2026",
    deadline: "15 марта 2026",
    description: "Худи оверсайз из футера 320 г/м². 80% хлопок, 20% полиэстер. Размерный ряд XS–3XL. Цвета: чёрный, серый, белый. Упаковка: 10 шт/короб.",
};

interface Quote {
    id: number;
    companyId: number;
    company: string;
    region: string;
    verified: boolean;
    rating: number;
    pricePerUnit: number;
    totalPrice: number;
    currency: string;
    moq: number;
    leadTime: string;
    deliveryDate: string;
    comment: { ru: string; en: string };
    status: "new" | "viewed" | "accepted" | "rejected";
    receivedAt: string;
}

const MOCK_QUOTES: Quote[] = [
    {
        id: 1, companyId: 1, company: "UzTextile Pro", region: "Ташкент", verified: true, rating: 4.8,
        pricePerUnit: 4.20, totalPrice: 2100, currency: "$", moq: 200, leadTime: "12 дней",
        deliveryDate: "7 марта 2026",
        comment: { ru: "Готовы взять в работу. Есть остаток ткани нужного цвета. При заказе 1000+ цена $3.80.", en: "Ready to start. Have fabric in required colors. Price $3.80 for 1000+ units." },
        status: "new", receivedAt: "2 ч. назад",
    },
    {
        id: 2, companyId: 4, company: "SportTex UZ", region: "Наманган", verified: false, rating: 4.2,
        pricePerUnit: 3.95, totalPrice: 1975, currency: "$", moq: 500, leadTime: "18 дней",
        deliveryDate: "12 марта 2026",
        comment: { ru: "Лучшая цена на рынке. МЗК 500 шт. Можем делать принты и вышивку.", en: "Best price on the market. MOQ 500 pcs. Can do prints and embroidery." },
        status: "viewed", receivedAt: "5 ч. назад",
    },
    {
        id: 3, companyId: 3, company: "StyleFactory", region: "Самарканд", verified: true, rating: 4.6,
        pricePerUnit: 4.80, totalPrice: 2400, currency: "$", moq: 50, leadTime: "20 дней",
        deliveryDate: "14 марта 2026",
        comment: { ru: "Небольшой MOQ специально для тест-партии. Европейское качество швов.", en: "Low MOQ specifically for test run. European-standard seam quality." },
        status: "new", receivedAt: "8 ч. назад",
    },
];

const statusConfig = {
    active: { icon: "🟡", label: { ru: "Активна", en: "Active" }, color: "#d97706" },
    closed: { icon: "⚫", label: { ru: "Закрыта", en: "Closed" }, color: "#6b7280" },
    matched: { icon: "🟢", label: { ru: "Подобрана", en: "Matched" }, color: "#16a34a" },
};

const quoteStatusConfig = {
    new: { color: "#d97706", bg: "#fef3c7", label: { ru: "Новая", en: "New" } },
    viewed: { color: "#0369a1", bg: "#e0f2fe", label: { ru: "Просмотрено", en: "Viewed" } },
    accepted: { color: "#15803d", bg: "#dcfce7", label: { ru: "Принята", en: "Accepted" } },
    rejected: { color: "#dc2626", bg: "#fee2e2", label: { ru: "Отклонена", en: "Rejected" } },
};

// ─── Component ────────────────────────────────────────────────────────────

export default function RFQStatusPage() {
    const { lang } = useT();
    const [quotes, setQuotes] = useState<Quote[]>(MOCK_QUOTES);
    const [compareIds, setCompareIds] = useState<number[]>([]);
    const [activeView, setActiveView] = useState<"list" | "compare">("list");

    const L = {
        ru: {
            home: "Главная", rfq: "Мои заявки",
            badge: "Статус заявки",
            created: "Создана", deadline: "Дедлайн", qty: "Объём",
            description: "Описание заявки",
            quotesTitle: "Входящие коммерческие предложения",
            noQuotes: "Пока нет предложений. Обычно фабрики отвечают в течение 24 часов.",
            accept: "Принять КП", reject: "Отклонить", contact: "Написать", viewFactory: "Профиль",
            perUnit: "за шт", total: "Итого", moq: "МЗК", leadTime: "Срок", delivery: "Поставка",
            compare: "Сравнить", compareMode: "Режим сравнения", exitCompare: "Выйти из сравнения",
            selected: "выбрано",
            verified: "Проверена",
            bestPrice: "🔥 Лучшая цена",
            fastestDel: "⚡ Быстрее всех",
            lowMOQ: "🎯 Низкий МЗК",
            newRFQ: "+ Новая заявка",
        },
        en: {
            home: "Home", rfq: "My RFQs",
            badge: "Request Status",
            created: "Created", deadline: "Due Date", qty: "Volume",
            description: "Request Description",
            quotesTitle: "Incoming Quotes",
            noQuotes: "No quotes yet. Factories usually respond within 24 hours.",
            accept: "Accept Quote", reject: "Decline", contact: "Message", viewFactory: "Profile",
            perUnit: "per unit", total: "Total", moq: "MOQ", leadTime: "Lead Time", delivery: "Delivery",
            compare: "Compare", compareMode: "Comparison Mode", exitCompare: "Exit Compare",
            selected: "selected",
            verified: "Verified",
            bestPrice: "🔥 Best Price",
            fastestDel: "⚡ Fastest",
            lowMOQ: "🎯 Low MOQ",
            newRFQ: "+ New RFQ",
        },
    }[lang];

    const toggleCompare = (id: number) =>
        setCompareIds(ids => ids.includes(id) ? ids.filter(i => i !== id) : ids.length < 3 ? [...ids, id] : ids);

    const updateQuoteStatus = (id: number, status: Quote["status"]) =>
        setQuotes(qs => qs.map(q => q.id === id ? { ...q, status } : q));

    const minPrice = Math.min(...quotes.map(q => q.pricePerUnit));
    const minLead = Math.min(...quotes.map(q => parseInt(q.leadTime)));
    const minMoq = Math.min(...quotes.map(q => q.moq));
    const rfqStatus = statusConfig[MOCK_RFQ.status];

    const compareQuotes = quotes.filter(q => compareIds.includes(q.id));

    return (
        <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, var(--color-primary), #0a2a45)", padding: "28px 0 20px" }}>
                <div className="container" style={{ padding: "0 24px" }}>
                    <div style={{ display: "flex", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 14 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>{L.home}</Link>
                        <span>›</span>
                        <span style={{ color: "rgba(255,255,255,0.55)" }}>{L.rfq}</span>
                        <span>›</span>
                        <span style={{ color: "white", fontWeight: 600 }}>#{MOCK_RFQ.id}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                                {L.badge}
                            </div>
                            <h1 style={{ color: "white", fontSize: 24, fontWeight: 900 }}>{MOCK_RFQ.title}</h1>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", borderRadius: 20, padding: "6px 14px" }}>
                            <span style={{ fontSize: 16 }}>{rfqStatus.icon}</span>
                            <span style={{ fontWeight: 700, color: "white", fontSize: 14 }}>
                                {rfqStatus.label[lang]}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: "24px 24px", display: "grid", gridTemplateColumns: "1fr 280px", gap: 24, alignItems: "flex-start" }}>
                {/* Left */}
                <div>
                    {/* RFQ Summary */}
                    <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 22, marginBottom: 20 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 16 }}>
                            {[
                                { icon: "📅", label: L.created, value: MOCK_RFQ.createdAt },
                                { icon: "⏳", label: L.deadline, value: MOCK_RFQ.deadline },
                                { icon: "📦", label: L.qty, value: `${MOCK_RFQ.quantity} ${MOCK_RFQ.unit}` },
                            ].map(item => (
                                <div key={item.label} style={{ background: "var(--color-surface)", borderRadius: 10, padding: "12px 14px" }}>
                                    <div style={{ fontSize: 11, color: "var(--color-muted)", marginBottom: 4 }}>{item.icon} {item.label}</div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text)" }}>{item.value}</div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                                {L.description}
                            </div>
                            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--color-text-secondary)", margin: 0 }}>
                                {lang === "ru" ? MOCK_RFQ.description : "Oversized hoodie from fleece 320 gsm. 80% cotton, 20% polyester. Size range XS–3XL. Colors: black, gray, white. Packing: 10 pcs/box."}
                            </p>
                        </div>
                    </div>

                    {/* Quotes */}
                    <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 22 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                            <h2 style={{ fontSize: 18, fontWeight: 800 }}>
                                📨 {L.quotesTitle}
                                <span style={{ marginLeft: 8, fontSize: 13, fontWeight: 600, background: "var(--color-primary)", color: "white", borderRadius: 12, padding: "2px 10px" }}>
                                    {quotes.length}
                                </span>
                            </h2>
                            {compareIds.length > 0 ? (
                                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                    <span style={{ fontSize: 12, color: "var(--color-muted)" }}>{compareIds.length} {L.selected}</span>
                                    <button onClick={() => { setActiveView("compare"); }} className="btn btn-primary" style={{ padding: "6px 14px", fontSize: 13 }}>
                                        {L.compare} →
                                    </button>
                                    <button onClick={() => setCompareIds([])} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--color-muted)", fontSize: 13 }}>
                                        ✕
                                    </button>
                                </div>
                            ) : null}
                        </div>

                        {/* LIST VIEW */}
                        {activeView === "list" && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                {quotes.map(quote => {
                                    const qsc = quoteStatusConfig[quote.status];
                                    const company = COMPANIES.find(c => c.id === quote.companyId);
                                    const isBestPrice = quote.pricePerUnit === minPrice;
                                    const isFastest = parseInt(quote.leadTime) === minLead;
                                    const isLowMoq = quote.moq === minMoq;
                                    const isSelected = compareIds.includes(quote.id);

                                    return (
                                        <div key={quote.id} style={{
                                            border: `2px solid ${isSelected ? "var(--color-primary)" : "var(--color-border)"}`,
                                            borderRadius: 14, padding: "16px 18px",
                                            background: isSelected ? "#f0f6ff" : "white",
                                            transition: "border-color 0.15s, background 0.15s",
                                        }}>
                                            {/* Header row */}
                                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                    <div style={{
                                                        width: 42, height: 42, borderRadius: 10,
                                                        background: "linear-gradient(135deg, var(--color-primary), #5eb8ff)",
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                        fontSize: 20, color: "white", fontWeight: 800,
                                                    }}>🏭</div>
                                                    <div>
                                                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                            <span style={{ fontWeight: 800, fontSize: 15 }}>{quote.company}</span>
                                                            {quote.verified && (
                                                                <span style={{ fontSize: 10, background: "#fef9c3", color: "#854d0e", fontWeight: 700, padding: "2px 6px", borderRadius: 8 }}>✓ {L.verified}</span>
                                                            )}
                                                        </div>
                                                        <div style={{ fontSize: 12, color: "var(--color-muted)" }}>
                                                            📍 {quote.region} · ★ {quote.rating} · {quote.receivedAt}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                    {/* Badges */}
                                                    <div style={{ display: "flex", gap: 4 }}>
                                                        {isBestPrice && <span style={{ fontSize: 11, fontWeight: 700, background: "#fef3c7", color: "#92400e", borderRadius: 8, padding: "2px 8px" }}>{L.bestPrice}</span>}
                                                        {isFastest && <span style={{ fontSize: 11, fontWeight: 700, background: "#dbeafe", color: "#1d4ed8", borderRadius: 8, padding: "2px 8px" }}>{L.fastestDel}</span>}
                                                        {isLowMoq && <span style={{ fontSize: 11, fontWeight: 700, background: "#ede9fe", color: "#6d28d9", borderRadius: 8, padding: "2px 8px" }}>{L.lowMOQ}</span>}
                                                    </div>
                                                    <span style={{ fontSize: 11, fontWeight: 700, background: qsc.bg, color: qsc.color, borderRadius: 8, padding: "3px 10px" }}>
                                                        {qsc.label[lang]}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Metrics row */}
                                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 12 }}>
                                                {[
                                                    { label: L.perUnit, value: `${quote.currency}${quote.pricePerUnit.toFixed(2)}`, highlight: isBestPrice },
                                                    { label: L.total, value: `${quote.currency}${quote.totalPrice.toLocaleString()}`, highlight: false },
                                                    { label: L.moq, value: `${quote.moq} ${lang === "ru" ? "шт" : "pcs"}`, highlight: isLowMoq },
                                                    { label: L.delivery, value: quote.deliveryDate, highlight: isFastest },
                                                ].map(m => (
                                                    <div key={m.label} style={{
                                                        background: m.highlight ? "#f0fdf4" : "var(--color-surface)",
                                                        border: m.highlight ? "1px solid #86efac" : "1px solid var(--color-border)",
                                                        borderRadius: 10, padding: "10px 12px",
                                                    }}>
                                                        <div style={{ fontSize: 10, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{m.label}</div>
                                                        <div style={{ fontSize: 14, fontWeight: 800, color: m.highlight ? "#15803d" : "var(--color-text)" }}>{m.value}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Comment */}
                                            <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--color-text-secondary)", background: "var(--color-surface)", borderRadius: 8, padding: "10px 12px", margin: "0 0 12px" }}>
                                                💬 {quote.comment[lang]}
                                            </p>

                                            {/* Actions */}
                                            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                                <button onClick={() => updateQuoteStatus(quote.id, "accepted")}
                                                    className="btn btn-primary" style={{ padding: "7px 16px", fontSize: 13 }}>
                                                    ✓ {L.accept}
                                                </button>
                                                {company && (
                                                    <Link href={`/companies/${company.id}`}
                                                        style={{ padding: "7px 14px", fontSize: 13, borderRadius: 8, textDecoration: "none", background: "var(--color-surface)", color: "var(--color-text-secondary)", fontWeight: 600, border: "1px solid var(--color-border)", display: "inline-block" }}>
                                                        🏭 {L.viewFactory}
                                                    </Link>
                                                )}
                                                <button onClick={() => updateQuoteStatus(quote.id, "rejected")}
                                                    style={{ padding: "7px 12px", fontSize: 13, border: "1px solid var(--color-border)", borderRadius: 8, background: "none", color: "var(--color-muted)", cursor: "pointer", fontWeight: 600 }}>
                                                    {L.reject}
                                                </button>
                                                <label style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, color: "var(--color-primary)", fontWeight: 600 }}>
                                                    <input type="checkbox" checked={isSelected} onChange={() => toggleCompare(quote.id)} style={{ width: 15, height: 15, accentColor: "var(--color-primary)", cursor: "pointer" }} />
                                                    {L.compare}
                                                </label>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* COMPARE VIEW */}
                        {activeView === "compare" && compareQuotes.length > 0 && (
                            <div>
                                <button onClick={() => setActiveView("list")} style={{ marginBottom: 16, border: "none", background: "none", cursor: "pointer", color: "var(--color-primary)", fontWeight: 700, fontSize: 13 }}>
                                    ← {L.exitCompare}
                                </button>
                                <div style={{ overflowX: "auto" }}>
                                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                                        <thead>
                                            <tr style={{ background: "var(--color-surface)" }}>
                                                <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700, color: "var(--color-muted)", borderBottom: "1px solid var(--color-border)" }}>
                                                    Параметр / Parameter
                                                </th>
                                                {compareQuotes.map(q => (
                                                    <th key={q.id} style={{ padding: "10px 12px", textAlign: "center", fontWeight: 800, color: "var(--color-text)", borderBottom: "1px solid var(--color-border)" }}>
                                                        {q.company}
                                                        {q.verified && <span style={{ marginLeft: 4, fontSize: 10, color: "#854d0e" }}>✓</span>}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { label: L.perUnit, fn: (q: Quote) => `${q.currency}${q.pricePerUnit.toFixed(2)}`, bestFn: (qs: Quote[]) => Math.min(...qs.map(q => q.pricePerUnit)) },
                                                { label: L.total, fn: (q: Quote) => `${q.currency}${q.totalPrice.toLocaleString()}`, bestFn: (qs: Quote[]) => Math.min(...qs.map(q => q.totalPrice)) },
                                                { label: L.moq, fn: (q: Quote) => `${q.moq} шт`, bestFn: (qs: Quote[]) => Math.min(...qs.map(q => q.moq)) },
                                                { label: L.leadTime, fn: (q: Quote) => q.leadTime, bestFn: (qs: Quote[]) => Math.min(...qs.map(q => parseInt(q.leadTime))) },
                                                { label: L.delivery, fn: (q: Quote) => q.deliveryDate, bestFn: null },
                                                { label: "★ " + (lang === "ru" ? "Рейтинг" : "Rating"), fn: (q: Quote) => q.rating.toFixed(1), bestFn: (qs: Quote[]) => Math.max(...qs.map(q => q.rating)) },
                                            ].map((row, i) => (
                                                <tr key={i} style={{ background: i % 2 === 0 ? "white" : "var(--color-surface)" }}>
                                                    <td style={{ padding: "10px 12px", fontWeight: 600, color: "var(--color-muted)", borderBottom: "1px solid var(--color-border)" }}>{row.label}</td>
                                                    {compareQuotes.map(q => {
                                                        const isBest = row.bestFn ? (
                                                            typeof row.bestFn(compareQuotes) === "number" &&
                                                            (row.label === "★ " + (lang === "ru" ? "Рейтинг" : "Rating")
                                                                ? q.rating === row.bestFn(compareQuotes)
                                                                : (q.pricePerUnit === row.bestFn(compareQuotes) || q.totalPrice === row.bestFn(compareQuotes) || q.moq === row.bestFn(compareQuotes) || parseInt(q.leadTime) === row.bestFn(compareQuotes))
                                                            )
                                                        ) : false;
                                                        return (
                                                            <td key={q.id} style={{
                                                                padding: "10px 12px", textAlign: "center",
                                                                fontWeight: isBest ? 800 : 500,
                                                                color: isBest ? "#15803d" : "var(--color-text)",
                                                                background: isBest ? "#f0fdf4" : undefined,
                                                                borderBottom: "1px solid var(--color-border)",
                                                            }}>
                                                                {isBest && "✓ "}{row.fn(q)}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                                    {compareQuotes.map(q => (
                                        <button key={q.id} onClick={() => updateQuoteStatus(q.id, "accepted")}
                                            className="btn btn-primary" style={{ flex: 1, fontSize: 13 }}>
                                            ✓ {q.company}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right sidebar */}
                <div style={{ position: "sticky", top: 84 }}>
                    <Link href="/rfq/new" className="btn btn-primary" style={{ width: "100%", display: "block", textAlign: "center", marginBottom: 16, fontSize: 14 }}>
                        {L.newRFQ}
                    </Link>

                    {/* Activity feed */}
                    <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 18 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 14, color: "var(--color-text)" }}>
                            📋 {lang === "ru" ? "Активность" : "Activity"}
                        </div>
                        {[
                            { icon: "📨", text: lang === "ru" ? "UzTextile Pro прислал КП" : "UzTextile Pro sent a quote", time: "2 ч. назад" },
                            { icon: "👁️", text: lang === "ru" ? "SportTex UZ просмотрел заявку" : "SportTex UZ viewed the RFQ", time: "4 ч. назад" },
                            { icon: "📨", text: lang === "ru" ? "SportTex UZ прислал КП" : "SportTex UZ sent a quote", time: "5 ч. назад" },
                            { icon: "📨", text: lang === "ru" ? "StyleFactory прислал КП" : "StyleFactory sent a quote", time: "8 ч. назад" },
                            { icon: "✅", text: lang === "ru" ? "Заявка опубликована" : "RFQ published", time: "10 ч. назад" },
                        ].map((item, i) => (
                            <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--color-border)", fontSize: 12 }}>
                                <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                                <div>
                                    <div style={{ color: "var(--color-text)", lineHeight: 1.4 }}>{item.text}</div>
                                    <div style={{ color: "var(--color-muted)", marginTop: 2 }}>{item.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
