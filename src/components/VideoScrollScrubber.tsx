"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@studio-freight/react-lenis";

export default function VideoScrollScrubber() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Continuously synchronize GSAP ScrollTrigger with Lenis scroll RAF
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin on client
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    if (!video) return;

    // Ensure video is paused and ready for scrubbing
    video.pause();

    let triggerInstance: ScrollTrigger | null = null;
    let tweenInstance: gsap.core.Tween | null = null;

    const initScrubber = () => {
      const duration = video.duration;
      if (!duration || isNaN(duration) || duration <= 0) return;

      setIsLoaded(true);

      // Proxy object for butter-smooth currentTime interpolation
      const videoState = { currentTime: 0 };

      // Ensure initial frame is rendered
      video.currentTime = 0.001;

      tweenInstance = gsap.to(videoState, {
        currentTime: duration - 0.02,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6, // Silky smooth scrubbing response
          onUpdate: (self) => {
            if (video && !isNaN(videoState.currentTime)) {
              // Clamp within valid duration bounds
              const targetTime = Math.min(
                duration - 0.01,
                Math.max(0, videoState.currentTime)
              );
              video.currentTime = targetTime;
            }
          },
        },
      });

      triggerInstance = tweenInstance.scrollTrigger || null;
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      initScrubber();
    } else {
      video.addEventListener("loadedmetadata", initScrubber);
      video.addEventListener("canplay", initScrubber);
    }

    return () => {
      video.removeEventListener("loadedmetadata", initScrubber);
      video.removeEventListener("canplay", initScrubber);
      if (triggerInstance) triggerInstance.kill();
      if (tweenInstance) tweenInstance.kill();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        src="/house_timeline.webm"
        playsInline
        muted
        preload="auto"
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ pointerEvents: "none" }}
      />

      {/* Cinematic dark luxury overlay to ensure pristine typography legibility */}
      <div className="absolute inset-0 bg-[#090c10]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090c10] via-transparent to-[#090c10]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#090c10]/70 via-transparent to-[#090c10] pointer-events-none" />
    </div>
  );
}
