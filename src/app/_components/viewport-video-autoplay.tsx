"use client";

import { useEffect } from "react";

export function ViewportVideoAutoplay() {
  useEffect(() => {
    const videos = Array.from(
      document.querySelectorAll<HTMLVideoElement>("video[data-autoplay-on-view]")
    );

    if (videos.length === 0) return;

    const cleanupListeners: Array<() => void> = [];

    videos.forEach((video) => {
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");

      const handlePlay = () => {
        video.dataset.userPaused = "false";
      };

      const handlePause = () => {
        if (video.dataset.autoplayPausing === "true") return;
        video.dataset.userPaused = "true";
      };

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);

      cleanupListeners.push(() => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;

          if (entry.isIntersecting) {
            if (video.dataset.userPaused === "true") return;
            if (video.ended) video.currentTime = 0;

            const playPromise = video.play();
            if (playPromise) {
              playPromise.catch(() => {
                // Browser autoplay policies can still block in some modes.
              });
            }
            return;
          }

          if (!video.paused) {
            video.dataset.autoplayPausing = "true";
            video.pause();
            delete video.dataset.autoplayPausing;
          }
        });
      },
      { threshold: 0.45, rootMargin: "0px 0px -10% 0px" }
    );

    videos.forEach((video) => observer.observe(video));

    return () => {
      observer.disconnect();
      cleanupListeners.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
