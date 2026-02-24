"use client";
import Link from "next/link";
import { useState } from "react";
import { useT } from "@/contexts/LanguageContext";
import { Company, Product } from "@prisma/client";

// ─── Mock Data for orders/rfqs (temporary) ────────────────────────────────

const SELLER_STATS = { newRFQs: 5, activeOrders: 3, monthlyRevenue: "$12 400", rating: 4.8 };

const INCOMING_RFQS = [
    { id: 1, buyer: "Азиза Р.", country: "🇰🇿", title: "Худи оверсайз 500 шт", qty: "500 шт", budget: "$2 000–3 000", deadline: "10 мар", status: "new" },
    { id: 4, buyer: "Klaus M.", country: "🇩🇪", title: "Хлопковые футболки 2000 шт", qty: "2 000 шт", budget: "$6 000+", deadline: "1 апр", status: "new" },
    { id: 5, buyer: "Дмитрий С.", country: "🇷🇺", title: "Поло White Label 300 шт", qty: "300 шт", budget: "$1 500", deadline: "20 мар", status: "responded" },
];

const ACTIVE_ORDERS = [
    { id: 201, buyer: "Михаил К.", product: "Худи базовое оверсайз", qty: "200 шт", total: "$840", stage: "cutting", progress: 35, dueDate: "15 мар" },
    { id: 202, buyer: "Tomasz W.", product: "Basic Hoodie", qty: "500 шт", total: "$2 100", stage: "sewing", progress: 68, dueDate: "22 мар" },
    { id: 203, buyer: "Ahmed A.", product: "Sport T-shirt", qty: "1 000 шт", total: "$3 200", stage: "qc", progress: 90, dueDate: "28 мар" },
];

const STAGES: Record<string, { ru: string; en: string; color: string }> = {
    cutting: { ru: "Раскрой", en: "Cutting", color: "#d97706" },
    sewing: { ru: "Пошив", en: "Sewing", color: "#2563eb" },
    qc: { ru: "Контроль качества", en: "QC", color: "#7c3aed" },
    packing: { ru: "Упаковка", en: "Packing", color: "#0891b2" },
    shipped: { ru: "Отгружено", en: "Shipped", color: "#15803d" },
};

const rfqStatusCfg = {
    new: { color: "#d97706", bg: "#fef3c7", label: { ru: "Новый", en: "New" } },
    responded: { color: "#15803d", bg: "#dcfce7", label: { ru: "Ответил", en: "Responded" } },
    declined: { color: "#dc2626", bg: "#fee2e2", label: { ru: "Отклонён", en: "Declined" } },
};

// ─── Component ────────────────────────────────────────────────────────────

interface SellerDashboardClientProps {
    company: Company;
    myProducts: Product[];
    rfqs?: any[]; // Open RFQs + RFQs this seller responded to
}

