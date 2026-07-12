import React, {
  useEffect,
  Suspense,
  useId,
  useRef,
  useLayoutEffect,
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
  {
    src: "https://www.pirelli.com/tyres/car/next/motorsport/assets/images?url=https%3A%2F%2Ftyre24.pirelli.com%2Fmotorsport%2Fassets%2Fmotorsport%2Fbanners%2Fpirelli-motorsport-car-Formula1-WetTyres-green-senzaombra.png&w=1920&q=75",
    title: "Intermediate",
    description:
      "The intermediates are the most versatile of the rain tyres. They can be used on a wet track with no standing water, as well as a drying surface. The compound has been designed to have a wide working range, guaranteeing a wide crossover window both with the slicks and the full wets.",
  },
  {
    src: "https://www.pirelli.com/tyres/car/next/motorsport/assets/images?url=https%3A%2F%2Ftyre24.pirelli.com%2Fmotorsport%2Fassets%2Fmotorsport%2Fbanners%2Fpirelli-motorsport-car-Formula1-WetTyres-blue-senzaombra.png&w=1920&q=75",
    title: "Full Wet",
    description:
      "The full wet tyres are the most effective for heavy rain, capable of dispersing impressive quantities of water. But if it rains heavily, visibility rather than grip causes issues, leading to race stoppages on occasions. The profile delivers increased resistance to aquaplaning, which gives the tyre more grip in heavy rain.",
  },
];
// function Loader() {
//   const { progress } = useProgress();
//   return (
//     <Html center>
//       <div style={{ color: "white" }}>{Math.floor(progress)} %</div>
//     </Html>
//   );
// }
// function Model({ url, scale, position, rotation }) {
//   const gltf = useGLTF(url);
//   const { scene, animations } = gltf;
//   const { actions } = useAnimations(animations, scene);

//   useEffect(() => {
//     if (actions) {
//       Object.values(actions).forEach((action) => action.play());
//     }

//     scene.traverse((child) => {
//       if (child.isMesh) {
//         child.castShadow = true;
//         child.receiveShadow = true;

//         if (child.material) {
//           if (child.material.map)
//             child.material.map.colorSpace = THREE.SRGBColorSpace;
//           if (child.material.emissiveMap)
//             child.material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
//           child.material.envMapIntensity = 1.5;
//         }
//       }
//     });
//   }, [actions, scene]);

