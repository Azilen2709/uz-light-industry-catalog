// ─── Product by ID API ─────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
            include: {
                company: true,
            },
        });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("GET /api/products/[id] error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = session.user as any;
        const { id } = await params;
        const productId = parseInt(id);

        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // SELLER can only edit own company's products; ADMIN can edit all
        if (user.role === "SELLER" && product.companyId !== user.companyId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
        if (user.role !== "SELLER" && user.role !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const body = await request.json();
        const { titleRu, titleEn, descriptionRu, descriptionEn, moq, priceFrom, priceTo, leadTime } = body;

        const updated = await prisma.product.update({
            where: { id: productId },
            data: {
                ...(titleRu !== undefined && { titleRu }),
                ...(titleEn !== undefined && { titleEn }),
                ...(descriptionRu !== undefined && { descriptionRu }),
                ...(descriptionEn !== undefined && { descriptionEn }),
                ...(moq !== undefined && { moq }),
                ...(priceFrom !== undefined && { priceFrom: parseFloat(priceFrom) }),
                ...(priceTo !== undefined && { priceTo: parseFloat(priceTo) }),
                ...(leadTime !== undefined && { leadTime }),
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("PATCH /api/products/[id] error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

