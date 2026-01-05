"use client";

import createGlobe from "cobe";
import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "../lib/utils";

const GLOBE_CONFIG = {
  width: 600,
  height: 600,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1] as [number, number, number],
  markerColor: [251 / 255, 100 / 255, 21 / 255] as [number, number, number],
  glowColor: [1, 1, 1] as [number, number, number],
  markers: [
    { location: [41.0082, 28.9784], size: 0.06 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [-23.5505, -46.6333], size: 0.1 },
  ] as { location: [number, number]; size: number }[],
};

export interface GlobeProps {
  className?: string;
  config?: typeof GLOBE_CONFIG;
}

export function Globe({ className, config = GLOBE_CONFIG }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);

  const onRender = useCallback((state: any) => {
    phiRef.current += 0.005; 
    state.phi = phiRef.current;
    state.width = widthRef.current * 2;
    state.height = widthRef.current * 2;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let globe: any;

    const handleResize = () => {
      if (canvas.offsetWidth > 0) {
        widthRef.current = canvas.offsetWidth;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Safety fallback: if width is 0 (hidden), assume a default to prevent crash
    if (widthRef.current === 0) {
        widthRef.current = 600;
    }

    try {
        globe = createGlobe(canvas, {
            ...config,
            width: widthRef.current * 2,
            height: widthRef.current * 2,
            onRender,
        });
    } catch (e) {
        // Silent fail if context invalid
    }

    return () => {
      if (globe) globe.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, [config, onRender]);

  return (
    <div className={cn("relative aspect-square w-full max-w-md", className)}>
      <canvas
        ref={canvasRef}
        className="size-full [contain:layout_paint_size] opacity-0 transition-opacity duration-1000"
        style={{ opacity: 1 }}
      />
    </div>
  );
}