export default function SellerDashboardClient({ company, myProducts, rfqs = [] }: SellerDashboardClientProps) {
    const { lang } = useT();
    const [tab, setTab] = useState<"rfq" | "orders" | "products">("rfq");

    const L = {
        ru: {
            greeting: "Здравствуйте,", logout: "Выйти",
            role: "Поставщик", home: "Главная",
            statRFQ: "Новых RFQ", statOrders: "Активных заказов",
            statRevenue: "Выручка за месяц", statRating: "Рейтинг",
            tabRFQ: "Входящие RFQ", tabOrders: "Заказы", tabProducts: "Мои товары",
            addProduct: "+ Добавить товар",
            rfqBuyer: "Покупатель", rfqRequest: "Запрос", rfqQty: "Объём", rfqBudget: "Бюджет",
            rfqDeadline: "Дедлайн", rfqStatus: "Статус", rfqAction: "Действие",
            respond: "Ответить", view: "Смотреть",
            orderBuyer: "Покупатель", orderProduct: "Товар", orderQty: "Кол-во",
            orderTotal: "Сумма", orderStage: "Стадия", orderDue: "Срок",
            progress: "Готовность",
            prodTitle: "Товар", prodType: "Тип", prodPrice: "Цена",
            prodMoq: "МЗК", prodEdit: "Редактировать",
        },
        en: {
            greeting: "Welcome,", logout: "Sign Out",
            role: "Supplier", home: "Home",
            statRFQ: "New RFQs", statOrders: "Active Orders",
            statRevenue: "Monthly Revenue", statRating: "Rating",
            tabRFQ: "Incoming RFQs", tabOrders: "Orders", tabProducts: "My Products",
            addProduct: "+ Add Product",
            rfqBuyer: "Buyer", rfqRequest: "Request", rfqQty: "Volume", rfqBudget: "Budget",
            rfqDeadline: "Deadline", rfqStatus: "Status", rfqAction: "Action",
            respond: "Respond", view: "View",
            orderBuyer: "Buyer", orderProduct: "Product", orderQty: "Qty",
            orderTotal: "Total", orderStage: "Stage", orderDue: "Due",
            progress: "Progress",
            prodTitle: "Product", prodType: "Type", prodPrice: "Price",
            prodMoq: "MOQ", prodEdit: "Edit",
        },
    }[lang];

    const flowColors = { instock: { bg: "#dcfce7", text: "#15803d", label: { ru: "Со склада", en: "In-Stock" } }, whitelabel: { bg: "#dbeafe", text: "#1d4ed8", label: { ru: "White Label", en: "White Label" } }, rfq: { bg: "#ede9fe", text: "#6d28d9", label: { ru: "RFQ", en: "RFQ" } } };

    const tableHead = { fontSize: 11, fontWeight: 700, color: "var(--color-muted)", padding: "10px 14px", textAlign: "left" as const, textTransform: "uppercase" as const, letterSpacing: "0.05em", borderBottom: "1px solid var(--color-border)" };
    const tableCell = { fontSize: 13, padding: "12px 14px", borderBottom: "1px solid var(--color-border)", verticalAlign: "middle" as const };

    return (
        <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
            {/* Top bar */}
            <div style={{ background: "linear-gradient(135deg, #0f3460, #16213e)", padding: "20px 0" }}>
                <div className="container" style={{ padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, var(--color-primary), #5eb8ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏭</div>
                        <div>
                            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{L.greeting}</div>
                            <div style={{ color: "white", fontWeight: 900, fontSize: 18 }}>{company.name}</div>
                            <span style={{ fontSize: 10, background: "#dcfce7", color: "#15803d", fontWeight: 700, borderRadius: 8, padding: "2px 8px" }}>🏭 {L.role}</span>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                        <Link href={`/companies/${company.id}`} style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "6px 12px" }}>
                            🏭 {lang === "ru" ? "Мой профиль" : "My Profile"}
                        </Link>
                        <Link href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>{L.home}</Link>
                        <Link href="/auth/login" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "6px 12px" }}>{L.logout}</Link>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: "24px 24px" }}>
                {/* Stat cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
                    {[
                        { icon: "📨", value: SELLER_STATS.newRFQs, label: L.statRFQ, color: "#d97706", bg: "#fef3c7" },
                        { icon: "⚙️", value: SELLER_STATS.activeOrders, label: L.statOrders, color: "#2563eb", bg: "#dbeafe" },
                        { icon: "💰", value: SELLER_STATS.monthlyRevenue, label: L.statRevenue, color: "#15803d", bg: "#dcfce7" },
                        { icon: "⭐", value: SELLER_STATS.rating, label: L.statRating, color: "#f59e0b", bg: "#fef3c7" },
                    ].map(s => (
                        <div key={s.label} style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 14, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                            <div style={{ width: 48, height: 48, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{s.icon}</div>
                            <div>
                                <div style={{ fontSize: typeof s.value === "string" ? 18 : 28, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
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
                                { key: "products" as const, label: L.tabProducts },
                            ]).map(t => (
                                <button key={t.key} onClick={() => setTab(t.key)} style={{
                                    padding: "14px 16px", border: "none", background: "none", cursor: "pointer",
                                    fontWeight: tab === t.key ? 800 : 500, fontSize: 14,
                                    color: tab === t.key ? "var(--color-primary)" : "var(--color-muted)",
                                    borderBottom: tab === t.key ? "2px solid var(--color-primary)" : "2px solid transparent",
                                    marginBottom: -1, transition: "all 0.15s",
                                }}>
                                    {t.label}
                                    {t.key === "rfq" && rfqs.filter(r => r.responses.length === 0).length > 0 && (
                                        <span style={{ marginLeft: 6, background: "#ef4444", color: "white", borderRadius: 10, padding: "1px 6px", fontSize: 10, fontWeight: 700 }}>
                                            {rfqs.filter(r => r.responses.length === 0).length}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                        {tab === "products" && (
                            <Link href="/products" className="btn btn-primary" style={{ fontSize: 13, padding: "8px 14px" }}>
                                {L.addProduct}
                            </Link>
                        )}
                    </div>

                    {/* RFQ tab */}
                    {tab === "rfq" && (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead><tr>
                                {[L.rfqBuyer, L.rfqRequest, L.rfqQty, L.rfqBudget, L.rfqDeadline, L.rfqStatus, L.rfqAction].map(h => (
                                    <th key={h} style={tableHead}>{h}</th>
                                ))}
                            </tr></thead>
                            <tbody>
                                {rfqs.map(rfq => {
                                    const isResponded = rfq.responses && rfq.responses.length > 0;
                                    const statusKey = isResponded ? "responded" : "new";
                                    const cfg = rfqStatusCfg[statusKey as keyof typeof rfqStatusCfg];
                                    return (
                                        <tr key={rfq.id} style={{ background: statusKey === "new" ? "#fffbf0" : "white" }}>
                                            <td style={tableCell}><strong>{rfq.buyer?.name || "Покупатель"}</strong></td>
                                            <td style={tableCell}>{rfq.title}</td>
                                            <td style={tableCell}>{rfq.quantity}</td>
                                            <td style={tableCell}><span style={{ color: "#15803d", fontWeight: 700 }}>{rfq.budget || "—"}</span></td>
                                            <td style={tableCell}>{rfq.deadline ? new Date(rfq.deadline).toLocaleDateString(lang) : "—"}</td>
                                            <td style={tableCell}>
                                                <span style={{ background: cfg.bg, color: cfg.color, fontWeight: 700, fontSize: 11, borderRadius: 8, padding: "3px 10px" }}>
                                                    {cfg.label[lang]}
                                                </span>
                                            </td>
                                            <td style={tableCell}>
                                                <Link href={`/rfq/${rfq.id}`} className="btn btn-primary" style={{ fontSize: 12, padding: "5px 12px", textDecoration: "none" }}>
                                                    {statusKey === "new" ? L.respond : L.view}
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}

                    {/* Orders tab with progress bars */}
                    {tab === "orders" && (
                        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                            {ACTIVE_ORDERS.map(order => {
                                const stage = STAGES[order.stage];
                                return (
                                    <div key={order.id} style={{ border: "1px solid var(--color-border)", borderRadius: 14, padding: "16px 20px" }}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                                            <div>
                                                <span style={{ color: "var(--color-muted)", fontSize: 12, marginRight: 8 }}>#{order.id}</span>
                                                <strong style={{ fontSize: 15 }}>{order.product}</strong>
                                                <span style={{ marginLeft: 10, fontSize: 12, color: "var(--color-muted)" }}>→ {order.buyer}</span>
                                            </div>
                                            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                                <span style={{ fontSize: 12, color: "var(--color-muted)" }}>📅 {order.dueDate}</span>
                                                <strong style={{ color: "var(--color-primary)" }}>{order.total}</strong>
                                                <span style={{ background: `${stage.color}20`, color: stage.color, fontSize: 11, fontWeight: 700, borderRadius: 8, padding: "3px 10px" }}>
                                                    {stage[lang]}
                                                </span>
                                            </div>
                                        </div>
                                        {/* Progress bar */}
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <div style={{ flex: 1, height: 8, background: "var(--color-surface)", borderRadius: 4, overflow: "hidden" }}>
                                                <div style={{ width: `${order.progress}%`, height: "100%", background: `linear-gradient(90deg, ${stage.color}, ${stage.color}cc)`, borderRadius: 4, transition: "width 0.5s" }} />
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: stage.color, flexShrink: 0 }}>{order.progress}%</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Products tab */}
                    {tab === "products" && (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead><tr>
                                {[L.prodTitle, L.prodType, L.prodPrice, L.prodMoq, L.prodEdit].map(h => (
                                    <th key={h} style={tableHead}>{h}</th>
                                ))}
                            </tr></thead>
                            <tbody>
                                {myProducts.map(p => {
                                    const fc = flowColors[p.type as keyof typeof flowColors];
                                    return (
                                        <tr key={p.id}>
                                            <td style={tableCell}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                    <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #f0f6ff, #e8efff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🧵</div>
                                                    <span style={{ fontWeight: 700 }}>{lang === "ru" ? p.titleRu : p.titleEn}</span>
                                                </div>
                                            </td>
                                            <td style={tableCell}>
                                                <span style={{ background: fc.bg, color: fc.text, fontSize: 11, fontWeight: 700, borderRadius: 8, padding: "3px 10px" }}>
                                                    {fc.label[lang]}
                                                </span>
                                            </td>
                                            <td style={tableCell}><strong style={{ color: "var(--color-primary)" }}>{p.priceCurrency}{p.priceFrom}–{p.priceTo}</strong></td>
                                            <td style={tableCell}>{p.moq}</td>
                                            <td style={tableCell}>
                                                <Link href={`/products/${p.id}`} style={{ fontSize: 12, fontWeight: 600, color: "var(--color-primary)", textDecoration: "none" }}>
                                                    {L.prodEdit} →
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
