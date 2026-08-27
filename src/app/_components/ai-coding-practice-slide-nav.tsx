"use client";

import { useEffect, useState } from "react";

type Props = {
  lang: string;
  slideCount: number;
};

export function AiCodingPracticeSlideNav({ lang, slideCount }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isEn = lang === "en";

  useEffect(() => {
    const scrollContainer = document.querySelector<HTMLElement>(
      ".project-ai-coding-practice .markdown",
    );
    const slides = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".project-ai-coding-practice .ai-coding-practice-detail",
      ),
    );
    const wideSlides = slides.filter((slide) =>
      slide.classList.contains("practice-wide-detail"),
    );

    if (!scrollContainer || slides.length === 0) return;

    const sensorCleanups = wideSlides.map((slide) => {
      const sensor = document.createElement("span");
      const hideFloatingText = () => {
        slide.dataset.cursorPastHalf = "true";
      };

      sensor.className = "practice-cursor-half-sensor";
      sensor.setAttribute("aria-hidden", "true");
      sensor.addEventListener("mouseenter", hideFloatingText);
      sensor.addEventListener("mousemove", hideFloatingText);
      sensor.addEventListener("pointerenter", hideFloatingText);
      sensor.addEventListener("pointermove", hideFloatingText);
      sensor.addEventListener("pointerdown", hideFloatingText);
      slide.appendChild(sensor);

      return () => {
        sensor.removeEventListener("mouseenter", hideFloatingText);
        sensor.removeEventListener("mousemove", hideFloatingText);
        sensor.removeEventListener("pointerenter", hideFloatingText);
        sensor.removeEventListener("pointermove", hideFloatingText);
        sensor.removeEventListener("pointerdown", hideFloatingText);
        sensor.remove();
      };
    });

    let frame = 0;
    const updateActiveSlide = () => {
      const containerTop = scrollContainer.getBoundingClientRect().top;
      let nextIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const distance = Math.abs(slide.getBoundingClientRect().top - containerTop);
        if (distance < closestDistance) {
          closestDistance = distance;
          nextIndex = index;
        }
      });

      setActiveIndex(nextIndex);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveSlide();
      });
    };

    updateActiveSlide();
    scrollContainer.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      sensorCleanups.forEach((cleanup) => cleanup());
      scrollContainer.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const scrollToSlide = (index: number) => {
    const scrollContainer = document.querySelector<HTMLElement>(
      ".project-ai-coding-practice .markdown",
    );
    const slides = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".project-ai-coding-practice .ai-coding-practice-detail",
      ),
    );
    const target = slides[index];

    if (!scrollContainer || !target) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollContainer.scrollTo({
      top: target.offsetTop,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (slideCount <= 1) return null;

  return (
    <nav
      className="practice-slide-nav"
      aria-label={isEn ? "AI Coding project slides" : "AI Coding 项目滑页导航"}
    >
      {Array.from({ length: slideCount }, (_, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={index}
            type="button"
            className="practice-slide-dot"
            data-active={isActive}
            aria-current={isActive ? "true" : undefined}
            aria-label={
              isEn
                ? `Go to project ${index + 1}`
                : `跳转到第 ${index + 1} 个项目`
            }
            onClick={() => scrollToSlide(index)}
          />
        );
      })}
    </nav>
  );
}
