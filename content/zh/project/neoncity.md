---
personalSite: true
title: "NeonCity VR 游戏"
date: "2022-09-01"
intro: "南加州大学高阶游戏项目，担任 UI/UX 首席设计师"
sorting: 2
coverImage: "/assets/images/NeonCity/NeonCitycover.webp"
favicon: "/assets/favicon/usc.svg"
---

NeonCity 是一款由 USC Games 29 人跨学科团队开发的 VR 城市建造沙盒游戏，我担任 UI/UX Lead。项目以 Hand Tracking、OpenXR 与 Unity 为基础，让玩家用双手搭建并扩展一座霓虹城市，并在微缩规划和 1:1 探索之间切换。项目曾亮相 USC Games Expo 2023，并推出 [Meta Store](https://www.meta.com/experiences/pcvr/neon-city-demo/6015050278577275/?srsltid=AfmBOooMXGbBIYlLropJlYEgZtirmqnB4i9KIZFaWLrSAOqRDfVTh0TJ)。

<figure class="video-embed vimeo-click-player" data-vimeo-id="825302860" data-title="NeonCity VR Game video" style="background-image: url('/assets/images/NeonCity/NeonCitycover.webp')">
  <button class="video-play-button" type="button" data-vimeo-play aria-label="播放 NeonCity VR Game video">
    <span class="video-play-icon" aria-hidden="true"></span>
  </button>
</figure>


在游戏中，玩家不再依赖传统手柄或复杂按键，而是直接抓取、移动和组合不同的建筑模块。随着城市规模扩大，住宅、商店、办公楼、公寓、博物馆和公园等内容会逐步解锁，城市居民与环境也会根据玩家的规划发生变化。

项目的核心不是单纯把城市放进 VR，而是把积木式创造、城市规划和进入城市的体验连接起来：玩家既可以俯视一座微缩城市，也可以将它放大到 1:1 尺度，亲自走进街道和建筑之间。复古未来主义与 Synthwave 视觉语言，则强化了这个可以被亲手建造、进入和观察的霓虹空间。

## 我的职责｜UI/UX Lead

在项目中，我担任 UI/UX Lead，主要负责 VR 操控面板界面设计，并研究和梳理玩家在城市建造过程中的完整体验流程。

项目早期采用 Hand Controllers 作为主要输入方式。测试中我们发现，复杂按键映射提高了学习成本，也削弱了 VR 中“直接操控空间”的直觉。加入项目后，我推动核心交互转向 Hand Tracking，并重新梳理城市编辑流程：建筑选择、放置、调整和状态切换，都需要被转化成玩家能用双手理解的空间动作。

<div class="neon-video-pair" aria-label="NeonCity 交互方案对比视频">
  <figure>
    <video controls muted playsinline preload="metadata" data-autoplay-on-view aria-label="我介入设计之前的视频">
      <source src="/assets/videos/beforedesign-compressed.mp4" type="video/mp4" />
      你的浏览器暂不支持视频播放。
    </video>
    <figcaption>我介入设计之前</figcaption>
  </figure>
  <figure>
    <video controls muted playsinline preload="metadata" data-autoplay-on-view aria-label="NeonCity Observations 视频">
      <source src="/assets/videos/observations-compressed.mp4" type="video/mp4" />
      你的浏览器暂不支持视频播放。
    </video>
    <figcaption>Observations</figcaption>
  </figure>
</div>

因此，我的重点不是把按键逐个改成手势，而是定义一套新的 VR 城市编辑语言。我把问题拆成三个层面：没有实体按钮时，玩家如何知道双手当前能做什么；面板如何出现，才能随时调用又不遮挡城市；建筑选择、抓取、缩放、确认与尺度切换如何在反馈上保持连续。

在与游戏设计、工程、艺术及可用性研究团队协作的过程中，我把这些判断落实到交互系统：用手势承载编辑动作，用空间提示表达状态，并根据玩家的视线、手部位置和城市尺度决定 UI 出现的时机。最终，NeonCity 的 UI/UX 不只是覆盖在画面上的信息层，而成为玩家理解规则、操控城市和进入自建空间的关键媒介。

## 项目亮点

### 01｜从控制器操作转向自然手势

<figure>
  <img src="/assets/images/NeonCity/Hand%20Gesture%20System.webp" alt="NeonCity 从控制器操作转向自然手势" />
  <figcaption>NeonCity 从控制器操作转向自然手势</figcaption>
</figure>

<div class="neon-gesture-videos" aria-label="NeonCity 手势交互演示视频">
  <figure>
    <video controls muted playsinline preload="metadata" data-autoplay-on-view aria-label="Palm Up 手势演示">
      <source src="/assets/videos/Palmup-compressed.mp4" type="video/mp4" />
      你的浏览器暂不支持视频播放。
    </video>
    <figcaption>Palm Up</figcaption>
  </figure>
  <figure>
    <video controls muted playsinline preload="metadata" data-autoplay-on-view aria-label="First Grab with one&two hands 手势演示">
      <source src="/assets/videos/FirstGrab-compressed.mp4" type="video/mp4" />
      你的浏览器暂不支持视频播放。
    </video>
    <figcaption>First Grab with one&two hands</figcaption>
  </figure>
  <figure>
    <video controls muted playsinline preload="metadata" data-autoplay-on-view aria-label="Double Pinch 手势演示">
      <source src="/assets/videos/DoublePinch-compressed.mp4" type="video/mp4" />
      你的浏览器暂不支持视频播放。
    </video>
    <figcaption>Double Pinch</figcaption>
  </figure>
</div>

这一部分围绕玩家最常用的几类动作展开：抬掌呼出操作入口，单手或双手抓取建筑，双指捏合完成更精细的选择与确认。设计目标是让手势和现实动作之间尽量接近，使玩家第一次接触时，也能把“我想移动这个建筑”自然转化为“伸手抓取它”。

### 02｜从自由操作到清晰的编辑反馈

<figure>
  <img src="/assets/images/NeonCity/operations.webp" alt="NeonCity 手势操作与编辑反馈系统" />
  <figcaption>NeonCity 手势操作与编辑反馈系统</figcaption>
</figure>

<video class="fit-screen-video neon-wide-video" controls muted playsinline preload="metadata" poster="/assets/videos/operations-poster.webp" data-autoplay-on-view aria-label="NeonCity 手势操作与编辑反馈演示视频">
  <source src="/assets/videos/operations-compressed.mp4" type="video/mp4" />
  你的浏览器暂不支持视频播放。
</video>

在 Hand Tracking 交互中，玩家没有实体按键带来的触感确认，因此系统反馈变得尤为重要。我围绕建筑选择、抓取、缩放、放置与确认等关键动作，设计了更清晰的状态提示和操作反馈，让玩家能够判断当前建筑是否被选中、是否可以放置、尺寸是否正在调整，以及操作是否已经完成。

这一部分的重点不是增加更多 UI，而是在玩家手势、建筑状态和城市编辑结果之间建立即时、可理解的反馈关系，让连续建造在没有控制器的情况下依然保持稳定。

### 03｜微缩模型、真实尺度与空间化 UI

<figure>
  <img src="/assets/images/NeonCity/%E5%BE%AE%E7%BC%A9%E6%A8%A1%E5%9E%8B%E4%B8%8E%E7%9C%9F%E5%AE%9E%E5%B0%BA%E5%BA%A6%E7%9A%84%E8%BD%AC%E6%8D%A2.webp" alt="NeonCity 微缩模型与真实尺度的转换" />
  <figcaption>NeonCity 微缩模型与真实尺度的转换</figcaption>
</figure>

<video class="fit-screen-video neon-wide-video" controls muted playsinline preload="metadata" poster="/assets/videos/expand-poster.webp" data-autoplay-on-view aria-label="NeonCity 微缩模型扩展与真实尺度转换演示视频">
  <source src="/assets/videos/expand-compressed.mp4" type="video/mp4" />
  你的浏览器暂不支持视频播放。
</video>

玩家可以像城市规划师一样，从上方观察并编辑整座城市；完成建造后，又可以将城市切换至 1:1 尺度，进入自己设计的街道。这种视角变化将“城市规划”与“空间体验”连接起来，也是项目区别于传统城市模拟游戏的重要特征。

这也让我把 UI 从固定屏幕转向空间关系来考虑：信息需要随着玩家的身体位置、视线方向、双手操作和城市尺度变化重新组织。重点不只是“看得清”，而是让提示在正确的位置和时机出现，帮助玩家理解自己正在编辑的是微缩模型，还是正在进入真实尺度的城市。

### 04｜玩家测试与交互迭代

<video class="fit-screen-video" controls muted playsinline preload="metadata" data-autoplay-on-view aria-label="NeonCity 玩家测试现场视频">
  <source src="/assets/videos/playtest-compressed.mp4" type="video/mp4" />
  你的浏览器暂不支持视频播放。
</video>

在多轮玩家测试中，我关注玩家第一次使用 Hand Tracking 时最容易卡住的地方：能否发现掌心菜单，能否判断建筑正处于选择、抓取、缩放还是放置状态，以及能否在没有按键提示的情况下完成连续建造。

测试显示，问题常常不是玩家不会做手势，而是不确定系统是否识别到动作。基于这些观察，我推动了几类 UX 调整：强化状态反馈、调整面板位置、减少对城市模型的遮挡，并让建筑选择、尺寸调整和确认放置的反馈更明确。

## 项目价值与反思

Neon City 是我学生时代第一个真正意义上的大型项目。它让我第一次在一个接近真实游戏制作流程的团队里工作：和游戏设计、工程、艺术、可用性研究等不同专业的人一起讨论问题、对齐方向，并把一个复杂的 VR 概念一步步推进成可以被玩家实际体验的作品。

作为 UI/UX Lead，我不只是负责画界面，而是需要从整体玩家体验出发，梳理玩家如何理解规则、如何用双手完成操作、如何在微缩城市和真实尺度之间切换，以及团队应该怎样把这些体验落到具体的交互、反馈和实现逻辑里。很多时候，我需要在不同专业之间翻译需求：把玩家测试里暴露的问题转化为设计调整，也把设计意图整理成工程和艺术团队能够落地的方案。

这段经历让我真正理解到，沉浸式体验里的 UI/UX 不是“加在画面上的界面”，而是连接玩家、空间、系统和团队协作的一整套体验结构。
