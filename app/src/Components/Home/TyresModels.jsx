import React, { useEffect, Suspense, useId } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";

// import { Swiper, SwiperSlide } from "swiper/react";
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
    src: "https://www.pirelli.com/tyres/car/next/motorsport/assets/images?url=https%3A%2F%2Ftyre24.pirelli.com%2Fmotorsport%2Fassets%2Fmotorsport%2Fcarousel%2Fpirelli-motorsport-car-Formula1-SlickTyres-red.png&w=1920&q=75",
    title: "Soft",
    description:
      "The red tyre signifies the soft compound, designed for maximum grip and performance over shorter stints. It offers top lap times but wears out quickly, ideal for qualifying and short races. Typically C5 compounds has red sidewalls, but also C3, C4 and C6 can be used.",
  },
  {
    src: "https://www.pirelli.com/tyres/car/next/motorsport/assets/images?url=https%3A%2F%2Ftyre24.pirelli.com%2Fmotorsport%2Fassets%2Fmotorsport%2Fcarousel%2Fpirelli-motorsport-car-Formula1-SlickTyres-white.png&w=1920&q=75",
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
  {
    src: "https://www.pirelli.com/tyres/car/next/motorsport/assets/images?url=https%3A%2F%2Ftyre24.pirelli.com%2Fmotorsport%2Fassets%2Fmotorsport%2Fcarousel%2Fpirelli-motorsport-car-Formula1-SlickTyres-yellow.png&w=1920&q=75",
    title: "Medium",
    description:
      "The yellow tyre is the medium compound and offers a balance between performance and durability, providing moderate grip and longevity. It is typically used for longer stints than the soft tyre. C2, C3, C4 and C5 are used with yellow sidewalls.",
  },
];
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "white" }}>{Math.floor(progress)} %</div>
    </Html>
  );
}
function Model({ url, scale, position, rotation }) {
  const gltf = useGLTF(url);
  const { scene, animations } = gltf;
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action.play());
    }

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          if (child.material.map)
            child.material.map.colorSpace = THREE.SRGBColorSpace;
          if (child.material.emissiveMap)
            child.material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
          child.material.envMapIntensity = 1.5;
        }
      }
    });
  }, [actions, scene]);

  // 🔹 აქ შევძელით ბრუნვის ამოღება
  // useFrame(() => {
  //   scene.rotation.y += 0.0008;
  // });

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