//   return (
//     <primitive
//       object={scene}
//       scale={scale}
//       position={position}
//       rotation={rotation}
//     />
//   );
// }
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
  // const sectionRef = useRef(null);
  // const swiperRef = useRef(null);
  // useLayoutEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   const slides = gsap.utils.toArray(".swiper-slide");
  //   const ctx = gsap.context(() => {
  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: sectionRef.current,
  //         start: "top top",
  //         end: "+=700",
  //         scrub: 1,
  //         pin: true,
  //         onEnter: () => {
  //           if (swiperRef.current) {
  //             swiperRef.current.allowTouchMove = false;
  //             swiperRef.current.autoplay.stop();
  //           }
  //         },
  //         onLeave: () => {
  //           if (swiperRef.current) {
  //             swiperRef.current.allowTouchMove = true;
  //             swiperRef.current.autoplay.start();
  //           }
  //         },
  //       },
  //     });
  //     // საწყისი მდგომარეობა
  //     tl.set(slides, {
  //       transformOrigin: "center center",
  //     });
  //     // შუა card წინ
  //     tl.to(slides[1], {
  //       scale: 1.25,
  //       zIndex: 10,
  //       y: -50,
  //       duration: 1,
  //     });
  //     // მარცხენა card უკან
  //     tl.to(
  //       slides[0],
  //       {
  //         x: -300,
  //         scale: 0.7,
  //         opacity: 0.3,
  //         duration: 1,
  //       },
  //       "<",
  //     );
  //     // მარჯვენა card უკან
  //     tl.to(
  //       slides[2],
  //       {
  //         x: 300,
  //         scale: 0.7,
  //         opacity: 0.3,
  //         duration: 1,
  //       },
  //       "<",
  //     );
  //   }, sectionRef);
  //   return () => ctx.revert();
  // }, []);
  //// New Gsap for new sight
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const tyresRef = useRef([]);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: "+=3000",
          scrub: 2,
          pin: true,
        },
      });
      // საბურავის შემოსვლა

      tl.fromTo(
        tyresRef.current[1],
        {
          x: () => -window.innerWidth - tyresRef.current[1].offsetWidth,
          scale: 1,
          y: 0,
          rotation: -720,
        },
        { x: 0, y: 0, scale: 1, rotation: 0, ease: "none", duration: 10 },
      );
      // ტექსტის დაპატარავება და აწევა
      tl.fromTo(
        textRef.current,
        {
          scale: 2.5,
          y: 150,
        },
        {
          scale: 1.8,
          y: 0,
          ease: "none",
          duration: 4,
        },
      );
      // მარცხენა საბურავი
      tl.fromTo(
        tyresRef.current[0],
        {
          x: 640,
          visibility: "hidden",
          rotation: -360,
        },
        {
          x: 0,
          scale: 1,
          visibility: "visible",
          rotation: 0,
          ease: "none",
          duration: 6,
        },
      );

      // მარჯვენა საბურავი
      tl.fromTo(
        tyresRef.current[2],
        {
          x: -640,
          rotation: 360,
          visibility: "hidden",
        },
        {
          x: 0,
          rotation: 0,
          visibility: "visible",
          ease: "none",
          duration: 6,
        },
        "<",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <>
      <div ref={sectionRef} className=" w-full relative">
        <h1
          ref={textRef}
          className="font-RacingSans tracking-wider items-center text-center text-8xl "
        >
          TYRES TYPES
        </h1>
        <div className="flex flex-row  ">
          {tyreData.slice(0, 3).map((card, index) => (
            <img
              key={card.title}
              ref={(el) => (tyresRef.current[index] = el)}
              className="w-[450px] items-center justify-center mx-auto"
              src={card.src}
              alt={card.title}
            />
          ))}
        </div>
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
    //         onSlideChange={(swiper) => {
    //           setActiveIndex(swiper.realIndex);
    //           setactive(tyreData[swiper.realIndex]);
    //         }}
    //         className="mySwiper w-full"
    //         navigation={{
    //           nextEl: ".swiper-button-next-custom",
    //           prevEl: ".swiper-button-prev-custom",
    //         }}
    //       >
    //         {tyreData.map((card, index) => {
    //           const isActive = index === activeIndex;
    //           return (
    //             <SwiperSlide key={card.title}>
    //               <motion.div
    //                 layoutId={`card-${card.title}-${id}`}
    //                 //   onClick={() => setactive(card)} cursor-target
    //                 animate={{
    //                   scale: isActive ? 1.1 : 0.9,
    //                   opacity: isActive ? 1 : 0.6,
    //                 }}
    //                 transition={{
    //                   duration: 1.1,
    //                   ease: [0.4, 0.0, 0.2, 1],
    //                 }}
    //                 className="p-4 flex flex-col bg-black/20 h-[440px] mmd:h-[480px] lg:h-[550px]  w-full xxxll:h-[700px] rounded-sm cursor-pointer mx-auto"
    //                 // className="p-4 flex flex-col bg-black/20  h-[500px] xxxll:h-[700px] rounded-sm cursor-pointer"
    //               >
    //                 <div className="flex gap-4 flex-col h-full w-full">
    //                   <motion.div layoutId={`image-${card.title}-${id}`}>
    //                     <img
    //                       src={card.src}
    //                       alt={card.title}
    //                       className=" w-[330px] mmd:w-[380px]  lg:w-[450px] h-[350px]  mmd:h-[390px] lg:h-[420px] xl:h-[420px] xl:w-full xxl:h-[480px] mx-auto rounded-lg"
    //                       // className=" h-[400px] xl:h-[420px] xxl:h-[480px] xxxll:h-[580px]  w-full rounded-lg"
    //                     />
    //                   </motion.div>
    //                   <div className="flex justify-center items-center flex-col">
    //                     <motion.h3
    //                       layoutId={`title-${card.title}-${id}`}
    //                       className="font-panchangSB text-neutral-200 text-center text-base"
    //                     >
    //                       {card.title}
    //                     </motion.h3>
    //                   </div>
    //                 </div>
    //               </motion.div>
    //             </SwiperSlide>
    //           );
    //         })}
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
