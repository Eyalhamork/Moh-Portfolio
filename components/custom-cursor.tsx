"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  useEffect(() => {
    const handleMouseOver = () => setCursorVariant("hover");
    const handleMouseOut = () => setCursorVariant("default");

    const interactiveElements = document.querySelectorAll(
      'a, button, .interactive, [data-cursor="hover"]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseover", handleMouseOver);
      el.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver);
        el.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 50,
      width: 50,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 80,
      width: 80,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      mixBlendMode: "difference" as const,
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 rounded-full pointer-events-none mix-blend-difference"
      variants={variants}
      animate={cursorVariant}
    />
  );
};
