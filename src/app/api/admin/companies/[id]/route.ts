import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { verified } = body;

        if (typeof verified !== "boolean") {
            return NextResponse.json({ error: "Invalid verified status" }, { status: 400 });
        }

        const updatedCompany = await prisma.company.update({
            where: { id: parseInt(id) },
            data: { verified },
            select: { id: true, name: true, verified: true }
        });

        return NextResponse.json(updatedCompany);
    } catch (error) {
        console.error("Error updating company:", error);
        return NextResponse.json({ error: "Failed to update company" }, { status: 500 });
    }
}
