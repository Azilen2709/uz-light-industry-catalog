import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET /api/admin/banners — list all banners (admin only)
export async function GET() {
    const session = await getServerSession(authOptions);
    const user = session?.user as any;
    if (!user || user.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const banners = await (prisma as any).banner.findMany({ orderBy: { position: "asc" } });
    return NextResponse.json(banners);
}

// POST /api/admin/banners — create banner (admin only)
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const user = session?.user as any;
    if (!user || user.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const body = await req.json();
    const { title, imageUrl, linkUrl, isActive, position } = body;
    if (!title || !imageUrl) {
        return NextResponse.json({ error: "title and imageUrl are required" }, { status: 400 });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const banner = await (prisma as any).banner.create({
        data: { title, imageUrl, linkUrl: linkUrl || null, isActive: isActive ?? true, position: position ?? 0 },
    });
    return NextResponse.json(banner, { status: 201 });
}
