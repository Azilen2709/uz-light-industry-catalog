import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import BuyerDashboardClient from "./BuyerDashboardClient";
import { redirect } from "next/navigation";

export default async function BuyerDashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/auth/login");
    }

    const user = session.user as any;

    if (user.role !== "BUYER") {
        redirect("/auth/login");
    }

    // Fetch buyer's RFQs
    const myRfqs = await prisma.rfqRequest.findMany({
        where: { buyerId: user.id },
        include: {
            _count: { select: { responses: true } }
        },
        orderBy: { createdAt: "desc" },
    });

    return <BuyerDashboardClient user={{ name: user.name, email: user.email }} myRfqs={myRfqs} />;
}
