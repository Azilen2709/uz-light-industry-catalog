import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
    // Gather key metrics
    const [
        totalUsers,
        totalBuyers,
        totalSellers,
        totalCompanies,
        verifiedCompanies,
        totalProducts,
        totalRfqs,
        activeRfqs
    ] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { role: "BUYER" } }),
        prisma.user.count({ where: { role: "SELLER" } }),
        prisma.company.count(),
        prisma.company.count({ where: { verified: true } }),
        prisma.product.count(),
        prisma.rfqRequest.count(),
        prisma.rfqRequest.count({ where: { status: "OPEN" } })
    ]);

    const statCards = [
        { title: "Всего пользователей", value: totalUsers, icon: "Пользователи 👥", details: `${totalBuyers} покупателей / ${totalSellers} продавцов` },
        { title: "Компании", value: totalCompanies, icon: "Компании 🏢", details: `${verifiedCompanies} верифицировано` },
        { title: "Товары в каталоге", value: totalProducts, icon: "Товары 📦", details: "Опубликовано на платформе" },
        { title: "Заявки (RFQ)", value: totalRfqs, icon: "Заявки 📨", details: `${activeRfqs} активных (OPEN)` },
    ];

    return (
        <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "var(--color-text)" }}>
                Панель управления
            </h1>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 30 }}>
                {statCards.map((stat, i) => (
                    <div key={i} style={{ background: "white", borderRadius: 16, border: "1px solid var(--color-border)", padding: 24 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                {stat.icon}
                            </div>
                        </div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: "var(--color-text)", marginBottom: 8, lineHeight: 1 }}>
                            {stat.value.toLocaleString()}
                        </div>
                        <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
                            {stat.details}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ background: "white", borderRadius: 16, border: "1px solid var(--color-border)", padding: 24 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Быстрые действия</h2>
                <p style={{ color: "var(--color-text-secondary)", fontSize: 14, marginBottom: 20 }}>
                    Используйте левое меню для перехода к разделам управления пользователями, модерации компаний и каталога товаров.
                </p>
                {/* We'll add recent activity here later if needed */}
            </div>
        </div>
    );
}
