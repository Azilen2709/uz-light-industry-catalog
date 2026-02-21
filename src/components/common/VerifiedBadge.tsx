"use client";
// ─── VerifiedBadge — reusable "✓ Verified" badge ─────────────────────────
// Replaces duplicated inline badge across product, company, and catalog pages.

interface VerifiedBadgeProps {
    label: string;          // Translated text, e.g. t.product.verified
    size?: "sm" | "md";
}

export default function VerifiedBadge({ label, size = "md" }: VerifiedBadgeProps) {
    const fontSize = size === "sm" ? 10 : 12;
    const padding = size === "sm" ? "2px 8px" : "4px 12px";

    return (
        <span style={{
            background: "#fef9c3",
            color: "#854d0e",
            fontSize,
            fontWeight: 700,
            padding,
            borderRadius: 20,
            whiteSpace: "nowrap",
        }}>
            ✓ {label}
        </span>
    );
}
