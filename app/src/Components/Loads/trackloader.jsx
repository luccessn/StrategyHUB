import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const trackloader = () => {
  return (
    <div className="p-14 flex flex-col gap-5">
      <div className=" pl-20 ">
        <Swiper
          rewind={true}
          slidesPerView={4}
          spaceBetween={10}
          modules={[Pagination]}
          className="mySwiper"
        >
          {[...Array(4)].map((_, index) => (
            <SwiperSlide key={index}>
              <div className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-400">
                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-400">
                  <svg
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  >
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                  </svg>
                </div>

                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>

                <span className="sr-only">Loading...</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex flex-row">
        <div className="w-2/4 h-[500px] p-4 border-r-4 border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-400">
          <div className="flex items-center justify-center h-full  mb-4 bg-gray-300 rounded dark:bg-gray-400">
            <svg
              viewBox="0 0 16 20"
              fill="currentColor"
              aria-hidden="true"
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>
        </div>
        <div className="p-14">
          <div className="flex flex-col gap-40">
            <div className="flex flex-row  gap-32">
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded-sm dark:bg-gray-400 w-60 mb-4"></div>
              </div>
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded-sm dark:bg-gray-400 w-60 mb-4"></div>
              </div>
            </div>
            <div className="flex flex-row  gap-32">
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded-sm dark:bg-gray-400 w-60 mb-4"></div>
              </div>
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded-sm dark:bg-gray-400 w-60 mb-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default trackloader;
