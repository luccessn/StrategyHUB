"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../Lib/utils";

export const PinContainer = ({
  children,
  title,
  description,
  className,
  containerClassName,
}) => {
  return (
    <div
      className={cn(
        "relative flex justify-center items-center",
        containerClassName
      )}
    >
      {/* Glow line */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 160, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute top-[55%] w-px bg-gradient-to-b from-cyan-400 to-transparent"
      />

      {/* PIN */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.9,
          rotateX: 45,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1200px",
        }}
        className="relative z-50"
      >
        <div
          className="rounded-2xl bg-black border border-white/20 shadow-2xl p-5 w-[22rem]"
          style={{
            transform: "rotateX(8deg)",
          }}
        >
          <h3 className="text-white font-bold text-lg">{title}</h3>
          <p className="text-slate-400 text-sm mt-2">{description}</p>

          <div className={cn("mt-4", className)}>{children}</div>
        </div>
      </motion.div>
    </div>
  );
};
