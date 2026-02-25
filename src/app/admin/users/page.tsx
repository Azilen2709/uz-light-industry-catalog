export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import UsersClient from "./UsersClient";

export default async function AdminUsersPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            companyId: true,
            company: { select: { name: true } }
        }
    });

    // Dates from Prisma are Date objects, convert to ISO strings for harmless serialization
    const serializedUsers = users.map(u => ({
        ...u,
        createdAt: u.createdAt.toISOString()
    }));

    return <UsersClient initialUsers={serializedUsers as any} />;
}

