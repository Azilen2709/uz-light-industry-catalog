"use client";
import { useEffect, useState } from "react";

interface Banner {
    id: number;
    title: string;
    imageUrl: string;
    linkUrl?: string | null;
    isActive: boolean;
    position: number;
}

export default function BannerStrip() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        fetch("/api/banners")
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) setBanners(data);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (banners.length <= 1) return;
        const timer = setInterval(() => setCurrent(i => (i + 1) % banners.length), 5000);
        return () => clearInterval(timer);
    }, [banners.length]);

    if (banners.length === 0) return null;

    const b = banners[current];

    return (
        <div style={{ position: "relative", width: "100%", height: 220, overflow: "hidden", background: "#0f172a" }}>
            {/* Background image */}
            <img
                src={b.imageUrl}
                alt={b.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7, transition: "opacity 0.5s" }}
            />

            {/* Overlay */}
            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)",
                display: "flex", alignItems: "center",
            }}>
                <div className="container" style={{ padding: "0 40px" }}>
                    <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", marginBottom: 12, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
                        {b.title}
                    </h2>
                    {b.linkUrl && (
                        <a
                            href={b.linkUrl}
                            style={{
                                display: "inline-block", padding: "10px 24px",
                                background: "var(--color-accent)", color: "white",
                                borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none",
                            }}
                        >
                            Подробнее →
                        </a>
                    )}
                </div>
            </div>

            {/* Dots */}
            {banners.length > 1 && (
                <div style={{
                    position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
                    display: "flex", gap: 6,
                }}>
                    {banners.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            style={{
                                width: i === current ? 20 : 8, height: 8,
                                borderRadius: 4, border: "none", cursor: "pointer",
                                background: i === current ? "white" : "rgba(255,255,255,0.4)",
                                transition: "all 0.3s",
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
