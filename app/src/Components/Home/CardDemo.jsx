/* eslint-disable react/jsx-no-target-blank */
"use client";

import React, { useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "../Loads/load.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Trackloader from "../Loads/trackloader";
// import required modules
import { Pagination, Navigation, Mousewheel } from "swiper/modules";
import { useFetchData } from "../../Hooks/useFetchData";
// import ElectricBorder from "../UI/Border/ElectricBorder";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
export function ExpandableCardDemo() {
  const [data, error, isLoading] = useFetchData(
    "https://strategyhub.onrender.com/server/gettracks",
    // "http://localhost:5000/server/gettracks",
    // "https://strategyhub.onrender.com/server/gettracks",
  );
  console.log(data);
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setActive(data[0]); // პირველი ელემენტი
    }
  }, [data]);

  const id = useId();

  return (
    <>
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "linear" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div>
            <Trackloader />

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
              <div className="flex items-center justify-center gap-6">
                <div className="load">
                  <svg viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="32" />
                  </svg>
                </div>

                <div className="load triangle">
                  <svg viewBox="0 0 86 80">
                    <polygon points="43 8 79 72 7 72" />
                  </svg>
                </div>

                <div className="load">
                  <svg viewBox="0 0 80 80">
                    <rect x="8" y="8" width="64" height="64" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="">
          <motion.div
            initial={{ opacity: 0.1, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: "linear" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="max-w-8xl p-5 mx-auto relative">
              {/* <button
                  class="cursor-pointer cursor-target swiper-button-prev-custom    duration-200 hover:scale-125 active:scale-100"
                  title="Go Back"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="70px"
                    height="70px"
                    viewBox="0 0 24 24"
                    class="stroke-blue-300 hover:stroke-red-400"
                  >
                    <path
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke-width="1.5"
                      d="M11 6L5 12M5 12L11 18M5 12H19"
                    ></path>
                  </svg>
                </button> */}
              <button className="absolute left-5 top-1/2 -translate-y-1/2 z-30  swiper-button-prev-custom cursor-pointer duration-200 hover:scale-125 active:scale-100">
                {/* <ArrowBackIosIcon /> */}
                <div className="relative w-[25px] h-[35px] lg:w-[30px] lg:h-[40px] rotate-180">
                  <div className="absolute top-1/2 left-[-5px] w-full h-[4px] bg-white rotate-45 origin-bottom-right transition-colors duration-300 group-hover:bg-red-500">
                    <span className="absolute top-0 left-full w-0 h-full bg-red-500 transition-all duration-150 group-hover:left-0 group-hover:w-full"></span>
                  </div>

                  <div className="absolute top-1/2 left-[-5px] w-full h-[4px] bg-white -rotate-45 origin-top-right transition-colors duration-300 group-hover:bg-red-500">
                    <span className="absolute top-0 right-full w-0 h-full bg-red-500 transition-all duration-150 delay-150 group-hover:right-0 group-hover:w-full"></span>
                  </div>
                </div>
              </button>
              {/* Swiper */}
              <div className="">
                <Swiper
                  rewind={true}
                  slidesPerView={1}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                    },
                    800: {
                      slidesPerView: 2,
                    },
                    1080: {
                      slidesPerView: 3,
                    },
                    1280: {
                      slidesPerView: 4,
                    },
                  }}
                  // pagination={{ clickable: true }}

                  spaceBetween={10}
                  // mousewheel={true}
                  modules={[Pagination, Navigation]}
                  navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                  }}
                  className="mySwiper"
                >
                  {data.map((card) => (
                    <SwiperSlide key={card.name}>
                      {/* <ElectricBorder
                color="#7df9ff"
                speed={0.3}
                chaos={0.5}
                thickness={2}
                style={{ borderRadius: 10 }}
              > */}
                      {/* <ElectricBorder
                color="#7df9ff"
                speed={1}
                chaos={0.5}
                thickness={2}
                style={{ borderRadius: 16 }}
              > */}
                      <motion.div
                        layoutId={`card-${card.name}-${id}`}
                        onClick={() => setActive(card)}
                        className={`p-4 cursor-target flex flex-col h-[350px]  rounded-sm cursor-pointer transition ${
                          active?.name === card.name ? "" : ""
                        }`}
                      >
                        <div className="flex gap-4 flex-col w-full">
                          <motion.div layoutId={`image-${card.name}-${id}`}>
                            <img
                              src={card.src}
                              alt={card.name}
                              className="h-60 w-full rounded-lg object-contain"
                            />
                          </motion.div>
                          <div className="flex justify-center items-center flex-col">
                            <motion.h3
                              layoutId={`title-${card.name}-${id}`}
                              className="font-panchangSB text-neutral-200 text-center text-base"
                            >
                              {card.name}
                            </motion.h3>
                            {/* <motion.p
                              layoutId={`description-${card.description}-${id}`}
                              className="text-neutral-400 text-center text-sm font-satosIT"
                            >
                              {card.descr}
                            </motion.p> */}
                          </div>
                        </div>
                      </motion.div>
                      {/* </ElectricBorder> */}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              {/* <button
                  class=" swiper-button-next-custom 
         cursor-pointer cursor-target  rotate-180 
         z-50 duration-200 hover:scale-125 active:scale-100"
                  title="Go Back"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="69px"
                    height="65px"
                    viewBox="0 0 24 24"
                    className="stroke-white hover:stroke-red-500 duration-300"
                  >
                    <path
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke-width="1.5"
                      d="M11 6L5 12M5 12L11 18M5 12H19"
                    ></path>
                  </svg>
                </button> */}
              <div>
                <button className="absolute right-5 top-1/2 -translate-y-1/2 z-30 swiper-button-next-custom cursor-pointer duration-200 hover:scale-125 active:scale-100">
                  <div className="relative w-[25px] h-[35px] lg:w-[30px] lg:h-[40px] ">
                    <div className="absolute top-1/2 left-[-5px] w-full h-[4px] bg-white rotate-45 origin-bottom-right transition-colors duration-300 group-hover:bg-red-500">
                      <span className="absolute top-0 left-full w-0 h-full bg-red-500 transition-all duration-150 group-hover:left-0 group-hover:w-full"></span>
                    </div>

                    <div className="absolute top-1/2 left-[-5px] w-full h-[4px] bg-white -rotate-45 origin-top-right transition-colors duration-300 group-hover:bg-red-500">
                      <span className="absolute top-0 right-full w-0 h-full bg-red-500 transition-all duration-150 delay-150 group-hover:right-0 group-hover:w-full"></span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "linear" }}
            viewport={{ once: false, amount: 0.1 }}
          >
            <div className=" w-full   mt-0   ">
              {active && (
                <motion.div
                  key={active.name}
                  layoutId={`info-${active.name}-${id}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="mt-8 flex gap-2 xl:gap-6  flex-col xl:flex-row mx-auto shadow p-8 xl:p-6 rounded-xl"
                >
                  <div className="w-full block xl:hidden  border-b-[3px] xl:border-b-0 h-full  rounded-2xl  border-zinc-700 ">
                    <h3 className="text-xl  font-panchangMD text-neutral-200 block xl:hidden">
                      {active.name} / {active.country}
                    </h3>
                    <img
                      src={active.src}
                      alt={active.name}
                      className=" w-4/4 p-8  h-full  mx-auto  object-contain  "
                    />
                  </div>
                  <img
                    src={active.src}
                    alt={active.name}
                    className=" w-2/4 hidden xl:block  pr-10 object-contain border-r-[2px] border-zinc-700 "
                  />
                  <div className=" w-full xl:w-1/2 flex flex-col gap-8 p-2 xxxl:p-5 font-mono font-bold">
                    <div className="flex flex-col md:flex-row justify-between gap-6 xxl:gap-10  border-b-[3px] p-10 rounded-2xl xl:rounded-none border-zinc-700">
                      <div className="flex  flex-col gap-6 max-w-[400px] mmd:max-w-[600px] xl:max-w-[400px] text-left ">
                        <h3 className="text-lg xl:text-base xxl:text-lg font-panchang  text-gray-400  ">
                          Track Name
                        </h3>
                        <h3 className=" text-xl mmd:text-2xl xl:text-lg xxl:text-xl p-2  font-panchang text-neutral-200">
                          {active.name} / {active.country}
                        </h3>
                      </div>
                      <div className="flex flex-col gap-4 w-[300px] relative -right-24 mmd:right-0">
                        <h3 className=" text-lg xl:text-base xxl:text-lg text-gray-400 font-panchang">
                          First race
                        </h3>
                        <h3 className=" text-xl mmd:text-2xl xl:text-xl p-2 xxl:text-2xl pl-2 font-panchang text-neutral-200">
                          In {active.firstGP}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between gap-2 xxl:gap-10 border-b-[3px] p-10 rounded-2xl xl:rounded-none border-zinc-700">
                      <div className="flex flex-col gap-4 max-w-[300px] mmd:max-w-[400px] xl:max-w-[300px] text-left ">
                        <h3 className=" text-lg xl:text-base xxl:text-lg text-gray-400 font-panchang  ">
                          Fastest lap time
                        </h3>
                        <h3 className=" text-xl mmd:text-3xl xl:text-xl xxl:text-2xl p-2  font-panchang text-neutral-200">
                          {active.fastestlap}
                        </h3>
                        <h3 className=" text-sm mmd:text-base xl:text-sm p-2 text-gray-400 font-satosIT">
                          {active.fastestmn}
                        </h3>
                      </div>
                      <div className="flex  relative -right-5 flex-col gap-2">
                        <h3 className=" text-lg xl:text-base xxl:text-lg text-gray-400 font-panchang">
                          Circuit Length
                        </h3>
                        <h3 className=" text-3xl mmd:text-5xl xl:text-3xl p-2 xxl:text-5xl font-panchang">
                          {active.lenght}
                        </h3>
                      </div>
                    </div>
                    <h3 className=" font-array text-neutral-400 text-base mmd:text-xl xl:text-base xxl:text-xl mt-2">
                      {active.descr}
                    </h3>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
