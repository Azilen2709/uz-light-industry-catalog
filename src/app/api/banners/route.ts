import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Public endpoint – returns active banners sorted by position
export async function GET() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const banners = await (prisma as any).banner.findMany({
            where: { isActive: true },
            orderBy: { position: "asc" },
        });
        return NextResponse.json(banners);
    } catch {
        return NextResponse.json([]);
    }
}
