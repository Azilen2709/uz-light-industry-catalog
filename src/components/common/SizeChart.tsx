"use client";
// ─── SizeChart — generic size table component ─────────────────────────────
// Renders any SIZE_TABLE from lib/taxonomy.ts.
// Usage: <SizeChart table={SIZE_TABLES.clothing} lang={lang} />

import type { Lang } from "@/lib/i18n/types";

interface SizeTableShape {
    label: { ru: string; en: string };
    columns: readonly string[];
    rows: readonly (readonly string[])[];
}

interface SizeChartProps {
    table: SizeTableShape;
    lang: Lang;
}

export default function SizeChart({ table, lang }: SizeChartProps) {
    if (!table || table.columns.length === 0) return null;

    return (
        <div style={{
            background: "white",
            border: "1px solid var(--color-border)",
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
        }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
                {table.label[lang]}
            </h3>
            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                        <tr style={{ background: "var(--color-primary)", color: "white" }}>
                            {table.columns.map((col) => (
                                <th
                                    key={col}
                                    style={{
                                        padding: "8px 12px",
                                        textAlign: "center",
                                        fontWeight: 700,
                                        whiteSpace: "nowrap",
                                        borderRight: "1px solid rgba(255,255,255,0.15)",
                                    }}
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {table.rows.map((row, ri) => (
                            <tr key={ri} style={{ background: ri % 2 === 0 ? "white" : "var(--color-bg)" }}>
                                {row.map((cell, ci) => (
                                    <td
                                        key={ci}
                                        style={{
                                            padding: "7px 12px",
                                            textAlign: "center",
                                            borderBottom: "1px solid var(--color-border)",
                                            borderRight: "1px solid var(--color-border)",
                                            fontWeight: ci === 0 ? 700 : 400,
                                            color: ci === 0 ? "var(--color-primary)" : "var(--color-text-secondary)",
                                        }}
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p style={{ fontSize: 11, color: "var(--color-muted)", marginTop: 10 }}>
                {lang === "ru"
                    ? "* Размеры указаны для ориентира. Уточняйте у фабрики по конкретному артикулу."
                    : "* Sizes are for reference only. Confirm exact measurements with the factory for the specific SKU."}
            </p>
        </div>
    );
}
