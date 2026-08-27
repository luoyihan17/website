---
personalSite: true
title: "腾讯音乐AI游戏"
date: "2025-01-01"
intro: "用 Vibe Coding 快速构建音乐互动、游戏化玩法与可运行原型"
sorting: 4
coverImage: "/assets/images/ai-coding-interactive-games/AIcoding小游戏cover.webp"
favicon: "/assets/favicon/tme.svg"
skill: ["自闭环", "AI提效", "跨团队组织"]
---

## 故事起点：音乐宣发还停在“看见”
传统的艺人宣发通常围绕专辑购买页、宣传海报和专题页展开。用户进入页面后，大多是在浏览、试听或购买。歌曲有节奏，艺人有视觉设定，专辑也有概念，但这些内容很多时候只是被陈列出来，粉丝能参与的部分并不多。

<figure class="ai-game-captioned-image">
  <img src="/assets/images/ai-coding-interactive-games/Digital%20album%20purchase%20portal.webp" alt="数字专辑购买入口" />
  <figcaption>数字专辑购买入口</figcaption>
</figure>

<div class="ai-game-thesis-card">
  <p>我想验证一个新的可能：</p>
  <p><strong>如果一首歌本来就有世界观、情绪和视觉语言，为什么它只能被展示，而不能被玩？</strong></p>
</div>

<figure class="ai-game-captioned-image">
  <img src="/assets/images/ai-coding-interactive-games/%E8%BE%B9%E5%90%AC%E8%BE%B9%E7%8E%A9.webp" alt="边听边玩" />
  <figcaption>边听边玩</figcaption>
</figure>

这也是我对音乐互动的核心思考：音乐不应该只停留在“听见”，而可以从单通道的听觉消费，转化为融合视觉、操作与反馈的多感官沉浸式体验。

因此，我开始推进「艺人 IP × 音乐 × 游戏」：围绕主打歌设计匹配歌曲概念和艺人视觉的小游戏，让歌曲从“被展示”变成“可体验、可操作、可分享”。

**我作为项目负责人，把这个方向从 Demo 推到上线，并延展到 aespa、张艺兴、BigBang 等艺人合作及节日运营节点。**

## 没有资源，也要先让它跑起来
在 AI Coding 变得越来越可用之后，我开始围绕音乐做[很多小 Demo](/zh/project/ai-coding-practice)。但 Demo 要真的上线，还是绕不开资源。客户端和后台都要排期，没数据时大家也很难拍板。所以我并没有等完整团队出现，而是带着 Demo 去找产品和运营“安利”：这个可以放艺人宣发吗？那个可以接活动点位！前期，大家好像都害怕失误，毕竟没有人做过这样的事情。但我进行多次尝试后，运营组长来找我说他们可以尝试这样的玩法。那一刻我发现，我也可以自己把一个方向讲清楚、推过去。

## 第一场试炼：aespa 的甜品工坊

<div class="ai-game-result-layout">
  <figure class="ai-game-result-media">
    <video class="fit-screen-video ai-game-result-video" controls playsinline preload="metadata" poster="/assets/images/ai-coding-interactive-games/aespa-dessert-workshop-poster.webp">
      <source src="/assets/images/ai-coding-interactive-games/aespa-dessert-workshop-compressed.mp4" type="video/mp4" />
      你的浏览器不支持视频播放。
    </video>
    <figcaption>aespa 甜品工坊</figcaption>
  </figure>
  <figure class="ai-game-result-image">
    <img src="/assets/images/ai-coding-interactive-games/aespa-dissemination-results.webp" alt="Dissemination Results aespa" />
    <figcaption>宣发互动结果</figcaption>
  </figure>
</div>

aespa《LEMONADE》是我第一次把这个模式真正推上线。我把歌曲的清爽感和艺人视觉转成“甜品工坊”的经营玩法，让用户在点单、制作和完成任务的过程中进入歌曲氛围，而不是只是在活动页里看物料。

这个项目里，我承担了约 90% 的开发、部署和上线工作：从玩法设计、UI/UX、交互状态，到屏幕适配、移动端测试和上线细节，都需要自己一路处理。它不是一个停留在设计稿里的创意，而是一次真正从 0 到 1 的业务交付。

## 第二场试炼：张艺兴《斗战胜佛》小游戏

<div class="ai-game-result-layout">
  <figure class="ai-game-result-media">
    <video class="fit-screen-video ai-game-result-video" controls playsinline preload="metadata" poster="/assets/videos/zhangyixinggame-poster.webp">
      <source src="/assets/videos/zhangyixinggame-compressed.mp4" type="video/mp4" />
      你的浏览器不支持视频播放。
    </video>
    <figcaption>张艺兴《斗战胜佛》</figcaption>
  </figure>
  <figure class="ai-game-result-image">
    <img src="/assets/images/ai-coding-interactive-games/zhangyixing-dissemination-results.webp" alt="Dissemination Results" />
    <figcaption>宣发互动结果</figcaption>
  </figure>
</div>

如果说《LEMONADE》证明了“歌曲可以变成小游戏”，那么张艺兴《斗战胜佛》验证的是：这套方法能不能迁移到完全不同的游戏类型里。
这一次，玩法从经营点单变成横版动作闯关，复杂度明显更高。我围绕歌曲主题，把孙悟空、金箍棒、云层平台和东方神话场景转成可操作的游戏内容，并完成角色移动、跳跃、攻击、敌人、碰撞和关卡推进等核心逻辑。

这一次的挑战不再是从零证明方向，而是在3天时间内完成更复杂的玩法，并获得了近10w的曝光。项目也获得艺人团队和版权方认可。它也证明，这不只是一次偶然成功，而是一套可以迁移到不同歌曲和玩法里的方法。

## 回归：从一个游戏，到一种可复用的宣发能力
回头看，这些 AI Coding 小游戏最重要的意义，不只是我做了几个 H5 游戏，而是把一个原本模糊的想法，推成了团队愿意继续投入的方向。它从 aespa、张艺兴延展到 BigBang 等艺人合作，也进入了儿童节、七夕季等运营节点，逐渐变成一种新的互动内容生产方式。

这件事也改变了我对 AI 的看法。很多设计师会担心 AI 压缩自己的价值，但我反而看到另一面：AI Coding 让我能更早把想法做成可玩的 Demo，拿去和产品、运营、研发一起讨论。**后来我也拥有了很多资源，团队开始专门配置负责游戏方向的产品同学，很多业务线也会来找我们聊互动玩法，商务也开始争取点位。回想到在业务上线前的交付栏里，我的名字第一次出现在“代码负责人”的位置上。那一刻我更确定，在 AI 时代，设计师不是只能被动适应工具，也可以主动创造新的流程、新的角色和新的业务可能。**
