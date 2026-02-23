// ─── Register API Route ────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, name, role = "BUYER" } = body;

        if (!email || !password || !name) {
            return NextResponse.json(
                { error: "Email, password and name are required" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: role === "SELLER" ? "SELLER" : "BUYER",
            },
            select: { id: true, email: true, name: true, role: true, createdAt: true },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error("Register error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
