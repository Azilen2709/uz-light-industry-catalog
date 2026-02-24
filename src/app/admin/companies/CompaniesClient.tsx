"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Company = {
    id: number;
    slug: string;
    name: string;
    region: string;
    industry: string;
    verified: boolean;
    rating: number;
    userCount: number;
    productCount: number;
};

export default function CompaniesClient({ initialCompanies }: { initialCompanies: Company[] }) {
    const [companies, setCompanies] = useState<Company[]>(initialCompanies);
    const [updating, setUpdating] = useState<number | null>(null);
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");
    const [verifiedFilter, setVerifiedFilter] = useState("ALL");

    const filteredCompanies = companies.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.region.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesVerified = verifiedFilter === "ALL"
            ? true
            : verifiedFilter === "VERIFIED" ? c.verified : !c.verified;
        return matchesSearch && matchesVerified;
    });

    const toggleVerification = async (companyId: number, currentStatus: boolean) => {
        setUpdating(companyId);
        try {
            const res = await fetch(`/api/admin/companies/${companyId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ verified: !currentStatus })
            });
            if (res.ok) {
                setCompanies(companies.map(c => c.id === companyId ? { ...c, verified: !currentStatus } : c));
                router.refresh();
            } else {
                alert("Failed to update verification status");
            }
        } catch (error) {
            console.error(error);
            alert("Error updating status");
        }
        setUpdating(null);
    };

    return (
        <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "var(--color-text)" }}>Модерация компаний</h1>

            <div style={{ background: "white", padding: 20, borderRadius: 12, border: "1px solid var(--color-border)", marginBottom: 24, display: "flex", gap: 16 }}>
                <input
                    type="text"
                    placeholder="Поиск по названию или региону..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ flex: 1, padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: 8 }}
                />
                <select
                    value={verifiedFilter}
                    onChange={e => setVerifiedFilter(e.target.value)}
                    style={{ padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: 8, cursor: "pointer", minWidth: 150 }}
                >
                    <option value="ALL">Все статусы</option>
                    <option value="VERIFIED">Верифицированные</option>
                    <option value="UNVERIFIED">Ожидают проверки</option>
                </select>
            </div>

            <div style={{ background: "white", borderRadius: 12, border: "1px solid var(--color-border)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                    <thead style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
                        <tr>
                            <th style={{ padding: "14px 20px", textAlign: "left", fontWeight: 700, color: "var(--color-muted)" }}>Компания</th>
                            <th style={{ padding: "14px 20px", textAlign: "left", fontWeight: 700, color: "var(--color-muted)" }}>Индустрия / Регион</th>
                            <th style={{ padding: "14px 20px", textAlign: "center", fontWeight: 700, color: "var(--color-muted)" }}>Статистика</th>
                            <th style={{ padding: "14px 20px", textAlign: "left", fontWeight: 700, color: "var(--color-muted)" }}>Верификация</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCompanies.map(company => (
                            <tr key={company.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                                <td style={{ padding: "16px 20px" }}>
                                    <Link href={`/companies/${company.slug}`} target="_blank" style={{ fontWeight: 600, color: "var(--color-primary)", textDecoration: "none" }}>
                                        {company.name}
                                    </Link>
                                    <div style={{ color: "var(--color-muted)", fontSize: 13, marginTop: 4 }}>ID: {company.id}</div>
                                </td>
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontWeight: 500 }}>{company.industry}</div>
                                    <div style={{ color: "var(--color-muted)", fontSize: 13 }}>{company.region}</div>
                                </td>
                                <td style={{ padding: "16px 20px", textAlign: "center" }}>
                                    <div style={{ fontSize: 13 }}><span style={{ fontWeight: 700 }}>{company.userCount}</span> раб.</div>
                                    <div style={{ fontSize: 13 }}><span style={{ fontWeight: 700 }}>{company.productCount}</span> тов.</div>
                                </td>
                                <td style={{ padding: "16px 20px" }}>
                                    <button
                                        onClick={() => toggleVerification(company.id, company.verified)}
                                        disabled={updating === company.id}
                                        style={{
                                            padding: "6px 14px", border: "1px solid var(--color-border)", borderRadius: 6,
                                            background: company.verified ? "#dcfce7" : "white",
                                            fontWeight: 600, cursor: "pointer", color: company.verified ? "#15803d" : "var(--color-text)",
                                            display: "flex", alignItems: "center", gap: 6
                                        }}
                                    >
                                        {company.verified ? "✓ Подтвержден" : "Выдать статус"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredCompanies.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ padding: "30px", textAlign: "center", color: "var(--color-muted)" }}>
                                    Компании не найдены.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
