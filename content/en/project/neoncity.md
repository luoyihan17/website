---
personalSite: true
title: "NeonCity VR Game"
date: "2022-09-01"
intro: "Lead UI/UX for USC's hand-tracking VR city builder"
sorting: 2
coverImage: "/assets/images/NeonCity/NeonCitycover.webp"
---

NeonCity is a VR city-building sandbox created by a 29-person USC Games team. I served as UI/UX Lead. Built with Hand Tracking, OpenXR, and Unity, it lets players build a neon city with their hands and switch between miniature planning and 1:1 exploration. The project was shown at USC Games Expo 2023 and released on the [Meta Store](https://www.meta.com/experiences/pcvr/neon-city-demo/6015050278577275/?srsltid=AfmBOooMXGbBIYlLropJlYEgZtirmqnB4i9KIZFaWLrSAOqRDfVTh0TJ).

<figure class="video-embed vimeo-click-player" data-vimeo-id="825302860" data-title="NeonCity VR Game video" style="background-image: url('/assets/images/NeonCity/NeonCitycover.webp')">
  <button class="video-play-button" type="button" data-vimeo-play aria-label="Play NeonCity VR Game video">
    <span class="video-play-icon" aria-hidden="true"></span>
  </button>
</figure>


Players grab, move, and combine building modules directly with their hands. As the city grows, houses, shops, offices, apartments, museums, parks, residents, and environmental feedback unlock.

The core experience connects block-based creation, city planning, and entering the city itself. Players can edit a miniature city from above, then scale it to 1:1 and walk through the streets they built. Retro-futurist and Synthwave visuals reinforce the hand-built neon world.

**My Role | UI/UX Lead**

I led the VR control panel and the player experience across the city-building flow.

The early version used Hand Controllers. Testing showed that complex button mappings raised the learning cost and weakened the feeling of directly manipulating space. After joining, I pushed the core interaction toward Hand Tracking and reframed selection, placement, adjustment, and state switching as spatial actions players could understand through their hands.

<div class="neon-video-pair" aria-label="NeonCity interaction design comparison videos">
  <figure>
    <video controls muted playsinline preload="metadata" data-autoplay-on-view aria-label="Video before my design involvement">
      <source src="/assets/videos/beforedesign.mp4" type="video/mp4" />
      Your browser does not support video playback.
    </video>
    <figcaption>Before my design involvement</figcaption>
  </figure>
  <figure>
    <video controls muted playsinline preload="metadata" data-autoplay-on-view aria-label="NeonCity observations video">
      <source src="/assets/videos/observations.mp4" type="video/mp4" />
      Your browser does not support video playback.
    </video>
    <figcaption>Observations</figcaption>
  </figure>
</div>

My focus was to define a new VR city-editing language: what the hands can do, where panels should appear without blocking the city, and how selection, grabbing, scaling, confirmation, and scale switching can feel continuous.

With game design, engineering, art, and usability research teammates, I turned this into an interaction system: gestures for editing, spatial prompts for state, and UI timing based on gaze, hand position, and city scale. NeonCity's UI/UX became the medium for understanding rules, controlling the city, and entering the built space.

**Project Highlights**

01 | From Controller Operations to Natural Gestures

<figure>
  <img src="/assets/images/NeonCity/Hand%20Gesture%20System.webp" alt="NeonCity transition from controller operations to natural gestures" />
  <figcaption>NeonCity transition from controller operations to natural gestures</figcaption>
</figure>

<div class="neon-gesture-videos" aria-label="NeonCity gesture interaction demo videos">
  <figure>
    <video controls muted playsinline preload="metadata" data-autoplay-on-view aria-label="Palm Up gesture demo">
      <source src="/assets/videos/Palmup.mp4" type="video/mp4" />
      Your browser does not support video playback.
    </video>
    <figcaption>Palm Up</figcaption>
  </figure>
  <figure>
    <video controls muted playsinline preload="metadata" data-autoplay-on-view aria-label="First Grab with one and two hands gesture demo">
      <source src="/assets/videos/FirstGrab.mp4" type="video/mp4" />
      Your browser does not support video playback.
    </video>
    <figcaption>First Grab with one&two hands</figcaption>
  </figure>
  <figure>
    <video controls muted playsinline preload="metadata" data-autoplay-on-view aria-label="Double Pinch gesture demo">
      <source src="/assets/videos/DoublePinch.mp4" type="video/mp4" />
      Your browser does not support video playback.
    </video>
    <figcaption>Double Pinch</figcaption>
  </figure>
</div>

This part focused on frequent actions: raising the palm to call the menu, grabbing buildings with one or two hands, and using double pinch for precise selection and confirmation. The goal was to keep gestures close to real actions, so first-time players could turn "move this building" into "reach out and grab it."

02 | From Free Operation to Clear Editing Feedback

<figure>
  <img src="/assets/images/NeonCity/operations.webp" alt="NeonCity gesture operation and editing feedback system" />
  <figcaption>NeonCity gesture operation and editing feedback system</figcaption>
</figure>

<video class="fit-screen-video neon-wide-video" controls muted playsinline preload="metadata" poster="/assets/videos/operations-poster.webp" data-autoplay-on-view aria-label="NeonCity gesture operation and editing feedback demo video">
  <source src="/assets/videos/operations.mp4" type="video/mp4" />
  Your browser does not support video playback.
</video>

With Hand Tracking, players lose the tactile confirmation of physical buttons, so feedback becomes critical. I designed clearer prompts for selection, grabbing, scaling, placement, and confirmation, helping players understand whether a building is selected, placeable, resizing, or confirmed.

The point was to connect gestures, building states, and editing results with immediate feedback, keeping continuous construction stable without controllers.

03 | Miniature Models, Real Scale, and Spatial UI

<figure>
  <img src="/assets/images/NeonCity/%E5%BE%AE%E7%BC%A9%E6%A8%A1%E5%9E%8B%E4%B8%8E%E7%9C%9F%E5%AE%9E%E5%B0%BA%E5%BA%A6%E7%9A%84%E8%BD%AC%E6%8D%A2.webp" alt="NeonCity transition between miniature model and real scale" />
  <figcaption>NeonCity transition between miniature model and real scale</figcaption>
</figure>

<video class="fit-screen-video neon-wide-video" controls muted playsinline preload="metadata" poster="/assets/videos/expand-poster.webp" data-autoplay-on-view aria-label="NeonCity miniature model expansion and real-scale transition demo video">
  <source src="/assets/videos/expand.mp4" type="video/mp4" />
  Your browser does not support video playback.
</video>

Players can observe and edit the whole city from above like planners, then switch to 1:1 scale and enter the streets they designed. This shift links city planning with spatial experience and distinguishes NeonCity from traditional city simulation games.

It also pushed me to think about UI through spatial relationships instead of fixed screens. Information needed to respond to body position, gaze, hand movement, and city scale, appearing at the right place and moment.

04 | Playtesting and Interaction Iteration

<video class="fit-screen-video" controls muted playsinline preload="metadata" data-autoplay-on-view aria-label="NeonCity playtest session video">
  <source src="/assets/videos/playtest.mp4" type="video/mp4" />
  Your browser does not support video playback.
</video>

Across multiple playtests, I focused on first-time Hand Tracking friction: whether players found the palm menu, recognized selection/grab/scale/place states, and completed continuous construction without button prompts.

The main issue was often not the gesture itself, but uncertainty about whether the system had recognized it. Based on this, I strengthened state feedback, adjusted panel positions, reduced model obstruction, and clarified feedback for selection, resizing, and placement.

**Project Value and Reflection**

NeonCity was my first large-scale student project and my first experience in a team close to a real game production process. I worked with game design, engineering, art, and usability research teammates to turn a complex VR concept into something players could actually experience.

As UI/UX Lead, I went beyond drawing interfaces. I defined how players understand rules, operate with both hands, switch between miniature and real scale, and how the team could implement those experiences. I often translated playtest problems into design changes, and design intent into plans that engineering and art could execute.

This experience helped me understand that UI/UX in immersive media is not an interface placed over a scene. It is an experience structure connecting players, space, systems, and team collaboration.
