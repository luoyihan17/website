"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

type Props = {
  src: string;
  alt: string;
  loading?: "eager" | "lazy";
};

export function CoverImage({ src, alt, loading = "lazy" }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleLoaded = useCallback(() => setLoaded(true), []);
  const handleError = useCallback(() => {
    setFailed(true);
    setLoaded(true);
  }, []);

  if (failed) {
    return (
      <div className="flex aspect-[2/1] items-center justify-center overflow-hidden rounded-lg border border-black/10 bg-neutral-100 md:aspect-[3/2]">
        <span className="px-6 text-center text-sm font-medium text-neutral-400">{alt}</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-black/10 aspect-[2/1] md:aspect-[3/2] bg-neutral-100 cover-skeleton${loaded ? " cover-loaded" : ""}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading={loading}
        decoding="async"
        className="w-full h-full object-cover will-change-transform group-hover:scale-[1.025]"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.35s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        onLoad={handleLoaded}
        onError={handleError}
      />
    </div>
  );
}
