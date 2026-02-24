"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type SubCategory = { slug: string; code: string; labelRu: string; labelEn: string; icon: string };
type Category = { slug: string; code: string; labelRu: string; labelEn: string; icon: string; subcategories: SubCategory[] };
type Industry = { slug: string; code: string; labelRu: string; labelEn: string; icon: string; color: string; categories: Category[] };

export default function CategoriesClient({ initialTaxonomy }: { initialTaxonomy: Industry[] }) {
    const [taxonomy, setTaxonomy] = useState<Industry[]>(initialTaxonomy);
    const [expanded, setExpanded] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    // Form for adding new items
    const [newItem, setNewItem] = useState({ type: "industry" as "industry" | "category" | "subcategory", parentSlug: "", parentSubSlug: "", slug: "", code: "", labelRu: "", labelEn: "", icon: "📦", color: "#1e3a5f" });
    const [showForm, setShowForm] = useState(false);

    const router = useRouter();

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/admin/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ taxonomy })
            });
            if (res.ok) {
                alert("Таксономия успешно сохранена! Перезапустите сервер для применения изменений.");
                router.refresh();
            } else {
                const err = await res.json();
                alert(err.error || "Ошибка сохранения");
            }
        } catch (e) {
            console.error(e);
            alert("Network error");
        }
        setSaving(false);
    };

    const handleAddItem = () => {
        if (!newItem.labelRu || !newItem.labelEn) {
            alert("Обязательно заполните название на обоих языках (RU и EN)");
            return;
        }
        if (!newItem.slug || !newItem.code) {
            alert("Заполните Slug и Code");
            return;
        }

        const updated = [...taxonomy];

        if (newItem.type === "industry") {
            updated.push({ slug: newItem.slug, code: newItem.code, labelRu: newItem.labelRu, labelEn: newItem.labelEn, icon: newItem.icon, color: newItem.color, categories: [] });
        } else if (newItem.type === "category") {
            const ind = updated.find(i => i.slug === newItem.parentSlug);
            if (ind) ind.categories.push({ slug: newItem.slug, code: newItem.code, labelRu: newItem.labelRu, labelEn: newItem.labelEn, icon: newItem.icon, subcategories: [] });
        } else if (newItem.type === "subcategory") {
            const ind = updated.find(i => i.slug === newItem.parentSlug);
            if (ind) {
                const cat = ind.categories.find(c => c.slug === newItem.parentSubSlug);
                if (cat) cat.subcategories.push({ slug: newItem.slug, code: newItem.code, labelRu: newItem.labelRu, labelEn: newItem.labelEn, icon: newItem.icon });
            }
        }

        setTaxonomy(updated);
        setShowForm(false);
        setNewItem({ type: "industry", parentSlug: "", parentSubSlug: "", slug: "", code: "", labelRu: "", labelEn: "", icon: "📦", color: "#1e3a5f" });
    };

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--color-text)" }}>Управление категориями</h1>
                <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setShowForm(!showForm)} style={{ padding: "10px 18px", border: "1px solid var(--color-border)", borderRadius: 8, background: "white", fontWeight: 600, cursor: "pointer" }}>
                        + Добавить
                    </button>
                    <button onClick={handleSave} disabled={saving} className="btn btn-primary" style={{ padding: "10px 18px" }}>
                        {saving ? "Сохранение..." : "💾 Сохранить изменения"}
                    </button>
                </div>
            </div>

            {/* Bilingual Requirement notice */}
            <div style={{ background: "#fef9c3", border: "1px solid #fef08a", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 14 }}>
                ⚠️ Все новые категории и подкатегории должны заполняться на двух языках — <strong>Русский (RU)</strong> и <strong>English (EN)</strong>. Это обязательное требование для корректной работы сайта.
            </div>

            {/* Add Form */}
            {showForm && (
                <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 12, padding: 24, marginBottom: 24 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Добавить новый элемент</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <div>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Тип</label>
                            <select value={newItem.type} onChange={e => setNewItem({ ...newItem, type: e.target.value as any })} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-border)", borderRadius: 8 }}>
                                <option value="industry">Индустрия (уровень 1)</option>
                                <option value="category">Категория (уровень 2)</option>
                                <option value="subcategory">Подкатегория (уровень 3)</option>
                            </select>
                        </div>
                        {newItem.type !== "industry" && (
                            <div>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Родительская Индустрия</label>
                                <select value={newItem.parentSlug} onChange={e => setNewItem({ ...newItem, parentSlug: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-border)", borderRadius: 8 }}>
                                    <option value="">— Выберите —</option>
                                    {taxonomy.map(i => <option key={i.slug} value={i.slug}>{i.icon} {i.labelRu}</option>)}
                                </select>
                            </div>
                        )}
                        {newItem.type === "subcategory" && (
                            <div>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Родительская Категория</label>
                                <select value={newItem.parentSubSlug} onChange={e => setNewItem({ ...newItem, parentSubSlug: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-border)", borderRadius: 8 }}>
                                    <option value="">— Выберите —</option>
                                    {taxonomy.find(i => i.slug === newItem.parentSlug)?.categories.map(c => <option key={c.slug} value={c.slug}>{c.icon} {c.labelRu}</option>)}
                                </select>
                            </div>
                        )}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <div>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6, color: "#dc2626" }}>Название (RU) *</label>
                            <input required value={newItem.labelRu} onChange={e => setNewItem({ ...newItem, labelRu: e.target.value })} placeholder="Например: Мужская одежда" style={{ width: "100%", padding: "10px", border: "2px solid #fca5a5", borderRadius: 8 }} />
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6, color: "#2563eb" }}>Название (EN) *</label>
                            <input required value={newItem.labelEn} onChange={e => setNewItem({ ...newItem, labelEn: e.target.value })} placeholder="Example: Men's Apparel" style={{ width: "100%", padding: "10px", border: "2px solid #93c5fd", borderRadius: 8 }} />
                        </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
                        <div>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Slug</label>
                            <input value={newItem.slug} onChange={e => setNewItem({ ...newItem, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} placeholder="mens-apparel" style={{ width: "100%", padding: "10px", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Code (Official)</label>
                            <input value={newItem.code} onChange={e => setNewItem({ ...newItem, code: e.target.value })} placeholder="A1.1" style={{ width: "100%", padding: "10px", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Иконка (emoji)</label>
                            <input value={newItem.icon} onChange={e => setNewItem({ ...newItem, icon: e.target.value })} placeholder="👔" style={{ width: "100%", padding: "10px", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                        </div>
                        {newItem.type === "industry" && (
                            <div>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Цвет (hex)</label>
                                <input type="color" value={newItem.color} onChange={e => setNewItem({ ...newItem, color: e.target.value })} style={{ width: "100%", height: 42, border: "1px solid var(--color-border)", borderRadius: 8, cursor: "pointer" }} />
                            </div>
                        )}
                    </div>
                    <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                        <button onClick={() => setShowForm(false)} style={{ padding: "10px 16px", border: "1px solid var(--color-border)", borderRadius: 8, background: "white", fontWeight: 600, cursor: "pointer" }}>Отмена</button>
                        <button onClick={handleAddItem} className="btn btn-primary" style={{ padding: "10px 20px" }}>Добавить в таксономию</button>
                    </div>
                </div>
            )}

            {/* Taxonomy tree */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {taxonomy.map(industry => (
                    <div key={industry.slug} style={{ background: "white", borderRadius: 12, border: "1px solid var(--color-border)", overflow: "hidden" }}>
                        <div
                            onClick={() => setExpanded(expanded === industry.slug ? null : industry.slug)}
                            style={{ padding: "16px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: expanded === industry.slug ? "#f0f6ff" : "white" }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 8, background: industry.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{industry.icon}</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 15 }}>{industry.labelRu} | {industry.labelEn}</div>
                                    <div style={{ fontSize: 12, color: "var(--color-muted)" }}>{industry.code} · {industry.categories.length} категорий · Slug: {industry.slug}</div>
                                </div>
                            </div>
                            <span style={{ fontSize: 18, color: "var(--color-muted)" }}>{expanded === industry.slug ? "▲" : "▼"}</span>
                        </div>
                        {expanded === industry.slug && (
                            <div style={{ borderTop: "1px solid var(--color-border)", paddingLeft: 20 }}>
                                {industry.categories.map(cat => (
                                    <div key={cat.slug}>
                                        <div style={{ padding: "12px 20px 12px 0", borderBottom: "1px solid var(--color-border)", display: "flex", gap: 12, alignItems: "center" }}>
                                            <span style={{ fontSize: 18 }}>{cat.icon}</span>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{cat.labelRu} | {cat.labelEn}</div>
                                                <div style={{ fontSize: 12, color: "var(--color-muted)" }}>{cat.code} · {cat.subcategories.length} подкатегорий · {cat.slug}</div>
                                            </div>
                                        </div>
                                        {cat.subcategories.map(sub => (
                                            <div key={sub.slug} style={{ padding: "8px 20px 8px 24px", borderBottom: "1px solid var(--color-border)", fontSize: 13, display: "flex", gap: 10, alignItems: "center", background: "#f8fafc" }}>
                                                <span>{sub.icon}</span>
                                                <span style={{ color: "var(--color-text-secondary)" }}>
                                                    <strong>{sub.labelRu}</strong> | {sub.labelEn}
                                                </span>
                                                <span style={{ marginLeft: "auto", color: "var(--color-muted)", fontSize: 12 }}>{sub.code} · {sub.slug}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                                {industry.categories.length === 0 && (
                                    <div style={{ padding: "16px 20px 16px 0", color: "var(--color-muted)", fontSize: 14 }}>Нет категорий. Нажмите «Добавить» выше.</div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
