"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type User = {
    id: string;
    name: string;
    email: string;
    role: "BUYER" | "SELLER" | "ADMIN";
    createdAt: string;
    companyId: number | null;
    company: { name: string } | null;
};

export default function UsersClient({ initialUsers }: { initialUsers: User[] }) {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [updating, setUpdating] = useState<string | null>(null);
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const handleRoleChange = async (userId: string, newRole: string) => {
        setUpdating(userId);
        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole })
            });
            if (res.ok) {
                setUsers(users.map(u => u.id === userId ? { ...u, role: newRole as User["role"] } : u));
                router.refresh();
            } else {
                alert("Failed to update role");
            }
        } catch (error) {
            console.error(error);
            alert("Error updating role");
        }
        setUpdating(null);
    };

    return (
        <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "var(--color-text)" }}>Управление пользователями</h1>

            <div style={{ background: "white", padding: 20, borderRadius: 12, border: "1px solid var(--color-border)", marginBottom: 24, display: "flex", gap: 16 }}>
                <input
                    type="text"
                    placeholder="Поиск по имени или email..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ flex: 1, padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: 8 }}
                />
                <select
                    value={roleFilter}
                    onChange={e => setRoleFilter(e.target.value)}
                    style={{ padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: 8, cursor: "pointer", minWidth: 150 }}
                >
                    <option value="ALL">Все роли</option>
                    <option value="BUYER">BUYER</option>
                    <option value="SELLER">SELLER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            </div>

            <div style={{ background: "white", borderRadius: 12, border: "1px solid var(--color-border)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                    <thead style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
                        <tr>
                            <th style={{ padding: "14px 20px", textAlign: "left", fontWeight: 700, color: "var(--color-muted)" }}>Пользователь</th>
                            <th style={{ padding: "14px 20px", textAlign: "left", fontWeight: 700, color: "var(--color-muted)" }}>Роль</th>
                            <th style={{ padding: "14px 20px", textAlign: "left", fontWeight: 700, color: "var(--color-muted)" }}>Компания</th>
                            <th style={{ padding: "14px 20px", textAlign: "left", fontWeight: 700, color: "var(--color-muted)" }}>Регистрация</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontWeight: 600 }}>{user.name}</div>
                                    <div style={{ color: "var(--color-muted)", fontSize: 13 }}>{user.email}</div>
                                </td>
                                <td style={{ padding: "16px 20px" }}>
                                    <select
                                        value={user.role}
                                        onChange={e => handleRoleChange(user.id, e.target.value)}
                                        disabled={updating === user.id}
                                        style={{
                                            padding: "6px 10px", border: "1px solid var(--color-border)", borderRadius: 6,
                                            background: user.role === "ADMIN" ? "#fee2e2" : user.role === "SELLER" ? "#dcfce7" : "#e0f2fe",
                                            fontWeight: 600, cursor: "pointer"
                                        }}
                                    >
                                        <option value="BUYER">BUYER</option>
                                        <option value="SELLER">SELLER</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </select>
                                    {updating === user.id && <span style={{ marginLeft: 8, fontSize: 12, color: "var(--color-muted)" }}>Saving...</span>}
                                </td>
                                <td style={{ padding: "16px 20px", color: "var(--color-text-secondary)" }}>
                                    {user.company ? user.company.name : "—"}
                                </td>
                                <td style={{ padding: "16px 20px", color: "var(--color-text-secondary)" }}>
                                    {new Date(user.createdAt).toLocaleDateString("ru-RU")}
                                </td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ padding: "30px", textAlign: "center", color: "var(--color-muted)" }}>
                                    Пользователи не найдены.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
