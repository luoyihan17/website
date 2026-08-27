"use client";

import type { ElementType, ReactNode } from "react";
import SpecularButton from "@/app/_components/SpecularButton/SpecularButton";

type SpecularActionProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  radius?: number;
  [key: string]: any;
};

const PolymorphicSpecularButton = SpecularButton as any;

export function SpecularAction({
  children,
  className = "",
  size = "sm",
  radius = 18,
  ...props
}: SpecularActionProps) {
  return (
    <PolymorphicSpecularButton
      size={size}
      radius={radius}
      tint="#ffffff"
      tintOpacity={0.56}
      blur={14}
      textColor="#262626"
      lineColor="#ffffff"
      baseColor="#d7d7d7"
      intensity={1}
      shineSize={10}
      shineFade={40}
      thickness={1}
      speed={0.35}
      followMouse
      proximity={250}
      autoAnimate={false}
      className={`specular-action${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </PolymorphicSpecularButton>
  );
}
