// ─── RFQ Respond API ───────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const role = (session.user as { role: string }).role;
        if (role !== "SELLER") {
            return NextResponse.json({ error: "Only sellers can respond to RFQs" }, { status: 403 });
        }

        const { id } = await params;
        const sellerId = (session.user as { id: string }).id;
        const body = await request.json();
        const { price, comment } = body;

        if (!price) {
            return NextResponse.json({ error: "price is required" }, { status: 400 });
        }

        const rfq = await prisma.rfqRequest.findUnique({ where: { id } });
        if (!rfq || rfq.status !== "OPEN") {
            return NextResponse.json({ error: "RFQ not found or not open" }, { status: 404 });
        }

        const response = await prisma.rfqResponse.create({
            data: { rfqId: id, sellerId, price, comment: comment ?? null },
            include: {
                seller: { select: { id: true, name: true, email: true } },
            },
        });

        // Move rfq to IN_PROGRESS if it was OPEN
        await prisma.rfqRequest.update({
            where: { id },
            data: { status: "IN_PROGRESS" },
        });

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error("POST /api/rfq/[id]/respond error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
