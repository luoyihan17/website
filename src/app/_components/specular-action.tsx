"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

type SpecularActionProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  radius?: number;
  [key: string]: any;
};

const PolymorphicSpecularButton = dynamic(
  () => import("@/app/_components/SpecularButton/SpecularButton"),
  {
    ssr: false,
    loading: () => null,
  },
) as any;

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
  const [enhanced, setEnhanced] = useState(false);
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
    const element = fallbackRef.current;
    if (!element || enhanced) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduceMotion) return;

    const activate = () => setEnhanced(true);
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              if (entries.some((entry) => entry.isIntersecting)) activate();
            },
            { rootMargin: "180px" },
          )
        : null;

    observer?.observe(element);
    if (!observer) activate();

    element.addEventListener("pointerenter", activate, { once: true });
    element.addEventListener("focus", activate, { once: true });

    return () => {
      observer?.disconnect();
      element.removeEventListener("pointerenter", activate);
      element.removeEventListener("focus", activate);
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

  return (
    <PolymorphicSpecularButton
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
    </PolymorphicSpecularButton>
  );
}
