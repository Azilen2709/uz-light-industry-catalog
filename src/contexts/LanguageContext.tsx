"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Lang, translations } from "@/lib/i18n";

type T = typeof translations[Lang];

interface LanguageContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: T;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: "ru",
    setLang: () => { },
    t: translations.ru as T,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Lang>("ru");

    useEffect(() => {
        const saved = localStorage.getItem("lang") as Lang | null;
        if (saved === "ru" || saved === "en") setLangState(saved);
    }, []);

    function setLang(l: Lang) {
        setLangState(l);
        localStorage.setItem("lang", l);
    }

    return (
        <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as T }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useT() {
    return useContext(LanguageContext);
}
