// ─── NextAuth Type Extensions ──────────────────────────────────────────────

import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: "BUYER" | "SELLER" | "ADMIN";
            companyId: number | null;
        } & DefaultSession["user"];
    }

    interface User {
        role: "BUYER" | "SELLER" | "ADMIN";
        companyId: number | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: "BUYER" | "SELLER" | "ADMIN";
        companyId: number | null;
    }
}
