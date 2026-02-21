"use client";
import Link from "next/link";
import { useT } from "@/contexts/LanguageContext";

export default function HowItWorksSection() {
    const { t, lang } = useT();
    const hiw = t.howItWorks;

    const steps = [
        {
            flow: lang === "ru" ? "Флоу 1" : "Flow 1",
            icon: "📦",
            color: "#16a34a", bgColor: "#f0fdf4", borderColor: "#bbf7d0",
            title: lang === "ru" ? "Готовый товар (In-Stock)" : "Ready Stock (In-Stock)",
            description: lang === "ru"
                ? "Фабрика шьёт запас. Вы выбираете товар в каталоге и покупаете коробами. Отгрузка за 2–5 дней."
                : "The factory keeps stock. You choose from the catalog and buy by the box. Ships in 2–5 days.",
            stepsList: lang === "ru"
                ? ["Найдите товар в каталоге", "Выберите цвет и количество коробов", "Отправьте запрос — фабрика пришлёт инвойс", "Отгрузка"]
                : ["Find the product in the catalog", "Choose color and box quantity", "Send request — factory sends invoice", "Shipment"],
            cta: lang === "ru" ? "Смотреть In-Stock товары" : "Browse In-Stock Products",
            href: "/products?type=instock",
        },
        {
            flow: lang === "ru" ? "Флоу 2" : "Flow 2",
            icon: "🏷️",
            color: "#0e7bc4", bgColor: "#f0f8ff", borderColor: "#bae6fd",
            title: lang === "ru" ? "Свой бренд (White Label)" : "Your Brand (White Label)",
            description: lang === "ru"
                ? "Нравится модель фабрики, но нужна ваша бирка или другой цвет. Фабрика отошьёт под ваши параметры."
                : "You like a factory model but need your own label or different color. The factory will produce to your specs.",
            stepsList: lang === "ru"
                ? ["Выберите базовую модель", "Укажите цвет (Pantone), тираж, бирку", "Получите КП от фабрики", "Производство 15–25 дней + отгрузка"]
                : ["Choose a base model", "Specify Pantone, quantity, label", "Receive a quote from the factory", "Production 15–25 days + shipment"],
            cta: lang === "ru" ? "Найти фабрику для White Label" : "Find White Label Factory",
            href: "/products?type=whitelabel",
        },
        {
            flow: lang === "ru" ? "Флоу 3" : "Flow 3",
            icon: "📐",
            color: "#7c3aed", bgColor: "#faf5ff", borderColor: "#e9d5ff",
            title: lang === "ru" ? "По вашим лекалам (RFQ)" : "Custom Production (RFQ)",
            description: lang === "ru"
                ? "У вас есть собственный дизайн и Tech Pack. Разместите заявку — фабрики пришлют предложения."
                : "You have your own design and tech pack. Post a request — factories will send their proposals.",
            stepsList: lang === "ru"
                ? ["Создайте заявку (RFQ) и загрузите Tech Pack", "Фабрики присылают КП", "Утвердите образец", "Производство по лекалам 30–45 дней"]
                : ["Create RFQ and upload Tech Pack", "Factories submit quotes", "Approve a sample", "Custom production 30–45 days"],
            cta: lang === "ru" ? "Разместить заявку (RFQ)" : "Submit RFQ Request",
            href: "/rfq/new",
        },
    ];

    return (
        <section className="section" style={{ background: "var(--color-bg)" }}>
            <div className="container">
                <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
                    <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent)", marginBottom: 8 }}>
                        {hiw.eyebrow}
                    </p>
                    <h2 style={{ fontSize: 36, marginBottom: 16 }}>{hiw.title}</h2>
                    <p style={{ fontSize: 16, color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{hiw.subtitle}</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                    {steps.map((step) => (
                        <div key={step.flow} style={{
                            background: step.bgColor, border: `1px solid ${step.borderColor}`,
                            borderRadius: 20, padding: 28, display: "flex", flexDirection: "column",
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 12,
                                    background: step.color, display: "flex", alignItems: "center",
                                    justifyContent: "center", fontSize: 22,
                                }}>{step.icon}</div>
                                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: step.color }}>
                                    {step.flow}
                                </span>
                            </div>

                            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10, color: "var(--color-text)" }}>{step.title}</h3>
                            <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.65, marginBottom: 20, flex: 1 }}>{step.description}</p>

                            <div style={{ marginBottom: 20 }}>
                                {step.stepsList.map((s, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                                        <div style={{
                                            width: 22, height: 22, borderRadius: "50%", background: step.color,
                                            color: "white", fontSize: 11, fontWeight: 700, flexShrink: 0,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                        }}>{i + 1}</div>
                                        <span style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{s}</span>
                                    </div>
                                ))}
                            </div>

                            <Link href={step.href} style={{
                                display: "inline-block", padding: "10px 18px", borderRadius: 10,
                                background: step.color, color: "white", fontWeight: 700, fontSize: 13,
                                textDecoration: "none", textAlign: "center",
                            }}>{step.cta} →</Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