export const TyresModels = () => {
  console.log(tyreData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [active, setactive] = useState(null);
  useEffect(() => {
    if (tyreData && tyreData.lenght > 0) {
      setactive(tyreData[2]);
    }
  }, [tyreData]);
  const id = useId();
  return (
    <div className="w-full h-full ">
      <div className="w-full relative right-4    mx-auto justify-center items-center ">
        {/* <div className="ml-4 z-50  relative translate-y-96  top-5">
          <button
            className="cursor-pointer cursor-target  swiper-button-prev-custom  duration-200 hover:scale-125 active:scale-100"
            title="Go Back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70px"
              height="70px"
              viewBox="0 0 24 24"
              className="stroke-blue-300"
            >
              <path
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="1.5"
                d="M11 6L5 12M5 12L11 18M5 12H19"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex justify-end mr-4 right-6 z-50 relative translate-y-80 top-6 ">
          <button
            className=" swiper-button-next-custom 
         cursor-pointer cursor-target  rotate-180
         z-50 duration-200 hover:scale-125 active:scale-100"
            title="Go Back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70px"
              height="70px"
              viewBox="0 0 24 24"
              className="stroke-blue-300"
            >
              <path
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="1.5"
                d="M11 6L5 12M5 12L11 18M5 12H19"
              ></path>
            </svg>
          </button>
        </div> */}

        <Swiper
          loop={true}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={60}
          modules={[Pagination, Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
            setactive(tyreData[swiper.realIndex]);
          }}
          className="mySwiper "
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
        >
          {tyreData.map((card, index) => {
            const isActive = index === activeIndex;
            return (
              <SwiperSlide key={card.title}>
                <motion.div
                  layoutId={`card-${card.title}-${id}`}
                  //   onClick={() => setactive(card)} cursor-target
                  animate={{
                    scale: isActive ? 1.1 : 0.9,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  transition={{
                    duration: 1.1,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                  className="p-4 flex flex-col bg-black/20 h-[700px] w-[650px]  rounded-sm cursor-pointer"
                >
                  <div className="flex gap-4 flex-col  w-full">
                    <motion.div layoutId={`image-${card.title}-${id}`}>
                      <img
                        src={card.src}
                        alt={card.title}
                        className=" h-[600px] w-full rounded-lg"
                      />
                    </motion.div>
                    <div className="flex justify-center items-center flex-col">
                      <motion.h3
                        layoutId={`title-${card.title}-${id}`}
                        className="font-panchangSB text-neutral-200 text-center text-base"
                      >
                        {card.title}
                      </motion.h3>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {active && (
        <motion.div
          key={active.title}
          //   onClick={() => setactive(card)} cursor-target
          // animate={{
          //   scale: isActive ? 1.1 : 0.9,
          //   opacity: isActive ? 1 : 0.6,
          // }}
          // transition={{
          //   duration: 1.1,
          //   ease: [0.4, 0.0, 0.2, 1],
          // }}
          // className=" m-20 flex items-center justify-center text-center w-full "
          // initial={{ opacity: 0, y: 30 }}
          // animate={{ opacity: 1, y: 0 }}
          // exit={{ opacity: 0, y: 30 }}
          // transition={{ duration: 0.5, ease: "easeOut" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: -20 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="m-16 flex items-center justify-center text-center w-full"
        >
          <h1 className="text-2xl opacity-75 transition-all w-3/4 p-10   ">
            {active.description}
          </h1>
        </motion.div>
      )}
    </div>
  );
};

{
  /* <img src={soft} alt="" className="w-[300px]" />; */
}
// <div className="flex mx-auto h-[600px] justify-center gap-10 flex-row w-full">
//   <div className=" w-4/12 flex h-full  ">
//     <div className="w-full h-full">
//       <motion.div className="flex h-full flex-col cursor-pointer bg-cover bg-center bg-no-repeat p-0">
//         <div className="flex flex-col w-full h-full">
//           <div className="w-full h-full ">
//             <Canvas
//               key="F1Tyres"
//               shadows
//               dpr={[1, 2]}
//               gl={{
//                 antialias: true,
//                 physicallyCorrectLights: true,
//                 outputColorSpace: THREE.SRGBColorSpace,
//                 toneMappingExposure: 1,
//               }}
//               camera={{ position: [-5, 10, 0], fov: 45 }}
//             >
//               <Suspense fallback={<Loader />}>
//                 <Model
//                   url={bgtTyre}
//                   scale={[1.7, 1.6, 1.6]}
//                   position={[0, 0, -0.5]}
//                   rotation={[0.5, 0, 1.9]}
//                 />
//                 <ambientLight intensity={0.3} />
//                 <directionalLight
//                   castShadow
//                   position={[5, 10, 5]}
//                   intensity={1.2}
//                   shadow-mapSize-width={2048}
//                   shadow-mapSize-height={2048}
//                 />
//                 <spotLight
//                   castShadow
//                   position={[-5, 8, -5]}
//                   intensity={0.8}
//                   angle={0.3}
//                 />
//                 <Environment preset="sunset" background={false} />
//               </Suspense>
//               <OrbitControls
//                 target={[0, -0.6, 0]}
//                 enableRotate={false}
//                 enableZoom={false}
//                 enablePan={false}
//               />
//             </Canvas>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   </div>
//   <div className=" w-3/4 flex h-full  ">
//     <div className="w-full h-full">
//       <motion.div className="flex h-full flex-col cursor-pointer bg-cover bg-center bg-no-repeat p-0">
//         <div className="flex flex-col w-full h-full">
//           <div className="flex flex-col pl-5 gap-2">
//             <h1 className="font-panchangMD text-2xl tracking-wide">
//               F1 Tyres
//             </h1>
//           </div>

//           <div className="w-full h-full ">
//             <Canvas
//               key="F1Tyres"
//               shadows
//               dpr={[1, 2]}
//               gl={{
//                 antialias: true,
//                 physicallyCorrectLights: true,
//                 outputColorSpace: THREE.SRGBColorSpace,
//                 toneMappingExposure: 1,
//               }}
//               camera={{ position: [-5, 10, 0], fov: 45 }}
//             >
//               <Suspense fallback={<Loader />}>
//                 <Model
//                   url={f1tyres}
//                   scale={[4.1, 3.9, 3.9]}
//                   position={[0, 3.5, -3.1]}
//                   rotation={[0, 0, 40]}
//                 />
//                 <ambientLight intensity={0.3} />
//                 <directionalLight
//                   castShadow
//                   position={[5, 10, 5]}
//                   intensity={1.2}
//                   shadow-mapSize-width={2048}
//                   shadow-mapSize-height={2048}
//                 />
//                 <spotLight
//                   castShadow
//                   position={[-5, 8, -5]}
//                   intensity={0.8}
//                   angle={0.3}
//                 />
//                 <Environment preset="sunset" background={false} />
//               </Suspense>
//               <OrbitControls
//                 target={[0, -0.6, 0]}
//                 enableRotate={false}
//                 enableZoom={false}
//                 enablePan={false}
//               />
//             </Canvas>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   </div>
//   <div className=" w-5/12 flex h-full  ">
//     <div className="w-full h-full">
//       <motion.div className="flex h-full flex-col cursor-pointer bg-cover bg-center bg-no-repeat p-0">
//         <div className="flex flex-col w-full h-full">
//           <div className="w-full h-full ">
//             <Canvas
//               key="F1Tyres"
//               shadows
//               dpr={[1, 2]}
//               gl={{
//                 antialias: true,
//                 physicallyCorrectLights: true,
//                 outputColorSpace: THREE.SRGBColorSpace,
//                 toneMappingExposure: 1,
//               }}
//               camera={{ position: [-5, 10, 0], fov: 45 }}
//             >
//               <Suspense fallback={<Loader />}>
//                 <Model
//                   url={interTyre}
//                   scale={[4.1, 3.9, 3.9]}
//                   position={[0, 2, -3.7]}
//                   rotation={[-0.5, 0, 1.9]}
//                 />
//                 <ambientLight intensity={0.3} />
//                 <directionalLight
//                   castShadow
//                   position={[5, 10, 5]}
//                   intensity={1.2}
//                   shadow-mapSize-width={2048}
//                   shadow-mapSize-height={2048}
//                 />
//                 <spotLight
//                   castShadow
//                   position={[-5, 8, -5]}
//                   intensity={0.8}
//                   angle={0.3}
//                 />
//                 <Environment preset="sunset" background={false} />
//               </Suspense>
//               <OrbitControls
//                 target={[0, -0.6, 0]}
//                 enableRotate={false}
//                 enableZoom={false}
//                 enablePan={false}
//               />
//             </Canvas>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   </div>
// </div>
