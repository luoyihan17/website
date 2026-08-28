"use client";

import { useEffect, useRef, useState } from "react";
import { ParticleText } from "./particle-text";

type Props = {
  lang: string;
};

const ROTATING_TITLES = [
  "an interaction designer",
  "a VR UX designer",
  "a cultural curator",
  "a vibe coder",
  "an event planner",
  "a mom to two cats and a bird",
] as const;

const TITLE_HOLD_DURATION = 3200;
const HERO_PARTICLE_SIZE = 2.35;
const HERO_PARTICLE_DENSITY = 5;
const HERO_MAX_PARTICLES = 2200;
const HERO_GATHER_DURATION = 1200;
const HERO_STAGGER = 280;
const HERO_DPR_CAP = 1.35;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function FlowIntroHero({ lang }: Props) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const rotatingTitles = ROTATING_TITLES;
  const currentTitle = rotatingTitles[titleIndex % rotatingTitles.length];
  const heroPrefix = "Yihan Luo is";
  const fallbackTitle = `${heroPrefix} ${currentTitle}`;

  useEffect(() => {
    let titleTimer: number | undefined;

    setTitleIndex(0);

    const scheduleNextTitle = () => {
      titleTimer = window.setTimeout(() => {
        setTitleIndex((current) => (current + 1) % rotatingTitles.length);
        scheduleNextTitle();
      }, TITLE_HOLD_DURATION);
    };

    scheduleNextTitle();

    return () => {
      if (titleTimer !== undefined) window.clearTimeout(titleTimer);
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
      aria-label="Yihan Luo introduction"
    >
      <div className="flow-intro-stage">
        <div className="flow-intro-grid" aria-hidden="true" />
        <div className="flow-intro-cross flow-intro-cross-a" aria-hidden="true" />
        <div className="flow-intro-cross flow-intro-cross-b" aria-hidden="true" />
        <div className="flow-intro-cross flow-intro-cross-c" aria-hidden="true" />

        <div className="flow-intro-particle-center" aria-hidden="true">
          <ParticleText
            className="flow-intro-particle-text"
            text={heroPrefix}
            particleSize={HERO_PARTICLE_SIZE}
            density={HERO_PARTICLE_DENSITY}
            maxParticles={HERO_MAX_PARTICLES}
            color="#050505"
            highlightColor="#050505"
            scatter={180}
            scrollScatter
            gatherDuration={HERO_GATHER_DURATION}
            stagger={HERO_STAGGER}
            pointerRepel={40}
            repelRadius={120}
            idleDrift={0}
            trigger="mount"
            fontSize="clamp(3.8rem, 12vw, 9.8rem)"
            fontWeight={800}
            fontFamily="inherit"
            maxDevicePixelRatio={HERO_DPR_CAP}
            animateTextChanges={false}
            glow={false}
            style={{
              position: "absolute",
              inset: 0,
              height: "100%",
              minHeight: "100%",
              transform: "translateY(clamp(-5.7rem, -7vw, -2.4rem))",
            }}
          />
          <ParticleText
            key={currentTitle}
            className="flow-intro-particle-text"
            text={currentTitle}
            particleSize={HERO_PARTICLE_SIZE}
            density={HERO_PARTICLE_DENSITY}
            maxParticles={HERO_MAX_PARTICLES}
            color="#050505"
            highlightColor="#050505"
            scatter={180}
            scrollScatter
            gatherDuration={HERO_GATHER_DURATION}
            stagger={HERO_STAGGER}
            pointerRepel={40}
            repelRadius={120}
            idleDrift={0}
            trigger="mount"
            fontSize="clamp(3.8rem, 12vw, 9.8rem)"
            fontWeight={800}
            fontFamily="inherit"
            maxDevicePixelRatio={HERO_DPR_CAP}
            glow={false}
            style={{
              position: "absolute",
              inset: 0,
              height: "100%",
              minHeight: "100%",
              transform: "translateY(clamp(2.4rem, 7vw, 5.7rem))",
            }}
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
