// Neon Glowing SVG Icons — UZ LIGHT INDUSTRY CATALOG
// Each icon: SVG path with CSS filter drop-shadow for neon glow effect

import React from "react";

type NeonColor = "blue" | "cyan" | "green" | "purple" | "orange" | "pink" | "gold";

const glowColors: Record<NeonColor, { stroke: string; glow1: string; glow2: string }> = {
    blue: { stroke: "#5eb8ff", glow1: "rgba(94,184,255,0.8)", glow2: "rgba(94,184,255,0.3)" },
    cyan: { stroke: "#00e5ff", glow1: "rgba(0,229,255,0.8)", glow2: "rgba(0,229,255,0.3)" },
    green: { stroke: "#00ff88", glow1: "rgba(0,255,136,0.8)", glow2: "rgba(0,255,136,0.3)" },
    purple: { stroke: "#bf7fff", glow1: "rgba(191,127,255,0.8)", glow2: "rgba(191,127,255,0.3)" },
    orange: { stroke: "#ffaa44", glow1: "rgba(255,170,68,0.8)", glow2: "rgba(255,170,68,0.3)" },
    pink: { stroke: "#ff6eb4", glow1: "rgba(255,110,180,0.8)", glow2: "rgba(255,110,180,0.3)" },
    gold: { stroke: "#ffd700", glow1: "rgba(255,215,0,0.8)", glow2: "rgba(255,215,0,0.3)" },
};

interface NeonIconProps {
    size?: number;
    color?: NeonColor;
    className?: string;
    style?: React.CSSProperties;
}

function makeNeonStyle(color: NeonColor): React.CSSProperties {
    const c = glowColors[color];
    return {
        filter: `
      drop-shadow(0 0 3px ${c.glow1})
      drop-shadow(0 0 8px ${c.glow1})
      drop-shadow(0 0 18px ${c.glow2})
    `,
    };
}

// 👕 Clothing / T-Shirt
export function NeonClothingIcon({ size = 40, color = "blue", style, className }: NeonIconProps) {
    const c = glowColors[color];
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ ...makeNeonStyle(color), ...style }} className={className}>
            <path d="M4 10 L12 6 L16 12 C16 12 17.5 14 20 14 C22.5 14 24 12 24 12 L28 6 L36 10 L32 18 L28 16 L28 34 L12 34 L12 16 L8 18 Z"
                stroke={c.stroke} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" fill="none" />
        </svg>
    );
}

// 👗 Dress
export function NeonDressIcon({ size = 40, color = "pink", style, className }: NeonIconProps) {
    const c = glowColors[color];
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ ...makeNeonStyle(color), ...style }} className={className}>
            <path d="M14 5 L20 5 L26 5 L28 14 L22 16 L22 35 L18 35 L18 16 L12 14 Z"
                stroke={c.stroke} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            <path d="M14 5 C14 5 16 8 20 8 C24 8 26 5 26 5"
                stroke={c.stroke} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
    );
}

// 👟 Shoe
export function NeonShoeIcon({ size = 40, color = "orange", style, className }: NeonIconProps) {
    const c = glowColors[color];
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ ...makeNeonStyle(color), ...style }} className={className}>
            <path d="M6 26 C6 26 8 18 14 16 L18 16 L22 12 L28 14 L34 20 L34 26 L28 28 L6 28 Z"
                stroke={c.stroke} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            <path d="M22 12 L22 16" stroke={c.stroke} strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M6 28 L34 28" stroke={c.stroke} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
    );
}

// 🛏️ Bed / Home Textile
export function NeonBedIcon({ size = 40, color = "cyan", style, className }: NeonIconProps) {
    const c = glowColors[color];
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ ...makeNeonStyle(color), ...style }} className={className}>
            <rect x="4" y="22" width="32" height="10" rx="2" stroke={c.stroke} strokeWidth="1.8" fill="none" />
            <rect x="4" y="16" width="32" height="8" rx="2" stroke={c.stroke} strokeWidth="1.8" fill="none" />
            <rect x="6" y="10" width="8" height="8" rx="2" stroke={c.stroke} strokeWidth="1.8" fill="none" />
            <line x1="4" y1="32" x2="4" y2="36" stroke={c.stroke} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="36" y1="32" x2="36" y2="36" stroke={c.stroke} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

// 🧶 Knitwear / Yarn
export function NeonKnitwearIcon({ size = 40, color = "purple", style, className }: NeonIconProps) {
    const c = glowColors[color];
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ ...makeNeonStyle(color), ...style }} className={className}>
            <circle cx="20" cy="22" r="12" stroke={c.stroke} strokeWidth="1.8" fill="none" />
            <path d="M20 10 C20 10 24 8 26 6" stroke={c.stroke} strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M8 22 C10 18 14 16 20 22 C26 28 30 26 32 22"
                stroke={c.stroke} strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M8 26 C10 22 14 20 20 26 C26 32 30 30 32 26"
                stroke={c.stroke} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
    );
}

// 🧣 Accessories / Scarf
export function NeonAccessoriesIcon({ size = 40, color = "gold", style, className }: NeonIconProps) {
    const c = glowColors[color];
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ ...makeNeonStyle(color), ...style }} className={className}>
            <path d="M14 6 C14 6 12 10 12 16 C12 22 14 26 16 28 C18 30 18 34 16 36"
                stroke={c.stroke} strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M22 6 C22 6 24 10 24 16 C24 22 22 26 24 28 C26 30 28 28 28 24 L30 18 L26 18"
                stroke={c.stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M14 6 L22 6" stroke={c.stroke} strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="16" cy="6" r="2" stroke={c.stroke} strokeWidth="1.5" fill="none" />
            <circle cx="22" cy="6" r="2" stroke={c.stroke} strokeWidth="1.5" fill="none" />
        </svg>
    );
}

