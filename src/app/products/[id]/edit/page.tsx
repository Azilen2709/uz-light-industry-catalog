import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProductEditClient from "./ProductEditClient";

export default async function ProductEditPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/auth/login");
    }

    const { id } = await params;
    const user = session.user as any;
    const productId = parseInt(id, 10);

    const product = await prisma.product.findUnique({
        where: { id: productId },
    });

    if (!product) {
        return (
            <div style={{ padding: "100px 24px", textAlign: "center" }}>
                <h2>Товар не найден</h2>
            </div>
        );
    }

    // Only allow the owning company's seller or admin to edit
    if (user.role === "SELLER" && product.companyId !== user.companyId) {
        return (
            <div style={{ padding: "100px 24px", textAlign: "center" }}>
                <h2>Нет доступа</h2>
                <p>Вы можете редактировать только товары своей компании.</p>
            </div>
        );
    }

    return <ProductEditClient product={product} />;
}
