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
            <style>{`
        .hiw-card {
          border-radius: var(--radius-lg);
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .hiw-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-card-hover);
        }
        .hiw-cta {
          display: inline-block;
          padding: 12px 24px;
          border-radius: var(--radius-xl); /* Pill shape CTA */
          color: white;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08); /* Soft diffuse shadow */
        }
        .hiw-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.15); /* Slightly darker focus shadow */
          filter: brightness(1.05);
        }
      `}</style>
            <div className="container">
                <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
                    <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-accent)", marginBottom: 12 }}>
                        {hiw.eyebrow}
                    </p>
                    <h2 style={{ fontSize: 36, marginBottom: 16, fontWeight: 800, color: "var(--color-primary)", letterSpacing: "-0.02em" }}>{hiw.title}</h2>
                    <p style={{ fontSize: 16, color: "var(--color-text-secondary)", lineHeight: 1.6, fontWeight: 400 }}>{hiw.subtitle}</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                    {steps.map((step) => (
                        <div key={step.flow} className="hiw-card" style={{
                            background: step.bgColor,
                            border: `1px solid ${step.borderColor}`,
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: "var(--radius-md)",
                                    background: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center",
                                    justifyContent: "center", fontSize: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                                }}>{step.icon}</div>
                                <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: step.color }}>
                                    {step.flow}
                                </span>
                            </div>

                            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12, color: "var(--color-primary)", letterSpacing: "-0.01em" }}>{step.title}</h3>
                            <p style={{ fontSize: 15, color: "var(--color-text)", lineHeight: 1.6, marginBottom: 24, flex: 1 }}>{step.description}</p>

                            <div style={{ marginBottom: 28 }}>
                                {step.stepsList.map((s, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                                        <div style={{
                                            width: 24, height: 24, borderRadius: "50%", background: "white",
                                            color: step.color, fontSize: 12, fontWeight: 800, flexShrink: 0,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            border: `1.5px solid ${step.color}`,
                                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                                        }}>{i + 1}</div>
                                        <span style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.5, fontWeight: 500 }}>{s}</span>
                                    </div>
                                ))}
                            </div>

                            <Link href={step.href} className="hiw-cta" style={{ background: step.color }}>
                                {step.cta} →
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
