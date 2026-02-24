"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Rfq = {
    id: string;
    title: string;
    status: string;
    quantity: string;
    createdAt: string;
    buyer: { name: string; email: string };
    responsesCount: number;
};

const statusColors: any = {
    OPEN: { bg: "#fef3c7", fg: "#d97706" },
    IN_PROGRESS: { bg: "#dbeafe", fg: "#2563eb" },
    CLOSED: { bg: "#f1f5f9", fg: "#64748b" },
    CANCELLED: { bg: "#fee2e2", fg: "#dc2626" },
};

export default function RfqClient({ initialRfqs }: { initialRfqs: Rfq[] }) {
    const [rfqs, setRfqs] = useState<Rfq[]>(initialRfqs);
    const [cancelling, setCancelling] = useState<string | null>(null);
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const filtered = rfqs.filter(r => {
        const matchSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.buyer.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === "ALL" || r.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const handleCancel = async (id: string) => {
        if (!confirm("Вы уверены, что хотите отменить эту заявку? (Действие нельзя отменить)")) return;
        setCancelling(id);
        try {
            const res = await fetch(`/api/admin/rfq/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "CANCELLED" })
            });
            if (res.ok) {
                setRfqs(rfqs.map(r => r.id === id ? { ...r, status: "CANCELLED" } : r));
                router.refresh();
            } else {
                alert("Ошибка при отмене заявки");
            }
        } catch (e) {
            console.error(e);
        }
        setCancelling(null);
    };

    return (
        <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "var(--color-text)" }}>Global RFQ Board</h1>

            <div style={{ background: "white", padding: 20, borderRadius: 12, border: "1px solid var(--color-border)", marginBottom: 24, display: "flex", gap: 16 }}>
                <input
                    type="text"
                    placeholder="Поиск по названию или покупателю..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ flex: 1, padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: 8 }}
                />
                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    style={{ padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: 8, cursor: "pointer", minWidth: 150 }}
                >
                    <option value="ALL">Все статусы</option>
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="CLOSED">CLOSED</option>
                    <option value="CANCELLED">CANCELLED</option>
                </select>
            </div>

            <div style={{ background: "white", borderRadius: 12, border: "1px solid var(--color-border)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
                        <tr>
                            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "var(--color-muted)" }}>ID / Название</th>
                            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "var(--color-muted)" }}>Покупатель</th>
                            <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "var(--color-muted)" }}>Откликов</th>
                            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "var(--color-muted)" }}>Даты</th>
                            <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 700, color: "var(--color-muted)" }}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(r => {
                            const c = statusColors[r.status] || statusColors.OPEN;
                            return (
                                <tr key={r.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                                    <td style={{ padding: "12px 16px" }}>
                                        <div style={{ fontWeight: 600, color: "var(--color-text)", fontSize: 14 }}>
                                            <Link href={`/rfq/${r.id}`} target="_blank" style={{ color: "var(--color-primary)", textDecoration: "none" }}>
                                                {r.title}
                                            </Link>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                                            <span style={{ fontSize: 11, color: "var(--color-muted)" }}>#{r.id.substring(r.id.length - 6)}</span>
                                            <span style={{ background: c.bg, color: c.fg, fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>
                                                {r.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={{ padding: "12px 16px" }}>
                                        <div style={{ fontWeight: 500 }}>{r.buyer.name}</div>
                                        <div style={{ color: "var(--color-muted)", fontSize: 12 }}>{r.buyer.email}</div>
                                    </td>
                                    <td style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, fontSize: 14, color: r.responsesCount > 0 ? "#15803d" : "var(--color-muted)" }}>
                                        {r.responsesCount}
                                    </td>
                                    <td style={{ padding: "12px 16px", color: "var(--color-text-secondary)" }}>
                                        {new Date(r.createdAt).toLocaleDateString("ru-RU")}
                                    </td>
                                    <td style={{ padding: "12px 16px", textAlign: "right" }}>
                                        {r.status === "OPEN" || r.status === "IN_PROGRESS" ? (
                                            <button
                                                onClick={() => handleCancel(r.id)}
                                                disabled={cancelling === r.id}
                                                style={{ padding: "6px 12px", border: "none", borderRadius: 6, background: "#fee2e2", color: "#b91c1c", cursor: "pointer", fontWeight: 600 }}
                                            >
                                                {cancelling === r.id ? "Ожидайте..." : "Отменить"}
                                            </button>
                                        ) : (
                                            <span style={{ color: "var(--color-muted)", fontSize: 12 }}>Завершена</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
