"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  lang: string;
};

const LazyChatWidget = dynamic(
  () => import("./chat-widget").then((mod) => mod.ChatWidget),
  {
    ssr: false,
    loading: () => null,
  },
);

export function ChatWidgetLoader({ lang }: Props) {
  const pathname = usePathname();
  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`;
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      setShouldLoad(false);
      return;
    }

    const updateShouldLoad = () => {
      const intro = document.querySelector(".flow-intro-hero");

      if (!intro || intro.getBoundingClientRect().bottom <= 80) {
        setShouldLoad(true);
      }
    };

    updateShouldLoad();
    window.addEventListener("scroll", updateShouldLoad, { passive: true });
    window.addEventListener("resize", updateShouldLoad);

    return () => {
      window.removeEventListener("scroll", updateShouldLoad);
      window.removeEventListener("resize", updateShouldLoad);
    };
  }, [isHomePage]);

  if (!isHomePage || !shouldLoad) return null;

  return <LazyChatWidget lang={lang} />;
}
