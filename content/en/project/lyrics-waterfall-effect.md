---
personalSite: true
title: "QQ Music iPhone DUO Lyrics Waterfall Effect"
date: "2026-09-22"
intro: "Turning a popular lyric waterfall effect into runnable code."
sorting: 6
coverImage: "/assets/cover-image/lyrics.png"
skill: ["AI Coding", "Visual Prototyping", "Interaction Design", "Design and Engineering Collaboration"]
---

## The challenge

The lyric waterfall designed by our visual designer became the most requested visual online. It combined lyrics, flowing particles, and light effects: compelling to watch, but more complex to implement than a static visual. After review, development said they could not build it with the available resources, and no one else was ready to take it on.

At the same time, QQ Music iPhone DUO was planned for a late-October launch. With strong user demand, limited implementation capacity, and a tight schedule, I needed to turn the visual concept into something runnable and testable so it could still be considered for the product.

<figure>
  <video class="content-wide-video" controls autoplay muted playsinline preload="metadata">
    <source src="/assets/videos/lyrics-waterfall-compressed.mp4" type="video/mp4" />
    Your browser does not support video playback.
  </video>
  <figcaption>Lyric waterfall effect recording</figcaption>
</figure>

## My contribution

<figure>
  <video class="content-wide-video" controls autoplay muted playsinline preload="metadata">
    <source src="/assets/videos/lyrics-waterfall-process-compressed.mp4" type="video/mp4" />
    Your browser does not support video playback.
  </video>
  <figcaption>Particle text and waterfall effect process</figcaption>
</figure>

**01 | Build the particle text.** I used code to render the lyrics as text made of particles, first refining the letterforms and particle texture so the words would remain readable in motion.

**02 | Make the particles flow.** I added the falling waterfall and trails, then tuned how the text connects to the streams, along with particle count and falling speed. Comparing fine-line and soft-glow styles helped me find a rhythm and atmosphere closer to the original visual.

**03 | Turn iteration into a live adjuster.** I organized the controls around text, motion, appearance, and sparkle so each change could be previewed immediately. Lyric transitions, particle drift and flicker, color, glow, and light sweeps could all be explored without repeatedly editing the code.

**04 | Save and hand off the effect.** I added presets, parameter export, and a full source ZIP export, along with pause, fixed canvas sizing, and Canvas 2D / Three.js rendering options. Developers could continue evaluation and integration from a validated visual and runnable code.

## Project value

I translated the visual effect into runnable, adjustable code, bridging visual design and development. Real-time preview and parameter-based iteration helped validate the direction faster. Handing off the confirmed settings and source also let developers continue from an agreed implementation, reducing repeated discussion and the effort of rebuilding the effect from scratch.

<figure>
  <video class="content-wide-video" controls autoplay muted playsinline preload="metadata">
    <source src="/assets/videos/lyrics-waterfall-device-compressed.mp4" type="video/mp4" />
    Your browser does not support video playback.
  </video>
  <figcaption>Recording on a real device</figcaption>
</figure>
