import React from "react";
import { useFetchData } from "../../../../Hooks/useFetchData";
import { motion } from "framer-motion";
const CarsGridCard = () => {
  const [data, error, isLoading] = useFetchData(
    "https://strategyhub.onrender.com/server/getcars",
  );
  return (
    <div className="flex flex-col gap-5 p-4">
      <h1 className="text-2xl font-panchangMD">Cars Gallery</h1>
      <div className="grid grid-cols-3 gap-[8px] ">
        {data.map((card) => (
          <div
            key={card.id}
            className="rounded-sm border border-[#4a4a4a] bg-[#1d1d1d]    p-5 transition-all duration-500 text-white hover:text-red-600 hover:border-red-800  "
          >
            <div className="h-20 ">
              <h2 className="text-[18px] font-array font-semibold uppercase  line-clamp-2">
                {card.title}
              </h2>

              <p className="text-sm font-satosIT  text-white">
                {card.forai.engine.type}
              </p>

              <p className="text-sm  font-satosIT text-white">
                {card.forai.season} season
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0.1, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "linear" }}
              viewport={{ once: false, amount: 0.45 }}
            >
              <div className="mt-5 flex h-[280px] items-center justify-center  cursor-target hover:scale-95  duration-500 bg-[#2c2c2c]">
                <img
                  src={card.img}
                  alt={card.title}
                  className="max-h-full max-w-full object-contain transition-transform hover:scale-110 duration-700 "
                />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsGridCard;
