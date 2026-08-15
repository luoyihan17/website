import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllItems, getItemBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import { Lightbox } from "@/app/_components/lightbox";
import { MediaSkeleton } from "@/app/_components/media-skeleton";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";

const TSINGHUA_FUTURE_LAB_SLUG = "tsinghua-future-lab";
const SMART_SHOPPING_PDF_SRC =
  "/assets/pdfs/Tsinghua/%E6%99%BA%E8%83%BD%E8%B4%AD%E7%89%A9.pdf";
const TSINGHUA_IMAGES = [
  {
    src: "/assets/images/Tsinghua/Dreamtest.jpg",
    zhAlt: "Dreamtest 测试照片",
    enAlt: "Dreamtest testing photo",
  },
  {
    src: "/assets/images/Tsinghua/Dreamtest2.jpg",
    zhAlt: "Dreamtest 测试现场",
    enAlt: "Dreamtest testing session",
  },
  {
    src: "/assets/images/Tsinghua/Elderlyworkshop.jpg",
    zhAlt: "老年智能产品工作坊",
    enAlt: "Senior-friendly smart product workshop",
  },
  {
    src: "/assets/images/Tsinghua/photo.jpg",
    zhAlt: "清华未来实验室项目照片",
    enAlt: "Tsinghua Future Laboratory project photo",
  },
];

// Separate type since params are passed by Next.js
type Params = {
  params: {
    slug: string;
    lang: string;
  };
};

function splitFirstMarkdownBlock(content: string) {
  const trimmedContent = content.trim();

  if (!trimmedContent) {
    return ["", ""];
  }

  const firstBlockEnd = trimmedContent.search(/\n\s*\n/);

  if (firstBlockEnd === -1) {
    return [trimmedContent, ""];
  }

  return [
    trimmedContent.slice(0, firstBlockEnd).trimEnd(),
    trimmedContent.slice(firstBlockEnd).trimStart(),
  ];
}

function MarkdownBlock({ content }: { content: string }) {
  if (!content) {
    return null;
  }

  return (
    <div
      className="markdown"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}

function SmartShoppingPdf({ lang }: { lang: string }) {
  const title = lang === "zh" ? "智能购物 PDF" : "Smart Shopping PDF";
  const pdfViewerSrc = `${SMART_SHOPPING_PDF_SRC}#toolbar=1&navpanes=0`;

  return (
    <section
      className="my-6 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100"
      aria-label={title}
    >
      <object
        data={pdfViewerSrc}
        type="application/pdf"
        className="block h-[72vh] min-h-[520px] w-full bg-white"
        aria-label={title}
      >
        <iframe
          src={pdfViewerSrc}
          title={title}
          className="block h-[72vh] min-h-[520px] w-full bg-white"
        />
      </object>
    </section>
  );
}

function TsinghuaImageGallery({ lang }: { lang: string }) {
  return (
    <section
      className="mt-8 columns-1 gap-3 md:columns-2"
      aria-label={lang === "zh" ? "清华未来实验室项目图片" : "Tsinghua Future Laboratory project images"}
    >
      {TSINGHUA_IMAGES.map((image) => (
        <figure
          key={image.src}
          className="mb-3 break-inside-avoid overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50"
        >
          <img
            src={image.src}
            alt={lang === "zh" ? image.zhAlt : image.enAlt}
            loading="lazy"
            className="block h-auto w-full cursor-zoom-in object-contain"
          />
        </figure>
      ))}
    </section>
  );
}

export default async function Post({ params }: Params) {
  const post = getItemBySlug("experience", params.slug, params.lang);

  if (!post) {
    return notFound();
  }

  const shouldShowSmartShoppingPdf = post.slug === TSINGHUA_FUTURE_LAB_SLUG;
  const [firstBlock, remainingBlocks] = shouldShowSmartShoppingPdf
    ? splitFirstMarkdownBlock(post.content || "")
    : [post.content || "", ""];
  const content = await markdownToHtml(firstBlock);
  const remainingContent = shouldShowSmartShoppingPdf
    ? await markdownToHtml(remainingBlocks)
    : "";

  return (
    <main>
      <Container>
        <article className="mb-12">
          <PostHeader
            title={post.title}
            date={post.date}
            favicon={post.favicon}
            type={post.type}
            typeBadge={false}
            area={post.area}
            dateRange={post.dateRange}
            location={post.location}
          />
          {shouldShowSmartShoppingPdf ? (
            <div className="mx-auto max-w-[1024px]">
              <Lightbox>
                <MediaSkeleton>
                  <MarkdownBlock content={content} />
                  <SmartShoppingPdf lang={params.lang} />
                  <MarkdownBlock content={remainingContent} />
                  <TsinghuaImageGallery lang={params.lang} />
                </MediaSkeleton>
              </Lightbox>
            </div>
          ) : (
            <PostBody content={content} />
          )}
        </article>
      </Container>
    </main>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getItemBySlug("experience", params.slug, params.lang);

  if (!post) {
    return notFound();
  }

  const title = post.title;
  const description = post.intro || post.excerpt || `${post.title} – Experience by ${CMS_NAME}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${CMS_NAME}`,
      description,
      images: post.ogImage.url ? [post.ogImage.url] : [],
    },
  };
}

export async function generateStaticParams() {
  const langs = ['en', 'zh'];
  const params: { lang: string; slug: string }[] = [];
  
  for (const lang of langs) {
    const posts = getAllItems("experience", lang); 
    posts.forEach((post) => {
       params.push({ lang, slug: post.slug });
    });
  }

  return params;
}
