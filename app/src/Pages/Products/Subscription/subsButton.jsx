"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimate } from "framer-motion";
import { cn } from "../../../Lib/utils";
import { useAppContext } from "../../../Context/AppContextProvider";

export const SubsButton = ({
  className,
  children,
  isLoading,
  planName,
  ...props
}) => {
  const [scope, animate] = useAnimate();
  const prevLoading = useRef(false);
  const { state } = useAppContext();
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
  const isDisabled =
    planName.name === "Free" &&
    ((state.user && state?.user?.trial?.isUsed) ||
      (!state.user && state.subscription.free.isUsed));
  const ntWrk = planName.add === "fixing";

  return (
    <motion.button
      ref={scope}
      disabled={isDisabled || isLoading || ntWrk}
      className={cn(
        "relative flex items-center justify-center gap-2 cursor-pointer group inline-block transition-all hover:rounded-tr-xl hover:rounded-bl-xl hover:rounded-tl-none hover:rounded-br-none   hover:scale-105 text-md font-panchangMD w-full py-4 px-6 text-center  font-semibold rounded-sm overflow-hidden  duration-300",

        isDisabled
          ? "cursor-not-allowed bg-gray-500 border-gray-400 text-gray-300"
          : ntWrk
            ? "cursor-not-allowed bg-zinc-950 border-white/5 text-zinc-800"
            : "cursor-target hover:bg-white bg-purple-600 shadow-purple-100   hover:shadow-purple-200   drop-shadow-[0_10px_20px_rgba(139,92,246,0.5)] text-black ",
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
          {isDisabled
            ? "Already Used"
            : planName.add === "fixing"
              ? "Not Working"
              : children}
        </span>
      </span>
    </motion.button>
  );
};

// Loader spinner centered
const Loader = ({ isLoading }) => (
  <motion.svg
    className="loader text-black absolute left-2 "
    width="25"
    height="25"
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
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ scale: 0, opacity: 0, display: "none" }}
      className="check text-black absolute left-2"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </motion.svg>
  );
};