// 🪣 Carpet / Rug
export function NeonCarpetIcon({ size = 40, color = "green", style, className }: NeonIconProps) {
    const c = glowColors[color];
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ ...makeNeonStyle(color), ...style }} className={className}>
            <rect x="6" y="8" width="28" height="24" rx="2" stroke={c.stroke} strokeWidth="1.8" fill="none" />
            <rect x="10" y="12" width="20" height="16" rx="1" stroke={c.stroke} strokeWidth="1.2" fill="none" />
            <line x1="20" y1="12" x2="20" y2="28" stroke={c.stroke} strokeWidth="1.2" />
            <line x1="10" y1="20" x2="30" y2="20" stroke={c.stroke} strokeWidth="1.2" />
            <path d="M6 8 L4 6 M34 8 L36 6 M6 32 L4 34 M34 32 L36 34"
                stroke={c.stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

// 👔 Workwear / Shirt
export function NeonWorkwearIcon({ size = 40, color = "blue", style, className }: NeonIconProps) {
    const c = glowColors[color];
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ ...makeNeonStyle(color), ...style }} className={className}>
            <path d="M6 10 L14 6 L17 10 L20 8 L23 10 L26 6 L34 10 L30 18 L26 16 L26 34 L14 34 L14 16 L10 18 Z"
                stroke={c.stroke} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            <line x1="20" y1="8" x2="20" y2="18" stroke={c.stroke} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    );
}

// 🏭 Factory
export function NeonFactoryIcon({ size = 40, color = "blue", style, className }: NeonIconProps) {
    const c = glowColors[color];
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ ...makeNeonStyle(color), ...style }} className={className}>
            <path d="M4 34 L4 18 L14 24 L14 18 L24 24 L24 18 L34 24 L34 34 Z"
                stroke={c.stroke} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            <path d="M10 8 L10 24" stroke={c.stroke} strokeWidth="3" strokeLinecap="round" />
            <path d="M18 4 L18 24" stroke={c.stroke} strokeWidth="3" strokeLinecap="round" />
            <rect x="15" y="26" width="10" height="8" rx="1" stroke={c.stroke} strokeWidth="1.5" fill="none" />
        </svg>
    );
}

// 📦 Box / In-Stock
export function NeonBoxIcon({ size = 40, color = "green", style, className }: NeonIconProps) {
    const c = glowColors[color];
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ ...makeNeonStyle(color), ...style }} className={className}>
            <path d="M6 14 L20 8 L34 14 L34 30 L20 36 L6 30 Z"
                stroke={c.stroke} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            <path d="M6 14 L20 20 L34 14" stroke={c.stroke} strokeWidth="1.8" strokeLinejoin="round" fill="none" />
            <line x1="20" y1="20" x2="20" y2="36" stroke={c.stroke} strokeWidth="1.8" />
            <path d="M13 11 L27 17" stroke={c.stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

// 📐 RFQ / Drawing / Tech Pack
export function NeonRFQIcon({ size = 40, color = "purple", style, className }: NeonIconProps) {
    const c = glowColors[color];
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ ...makeNeonStyle(color), ...style }} className={className}>
            <rect x="8" y="6" width="24" height="28" rx="2" stroke={c.stroke} strokeWidth="1.8" fill="none" />
            <line x1="12" y1="14" x2="28" y2="14" stroke={c.stroke} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="20" x2="28" y2="20" stroke={c.stroke} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="26" x2="22" y2="26" stroke={c.stroke} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M25 24 L30 30" stroke={c.stroke} strokeWidth="2" strokeLinecap="round" />
            <circle cx="24" cy="24" r="3" stroke={c.stroke} strokeWidth="1.5" fill="none" />
        </svg>
    );
}

// 🏷️ White Label / Tag
export function NeonTagIcon({ size = 40, color = "cyan", style, className }: NeonIconProps) {
    const c = glowColors[color];
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ ...makeNeonStyle(color), ...style }} className={className}>
            <path d="M6 6 L22 6 L34 18 L22 30 L10 30 L6 26 Z"
                stroke={c.stroke} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            <circle cx="13" cy="13" r="2.5" stroke={c.stroke} strokeWidth="1.5" fill="none" />
        </svg>
    );
}

// 🔍 Search
export function NeonSearchIcon({ size = 20, color = "blue", style, className }: NeonIconProps) {
    const c = glowColors[color];
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ ...makeNeonStyle(color), ...style }} className={className}>
            <circle cx="11" cy="11" r="6" stroke={c.stroke} strokeWidth="2" fill="none" />
            <line x1="16" y1="16" x2="21" y2="21" stroke={c.stroke} strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

// ✅ Verified checkmark
export function NeonVerifiedIcon({ size = 16, color = "gold", style, className }: NeonIconProps) {
    const c = glowColors[color];
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ ...makeNeonStyle(color), ...style }} className={className}>
            <path d="M12 2 L15 5 L19 4 L20 8 L24 10 L22 14 L24 18 L20 20 L19 24 L15 22 L12 25 L9 22 L5 24 L4 20 L0 18 L2 14 L0 10 L4 8 L5 4 L9 5 Z"
                stroke={c.stroke} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
            <path d="M8 12 L11 15 L16 9" stroke={c.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
