"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
};

export function CoverImage({ src, alt }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Check if the image is already complete (cached / 304) when mounted
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalHeight > 0) {
      setLoaded(true);
    }
  }, []);

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
      className={`overflow-hidden rounded-lg border border-black/10 aspect-[2/1] md:aspect-[3/2] bg-neutral-100 cover-skeleton${loaded ? " cover-loaded" : ""}`}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
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
