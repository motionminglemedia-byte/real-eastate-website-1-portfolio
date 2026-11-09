"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@studio-freight/react-lenis";

export default function VideoScrollScrubber() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [duration, setDuration] = useState<number>(10.0);

  // Sync GSAP ScrollTrigger with Lenis
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const video = videoRef.current;
    if (!video) return;

    // Explicitly load video
    video.load();

    const handleLoaded = () => {
      if (video.duration && isFinite(video.duration) && video.duration > 0) {
        setDuration(video.duration);
      }
      // Prime the video decoder so the first frame renders immediately
      video.currentTime = 0.001;
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("loadeddata", handleLoaded);
    if (video.readyState >= 1) {
      handleLoaded();
    }

    // Direct scroll sync for instant, guaranteed responsiveness
    let animationFrameId: number;
    let targetTime = 0;
    let currentTime = 0;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
        const videoDuration = (video.duration && isFinite(video.duration) && video.duration > 0)
          ? video.duration
          : 10.0;
        targetTime = progress * Math.max(0.1, videoDuration - 0.05);
      }
    };

    const updateVideoFrame = () => {
      // Smooth interpolation for butter-smooth frame scrubbing
      currentTime += (targetTime - currentTime) * 0.15;
      if (video && Math.abs(video.currentTime - currentTime) > 0.02) {
        video.currentTime = currentTime;
      }
      animationFrameId = requestAnimationFrame(updateVideoFrame);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    animationFrameId = requestAnimationFrame(updateVideoFrame);

    // Also register GSAP ScrollTrigger timeline
    const ctx = gsap.context(() => {
      const proxy = { time: 0 };
      gsap.to(proxy, {
        time: 10,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            const videoDuration = (video.duration && isFinite(video.duration) && video.duration > 0)
              ? video.duration
              : 10.0;
            targetTime = self.progress * (videoDuration - 0.05);
          },
        },
      });
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("loadeddata", handleLoaded);
      cancelAnimationFrame(animationFrameId);
      ctx.revert();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        src="/house_timeline.webm"
        playsInline
        muted
        autoPlay={false}
        preload="auto"
        className="w-full h-full object-cover block"
        style={{ pointerEvents: "none" }}
      />

      {/* Subtle luxury vignette that leaves the house video clearly visible and vibrant */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090c10] via-transparent to-[#090c10]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[#090c10]/15 pointer-events-none" />
    </div>
  );
}
