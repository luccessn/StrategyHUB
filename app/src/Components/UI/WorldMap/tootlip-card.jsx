"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../Lib/utils";

export const Tooltip = ({ content, children, containerClassName }) => {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const calculatePosition = (mouseX, mouseY) => {
    const tooltipWidth = 240;
    const tooltipHeight = contentRef.current?.scrollHeight || 0;

    let x = mouseX + 12;
    let y = mouseY + 12;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rect = containerRef.current.getBoundingClientRect();

    const absX = rect.left + x;
    const absY = rect.top + y;

    if (absX + tooltipWidth > vw) x = mouseX - tooltipWidth - 12;
    if (absY + tooltipHeight > vh) y = mouseY - tooltipHeight - 12;

    return { x, y };
  };

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition(calculatePosition(x, y));
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block", containerClassName)}
      onMouseEnter={(e) => {
        setIsVisible(true);
        handleMove(e);
      }}
      onMouseLeave={() => setIsVisible(false)}
      onMouseMove={handleMove}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute z-50 min-w-[15rem] rounded-md bg-white p-2 text-sm shadow-lg dark:bg-neutral-900"
            style={{ top: position.y, left: position.x }}
          >
            <div ref={contentRef}>{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
