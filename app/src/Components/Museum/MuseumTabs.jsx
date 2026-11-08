/* eslint-disable jsx-a11y/img-redundant-alt */
import { Tabs } from "./Tabs";
import { motion } from "framer-motion";
import React, { useEffect, useId, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
const tabs = [
  {
    name: "Ferrari",
    desc: "Ferrari si the historical motorcreator brend, founded in 1929 by Enzo Ferrari. The company is known for its high-performance sports cars and has a rich racing heritage, including numerous victories in Formula One.",
    // content: (
    //   <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
    //     <p>Product Tab</p>
    //     <DummyContent />
    //   </div>
    // ),
  },
  {
    name: "Mercedes",
    desc: "Mercedes Benz is a German luxury automobile manufacturer known for producing high-quality vehicles that combine performance, comfort, and advanced technology. The brand has a long history of innovation and is recognized for its iconic design and engineering excellence.",
  },
];
const MuseumTabs = () => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (tabs && tabs.length > 0) {
      setActive(tabs[0]);
    }
  }, [tabs]);
  return (
    <div className="m-2 flex flex-col gap-2">
      <div className="">
        <Swiper
          rewind={true}
          slidesPerView="auto"
          spaceBetween={10}
          className="mySwiper"
        >
          {" "}
          {tabs.map((card) => (
            <SwiperSlide key={card.name} className="!w-[200px]">
              <motion.div
                layoutId={`card-${card.name}}`}
                onClick={() => setActive(card)}
                className={` p-1 cursor-target flex flex-col text-center bg-gray-500 text-2xl text-white  rounded-sm cursor-pointer transition ${
                  active?.name === card.name ? "" : ""
                }`}
              >
                <h1 className="bg-gray-400 p-2">{card.name}</h1>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className=" w-full h-[600px]  bg-red-400  text-white   mt-0   ">
        {active && (
          <div>
            <h1>{active.name}</h1>
            <h4>{active.desc}</h4>
          </div>
        )}
      </div>
    </div>
  );
};
export default MuseumTabs;
