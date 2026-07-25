import React, {
  useEffect,
  Suspense,
  useId,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  OrbitControls,
  Environment,
  Html,
  useGLTF,
  useProgress,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "../Loads/load.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
// TYres Images
import soft from "../../Images/Tyres/soft.webp";
import medium from "../../Images/Tyres/medium.webp";
import hard from "../../Images/Tyres/hard.webp";
import greenwet from "../../Images/Tyres/greenwet.webp";
import bluewet from "../../Images/Tyres/bluewet.webp";
import { useState } from "react";

const tyreData = [
  {
    src: "https://i.postimg.cc/ZKM4YvGb/medium.webp",
    title: "Medium",
    description:
      "The yellow tyre is the medium compound and offers a balance between performance and durability, providing moderate grip and longevity. It is typically used for longer stints than the soft tyre. C2, C3, C4 and C5 are used with yellow sidewalls.",
  },
  {
    src: "https://i.postimg.cc/KY4TkTzp/softest.png",
    title: "Soft",
    description:
      "The red tyre signifies the soft compound, designed for maximum grip and performance over shorter stints. It offers top lap times but wears out quickly, ideal for qualifying and short races. Typically C5 compounds has red sidewalls, but also C3, C4 and C6 can be used.",
  },
  {
    src: "https://i.postimg.cc/D0CFXSmc/hard.webp",
    title: "Hard",
    description:
      "The white tyre, known as the hard compound, offers maximum durability and longevity, ideal for long stints and hot conditions. Typically C1 compounds has white sidewalls, but also C2, C3 and C4 can be used.",
  },
];

gsap.registerPlugin(ScrollTrigger);
export const TyresModels = () => {
  console.log(tyreData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [active, setactive] = useState(null);
  useEffect(() => {
    if (tyreData && tyreData.length > 0) {
      setactive(tyreData[0]);
    }
  }, [tyreData]);
  const id = useId();

  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const text2Ref = useRef(null);
  const slidesRef = useRef([]);
  const swiperRef = useRef(null);
  const swiperContainerRef = useRef(null);

  useLayoutEffect(() => {
    const centerRect = slidesRef.current[1].getBoundingClientRect();
    const leftRect = slidesRef.current[0].getBoundingClientRect();
    const rightRect = slidesRef.current[2].getBoundingClientRect();

    // ეკრანის ცენტრის X კოორდინატი — ყველა slide-ის "საწყისი" ვიზუალური სამიზნეა
    const viewportCenterX = window.innerWidth / 2;

    // თითოეული slide-ისთვის ვთვლით, რა x offset სჭირდება იმისთვის,
    // რომ მისი ცენტრი ეკრანის ცენტრში აღმოჩნდეს (ე.ი. "ვიზუალურად ცენტრში დგას")
    const centerOffset =
      viewportCenterX - (centerRect.left + centerRect.width / 2);
    const leftStartX = viewportCenterX - (leftRect.left + leftRect.width / 2);
    const rightStartX =
      viewportCenterX - (rightRect.left + rightRect.width / 2);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 15%",
          end: "+=3100",
          scrub: 2,
          pin: true,
          // once: true,
        },
      });

      // საბურავის შემოსვლა — ცენტრის slide შემოდის და ჩერდება
      // ეკრანის ცენტრში. საბოლოო მდგომარეობა x:0-ს ნაცვლად
      // ჯერ კიდევ centerOffset-ზე ჩერდება, რადგან ეს არის ის
      // მომენტი, სანამ Swiper საერთოდ არ აკონტროლებს პოზიციას.
      tl.fromTo(
        slidesRef.current[1],
        {
          x: -window.innerWidth - centerRect.width,
          rotation: -720,
        },
        {
          x: centerOffset,
          rotation: 0,
          duration: 10,
          ease: "none",
        },
      );

      // ტექსტის დაპატარავება და აწევა
      tl.fromTo(
        textRef.current,
        {
          // scale: 2.5,
          y: 150,
        },
        {
          // scale: 2.5,
          y: 0,
          ease: "none",
          duration: 3,
        },
      );

      // მარცხენა საბურავი — შემოდის და ჩერდება ზუსტად იქ,
      // სადაც Swiper-ი თავად დააყენებდა მას (ანუ x:0,
      // რადგან spaceBetween/centeredSlides უკვე ზრუნავს დაშორებაზე)
      tl.fromTo(
        slidesRef.current[0],
        {
          x: leftStartX,
          visibility: "hidden",
          rotation: -360,
        },
        {
          // -200
          x: 0,
          scale: 1,
          visibility: "visible",
          rotation: 0,
          ease: "none",
          duration: 4,
        },
        // "<",
      );

      // მარჯვენა საბურავი — იგივე პრინციპით, x:0-ზე ჩერდება
      tl.fromTo(
        slidesRef.current[2],
        {
          x: rightStartX,
          rotation: 360,
          visibility: "hidden",
        },
        {
          x: 0,
          rotation: 0,
          visibility: "visible",
          ease: "none",
          duration: 4,
        },
        "<",
      );
      tl.fromTo(
        text2Ref.current,
        {
          y: 50,
          visibility: "hidden",
        },
        {
          y: 0,
          visibility: "visible",
          ease: "none",
          duration: 1,
        },
      );
      // ცენტრის slide-იც საბოლოოდ უნდა დაბრუნდეს x:0-ზე,
      // რომ Swiper-ის ბუნებრივ პოზიციას დაემთხვას handoff-ის დროს
      tl.to(slidesRef.current[1], {
        duration: 2,
      });

      tl.to(slidesRef.current[0], {
        duration: 2,
      });

      tl.to(
        slidesRef.current[2],
        {
          duration: 2,
        },
        "<",
      );

      // tl.fromTo(
      //   greenTyre.current,
      //   {
      //     x: window.innerWidth - centerRect.width,
      //     rotation: -720,
      //   },
      //   {
      //     x: 0,
      //     rotation: 0,
      //     duration: 10,
      //     delay: 10,
      //     ease: "none",
      //   },
      // );
      // handoff Swiper-ზე: keep-scale, გავწმენდოთ transform inline
      // სტილები, რომ Swiper-ის საკუთარმა translate-მა არ დააჯახოს
      // ჯერ კიდევ დარჩენილ GSAP inline x-ს. ეს უსაფრთხო გასუფთავებაა,
      // რადგან x უკვე 0-ზეა დაბრუნებული ყველა slide-ისთვის.
      // tl.call(() => {
      //   gsap.set(slidesRef.current, { clearProps: "transform" });
      //   swiperRef.current.params.allowTouchMove = true;
      //   swiperRef.current.update();
      // });
      // tl.call(() => {
      //   gsap.set(slidesRef.current, {
      //     clearProps: "transform",
      //   });

      //   swiperRef.current.update();
      // });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <>
      <div
        ref={sectionRef}
        className="  m-2 clg:m-5 w-full relative flex flex-col gap-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.3, ease: "linear" }}
          viewport={{ once: false, amount: 0.1 }}
          className="flex flex-col gap-14"
        >
          <div>
            <div className=" scale-110 lg:scale-125 xl:scale-150">
              <h1
                ref={textRef}
                className="font-RacingSans tracking-wider items-center text-center text-8xl mmd:text-9xl  "
              >
                TYRES TYPES
              </h1>
            </div>
            <div className="w-full h-full justify-center flex flex-col gap-10">
              <div className="w-full relative flex flex-row justify-between   ">
                {tyreData.map((card, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <motion.div
                      transition={{
                        duration: 0.6,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      ref={(el) => {
                        if (el) slidesRef.current[index] = el;
                      }}
                    >
                      <img
                        src={card.src}
                        alt=""
                        className=" w-[400px] clg:w-[450px] xxl:w-[480px] "
                      />
                    </motion.div>
                  );
                })}
              </div>
              <div
                ref={text2Ref}
                className="flex font-satosIT font-semibold items-center justify-center text-center w-full"
              >
                <p className=" text-base px-10 xl:px-0 w-full xl:w-3/4  lg:leading-3 clg:leading-8">
                  Pirelli uses a color-coding system to identify the tyre
                  compounds available during a Formula 1 race weekend. The
                  colours
                  <span className="text-gray-400 font-semibold text-base lg:text-lg clg:text-xl px-2">
                    White
                  </span>
                  ,
                  <span className="text-yellow-300 font-semibold text-base lg:text-lg clg:text-xl px-2">
                    Yellow
                  </span>
                  , and
                  <span className="text-red-600 font-semibold text-base lg:text-lg clg:text-xl px-2">
                    Red
                  </span>
                  each represent a compound with different performance
                  characteristics. The
                  <span className="text-red-600 font-semibold text-base lg:text-lg clg:text-xl px-2">
                    Soft
                  </span>
                  compound provides maximum grip and the fastest lap times but
                  wears out quickly, making it ideal for qualifying and short
                  stints. The
                  <span className="text-yellow-300 font-semibold text-base lg:text-lg clg:text-xl px-2">
                    Medium
                  </span>
                  compound offers a balance between performance and durability,
                  making it suitable for a wide range of race conditions. The
                  <span className="text-gray-400 font-semibold text-base lg:text-lg clg:text-xl px-2">
                    Hard
                  </span>
                  compound delivers the greatest durability and is best suited
                  for long stints and high-temperature conditions.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
    // <motion.div
    //   initial={{ opacity: 0, scale: 0.98 }}
    //   whileInView={{ opacity: 1, scale: 1 }}
    //   transition={{ duration: 0.45, ease: "linear" }}
    //   viewport={{ once: false, amount: 0.14 }}
    // >
    //   <div className="w-full h-full  ">
    //     <div className="w-full relative flex justify-center">
    //       <Swiper
    //         onSwiper={(swiper) => {
    //           swiperRef.current = swiper;
    //         }}
    //         loop={false}
    //         centeredSlides={true}
    //         allowTouchMove={false}
    //         slidesPerView={3}
    //         breakpoints={{
    //           320: {
    //             slidesPerView: 1,
    //           },
    //           640: {
    //             slidesPerView: 2,
    //           },
    //           1280: {
    //             slidesPerView: 3,
    //           },
    //         }}
    //         spaceBetween={60}
    //         modules={[Pagination, Navigation, Autoplay]}
    //         autoplay={{
    //           delay: 3000,
    //           disableOnInteraction: false,
    //         }}
    // onSlideChange={(swiper) => {
    //   setActiveIndex(swiper.realIndex);
    //   setactive(tyreData[swiper.realIndex]);
    // }}
    // className="mySwiper w-full"
    // navigation={{
    //   nextEl: ".swiper-button-next-custom",
    //   prevEl: ".swiper-button-prev-custom",
    // }}
    //       >
    // {tyreData.map((card, index) => {
    //   const isActive = index === activeIndex;
    //   return (
    //     <SwiperSlide key={card.title}>
    //       <motion.div
    //         layoutId={`card-${card.title}-${id}`}
    //         //   onClick={() => setactive(card)} cursor-target
    //         animate={{
    //           scale: isActive ? 1.1 : 0.9,
    //           opacity: isActive ? 1 : 0.6,
    //         }}
    //         transition={{
    //           duration: 1.1,
    //           ease: [0.4, 0.0, 0.2, 1],
    //         }}
    //         className="p-4 flex flex-col bg-black/20 h-[440px] mmd:h-[480px] lg:h-[550px]  w-full xxxll:h-[700px] rounded-sm cursor-pointer mx-auto"
    //         // className="p-4 flex flex-col bg-black/20  h-[500px] xxxll:h-[700px] rounded-sm cursor-pointer"
    //       >
    //         <div className="flex gap-4 flex-col h-full w-full">
    //           <motion.div layoutId={`image-${card.title}-${id}`}>
    //             <img
    //               src={card.src}
    //               alt={card.title}
    //               className=" w-[330px] mmd:w-[380px]  lg:w-[450px] h-[350px]  mmd:h-[390px] lg:h-[420px] xl:h-[420px] xl:w-full xxl:h-[480px] mx-auto rounded-lg"
    //               // className=" h-[400px] xl:h-[420px] xxl:h-[480px] xxxll:h-[580px]  w-full rounded-lg"
    //             />
    //           </motion.div>
    //           <div className="flex justify-center items-center flex-col">
    //             <motion.h3
    //               layoutId={`title-${card.title}-${id}`}
    //               className="font-panchangSB text-neutral-200 text-center text-base"
    //             >
    //               {card.title}
    //             </motion.h3>
    //           </div>
    //         </div>
    //       </motion.div>
    //     </SwiperSlide>
    //   );
    // })}
    //       </Swiper>
    //     </div>
    //     {active && (
    //       <motion.div
    //         key={active.title}
    //         //   onClick={() => setactive(card)} cursor-target
    //         // animate={{
    //         //   scale: isActive ? 1.1 : 0.9,
    //         //   opacity: isActive ? 1 : 0.6,
    //         // }}
    //         // transition={{
    //         //   duration: 1.1,
    //         //   ease: [0.4, 0.0, 0.2, 1],
    //         // }}
    //         // className=" m-20 flex items-center justify-center text-center w-full "
    //         // initial={{ opacity: 0, y: 30 }}
    //         // animate={{ opacity: 1, y: 0 }}
    //         // exit={{ opacity: 0, y: 30 }}
    //         // transition={{ duration: 0.5, ease: "easeOut" }}
    //         initial={{ opacity: 0, y: 30 }}
    //         animate={{ opacity: 1, y: -20 }}
    //         exit={{ opacity: 0, y: 30 }}
    //         transition={{ duration: 0.7, ease: "easeOut" }}
    //         className="mt-10  flex items-center justify-center text-center w-full"
    //       >
    //         <h1 className=" text-lg md:text-xl xl:text-2xl h-44 opacity-75 font-satosIT transition-all w-4/4 lg:w-3/4 p-5 xl:p-10   ">
    //           {active.description}
    //         </h1>
    //       </motion.div>
    //     )}
    //   </div>
    // </motion.div>
  );
};
