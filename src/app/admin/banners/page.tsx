export const dynamic = 'force-dynamic';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import BannersClient from "./BannersClient";
import { prisma } from "@/lib/prisma";

export default async function AdminBannersPage() {
    const session = await getServerSession(authOptions);
    const user = session?.user as any;
    if (!user || user.role !== "ADMIN") redirect("/auth/login");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const banners = await (prisma as any).banner?.findMany({ orderBy: { position: "asc" } }).catch(() => []) ?? [];

    return <BannersClient initialBanners={banners} />;
}

