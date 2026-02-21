export default function StatsSection() {
    const stats = [
        { value: "500+", label: "Проверенных фабрик", icon: "🏭" },
        { value: "15,000+", label: "Товаров в каталоге", icon: "👕" },
        { value: "2 языка", label: "Русский и Английский", icon: "🌍" },
        { value: "3 флоу", label: "In-Stock, White Label, RFQ", icon: "⚡" },
    ];

    return (
        <section style={{
            background: "white",
            borderBottom: "1px solid var(--color-border)",
        }}>
            <div className="container">
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 0,
                }}>
                    {stats.map((stat, i) => (
                        <div key={stat.label} style={{
                            padding: "28px 24px",
                            borderRight: i < stats.length - 1 ? "1px solid var(--color-border)" : "none",
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                        }}>
                            <div style={{ fontSize: 32 }}>{stat.icon}</div>
                            <div>
                                <div style={{
                                    fontSize: 26,
                                    fontWeight: 800,
                                    color: "var(--color-primary)",
                                    lineHeight: 1.1,
                                }}>{stat.value}</div>
                                <div style={{
                                    fontSize: 13,
                                    color: "var(--color-muted)",
                                    marginTop: 2,
                                }}>{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
