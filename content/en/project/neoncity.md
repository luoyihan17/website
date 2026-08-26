---
personalSite: true
title: "NeonCity VR Game"
date: "2022-09-01"
intro: "A USC Advanced Game Project where I served as Lead UI/UX Designer"
sorting: 0
coverImage: "/assets/images/NeonCity/NeonCitycover.jpg"
---

NeonCity is a VR city-building sandbox game developed by a 29-person interdisciplinary team at USC Games, where I served as UI/UX Lead. Built on Hand Tracking, OpenXR, and Unity, the project lets players build and expand a neon city with their hands, switching between miniature planning and 1:1 exploration. The project was showcased at USC Games Expo 2023 and released on the [Meta Store](https://www.meta.com/experiences/pcvr/neon-city-demo/6015050278577275/?srsltid=AfmBOooMXGbBIYlLropJlYEgZtirmqnB4i9KIZFaWLrSAOqRDfVTh0TJ).

<figure class="video-embed vimeo-click-player" data-vimeo-id="825302860" data-title="NeonCity VR Game video" style="background-image: url('/assets/images/NeonCity/NeonCitycover.jpg')">
  <button class="video-play-button" type="button" data-vimeo-play aria-label="Play NeonCity VR Game video">
    <span class="video-play-icon" aria-hidden="true"></span>
  </button>
</figure>


In the game, players no longer rely on traditional controllers or complex buttons. Instead, they directly grab, move, and combine different building modules. As the city expands, houses, shops, office buildings, apartments, museums, parks, and other content are gradually unlocked, while residents and the environment respond to the player's planning.

The core of the project is not simply putting a city into VR, but connecting block-like creation, city planning, and the experience of entering the city. Players can look down at a miniature city, or scale it up to 1:1 and personally walk among its streets and buildings. The retro-futurist and Synthwave visual language strengthens this neon space that can be built, entered, and observed by hand.

**My Role | UI/UX Lead**

In this project, I served as UI/UX Lead, mainly responsible for VR control panel interface design and for researching and mapping the complete player experience throughout the city-building process.

In the early stage, the project used Hand Controllers as the main input method. Through testing, we found that complex button mappings increased the learning cost and weakened the intuition of "directly manipulating space" in VR. After joining the project, I pushed the core interaction direction toward Hand Tracking and reorganized the city editing flow: building selection, placement, adjustment, and state switching all needed to be transformed into spatial actions that players could understand through their hands.

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

Therefore, my focus was not to replace each button with a gesture one by one, but to define a new VR city editing language. I broke the problem into three layers: without physical buttons, how players know what their hands can currently do; how panels should appear so they can be called at any time without blocking the city; and how building selection, grabbing, scaling, confirmation, and scale switching can remain continuous in feedback.

While collaborating with game design, engineering, art, and usability research teammates, I turned these judgments into an interaction system: using gestures to carry editing actions, using spatial prompts to express states, and deciding when UI should appear based on the player's gaze, hand position, and city scale. In the end, NeonCity's UI/UX was not only an information layer over the scene. It became a key medium through which players understand rules, control the city, and enter the space they built.

**Project Highlights**

01 | From Controller Operations to Natural Gestures

<figure>
  <img src="/assets/images/NeonCity/Hand%20Gesture%20System.png" alt="NeonCity transition from controller operations to natural gestures" />
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

This part focused on the actions players use most often: raising the palm to call up an operation entry, grabbing buildings with one or two hands, and using a double pinch for more precise selection and confirmation. The design goal was to make gestures as close as possible to real-world actions, so that even first-time players could naturally translate "I want to move this building" into "reach out and grab it."

02 | From Free Operation to Clear Editing Feedback

<figure>
  <img src="/assets/images/NeonCity/operations.png" alt="NeonCity gesture operation and editing feedback system" />
  <figcaption>NeonCity gesture operation and editing feedback system</figcaption>
</figure>

<video class="fit-screen-video" controls muted playsinline preload="metadata" data-autoplay-on-view aria-label="NeonCity gesture operation and editing feedback demo video">
  <source src="/assets/videos/operations.mp4" type="video/mp4" />
  Your browser does not support video playback.
</video>

In Hand Tracking interaction, players do not have the tactile confirmation that physical buttons provide, so system feedback becomes especially important. Around key actions such as building selection, grabbing, scaling, placement, and confirmation, I designed clearer state prompts and operation feedback so players could tell whether a building was selected, whether it could be placed, whether its size was being adjusted, and whether an action had been completed.

The focus of this part was not to add more UI, but to establish immediate and understandable feedback relationships between player gestures, building states, and city editing results, allowing continuous construction to remain stable even without controllers.

03 | Miniature Models, Real Scale, and Spatial UI

<figure>
  <img src="/assets/images/NeonCity/%E5%BE%AE%E7%BC%A9%E6%A8%A1%E5%9E%8B%E4%B8%8E%E7%9C%9F%E5%AE%9E%E5%B0%BA%E5%BA%A6%E7%9A%84%E8%BD%AC%E6%8D%A2.png" alt="NeonCity transition between miniature model and real scale" />
  <figcaption>NeonCity transition between miniature model and real scale</figcaption>
</figure>

<video class="fit-screen-video" controls muted playsinline preload="metadata" data-autoplay-on-view aria-label="NeonCity miniature model expansion and real-scale transition demo video">
  <source src="/assets/videos/expand.mp4" type="video/mp4" />
  Your browser does not support video playback.
</video>

Players can observe and edit the whole city from above like city planners. After building, they can switch the city to 1:1 scale and enter the streets they designed. This shift in perspective connects "city planning" with "spatial experience," and is an important feature that distinguishes the project from traditional city simulation games.

It also pushed me to think about UI through spatial relationships rather than fixed screens. Information needs to be reorganized based on the player's body position, gaze direction, hand operations, and changes in city scale. The point is not only to make things "clear enough to see," but to make prompts appear in the right place and at the right time, helping players understand whether they are editing a miniature model or entering a real-scale city.

04 | Playtesting and Interaction Iteration

<video class="fit-screen-video" controls muted playsinline preload="metadata" data-autoplay-on-view aria-label="NeonCity playtest session video">
  <source src="/assets/videos/playtest.mp4" type="video/mp4" />
  Your browser does not support video playback.
</video>

Across multiple rounds of playtesting, I focused on the places where players were most likely to get stuck when using Hand Tracking for the first time: whether they could discover the palm menu, whether they could identify whether a building was selected, grabbed, scaled, or being placed, and whether they could complete continuous construction without button prompts.

Testing showed that the problem was often not that players did not know how to make gestures, but that they were unsure whether the system had recognized their actions. Based on these observations, I pushed several UX adjustments: strengthening state feedback, adjusting panel positions, reducing obstruction of the city model, and making feedback for building selection, size adjustment, and placement confirmation clearer.

**Project Value and Reflection**

NeonCity was my first truly large-scale project as a student. It was the first time I worked in a team close to a real game production process: discussing problems with game design, engineering, art, usability research, and other disciplines, aligning directions, and gradually turning a complex VR concept into a work players could actually experience.

As UI/UX Lead, I was not only responsible for drawing interfaces. I needed to start from the overall player experience, clarify how players understand rules, how they complete operations with both hands, how they switch between miniature city and real scale, and how the team should implement these experiences through concrete interaction, feedback, and technical logic. Much of the time, I needed to translate needs across disciplines: turning problems exposed in playtests into design adjustments, and organizing design intent into plans that engineering and art teams could execute.

This experience helped me truly understand that UI/UX in immersive experiences is not an "interface added on top of the scene," but a whole experience structure connecting players, space, systems, and team collaboration.
