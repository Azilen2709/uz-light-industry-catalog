"use client";
import Link from "next/link";
import { useState } from "react";
import { useT } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";

const statusConfig = {
    OPEN: { icon: "🟡", label: { ru: "Активна", en: "Active" }, color: "#d97706" },
    IN_PROGRESS: { icon: "🔵", label: { ru: "В процессе", en: "In Progress" }, color: "#2563eb" },
    CLOSED: { icon: "⚫", label: { ru: "Закрыта", en: "Closed" }, color: "#6b7280" },
    CANCELLED: { icon: "🔴", label: { ru: "Снята", en: "Cancelled" }, color: "#ef4444" },
};

const quoteStatusConfig = {
    NEW: { color: "#d97706", bg: "#fef3c7", label: { ru: "Новая", en: "New" } },
    VIEWED: { color: "#0369a1", bg: "#e0f2fe", label: { ru: "Просмотрено", en: "Viewed" } },
    ACCEPTED: { color: "#15803d", bg: "#dcfce7", label: { ru: "Принята", en: "Accepted" } },
    REJECTED: { color: "#dc2626", bg: "#fee2e2", label: { ru: "Отклонена", en: "Rejected" } },
};

export default function RfqDetailClient({ rfq, currentUser }: { rfq: any, currentUser: any }) {
    const { lang } = useT();
    const router = useRouter();
    const [quotes, setQuotes] = useState<any[]>(rfq.responses || []);
    const [compareIds, setCompareIds] = useState<string[]>([]);
    const [activeView, setActiveView] = useState<"list" | "compare">("list");

    const [price, setPrice] = useState("");
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const isSeller = currentUser.role === "SELLER";
    const hasResponded = isSeller && quotes.length > 0;

    const L = {
        ru: {
            home: "Главная", rfq: "Заявки",
            badge: "Статус заявки",
            created: "Создана", deadline: "Дедлайн", qty: "Объём", budget: "Бюджет",
            description: "Описание заявки",
            quotesTitle: isSeller ? "Ваше предложение" : "Входящие предложения",
            noQuotes: isSeller ? "" : "Пока нет предложений. Обычно фабрики отвечают в течение 24 часов.",
            accept: "Принять КП", reject: "Отклонить", contact: "Написать", viewFactory: "Профиль",
            price: "Ориентировочная цена", commentLabel: "Комментарий",
            compare: "Сравнить", compareMode: "Режим сравнения", exitCompare: "Выйти из сравнения",
            selected: "выбрано", verified: "Проверена",
            newRFQ: "+ Новая заявка",
            submit: "Отправить КП", submitting: "Отправка..."
        },
        en: {
            home: "Home", rfq: "Requests",
            badge: "Request Status",
            created: "Created", deadline: "Due Date", qty: "Volume", budget: "Budget",
            description: "Request Description",
            quotesTitle: isSeller ? "Your Quote" : "Incoming Quotes",
            noQuotes: isSeller ? "" : "No quotes yet. Factories usually respond within 24 hours.",
            accept: "Accept Quote", reject: "Decline", contact: "Message", viewFactory: "Profile",
            price: "Estimated Price", commentLabel: "Comment",
            compare: "Compare", compareMode: "Comparison Mode", exitCompare: "Exit Compare",
            selected: "selected", verified: "Verified",
            newRFQ: "+ New RFQ",
            submit: "Submit Quote", submitting: "Submitting..."
        },
    }[lang];

    const toggleCompare = (id: string) =>
        setCompareIds(ids => ids.includes(id) ? ids.filter(i => i !== id) : ids.length < 3 ? [...ids, id] : ids);

    const updateQuoteStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/rfq/${rfq.id}/responses/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                setQuotes(qs => qs.map(q => q.id === id ? { ...q, status } : q));
                if (status === "ACCEPTED") router.refresh();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const submitQuote = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(`/api/rfq/${rfq.id}/respond`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ price, comment })
            });
            if (res.ok) {
                const newQuote = await res.json();
                setQuotes([newQuote]);
            } else {
                const data = await res.json();
                alert(data.error || "Failed to submit quote");
            }
        } catch (e) {
            console.error(e);
        }
        setSubmitting(false);
    };

    const rfqStatus = statusConfig[rfq.status as keyof typeof statusConfig] || statusConfig.OPEN;
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
                        <span style={{ color: "white", fontWeight: 600 }}>#{rfq.id.substring(rfq.id.length - 6)}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                                {L.badge}
                            </div>
                            <h1 style={{ color: "white", fontSize: 24, fontWeight: 900 }}>{rfq.title}</h1>
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
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 16 }}>
                            {[
                                { icon: "📅", label: L.created, value: new Date(rfq.createdAt).toLocaleDateString(lang) },
                                { icon: "⏳", label: L.deadline, value: rfq.deadline || "—" },
                                { icon: "📦", label: L.qty, value: rfq.quantity },
                                { icon: "💰", label: L.budget, value: rfq.budget || "—" },
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
                            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--color-text-secondary)", margin: 0, whiteSpace: "pre-wrap" }}>
                                {rfq.description || "—"}
                            </p>
                        </div>
                    </div>

                    {/* Quotes */}
                    <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 22 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                            <h2 style={{ fontSize: 18, fontWeight: 800 }}>
                                📨 {L.quotesTitle}
                                {!isSeller && <span style={{ marginLeft: 8, fontSize: 13, fontWeight: 600, background: "var(--color-primary)", color: "white", borderRadius: 12, padding: "2px 10px" }}>
                                    {quotes.length}
                                </span>}
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

                        {/* If seller hasn't responded */}
                        {isSeller && !hasResponded && rfq.status === "OPEN" && (
                            <form onSubmit={submitQuote} style={{ background: "#f8fafc", padding: 20, borderRadius: 12, border: "1px solid #e2e8f0" }}>
                                <div style={{ marginBottom: 16 }}>
                                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{L.price}</label>
                                    <input required value={price} onChange={e => setPrice(e.target.value)} placeholder="$4.50 / шт" style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 14 }} />
                                </div>
                                <div style={{ marginBottom: 16 }}>
                                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{L.commentLabel}</label>
                                    <textarea required value={comment} onChange={e => setComment(e.target.value)} rows={3} placeholder={lang === "ru" ? "Опишите сроки производства, МЗК и другие условия" : "Describe production time, MOQ, and other conditions"} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 14 }} />
                                </div>
                                <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: "100%" }}>
                                    {submitting ? L.submitting : L.submit}
                                </button>
                            </form>
                        )}
                        {/* If seller is viewing a closed RFQ or they missed it */}
                        {isSeller && !hasResponded && rfq.status !== "OPEN" && (
                            <p style={{ color: "var(--color-muted)", fontSize: 14 }}>RFQ is no longer open.</p>
                        )}

                        {/* LIST VIEW */}
                        {quotes.length === 0 && !isSeller && (
                            <p style={{ color: "var(--color-muted)", fontSize: 14, textAlign: "center", padding: "20px 0" }}>{L.noQuotes}</p>
                        )}

                        {activeView === "list" && quotes.length > 0 && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                {quotes.map(quote => {
                                    const qsc = quoteStatusConfig[quote.status as keyof typeof quoteStatusConfig] || quoteStatusConfig.NEW;
                                    const company = quote.seller?.company;
                                    const isSelected = compareIds.includes(quote.id);

                                    return (
                                        <div key={quote.id} style={{
                                            border: `2px solid ${isSelected ? "var(--color-primary)" : "var(--color-border)"}`,
                                            borderRadius: 14, padding: "16px 18px",
                                            background: isSelected ? "#f0f6ff" : "white",
                                            transition: "border-color 0.15s, background 0.15s",
                                        }}>
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
                                                            <span style={{ fontWeight: 800, fontSize: 15 }}>{company?.name || quote.seller.name}</span>
                                                            {company?.verified && (
                                                                <span style={{ fontSize: 10, background: "#fef9c3", color: "#854d0e", fontWeight: 700, padding: "2px 6px", borderRadius: 8 }}>✓ {L.verified}</span>
                                                            )}
                                                        </div>
                                                        <div style={{ fontSize: 12, color: "var(--color-muted)" }}>
                                                            {company ? `📍 ${company.region} · ★ ${company.rating}` : ""} · {new Date(quote.createdAt).toLocaleDateString(lang)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                    <span style={{ fontSize: 11, fontWeight: 700, background: qsc.bg, color: qsc.color, borderRadius: 8, padding: "3px 10px" }}>
                                                        {qsc.label[lang]}
                                                    </span>
                                                </div>
                                            </div>

                                            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 10, padding: "10px 12px", marginBottom: 12 }}>
                                                <div style={{ fontSize: 10, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{L.price}</div>
                                                <div style={{ fontSize: 16, fontWeight: 800, color: "var(--color-primary)" }}>{quote.price}</div>
                                            </div>

                                            {quote.comment && (
                                                <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--color-text-secondary)", background: "var(--color-surface)", borderRadius: 8, padding: "10px 12px", margin: "0 0 12px", whiteSpace: "pre-wrap" }}>
                                                    💬 {quote.comment}
                                                </p>
                                            )}

                                            {/* Actions */}
                                            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                                {!isSeller && quote.status === "NEW" && (
                                                    <button onClick={() => updateQuoteStatus(quote.id, "ACCEPTED")}
                                                        className="btn btn-primary" style={{ padding: "7px 16px", fontSize: 13 }}>
                                                        ✓ {L.accept}
                                                    </button>
                                                )}
                                                {company && (
                                                    <Link href={`/companies/${company.id}`}
                                                        style={{ padding: "7px 14px", fontSize: 13, borderRadius: 8, textDecoration: "none", background: "var(--color-surface)", color: "var(--color-text-secondary)", fontWeight: 600, border: "1px solid var(--color-border)", display: "inline-block" }}>
                                                        🏭 {L.viewFactory}
                                                    </Link>
                                                )}
                                                {!isSeller && quote.status === "NEW" && (
                                                    <button onClick={() => updateQuoteStatus(quote.id, "REJECTED")}
                                                        style={{ padding: "7px 12px", fontSize: 13, border: "1px solid var(--color-border)", borderRadius: 8, background: "none", color: "var(--color-muted)", cursor: "pointer", fontWeight: 600 }}>
                                                        {L.reject}
                                                    </button>
                                                )}
                                                {!isSeller && <label style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, color: "var(--color-primary)", fontWeight: 600 }}>
                                                    <input type="checkbox" checked={isSelected} onChange={() => toggleCompare(quote.id)} style={{ width: 15, height: 15, accentColor: "var(--color-primary)", cursor: "pointer" }} />
                                                    {L.compare}
                                                </label>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* COMPARE VIEW */}
                        {activeView === "compare" && compareQuotes.length > 0 && !isSeller && (
                            <div style={{ overflowX: "auto" }}>
                                <button onClick={() => setActiveView("list")} style={{ marginBottom: 16, border: "none", background: "none", cursor: "pointer", color: "var(--color-primary)", fontWeight: 700, fontSize: 13 }}>
                                    ← {L.exitCompare}
                                </button>
                                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                                    <thead>
                                        <tr style={{ background: "var(--color-surface)" }}>
                                            <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700, color: "var(--color-muted)", borderBottom: "1px solid var(--color-border)" }}>Параметр</th>
                                            {compareQuotes.map(q => (
                                                <th key={q.id} style={{ padding: "10px 12px", textAlign: "center", fontWeight: 800, color: "var(--color-text)", borderBottom: "1px solid var(--color-border)" }}>
                                                    {q.seller?.company?.name || q.seller.name}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ padding: "10px 12px", fontWeight: 600, color: "var(--color-muted)", borderBottom: "1px solid var(--color-border)" }}>{L.price}</td>
                                            {compareQuotes.map(q => <td key={q.id} style={{ padding: "10px 12px", textAlign: "center", borderBottom: "1px solid var(--color-border)" }}>{q.price}</td>)}
                                        </tr>
                                        <tr>
                                            <td style={{ padding: "10px 12px", fontWeight: 600, color: "var(--color-muted)", borderBottom: "1px solid var(--color-border)" }}>{L.commentLabel}</td>
                                            {compareQuotes.map(q => <td key={q.id} style={{ padding: "10px 12px", textAlign: "center", borderBottom: "1px solid var(--color-border)", fontSize: 12 }}>{q.comment || "—"}</td>)}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right sidebar */}
                <div style={{ position: "sticky", top: 84 }}>
                    {!isSeller && <Link href="/rfq/new" className="btn btn-primary" style={{ width: "100%", display: "block", textAlign: "center", marginBottom: 16, fontSize: 14 }}>
                        {L.newRFQ}
                    </Link>}
                </div>
            </div>
        </div>
    );
}
