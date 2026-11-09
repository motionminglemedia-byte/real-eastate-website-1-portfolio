# PHEME ESTATE — Luxury Real Estate Architecture UI

A static UI replica of the luxury real estate website built with **Next.js (App Router)** and **Tailwind CSS**.

---

## 🏗️ Architecture & Injection Point

### 1. Canvas / Video Injection Point: `<div id="media-canvas-container">`
Located in [`src/components/MediaCanvasContainer.tsx`](file:///Users/apple/Downloads/rel%20eastate%20web%20portfolio%20websites/website%20no%20.1/src/components/MediaCanvasContainer.tsx):
- Fixed full-screen container (`fixed inset-0 w-full h-full -z-10`) with dark slate background (`#090d14`).
- Remains stationary behind the page while content scrolls.
- Ready for Three.js, React Three Fiber `<Canvas>`, or scroll-scrubbed `<video>` integration:
  ```tsx
  // Target via ID:
  const container = document.getElementById("media-canvas-container");
  ```

---

## 🎨 Typography & Design Tokens

- **Editorial Serif Pairing**: Roman serif + sweeping italic serif:
  - *"It starts on paper."*
  - *"Rooted in the hill."*
  - *"Then it rises."*
  - *"Finished by hand."*
  - *"Made for long summers."*
  - *"Your keys, ready."*
  - *"What we build."*
  - *"Building Cyprus since 1996."*
  - *"Start yours."*
- **Giant "HOME" Mask Text**: Background clip typography framing architectural imagery.
- **Color Palette**: Deep Obsidian Slate (`#090c10`), Champagne Gold (`#e5b072` / `amber-300`), Frosted Glass (`bg-white/[0.03]`, `border-white/10`, `backdrop-blur-md`).

---

## 🎠 Components Overview

| Component | Description |
|-----------|-------------|
| [`Navbar.tsx`](file:///Users/apple/Downloads/rel%20eastate%20web%20portfolio%20websites/website%20no%20.1/src/components/Navbar.tsx) | Fixed header with brand emblem, navigation pills, and *"Book a site visit"* CTA |
| [`MediaCanvasContainer.tsx`](file:///Users/apple/Downloads/rel%20eastate%20web%20portfolio%20websites/website%20no%20.1/src/components/MediaCanvasContainer.tsx) | Background `<div id="media-canvas-container">` container |
| [`HeroSection.tsx`](file:///Users/apple/Downloads/rel%20eastate%20web%20portfolio%20websites/website%20no%20.1/src/components/HeroSection.tsx) | *"It starts on paper."* + Interactive blueprint schematic card |
| [`StorySections.tsx`](file:///Users/apple/Downloads/rel%20eastate%20web%20portfolio%20websites/website%20no%20.1/src/components/StorySections.tsx) | Spaced story sections: Foundation, Structure (right), Craft (right), Living (left) |
| [`GiantHomeMask.tsx`](file:///Users/apple/Downloads/rel%20eastate%20web%20portfolio%20websites/website%20no%20.1/src/components/GiantHomeMask.tsx) | *"BUILT, FURNISHED, HANDED OVER."* + Giant clipped **HOME** typography |
| [`TurnkeyKeysSection.tsx`](file:///Users/apple/Downloads/rel%20eastate%20web%20portfolio%20websites/website%20no%20.1/src/components/TurnkeyKeysSection.tsx) | *"Your keys, ready."* with 3 spec cards: Fixed, Deeded, One |
| [`WhatWeBuildCarousel.tsx`](file:///Users/apple/Downloads/rel%20eastate%20web%20portfolio%20websites/website%20no%20.1/src/components/WhatWeBuildCarousel.tsx) | Horizontally scrolling project carousel with arrows, `01 / 05` counter, and progress track |
| [`CyprusStatsSection.tsx`](file:///Users/apple/Downloads/rel%20eastate%20web%20portfolio%20websites/website%20no%20.1/src/components/CyprusStatsSection.tsx) | *"Building Cyprus since 1996."* with 2x2 statistics grid (407, 30, 95%, 12) |
| [`FooterCTASection.tsx`](file:///Users/apple/Downloads/rel%20eastate%20web%20portfolio%20websites/website%20no%20.1/src/components/FooterCTASection.tsx) | *"Start yours."*, contact atelier metadata, massive **PHEME** watermark, and footer |
| [`VideoPlayerOverlay.tsx`](file:///Users/apple/Downloads/rel%20eastate%20web%20portfolio%20websites/website%20no%20.1/src/components/VideoPlayerOverlay.tsx) | Bottom floating HUD: Mute toggle, dynamic scroll timecode scrubber, and *"Unlock Specs"* modal |
| [`SmoothScrollProvider.tsx`](file:///Users/apple/Downloads/rel%20eastate%20web%20portfolio%20websites/website%20no%20.1/src/components/SmoothScrollProvider.tsx) | Lenis smooth scroll provider (`@studio-freight/react-lenis`) |

---

## 📦 Installed Dependencies

- `gsap`: Ready for scroll scrubbing animations.
- `@studio-freight/react-lenis`: Smooth momentum scrolling initialized without complex triggers.
- `lucide-react`: Ultra-clean luxury UI iconography.
- `tailwindcss`: Custom luxury palette, typography, and glassmorphic utilities.

---

## 🚀 Running the Project

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

