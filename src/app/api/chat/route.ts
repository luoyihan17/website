import { NextRequest, NextResponse } from "next/server";
import { getAllItems, type ContentCollection } from "@/lib/api";

export const runtime = "nodejs";
export const maxDuration = 60;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequestBody = {
  messages: ChatMessage[];
  lang: "en" | "zh";
  roundCount: number;
};

const MAX_MESSAGE_LENGTH = 4_000;
const MAX_CONVERSATION_ROUNDS = 10;
const MAX_REQUEST_MESSAGES = 40;
const DEFAULT_CHAT_API_URL = "https://api.deepseek.com/chat/completions";
const DEFAULT_CHAT_MODEL = "deepseek-chat";
const CHAT_TIMEOUT_MS = 45_000;

const COLLECTION_LABELS: Record<"en" | "zh", Record<ContentCollection, string>> = {
  en: {
    creation: "Creations",
    experience: "Experiences",
    project: "Projects",
    writing: "Writings",
  },
  zh: {
    creation: "创作",
    experience: "经历",
    project: "项目",
    writing: "写作",
  },
};

function getRecentConversation(messages: ChatMessage[]) {
  let userRounds = 0;
  let startIndex = messages.length - 1;

  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index].role !== "user") continue;

    userRounds += 1;
    startIndex = index;
    if (userRounds === MAX_CONVERSATION_ROUNDS) break;
  }

  return messages.slice(startIndex);
}

function parseChatRequestBody(value: unknown): ChatRequestBody | null {
  if (!value || typeof value !== "object") return null;

  const body = value as Record<string, unknown>;
  if (body.lang !== "en" && body.lang !== "zh") return null;
  if (!Array.isArray(body.messages) || body.messages.length === 0) return null;
  if (body.messages.length > MAX_REQUEST_MESSAGES) return null;

  const messages: ChatMessage[] = [];
  let previousRole: ChatMessage["role"] | undefined;

  for (const message of body.messages) {
    if (!message || typeof message !== "object") return null;

    const candidate = message as Record<string, unknown>;
    if (candidate.role !== "user" && candidate.role !== "assistant") return null;
    if (candidate.role === previousRole) return null;
    if (
      typeof candidate.content !== "string" ||
      candidate.content.length === 0 ||
      candidate.content.length > MAX_MESSAGE_LENGTH
    ) {
      return null;
    }

    messages.push({ role: candidate.role, content: candidate.content });
    previousRole = candidate.role;
  }

  if (messages[0].role !== "user") return null;
  if (messages[messages.length - 1].role !== "user") return null;

  const roundCount = messages.reduce(
    (count, message) => count + (message.role === "user" ? 1 : 0),
    0,
  );

  return {
    messages: getRecentConversation(messages),
    lang: body.lang,
    roundCount,
  };
}

