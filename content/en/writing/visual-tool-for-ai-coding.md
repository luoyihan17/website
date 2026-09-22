---
personalSite: true
title: "I Built a Tool That Turns Visual Experiments into Production-Ready Code"
date: "2026-09-22"
type: "Workflow"
---

In my work, I often design lyric animations, music player visuals, and other motion-driven experiences. Like many designers today, I’ve started using AI coding tools to quickly prototype visual ideas.

The process usually starts with something fairly abstract:

Make the text dissolve into particles.

Let light flow through the letters.

Create a soft, continuous sense of movement across the screen.

With AI coding, these ideas can become working prototypes surprisingly quickly.

It’s a great way to explore visual directions. Within a short amount of time, we can see whether an idea actually works, then keep iterating on the code until the result gets closer to what we imagined.

But in a real product workflow, a working prototype isn’t enough.

What happens when we want to change the text later? Or adjust the particle density, falling speed, trail length, or color?

Usually, that means going back into the code.

As designers, we often know exactly **what** needs to change visually, but not necessarily **where** that change lives in the implementation.

Over time, this creates a problem: a visual effect often becomes something only the person who originally built it can continue to modify. It remains a one-off experiment instead of becoming something the rest of the team can actually use.

So I built an internal tool for creating and tuning text-based particle effects.

## Making Visual Effects Directly Adjustable

The tool has a real-time visual preview on the left and a parameter panel on the right.

Designers can directly adjust the text, particle density, particle size, falling speed, number of particle streams, trail length, trail opacity, text color, particle color, background color, glow, light sweeps, and other visual properties.

Every change updates the preview in real time.

Beyond the basic parameters, I also designed two different waterfall styles.

The first uses lighter, thinner particle trails. It works well for visuals that should feel restrained, fast, and directional.

The second layers multiple trails together to create a softer, more luminous waterfall effect. It feels denser, smoother, and more atmospheric.

Instead of going back into the code every time, designers can first choose the overall visual direction and then fine-tune the details through parameters.

The tool also supports pausing the animation, locking the canvas size, and switching between Canvas 2D and Three.js / WebGL rendering.

This makes it useful not only for visual exploration, but also for understanding how the effect behaves under different rendering approaches before it moves further into production.

## Turning Visual Tweaks into Deliverable Code

The most important part of the tool isn’t just the preview or the parameter controls.

It’s the fact that the current visual state can be handed directly to developers.

Below the preview, designers can save the current configuration or export the entire implementation as a source-code package.

Once a version feels right, the tool can preserve the current text, parameters, canvas dimensions, playback state, and rendering method together as one defined state.

The exported package includes the visual component, control panel, dependencies, and an example page.

Developers can open it, run it immediately, and then integrate the effect into a music player, desktop client, or other product environment.

This is very different from handing off a static mockup or a screen recording.

Traditionally, a developer might receive a final-looking visual and then have to reverse-engineer it: understand the motion from a video, infer the parameters, and rebuild the implementation from scratch.

With this tool, they receive a version that has already been built and tested, along with the parameters and code that produced it.

They can immediately see:

* what the current effect looks like;
* how the particles are generated;
* how trails and particle connections are implemented;
* which properties are adjustable;
* and what the approved default values are.

The designer makes the visual decisions inside the tool first. The developer then starts from an implementation that has already been validated and focuses on performance, compatibility, and product integration.

That removes an entire layer of translation between visual exploration and engineering implementation.

## Turning a One-Off Effect into Something the Team Can Reuse

I didn’t build this tool so designers could replace developers, or so designers would need to own every technical detail.

The goal is to make the handoff after visual exploration much more concrete.

Previously, feedback might sound like:

“Can we make the effect feel lighter?”

“The transition between the particles and the text should feel more connected.”

“The trails are a little too visible.”

Those are meaningful visual judgments, but developers still have to translate them into technical parameters and implementation decisions.

Now, designers can test those changes themselves, understand the range that works visually, and hand off a version that has already been validated.

Developers no longer have to start from a screenshot or guess how an effect is supposed to behave.

Instead, they can start with working code and make informed decisions about performance, compatibility, and integration.

What they receive is no longer just an abstract visual request.

It is a working implementation that has already been run, adjusted, and validated.

AI coding has made it much faster for designers to turn visual ideas into working experiments.

What I wanted to solve with this tool was the next step: **how to turn those one-off experiments into something that can be saved, adjusted, reused, and handed off.**

Visual exploration lives on the left.

Parameter controls live on the right.

Code delivery happens below.

Once a designer confirms a direction, the result is no longer just a final visual.

It can become code that developers can immediately understand, evaluate, and continue building from.

That is the core problem I wanted this internal tool to solve.
