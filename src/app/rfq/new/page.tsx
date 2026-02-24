"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useT } from "@/contexts/LanguageContext";
import { INDUSTRY_TAXONOMY } from "@/lib/taxonomy";
import { COMPANIES } from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────

type Flow = "instock" | "whitelabel" | "rfq";
type Step = 1 | 2 | 3;

interface FormData {
    // Step 1 — What
    title: string;
    industrySlug: string;
    subcategorySlug: string;
    flow: Flow;
    // Step 2 — Volume & Requirements
    quantity: string;
    unit: string;
    budget: string;
    currency: "$" | "€" | "₽";
    deadline: string;
    description: string;
    // Step 3 — Contact
    name: string;
    company: string;
    email: string;
    telegram: string;
    whatsapp: string;
    targetFactoryId: string;
}

const EMPTY_FORM: FormData = {
    title: "", industrySlug: "", subcategorySlug: "", flow: "rfq",
    quantity: "", unit: "шт", budget: "", currency: "$", deadline: "",
    description: "", name: "", company: "", email: "", telegram: "", whatsapp: "",
    targetFactoryId: "",
};

const flowConfig = {
    instock: { icon: "🏪", color: "#15803d", bg: "#dcfce7" },
    whitelabel: { icon: "🏷️", color: "#1d4ed8", bg: "#dbeafe" },
    rfq: { icon: "📐", color: "#6d28d9", bg: "#ede9fe" },
};

// ─── Component ────────────────────────────────────────────────────────────

