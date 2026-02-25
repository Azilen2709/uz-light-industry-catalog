import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function checkAdmin() {
    const session = await getServerSession(authOptions);
    const user = session?.user as any;
    return user?.role === "ADMIN";
}

// PATCH /api/admin/banners/[id] — update banner
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!await checkAdmin()) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const { id } = await params;
    const body = await req.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updated = await (prisma as any).banner.update({
        where: { id: parseInt(id) },
        data: body,
    });
    return NextResponse.json(updated);
}

// DELETE /api/admin/banners/[id] — delete banner
export async function DELETE(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!await checkAdmin()) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const { id } = await params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (prisma as any).banner.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ ok: true });
}
