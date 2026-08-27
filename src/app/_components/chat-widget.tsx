"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  PiChatCircleDots,
  PiPaperPlaneRightFill,
  PiXBold,
} from "react-icons/pi";
import { ChatMessageContent } from "./chat-message-content";
import { SpecularAction } from "@/app/_components/specular-action";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  lang: string;
};

async function requestChatReply(messages: Message[], lang: string): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, lang }),
  });

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    if (
      data &&
      typeof data === "object" &&
      "reply" in data &&
      typeof data.reply === "string"
    ) {
      return data.reply;
    }
    throw new Error("Chat request failed");
  }

  if (
    !data ||
    typeof data !== "object" ||
    !("reply" in data) ||
    typeof data.reply !== "string"
  ) {
    throw new Error("Invalid chat response");
  }

  return data.reply;
}

export function ChatWidget({ lang }: Props) {
  const isEn = lang === "en";
  const pathname = usePathname();
  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`;
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [animState, setAnimState] = useState<"closed" | "opening" | "open" | "closing">("closed");
  const [introActive, setIntroActive] = useState(isHomePage);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatPanelRef = useRef<HTMLDivElement>(null);
  const messagesAreaRef = useRef<HTMLDivElement>(null);
  const isVisible = animState !== "closed";

  const quickQuestions = isEn
    ? [
        "What kind of work do you do?",
        "Show me your AI music projects",
        "Tell me about NeonCity",
      ]
    : [
        "你主要做什么方向？",
        "介绍一下你的 AI 音乐项目",
        "聊聊 NeonCity",
      ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isHomePage) {
      setIntroActive(false);
      return;
    }

    const updateIntroActive = () => {
      const intro = document.querySelector(".flow-intro-hero");
      setIntroActive(Boolean(intro && intro.getBoundingClientRect().bottom > 80));
    };

    updateIntroActive();
    window.addEventListener("scroll", updateIntroActive, { passive: true });
    window.addEventListener("resize", updateIntroActive);

    return () => {
      window.removeEventListener("scroll", updateIntroActive);
      window.removeEventListener("resize", updateIntroActive);
    };
  }, [isHomePage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;
    let closeTimer: ReturnType<typeof setTimeout> | undefined;

    if (isOpen) {
      setAnimState("opening");
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => {
          setAnimState("open");
        });
      });
    } else {
      setAnimState((current) => current === "closed" ? current : "closing");
      closeTimer = setTimeout(() => setAnimState("closed"), 300);
    }

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, [isOpen]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isOpen && isMobile) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;
    }

    return () => {
      if (isMobile) {
        const scrollY = document.body.style.top;
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.top = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const panel = chatPanelRef.current;
    if (!panel) return;

    const handler = (event: WheelEvent) => {
      event.stopPropagation();

      const scrollEl = messagesAreaRef.current;
      if (!scrollEl) {
        event.preventDefault();
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const atTop = scrollTop <= 0 && event.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && event.deltaY > 0;

      if (!atTop && !atBottom && scrollHeight > clientHeight) return;
      event.preventDefault();
    };

    panel.addEventListener("wheel", handler, { passive: false });
    return () => panel.removeEventListener("wheel", handler);
  }, [isVisible]);

  const submitMessages = async (nextMessages: Message[]) => {
    if (isLoading) return;

    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const reply = await requestChatReply(nextMessages, lang);
      setMessages([...nextMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: isEn
            ? "Sorry, the chat is taking a little nap right now. Please try again later or email me at luoyihan17@gmail.com."
            : "抱歉，聊天功能现在有点走神。你可以稍后再试，或者直接发邮件到 luoyihan17@gmail.com。",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setInput("");
    void submitMessages(nextMessages);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    if (isLoading) return;
    void submitMessages([{ role: "user", content: question }]);
  };

  const handleBackdropWheel = (event: React.WheelEvent) => {
    window.scrollBy(0, event.deltaY);
  };

  if (!mounted || !isHomePage) return null;

  return (
    <>
      {createPortal(
        <div
          className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${
            isVisible || introActive ? "pointer-events-none translate-y-2 opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src="/assets/functional-images/yihan-chat-illustration.png"
            alt=""
            width={1420}
            height={621}
            priority
            unoptimized
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[calc(100%-0.95rem)] left-[55%] z-10 h-auto w-[72%] -translate-x-1/2 select-none drop-shadow-[0_3px_3px_rgba(0,0,0,0.12)]"
          />
          <SpecularAction
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative z-0 specular-action--pill shadow-lg"
            size="md"
            radius={999}
            aria-label={isEn ? "Chat with Yihan" : "和艺涵聊聊"}
          >
            <PiChatCircleDots className="h-5 w-5" />
            <span className="text-base font-medium">
              {isEn ? "Chat with Yihan" : "和艺涵聊聊"}
            </span>
          </SpecularAction>
        </div>,
        document.body,
      )}

      {isVisible && createPortal(
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div
            className="absolute inset-0 hidden transition-colors duration-300 pointer-events-auto md:block"
            style={{
              backgroundColor: animState === "open" ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
            }}
            onClick={() => setIsOpen(false)}
            onWheel={handleBackdropWheel}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-end pointer-events-none md:px-5 md:pb-6">
            <div
              ref={chatPanelRef}
              className="pointer-events-auto flex h-full w-full flex-col overflow-hidden bg-white transition-transform duration-300 ease-out md:h-auto md:max-h-[70vh] md:max-w-[1024px] md:rounded-2xl md:border md:border-neutral-200/70 md:shadow-2xl"
              style={{
                transform: animState === "open" ? "translateY(0)" : "translateY(100%)",
              }}
            >
              <div className="flex flex-shrink-0 items-center justify-between px-3 py-3">
                <div className="flex items-center gap-2 pl-1">
                  <PiChatCircleDots className="h-5 w-5 text-neutral-800" />
                  <span className="text-base font-semibold text-neutral-800">
                    {isEn ? "Chat with Yihan" : "和艺涵聊聊"}
                  </span>
                </div>
                <SpecularAction
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="specular-action--icon"
                  radius={12}
                  aria-label={isEn ? "Close chat" : "关闭聊天"}
                >
                  <PiXBold className="h-4 w-4" />
                </SpecularAction>
              </div>

              <div
                ref={messagesAreaRef}
                className="flex-1 space-y-4 overflow-y-auto px-4 py-3"
              >
                {messages.length === 0 && (
                  <div className="mx-auto max-w-xl pt-6 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white">
                      <PiChatCircleDots className="h-6 w-6" />
                    </div>
                    <p className="text-base font-semibold text-neutral-900">
                      {isEn ? "Hi, I’m Yihan’s site guide." : "你好，我是艺涵的网站导览。"}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                      {isEn
                        ? "Ask me about her AI music work, VR projects, curation, resume, or anything on this portfolio."
                        : "你可以问我她的 AI 音乐、VR 项目、策展经历、简历，或者这个作品集里的任何内容。"}
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      {quickQuestions.map((question) => (
                        <SpecularAction
                          key={question}
                          type="button"
                          onClick={() => handleQuickQuestion(question)}
                          className="specular-action--compact specular-action--pill specular-action--soft"
                          radius={999}
                        >
                          {question}
                        </SpecularAction>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed md:max-w-[72%] ${
                        message.role === "user"
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-100 text-neutral-800"
                      }`}
                    >
                      <ChatMessageContent content={message.content} />
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-neutral-100 px-4 py-2.5 text-sm text-neutral-500">
                      {isEn ? "Thinking" : "思考中"}
                      <span className="animate-typing-dots" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex-shrink-0 border-t border-neutral-100 p-3">
                <div className="flex items-end gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-2 focus-within:border-neutral-300 focus-within:bg-white">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    maxLength={1000}
                    placeholder={isEn ? "Ask about Yihan’s work…" : "问问艺涵的作品…"}
                    className="max-h-28 min-h-[2.25rem] flex-1 resize-none bg-transparent px-2 py-2 text-sm leading-relaxed text-neutral-900 outline-none placeholder:text-neutral-400"
                    disabled={isLoading}
                  />
                  <SpecularAction
                    type="button"
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="specular-action--icon specular-action--pill"
                    radius={999}
                    aria-label={isEn ? "Send message" : "发送消息"}
                  >
                    <PiPaperPlaneRightFill className="h-4 w-4" />
                  </SpecularAction>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
