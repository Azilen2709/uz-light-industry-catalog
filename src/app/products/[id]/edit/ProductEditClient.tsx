"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/contexts/LanguageContext";

interface ProductEditFormProps {
    product: {
        id: number;
        titleRu: string;
        titleEn: string;
        descriptionRu: string;
        descriptionEn: string;
        moq: string;
        priceFrom: number;
        priceTo: number;
        priceCurrency: string;
        leadTime: string;
        type: string;
    };
}

export default function ProductEditClient({ product }: ProductEditFormProps) {
    const router = useRouter();
    const { lang } = useT();
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [form, setForm] = useState({
        titleRu: product.titleRu,
        titleEn: product.titleEn,
        descriptionRu: product.descriptionRu,
        descriptionEn: product.descriptionEn,
        moq: product.moq,
        priceFrom: product.priceFrom,
        priceTo: product.priceTo,
        leadTime: product.leadTime,
    });

    const setField = (key: keyof typeof form, value: string | number) =>
        setForm(f => ({ ...f, [key]: value }));

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/products/${product.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
                router.refresh();
            } else {
                alert("Ошибка при сохранении");
            }
        } catch {
            alert("Ошибка соединения");
        }
        setSaving(false);
    };

    const fieldStyle = {
        width: "100%", padding: "10px 14px",
        border: "1px solid var(--color-border)", borderRadius: 8,
        fontSize: 14, color: "var(--color-text)", background: "white",
        boxSizing: "border-box" as const,
    };
    const labelStyle = {
        fontSize: 12, fontWeight: 700, color: "var(--color-muted)",
        textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: 6, display: "block"
    };
    const sectionStyle = {
        background: "white", borderRadius: 14,
        border: "1px solid var(--color-border)", padding: 24, marginBottom: 20
    };

    return (
        <div style={{ maxWidth: 760 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <button
                    onClick={() => router.back()}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "var(--color-muted)" }}
                >
                    ←
                </button>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--color-text)", margin: 0 }}>
                    {lang === "ru" ? "Редактировать товар" : "Edit Product"} #{product.id}
                </h1>
            </div>

            {/* Bilingual title */}
            <div style={sectionStyle}>
                <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
                    🇷🇺 / 🇬🇧 {lang === "ru" ? "Названия" : "Titles"}
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                        <label style={labelStyle}>Название (RU)</label>
                        <input style={fieldStyle} value={form.titleRu} onChange={e => setField("titleRu", e.target.value)} />
                    </div>
                    <div>
                        <label style={labelStyle}>Title (EN)</label>
                        <input style={fieldStyle} value={form.titleEn} onChange={e => setField("titleEn", e.target.value)} />
                    </div>
                </div>
            </div>

            {/* Bilingual description */}
            <div style={sectionStyle}>
                <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
                    {lang === "ru" ? "Описание" : "Description"}
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                        <label style={labelStyle}>Описание (RU)</label>
                        <textarea style={{ ...fieldStyle, height: 100, resize: "vertical" }}
                            value={form.descriptionRu} onChange={e => setField("descriptionRu", e.target.value)} />
                    </div>
                    <div>
                        <label style={labelStyle}>Description (EN)</label>
                        <textarea style={{ ...fieldStyle, height: 100, resize: "vertical" }}
                            value={form.descriptionEn} onChange={e => setField("descriptionEn", e.target.value)} />
                    </div>
                </div>
            </div>

            {/* Pricing & Terms */}
            <div style={sectionStyle}>
                <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
                    💰 {lang === "ru" ? "Цена и условия" : "Pricing & Terms"}
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                    <div>
                        <label style={labelStyle}>Цена от / Price From</label>
                        <input style={fieldStyle} type="number" value={form.priceFrom}
                            onChange={e => setField("priceFrom", parseFloat(e.target.value))} />
                    </div>
                    <div>
                        <label style={labelStyle}>Цена до / Price To</label>
                        <input style={fieldStyle} type="number" value={form.priceTo}
                            onChange={e => setField("priceTo", parseFloat(e.target.value))} />
                    </div>
                    <div>
                        <label style={labelStyle}>МЗК / MOQ</label>
                        <input style={fieldStyle} value={form.moq}
                            onChange={e => setField("moq", e.target.value)} />
                    </div>
                </div>
                <div style={{ marginTop: 16 }}>
                    <label style={labelStyle}>Срок изготовления / Lead Time</label>
                    <input style={{ ...fieldStyle, maxWidth: 300 }} value={form.leadTime}
                        onChange={e => setField("leadTime", e.target.value)} />
                </div>
            </div>

            {/* Save button */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn btn-primary"
                    style={{ padding: "12px 32px", fontSize: 15, fontWeight: 700 }}
                >
                    {saving ? "Сохранение..." : (lang === "ru" ? "💾 Сохранить изменения" : "💾 Save Changes")}
                </button>
                {saved && (
                    <span style={{ color: "#15803d", fontWeight: 700, fontSize: 14 }}>
                        ✓ {lang === "ru" ? "Сохранено!" : "Saved!"}
                    </span>
                )}
            </div>
        </div>
    );
}
