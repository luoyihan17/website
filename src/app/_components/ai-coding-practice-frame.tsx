"use client";

import { useMemo, useState } from "react";
import { SpecularAction } from "@/app/_components/specular-action";

type Props = {
  lang: string;
};

type PracticeItem = {
  id: string;
  title: string;
  kicker: string;
  body: string;
  result: string;
};

const zhItems: PracticeItem[] = [
  {
    id: "artist",
    title: "艺粉小游戏",
    kicker: "Artist IP x Music x Game",
    body: "把歌曲主题、艺人视觉和粉丝互动转译成可玩的 H5 小游戏。",
    result: "已用于 aespa、张艺兴、BigBang 等艺人宣发方向。",
  },
  {
    id: "campaign",
    title: "运营节点互动",
    kicker: "Playable Campaign",
    body: "把儿童节、七夕、开学季等运营节点做成轻量可复用的互动内容。",
    result: "用更低成本替代部分静态活动页，提升参与感与分享动机。",
  },
  {
    id: "prototype",
    title: "AI 原型练习",
    kicker: "From Prompt to Demo",
    body: "把一个想法快速拆成规则、状态、界面和可点击反馈。",
    result: "用于验证交互逻辑、游戏机制和产品叙事是否成立。",
  },
];

const enItems: PracticeItem[] = [
  {
    id: "artist",
    title: "Artist Fan Games",
    kicker: "Artist IP x Music x Game",
    body: "Turning song concepts, artist visuals, and fan participation into playable H5 games.",
    result: "Used in artist campaigns for aespa, Lay Zhang, BigBang, and more.",
  },
  {
    id: "campaign",
    title: "Playable Campaigns",
    kicker: "Campaign Moments",
    body: "Turning Children's Day, Qixi, back-to-school, and other seasonal moments into reusable interactions.",
    result: "Lower-cost playable formats for campaign pages that would otherwise stay static.",
  },
  {
    id: "prototype",
    title: "AI Prototype Practice",
    kicker: "From Prompt to Demo",
    body: "Breaking one idea into rules, states, interfaces, and clickable feedback as quickly as possible.",
    result: "Used to test interaction logic, game mechanics, and product narratives.",
  },
];

export function AiCodingPracticeFrame({ lang }: Props) {
  const isEn = lang === "en";
  const items = isEn ? enItems : zhItems;
  const [activeId, setActiveId] = useState(items[0].id);

  const active = useMemo(
    () => items.find((item) => item.id === activeId) || items[0],
    [activeId, items],
  );

  const caseHref = `/${isEn ? "en" : "zh"}/project/ai-coding`;

  return (
    <main className="ai-practice-frame-root" aria-label={isEn ? "AI Coding practice hub" : "AI Coding 实践项目"}>
      <section className="ai-practice-hero">
        <div>
          <p className="ai-practice-eyebrow">
            {isEn ? "Practice Hub" : "Practice Hub"}
          </p>
          <h1>{isEn ? "AI Coding Lab" : "AI Coding 实践场"}</h1>
        </div>
        <span className="ai-practice-status">{isEn ? "Clickable" : "可点击"}</span>
      </section>

      <section className="ai-practice-stack" aria-label={isEn ? "Practice project types" : "实践项目类型"}>
        {items.map((item, index) => {
          const selected = item.id === active.id;
          return (
            <SpecularAction
              key={item.id}
              type="button"
              className="ai-practice-card specular-action--card"
              data-active={selected}
              onClick={() => setActiveId(item.id)}
              aria-pressed={selected}
              radius={8}
            >
              <span className="ai-practice-index">{String(index + 1).padStart(2, "0")}</span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.kicker}</small>
              </span>
            </SpecularAction>
          );
        })}
      </section>

      <section className="ai-practice-detail-panel" aria-live="polite">
        <p className="ai-practice-detail-kicker">{active.kicker}</p>
        <h2>{active.title}</h2>
        <p>{active.body}</p>
        <div className="ai-practice-result">
          <span>{isEn ? "Output" : "产出"}</span>
          <strong>{active.result}</strong>
        </div>
      </section>

      <section className="ai-practice-loop" aria-label={isEn ? "AI Coding workflow" : "AI Coding 工作流"}>
        {(isEn
          ? ["Prompt", "Scope", "Build", "Test"]
          : ["提示词", "控范围", "搭建", "测试"]
        ).map((step) => (
          <span key={step}>{step}</span>
        ))}
      </section>

      <SpecularAction
        as="a"
        className="ai-practice-open"
        href={caseHref}
        target="_top"
        size="md"
        radius={8}
      >
        {isEn ? "Open full case" : "打开完整案例"}
      </SpecularAction>
    </main>
  );
}
