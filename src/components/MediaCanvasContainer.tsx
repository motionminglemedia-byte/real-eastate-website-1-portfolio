import React from "react";

export default function MediaCanvasContainer() {
  return (
    <div
      id="media-canvas-container"
      className="fixed inset-0 w-full h-full -z-10 bg-[#090d14] overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* 
        Completed Villa Backdrop:
        Sits in the background when the user scrolls past the pinned 3D image sequence 
        into the rest of the website (HOME mask, carousel, stats, footer).
      */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: `url('/frames/frame_160.jpg')` }}
      />

      {/* Subtle blueprint grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Atmospheric depth gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(20,30,45,0.2)_0%,rgba(9,13,20,0.85)_100%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#090c10] via-[#090c10]/70 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#090c10] via-[#090c10]/70 to-transparent pointer-events-none" />
    </div>
  );
}
