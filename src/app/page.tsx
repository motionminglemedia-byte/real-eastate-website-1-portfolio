import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import MediaCanvasContainer from "@/components/MediaCanvasContainer";
import GiantHomeMask from "@/components/GiantHomeMask";
import TurnkeyKeysSection from "@/components/TurnkeyKeysSection";
import WhatWeBuildCarousel from "@/components/WhatWeBuildCarousel";
import CyprusStatsSection from "@/components/CyprusStatsSection";
import FooterCTASection from "@/components/FooterCTASection";
import VideoPlayerOverlay from "@/components/VideoPlayerOverlay";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

// Dynamically import pinned 3D sequence to avoid SSR canvas issues
const PinnedScrollSequence = dynamic(
  () => import("@/components/PinnedScrollSequence"),
  { ssr: false }
);

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="relative min-h-screen text-[#f4f4f6] bg-[#090c10]">
        {/* Fixed Full-Screen Background Canvas Container */}
        <MediaCanvasContainer />

        {/* Floating Top Navigation */}
        <Navbar />

        {/* 
          1. Initial Pinned 3D Scrollytelling Sequence:
          When the user lands on the website and starts scrolling, 
          the 50 frames flow smoothly in real time while the viewport is pinned.
        */}
        <PinnedScrollSequence />

        {/* 
          2. Downward Flow into the Rest of the Website:
          Once the full sequence finishes, the page unpins and the user scrolls 
          down into the rest of the website.
        */}
        <div className="relative z-10 flex flex-col bg-[#090c10]/90 backdrop-blur-sm">
          {/* 06: Giant "HOME" Mask Typography Section */}
          <GiantHomeMask />

          {/* 07: "Your keys, ready." Turnkey Features */}
          <TurnkeyKeysSection />

          {/* 08: "What we build." Horizontal Carousel */}
          <WhatWeBuildCarousel />

          {/* 09: "Building Cyprus since 1996." Statistics Grid */}
          <CyprusStatsSection />

          {/* 10: "Start yours." CTA & Footer */}
          <FooterCTASection />
        </div>

        {/* Bottom Floating Scrubber HUD and Specs Trigger */}
        <VideoPlayerOverlay />
      </main>
    </SmoothScrollProvider>
  );
}
