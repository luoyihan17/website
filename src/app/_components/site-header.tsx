"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiCaretLeftBold } from "react-icons/pi";

type Props = {
  lang: string;
};

export function SiteHeader({ lang }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const isEn = lang === "en";
  const targetLang = isEn ? "zh" : "en";

  // Build the target path for language toggle
  const targetPath = pathname.replace(`/${lang}`, `/${targetLang}`) || `/${targetLang}`;

  // Hide language toggle on detail pages (e.g. /en/experience/slug)
  const segments = pathname.split('/').filter(Boolean);
  const isHomePage = segments.length === 1;
  const isDetailPage = segments.length > 2;
  const isResumePage = segments.includes('resume');

  const [slideTo, setSlideTo] = useState<string | null>(null);
  const [introMode, setIntroMode] = useState(isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setIntroMode(false);
      return;
    }

    const updateIntroMode = () => {
      const intro = document.querySelector(".flow-intro-hero");
      if (!intro) {
        setIntroMode(window.scrollY < 80);
        return;
      }
      setIntroMode(intro.getBoundingClientRect().bottom > 80);
    };

    updateIntroMode();
    window.addEventListener("scroll", updateIntroMode, { passive: true });
    window.addEventListener("resize", updateIntroMode);

    return () => {
      window.removeEventListener("scroll", updateIntroMode);
      window.removeEventListener("resize", updateIntroMode);
    };
  }, [isHomePage]);

  const handleLangSwitch = (e: React.MouseEvent) => {
    e.preventDefault();
    setSlideTo(targetLang);
    // Fade out page content in sync with slider animation
    const main = document.querySelector("main");
    if (main) {
      main.style.transition = "opacity 250ms ease-in-out";
      main.style.opacity = "0";
    }
    setTimeout(() => {
      router.push(targetPath);
    }, 250);
  };

  const sliderIsEn = slideTo ? slideTo === "en" : isEn;
  const useIntroTheme = isHomePage && introMode && !isDetailPage && !isResumePage;
  const headerClass = useIntroTheme
    ? "fixed top-0 left-0 right-0 z-50 bg-transparent text-neutral-950 border-b border-transparent transition-colors duration-300"
    : "fixed top-0 left-0 right-0 z-50 bg-white/50 text-neutral-900 backdrop-blur-md border-b border-neutral-200/50 transition-colors duration-300";
  const switchClass = useIntroTheme
    ? "relative flex items-center h-9 w-[88px] p-[3px] rounded-xl bg-white/75 border border-neutral-200 cursor-pointer select-none font-barlow shadow-sm backdrop-blur-md transition-colors duration-300"
    : "relative flex items-center h-9 w-[88px] p-[3px] rounded-xl bg-neutral-100 border border-neutral-200 cursor-pointer select-none font-barlow transition-colors duration-300";
  const sliderClass = useIntroTheme
    ? "absolute left-[3px] h-[28px] w-[40px] rounded-[8px] bg-white shadow-sm"
    : "absolute left-[3px] h-[28px] w-[40px] rounded-[8px] bg-white shadow-sm";
  const activeTextClass = useIntroTheme ? "text-neutral-950" : "text-neutral-900";
  const inactiveTextClass = useIntroTheme ? "text-neutral-400" : "text-neutral-400";

  return (
    <header className={headerClass}>
      <div className="mx-auto px-5 max-w-[1024px] h-14 flex items-center justify-between">
        <button
          onClick={() => {
            if (isResumePage) {
              router.push(`/${lang}`);
            } else if (isDetailPage) {
              router.push(`/${lang}`, { scroll: false });
            } else {
              window.scrollTo({ top: 0 });
            }
          }}
          className="flex items-center gap-2 text-base font-medium tracking-tight hover:opacity-70 font-barlow cursor-pointer"
          style={{
            transition: "opacity 300ms cubic-bezier(0.4,0,0.2,1), color 300ms cubic-bezier(0.4,0,0.2,1)",
            opacity: 1, // Always visible
          }}
        >
          {isDetailPage ? (
            <>
              <PiCaretLeftBold className="w-4 h-4" />
              {isEn ? "Back" : "返回"}
            </>
          ) : (
            <>
              雒艺涵 Luo Yihan
            </>
          )}
        </button>
        <div
          className="flex items-center"
          style={{
            transition: "opacity 300ms cubic-bezier(0.4,0,0.2,1)",
            opacity: isDetailPage ? 0 : 1,
            pointerEvents: (isDetailPage) ? "none" : "auto",
          }}
        >
          <a
            href={targetPath}
            onClick={handleLangSwitch}
            className={switchClass}
            role="switch"
            aria-checked={isEn}
          >
            <span
              className={sliderClass}
              style={{ top: 'calc(50% - 14px)', transition: 'transform 200ms ease-in-out', transform: sliderIsEn ? 'translateX(0)' : 'translateX(40px)' }}
            />
            <span className={`relative z-10 flex-1 text-center text-sm font-medium ${sliderIsEn ? activeTextClass : inactiveTextClass}`} style={{ transition: 'color 200ms ease-in-out' }}>
              EN
            </span>
            <span className={`relative z-10 flex-1 text-center text-sm font-medium ${!sliderIsEn ? activeTextClass : inactiveTextClass}`} style={{ transition: 'color 200ms ease-in-out' }}>
              中
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
