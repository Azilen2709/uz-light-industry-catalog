// ─── RFQ Detail API ────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const userId = (session.user as { id: string }).id;
        const role = (session.user as { role: string }).role;

        const rfq = await prisma.rfqRequest.findUnique({
            where: { id },
            include: {
                buyer: { select: { id: true, name: true, email: true } },
                responses: {
                    include: {
                        seller: {
                            select: {
                                id: true, name: true, email: true,
                                company: { select: { id: true, name: true, region: true, verified: true } }
                            }
                        },
                    },
                    orderBy: { createdAt: "desc" },
                },
            },
        });

        if (!rfq) {
            return NextResponse.json({ error: "RFQ not found" }, { status: 404 });
        }

        // Security / Privacy:
        if (role === "BUYER" && rfq.buyerId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
        if (role === "SELLER") {
            // Sellers see only their own quotes
            rfq.responses = rfq.responses.filter(r => r.sellerId === userId);
        }

        return NextResponse.json(rfq);
    } catch (error) {
        console.error("GET /api/rfq/[id] error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const userId = (session.user as { id: string }).id;
        const body = await request.json();

        const rfq = await prisma.rfqRequest.findUnique({ where: { id } });
        if (!rfq || rfq.buyerId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const updated = await prisma.rfqRequest.update({
            where: { id },
            data: { status: body.status },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("PATCH /api/rfq/[id] error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
