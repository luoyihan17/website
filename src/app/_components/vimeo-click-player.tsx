"use client";

import { useEffect } from "react";

export function VimeoClickPlayer() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest<HTMLButtonElement>("[data-vimeo-play]");
      if (!button) return;

      const player = button.closest<HTMLElement>("[data-vimeo-id]");
      const videoId = player?.dataset.vimeoId;
      if (!player || !videoId || player.dataset.loaded === "true") return;

      const title = player.dataset.title || "Vimeo video";
      const iframe = document.createElement("iframe");
      iframe.src = `https://player.vimeo.com/video/${encodeURIComponent(videoId)}?autoplay=1&title=0&byline=0&portrait=0`;
      iframe.title = title;
      iframe.loading = "lazy";
      iframe.allow = "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;

      player.dataset.loaded = "true";
      player.classList.add("is-playing");
      player.replaceChildren(iframe);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
