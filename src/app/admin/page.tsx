export const dynamic = 'force-dynamic';
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
        { title: "Р’СЃРµРіРѕ РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№", value: totalUsers, icon: "РџРѕР»СЊР·РѕРІР°С‚РµР»Рё рџ‘Ґ", details: `${totalBuyers} РїРѕРєСѓРїР°С‚РµР»РµР№ / ${totalSellers} РїСЂРѕРґР°РІС†РѕРІ` },
        { title: "РљРѕРјРїР°РЅРёРё", value: totalCompanies, icon: "РљРѕРјРїР°РЅРёРё рџЏў", details: `${verifiedCompanies} РІРµСЂРёС„РёС†РёСЂРѕРІР°РЅРѕ` },
        { title: "РўРѕРІР°СЂС‹ РІ РєР°С‚Р°Р»РѕРіРµ", value: totalProducts, icon: "РўРѕРІР°СЂС‹ рџ“¦", details: "РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ РЅР° РїР»Р°С‚С„РѕСЂРјРµ" },
        { title: "Р—Р°СЏРІРєРё (RFQ)", value: totalRfqs, icon: "Р—Р°СЏРІРєРё рџ“Ё", details: `${activeRfqs} Р°РєС‚РёРІРЅС‹С… (OPEN)` },
    ];

    return (
        <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "var(--color-text)" }}>
                РџР°РЅРµР»СЊ СѓРїСЂР°РІР»РµРЅРёСЏ
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
                <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Р‘С‹СЃС‚СЂС‹Рµ РґРµР№СЃС‚РІРёСЏ</h2>
                <p style={{ color: "var(--color-text-secondary)", fontSize: 14, marginBottom: 20 }}>
                    РСЃРїРѕР»СЊР·СѓР№С‚Рµ Р»РµРІРѕРµ РјРµРЅСЋ РґР»СЏ РїРµСЂРµС…РѕРґР° Рє СЂР°Р·РґРµР»Р°Рј СѓРїСЂР°РІР»РµРЅРёСЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏРјРё, РјРѕРґРµСЂР°С†РёРё РєРѕРјРїР°РЅРёР№ Рё РєР°С‚Р°Р»РѕРіР° С‚РѕРІР°СЂРѕРІ.
                </p>
                {/* We'll add recent activity here later if needed */}
            </div>
        </div>
    );
}

