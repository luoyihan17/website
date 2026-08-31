---
personalSite: true
title: "Playable Music Campaigns at Tencent Music"
date: "2025-01-01"
intro: "Turning music campaigns into interactive games"
sorting: 4
coverImage: "/assets/cover-image/gamecover.webp"
skill: ["Self-contained Delivery", "AI Efficiency", "Cross-team Drive"]
---

## Starting Point: Music Promotion Was Still Mostly Passive
Traditional artist campaigns often center on album purchase pages, posters, and editorial features. Users browse, preview, or buy. Songs have rhythm, artists have visual identities, and albums have concepts, but fans are often left with very little to do.

<figure class="ai-game-captioned-image">
  <img src="/assets/images/ai-coding-interactive-games/Digital%20album%20purchase%20portal.webp" alt="Digital album purchase portal" />
  <figcaption>Digital album purchase portal</figcaption>
</figure>

<div class="ai-game-thesis-card">
  <p>I wanted to test a different possibility:</p>
  <p><strong>If a song already has a world, a mood, and a visual language, why should it only be displayed instead of played?</strong></p>
</div>

<figure class="ai-game-captioned-image">
  <img src="/assets/images/ai-coding-interactive-games/%E8%BE%B9%E5%90%AC%E8%BE%B9%E7%8E%A9.webp" alt="Listen and play" />
  <figcaption>Listen and play</figcaption>
</figure>

This became my core thought around music interaction: music should not stop at being heard. It can become a multisensory experience with visuals, actions, and feedback.

So I began exploring **artist IP x music x game**: mini-games built around lead singles, shaped by the song concept and artist visuals, so promotion could become playable, interactive, and shareable.

**As project lead, I took this direction from demo to launch, then extended it to aespa, Lay Zhang, BigBang, and seasonal campaign moments.**

## Limited Resources, So I Made It Runnable First
As AI coding became more usable, I started making [small music demos](/en/project/ai-coding-practice). But even a promising demo still needs resources before it can go live. Client and backend teams need schedules, and without data, teams hesitate to commit.

I did not wait for a full team. I brought runnable demos to product and campaign teammates and pitched concrete placements: could this support an artist release? Could that fit into a campaign slot? At first, everyone was cautious because no one had shipped this kind of music promotion before. After several attempts, a campaign lead said they were willing to try. That was when I realized I could make a direction clear enough for others to follow.

## First Trial: aespa's Dessert Workshop

<div class="ai-game-result-layout">
  <figure class="ai-game-result-media">
    <video class="fit-screen-video ai-game-result-video" controls playsinline preload="metadata" poster="/assets/images/ai-coding-interactive-games/aespa-dessert-workshop-poster.webp">
      <source src="/assets/images/ai-coding-interactive-games/aespa-dessert-workshop-compressed.mp4" type="video/mp4" />
      Your browser does not support video playback.
    </video>
    <figcaption>aespa Dessert Workshop</figcaption>
  </figure>
  <figure class="ai-game-result-image">
    <img src="/assets/images/ai-coding-interactive-games/aespa-dissemination-results.webp" alt="aespa campaign results" />
    <figcaption>Campaign results</figcaption>
  </figure>
</div>

aespa's **LEMONADE** was the first time I brought this model online. I turned the song's fresh tone and artist visuals into a dessert workshop management game, letting users enter the song's mood through ordering, making desserts, and completing tasks instead of only viewing campaign assets.

I handled about 90% of the development, deployment, and launch work: gameplay design, UI/UX, interaction states, responsive adaptation, mobile testing, and release details. With limited resources, I also took on self-testing, issue fixing, and Git-based release work to move the mini-game from a demo into a real, accessible campaign experience.

It was not a concept stuck in a design file. It was a real 0-to-1 business delivery.

## Second Trial: Lay Zhang's Dou Zhan Sheng Fo Game

<div class="ai-game-result-layout">
  <figure class="ai-game-result-media">
    <video class="fit-screen-video ai-game-result-video" controls playsinline preload="metadata" poster="/assets/videos/zhangyixinggame-poster.webp">
      <source src="/assets/videos/zhangyixinggame-compressed.mp4" type="video/mp4" />
      Your browser does not support video playback.
    </video>
    <figcaption>Lay Zhang's Dou Zhan Sheng Fo</figcaption>
  </figure>
  <figure class="ai-game-result-image">
    <img src="/assets/images/ai-coding-interactive-games/zhangyixing-dissemination-results.webp" alt="Lay Zhang campaign results" />
    <figcaption>Campaign results</figcaption>
  </figure>
</div>

If **LEMONADE** proved that a song could become a mini-game, Lay Zhang's **Dou Zhan Sheng Fo** tested whether the method could transfer to a very different genre.

This time, the gameplay shifted from management and ordering to a side-scrolling action game. Around the song theme, I turned Sun Wukong, the golden cudgel, cloud platforms, and Eastern myth scenes into playable content, then built movement, jumping, attacks, enemies, collisions, and level progression.

The challenge was no longer proving the direction from zero. It was shipping a more complex game in three days. The project reached nearly 100,000 impressions and was recognized by the artist's team and copyright stakeholders. It showed that this was not a one-off success, but a reusable method for different songs and gameplay types.

## Returning: From One Game to a Reusable Campaign Capability
Looking back, the meaning of these AI coding games was not only that I made several H5 games. More importantly, I turned a vague idea into a direction the team was willing to keep investing in. The model expanded from aespa and Lay Zhang to BigBang and other artist collaborations, then entered campaign moments such as Children's Day and Qixi.

This also changed how I saw AI. Some designers worry that AI compresses their value, but I saw another side: AI coding let me turn ideas into playable demos earlier, then discuss them with product, campaign, engineering, and business teams. **Later, the team assigned dedicated product support for games, more business lines came to us for interactive ideas, and business teammates began competing for traffic slots.**

**The first time my name appeared as "code owner" in a launch delivery sheet, I felt something click. In the AI era, designers do not only adapt to tools. We can create new workflows, new roles, and new business possibilities.**
