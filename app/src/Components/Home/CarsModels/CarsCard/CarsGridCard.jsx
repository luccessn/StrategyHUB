import React from "react";
import { useFetchData } from "../../../../Hooks/useFetchData";
import { motion } from "framer-motion";
const CarsGridCard = () => {
  const [data, error, isLoading] = useFetchData(
    "https://strategyhub.onrender.com/server/getcars",
  );
  return (
    <>
      <div className="flex flex-col gap-5 p-4">
        <h1 className=" text-xl xl:text-2xl font-panchangMD">Cars Gallery</h1>
        {isLoading || error ? (
          <div>
            <div className="grid grid-cols-2 clg:grid-cols-3  gap-[6px] ">
              {Array.from({ length: 9 }).map((card, index) => (
                <div
                  className={`
                    rounded-sm border border-[#4a4a4a] bg-[#1d1d1d]
                    p-5 transition-all duration-500
                    text-white hover:text-red-600 hover:border-red-800
                    ${index % 3 === 2 ? "col-span-2 clg:col-span-1" : ""}
                  `}
                >
                  <div className="h-20 ">
                    <div className="h-1.5  rounded-full hover:bg-red-600 bg-gray-400 w-52 mb-4"></div>
                    <div className="h-1.5  rounded-full bg-gray-400 w-32 mb-4"></div>
                    <div className="h-1.5 rounded-full bg-gray-400 w-32 mb-4"></div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0.1, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "linear" }}
                    viewport={{ once: false, amount: 0.45 }}
                  >
                    <div className="mt-5 flex h-[280px] items-center justify-center  cursor-target hover:scale-95  duration-500 bg-[#2c2c2c]">
                      <svg
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-10 h-10 text-gray-400"
                      >
                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                      </svg>
                    </div>
                  </motion.div>
                </div>
              ))}
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
          </div>
        ) : (
          <div className="grid grid-cols-2 clg:grid-cols-3  gap-[6px] ">
            {data.map((card, index) => (
              <div
                key={card.id}
                className={`
                    rounded-sm border border-[#4a4a4a] bg-[#1d1d1d]
                    p-5 transition-all duration-500
                    text-white hover:text-red-600 hover:border-red-800
                    ${index % 3 === 2 ? "col-span-2 clg:col-span-1" : ""}
                  `}
              >
                <div className="h-20 ">
                  <h2 className=" text-[18px] clg:text-[15px] xl:text-[18px] font-array font-semibold uppercase  line-clamp-2">
                    {card.title}
                  </h2>

                  <p className=" text-sm clg:text-xs xl:text-sm font-satosIT  text-white">
                    {card.forai.engine.type}
                  </p>

                  <p className=" text-sm clg:text-xs xl:text-sm  font-satosIT text-white">
                    {card.forai.season} season
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0.1, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "linear" }}
                  viewport={{ once: false, amount: 0.45 }}
                >
                  <div
                    className={`
                 mt-5 flex h-[280px] items-center justify-center  cursor-target hover:scale-95  duration-500 bg-[#2c2c2c]
                    ${index % 3 === 2 ? " h-[360px] mmd:h-[380px] clg:h-[280px]" : "h-[280px]"}
                  `}
                  >
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
        )}
      </div>
    </>
  );
};

export default CarsGridCard;