export default function RFQNewPage() {
    const { lang } = useT();
    const router = useRouter();
    const [step, setStep] = useState<Step>(1);
    const [form, setForm] = useState<FormData>(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);

    const L = {
        ru: {
            breadHome: "Главная", breadRFQ: "RFQ",
            pageTitle: "Разместить заявку (RFQ)",
            pageSubtitle: "Опишите ваш запрос — фабрики сами пришлют коммерческие предложения",
            step1: "Что ищем", step2: "Объём и требования", step3: "Контакты",
            flowLabel: "Тип запроса",
            flows: {
                instock: "Купить со склада",
                whitelabel: "Пошив под мой бренд",
                rfq: "Производство по ТЗ",
            },
            flowDesc: {
                instock: "Готовый товар, отгрузка сразу",
                whitelabel: "Ваш лейбл на нашем производстве",
                rfq: "Загрузите ТЗ — фабрики пришлют КП",
            },
            titleLabel: "Название запроса",
            titlePlaceholder: "Напр.: Худи оверсайз мужское, 500 шт",
            industryLabel: "Направление",
            subcatLabel: "Подкатегория",
            chooseDirect: "— Любая / Не знаю —",
            qtyLabel: "Количество",
            unit: "Единица",
            units: ["шт", "кг", "м", "пар", "комплектов", "рулонов"],
            budgetLabel: "Бюджет (опционально)",
            budgetPlaceholder: "Напр.: 5000",
            deadlineLabel: "Желаемый срок получения",
            descLabel: "Описание и требования",
            descPlaceholder: "Материал, цвет, размеры, доп. требования, прикрепите ссылку на референс...",
            nameLabel: "Ваше имя", namePlaceholder: "Иван Иванов",
            companyLabel: "Компания (опционально)", companyPlaceholder: "ООО «МойБренд»",
            emailLabel: "Email", emailPlaceholder: "ivan@mybrand.ru",
            telegramLabel: "Telegram", telegramPlaceholder: "@username",
            whatsappLabel: "WhatsApp", whatsappPlaceholder: "+7 999 000 00 00",
            targetLabel: "Конкретная фабрика (опционально)",
            targetDefault: "— Отправить всем подходящим —",
            next: "Далее →", back: "← Назад", submit: "Отправить заявку",
            submitting: "Отправляем...",
            required: "Обязательное поле",
            uploadTechPack: "📎 Прикрепить техническое задание (PDF, DXF, AI)",
            uploadNote: "до 20 МБ — PDF, Word, DXF, AI, PNG, JPG",
            stepOf: "Шаг",
            of: "из",
        },
        en: {
            breadHome: "Home", breadRFQ: "RFQ",
            pageTitle: "Post an RFQ",
            pageSubtitle: "Describe your request — factories will send you commercial proposals",
            step1: "What we need", step2: "Volume & Requirements", step3: "Contact Info",
            flowLabel: "Request Type",
            flows: {
                instock: "Buy from Stock",
                whitelabel: "Sew Under My Brand",
                rfq: "Custom Production",
            },
            flowDesc: {
                instock: "Ready goods, immediate dispatch",
                whitelabel: "Your label on our production",
                rfq: "Upload tech pack — factories send quotes",
            },
            titleLabel: "Request Title",
            titlePlaceholder: "e.g. Men's Oversized Hoodie, 500 pcs",
            industryLabel: "Industry Direction",
            subcatLabel: "Subcategory",
            chooseDirect: "— Any / Don't Know —",
            qtyLabel: "Quantity",
            unit: "Unit",
            units: ["pcs", "kg", "m", "pairs", "sets", "rolls"],
            budgetLabel: "Budget (optional)",
            budgetPlaceholder: "e.g. 5000",
            deadlineLabel: "Desired Delivery Date",
            descLabel: "Description & Requirements",
            descPlaceholder: "Material, color, sizes, extra requirements, attach a reference link...",
            nameLabel: "Your Name", namePlaceholder: "John Smith",
            companyLabel: "Company (optional)", companyPlaceholder: "My Brand Ltd",
            emailLabel: "Email", emailPlaceholder: "john@mybrand.com",
            telegramLabel: "Telegram", telegramPlaceholder: "@username",
            whatsappLabel: "WhatsApp", whatsappPlaceholder: "+1 999 000 0000",
            targetLabel: "Specific Factory (optional)",
            targetDefault: "— Send to All Matching Factories —",
            next: "Next →", back: "← Back", submit: "Submit RFQ",
            submitting: "Submitting...",
            required: "Required field",
            uploadTechPack: "📎 Attach Tech Pack (PDF, DXF, AI)",
            uploadNote: "up to 20 MB — PDF, Word, DXF, AI, PNG, JPG",
            stepOf: "Step",
            of: "of",
        },
    }[lang];

    const set = (key: keyof FormData, value: string) =>
        setForm(f => ({ ...f, [key]: value }));

    const selectedIndustry = INDUSTRY_TAXONOMY.find(i => i.slug === form.industrySlug);

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const res = await fetch("/api/rfq", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: form.title,
                    category: selectedIndustry ? selectedIndustry.label[lang] : form.industrySlug,
                    categorySlug: form.subcategorySlug || form.industrySlug,
                    quantity: `${form.quantity} ${form.unit}`,
                    budget: form.budget ? `${form.budget} ${form.currency}` : undefined,
                    deadline: form.deadline,
                    description: form.description
                })
            });
            if (!res.ok) throw new Error("Failed to create RFQ");
            const data = await res.json();
            router.push(`/rfq/${data.id}`);
        } catch (error) {
            console.error(error);
            alert(lang === "ru" ? "Ошибка при создании заявки. Попробуйте еще раз." : "Error creating RFQ. Please try again.");
            setSubmitting(false);
        }
    };

    const canGoNext1 = form.title.trim() && form.industrySlug;
    const canGoNext2 = form.quantity.trim() && form.description.trim();
    const canSubmit = form.name.trim() && form.email.trim();

    // ── Step indicator ────────────────────────────────────────────────────
    const StepDot = ({ n, label }: { n: number; label: string }) => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
            <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: step >= n ? "var(--color-primary)" : "var(--color-surface)",
                border: step >= n ? "none" : "2px solid var(--color-border-strong)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 800,
                color: step >= n ? "white" : "var(--color-muted)",
                transition: "all 0.2s",
            }}>{step > n ? "✓" : n}</div>
            <div style={{ fontSize: 11, fontWeight: step === n ? 700 : 400, color: step === n ? "var(--color-primary)" : "var(--color-muted)", textAlign: "center", whiteSpace: "nowrap" }}>
                {label}
            </div>
        </div>
    );

    const inputStyle = {
        width: "100%", padding: "11px 14px", border: "1.5px solid var(--color-border)",
        borderRadius: 10, fontSize: 14, outline: "none", background: "white",
        fontFamily: "inherit", boxSizing: "border-box" as const,
        transition: "border-color 0.15s",
    };
    const labelStyle = { fontSize: 13, fontWeight: 700, color: "var(--color-text)", marginBottom: 6, display: "block" };

    return (
        <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
            {/* Header banner */}
            <div style={{ background: "linear-gradient(135deg, var(--color-primary), #0a2a45)", padding: "32px 0 24px" }}>
                <div className="container" style={{ padding: "0 24px" }}>
                    {/* breadcrumb */}
                    <div style={{ display: "flex", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>{L.breadHome}</Link>
                        <span>›</span>
                        <span style={{ color: "white", fontWeight: 600 }}>RFQ</span>
                    </div>
                    <h1 style={{ color: "white", fontSize: 28, fontWeight: 900, marginBottom: 6 }}>📐 {L.pageTitle}</h1>
                    <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15 }}>{L.pageSubtitle}</p>
                </div>
            </div>

            <div className="container" style={{ padding: "32px 24px", maxWidth: 760 }}>
                {/* Step indicator */}
                <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: "24px 32px", marginBottom: 24 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", position: "relative" }}>
                        {/* connector line */}
                        <div style={{ position: "absolute", top: 18, left: "16%", right: "16%", height: 2, background: "var(--color-border)", zIndex: 0 }} />
                        <div style={{ position: "absolute", top: 18, left: "16%", width: `${((step - 1) / 2) * 68}%`, height: 2, background: "var(--color-primary)", zIndex: 1, transition: "width 0.3s" }} />
                        <StepDot n={1} label={L.step1} />
                        <StepDot n={2} label={L.step2} />
                        <StepDot n={3} label={L.step3} />
                    </div>
                    <div style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "var(--color-muted)" }}>
                        {L.stepOf} {step} {L.of} 3
                    </div>
                </div>

                {/* ── STEP 1: What ── */}
                {step === 1 && (
                    <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 28 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 22 }}>1. {L.step1}</h2>

                        {/* Flow selector */}
                        <div style={{ marginBottom: 22 }}>
                            <label style={labelStyle}>{L.flowLabel}</label>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                                {(["instock", "whitelabel", "rfq"] as Flow[]).map(f => {
                                    const cfg = flowConfig[f];
                                    const active = form.flow === f;
                                    return (
                                        <button key={f} onClick={() => set("flow", f)} style={{
                                            border: `2px solid ${active ? cfg.color : "var(--color-border)"}`,
                                            borderRadius: 12, padding: "14px 10px", cursor: "pointer",
                                            background: active ? cfg.bg : "white",
                                            textAlign: "left", transition: "all 0.15s",
                                        }}>
                                            <div style={{ fontSize: 22, marginBottom: 6 }}>{cfg.icon}</div>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: active ? cfg.color : "var(--color-text)", marginBottom: 3 }}>
                                                {L.flows[f]}
                                            </div>
                                            <div style={{ fontSize: 11, color: "var(--color-muted)", lineHeight: 1.4 }}>
                                                {L.flowDesc[f]}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Title */}
                        <div style={{ marginBottom: 18 }}>
                            <label style={labelStyle}>{L.titleLabel} <span style={{ color: "#ef4444" }}>*</span></label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={e => set("title", e.target.value)}
                                placeholder={L.titlePlaceholder}
                                style={inputStyle}
                                onFocus={e => (e.target.style.borderColor = "var(--color-primary)")}
                                onBlur={e => (e.target.style.borderColor = "var(--color-border)")}
                            />
                        </div>

                        {/* Industry */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
                            <div>
                                <label style={labelStyle}>{L.industryLabel} <span style={{ color: "#ef4444" }}>*</span></label>
                                <select value={form.industrySlug} onChange={e => { set("industrySlug", e.target.value); set("subcategorySlug", ""); }}
                                    style={{ ...inputStyle, cursor: "pointer" }}>
                                    <option value="">{L.chooseDirect}</option>
                                    {INDUSTRY_TAXONOMY.map(i => (
                                        <option key={i.slug} value={i.slug}>{i.icon} {i.label[lang]}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>{L.subcatLabel}</label>
                                <select value={form.subcategorySlug} onChange={e => set("subcategorySlug", e.target.value)}
                                    style={{ ...inputStyle, cursor: "pointer" }} disabled={!selectedIndustry}>
                                    <option value="">{L.chooseDirect}</option>
                                    {selectedIndustry?.categories.map(c => (
                                        <option key={c.slug} value={c.slug}>{c.icon} {c.label[lang as "ru" | "en"]}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button onClick={() => setStep(2)} disabled={!canGoNext1}
                            className="btn btn-primary" style={{ width: "100%", fontSize: 15, opacity: canGoNext1 ? 1 : 0.45, cursor: canGoNext1 ? "pointer" : "not-allowed" }}>
                            {L.next}
                        </button>
                    </div>
                )}

                {/* ── STEP 2: Volume & Requirements ── */}
                {step === 2 && (
                    <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 28 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 22 }}>2. {L.step2}</h2>

                        {/* Quantity + Unit */}
                        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 18 }}>
                            <div>
                                <label style={labelStyle}>{L.qtyLabel} <span style={{ color: "#ef4444" }}>*</span></label>
                                <input type="number" value={form.quantity} onChange={e => set("quantity", e.target.value)}
                                    placeholder="500" min="1" style={inputStyle}
                                    onFocus={e => (e.target.style.borderColor = "var(--color-primary)")}
                                    onBlur={e => (e.target.style.borderColor = "var(--color-border)")} />
                            </div>
                            <div>
                                <label style={labelStyle}>{L.unit}</label>
                                <select value={form.unit} onChange={e => set("unit", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                                    {L.units.map(u => <option key={u} value={u}>{u}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Budget + Currency + Deadline */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 1fr", gap: 14, marginBottom: 18 }}>
                            <div>
                                <label style={labelStyle}>{L.budgetLabel}</label>
                                <input type="number" value={form.budget} onChange={e => set("budget", e.target.value)}
                                    placeholder={L.budgetPlaceholder} min="0" style={inputStyle}
                                    onFocus={e => (e.target.style.borderColor = "var(--color-primary)")}
                                    onBlur={e => (e.target.style.borderColor = "var(--color-border)")} />
                            </div>
                            <div>
                                <label style={labelStyle}>&nbsp;</label>
                                <select value={form.currency} onChange={e => set("currency", e.target.value as "$" | "€" | "₽")}
                                    style={{ ...inputStyle, cursor: "pointer", textAlign: "center", padding: "11px 8px" }}>
                                    {["$", "€", "₽"].map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>{L.deadlineLabel}</label>
                                <input type="date" value={form.deadline} onChange={e => set("deadline", e.target.value)}
                                    style={inputStyle}
                                    onFocus={e => (e.target.style.borderColor = "var(--color-primary)")}
                                    onBlur={e => (e.target.style.borderColor = "var(--color-border)")} />
                            </div>
                        </div>

                        {/* Description */}
                        <div style={{ marginBottom: 18 }}>
                            <label style={labelStyle}>{L.descLabel} <span style={{ color: "#ef4444" }}>*</span></label>
                            <textarea value={form.description} onChange={e => set("description", e.target.value)}
                                placeholder={L.descPlaceholder} rows={5}
                                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                                onFocus={e => (e.target.style.borderColor = "var(--color-primary)")}
                                onBlur={e => (e.target.style.borderColor = "var(--color-border)")} />
                        </div>

                        {/* Tech Pack Upload */}
                        <div style={{ marginBottom: 22 }}>
                            <div style={{
                                border: "2px dashed var(--color-border-strong)", borderRadius: 12,
                                padding: "20px 24px", textAlign: "center", cursor: "pointer",
                                background: "var(--color-surface)",
                                transition: "border-color 0.15s, background 0.15s",
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-primary)"; (e.currentTarget as HTMLDivElement).style.background = "#f0f6ff"; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border-strong)"; (e.currentTarget as HTMLDivElement).style.background = "var(--color-surface)"; }}>
                                <div style={{ fontSize: 28, marginBottom: 8 }}>📎</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>
                                    {L.uploadTechPack}
                                </div>
                                <div style={{ fontSize: 11, color: "var(--color-muted)" }}>{L.uploadNote}</div>
                                <input type="file" style={{ display: "none" }} accept=".pdf,.doc,.docx,.dxf,.ai,.png,.jpg" />
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: 12 }}>
                            <button onClick={() => setStep(1)} className="btn btn-secondary" style={{ flex: 1, fontSize: 15 }}>{L.back}</button>
                            <button onClick={() => setStep(3)} disabled={!canGoNext2}
                                className="btn btn-primary" style={{ flex: 2, fontSize: 15, opacity: canGoNext2 ? 1 : 0.45, cursor: canGoNext2 ? "pointer" : "not-allowed" }}>
                                {L.next}
                            </button>
                        </div>
                    </div>
                )}

                {/* ── STEP 3: Contact ── */}
                {step === 3 && (
                    <div style={{ background: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: 28 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 22 }}>3. {L.step3}</h2>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
                            <div>
                                <label style={labelStyle}>{L.nameLabel} <span style={{ color: "#ef4444" }}>*</span></label>
                                <input type="text" value={form.name} onChange={e => set("name", e.target.value)}
                                    placeholder={L.namePlaceholder} style={inputStyle}
                                    onFocus={e => (e.target.style.borderColor = "var(--color-primary)")}
                                    onBlur={e => (e.target.style.borderColor = "var(--color-border)")} />
                            </div>
                            <div>
                                <label style={labelStyle}>{L.companyLabel}</label>
                                <input type="text" value={form.company} onChange={e => set("company", e.target.value)}
                                    placeholder={L.companyPlaceholder} style={inputStyle}
                                    onFocus={e => (e.target.style.borderColor = "var(--color-primary)")}
                                    onBlur={e => (e.target.style.borderColor = "var(--color-border)")} />
                            </div>
                        </div>

                        <div style={{ marginBottom: 18 }}>
                            <label style={labelStyle}>{L.emailLabel} <span style={{ color: "#ef4444" }}>*</span></label>
                            <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                                placeholder={L.emailPlaceholder} style={inputStyle}
                                onFocus={e => (e.target.style.borderColor = "var(--color-primary)")}
                                onBlur={e => (e.target.style.borderColor = "var(--color-border)")} />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
                            <div>
                                <label style={labelStyle}>{L.telegramLabel}</label>
                                <input type="text" value={form.telegram} onChange={e => set("telegram", e.target.value)}
                                    placeholder={L.telegramPlaceholder} style={inputStyle}
                                    onFocus={e => (e.target.style.borderColor = "var(--color-primary)")}
                                    onBlur={e => (e.target.style.borderColor = "var(--color-border)")} />
                            </div>
                            <div>
                                <label style={labelStyle}>{L.whatsappLabel}</label>
                                <input type="text" value={form.whatsapp} onChange={e => set("whatsapp", e.target.value)}
                                    placeholder={L.whatsappPlaceholder} style={inputStyle}
                                    onFocus={e => (e.target.style.borderColor = "var(--color-primary)")}
                                    onBlur={e => (e.target.style.borderColor = "var(--color-border)")} />
                            </div>
                        </div>

                        <div style={{ marginBottom: 22 }}>
                            <label style={labelStyle}>{L.targetLabel}</label>
                            <select value={form.targetFactoryId} onChange={e => set("targetFactoryId", e.target.value)}
                                style={{ ...inputStyle, cursor: "pointer" }}>
                                <option value="">{L.targetDefault}</option>
                                {COMPANIES.map(c => (
                                    <option key={c.id} value={String(c.id)}>{c.name} ({c.region})</option>
                                ))}
                            </select>
                        </div>

                        {/* Summary card */}
                        <div style={{ background: "var(--color-surface)", borderRadius: 12, padding: "14px 16px", marginBottom: 22, border: "1px solid var(--color-border)" }}>
                            {[
                                { icon: flowConfig[form.flow].icon, label: L.flows[form.flow], value: form.title },
                                { icon: "📦", label: L.qtyLabel, value: `${form.quantity} ${form.unit}` },
                                { icon: "🗺️", label: L.industryLabel, value: selectedIndustry?.label[lang] ?? "—" },
                            ].map(item => (
                                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 13, borderBottom: "1px solid var(--color-border)" }}>
                                    <span style={{ color: "var(--color-muted)" }}>{item.icon} {item.label}</span>
                                    <strong style={{ color: "var(--color-text)", maxWidth: 300, textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.value || "—"}</strong>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "flex", gap: 12 }}>
                            <button onClick={() => setStep(2)} className="btn btn-secondary" style={{ flex: 1, fontSize: 15 }}>{L.back}</button>
                            <button onClick={handleSubmit} disabled={!canSubmit || submitting}
                                className="btn btn-primary" style={{ flex: 2, fontSize: 15, opacity: canSubmit ? 1 : 0.45 }}>
                                {submitting ? L.submitting : L.submit}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
