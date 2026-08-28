"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType, CSSProperties, ElementType, ReactNode } from "react";
import "@/app/_components/SpecularButton/SpecularButton.css";

type SpecularActionProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  radius?: number;
  [key: string]: any;
};

type SpecularButtonComponent = ComponentType<any>;

let cachedSpecularButton: SpecularButtonComponent | null = null;
let specularButtonPromise: Promise<SpecularButtonComponent> | null = null;

function loadSpecularButton() {
  if (cachedSpecularButton) return Promise.resolve(cachedSpecularButton);

  specularButtonPromise ??= import("@/app/_components/SpecularButton/SpecularButton").then((mod) => {
    cachedSpecularButton = mod.default as SpecularButtonComponent;
    return cachedSpecularButton;
  });

  return specularButtonPromise;
}

export function SpecularAction({
  as: Component = "button",
  children,
  className = "",
  size = "sm",
  radius = 18,
  disabled,
  onClick,
  style,
  type = "button",
  tabIndex,
  ...props
}: SpecularActionProps) {
  const fallbackRef = useRef<HTMLElement | null>(null);
  const [SpecularButtonComponent, setSpecularButtonComponent] =
    useState<SpecularButtonComponent | null>(() => cachedSpecularButton);
  const [wantsEnhanced, setWantsEnhanced] = useState(false);
  const enhanced = Boolean(SpecularButtonComponent && wantsEnhanced);
  const composedClassName = `specular-action${className ? ` ${className}` : ""}`;
  const buttonClassName = `specular-button specular-button--${size}${composedClassName ? ` ${composedClassName}` : ""}`;
  const sharedStyle = {
    "--sb-radius": `${radius}px`,
    "--sb-tint": "#ffffff",
    "--sb-tint-opacity": 0.56,
    "--sb-blur": "14px",
    "--sb-text-color": "#262626",
    ...style,
  } as CSSProperties;

  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduceMotion) return;

    let cancelled = false;
    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;
    const idleWindow = window as Window & {
      requestIdleCallback?: typeof window.requestIdleCallback;
      cancelIdleCallback?: typeof window.cancelIdleCallback;
    };

    const preload = () => {
      void loadSpecularButton().then((Button) => {
        if (!cancelled) setSpecularButtonComponent(() => Button);
      });
    };

    if (typeof idleWindow.requestIdleCallback === "function") {
      idleId = idleWindow.requestIdleCallback(preload, { timeout: 1800 });
    } else {
      timerId = globalThis.setTimeout(preload, 900);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timerId !== undefined) globalThis.clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    const element = fallbackRef.current;
    if (!element || enhanced) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduceMotion) return;

    const markNearViewport = () => setWantsEnhanced(true);
    const activateNow = () => {
      setWantsEnhanced(true);
      void loadSpecularButton().then((Button) => setSpecularButtonComponent(() => Button));
    };

    let observer: IntersectionObserver | undefined;

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            markNearViewport();
            observer?.disconnect();
          }
        },
        { rootMargin: "220px" },
      );
      observer.observe(element);
    } else {
      markNearViewport();
    }

    element.addEventListener("pointerenter", activateNow, { once: true });
    element.addEventListener("focus", activateNow, { once: true });
    element.addEventListener("touchstart", activateNow, { once: true, passive: true });

    return () => {
      observer?.disconnect();
      element.removeEventListener("pointerenter", activateNow);
      element.removeEventListener("focus", activateNow);
      element.removeEventListener("touchstart", activateNow);
    };
  }, [enhanced]);

  const handleClick = (event: any) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    onClick?.(event);
  };

  if (!enhanced) {
    const isButton = Component === "button";

    return (
      <Component
        ref={fallbackRef as any}
        {...props}
        type={isButton ? type : undefined}
        disabled={isButton ? disabled : undefined}
        aria-disabled={!isButton && disabled ? true : props["aria-disabled"]}
        tabIndex={!isButton && disabled ? -1 : tabIndex}
        onClick={handleClick}
        className={buttonClassName}
        style={sharedStyle}
      >
        <span className="specular-button__label">{children}</span>
      </Component>
    );
  }

  const EnhancedButton = SpecularButtonComponent as SpecularButtonComponent;

  return (
    <EnhancedButton
      as={Component}
      size={size}
      radius={radius}
      tint="#ffffff"
      tintOpacity={0.56}
      blur={14}
      textColor="#262626"
      lineColor="#ffffff"
      baseColor="#8f969f"
      intensity={1.75}
      shineSize={16}
      shineFade={28}
      thickness={1.35}
      speed={0.35}
      followMouse
      proximity={250}
      autoAnimate={false}
      disabled={disabled}
      onClick={onClick}
      type={type}
      tabIndex={tabIndex}
      className={composedClassName}
      style={style}
      {...props}
    >
      {children}
    </EnhancedButton>
  );
}
