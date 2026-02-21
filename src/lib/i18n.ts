// ─── lib/i18n.ts — backward-compatible re-export proxy ───────────────────
// All consumers that import from "@/lib/i18n" continue to work unchanged.
// New code should import from "@/lib/i18n/<module>" directly.

export * from "./i18n/index";
