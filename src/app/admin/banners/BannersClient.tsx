"use client";
import { useState, useEffect } from "react";

interface Banner {
    id: number;
    title: string;
    imageUrl: string;
    linkUrl?: string;
    isActive: boolean;
    position: number;
}

export default function BannersClient({ initialBanners }: { initialBanners: Banner[] }) {
    const [banners, setBanners] = useState<Banner[]>(initialBanners);
    const [saving, setSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: "", imageUrl: "", linkUrl: "", position: 0 });

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const res = await fetch("/api/admin/banners", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, isActive: true }),
        });
        if (res.ok) {
            const banner = await res.json();
            setBanners([...banners, banner]);
            setForm({ title: "", imageUrl: "", linkUrl: "", position: 0 });
            setShowForm(false);
        }
        setSaving(false);
    };

    const toggleActive = async (b: Banner) => {
        const res = await fetch(`/api/admin/banners/${b.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isActive: !b.isActive }),
        });
        if (res.ok) {
            setBanners(banners.map(x => x.id === b.id ? { ...x, isActive: !x.isActive } : x));
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Удалить баннер?")) return;
        const res = await fetch(`/api/admin/banners/${id}`, { method: "DELETE" });
        if (res.ok) setBanners(banners.filter(x => x.id !== id));
    };

    const updatePosition = async (id: number, position: number) => {
        await fetch(`/api/admin/banners/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ position }),
        });
        setBanners(banners.map(x => x.id === id ? { ...x, position } : x).sort((a, b) => a.position - b.position));
    };

    const inp = { padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 14, width: "100%" };

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>🖼 Управление баннерами</h1>
                    <p style={{ color: "var(--color-muted)", fontSize: 13, margin: "4px 0 0" }}>
                        Баннеры отображаются на главной странице в виде карусели. Упорядочивайте их по полю «Позиция».
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn btn-primary"
                    style={{ padding: "10px 20px", fontWeight: 700 }}
                >
                    {showForm ? "Отмена" : "+ Добавить баннер"}
                </button>
            </div>

            {/* Add banner form */}
            {showForm && (
                <form onSubmit={handleCreate} style={{ background: "white", borderRadius: 14, border: "1px solid var(--color-border)", padding: 24, marginBottom: 24 }}>
                    <h3 style={{ margin: "0 0 16px" }}>Новый баннер</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 700, color: "var(--color-muted)", display: "block", marginBottom: 6 }}>ЗАГОЛОВОК *</label>
                            <input style={inp} required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Например: Весенняя коллекция 2025" />
                        </div>
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 700, color: "var(--color-muted)", display: "block", marginBottom: 6 }}>ПОЗИЦИЯ</label>
                            <input style={inp} type="number" value={form.position} onChange={e => setForm({ ...form, position: parseInt(e.target.value) })} />
                        </div>
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 700, color: "var(--color-muted)", display: "block", marginBottom: 6 }}>URL ИЗОБРАЖЕНИЯ *</label>
                            <input style={inp} required value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." />
                        </div>
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 700, color: "var(--color-muted)", display: "block", marginBottom: 6 }}>ССЫЛКА (необязательно)</label>
                            <input style={inp} value={form.linkUrl} onChange={e => setForm({ ...form, linkUrl: e.target.value })} placeholder="/products?industry=textile" />
                        </div>
                    </div>
                    {form.imageUrl && (
                        <div style={{ marginBottom: 16 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--color-muted)", marginBottom: 8 }}>ПРЕДПРОСМОТР</div>
                            <img src={form.imageUrl} alt="preview" style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 10 }} onError={() => { }} />
                        </div>
                    )}
                    <button type="submit" disabled={saving} className="btn btn-primary">
                        {saving ? "Сохранение..." : "💾 Создать баннер"}
                    </button>
                </form>
            )}

            {/* Banners grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {banners.length === 0 && (
                    <div style={{ background: "white", borderRadius: 14, border: "1px dashed var(--color-border)", padding: 40, textAlign: "center", color: "var(--color-muted)" }}>
                        Баннеры не добавлены. Нажмите «+ Добавить баннер», чтобы создать первый.
                    </div>
                )}
                {banners.sort((a, b) => a.position - b.position).map(b => (
                    <div key={b.id} style={{
                        background: "white", borderRadius: 14, border: "1px solid var(--color-border)",
                        display: "grid", gridTemplateColumns: "200px 1fr auto", gap: 0, overflow: "hidden",
                        opacity: b.isActive ? 1 : 0.55
                    }}>
                        <img src={b.imageUrl} alt={b.title} style={{ width: 200, height: 90, objectFit: "cover" }} onError={() => { }} />
                        <div style={{ padding: "12px 20px" }}>
                            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{b.title}</div>
                            {b.linkUrl && <div style={{ fontSize: 12, color: "var(--color-accent)" }}>🔗 {b.linkUrl}</div>}
                            <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 6 }}>
                                Позиция: <input
                                    type="number"
                                    defaultValue={b.position}
                                    onBlur={e => updatePosition(b.id, parseInt(e.target.value))}
                                    style={{ width: 50, padding: "2px 6px", border: "1px solid var(--color-border)", borderRadius: 4, fontSize: 12 }}
                                />
                            </div>
                        </div>
                        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
                            <button
                                onClick={() => toggleActive(b)}
                                style={{
                                    padding: "6px 14px", border: "1px solid var(--color-border)", borderRadius: 8,
                                    background: b.isActive ? "#dcfce7" : "white", fontWeight: 600, cursor: "pointer",
                                    color: b.isActive ? "#15803d" : "var(--color-muted)", fontSize: 12
                                }}
                            >
                                {b.isActive ? "✓ Активен" : "Скрыт"}
                            </button>
                            <button
                                onClick={() => handleDelete(b.id)}
                                style={{ padding: "6px 14px", border: "none", borderRadius: 8, background: "#fee2e2", color: "#b91c1c", fontWeight: 600, cursor: "pointer", fontSize: 12 }}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
