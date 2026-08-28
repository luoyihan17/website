---
personalSite: true
title: "Language Learning, Hidden in Music"
date: "2024-10-01"
intro: "From a player concept to a lighter shipped feature shaped by real constraints"
sorting: 2.5
coverImage: "/assets/cover-image/Qduocover.webp"
skill: ["Opportunity framing", "Product design", "Scope management", "Cross-functional drive"]
---

<p class="foreign-learning-lead">
Not every good design needs to ship in its original form.
</p>

When I first joined QQ Music, I kept thinking about one question: QQ Music owns a large library of high-quality global music rights. Beyond listening, what new value could that content create?

When I was younger, memorizing words felt boring. But my English teacher started every morning class with an English song. I did not feel like I was studying. I was just listening and singing along, but I still remembered words, pronunciation, and expressions.

That memory led me to one question: **if songs can help people learn a language, why can't learning happen while they listen?**


## The opportunity hidden in songs

I defined the idea as the **Learning Languages Through Music** feature.

It was not about adding a traditional language course to QQ Music. It was about turning songs into learning materials.

Users could still listen to foreign-language songs they liked. During playback, they could understand lyrics, learn expressions, and remember them through repeated listening.

For me, the value was not simply to "make a learning feature." It was to keep users who learn through foreign-language songs inside QQ Music's listening flow.

I first pitched the idea during my probation review. I designed the first concept myself, using QQ Music's existing player habits and similar entry points that were already live as references.

<figure>
  <img src="/assets/images/Leraningbymusic/%E5%90%AC%E6%AD%8C%E5%AD%A6%E5%A4%96%E6%96%87.webp" alt="Learning Languages Through Music player entry concept" />
  <figcaption>Learning Languages Through Music player entry concept</figcaption>
</figure>

I kept the core action: playing a song. The learning entry could sit under the lyrics page as "Learn," or extend from the existing "Translate" entry.

The path stayed light: **Listen -> read lyrics -> tap when confused -> learn expressions**.

After the review, I reached out to the product team to move it toward a real feature.


## After approval, constraints appeared

After several rounds of discussion, the direction was approved. The product manager also contacted Duolingo about a possible collaboration.

I kept refining the proposal. I added a learning page to QQ Music's Music Hall to collect curated foreign-language songs.

<figure>
  <img src="/assets/images/Leraningbymusic/%E5%90%AC%E6%AD%8C%E5%AD%A6%E5%A4%96%E6%96%872.webp" alt="Learning music hall concept" />
  <figcaption>Learning music hall concept</figcaption>
</figure>

Users could enter a dedicated player mode, mark difficult words, and save them. Exam-focused learners could also start from dictionary categories, choose related songs, and use them to reinforce memory.

<figure>
  <img src="/assets/images/Leraningbymusic/%E5%90%AC%E6%AD%8C%E5%AD%A6%E5%A4%96%E6%96%873.webp" alt="Language-learning player concept" />
  <figcaption>Language-learning player concept</figcaption>
</figure>

Once the Duolingo collaboration entered discussion, two constraints became clear:

<section class="foreign-learning-constraints">
  <p><strong>Different expectations.</strong> We wanted learning to sit inside QQ Music's core player, so users could enter learning while listening. In discussion, both sides had different views on how deep the entry should be and where the learning journey should live.</p>
  <p><strong>Limited resources.</strong> The standalone player could technically ship on its own, but it had to compete with higher-priority work and did not receive enough development priority.</p>
</section>

This was the first time I clearly realized:

> **Having a design approved and getting a product shipped are two different things.**

## Smaller, not weaker

At this point, I stopped pushing for the full language-learning player. We broke the idea down again. If we could only build a small part, what value had to stay?

The answer was not the player itself.
**It was helping users encounter and learn a foreign language in a lighter, more playful way through music.**

So we looked for an existing scene with lower development cost. In the end, we chose QQ Music's **guess-the-song gameplay**.

<section class="foreign-learning-constraints">
  <p><strong>The development gap was clear.</strong> Building a standalone language-learning player would require new scheduling across the client, playback flow, lyrics capabilities, word marking, and saving logic. The development cycle would be close to a month.</p>
  <p><strong>The existing framework made shipping faster.</strong> By embedding the core learning mechanism into QQ Music's existing guess-the-song H5 gameplay, we could iterate on question types, content, and interaction within the current front-end framework, reducing development to under a week.</p>
</section>

**So this was not simply about making the proposal smaller. With limited resources, it was about turning the heaviest part of the player concept into a product path that could be validated faster and shipped more easily.**

<figure>
  <img src="/assets/images/Leraningbymusic/%E5%90%AC%E6%AD%8C%E5%AD%A6%E5%A4%96%E6%96%874.webp" alt="Guess-the-song language-learning game" />
  <figcaption>Guess-the-song language-learning game</figcaption>
</figure>

## It changed, but it shipped

The full language-learning concept became a lighter entry point, and that version shipped.

The Duolingo collaboration also moved forward. Duo, the Duolingo mascot, joined our musician page as a "music artist" and released a new song. Duo also appeared inside QQ Music as a companion character for language learners.

<figure>
  <img src="/assets/images/Leraningbymusic/%E5%90%AC%E6%AD%8C%E5%AD%A6%E5%A4%96%E6%96%875.webp" alt="Duo companion experience online" />
  <figcaption>Duo companion experience online</figcaption>
</figure>

## What I protected was not the player

The final shipped form was very different from the player I first designed.

This changed how I understood shipping. Shipping does not always mean matching the design file. It often means choosing between user value, product goals, resources, and business priorities.

As a designer, I did not need to protect every screen or interaction. I needed to protect the part of the idea that could not be lost.

I started by wanting to ship a player. What actually shipped was a small entry point inside the product.

But through it, I experienced the full path: **Find an opportunity -> propose an idea -> design the solution -> move it toward product -> face constraints -> reduce scope -> find a new way to ship.**

<section class="foreign-learning-closing">
  <strong>Good design is not only about completing a solution.</strong>
  <p>It is also about helping an idea happen within real constraints.</p>
</section>
