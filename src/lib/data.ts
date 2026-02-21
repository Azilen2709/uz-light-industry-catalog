// ─── lib/data.ts — backward-compatible re-export proxy ────────────────────
// All consumers (pages, components) that import from "@/lib/data" continue
// to work unchanged. New code should import from "@/lib/data/<module>"
// directly for better tree-shaking.

export * from "./data/index";
