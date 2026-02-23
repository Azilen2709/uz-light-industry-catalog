"use client";
import Link from "next/link";
import { useState } from "react";
import { useT } from "@/contexts/LanguageContext";

// ─── Mock data (for orders/saved) ─────────────────────────────────────────

const BUYER_STATS = { activeRFQs: 3, totalOrders: 12, pendingQuotes: 7, savedFactories: 5 };

const MY_RFQS = [
    { id: 1, title: "Худи оверсайз 500 шт", status: "active", quotes: 3, created: "23 фев", industry: "Текстиль 🧵" },
    { id: 2, title: "Шёлковые платья 200 шт", status: "matched", quotes: 1, created: "19 фев", industry: "Шёлк 🪡" },
    { id: 3, title: "Кожаные ремни 1000 шт", status: "closed", quotes: 5, created: "10 фев", industry: "Кожа 🟤" },
];

const MY_ORDERS = [
    { id: 101, factory: "UzTextile Pro", item: "Худи оверсайз", qty: "200 шт", total: "$840", status: "in_production", date: "15 мар 2026" },
    { id: 102, factory: "SilkRoad Fabrics", item: "Шёлк натуральный", qty: "50 м", total: "$1 250", status: "delivered", date: "5 фев 2026" },
    { id: 103, factory: "StyleFactory", item: "Поло White Label", qty: "50 шт", total: "$175", status: "paid", date: "22 мар 2026" },
];

const SAVED = [
    { id: 1, name: "UzTextile Pro", region: "Ташкент", rating: 4.8, verified: true },
    { id: 6, name: "Bukhara Carpet House", region: "Бухара", rating: 4.9, verified: true },
    { id: 3, name: "StyleFactory", region: "Самарканд", rating: 4.6, verified: true },
];

const rfqStatusCfg = {
    active: { color: "#d97706", bg: "#fef3c7", label: { ru: "Активна", en: "Active" } },
    matched: { color: "#15803d", bg: "#dcfce7", label: { ru: "Подобрана", en: "Matched" } },
    closed: { color: "#6b7280", bg: "#f3f4f6", label: { ru: "Закрыта", en: "Closed" } },
};

const orderStatusCfg = {
    paid: { icon: "✅", color: "#15803d", label: { ru: "Оплачен", en: "Paid" } },
    in_production: { icon: "⚙️", color: "#d97706", label: { ru: "В производстве", en: "In Production" } },
    delivered: { icon: "📦", color: "#2563eb", label: { ru: "Доставлен", en: "Delivered" } },
};

// ─── Component ────────────────────────────────────────────────────────────

interface BuyerDashboardClientProps {
    user: { name: string; email: string };
    myRfqs: any[];
}

