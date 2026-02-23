"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useT } from "@/contexts/LanguageContext";

// ─── Types ────────────────────────────────────────────────────────────────

interface Message {
    id: number;
    from: "buyer" | "seller";
    text: string;
    time: string;
    read: boolean;
}

interface Conversation {
    id: number;
    companyId: number;
    company: string;
    region: string;
    verified: boolean;
    avatar: string;
    lastMessage: string;
    lastTime: string;
    unread: number;
    rfqId?: number;
    rfqTitle?: string;
    messages: Message[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────

const CONVERSATIONS: Conversation[] = [
    {
        id: 1, companyId: 1, company: "UzTextile Pro", region: "Ташкент", verified: true, avatar: "🧵",
        lastMessage: "Да, можем сделать 500 шт к 10 марта", lastTime: "14:32", unread: 2,
        rfqId: 1, rfqTitle: "Худи оверсайз 500 шт",
        messages: [
            { id: 1, from: "buyer", text: "Добрый день! Видел ваше КП по RFQ #1 на худи. Очень интересное предложение.", time: "10:15", read: true },
            { id: 2, from: "seller", text: "Здравствуйте! Рады ответить. Мы готовы взять ваш заказ в приоритет.", time: "10:28", read: true },
            { id: 3, from: "buyer", text: "Отлично. Можете подтвердить срок — 500 шт к 10 марта?", time: "11:40", read: true },
            { id: 4, from: "seller", text: "Да, можем сделать 500 шт к 10 марта. Нужно предоплату 30% для запуска.", time: "14:32", read: false },
            { id: 5, from: "seller", text: "Реквизиты пришлю на email если подтвердите.", time: "14:33", read: false },
        ],
    },
    {
        id: 2, companyId: 6, company: "Bukhara Carpet House", region: "Бухара", verified: true, avatar: "🟤",
        lastMessage: "Пришлите эскиз или референс", lastTime: "вчера", unread: 0,
        rfqId: undefined, rfqTitle: undefined,
        messages: [
            { id: 1, from: "buyer", text: "Здравствуйте! Интересует ковёр 3×4 м по индивидуальному орнаменту. Возможно?", time: "вчера, 16:10", read: true },
            { id: 2, from: "seller", text: "Добрый день! Конечно, мы специализируемся на ковры по эскизу. Пришлите эскиз или референс.", time: "вчера, 17:05", read: true },
        ],
    },
    {
        id: 3, companyId: 3, company: "StyleFactory", region: "Самарканд", verified: true, avatar: "👔",
        lastMessage: "Минимальный заказ для теста — 50 шт", lastTime: "Пн", unread: 0,
        messages: [
            { id: 1, from: "buyer", text: "Привет! Хочу заказать тест-партию мужских рубашек под свой бренд. Каков МЗК?", time: "Пн, 09:30", read: true },
            { id: 2, from: "seller", text: "Для тест-партии White Label минимальный заказ — 50 шт. Это специально для первого раза.", time: "Пн, 11:15", read: true },
            { id: 3, from: "buyer", text: "Понял, это очень удобно. Буду думать.", time: "Пн, 13:00", read: true },
        ],
    },
];

// ─── Component ────────────────────────────────────────────────────────────

export default function MessagesPage() {
    const { lang } = useT();
    const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS);
    const [activeId, setActiveId] = useState<number>(1);
    const [input, setInput] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);

    const L = {
        ru: {
            title: "Сообщения",
            search: "Поиск переписок...",
            home: "Главная",
            verified: "Проверена",
            rfq: "RFQ",
            you: "Вы",
            typeMsg: "Напишите сообщение...",
            send: "Отправить",
            noActive: "Выберите переписку слева",
            unread: "непрочитанных",
            factory: "Перейти к профилю",
            newMsg: "Написать фабрике",
        },
        en: {
            title: "Messages",
            search: "Search conversations...",
            home: "Home",
            verified: "Verified",
            rfq: "RFQ",
            you: "You",
            typeMsg: "Type a message...",
            send: "Send",
            noActive: "Select a conversation on the left",
            unread: "unread",
            factory: "View Profile",
            newMsg: "New Message",
        },
    }[lang];

