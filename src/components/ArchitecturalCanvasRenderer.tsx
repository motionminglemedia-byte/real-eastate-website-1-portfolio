"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * ArchitecturalCanvasRenderer
 * 
 * Renders a high-performance 3D perspective architectural wireframe that morphs
 * with scroll position through the villa's construction stages:
 * 1. Blueprint on paper
 * 2. Hill bedrock foundation
 * 3. Monolithic structural rise
 * 4. Infinity pool & luxury living facade
 * 
 * Also provides an instant slot for dropping in an MP4 video or Three.js canvas.
 */
export default function ArchitecturalCanvasRenderer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollY / maxScroll)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 3D Perspective Projection Box & Villa Nodes
    interface Point3D {
      x: number;
      y: number;
      z: number;
    }

    // Define modernist villa structural wireframe vertices
    const baseVillaNodes: Point3D[] = [
      // Main Pavilion (Ground Floor)
      { x: -160, y: 60, z: -100 },
      { x: 160, y: 60, z: -100 },
      { x: 160, y: 60, z: 100 },
      { x: -160, y: 60, z: 100 },
      { x: -160, y: -20, z: -100 },
      { x: 160, y: -20, z: -100 },
      { x: 160, y: -20, z: 100 },
      { x: -160, y: -20, z: 100 },

      // Upper Cantilever Volume
      { x: -100, y: -20, z: -80 },
      { x: 220, y: -20, z: -80 },
      { x: 220, y: -20, z: 120 },
      { x: -100, y: -20, z: 120 },
      { x: -100, y: -90, z: -80 },
      { x: 220, y: -90, z: -80 },
      { x: 220, y: -90, z: 120 },
      { x: -100, y: -90, z: 120 },

      // Infinity Pool Terrace
      { x: -240, y: 60, z: 100 },
      { x: 80, y: 60, z: 100 },
      { x: 80, y: 60, z: 240 },
      { x: -240, y: 60, z: 240 },

      // Foundation Anchor Columns
      { x: -160, y: 150, z: -100 },
      { x: 160, y: 150, z: -100 },
      { x: 160, y: 150, z: 100 },
      { x: -160, y: 150, z: 100 },
      { x: 220, y: 150, z: 120 },
    ];

    // Wireframe edges connecting vertex indices
    const edges: [number, number][] = [
      // Ground box
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],

      // Cantilever upper box
      [8, 9], [9, 10], [10, 11], [11, 8],
      [12, 13], [13, 14], [14, 15], [15, 12],
      [8, 12], [9, 13], [10, 14], [11, 15],

      // Pool terrace
      [16, 17], [17, 18], [18, 19], [19, 16],

      // Deep foundation anchors
      [0, 20], [1, 21], [2, 22], [3, 23], [10, 24]
    ];

    let currentAngle = 0.45;
    let targetAngle = 0.45;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Camera rotation & elevation interpolate based on scroll progress
      targetAngle = 0.45 + scrollProgress * 1.2;
      currentAngle += (targetAngle - currentAngle) * 0.05;

      const elevation = -0.25 + scrollProgress * 0.4;
      const cosY = Math.cos(currentAngle);
      const sinY = Math.sin(currentAngle);
      const cosX = Math.cos(elevation);
      const sinX = Math.sin(elevation);

      const focalLength = Math.min(width, height) * 0.85;
      const cameraDist = 650;
      const centerX = width * 0.5 + (width > 1024 ? 80 : 0);
      const centerY = height * 0.52 - scrollProgress * 50;

      // Draw subtle Mediterranean horizon line
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.moveTo(0, centerY + 30);
      ctx.lineTo(width, centerY + 30);
      ctx.stroke();

      // Transform 3D vertices to 2D screen coordinates
      const projected = baseVillaNodes.map((pt, idx) => {
        // Foundation anchor vertical morphing based on scroll
        let y = pt.y;
        if (idx >= 20) {
          // Foundation pilings penetrate deeper as you scroll past stage 0.2
          const foundationGrowth = Math.min(1, Math.max(0, (scrollProgress - 0.1) * 3));
          y = pt.y * foundationGrowth;
        }

        // Cantilever rise animation between 0.3 and 0.7
        if (idx >= 8 && idx <= 15) {
          const riseFactor = Math.min(1, Math.max(0, (scrollProgress - 0.25) * 3));
          y = pt.y * riseFactor;
        }

        // Y-axis rotation
        const x1 = pt.x * cosY - pt.z * sinY;
        const z1 = pt.x * sinY + pt.z * cosY;

        // X-axis rotation (elevation tilt)
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX + cameraDist;

        const scale = focalLength / Math.max(10, z2);
        return {
          x: centerX + x1 * scale,
          y: centerY + y2 * scale,
          z: z2,
          visible: z2 > 0,
        };
      });

      // Draw Wireframe Structure Edges
      edges.forEach(([i, j], edgeIdx) => {
        const p1 = projected[i];
        const p2 = projected[j];

        if (!p1.visible || !p2.visible) return;

        // Fade edges in based on construction story progression
        let edgeOpacity = 0.25;

        // Foundation edges fade in during stage 2
        if (i >= 20 || j >= 20) {
          edgeOpacity = Math.min(0.4, Math.max(0.02, (scrollProgress - 0.12) * 1.5));
        }

        // Cantilever upper edges fade in during stage 3
        if ((i >= 8 && i <= 15) || (j >= 8 && j <= 15)) {
          edgeOpacity = Math.min(0.45, Math.max(0.04, (scrollProgress - 0.25) * 1.5));
        }

        // Pool terrace glow
        if (i >= 16 && j >= 16) {
          edgeOpacity = Math.min(0.5, Math.max(0.05, (scrollProgress - 0.45) * 2));
        }

        ctx.beginPath();
        if (i >= 16 && j >= 16) {
          // Pool terrace has amber glow
          ctx.strokeStyle = `rgba(229, 176, 114, ${edgeOpacity})`;
        } else if (i >= 20 || j >= 20) {
          // Foundation anchors have cyan/slate tone
          ctx.strokeStyle = `rgba(56, 189, 248, ${edgeOpacity})`;
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${edgeOpacity})`;
        }
        ctx.lineWidth = edgeIdx < 12 ? 1.5 : 1;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw glowing structural vertex nodes
      projected.forEach((p, idx) => {
        if (!p.visible) return;
        ctx.beginPath();
        ctx.arc(p.x, p.y, idx < 8 ? 2 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = idx >= 16 && idx <= 19 ? "rgba(251, 191, 36, 0.7)" : "rgba(255, 255, 255, 0.4)";
        ctx.fill();
      });

      // Atmospheric radial pool water shimmer at dusk (stages 0.5 - 1.0)
      if (scrollProgress > 0.45 && projected[16] && projected[18]) {
        const p1 = projected[16];
        const p2 = projected[18];
        const poolMidX = (p1.x + p2.x) / 2;
        const poolMidY = (p1.y + p2.y) / 2;

        const grad = ctx.createRadialGradient(poolMidX, poolMidY, 0, poolMidX, poolMidY, 120);
        grad.addColorStop(0, `rgba(229, 176, 114, ${Math.min(0.12, (scrollProgress - 0.45) * 0.25)})`);
        grad.addColorStop(1, "rgba(229, 176, 114, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(poolMidX, poolMidY, 120, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollProgress]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {/* 3D Wireframe Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />

      {/* 
        ========================================================================
        DEVELOPER INJECTION SLOT:
        To replace this interactive wireframe with your own video or 3D canvas,
        simply place your <video> or <Canvas> below:
        ========================================================================
        <video
          id="media-canvas-video"
          src="/assets/villa-construction.mp4"
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      */}
    </div>
  );
}

