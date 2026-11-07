---
personalSite: true
title: "QQ音乐 iPhone DUO 歌词瀑布特效"
date: "2026-09-22"
intro: "为十月底上线的 QQ 音乐 iPhone DUO，用代码落地外网呼声最高的歌词瀑布效果。"
sorting: 6
coverImage: "/assets/cover-image/lyrics.png"
skill: ["AI Coding", "视觉原型", "交互设计", "设计研发协作"]
---

## 挑战

视觉老师完成的歌词瀑布效果，是外网呼声最高的视觉之一。它将歌词、粒子流动和光效结合在一起，效果吸引人，但实现细节和动效状态也比静态视觉复杂。开发评估后认为暂时难以实现，一时也没有人能接手。

与此同时，QQ 音乐 iPhone DUO 计划在十月底上线。面对用户期待、实现资源不足和紧迫排期，我需要尽快把视觉概念推进成可运行、可验证的方案，让这个效果有机会进入产品。

<figure>
  <video class="content-wide-video" controls autoplay muted playsinline preload="metadata">
    <source src="/assets/videos/lyrics-waterfall-compressed.mp4" type="video/mp4" />
    你的浏览器暂不支持视频播放。
  </video>
  <figcaption>歌词瀑布特效录屏</figcaption>
</figure>

## 我的行动

<figure>
  <video class="content-wide-video" controls autoplay muted playsinline preload="metadata">
    <source src="/assets/videos/lyrics-waterfall-process-compressed.mp4" type="video/mp4" />
    你的浏览器暂不支持视频播放。
  </video>
  <figcaption>粒子文字与瀑布效果制作过程</figcaption>
</figure>

**01｜先用代码生成粒子文字。** 我把歌词渲染成由粒子构成的文字，先解决文字形态和粒子质感，让歌词在动态效果里仍然清晰可读。

**02｜让粒子从文字中流动起来。** 在文字基础上加入向下运动的瀑布粒子和拖尾，并调节文字与瀑布的衔接、粒子数量和下落速度。我对比细线瀑布和柔光瀑布，逐步找到更接近原视觉的节奏与氛围。

**03｜把调试过程做成实时调节器。** 我将文字、运动、外观和扫光相关参数整理成控制面板，让每次调整都能即时预览。歌词切换、粒子漂移与闪烁、颜色、光晕和扫光等细节，都可以在调节器里继续探索，不必反复回到代码修改。

**04｜保存效果并交给开发。** 我加入参数预设、配置导出和完整源码 ZIP 导出，并支持暂停动画、固定画布尺寸，以及切换 Canvas 2D / Three.js 渲染。开发可以从已验证的视觉效果和可运行代码继续评估与接入。

## 项目价值

我将视觉效果转译成可运行、可调节的代码，成为连接视觉表达与开发实现的桥梁。实时预览和参数化调试让视觉方向更快得到验证；参数与源码交付也帮助开发基于已确认的效果继续接入，减少反复沟通和从零还原的成本，提升协作效率。

<figure>
  <video class="content-wide-video" controls autoplay muted playsinline preload="metadata">
    <source src="/assets/videos/lyrics-waterfall-device-compressed.mp4" type="video/mp4" />
    你的浏览器暂不支持视频播放。
  </video>
  <figcaption>真实设备运行录屏</figcaption>
</figure>
