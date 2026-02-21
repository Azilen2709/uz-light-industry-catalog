import Link from "next/link";

const steps = [
    {
        flow: "Флоу 1",
        icon: "📦",
        color: "#16a34a",
        bgColor: "#f0fdf4",
        borderColor: "#bbf7d0",
        title: "Готовый товар (In-Stock)",
        description: "Фабрика шьёт запас. Вы выбираете товар в каталоге и покупаете коробами (размерными рядами). Отгрузка за 2–5 дней.",
        steps: ["Найдите товар в каталоге", "Выберите цвет и количество коробов", "Отправьте запрос — фабрика пришлёт инвойс", "Отгрузка"],
        cta: "Смотреть In-Stock товары",
        href: "/products?type=instock",
    },
    {
        flow: "Флоу 2",
        icon: "🏷️",
        color: "#0e7bc4",
        bgColor: "#f0f8ff",
        borderColor: "#bae6fd",
        title: "Свой бренд (White Label)",
        description: "Вам нравится модель фабрики, но нужна ваша бирка или другой цвет. Фабрика отошьёт по вашим параметрам.",
        steps: ["Выберите базовую модель из каталога", "Укажите цвет (Pantone), тираж, дизайн бирки", "Получите КП от фабрики в чате", "Производство 15–25 дней + отгрузка"],
        cta: "Найти фабрику для White Label",
        href: "/products?type=whitelabel",
    },
    {
        flow: "Флоу 3",
        icon: "📐",
        color: "#7c3aed",
        bgColor: "#faf5ff",
        borderColor: "#e9d5ff",
        title: "По вашим лекалам (RFQ)",
        description: "У вас есть собственный дизайн и Tech Pack. Разместите заявку — фабрики пришлют свои предложения с ценами.",
        steps: ["Создайте заявку (RFQ) и загрузите Tech Pack", "Фабрики изучают ТЗ и присылают КП", "Утвердите образец", "Производство по вашим лекалам 30–45 дней"],
        cta: "Разместить заявку (RFQ)",
        href: "/rfq/new",
    },
];

export default function HowItWorksSection() {
    return (
        <section className="section" style={{ background: "white" }}>
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                    <p style={{
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--color-accent)",
                        marginBottom: 10,
                    }}>3 способа работы</p>
                    <h2 style={{ fontSize: 36, marginBottom: 14 }}>Как работает платформа?</h2>
                    <p style={{
                        fontSize: 16,
                        color: "var(--color-text-secondary)",
                        maxWidth: 560,
                        margin: "0 auto",
                    }}>
                        Выберите подходящий сценарий: покупка готового товара, заказ под свой бренд, или производство по вашим лекалам
                    </p>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 24,
                }}>
                    {steps.map(step => (
                        <div key={step.flow} style={{
                            background: step.bgColor,
                            border: `1.5px solid ${step.borderColor}`,
                            borderRadius: 20,
                            padding: 28,
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                        }}>
                            {/* Header */}
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{
                                    width: 48, height: 48,
                                    background: step.color,
                                    borderRadius: 12,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 22,
                                    flexShrink: 0,
                                }}>{step.icon}</div>
                                <div>
                                    <span style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                        color: step.color,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.06em",
                                    }}>{step.flow}</span>
                                    <h3 style={{
                                        fontSize: 17,
                                        fontWeight: 700,
                                        color: "var(--color-text)",
                                        margin: 0,
                                    }}>{step.title}</h3>
                                </div>
                            </div>

                            <p style={{
                                fontSize: 14,
                                color: "var(--color-text-secondary)",
                                lineHeight: 1.6,
                                margin: 0,
                            }}>{step.description}</p>

                            {/* Steps */}
                            <ol style={{
                                margin: 0,
                                padding: 0,
                                listStyle: "none",
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                            }}>
                                {step.steps.map((s, i) => (
                                    <li key={i} style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 10,
                                        fontSize: 13,
                                        color: "var(--color-text-secondary)",
                                    }}>
                                        <span style={{
                                            minWidth: 22,
                                            height: 22,
                                            borderRadius: "50%",
                                            background: step.color,
                                            color: "white",
                                            fontSize: 11,
                                            fontWeight: 700,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                            marginTop: 1,
                                        }}>{i + 1}</span>
                                        {s}
                                    </li>
                                ))}
                            </ol>

                            <Link href={step.href} style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                color: step.color,
                                fontWeight: 700,
                                fontSize: 13,
                                textDecoration: "none",
                                marginTop: 4,
                            }}>
                                {step.cta} →
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
