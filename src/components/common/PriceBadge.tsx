"use client";
// ─── PriceBadge — In-Stock / White Label / RFQ badge ─────────────────────
// Centralises the 3-colour logic that was duplicated in 4+ places.

import type { ProductType } from "@/lib/data/types";

const BADGE_STYLES: Record<ProductType, { bg: string; text: string }> = {
    instock: { bg: "#dcfce7", text: "#15803d" },
    whitelabel: { bg: "#dbeafe", text: "#1d4ed8" },
    rfq: { bg: "#ede9fe", text: "#6d28d9" },
};

interface PriceBadgeProps {
    type: ProductType;
    label: string;           // Translated text from t.product.inStock / whiteLabel / rfq
    size?: "sm" | "md";
}

export default function PriceBadge({ type, label, size = "md" }: PriceBadgeProps) {
    const { bg, text } = BADGE_STYLES[type];
    const fontSize = size === "sm" ? 10 : 11;
    const padding = size === "sm" ? "2px 8px" : "3px 10px";

    return (
        <span style={{
            background: bg,
            color: text,
            fontSize,
            fontWeight: 700,
            padding,
            borderRadius: 12,
            textTransform: "uppercase" as const,
            whiteSpace: "nowrap",
        }}>
            {label}
        </span>
    );
}
