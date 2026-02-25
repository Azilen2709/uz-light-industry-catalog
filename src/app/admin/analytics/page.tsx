export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminAnalyticsPage() {
    const session = await getServerSession(authOptions);
    const user = session?.user as any;
    if (!user || user.role !== "ADMIN") redirect("/auth/login");

    // Must cast to any until `npx prisma generate` is run with the new schema
    const p = prisma as any;

    const [topProducts, topCompanies, topSearches, totalProducts, totalCompanies, totalOrders] = await Promise.all([
        p.product.findMany({
            orderBy: { views: "desc" },
            take: 10,
            include: { company: { select: { name: true, slug: true } } },
        }).catch(() => []),
        p.company.findMany({
            orderBy: { views: "desc" },
            take: 10,
            select: { id: true, name: true, slug: true, views: true, ordersCompleted: true, region: true, verified: true },
        }).catch(() => []),
        p.searchQuery?.findMany({ orderBy: { count: "desc" }, take: 20 }).catch(() => []) ?? [],
        prisma.product.count(),
        prisma.company.count(),
        p.order?.count().catch(() => 0) ?? 0,
    ]);

    const card = (label: string, value: number | string) => (
        <div style={{ background: "white", borderRadius: 14, border: "1px solid var(--color-border)", padding: "20px 28px" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--color-primary)" }}>{value}</div>
            <div style={{ fontSize: 13, color: "var(--color-muted)", marginTop: 4 }}>{label}</div>
        </div>
    );

    return (
        <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>рџ“Љ РђРЅР°Р»РёС‚РёРєР° РїР»Р°С‚С„РѕСЂРјС‹</h1>
            <p style={{ color: "var(--color-muted)", fontSize: 14, marginBottom: 28 }}>РџСЂРѕСЃРјРѕС‚СЂС‹, РїРѕРёСЃРєРё Рё СЃС‚Р°С‚РёСЃС‚РёРєР° РІ СЂРµР°Р»СЊРЅРѕРј РІСЂРµРјРµРЅРё</p>

            {/* Summary cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
                {card("РўРѕРІР°СЂРѕРІ РІ РєР°С‚Р°Р»РѕРіРµ", totalProducts)}
                {card("Р¤Р°Р±СЂРёРє Р·Р°СЂРµРіРёСЃС‚СЂРёСЂРѕРІР°РЅРѕ", totalCompanies)}
                {card("РЈСЃРїРµС€РЅС‹С… СЃРґРµР»РѕРє", totalOrders)}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                {/* Top products by views */}
                <div style={{ background: "white", borderRadius: 14, border: "1px solid var(--color-border)", overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)", fontWeight: 700, fontSize: 15 }}>
                        рџ”Ґ РўРѕРї С‚РѕРІР°СЂРѕРІ РїРѕ РїСЂРѕСЃРјРѕС‚СЂР°Рј
                    </div>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                            <tr style={{ background: "var(--color-surface)" }}>
                                <th style={{ padding: "10px 16px", textAlign: "left", color: "var(--color-muted)", fontWeight: 600 }}>#</th>
                                <th style={{ padding: "10px 16px", textAlign: "left", color: "var(--color-muted)", fontWeight: 600 }}>РўРѕРІР°СЂ</th>
                                <th style={{ padding: "10px 16px", textAlign: "right", color: "var(--color-muted)", fontWeight: 600 }}>рџ‘Ѓ</th>
                                <th style={{ padding: "10px 16px", textAlign: "right", color: "var(--color-muted)", fontWeight: 600 }}>вњ…</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(topProducts) && topProducts.map((p: any, i: number) => (
                                <tr key={p.id} style={{ borderTop: "1px solid var(--color-border)" }}>
                                    <td style={{ padding: "10px 16px", color: "var(--color-muted)" }}>{i + 1}</td>
                                    <td style={{ padding: "10px 16px" }}>
                                        <Link href={`/products/${p.id}`} target="_blank" style={{ fontWeight: 600, color: "var(--color-primary)", textDecoration: "none", fontSize: 12 }}>
                                            {p.titleRu || p.titleEn}
                                        </Link>
                                        <div style={{ fontSize: 11, color: "var(--color-muted)" }}>{p.company?.name}</div>
                                    </td>
                                    <td style={{ padding: "10px 16px", textAlign: "right", fontWeight: 700 }}>{(p.views ?? 0).toLocaleString()}</td>
                                    <td style={{ padding: "10px 16px", textAlign: "right", color: "#16a34a", fontWeight: 700 }}>{p.ordersCompleted ?? 0}</td>
                                </tr>
                            ))}
                            {(!topProducts || topProducts.length === 0) && (
                                <tr><td colSpan={4} style={{ padding: 20, textAlign: "center", color: "var(--color-muted)" }}>РќРµС‚ РґР°РЅРЅС‹С… Рѕ РїСЂРѕСЃРјРѕС‚СЂР°С…</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Top companies by views */}
                <div style={{ background: "white", borderRadius: 14, border: "1px solid var(--color-border)", overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)", fontWeight: 700, fontSize: 15 }}>
                        рџЏ­ РўРѕРї С„Р°Р±СЂРёРє РїРѕ РїСЂРѕСЃРјРѕС‚СЂР°Рј
                    </div>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                            <tr style={{ background: "var(--color-surface)" }}>
                                <th style={{ padding: "10px 16px", textAlign: "left", color: "var(--color-muted)", fontWeight: 600 }}>#</th>
                                <th style={{ padding: "10px 16px", textAlign: "left", color: "var(--color-muted)", fontWeight: 600 }}>Р¤Р°Р±СЂРёРєР°</th>
                                <th style={{ padding: "10px 16px", textAlign: "right", color: "var(--color-muted)", fontWeight: 600 }}>рџ‘Ѓ</th>
                                <th style={{ padding: "10px 16px", textAlign: "right", color: "var(--color-muted)", fontWeight: 600 }}>вњ…</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(topCompanies) && topCompanies.map((c: any, i: number) => (
                                <tr key={c.id} style={{ borderTop: "1px solid var(--color-border)" }}>
                                    <td style={{ padding: "10px 16px", color: "var(--color-muted)" }}>{i + 1}</td>
                                    <td style={{ padding: "10px 16px" }}>
                                        <Link href={`/companies/${c.slug}`} target="_blank" style={{ fontWeight: 600, color: "var(--color-primary)", textDecoration: "none", fontSize: 12 }}>
                                            {c.name}
                                        </Link>
                                        <div style={{ fontSize: 11, color: "var(--color-muted)" }}>{c.region} {c.verified ? "вњ“" : ""}</div>
                                    </td>
                                    <td style={{ padding: "10px 16px", textAlign: "right", fontWeight: 700 }}>{(c.views ?? 0).toLocaleString()}</td>
                                    <td style={{ padding: "10px 16px", textAlign: "right", color: "#16a34a", fontWeight: 700 }}>{c.ordersCompleted ?? 0}</td>
                                </tr>
                            ))}
                            {(!topCompanies || topCompanies.length === 0) && (
                                <tr><td colSpan={4} style={{ padding: 20, textAlign: "center", color: "var(--color-muted)" }}>РќРµС‚ РґР°РЅРЅС‹С… Рѕ РїСЂРѕСЃРјРѕС‚СЂР°С…</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Top searches */}
            <div style={{ background: "white", borderRadius: 14, border: "1px solid var(--color-border)", overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)", fontWeight: 700, fontSize: 15 }}>
                    рџ”Ќ РўРѕРї РїРѕРёСЃРєРѕРІС‹С… Р·Р°РїСЂРѕСЃРѕРІ
                </div>
                {Array.isArray(topSearches) && topSearches.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, padding: 20 }}>
                        {topSearches.map((s: any) => (
                            <div key={s.id} style={{
                                display: "flex", alignItems: "center", gap: 8,
                                background: "var(--color-surface)", borderRadius: 20,
                                padding: "6px 14px", border: "1px solid var(--color-border)"
                            }}>
                                <span style={{ fontWeight: 600, fontSize: 13 }}>{s.query}</span>
                                <span style={{
                                    background: "var(--color-primary)", color: "white",
                                    borderRadius: 10, padding: "1px 8px", fontSize: 11, fontWeight: 700
                                }}>{s.count}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ padding: 30, textAlign: "center", color: "var(--color-muted)" }}>
                        РџРѕРёСЃРєРѕРІС‹Рµ Р·Р°РїСЂРѕСЃС‹ РїРѕСЏРІСЏС‚СЃСЏ Р·РґРµСЃСЊ РїРѕСЃР»Рµ РїРµСЂРІС‹С… РїРѕРёСЃРєРѕРІ РЅР° РїР»Р°С‚С„РѕСЂРјРµ.
                    </div>
                )}
            </div>
        </div>
    );
}

