"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useT } from "@/contexts/LanguageContext";

export default function LoginPage() {
    const { lang } = useT();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const L = {
        ru: {
            title: "Вход в аккаунт",
            subtitle: "UZ Light Industry Catalog",
            email: "Email", emailPh: "your@email.com",
            password: "Пароль", passwordPh: "Введите пароль",
            forgot: "Забыли пароль?",
            submit: "Войти", submitting: "Входим...",
            noAccount: "Нет аккаунта?", register: "Зарегистрироваться",
            orDemo: "или войти как демо:",
            demoSeller: "Войти как Продавец", demoBuyer: "Войти как Покупатель",
            back: "← На главную",
        },
        en: {
            title: "Sign In",
            subtitle: "UZ Light Industry Catalog",
            email: "Email", emailPh: "your@email.com",
            password: "Password", passwordPh: "Enter password",
            forgot: "Forgot password?",
            submit: "Sign In", submitting: "Signing in...",
            noAccount: "No account?", register: "Register",
            orDemo: "or demo login:",
            demoSeller: "Login as Seller", demoBuyer: "Login as Buyer",
            back: "← Back to Home",
        },
    }[lang];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 900));
        router.push("/dashboard/buyer");
    };

    const demoLogin = async (role: "buyer" | "seller") => {
        setLoading(true);
        await new Promise(r => setTimeout(r, 700));
        router.push(role === "buyer" ? "/dashboard/buyer" : "/dashboard/seller");
    };

    const inp = {
        width: "100%", padding: "12px 14px", border: "1.5px solid var(--color-border)",
        borderRadius: 10, fontSize: 15, outline: "none", fontFamily: "inherit",
        boxSizing: "border-box" as const, background: "white",
    };

    return (
        <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f3460 0%, #16213e 50%, #0a0a1a 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
            {/* Logo */}
            <div style={{ marginBottom: 32, textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #3b82f6, #1e40af)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏭</div>
                    <div>
                        <div style={{ color: "white", fontWeight: 900, fontSize: 18, lineHeight: 1 }}>UZ LIGHT INDUSTRY</div>
                        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>CATALOG B2B</div>
                    </div>
                </div>
            </div>

            {/* Card */}
            <div style={{ width: "100%", maxWidth: 420, background: "white", borderRadius: 20, padding: "32px 28px", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>
                <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 6, textAlign: "center" }}>{L.title}</h1>
                <p style={{ fontSize: 13, color: "var(--color-muted)", textAlign: "center", marginBottom: 24 }}>{L.subtitle}</p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>{L.email}</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={L.emailPh} required style={inp}
                            onFocus={e => (e.target.style.borderColor = "var(--color-primary)")}
                            onBlur={e => (e.target.style.borderColor = "var(--color-border)")} />
                    </div>
                    <div style={{ marginBottom: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                            <label style={{ fontSize: 13, fontWeight: 700 }}>{L.password}</label>
                            <a href="#" style={{ fontSize: 12, color: "var(--color-primary)", textDecoration: "none" }}>{L.forgot}</a>
                        </div>
                        <div style={{ position: "relative" }}>
                            <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder={L.passwordPh} required style={inp}
                                onFocus={e => (e.target.style.borderColor = "var(--color-primary)")}
                                onBlur={e => (e.target.style.borderColor = "var(--color-border)")} />
                            <button type="button" onClick={() => setShowPass(v => !v)}
                                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", border: "none", background: "none", cursor: "pointer", fontSize: 16, color: "var(--color-muted)" }}>
                                {showPass ? "🙈" : "👁"}
                            </button>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary"
                        style={{ width: "100%", fontSize: 15, marginTop: 20, opacity: loading ? 0.7 : 1 }}>
                        {loading ? L.submitting : L.submit}
                    </button>
                </form>

                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
                    <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
                    <span style={{ fontSize: 12, color: "var(--color-muted)" }}>{L.orDemo}</span>
                    <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <button onClick={() => demoLogin("buyer")} disabled={loading} className="btn btn-secondary" style={{ fontSize: 13 }}>
                        🛒 {L.demoBuyer}
                    </button>
                    <button onClick={() => demoLogin("seller")} disabled={loading} className="btn btn-secondary" style={{ fontSize: 13 }}>
                        🏭 {L.demoSeller}
                    </button>
                </div>

                <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--color-muted)" }}>
                    {L.noAccount} <Link href="/auth/register" style={{ color: "var(--color-primary)", fontWeight: 700, textDecoration: "none" }}>{L.register}</Link>
                </p>

                <p style={{ textAlign: "center", marginTop: 12, fontSize: 12 }}>
                    <Link href="/" style={{ color: "var(--color-muted)", textDecoration: "none" }}>{L.back}</Link>
                </p>
            </div>
        </div>
    );
}
