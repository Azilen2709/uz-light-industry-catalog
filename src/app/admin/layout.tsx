import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/auth/login");
    }

    if ((session.user as any).role !== "ADMIN") {
        redirect("/"); // Access denied
    }

    const navItems = [
        { label: "Dashboard", href: "/admin", icon: "🏠" },
        { label: "📊 Аналитика", href: "/admin/analytics", icon: "📊" },
        { label: "🖼 Баннеры", href: "/admin/banners", icon: "🖼" },
        { label: "Пользователи", href: "/admin/users", icon: "👥" },
        { label: "Компании", href: "/admin/companies", icon: "🏢" },
        { label: "Товары", href: "/admin/products", icon: "📦" },
        { label: "Заявки (RFQ)", href: "/admin/rfq", icon: "📨" },
        { label: "Категории", href: "/admin/categories", icon: "📑" },
    ];


    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
            {/* Sidebar */}
            <aside style={{ width: 260, background: "#0a2a45", color: "white", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "white" }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18 }}>U</div>
                        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em" }}>Admin<span style={{ color: "var(--color-primary)" }}>Panel</span></div>
                    </Link>
                </div>

                <nav style={{ flex: 1, padding: "20px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
                    {navItems.map(item => (
                        <Link key={item.href} href={item.href} style={{
                            display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                            color: "rgba(255,255,255,0.7)", textDecoration: "none", borderRadius: 8, fontSize: 14, fontWeight: 600,
                            transition: "all 0.2s"
                        }}
                            onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "white"; }}
                            onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                        >
                            <span style={{ fontSize: 18 }}>{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div style={{ padding: 20, borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                    Logged in as Admin
                    <br />
                    <Link href="/" style={{ color: "var(--color-primary)", textDecoration: "none", marginTop: 8, display: "inline-block" }}>
                        ← К каталогу
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <header style={{ height: 64, background: "white", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", padding: "0 30px", justifyContent: "flex-end" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text)" }}>
                        {session.user.name || session.user.email} (Administrator)
                    </div>
                </header>
                <div style={{ padding: 30, flex: 1, overflowY: "auto" }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
