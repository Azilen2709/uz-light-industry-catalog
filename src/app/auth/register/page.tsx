"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useT } from "@/contexts/LanguageContext";

type Role = "buyer" | "seller";

export default function RegisterPage() {
    const { lang } = useT();
    const router = useRouter();
    const [role, setRole] = useState<Role>("buyer");
    const [step, setStep] = useState<1 | 2>(1);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", password: "" });

    const L = {
        ru: {
            title: "Регистрация",
            chooseRole: "Выберите тип аккаунта",
            buyer: "Покупатель", seller: "Поставщик / Фабрика",
            buyerDesc: "Ищу товары и фабрики для закупки",
            sellerDesc: "Продаю товары и принимаю RFQ",
            next: "Далее →", back: "← Назад",
            step1: "Тип аккаунта", step2: "Данные",
            name: "Ваше имя", namePh: "Иван Иванов",
            company: "Компания", companyPh: role === "seller" ? "ООО «МояФабрика»" : "ООО «МойБренд»",
            email: "Email", emailPh: "ivan@example.com",
            phone: "Телефон / Telegram", phonePh: "+998 90 000 00 00",
            password: "Пароль", passwordPh: "Минимум 8 символов",
            submit: "Создать аккаунт", submitting: "Создаём...",
            haveAccount: "Уже есть аккаунт?", login: "Войти",
            terms: "Регистрируясь, вы принимаете",
            termsLink: "Условия использования",
        },
        en: {
            title: "Create Account",
            chooseRole: "Choose account type",
            buyer: "Buyer", seller: "Supplier / Factory",
            buyerDesc: "I source products and factories",
            sellerDesc: "I sell goods and accept RFQs",
            next: "Next →", back: "← Back",
            step1: "Account type", step2: "Details",
            name: "Your name", namePh: "John Smith",
            company: "Company", companyPh: role === "seller" ? "My Factory LLC" : "My Brand LLC",
            email: "Email", emailPh: "john@example.com",
            phone: "Phone / Telegram", phonePh: "+1 999 000 0000",
            password: "Password", passwordPh: "At least 8 characters",
            submit: "Create Account", submitting: "Creating...",
            haveAccount: "Already have an account?", login: "Sign In",
            terms: "By registering you accept the",
            termsLink: "Terms of Service",
        },
    }[lang];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1000));
        router.push(role === "buyer" ? "/dashboard/buyer" : "/dashboard/seller");
    };

    const inp = {
        width: "100%", padding: "12px 14px", border: "1.5px solid var(--color-border)",
        borderRadius: 10, fontSize: 14, outline: "none", fontFamily: "inherit",
        boxSizing: "border-box" as const, background: "white",
    };

    return (
        <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f3460 0%, #16213e 50%, #0a0a1a 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
            {/* Logo */}
            <div style={{ marginBottom: 28, textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #3b82f6, #1e40af)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏭</div>
                    <div>
                        <div style={{ color: "white", fontWeight: 900, fontSize: 16, lineHeight: 1 }}>UZ LIGHT INDUSTRY</div>
                        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "0.15em" }}>CATALOG B2B</div>
                    </div>
                </div>
            </div>

            <div style={{ width: "100%", maxWidth: 460, background: "white", borderRadius: 20, padding: "28px 28px", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>
                <h1 style={{ fontSize: 20, fontWeight: 900, marginBottom: 4, textAlign: "center" }}>{L.title}</h1>

                {/* Step tabs */}
                <div style={{ display: "flex", gap: 8, margin: "16px 0 20px", background: "var(--color-surface)", borderRadius: 10, padding: 4 }}>
                    {([1, 2] as const).map(n => (
                        <div key={n} style={{
                            flex: 1, padding: "7px 0", textAlign: "center", borderRadius: 8, fontSize: 12, fontWeight: 700,
                            background: step >= n ? "var(--color-primary)" : "transparent",
                            color: step >= n ? "white" : "var(--color-muted)"
                        }}>
                            {n === 1 ? L.step1 : L.step2}
                        </div>
                    ))}
                </div>

                {/* Step 1: Role */}
                {step === 1 && (
                    <div>
                        <p style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 14, textAlign: "center" }}>{L.chooseRole}</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                            {([
                                { r: "buyer" as Role, icon: "🛒", label: L.buyer, desc: L.buyerDesc },
                                { r: "seller" as Role, icon: "🏭", label: L.seller, desc: L.sellerDesc },
                            ]).map(({ r, icon, label, desc }) => (
                                <button key={r} onClick={() => setRole(r)} style={{
                                    display: "flex", alignItems: "center", gap: 14, padding: "16px 18px",
                                    border: `2px solid ${role === r ? "var(--color-primary)" : "var(--color-border)"}`,
                                    borderRadius: 14, cursor: "pointer", background: role === r ? "#f0f6ff" : "white",
                                    textAlign: "left", transition: "all 0.15s",
                                }}>
                                    <span style={{ fontSize: 30 }}>{icon}</span>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: 15, color: role === r ? "var(--color-primary)" : "var(--color-text)", marginBottom: 3 }}>{label}</div>
                                        <div style={{ fontSize: 12, color: "var(--color-muted)" }}>{desc}</div>
                                    </div>
                                    <span style={{ marginLeft: "auto", width: 20, height: 20, borderRadius: "50%", border: `2px solid ${role === r ? "var(--color-primary)" : "var(--color-border)"}`, background: role === r ? "var(--color-primary)" : "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "white" }}>
                                        {role === r && "✓"}
                                    </span>
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setStep(2)} className="btn btn-primary" style={{ width: "100%", fontSize: 15 }}>{L.next}</button>
                    </div>
                )}

                {/* Step 2: Details */}
                {step === 2 && (
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                            <div>
                                <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 5 }}>{L.name} *</label>
                                <input type="text" placeholder={L.namePh} required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inp}
                                    onFocus={e => (e.target.style.borderColor = "var(--color-primary)")} onBlur={e => (e.target.style.borderColor = "var(--color-border)")} />
                            </div>
                            <div>
                                <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 5 }}>{L.company}</label>
                                <input type="text" placeholder={L.companyPh} value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} style={inp}
                                    onFocus={e => (e.target.style.borderColor = "var(--color-primary)")} onBlur={e => (e.target.style.borderColor = "var(--color-border)")} />
                            </div>
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 5 }}>{L.email} *</label>
                            <input type="email" placeholder={L.emailPh} required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inp}
                                onFocus={e => (e.target.style.borderColor = "var(--color-primary)")} onBlur={e => (e.target.style.borderColor = "var(--color-border)")} />
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 5 }}>{L.phone}</label>
                            <input type="text" placeholder={L.phonePh} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={inp}
                                onFocus={e => (e.target.style.borderColor = "var(--color-primary)")} onBlur={e => (e.target.style.borderColor = "var(--color-border)")} />
                        </div>
                        <div style={{ marginBottom: 18 }}>
                            <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 5 }}>{L.password} *</label>
                            <input type="password" placeholder={L.passwordPh} required minLength={8} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} style={inp}
                                onFocus={e => (e.target.style.borderColor = "var(--color-primary)")} onBlur={e => (e.target.style.borderColor = "var(--color-border)")} />
                        </div>
                        <div style={{ display: "flex", gap: 10 }}>
                            <button type="button" onClick={() => setStep(1)} className="btn btn-secondary" style={{ flex: 1 }}>{L.back}</button>
                            <button type="submit" disabled={loading} className="btn btn-primary" style={{ flex: 2, opacity: loading ? 0.7 : 1 }}>
                                {loading ? L.submitting : L.submit}
                            </button>
                        </div>
                        <p style={{ fontSize: 11, color: "var(--color-muted)", textAlign: "center", marginTop: 14 }}>
                            {L.terms} <a href="#" style={{ color: "var(--color-primary)" }}>{L.termsLink}</a>
                        </p>
                    </form>
                )}

                <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "var(--color-muted)" }}>
                    {L.haveAccount} <Link href="/auth/login" style={{ color: "var(--color-primary)", fontWeight: 700, textDecoration: "none" }}>{L.login}</Link>
                </p>
            </div>
        </div>
    );
}
