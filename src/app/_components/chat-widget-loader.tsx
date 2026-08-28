"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

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

  if (!isHomePage) return null;

  return <LazyChatWidget lang={lang} />;
}
