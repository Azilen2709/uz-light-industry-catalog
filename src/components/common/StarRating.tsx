"use client";
// ─── StarRating — reusable star rating display ───────────────────────────

interface StarRatingProps {
    rating: number;     // e.g. 4.8
    reviewCount?: number;
    size?: number;      // font-size in px, default 14
}

export default function StarRating({ rating, reviewCount, size = 14 }: StarRatingProps) {
    const stars = Math.round(rating);

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ color: "#f59e0b", fontSize: size }}>
                {"★".repeat(stars)}{"☆".repeat(5 - stars)}
            </span>
            <span style={{ fontSize: size - 1, fontWeight: 700, color: "var(--color-text)" }}>
                {rating.toFixed(1)}
            </span>
            {reviewCount !== undefined && (
                <span style={{ fontSize: size - 2, color: "var(--color-muted)" }}>
                    ({reviewCount})
                </span>
            )}
        </div>
    );
}
