"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis"; // Updated import

interface SmoothScrollProps {
  children: ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical", // Changed from 'direction'
      gestureOrientation: "vertical", // Changed from 'gestureDirection'
      smoothWheel: true, // Changed from 'smooth'
      syncTouch: false, // Changed from 'smoothTouch'
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