function getChatConfig() {
  const apiKey =
    process.env.CHAT_API_KEY?.trim() ||
    process.env.DEEPSEEK_API_KEY?.trim();

  if (!apiKey) return null;

  return {
    apiKey,
    apiUrl: process.env.CHAT_API_URL?.trim() || DEFAULT_CHAT_API_URL,
    model:
      process.env.CHAT_MODEL?.trim() ||
      process.env.DEEPSEEK_MODEL?.trim() ||
      DEFAULT_CHAT_MODEL,
  };
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = MAX_CONVERSATION_ROUNDS;
const RATE_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  if (rateLimitMap.size > 1_000) {
    rateLimitMap.forEach((value, key) => {
      if (now > value.resetAt) rateLimitMap.delete(key);
    });
  }

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

function getContactPrompt(lang: ChatRequestBody["lang"]) {
  return lang === "zh"
    ? "我们聊了不少啦！如果你还想继续交流，欢迎加我微信 sakuraluo，或者发邮件到 luoyihan17@gmail.com，我会亲自回复你。"
    : "We’ve chatted quite a bit! If you’d like to continue the conversation, feel free to add me on WeChat (sakuraluo) or email me at luoyihan17@gmail.com — I’ll personally get back to you.";
}

function buildContentReference(lang: ChatRequestBody["lang"], origin: string) {
  const collections: ContentCollection[] = [
    "project",
    "experience",
    "writing",
  ];

  return collections
    .map((collection) => {
      const items = getAllItems(collection, lang);
      const label = COLLECTION_LABELS[lang][collection];
      const lines = items.map((item) => {
        const details = [
          item.intro || item.excerpt,
          item.dateRange,
          item.location,
          item.type,
          item.area?.join(", "),
        ].filter(Boolean).join(" · ");
        const href = `${origin}/${lang}/${collection}/${item.slug}`;

        return `- ${item.title}: ${details || "Public portfolio page"} (${href})`;
      });

      return `${label}:\n${lines.join("\n")}`;
    })
    .join("\n\n");
}

function buildSystemPrompt(lang: ChatRequestBody["lang"], origin: string) {
  const contentReference = buildContentReference(lang, origin);

  return `You are Luo Yihan (雒艺涵)'s portfolio chat guide. Respond in first person as Yihan when discussing public portfolio facts. Be warm, concise, and natural — like a visitor is chatting with Yihan at her personal website.

When the visitor speaks Chinese, respond in Chinese. When they speak English, respond in English.

Only use the public information below. If the visitor asks about something not covered here, say that I have not shared it publicly yet, and invite them to email me at luoyihan17@gmail.com or add WeChat sakuraluo.

IMPORTANT formatting rules:
- Plain text only, but you may use **bold** and markdown links: [title](url).
- Do not use headings, bullet lists, numbered lists, tables, code blocks, or bare URLs.
- Whenever mentioning a specific page listed below, include its markdown link.
- Use link text in the same language as the visitor.

CURRENT CONVERSATION CONTEXT:
- You receive up to the latest 10 rounds from the current open chat.
- Treat those messages as short-term memory and answer accurately if the visitor asks what they said earlier.
- You do not have memory across page refreshes or new browser sessions.

ABOUT ME:
I am Luo Yihan / 雒艺涵, a full-stack designer exploring AI, interactive entertainment, games, music products, VR UX, and creative technology. I care about connecting platforms and content to create experiences with emotion, memory, and imagination.
I earned a B.S. in Interaction Design from ArtCenter College of Design and an M.A. in Interactive Games and Media from the University of Southern California. I currently work at Tencent Music, focusing on AI music creation and product experience.
Contact: luoyihan17@gmail.com. WeChat: sakuraluo. LinkedIn: https://www.linkedin.com/in/sakura-yihan-luo-a151451b1/

PUBLIC WEBSITE CONTENT:
${contentReference}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = parseChatRequestBody(await req.json());
    if (!body) {
      return NextResponse.json({ error: "Invalid chat request" }, { status: 400 });
    }

    const { messages, lang, roundCount } = body;

    if (roundCount > MAX_CONVERSATION_ROUNDS) {
      return NextResponse.json({ reply: getContactPrompt(lang) });
    }

    const chatConfig = getChatConfig();
    if (!chatConfig) {
      return NextResponse.json(
        {
          reply: lang === "zh"
            ? "聊天服务还没有配置 API key。你可以先发邮件到 luoyihan17@gmail.com，或者在部署环境里配置 CHAT_API_KEY / DEEPSEEK_API_KEY 后再来找我聊天。"
            : "The chat service has not been configured with an API key yet. You can email me at luoyihan17@gmail.com, or configure CHAT_API_KEY / DEEPSEEK_API_KEY in the deployment environment and try again.",
        },
        { status: 503 },
      );
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ reply: getContactPrompt(lang) });
    }

    const origin = new URL(req.url).origin;
    const response = await fetch(chatConfig.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${chatConfig.apiKey}`,
      },
      body: JSON.stringify({
        model: chatConfig.model,
        messages: [
          { role: "system", content: buildSystemPrompt(lang, origin) },
          ...messages,
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(CHAT_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error("Chat provider request failed", {
        status: response.status,
        requestId: response.headers.get("x-request-id"),
      });
      return NextResponse.json(
        { error: "Failed to get response from chat provider" },
        { status: response.status },
      );
    }

    const data: unknown = await response.json();
    const reply = (
      data &&
      typeof data === "object" &&
      "choices" in data &&
      Array.isArray(data.choices) &&
      typeof data.choices[0]?.message?.content === "string"
    ) ? data.choices[0].message.content : "";

    if (!reply) {
      return NextResponse.json(
        { error: "Invalid response from chat provider" },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
