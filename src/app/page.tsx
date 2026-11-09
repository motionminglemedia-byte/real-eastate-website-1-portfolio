import React from "react";
import Navbar from "@/components/Navbar";
import MediaCanvasContainer from "@/components/MediaCanvasContainer";
import HeroSection from "@/components/HeroSection";
import StorySections from "@/components/StorySections";
import GiantHomeMask from "@/components/GiantHomeMask";
import TurnkeyKeysSection from "@/components/TurnkeyKeysSection";
import WhatWeBuildCarousel from "@/components/WhatWeBuildCarousel";
import CyprusStatsSection from "@/components/CyprusStatsSection";
import FooterCTASection from "@/components/FooterCTASection";
import VideoPlayerOverlay from "@/components/VideoPlayerOverlay";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="relative min-h-screen text-[#f4f4f6]">
        {/* Fixed Full-Screen Background Canvas Container */}
        {/* Core Architecture Requirement 1: */}
        {/* Fixed, full-screen background element <div id="media-canvas-container"> with a dark slate placeholder color */}
        <MediaCanvasContainer />

        {/* Floating Top Navigation */}
        <Navbar />

        {/* Scrollable UI Content Sections */}
        <div className="relative z-10 flex flex-col">
          {/* 01: Hero "It starts on paper." */}
          <HeroSection />

          {/* 02-05: Narrative Construction Story Sections */}
          <StorySections />

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

