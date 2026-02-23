// ─── Messages API ──────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = (session.user as { id: string }).id;

        const messages = await prisma.message.findMany({
            where: {
                OR: [{ fromId: userId }, { toId: userId }],
            },
            include: {
                from: { select: { id: true, name: true, email: true } },
                to: { select: { id: true, name: true, email: true } },
            },
            orderBy: { createdAt: "desc" },
            take: 100,
        });

        return NextResponse.json(messages);
    } catch (error) {
        console.error("GET /api/messages error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const fromId = (session.user as { id: string }).id;
        const body = await request.json();
        const { toId, text, rfqId } = body;

        if (!toId || !text) {
            return NextResponse.json({ error: "toId and text are required" }, { status: 400 });
        }

        const message = await prisma.message.create({
            data: { fromId, toId, text, rfqId: rfqId ?? null },
            include: {
                from: { select: { id: true, name: true } },
                to: { select: { id: true, name: true } },
            },
        });

        return NextResponse.json(message, { status: 201 });
    } catch (error) {
        console.error("POST /api/messages error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
