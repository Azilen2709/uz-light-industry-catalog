async function fetchRegions() {
    try {
        const res = await fetch("https://cs.egov.uz/apiData/MainData/GetByFile?id=62015debe41046834d147eb0&fileType=1&lang=2");
        const data = await res.json();

        const translit = (str: string) => {
            const ru = "А-а-Б-б-В-в-Г-г-Д-д-Е-е-Ё-ё-Ж-ж-З-з-И-и-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я".split("-");
            const en = "A-a-B-b-V-v-G-g-D-d-E-e-E-e-Zh-zh-Z-z-I-i-Y-y-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-Kh-kh-Ts-ts-Ch-ch-Sh-sh-Shch-shch-'-'-Y-y-'-'-E-e-Yu-yu-Ya-ya".split("-");
            let res = "";
            for (let i = 0, l = str.length; i < l; i++) {
                const s = str.charAt(i), n = ru.indexOf(s);
                if (n >= 0) { res += en[n]; }
                else { res += s; }
            }
            return res;
        };

        const slugify = (str: string) => translit(str).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

        const regions = new Map();

        for (const item of data) {
            let code = "";
            let name = "";
            const vals = Object.values(item);
            if (vals.length >= 2) {
                code = String(vals[0]).trim();
                name = String(vals[1]).trim();
            }

            if (code && name) {
                if (code.length === 4) {
                    regions.set(code, {
                        id: code,
                        slug: slugify(name),
                        ru: name,
                        en: translit(name),
                        districts: []
                    });
                } else if (code.length === 7) {
                    const regionCode = code.substring(0, 4);
                    if (regions.has(regionCode)) {
                        regions.get(regionCode).districts.push({
                            id: code,
                            ru: name,
                            en: translit(name)
                        });
                    }
                }
            }
        }

        let tsCode = `// ─── Uzbekistan regions (Generated from cs.egov.uz) ───────────────────────\n\n`;
        tsCode += `import type { Region } from "./types";\n\n`;
        tsCode += `export const REGIONS: Region[] = [\n`;

        for (const [code, region] of regions.entries()) {
            tsCode += `    {\n`;
            tsCode += `        id: "${region.id}",\n`;
            tsCode += `        slug: "${region.slug}",\n`;
            tsCode += `        ru: "${region.ru}",\n`;
            tsCode += `        en: "${region.en}",\n`;
            tsCode += `        districts: [\n`;
            for (const district of region.districts) {
                tsCode += `            { id: "${district.id}", ru: "${district.ru}", en: "${district.en}" },\n`;
            }
            tsCode += `        ]\n`;
            tsCode += `    },\n`;
        }
        tsCode += `];\n\n`;

        tsCode += `/** Returns the display label for a region stored in Russian */
export function getRegionLabel(ruName: string, lang: "ru" | "en"): string {
    const found = REGIONS.find(r => r.ru === ruName);
    if (!found) return ruName; // fallback: return as-is
    return lang === "en" ? found.en : found.ru;
}

/** Returns all RU region names (for product data compatibility) */
export function getRegionRuNames(): string[] {
    return REGIONS.map(r => r.ru);
}
`;

        const fs = require('fs');
        fs.writeFileSync("src/lib/data/regions.ts", tsCode);
        console.log("Successfully generated src/lib/data/regions.ts limit: " + regions.size + " regions.");
    } catch (e) {
        console.error(e);
    }
}
fetchRegions();
