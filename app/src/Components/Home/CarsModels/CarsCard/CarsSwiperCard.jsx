import React from "react";
import { useFetchData } from "../../../../Hooks/useFetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export const CarsSwiperCard = () => {
  const [data, error, isLoading] = useFetchData(
    "http://localhost:5000/server/getcars",
  );
  const navigate = useNavigate();
  const goDTL = (carId) => {
    navigate(`/carsdtl/${carId}`);
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <h1 className=" text-xl xl:text-2xl font-panchangMD pl-3">Other Cars</h1>
      <div className="w-full h-[500px] p-5  ">
        <Swiper
          //   spaceBetween={30}
          modules={[Autoplay]}
          className="mySwiper"
          autoplay={{
            delay: 1800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            800: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1150: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1580: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {data.map((props, index) => (
            <SwiperSlide key={props._id}>
              {/* <div className="relative left-40 bg-blue-500  ssmm:left-0">
                <img src={props.image} alt={props._id} />
                <h1>{props.title}</h1>
              </div> */}
              <div
                onClick={() => goDTL(props._id)}
                key={props.id}
                className={`
                    rounded-sm  bg-[#050505]  border-2 border-white/15
                    p-5 transition-all duration-500
                    text-white hover:text-red-600 hover:border-red-800
                    ${index % 3 === 2 ? "col-span-2 clg:col-span-1" : ""}
                  `}
              >
                <div className=" ">
                  <h2 className=" text-[18px] clg:text-[15px] xl:text-[18px] font-array font-semibold uppercase  line-clamp-2">
                    {props.title}
                  </h2>
                </div>
                <motion.div
                  initial={{ opacity: 0.1, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "linear" }}
                  viewport={{ once: false, amount: 0.45 }}
                >
                  <div
                    className={`
                 mt-5 flex h-[280px] items-center justify-center  cursor-target hover:scale-95  duration-500 bg-[#161616]
                  `}
                  >
                    <img
                      src={props.img}
                      alt={props.title}
                      className="max-h-full max-w-full object-contain transition-transform hover:scale-110 duration-700 "
                    />
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
