import React, {
  useEffect,
  Suspense,
  useId,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export const WetTyres = () => {
  const rainTyresRef = useRef(null);
  const greenTyre = useRef(null);
  const blueTyre = useRef(null);
  //2
  const greenTyre2 = useRef(null);
  const blueTyre2 = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // const tl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: rainTyresRef.current,
      //     start: "top 40%",
      //     end: "top 20%",
      //     scrub: 8,
      //   },
      // });
      gsap.fromTo(
        greenTyre.current,
        {
          x: window.innerWidth,
          rotation: -720,
        },
        {
          x: 0,
          rotation: 0,
          duration: 2,
          scrollTrigger: {
            trigger: rainTyresRef.current,
            start: "top 70%",
            end: "top 65%",
            scrub: 6,
          },
        },
      );
      gsap.fromTo(
        blueTyre.current,
        {
          x: -window.innerWidth,
          rotation: -720,
        },
        {
          x: 0,
          rotation: 0,
          duration: 2,
          scrollTrigger: {
            trigger: rainTyresRef.current,
            start: "top 20%",
            end: "top 15%",
            scrub: 6,
          },
        },
      );
      gsap.fromTo(
        greenTyre2.current,
        {
          x: window.innerWidth,
          rotation: -720,
        },
        {
          x: 0,
          rotation: 0,
          duration: 2,
          scrollTrigger: {
            trigger: rainTyresRef.current,
            start: "top 40%",
            end: "top 35%",
            scrub: 6,
          },
        },
      );
      gsap.fromTo(
        blueTyre2.current,
        {
          x: -window.innerWidth,
          rotation: -720,
        },
        {
          x: 0,
          rotation: 0,
          duration: 2,
          scrollTrigger: {
            trigger: rainTyresRef.current,
            start: "top 10%",
            end: "top 6%",
            scrub: 6,
          },
        },
      );
    }, rainTyresRef);

    return () => ctx.revert();
  }, []);
  return (
    <div
      ref={rainTyresRef}
      className="flex flex-col gap-10 m-10 xl:m-20 py-24 clg:py-16"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.99, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.45, ease: "linear" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="flex flex-col items-center clg:flex-row  clg:justify-between">
          <img
            ref={greenTyre2}
            src="https://i.postimg.cc/MZyMDZBn/green.webp"
            alt=""
            className=" block  clg:hidden w-[320px] mmd:w-[350px] lg:w-[400px] self-start "
          />
          <div className="flex flex-col   justify-center  gap-1 w-full clg:w-[700px]">
            <h1 className="text-2xl clg:text-3xl font-bold">
              Green / Intermediate
            </h1>
            <p className=" font-semibold text-base ">
              The intermediates are the most versatile of the rain tyres. They
              can be used on a wet track with no standing water, as well as a
              drying surface. The compound has been designed to have a wide
              working range, guaranteeing a wide crossover window both with the
              slicks and the full wets.
            </p>
          </div>
          <img
            ref={greenTyre}
            src="https://i.postimg.cc/MZyMDZBn/green.webp"
            alt=""
            className=" hidden clg:block w-[480px]"
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.99, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.45, ease: "linear" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="flex flex-col items-center clg:flex-row  clg:justify-between">
          <img
            ref={blueTyre2}
            src="https://i.postimg.cc/YCjcz30S/blue.webp"
            alt=""
            className=" block  clg:hidden w-[320px] mmd:w-[350px] lg:w-[400px] self-end  "
          />
          <img
            ref={blueTyre}
            src="https://i.postimg.cc/YCjcz30S/blue.webp"
            alt=""
            className="hidden clg:block w-[480px] "
          />
          <div className="flex flex-col   justify-center  gap-1 w-full clg:w-[700px]">
            <h1 className=" text-2xl clg:text-3xl font-bold">
              Blue / Full Wet
            </h1>
            <p className=" font-semibold text-base ">
              The full wet tyres are the most effective for heavy rain, capable
              of dispersing impressive quantities of water. But if it rains
              heavily, visibility rather than grip causes issues, leading to
              race stoppages on occasions. The profile delivers increased
              resistance to aquaplaning, which gives the tyre more grip in heavy
              rain.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
