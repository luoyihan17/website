"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import styles from "./particle-text.module.css";

type Trigger = "mount" | "hover" | "click";
type AnimationDirection = "gather" | "scatter";

type ParticleTextProps = {
  text?: string;
  particleSize?: number;
  density?: number;
  maxParticles?: number;
  color?: string;
  highlightColor?: string;
  scatter?: number;
  scatterEdgeFade?: number;
  textOffsetY?: number;
  ellipseScaleX?: number;
  ellipseScaleY?: number;
  scrollScatter?: boolean;
  gatherDuration?: number;
  stagger?: number;
  targetJitter?: number;
  pointerRepel?: number;
  repelRadius?: number;
  idleDrift?: number;
  trigger?: Trigger;
  animationDirection?: AnimationDirection;
  fontSize?: number | string;
  fontWeight?: number | string;
  fontFamily?: string;
  equalizeLineWidths?: boolean;
  glow?: boolean;
  pointerSurface?: "self" | "parent";
  className?: string;
  style?: CSSProperties;
};

type Rgb = {
  r: number;
  g: number;
  b: number;
};

type TargetPoint = {
  x: number;
  y: number;
  alpha: number;
};

type Particle = {
  x: number;
  y: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  fieldX: number;
  fieldY: number;
  size: number;
  color: string;
  seed: number;
  depth: number;
  delay: number;
};

const hexToRgb = (hex: string): Rgb | null => {
  const clean = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
};

const mixRgb = (from: Rgb, to: Rgb, amount: number): Rgb => ({
  r: Math.round(from.r + (to.r - from.r) * amount),
  g: Math.round(from.g + (to.g - from.g) * amount),
  b: Math.round(from.b + (to.b - from.b) * amount),
});

const rgbToCss = (rgb: Rgb) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const hashUnit = (value: number) => {
  let hash = (value + 0x6d2b79f5) | 0;
  hash = Math.imul(hash ^ (hash >>> 15), hash | 1);
  hash ^= hash + Math.imul(hash ^ (hash >>> 7), hash | 61);
  return ((hash ^ (hash >>> 14)) >>> 0) / 4294967296;
};

const resolveFontSize = (
  value: number | string,
  container: HTMLElement,
  fontWeight: number | string,
  fontFamily: string,
) => {
  if (typeof value === "number") return value;

  const probe = document.createElement("span");
  probe.textContent = "M";
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.fontSize = value;
  probe.style.fontWeight = String(fontWeight);
  probe.style.fontFamily = fontFamily;
  container.appendChild(probe);
  const size = parseFloat(window.getComputedStyle(probe).fontSize) || 96;
  probe.remove();
  return size;
};

const waitForFonts = async (font: string) => {
  if (!("fonts" in document)) return;

  try {
    await document.fonts.load(font);
  } catch {
    // Font loading can fail for system fallbacks; document.fonts.ready still keeps sampling stable.
  }

  await document.fonts.ready;
};

