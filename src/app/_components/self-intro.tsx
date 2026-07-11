"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PiXBold } from "react-icons/pi";

type Props = {
  lang: string;
};

const ANIM_DURATION = 200; // ms, keep in sync with CSS duration-200

export function SelfIntro({ lang }: Props) {
  const isEn = lang === "en";

  // Desktop QR modal
  const [qrMounted, setQrMounted] = useState(false);
  const [qrVisible, setQrVisible] = useState(false);

  // Mobile WeChat modal
  const [mobileMounted, setMobileMounted] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);

  const [showToast, setShowToast] = useState(false);

  const openQR = useCallback(() => {
    setQrMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setQrVisible(true)));
  }, []);

  const closeQR = useCallback(() => {
    setQrVisible(false);
    setTimeout(() => setQrMounted(false), ANIM_DURATION);
  }, []);

  const openMobile = useCallback(() => {
    setMobileMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setMobileVisible(true)));
  }, []);

  const closeMobile = useCallback(() => {
    setMobileVisible(false);
    setTimeout(() => setMobileMounted(false), ANIM_DURATION);
  }, []);

  const rotatingTitles: { en: string; zh: string }[] = [
    { en: "Interaction Designer", zh: "交互设计师" },
    { en: "VR UX Designer", zh: "VR 体验设计师" },
    { en: "Cultural Curator", zh: "文化策展人" },
    { en: "Vibe Coding", zh: "Vibe Coding" },
    { en: "Event Planner", zh: "活动策划者" },
    { en: "Mom of Two Cats & a Bird", zh: "两只可爱小猫&鸟的妈妈" },
  ];

  const [titleIndex, setTitleIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
      setAnimKey((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [rotatingTitles.length]);

  const currentTitle = isEn ? rotatingTitles[titleIndex].en : rotatingTitles[titleIndex].zh;

  const handleWeChat = () => {
    if (window.innerWidth < 768) {
      openMobile();
    } else {
      openQR();
    }
  };

  const handleCopyWeChat = () => {
    navigator.clipboard.writeText("sakuraluo");
    closeMobile();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <section className="flex-col md:flex-row flex items-start md:justify-between mt-16 mb-16 md:mb-12">
      <div className="w-full">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 mb-2">
          {isEn ? "Luo Yihan" : "雒艺涵"}
        </h1>
        <p className="text-2xl md:text-3xl tracking-tight mb-8" style={{ color: '#EE9933' }}>
          <span className="inline-block" key={animKey}>
            {currentTitle.split("").map((char, i) => (
              <span
                key={i}
                className="inline-block animate-letter-bounce"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </p>
        <div className="text-lg leading-relaxed mb-4">
          {isEn ? (
            <>
              <p className="mb-4">
                I am a full-stack designer exploring the intersection of AI, interactive entertainment, games, and creative technology. I care not only about functionality, but also about connecting platforms and content to create experiences with emotion, memory, and imagination.
              </p>
              <p className="mb-4">
                I earned my B.S. in Interaction Design from <Link href="/en/experience/artcenter-college-of-design" className="underline hover:opacity-70 transition-opacity">ArtCenter College of Design</Link> and my M.A. in <a href="https://cinema.usc.edu/interactive/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70 transition-opacity">Interactive Games and Media</a> from the University of Southern California. I currently work at Tencent Music.
              </p>
            </>
          ) : (
            <>
              <p className="mb-4">
                一名探索 AI、互动娱乐与创意技术交叉领域的全栈设计师。我关注的不只是功能本身，也希望连接平台和内容去创造更有情绪、更有记忆点、更具想象力的体验。
              </p>
              <p className="mb-4">
                我本科毕业于<Link href="/zh/experience/artcenter-college-of-design" className="underline hover:opacity-70 transition-opacity">艺术中心设计学院</Link>交互设计专业，研究生毕业于<a href="https://cinema.usc.edu/interactive/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70 transition-opacity">南加州大学交互游戏研究硕士</a>，目前在腾讯音乐工作。
              </p>
            </>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:inline-flex md:flex-nowrap gap-3 text-sm">
          <Link href={`/${lang}/resume`} className="whitespace-nowrap inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-900 transition-colors duration-300">
            {isEn ? "Resume" : "简历"}
          </Link>
          <a href="mailto:luoyihan17@gmail.com" className="whitespace-nowrap inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-900 transition-colors duration-300">
            {isEn ? "Email" : "邮件"}
          </a>
          <a href="https://www.linkedin.com/in/sakura-yihan-luo-a151451b1/" target="_blank" rel="noopener noreferrer" className="whitespace-nowrap inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-900 transition-colors duration-300">
            {isEn ? "LinkedIn" : "领英"}
          </a>
          <button
            className="whitespace-nowrap inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-900 cursor-pointer transition-colors duration-300"
            onClick={handleWeChat}
          >
            {isEn ? "WeChat" : "微信"}
          </button>
        </div>
      </div>

      {/* WeChat QR Code Modal (Desktop/Tablet) */}
      {qrMounted && createPortal(
        <div
          className={`fixed inset-0 z-[60] flex items-center justify-center transition-colors duration-200 ${
            qrVisible ? 'bg-black/50' : 'bg-black/0'
          }`}
          onClick={closeQR}
        >
          <div
            className={`bg-white rounded-2xl p-6 max-w-xs w-full mx-4 shadow-xl transition-all duration-200 ${
              qrVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{isEn ? "Scan to add WeChat" : "扫码添加微信"}</h3>
              <button
                onClick={closeQR}
                className="text-neutral-400 hover:text-neutral-600 transition-colors text-xl leading-none"
              >
                <PiXBold />
              </button>
            </div>
            <img
              src="/assets/functional-images/wechat-qr-luo-yihan.jpg"
              alt="WeChat QR Code"
              className="w-full rounded-lg"
            />
            <p className="text-center text-sm text-neutral-500 mt-3">WeChat ID: sakuraluo</p>
          </div>
        </div>,
        document.body
      )}

      {/* WeChat ID Modal (Mobile) */}
      {mobileMounted && createPortal(
        <div
          className={`fixed inset-0 z-[60] flex items-center justify-center transition-colors duration-200 ${
            mobileVisible ? 'bg-black/50' : 'bg-black/0'
          }`}
          onClick={closeMobile}
        >
          <div
            className={`bg-white rounded-2xl p-6 max-w-xs w-full mx-4 shadow-xl transition-all duration-200 ${
              mobileVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{isEn ? "WeChat" : "微信"}</h3>
              <button
                onClick={closeMobile}
                className="text-neutral-400 hover:text-neutral-600 transition-colors text-xl leading-none"
              >
                <PiXBold />
              </button>
            </div>
            <p className="text-center text-base text-neutral-700 mb-4">WeChat ID: <span className="font-semibold">sakuraluo</span></p>
            <button
              onClick={handleCopyWeChat}
              className="w-full py-2.5 rounded-xl bg-neutral-800 text-white text-sm font-medium hover:bg-neutral-700 transition-colors"
            >
              {isEn ? "Copy WeChat ID" : "复制 WeChat ID 到剪贴板"}
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* Toast */}
      {showToast && createPortal(
        <div className="fixed bottom-20 left-0 right-0 z-[60] flex justify-center animate-fade-in">
          <div className="bg-neutral-800 text-white text-sm px-4 py-2 rounded-full shadow-lg">
            {isEn ? "Copied!" : "已复制!"}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
