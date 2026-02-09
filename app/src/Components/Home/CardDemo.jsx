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
import { Pagination, Navigation } from "swiper/modules";
import { useFetchData } from "../../Hooks/useFetchData";
// import ElectricBorder from "../UI/Border/ElectricBorder";

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
      ) : (
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "linear" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="max-w-8xl  p-2 mx-auto">
              <div className="ml-4 z-50  relative top-48 ">
                <button
                  class="cursor-pointer cursor-target  swiper-button-prev-custom  duration-200 hover:scale-125 active:scale-100"
                  title="Go Back"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="70px"
                    height="70px"
                    viewBox="0 0 24 24"
                    class="stroke-blue-300"
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
              {/* Swiper */}
              <div className="">
                <Swiper
                  rewind={true}
                  slidesPerView={4}
                  // pagination={{ clickable: true }}

                  spaceBetween={10}
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
                        className={`p-4 cursor-target flex flex-col h-[400px] rounded-sm cursor-pointer transition ${
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
                            <motion.p
                              layoutId={`description-${card.description}-${id}`}
                              className="text-neutral-400 text-center text-sm font-satosIT"
                            >
                              {card.descr}
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                      {/* </ElectricBorder> */}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="flex justify-end mr-4 relative bottom-72">
                <button
                  class=" swiper-button-next-custom 
         cursor-pointer cursor-target  rotate-180
         z-50 duration-200 hover:scale-125 active:scale-100"
                  title="Go Back"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="70px"
                    height="70px"
                    viewBox="0 0 24 24"
                    class="stroke-blue-300"
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
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "linear" }}
            viewport={{ once: true, amount: 0.4 }}
          >
            {/* Active card info (ქვემოთ) */}
            <div className=" w-full   mt-20   ">
              {active && (
                <motion.div
                  key={active.name}
                  layoutId={`info-${active.name}-${id}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }} // გასწორებულია
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="mt-8 flex gap-6 flex-row mx-auto shadow p-6 rounded-xl"
                >
                  <img
                    src={active.src}
                    alt={active.name}
                    className=" w-2/4 h-full pr-10 object-contain border-r-[1px] border-zinc-800 "
                  />
                  <div className="w-1/2 flex flex-col gap-8 p-10 font-mono font-bold">
                    <div className="flex flex-col md:flex-row justify-between  border-b p-10 border-zinc-700">
                      <div className="flex flex-col gap-6 max-w-[500px] text-left ">
                        <h3 className="text-lg font-panchang  text-gray-400  ">
                          Track Name
                        </h3>
                        <h3 className="text-xl  font-panchang text-neutral-200">
                          {active.name} / {active.country}
                        </h3>
                      </div>
                      <div className="flex flex-col gap-4 relative right-40">
                        <h3 className="text-lg text-gray-400 font-panchang">
                          First race
                        </h3>
                        <h3 className="text-2xl pl-2 font-panchang text-neutral-200">
                          In {active.firstGP}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between border-b p-10 border-zinc-700">
                      <div className="flex flex-col gap-4 text-left ">
                        <h3 className="text-lg text-gray-400 font-panchang  ">
                          Fastest lap time
                        </h3>
                        <h3 className="text-2xl  font-panchang text-neutral-200">
                          {active.fastestlap}
                        </h3>
                        <h3 className="text-sm  text-gray-400 font-satosIT">
                          {active.fastestmn}
                        </h3>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg text-gray-400 font-panchang">
                          Circuit Length
                        </h3>
                        <h3 className="text-5xl font-panchang">
                          {active.lenght}
                        </h3>
                      </div>
                    </div>
                    <h3 className=" font-array text-neutral-400 text-xl mt-2">
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