export function ParticleText({
  text = "React Bits",
  particleSize = 2,
  density = 4,
  maxParticles = 2600,
  color = "#ffffff",
  highlightColor = "#8b5cf6",
  scatter = 180,
  scatterEdgeFade = 44,
  textOffsetY = 0,
  ellipseScaleX = 1,
  ellipseScaleY = 1,
  scrollScatter = false,
  gatherDuration = 1600,
  stagger = 420,
  targetJitter = 0,
  pointerRepel = 40,
  repelRadius = 120,
  idleDrift = 0.7,
  trigger = "mount",
  animationDirection = "gather",
  fontSize = "clamp(3rem, 12vw, 8rem)",
  fontWeight = 800,
  fontFamily = "inherit",
  equalizeLineWidths = false,
  glow = true,
  pointerSurface = "self",
  className = "",
  style,
}: ParticleTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;
    const interactionSurface =
      pointerSurface === "parent" ? container.parentElement ?? canvas : canvas;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let particles: Particle[] = [];
    let animationFrame: number | null = null;
    let resizeFrame: number | null = null;
    let buildId = 0;
    let gathering = false;
    let returningFromPointer = false;
    let scrollScatterProgress = 0;
    let gatherStart = 0;
    let reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const pointer = {
      active: false,
      x: 0,
      y: 0,
      smoothX: 0,
      smoothY: 0,
    };

    const shouldKeepAnimating = () =>
      gathering ||
      returningFromPointer ||
      (!reducedMotion && idleDrift > 0) ||
      (pointer.active && !reducedMotion && pointerRepel > 0 && repelRadius > 0);

    const ensureRenderLoop = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const startGather = (fromScatter = true) => {
      if (!particles.length) return;

      const now = performance.now();

      particles.forEach((particle) => {
        if (fromScatter) {
          particle.x = particle.fieldX;
          particle.y = particle.fieldY;
        }

        particle.startX = particle.x;
        particle.startY = particle.y;
        particle.delay = reducedMotion ? 0 : particle.seed * stagger;
      });

      gatherStart = now;
      gathering = true;
      ensureRenderLoop();
    };

    const drawParticle = (particle: Particle, x = particle.x, y = particle.y) => {
      const size = particle.size;
      ctx.fillStyle = particle.color;

      if (size <= 2.1) {
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
        return;
      }

      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = (now: number) => {
      animationFrame = null;
      ctx.clearRect(0, 0, width, height);

      if (glow && !reducedMotion) {
        ctx.shadowBlur = particleSize * 3;
        ctx.shadowColor = highlightColor;
      } else {
        ctx.shadowBlur = 0;
      }

      pointer.smoothX += (pointer.x - pointer.smoothX) * 0.18;
      pointer.smoothY += (pointer.y - pointer.smoothY) * 0.18;

      let complete = true;
      let pointerReturnComplete = true;

      particles.forEach((particle) => {
        let baseX = particle.targetX;
        let baseY = particle.targetY;
        let progress = 1;
        let easedProgress = 1;

        if (gathering) {
          const local = (now - gatherStart - particle.delay) / Math.max(1, reducedMotion ? 1 : gatherDuration);
          progress = clamp(local, 0, 1);
          easedProgress = easeInOutCubic(progress);
          baseX = particle.startX + (particle.targetX - particle.startX) * easedProgress;
          baseY = particle.startY + (particle.targetY - particle.startY) * easedProgress;
          if (progress < 1) complete = false;
        } else if (!reducedMotion && idleDrift > 0) {
          const driftTime = now * 0.001;
          baseX += Math.sin(driftTime * 0.9 + particle.seed * 10) * idleDrift * particle.depth;
          baseY += Math.cos(driftTime * 0.75 + particle.depth * 10) * idleDrift * particle.depth;
        }

        if (pointer.active && !reducedMotion && pointerRepel > 0 && repelRadius > 0) {
          const dx = baseX - pointer.smoothX;
          const dy = baseY - pointer.smoothY;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < repelRadius) {
            const force = Math.pow(1 - distance / repelRadius, 2) * pointerRepel;
            baseX += (dx / distance) * force;
            baseY += (dy / distance) * force;
          }
        }

        const follow = reducedMotion || gathering ? 1 : 0.22;
        particle.x += (baseX - particle.x) * follow;
        particle.y += (baseY - particle.y) * follow;

        if (returningFromPointer && !pointer.active) {
          const remainingDistance = Math.hypot(baseX - particle.x, baseY - particle.y);
          if (remainingDistance < 0.08) {
            particle.x = baseX;
            particle.y = baseY;
          } else {
            pointerReturnComplete = false;
          }
        }

        const drawX = particle.x + (particle.fieldX - particle.x) * scrollScatterProgress;
        const drawY = particle.y + (particle.fieldY - particle.y) * scrollScatterProgress;
        const phaseScatterProgress =
          animationDirection === "scatter" ? easedProgress : 1 - easedProgress;
        const scatterProgress = 1 - (1 - phaseScatterProgress) * (1 - scrollScatterProgress);
        const ellipseWidthRadius = Math.max((width / 2) * ellipseScaleX, 1);
        const ellipseHeightRadius = Math.max((height / 2) * ellipseScaleY, 1);
        const ellipseCenterY = height * (0.5 + textOffsetY);
        const ellipseX = (drawX - width / 2) / ellipseWidthRadius;
        const ellipseY = (drawY - ellipseCenterY) / ellipseHeightRadius;
        const ellipseRadius = Math.hypot(ellipseX, ellipseY);
        const ellipseEdgeDistance = Math.max(
          0,
          (1 - ellipseRadius) * Math.min(ellipseWidthRadius, ellipseHeightRadius),
        );
        const edgeAlpha =
          scatterEdgeFade > 0 ? clamp(ellipseEdgeDistance / scatterEdgeFade, 0, 1) : 1;
        const ellipseMaskProgress = clamp(scatterProgress * 3, 0, 1);
        const softenedEdgeAlpha = 1 - ellipseMaskProgress * (1 - edgeAlpha);
        const motionAlpha =
          animationDirection === "scatter"
            ? 1 - easedProgress * 0.96
            : 0.04 + easedProgress * 0.96;
        const scrollAlpha = Math.pow(1 - scrollScatterProgress, 1.15);

        ctx.globalAlpha = clamp(
          motionAlpha * softenedEdgeAlpha * scrollAlpha,
          0,
          1,
        );
        drawParticle(particle, drawX, drawY);
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (gathering && complete) {
        gathering = false;
      }

      if (returningFromPointer && !pointer.active && pointerReturnComplete) {
        returningFromPointer = false;
      }

      if (shouldKeepAnimating()) {
        ensureRenderLoop();
      }
    };

    const sampleText = async () => {
      const currentBuild = ++buildId;
      const rect = container.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);

      if (width <= 0 || height <= 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const computed = window.getComputedStyle(container);
      const resolvedFamily = fontFamily === "inherit" ? computed.fontFamily || "sans-serif" : fontFamily;
      let resolvedSize = resolveFontSize(fontSize, container, fontWeight, resolvedFamily);
      let font = `${fontWeight} ${resolvedSize}px ${resolvedFamily}`;

      await waitForFonts(font);
      if (currentBuild !== buildId) return;

      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      const content = String(text || " ");
      const lines = content.split(/\r?\n/).map((line) => line || " ");
      const maxTextWidth = width * 0.92;
      const maxTextHeight = height * 0.9;
      offCtx.font = font;

      const measureBlock = () => {
        const measuredLines = lines.map((line) => {
          const metrics = offCtx.measureText(line);
          const left = Math.ceil(metrics.actualBoundingBoxLeft || 0);
          const right = Math.ceil(metrics.actualBoundingBoxRight || metrics.width);
          const ascent = Math.ceil(metrics.actualBoundingBoxAscent || resolvedSize * 0.78);
          const descent = Math.ceil(metrics.actualBoundingBoxDescent || resolvedSize * 0.22);

          return {
            text: line,
            left,
            ascent,
            descent,
            width: Math.max(1, left + right),
            height: Math.max(1, ascent + descent),
          };
        });
        const lineGap = lines.length > 1 ? Math.max(8, Math.ceil(resolvedSize * 0.16)) : 0;
        const textWidth = Math.max(1, ...measuredLines.map((line) => line.width));
        const textHeight =
          measuredLines.reduce((sum, line) => sum + line.height, 0) + lineGap * Math.max(0, measuredLines.length - 1);

        return { lineGap, measuredLines, textWidth, textHeight };
      };

      let block = measureBlock();
      if (block.textWidth > maxTextWidth || block.textHeight > maxTextHeight) {
        const scale = Math.min(maxTextWidth / block.textWidth, maxTextHeight / block.textHeight);
        resolvedSize = Math.max(18, resolvedSize * scale);
        font = `${fontWeight} ${resolvedSize}px ${resolvedFamily}`;
        await waitForFonts(font);
        if (currentBuild !== buildId) return;
        offCtx.font = font;
        block = measureBlock();
      }

      const padding = Math.max(12, Math.ceil(resolvedSize * 0.08));

      offscreen.width = block.textWidth + padding * 2;
      offscreen.height = block.textHeight + padding * 2;
      offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
      offCtx.font = font;
      offCtx.textAlign = "left";
      offCtx.textBaseline = "alphabetic";
      offCtx.fillStyle = "#ffffff";

      let drawY = padding;
      block.measuredLines.forEach((line, index) => {
        drawY += line.ascent;
        const scaleX = equalizeLineWidths && block.measuredLines.length > 1 ? block.textWidth / line.width : 1;
        const drawX = padding + (block.textWidth - line.width * scaleX) / 2;
        offCtx.save();
        offCtx.translate(drawX, 0);
        offCtx.scale(scaleX, 1);
        offCtx.fillText(line.text, -line.left, drawY);
        offCtx.restore();
        drawY += line.descent + (index < block.measuredLines.length - 1 ? block.lineGap : 0);
      });

      const imageData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
      const targets: TargetPoint[] = [];
      const step = Math.max(2, Math.floor(density));

      for (let y = 0; y < offscreen.height; y += step) {
        for (let x = 0; x < offscreen.width; x += step) {
          const alpha = imageData.data[(y * offscreen.width + x) * 4 + 3];
          if (alpha > 40) {
            targets.push({
              x: width / 2 - offscreen.width / 2 + x,
              y: height * (0.5 + textOffsetY) - offscreen.height / 2 + y,
              alpha: alpha / 255,
            });
          }
        }
      }

      const particleLimit = Math.max(600, maxParticles);
      const stride = Math.max(1, Math.ceil(targets.length / particleLimit));
      const baseRgb = hexToRgb(color);
      const highlightRgb = hexToRgb(highlightColor);
      const selected = targets.filter((_, index) => index % stride === 0);

      particles = selected.map((target, index) => {
        const seed = ((index * 9301 + 49297) % 233280) / 233280;
        const depth = 0.45 + (((index * 233 + 97) % 1000) / 1000) * 0.9;
        const jitterXSeed = ((index * 7411 + 29573) % 104729) / 104729;
        const jitterYSeed = ((index * 3253 + 7919) % 104729) / 104729;
        const textX = target.x + (jitterXSeed - 0.5) * targetJitter * 2;
        const textY = target.y + (jitterYSeed - 0.5) * targetJitter * 2;
        const blend = baseRgb && highlightRgb ? clamp(textX / Math.max(1, width) + (seed - 0.5) * 0.35, 0, 1) : 0;
        const particleColor = baseRgb && highlightRgb ? rgbToCss(mixRgb(baseRgb, highlightRgb, blend)) : color;
        const angle = hashUnit(index * 2 + 1) * Math.PI * 2;
        const radialSeed = hashUnit(index * 2 + 2);
        const radius = Math.sqrt(radialSeed) * 0.985;
        const fieldRadiusX = Math.max((width / 2) * ellipseScaleX, 1);
        const fieldRadiusY = Math.max((height / 2) * ellipseScaleY, 1);
        const fieldCenterY = height * (0.5 + textOffsetY);
        const scatterX = width / 2 + Math.cos(angle) * fieldRadiusX * radius;
        const scatterY = fieldCenterY + Math.sin(angle) * fieldRadiusY * radius;
        const startsScattered = animationDirection === "gather";
        const startX = startsScattered ? scatterX : textX;
        const startY = startsScattered ? scatterY : textY;
        const endX = startsScattered ? textX : scatterX;
        const endY = startsScattered ? textY : scatterY;

        return {
          x: reducedMotion ? textX : startX,
          y: reducedMotion ? textY : startY,
          startX,
          startY,
          targetX: reducedMotion ? textX : endX,
          targetY: reducedMotion ? textY : endY,
          fieldX: scatterX,
          fieldY: scatterY,
          size: Math.max(0.6, particleSize * (0.75 + target.alpha * 0.45)),
          color: particleColor,
          seed,
          depth,
          delay: seed * stagger,
        };
      });

      pointer.x = width / 2;
      pointer.y = height / 2;
      pointer.smoothX = pointer.x;
      pointer.smoothY = pointer.y;

      if (reducedMotion) {
        particles.forEach((particle) => {
          particle.x = particle.targetX;
          particle.y = particle.targetY;
          particle.startX = particle.targetX;
          particle.startY = particle.targetY;
          particle.delay = 0;
        });
        gathering = false;
      } else {
        startGather(false);
      }

      ensureRenderLoop();
    };

    const queueSample = () => {
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        void sampleText();
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      returningFromPointer = false;
      ensureRenderLoop();
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      returningFromPointer = !reducedMotion && pointerRepel > 0 && repelRadius > 0;
      ensureRenderLoop();
    };

    const handlePointerEnter = (event: PointerEvent) => {
      handlePointerMove(event);
      if (trigger === "hover") startGather(true);
    };

    const handleClick = () => {
      if (trigger === "click") startGather(true);
    };

    const updateScrollScatter = () => {
      if (!scrollScatter) return;

      const hero = container.closest<HTMLElement>(".flow-intro-hero");
      if (!hero) return;

      const rawProgress = clamp(-hero.getBoundingClientRect().top / Math.max(window.innerHeight, 1), 0, 1);
      scrollScatterProgress = clamp(rawProgress / 0.55, 0, 1);
      interactionSurface.style.pointerEvents = scrollScatterProgress >= 0.98 ? "none" : "auto";
      ensureRenderLoop();
    };

    const reduceMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const handleReduceMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      void sampleText();
    };

    reduceMotionQuery?.addEventListener("change", handleReduceMotionChange);
    interactionSurface.addEventListener("pointerenter", handlePointerEnter);
    interactionSurface.addEventListener("pointermove", handlePointerMove);
    interactionSurface.addEventListener("pointerleave", handlePointerLeave);
    interactionSurface.addEventListener("click", handleClick);
    if (scrollScatter) {
      window.addEventListener("scroll", updateScrollScatter, { passive: true });
      window.addEventListener("resize", updateScrollScatter);
      updateScrollScatter();
    }

    const resizeObserver = new ResizeObserver(queueSample);
    resizeObserver.observe(container);
    void sampleText();

    return () => {
      buildId += 1;
      resizeObserver.disconnect();
      reduceMotionQuery?.removeEventListener("change", handleReduceMotionChange);
      interactionSurface.removeEventListener("pointerenter", handlePointerEnter);
      interactionSurface.removeEventListener("pointermove", handlePointerMove);
      interactionSurface.removeEventListener("pointerleave", handlePointerLeave);
      interactionSurface.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", updateScrollScatter);
      window.removeEventListener("resize", updateScrollScatter);
      interactionSurface.style.pointerEvents = "";

      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame);
    };
  }, [
    text,
    particleSize,
    density,
    maxParticles,
    color,
    highlightColor,
    scatter,
    scatterEdgeFade,
    textOffsetY,
    ellipseScaleX,
    ellipseScaleY,
    scrollScatter,
    gatherDuration,
    stagger,
    targetJitter,
    pointerRepel,
    repelRadius,
    idleDrift,
    trigger,
    animationDirection,
    fontSize,
    fontWeight,
    fontFamily,
    equalizeLineWidths,
    glow,
    pointerSurface,
  ]);

  const classNames = className ? `${styles.particleText} ${className}` : styles.particleText;

  return (
    <div ref={containerRef} className={classNames} style={style} aria-label={text}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <span className={styles.srOnly}>{text}</span>
    </div>
  );
}

export default ParticleText;
