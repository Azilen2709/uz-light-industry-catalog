// ─── RFQ API ───────────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = (session.user as { id: string }).id;
        const role = (session.user as { role: string }).role;

        let rfqs;
        if (role === "BUYER") {
            rfqs = await prisma.rfqRequest.findMany({
                where: { buyerId: userId },
                include: {
                    responses: { include: { seller: { select: { id: true, name: true, email: true } } } },
                },
                orderBy: { createdAt: "desc" },
            });
        } else {
            // Sellers see all OPEN rfqs
            rfqs = await prisma.rfqRequest.findMany({
                where: { status: "OPEN" },
                include: {
                    buyer: { select: { id: true, name: true, email: true } },
                    responses: { where: { sellerId: userId } },
                },
                orderBy: { createdAt: "desc" },
            });
        }

        return NextResponse.json(rfqs);
    } catch (error) {
        console.error("GET /api/rfq error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = (session.user as { id: string }).id;
        const body = await request.json();
        const { title, category, categorySlug, quantity, budget, deadline, description } = body;

        if (!title || !category || !quantity) {
            return NextResponse.json(
                { error: "title, category and quantity are required" },
                { status: 400 }
            );
        }

        const rfq = await prisma.rfqRequest.create({
            data: {
                title,
                category,
                categorySlug: categorySlug ?? "",
                quantity,
                budget: budget ?? null,
                deadline: deadline ?? null,
                description: description ?? null,
                buyerId: userId,
            },
        });

        return NextResponse.json(rfq, { status: 201 });
    } catch (error) {
        console.error("POST /api/rfq error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
