import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { id } = await params;
        await prisma.product.delete({ where: { id: parseInt(id) } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        // Ensure bilingual fields are provided
        if (!body.titleRu || !body.titleEn) {
            return NextResponse.json({ error: "titleRu and titleEn are strictly required" }, { status: 400 });
        }

        const updated = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                titleRu: body.titleRu,
                titleEn: body.titleEn,
                descriptionRu: body.descriptionRu || "",
                descriptionEn: body.descriptionEn || "",
                priceFrom: body.priceMin ? parseFloat(body.priceMin) : undefined,
                priceTo: body.priceMax ? parseFloat(body.priceMax) : undefined,
                moq: body.moq ? String(body.moq) : undefined,
            }
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}
