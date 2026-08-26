"use client";

import { useEffect, useRef, useState } from "react";
import { ParticleText } from "./particle-text";

type Props = {
  lang: string;
};

const ROTATING_TITLES = {
  en: [
    "an Interaction Designer",
    "a VR UX Designer",
    "a Cultural Curator",
    "a Vibe Coder",
    "an Event Planner",
    "a Mom of Two Cats & a Bird",
  ],
  zh: [
    "交互设计师",
    "VR 体验设计师",
    "文化策展人",
    "Vibe Coder",
    "活动策划者",
    "两只猫和一只鸟的妈妈",
  ],
} as const;

const TITLE_HOLD_DURATION = 3200;
const TITLE_SCATTER_DURATION = 900;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function FlowIntroHero({ lang }: Props) {
  const isEn = lang === "en";
  const heroRef = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [titlePhase, setTitlePhase] = useState<"gather" | "scatter">("gather");
  const rotatingTitles = isEn ? ROTATING_TITLES.en : ROTATING_TITLES.zh;
  const currentTitle = rotatingTitles[titleIndex % rotatingTitles.length];
  const heroPrefix = isEn ? "Yihan is" : "艺涵是一名";
  const fallbackTitle = `${heroPrefix} ${currentTitle}`;

  useEffect(() => {
    let scatterTimer: number | undefined;
    let swapTimer: number | undefined;

    setTitleIndex(0);
    setTitlePhase("gather");

    const scheduleNextTitle = () => {
      scatterTimer = window.setTimeout(() => {
        setTitlePhase("scatter");

        swapTimer = window.setTimeout(() => {
          setTitleIndex((current) => (current + 1) % rotatingTitles.length);
          setTitlePhase("gather");
          scheduleNextTitle();
        }, TITLE_SCATTER_DURATION);
      }, TITLE_HOLD_DURATION);
    };

    scheduleNextTitle();

    return () => {
      if (scatterTimer !== undefined) window.clearTimeout(scatterTimer);
      if (swapTimer !== undefined) window.clearTimeout(swapTimer);
    };
  }, [lang, rotatingTitles.length]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const readyFrame = window.requestAnimationFrame(() => setReady(true));

    const updateScrollProgress = () => {
      const rect = hero.getBoundingClientRect();
      const range = Math.max(window.innerHeight, 1);
      const progress = clamp(-rect.top / range);
      const fade = 1 - clamp((progress - 0.72) / 0.28);

      hero.style.setProperty("--flow-scroll", progress.toFixed(4));
      hero.style.setProperty("--flow-fade", fade.toFixed(4));
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.cancelAnimationFrame(readyFrame);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={`flow-intro-hero ${ready ? "is-ready" : ""}`}
      aria-label={isEn ? "Yihan Luo introduction" : "雒艺涵首页介绍"}
    >
      <div className="flow-intro-stage">
        <div className="flow-intro-grid" aria-hidden="true" />
        <div className="flow-intro-cross flow-intro-cross-a" aria-hidden="true" />
        <div className="flow-intro-cross flow-intro-cross-b" aria-hidden="true" />
        <div className="flow-intro-cross flow-intro-cross-c" aria-hidden="true" />

        <div className="flow-intro-particle-center" aria-hidden="true">
          <div className="flow-intro-particle-stack">
            <ParticleText
              className="flow-intro-particle-text"
              text={heroPrefix}
              particleSize={2.25}
              density={5}
              maxParticles={2200}
              color="#050505"
              highlightColor="#2f2f2f"
              scatter={150}
              scatterEdgeFade={72}
              textOffsetY={-0.13}
              ellipseScaleX={0.8}
              ellipseScaleY={0.56}
              scrollScatter
              gatherDuration={1200}
              stagger={260}
              targetJitter={1.4}
              pointerRepel={40}
              repelRadius={120}
              idleDrift={0}
              trigger="mount"
              fontSize="clamp(3.2rem, 9vw, 8.4rem)"
              fontWeight={800}
              fontFamily="inherit"
              glow
              pointerSurface="parent"
              style={{ position: "absolute", inset: 0, minHeight: 0, pointerEvents: "none", zIndex: 2 }}
            />
            <ParticleText
              className="flow-intro-particle-text"
              text={currentTitle}
              particleSize={2.25}
              density={5}
              maxParticles={2200}
              color="#050505"
              highlightColor="#2f2f2f"
              scatter={180}
              scatterEdgeFade={84}
              textOffsetY={0.13}
              ellipseScaleX={1}
              ellipseScaleY={0.78}
              scrollScatter
              gatherDuration={titlePhase === "scatter" ? 650 : 1100}
              stagger={titlePhase === "scatter" ? 200 : 260}
              targetJitter={1.4}
              pointerRepel={40}
              repelRadius={120}
              idleDrift={0}
              trigger="mount"
              animationDirection={titlePhase}
              fontSize="clamp(3.2rem, 9vw, 8.4rem)"
              fontWeight={800}
              fontFamily="inherit"
              glow
              pointerSurface="parent"
              style={{ position: "absolute", inset: 0, minHeight: 0, pointerEvents: "none", zIndex: 1 }}
            />
          </div>
        </div>
        <h1 className="flow-intro-title-fallback">{fallbackTitle}</h1>
      </div>
    </section>
  );
}
