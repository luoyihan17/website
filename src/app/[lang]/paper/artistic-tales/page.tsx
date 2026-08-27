import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/_components/container";
import { SpecularAction } from "@/app/_components/specular-action";

const PDF_SRC = "/assets/pdfs/USC/artistic-tales-ichec-2025.pdf";

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
    title: isEn ? "ARtistic Tales Paper" : "ARtistic Tales 论文",
    description: isEn
      ? "Read the ARtistic Tales paper in the browser."
      : "在浏览器中阅读 ARtistic Tales 论文。",
  };
}

export default function ArtisticTalesPaperPage({ params }: Params) {
  const isEn = params.lang === "en";
  const backHref = `/${params.lang}/experience/education`;
  const title = isEn ? "ARtistic Tales Paper" : "ARtistic Tales 论文";
  const eyebrow = isEn ? "ICHEC 2025 / ACM" : "ICHEC 2025 / ACM";

  return (
    <main className="py-8 md:py-10">
      <Container>
        <Link
          href={backHref}
          className="inline-flex text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
        >
          {isEn ? "Back to USC" : "返回南加州大学"}
        </Link>

        <header className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase text-neutral-500">
              {eyebrow}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-neutral-950 md:text-5xl">
              {title}
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <SpecularAction
              as="a"
              href={PDF_SRC}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              radius={12}
            >
              {isEn ? "Open PDF" : "打开 PDF"}
            </SpecularAction>
            <SpecularAction
              as="a"
              href={PDF_SRC}
              download
              size="sm"
              radius={12}
            >
              {isEn ? "Download" : "下载"}
            </SpecularAction>
          </div>
        </header>

        <section className="mt-6 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
          <object
            data={`${PDF_SRC}#toolbar=1&navpanes=0`}
            type="application/pdf"
            className="block h-[calc(100vh-14rem)] min-h-[640px] w-full bg-white"
            aria-label={title}
          >
            <iframe
              src={`${PDF_SRC}#toolbar=1&navpanes=0`}
              title={title}
              className="block h-[calc(100vh-14rem)] min-h-[640px] w-full bg-white"
            />
          </object>
        </section>
      </Container>
    </main>
  );
}
