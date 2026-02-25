import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.product.update({
            where: { id: parseInt(id) },
            data: { views: { increment: 1 } },
        });
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}
