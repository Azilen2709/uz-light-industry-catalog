// ─── Route Protection Middleware ───────────────────────────────────────────

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const token = req.nextauth.token;

        // Seller trying to access buyer dashboard
        if (pathname.startsWith("/dashboard/buyer") && token?.role === "SELLER") {
            return NextResponse.redirect(new URL("/dashboard/seller", req.url));
        }

        // Buyer trying to access seller dashboard
        if (pathname.startsWith("/dashboard/seller") && token?.role === "BUYER") {
            return NextResponse.redirect(new URL("/dashboard/buyer", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/rfq/new",
        "/messages/:path*",
    ],
};
