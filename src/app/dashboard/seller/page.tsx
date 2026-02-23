import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SellerDashboardClient from "./SellerDashboardClient";
import { redirect } from "next/navigation";

export default async function SellerDashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/auth/login");
    }

    const user = session.user as any;

    if (user.role !== "SELLER" || !user.companyId) {
        redirect("/auth/login");
    }

    const company = await prisma.company.findUnique({
        where: { id: user.companyId }
    });

    if (!company) {
        redirect("/auth/login");
    }

    const products = await prisma.product.findMany({
        where: { companyId: user.companyId }
    });

    return <SellerDashboardClient company={company} myProducts={products} />;
}