export default function BuyerDashboardClient({ user, myRfqs }: BuyerDashboardClientProps) {
    const { lang } = useT();
    const [tab, setTab] = useState<"rfq" | "orders" | "saved">("rfq");

    const L = {
        ru: {
            greeting: "Здравствуйте,", user: user.name || user.email,
            role: "Покупатель", logout: "Выйти",
            statRFQ: "Активных RFQ", statOrders: "Всего заказов",
            statQuotes: "Ожидают ответа", statSaved: "Избранных фабрик",
            tabRFQ: "Мои заявки", tabOrders: "Заказы", tabSaved: "Избранное",
            newRFQ: "+ Новый RFQ",
            rfqTitle: "Название заявки", rfqIndustry: "Направление",
            rfqQuotes: "КП", rfqCreated: "Дата", rfqStatus: "Статус",
            orderId: "Заказ", orderFactory: "Фабрика", orderItem: "Товар",
            orderQty: "Кол-во", orderTotal: "Сумма", orderStatus: "Статус", orderDate: "Дата",
            savedName: "Фабрика", savedRegion: "Регион", savedRating: "Рейтинг",
            contactBtn: "Написать", viewBtn: "Открыть",
            home: "Главная",
        },
        en: {
            greeting: "Welcome,", user: user.name || user.email,
            role: "Buyer", logout: "Sign Out",
            statRFQ: "Active RFQs", statOrders: "Total Orders",
            statQuotes: "Pending Quotes", statSaved: "Saved Factories",
            tabRFQ: "My RFQs", tabOrders: "Orders", tabSaved: "Saved",
            newRFQ: "+ New RFQ",
            rfqTitle: "Request", rfqIndustry: "Industry",
            rfqQuotes: "Quotes", rfqCreated: "Date", rfqStatus: "Status",
            orderId: "Order", orderFactory: "Factory", orderItem: "Item",
            orderQty: "Qty", orderTotal: "Total", orderStatus: "Status", orderDate: "Date",
            savedName: "Factory", savedRegion: "Region", savedRating: "Rating",
            contactBtn: "Message", viewBtn: "View",
            home: "Home",
        },
    }[lang];

    const statCards = [
        { icon: "📐", value: myRfqs.length, label: L.statRFQ, color: "#7c3aed", bg: "#ede9fe" },
        { icon: "📦", value: BUYER_STATS.totalOrders, label: L.statOrders, color: "#2563eb", bg: "#dbeafe" },
        { icon: "📨", value: BUYER_STATS.pendingQuotes, label: L.statQuotes, color: "#d97706", bg: "#fef3c7" },
        { icon: "⭐", value: BUYER_STATS.savedFactories, label: L.statSaved, color: "#15803d", bg: "#dcfce7" },
    ];

    const tableHead = { fontSize: 11, fontWeight: 700, color: "var(--color-muted)", padding: "10px 14px", textAlign: "left" as const, textTransform: "uppercase" as const, letterSpacing: "0.05em", borderBottom: "1px solid var(--color-border)" };
    const tableCell = { fontSize: 13, padding: "12px 14px", borderBottom: "1px solid var(--color-border)", verticalAlign: "middle" as const };

    return (
        <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
            {/* Top bar */}
            <div style={{ background: "linear-gradient(135deg, var(--color-primary), #0a2a45)", padding: "20px 0" }}>
                <div className="container" style={{ padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{
                            width: 48, height: 48, borderRadius: "50%",
                            background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "white", fontWeight: 900,
                        }}>А</div>
                        <div>
                            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{L.greeting}</div>
                            <div style={{ color: "white", fontWeight: 900, fontSize: 18 }}>{L.user}</div>
                            <span style={{ fontSize: 10, background: "#dbeafe", color: "#1d4ed8", fontWeight: 700, borderRadius: 8, padding: "2px 8px" }}>🛒 {L.role}</span>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <Link href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>{L.home}</Link>
                        <Link href="/auth/login" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "6px 12px" }}>{L.logout}</Link>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: "24px 24px" }}>
                {/* Stat cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
                    {statCards.map(s => (
                        <div key={s.label} style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 14, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                            <div style={{ width: 48, height: 48, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                                {s.icon}
                            </div>
                            <div>
                                <div style={{ fontSize: 28, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
                                <div style={{ fontSize: 11, color: "var(--color-muted)", marginTop: 3 }}>{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, overflow: "hidden" }}>
                    <div style={{ borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
                        <div style={{ display: "flex" }}>
                            {([
                                { key: "rfq" as const, label: L.tabRFQ },
                                { key: "orders" as const, label: L.tabOrders },
                                { key: "saved" as const, label: L.tabSaved },
                            ]).map(t => (
                                <button key={t.key} onClick={() => setTab(t.key)} style={{
                                    padding: "14px 16px", border: "none", background: "none", cursor: "pointer",
                                    fontWeight: tab === t.key ? 800 : 500, fontSize: 14,
                                    color: tab === t.key ? "var(--color-primary)" : "var(--color-muted)",
                                    borderBottom: tab === t.key ? "2px solid var(--color-primary)" : "2px solid transparent",
                                    marginBottom: -1, transition: "all 0.15s",
                                }}>
                                    {t.label}
                                </button>
                            ))}
                        </div>
                        {tab === "rfq" && (
                            <Link href="/rfq/new" className="btn btn-primary" style={{ fontSize: 13, padding: "8px 16px" }}>
                                {L.newRFQ}
                            </Link>
                        )}
                    </div>

                    {/* RFQ tab */}
                    {tab === "rfq" && (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead><tr>
                                {[L.rfqTitle, L.rfqIndustry, L.rfqQuotes, L.rfqCreated, L.rfqStatus, ""].map(h => (
                                    <th key={h} style={tableHead}>{h}</th>
                                ))}
                            </tr></thead>
                            <tbody>
                                {myRfqs.map(rfq => {
                                    // If status is OPEN, map to "active", IN_PROGRESS -> "matched", CLOSED -> "closed"
                                    const mappedStatus = rfq.status === "OPEN" ? "active" : rfq.status === "IN_PROGRESS" ? "matched" : "closed";
                                    const cfg = rfqStatusCfg[mappedStatus as keyof typeof rfqStatusCfg];
                                    return (
                                        <tr key={rfq.id} style={{ background: "white" }}>
                                            <td style={tableCell}><span style={{ fontWeight: 700 }}>{rfq.title}</span></td>
                                            <td style={tableCell}>{rfq.category}</td>
                                            <td style={tableCell}>
                                                <span style={{ background: "#dbeafe", color: "#1d4ed8", fontWeight: 700, fontSize: 12, borderRadius: 8, padding: "3px 10px" }}>
                                                    {rfq._count?.responses || 0} КП
                                                </span>
                                            </td>
                                            <td style={tableCell}>{new Date(rfq.createdAt).toLocaleDateString(lang)}</td>
                                            <td style={tableCell}>
                                                <span style={{ background: cfg.bg, color: cfg.color, fontWeight: 700, fontSize: 11, borderRadius: 8, padding: "3px 10px" }}>
                                                    {cfg.label[lang]}
                                                </span>
                                            </td>
                                            <td style={tableCell}>
                                                <Link href={`/rfq/${rfq.id}`} style={{ fontSize: 12, fontWeight: 600, color: "var(--color-primary)", textDecoration: "none" }}>
                                                    {L.viewBtn} →
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}

                    {/* Orders tab */}
                    {tab === "orders" && (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead><tr>
                                {[L.orderId, L.orderFactory, L.orderItem, L.orderQty, L.orderTotal, L.orderStatus, L.orderDate].map(h => (
                                    <th key={h} style={tableHead}>{h}</th>
                                ))}
                            </tr></thead>
                            <tbody>
                                {MY_ORDERS.map(order => {
                                    const cfg = orderStatusCfg[order.status as keyof typeof orderStatusCfg];
                                    return (
                                        <tr key={order.id}>
                                            <td style={tableCell}><span style={{ fontWeight: 700, color: "var(--color-muted)" }}>#{order.id}</span></td>
                                            <td style={tableCell}><span style={{ fontWeight: 700 }}>{order.factory}</span></td>
                                            <td style={tableCell}>{order.item}</td>
                                            <td style={tableCell}>{order.qty}</td>
                                            <td style={tableCell}><strong style={{ color: "var(--color-primary)" }}>{order.total}</strong></td>
                                            <td style={tableCell}>
                                                <span style={{ fontSize: 12, fontWeight: 700, color: cfg.color }}>
                                                    {cfg.icon} {cfg.label[lang]}
                                                </span>
                                            </td>
                                            <td style={tableCell}>{order.date}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}

                    {/* Saved tab */}
                    {tab === "saved" && (
                        <div style={{ padding: 20, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                            {SAVED.map(f => (
                                <div key={f.id} style={{ border: "1px solid var(--color-border)", borderRadius: 14, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, var(--color-primary), #5eb8ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏭</div>
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: 14 }}>{f.name}</div>
                                            <div style={{ fontSize: 11, color: "var(--color-muted)" }}>📍 {f.region}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <span style={{ color: "#f59e0b", fontSize: 14 }}>★ {f.rating}</span>
                                        {f.verified && <span style={{ fontSize: 10, background: "#fef9c3", color: "#854d0e", fontWeight: 700, borderRadius: 8, padding: "2px 8px" }}>✓ Verified</span>}
                                    </div>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <Link href={`/companies/${f.id}`} style={{ flex: 1, textAlign: "center", padding: "6px 0", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: "none", color: "var(--color-text-secondary)" }}>
                                            {L.viewBtn}
                                        </Link>
                                        <Link href="/messages" style={{ flex: 1, textAlign: "center", padding: "6px 0", background: "var(--color-primary)", borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: "none", color: "white" }}>
                                            {L.contactBtn}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