    const active = conversations.find(c => c.id === activeId)!;

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeId, conversations]);

    const handleSend = () => {
        if (!input.trim()) return;
        const newMsg: Message = {
            id: Date.now(),
            from: "buyer",
            text: input.trim(),
            time: new Date().toLocaleTimeString(lang === "ru" ? "ru-RU" : "en-US", { hour: "2-digit", minute: "2-digit" }),
            read: true,
        };
        setConversations(cs => cs.map(c =>
            c.id === activeId
                ? { ...c, messages: [...c.messages, newMsg], lastMessage: newMsg.text, lastTime: newMsg.time, unread: 0 }
                : c
        ));
        setInput("");
    };

    const markRead = (id: number) => {
        setConversations(cs => cs.map(c =>
            c.id === id ? { ...c, unread: 0, messages: c.messages.map(m => ({ ...m, read: true })) } : c
        ));
    };

    return (
        <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
            {/* Page header */}
            <div style={{ background: "linear-gradient(135deg, var(--color-primary), #0a2a45)", padding: "20px 0 16px" }}>
                <div className="container" style={{ padding: "0 24px" }}>
                    <div style={{ display: "flex", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 10 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>{L.home}</Link>
                        <span>›</span>
                        <span style={{ color: "white", fontWeight: 600 }}>{L.title}</span>
                    </div>
                    <h1 style={{ color: "white", fontSize: 22, fontWeight: 900 }}>💬 {L.title}</h1>
                </div>
            </div>

            {/* Chat layout */}
            <div className="container" style={{ padding: "20px 24px" }}>
                <div style={{
                    display: "grid", gridTemplateColumns: "300px 1fr",
                    height: "calc(100vh - 200px)", minHeight: 500,
                    background: "white", border: "1px solid var(--color-border)",
                    borderRadius: 16, overflow: "hidden",
                }}>
                    {/* ── Left: conversation list ── */}
                    <div style={{ borderRight: "1px solid var(--color-border)", display: "flex", flexDirection: "column" }}>
                        {/* Search */}
                        <div style={{ padding: "14px 14px 10px", borderBottom: "1px solid var(--color-border)" }}>
                            <input
                                type="text"
                                placeholder={L.search}
                                style={{
                                    width: "100%", padding: "8px 12px", border: "1.5px solid var(--color-border)",
                                    borderRadius: 10, fontSize: 13, outline: "none", background: "var(--color-surface)",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>

                        {/* List */}
                        <div style={{ flex: 1, overflowY: "auto" }}>
                            {conversations.map(conv => (
                                <div
                                    key={conv.id}
                                    onClick={() => { setActiveId(conv.id); markRead(conv.id); }}
                                    style={{
                                        display: "flex", gap: 10, padding: "12px 14px",
                                        cursor: "pointer",
                                        background: activeId === conv.id ? "#f0f6ff" : "white",
                                        borderBottom: "1px solid var(--color-border)",
                                        borderLeft: activeId === conv.id ? "3px solid var(--color-primary)" : "3px solid transparent",
                                        transition: "background 0.15s",
                                    }}
                                >
                                    {/* Avatar */}
                                    <div style={{
                                        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                                        background: "linear-gradient(135deg, var(--color-primary), #5eb8ff)",
                                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                                        position: "relative",
                                    }}>
                                        {conv.avatar}
                                        {conv.verified && (
                                            <div style={{
                                                position: "absolute", bottom: -2, right: -2,
                                                width: 16, height: 16, borderRadius: "50%",
                                                background: "#16a34a", border: "2px solid white",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: 8, color: "white", fontWeight: 900,
                                            }}>✓</div>
                                        )}
                                    </div>

                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                                            <span style={{ fontWeight: 700, fontSize: 13, color: "var(--color-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>
                                                {conv.company}
                                            </span>
                                            <span style={{ fontSize: 11, color: "var(--color-muted)", flexShrink: 0, marginLeft: 4 }}>{conv.lastTime}</span>
                                        </div>
                                        {conv.rfqTitle && (
                                            <div style={{ fontSize: 10, color: "var(--color-primary)", fontWeight: 600, marginBottom: 2 }}>
                                                📐 {L.rfq}: {conv.rfqTitle}
                                            </div>
                                        )}
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{
                                                fontSize: 12, color: "var(--color-muted)", overflow: "hidden",
                                                textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 170,
                                            }}>
                                                {conv.lastMessage}
                                            </span>
                                            {conv.unread > 0 && (
                                                <span style={{
                                                    flexShrink: 0, marginLeft: 4,
                                                    background: "var(--color-primary)", color: "white",
                                                    fontSize: 10, fontWeight: 700, borderRadius: 10,
                                                    padding: "2px 6px", minWidth: 18, textAlign: "center",
                                                }}>
                                                    {conv.unread}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* New chat button */}
                        <div style={{ padding: 12, borderTop: "1px solid var(--color-border)" }}>
                            <Link href="/companies" className="btn btn-primary" style={{ width: "100%", display: "block", textAlign: "center", fontSize: 13 }}>
                                ✏️ {L.newMsg}
                            </Link>
                        </div>
                    </div>

                    {/* ── Right: chat window ── */}
                    {active ? (
                        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                            {/* Chat header */}
                            <div style={{
                                padding: "12px 20px", borderBottom: "1px solid var(--color-border)",
                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                background: "white",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <div style={{
                                        width: 42, height: 42, borderRadius: 10,
                                        background: "linear-gradient(135deg, var(--color-primary), #5eb8ff)",
                                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                                    }}>
                                        {active.avatar}
                                    </div>
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            <span style={{ fontWeight: 800, fontSize: 15 }}>{active.company}</span>
                                            {active.verified && (
                                                <span style={{ fontSize: 10, background: "#fef9c3", color: "#854d0e", fontWeight: 700, padding: "2px 6px", borderRadius: 8 }}>
                                                    ✓ {L.verified}
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ fontSize: 12, color: "var(--color-muted)" }}>
                                            📍 {active.region}
                                            {active.rfqTitle && (
                                                <> · <span style={{ color: "var(--color-primary)" }}>📐 {active.rfqTitle}</span></>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <Link href={`/companies/${active.companyId}`} style={{
                                    fontSize: 12, fontWeight: 600, color: "var(--color-primary)",
                                    textDecoration: "none", padding: "6px 12px",
                                    border: "1px solid var(--color-primary)", borderRadius: 8,
                                }}>
                                    🏭 {L.factory}
                                </Link>
                            </div>

                            {/* Messages */}
                            <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 12, background: "var(--color-surface)" }}>
                                {active.messages.map((msg, i) => {
                                    const isBuyer = msg.from === "buyer";
                                    const showDate = i === 0 || active.messages[i - 1].from !== msg.from;
                                    return (
                                        <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: isBuyer ? "flex-end" : "flex-start" }}>
                                            {showDate && (
                                                <div style={{
                                                    fontSize: 11, color: "var(--color-muted)", marginBottom: 4,
                                                    alignSelf: "center", background: "white",
                                                    borderRadius: 8, padding: "2px 10px",
                                                    border: "1px solid var(--color-border)",
                                                }}>
                                                    {isBuyer ? L.you : active.company}
                                                </div>
                                            )}
                                            <div style={{
                                                maxWidth: "70%",
                                                background: isBuyer ? "var(--color-primary)" : "white",
                                                color: isBuyer ? "white" : "var(--color-text)",
                                                border: isBuyer ? "none" : "1px solid var(--color-border)",
                                                borderRadius: isBuyer ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                                                padding: "10px 14px", fontSize: 14, lineHeight: 1.55,
                                                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                                            }}>
                                                {msg.text}
                                                <div style={{
                                                    fontSize: 10, marginTop: 4, textAlign: "right",
                                                    color: isBuyer ? "rgba(255,255,255,0.6)" : "var(--color-muted)",
                                                    display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4,
                                                }}>
                                                    {msg.time}
                                                    {isBuyer && <span>{msg.read ? "✓✓" : "✓"}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={bottomRef} />
                            </div>

                            {/* Input */}
                            <div style={{
                                padding: "12px 16px", borderTop: "1px solid var(--color-border)",
                                display: "flex", gap: 10, background: "white",
                            }}>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && handleSend()}
                                    placeholder={L.typeMsg}
                                    style={{
                                        flex: 1, padding: "10px 14px",
                                        border: "1.5px solid var(--color-border)", borderRadius: 24,
                                        fontSize: 14, outline: "none", background: "var(--color-surface)",
                                        fontFamily: "inherit",
                                    }}
                                    onFocus={e => (e.target.style.borderColor = "var(--color-primary)")}
                                    onBlur={e => (e.target.style.borderColor = "var(--color-border)")}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    style={{
                                        width: 44, height: 44, borderRadius: "50%", border: "none",
                                        background: input.trim() ? "var(--color-primary)" : "var(--color-border)",
                                        color: "white", fontSize: 18, cursor: input.trim() ? "pointer" : "not-allowed",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        transition: "background 0.15s",
                                        flexShrink: 0,
                                    }}
                                >
                                    ➤
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-muted)", fontSize: 15 }}>
                            {L.noActive}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
