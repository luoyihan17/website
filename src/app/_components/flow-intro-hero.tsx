"use client";

import { useEffect, useRef, useState } from "react";
import { ParticleText } from "./particle-text";

type Props = {
  lang: string;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function FlowIntroHero({ lang }: Props) {
  const isEn = lang === "en";
  const heroRef = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  const heroText = "Hello, this is\nYihan Luo";
  const fallbackTitle = "Hello, this is Yihan Luo";

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
      aria-label={isEn ? "Yihan Luo intro" : "雒艺涵首页介绍"}
    >
      <div className="flow-intro-stage">
        <div className="flow-intro-grid" aria-hidden="true" />
        <div className="flow-intro-cross flow-intro-cross-a" aria-hidden="true" />
        <div className="flow-intro-cross flow-intro-cross-b" aria-hidden="true" />
        <div className="flow-intro-cross flow-intro-cross-c" aria-hidden="true" />

        <div className="flow-intro-particle-center" aria-hidden="true">
          <ParticleText
            className="flow-intro-particle-text"
            text={heroText}
            particleSize={2.25}
            density={5}
            maxParticles={2200}
            color="#050505"
            highlightColor="#2f2f2f"
            scatter={180}
            gatherDuration={1600}
            stagger={420}
            pointerRepel={40}
            repelRadius={120}
            idleDrift={0}
            trigger="mount"
            fontSize="clamp(3.8rem, 12vw, 9.8rem)"
            fontWeight={800}
            fontFamily="inherit"
            equalizeLineWidths
            glow
            style={{ height: "100%", minHeight: "100%" }}
          />
        </div>
        <h1 className="flow-intro-title-fallback">{fallbackTitle}</h1>

        <div className="flow-intro-scroll-hint" aria-hidden="true">
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
