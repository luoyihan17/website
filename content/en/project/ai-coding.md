---
personalSite: true
title: "AI Coding Interactive Games"
date: "2025-01-01"
intro: "Using Vibe Coding to rapidly build music interactions, gamified experiences, and runnable prototypes"
sorting: 4
coverImage: "/assets/images/ai-coding-interactive-games/AIcoding小游戏cover.jpg"
---

## Project Background
Traditional artist promotion is usually centered on album purchase pages, promotional posters, and content feature pages. After entering a page, users mainly browse information, preview songs, or buy albums. The overall experience leans toward one-way information delivery, with relatively limited interaction and participation.

![Digital album purchase portal](/assets/images/ai-coding-interactive-games/Digital%20album%20purchase%20portal.png)

To solve the weak interactivity of traditional artist promotion and the overly single path for fan participation, I invented a new artist promotion model:

**Based on a promotional lead single, design a mini-game for the artist that matches the song concept, visual style, and content theme, making the game itself part of the artist promotion content.**

In the mini-game, fans can enter the song-themed world I constructed through character control, level challenges, management tasks, or score competition. The artist's songs, image, and album concept are further transformed from visual packaging into game content that can be experienced, operated, and shared.

This approach turns traditional one-way content display into two-way interaction. For core fans, the game strengthens participation, companionship, and emotional connection, increasing loyalty among existing fans. For casual listeners, a game has a lower participation threshold than directly buying an album. They can first encounter the artist and the song through interesting gameplay, which increases the chance that they will listen further, learn more about the artist, and become interested users. This behavior improves conversion from passersby to consumers, turning casual listeners into paying fans.

Therefore, this type of mini-game is a new artist promotion touchpoint. It connects song content, fan interaction, and album marketing, upgrading artist promotion from "letting users see content" to "letting users enter and participate in content." It was also a direction I actively pushed under limited resources by temporarily pulling together operations and development teammates to validate the idea.

**As the project lead, I drove the whole process from design to development and deployment while coordinating with business and operations. This product model first launched with the S-tier artist aespa, triggering broad discussion in fan communities on Xiaohongshu and surpassing 50,000 participants within 4 days. It was then quickly reused for Lay Zhang's Battle Against the Victorious Buddha side-scrolling mini-game, which surpassed 100,000 participants within 5 days and received high praise from the artist team. Both games brought nearly 15% revenue uplift. From that point, the AI mini-game SOP was fully validated and replicated into more artist operation plans.**

## Game Case 1: aespa's Dessert Workshop

<div class="ai-game-result-layout">
  <video class="fit-screen-video ai-game-result-video" controls playsinline preload="metadata">
    <source src="/assets/images/ai-coding-interactive-games/aespa-dessert-workshop.mp4" type="video/mp4" />
    Your browser does not support video playback.
  </video>
  <figure class="ai-game-result-image">
    <img src="/assets/images/ai-coding-interactive-games/Dissemination%20Results_aespa.png" alt="Dissemination Results aespa" />
  </figure>
</div>

For this project, I handled 90% of the development, deployment, and launch work, taking the content from 0 to 1 into something that could actually go live. It was not a designer's self-contained experiment, but something that could create real business value and contribution. Drawing on my game studies background, I designed the basic game system plan, game UI/UX, full-screen adaptation, testing, gameplay boundaries, mobile browser behavior after deployment, caching issues, and more. Through this project, I realized that designers do not have to be limited by traditional responsibility boundaries. They can gradually build product thinking, systems thinking, engineering thinking, and business delivery awareness, moving from "designing an interface" to "pushing a product truly online." The whole process made me feel that future designers will increasingly resemble directors: defining not only interfaces, but also rules, states, and ways of implementation.


## Game Case 2: Lay Zhang's Battle Against the Victorious Buddha Mini-game

<div class="ai-game-result-layout">
  <video class="fit-screen-video ai-game-result-video" controls playsinline preload="metadata">
    <source src="/assets/videos/zhangyixinggame.mp4" type="video/mp4" />
    Your browser does not support video playback.
  </video>
  <figure class="ai-game-result-image">
    <img src="/assets/images/ai-coding-interactive-games/Dissemination%20Results.png" alt="Dissemination Results" />
  </figure>
</div>

Battle Against the Victorious Buddha was the second artist promotion mini-game completed after LEMONADE. Unlike the previous project, which was closer to management and ordering gameplay, this one required building a side-scrolling action game in a very short cycle, involving character movement, jumping, attacking, enemy mechanics, platform collision, level progression, and win/lose judgment. The development complexity was significantly higher.

Around the theme of Lay Zhang's Battle Against the Victorious Buddha, I transformed Sun Wukong, the golden cudgel, cloud platforms, and Eastern mythological scenes into playable game content. I independently pushed forward details such as character animation frames, attack effects, enemy logic, level maps, collision boundaries, and mobile controls. During the project, I also repeatedly adjusted whether character movements felt natural, whether attack detection was accurate, whether platform spacing was reasonable, and how the screen ratio and controls performed on different phones.

Compared with the first 0-to-1 exploration for LEMONADE, the more important part of this project was reusing the development, adaptation, testing, and deployment process accumulated earlier. I was able to split requirements faster, control the scope of gameplay, organize assets, and focus on solving the issues that truly affected launch instead of starting trial and error from scratch.

In the end, the project surpassed 30,000 participants within 3 days after launch and received strong recognition from the artist team and copyright stakeholders. This project proved that I could not only complete a 0-to-1 attempt once, but also transfer a validated experience to a completely different game genre and deliver a product with complete gameplay, stable experience, and real dissemination results in a shorter time.
