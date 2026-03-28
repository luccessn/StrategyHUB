"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimate } from "framer-motion";
import { cn } from "../../../Lib/utils";

export const Button = ({ className, children, isLoading, ...props }) => {
  const [scope, animate] = useAnimate();
  const prevLoading = useRef(false);

  // Animate loader and check icon
  useEffect(() => {
    if (isLoading && !prevLoading.current) {
      // Start loader
      animate(".loader", { scale: 1, opacity: 1, display: "inline-block" });
      animate(".check", { scale: 0, opacity: 0, display: "none" });
    } else if (!isLoading && prevLoading.current) {
      // Stop loader + show check for 2s
      animate(".loader", { scale: 0, opacity: 0, display: "none" });
      animate(".check", { scale: 1, opacity: 1, display: "inline-block" }).then(
        () => {
          setTimeout(() => {
            animate(".check", { scale: 0, opacity: 0, display: "none" });
          }, 2000);
        },
      );
    }
    prevLoading.current = isLoading;
  }, [isLoading, animate]);

  return (
    <motion.button
      ref={scope}
      disabled={isLoading}
      className={cn(
        "group/btn relative flex h-10 w-full items-center justify-center gap-2 rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]",
        className,
      )}
      {...props}
    >
      <span className="relative flex items-center justify-center w-full">
        <Loader isLoading={isLoading} />
        <CheckIcon />
        <span
          className={cn(
            "transition-opacity",
            isLoading ? "opacity-50" : "opacity-100",
          )}
        >
          {children}
        </span>
      </span>
    </motion.button>
  );
};

// Loader spinner centered
const Loader = ({ isLoading }) => (
  <motion.svg
    className="loader text-white absolute  left-48"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{ scale: 0, opacity: 0, display: "none" }}
    animate={{
      rotate: isLoading ? [0, 360] : 0,
      scale: isLoading ? 1 : 0,
      opacity: isLoading ? 1 : 0,
      display: isLoading ? "inline-block" : "none",
    }}
    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 3a9 9 0 1 0 9 9" />
  </motion.svg>
);

// Check icon centered
// const CheckIcon = () => (
//   <motion.svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     initial={{ scale: 0, opacity: 0, display: "none" }}
//   >
//     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//     <path d="M9 12l2 2l4 -4" />
//   </motion.svg>
// );
const CheckIcon = () => {
  return (
    <motion.svg
      // initial={{
      //   scale: 0,
      //   width: 0,
      //   display: "none",
      // }}
      // style={{
      //   scale: 0.5,
      //   display: "none",
      // }}
      // xmlns="http://www.w3.org/2000/svg"
      // width="24"
      // height="24"
      // viewBox="0 0 24 24"
      // fill="none"
      // stroke="currentColor"
      // strokeWidth="2"
      // strokeLinecap="round"
      // strokeLinejoin="round"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ scale: 0, opacity: 0, display: "none" }}
      className="check text-white absolute left-48"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </motion.svg>
  );
};
