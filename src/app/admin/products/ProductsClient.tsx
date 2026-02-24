"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Product = {
    id: number;
    titleRu: string;
    titleEn: string;
    descriptionRu: string;
    descriptionEn: string;
    priceMin: number | null;
    priceMax: number | null;
    moq: number;
    company: { name: string; slug: string };
    industrySlug: string;
};

export default function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const filtered = products.filter(p =>
        p.titleRu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: number) => {
        if (!confirm("Вы уверены, что хотите удалить этот товар навсегда?")) return;
        try {
            const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
            if (res.ok) {
                setProducts(products.filter(p => p.id !== id));
                router.refresh();
            } else {
                alert("Ошибка удаления товара");
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleSaveEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingProduct)
            });
            if (res.ok) {
                const updated = await res.json();
                setProducts(products.map(p => p.id === updated.id ? { ...p, ...updated } : p));
                setEditingProduct(null);
                router.refresh();
            } else {
                const err = await res.json();
                alert(err.error || "Ошибка сохранения");
            }
        } catch (error) {
            console.error(error);
            alert("Network error");
        }
        setSaving(false);
    };

    return (
        <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "var(--color-text)" }}>Модерация товаров</h1>

            <div style={{ background: "white", padding: 20, borderRadius: 12, border: "1px solid var(--color-border)", marginBottom: 24 }}>
                <input
                    type="text"
                    placeholder="Поиск по названию (Ru/En) или компании..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: 8 }}
                />
            </div>

            <div style={{ background: "white", borderRadius: 12, border: "1px solid var(--color-border)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
                        <tr>
                            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "var(--color-muted)" }}>ID</th>
                            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "var(--color-muted)" }}>Название (Двуязычное)</th>
                            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "var(--color-muted)" }}>Компания / Категория</th>
                            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "var(--color-muted)" }}>Цена / МЗК</th>
                            <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 700, color: "var(--color-muted)" }}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(p => (
                            <tr key={p.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                                <td style={{ padding: "12px 16px", color: "var(--color-muted)" }}>#{p.id}</td>
                                <td style={{ padding: "12px 16px" }}>
                                    <div style={{ fontWeight: 600, color: "var(--color-text)" }}>RU: {p.titleRu}</div>
                                    <div style={{ color: "var(--color-text-secondary)", marginTop: 2 }}>EN: {p.titleEn}</div>
                                </td>
                                <td style={{ padding: "12px 16px" }}>
                                    <Link href={`/companies/${p.company.slug}`} target="_blank" style={{ fontWeight: 600, color: "var(--color-primary)", textDecoration: "none" }}>{p.company.name}</Link>
                                    <div style={{ color: "var(--color-muted)", marginTop: 2 }}>{p.industrySlug}</div>
                                </td>
                                <td style={{ padding: "12px 16px", color: "var(--color-text-secondary)" }}>
                                    ${p.priceMin || 0} - ${p.priceMax || 0}
                                    <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 2 }}>MOQ: {p.moq}</div>
                                </td>
                                <td style={{ padding: "12px 16px", textAlign: "right" }}>
                                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                                        <button onClick={() => setEditingProduct(p)} style={{ padding: "6px 12px", border: "1px solid var(--color-border)", borderRadius: 6, background: "white", cursor: "pointer", fontWeight: 600 }}>Редактировать</button>
                                        <button onClick={() => handleDelete(p.id)} style={{ padding: "6px 12px", border: "none", borderRadius: 6, background: "#fee2e2", color: "#b91c1c", cursor: "pointer", fontWeight: 600 }}>Удалить</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal requiring bilingual input */}
            {editingProduct && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
                    <div style={{ background: "white", borderRadius: 16, width: "100%", maxWidth: 600, maxHeight: "90vh", overflowY: "auto", padding: 30 }}>
                        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>Редактирование товара #{editingProduct.id}</h2>

                        <div style={{ background: "#f8fafc", padding: 16, borderRadius: 8, border: "1px solid #cbd5e1", marginBottom: 20 }}>
                            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#0f172a" }}>Обязательное требование (Bilingual Requirement):</p>
                            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#475569" }}>Названия и описания товаров должны быть заполнены на двух языках (Русский и Английский) для корректной работы поисковой системы.</p>
                        </div>

                        <form onSubmit={handleSaveEdit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div style={{ display: "flex", gap: 16 }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Название (RU) *</label>
                                    <input required value={editingProduct.titleRu} onChange={e => setEditingProduct({ ...editingProduct, titleRu: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Название (EN) *</label>
                                    <input required value={editingProduct.titleEn} onChange={e => setEditingProduct({ ...editingProduct, titleEn: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Описание (RU)</label>
                                <textarea rows={3} value={editingProduct.descriptionRu} onChange={e => setEditingProduct({ ...editingProduct, descriptionRu: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Описание (EN)</label>
                                <textarea rows={3} value={editingProduct.descriptionEn} onChange={e => setEditingProduct({ ...editingProduct, descriptionEn: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                            </div>

                            <div style={{ display: "flex", gap: 16 }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Мин. цена ($)</label>
                                    <input type="number" step="0.01" value={editingProduct.priceMin || ""} onChange={e => setEditingProduct({ ...editingProduct, priceMin: parseFloat(e.target.value) })} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Макс. цена ($)</label>
                                    <input type="number" step="0.01" value={editingProduct.priceMax || ""} onChange={e => setEditingProduct({ ...editingProduct, priceMax: parseFloat(e.target.value) })} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>MOQ</label>
                                    <input type="number" required value={editingProduct.moq || ""} onChange={e => setEditingProduct({ ...editingProduct, moq: parseInt(e.target.value) })} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                                </div>
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 10 }}>
                                <button type="button" onClick={() => setEditingProduct(null)} style={{ padding: "10px 16px", border: "1px solid var(--color-border)", borderRadius: 8, background: "white", fontWeight: 600, cursor: "pointer" }}>Отмена</button>
                                <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: "10px 20px" }}>{saving ? "Сохранение..." : "Сохранить изменения"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
