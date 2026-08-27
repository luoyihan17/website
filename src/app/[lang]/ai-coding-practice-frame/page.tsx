import { AiCodingPracticeFrame } from "@/app/_components/ai-coding-practice-frame";
import type { Metadata } from "next";

type Params = {
  params: {
    lang: string;
  };
};

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

export function generateMetadata({ params }: Params): Metadata {
  const isEn = params.lang === "en";

  return {
    title: isEn ? "AI Coding Practice Frame" : "AI Coding 实践项目 Frame",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function AiCodingPracticeFramePage({ params }: Params) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html,
            body {
              margin: 0;
              min-height: 100%;
              overflow: hidden;
              background: #f4f1ea;
            }

            body > header,
            body > footer {
              display: none !important;
            }
          `,
        }}
      />
      <AiCodingPracticeFrame lang={params.lang} />
    </>
  );
}
