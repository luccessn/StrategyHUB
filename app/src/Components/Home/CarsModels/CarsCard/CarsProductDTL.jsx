import React from "react";
import { CarsCalc } from "../CarsCalc";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../../../Hooks/useFetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
export const CarsProductDTL = () => {
  const { carID } = useParams();
  console.log("carID:", carID);
  const [data, error, isLoading] = useFetchData(
    `https://strategyhub.onrender.com/server/getcars?_id=${carID}`,
  );
  if (isLoading) {
    return (
      <div className="flex flex-col gap-10 relative top-32  animate-pulse">
        <div className="flex flex-col xl:flex-row gap-2 ">
          <div className=" w-10/12 h-[650px]     rounded-md shadow  p-2 border-gray-400">
            <div className="flex items-center justify-center h-full   bg-gray-300 rounded ">
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
          <div className=" mx-auto p-14 w-8/12 ">
            <div className="flex flex-col gap-2">
              <div className="h-8  bg-gray-200 rounded-sm dark:bg-gray-400 w-80 "></div>
              <div className="flex flex-col gap-4">
                <div className="w-full flex flex-col gap-1.5 ml-1">
                  {[...Array(8)].map((_, index) => (
                    <div
                      key={index}
                      className="h-4 w-full rounded-sm bg-gray-200 dark:bg-gray-400"
                    ></div>
                  ))}
                </div>
                <div className="w-full flex flex-col gap-1.5 ml-1">
                  {[...Array(9)].map((_, index) => (
                    <div
                      key={index}
                      className="h-4 w-full rounded-sm bg-gray-200 dark:bg-gray-400"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center">
          <div className="flex h-[500px] w-10/12 items-center justify-center">
            <div className="aspect-video h-full w-full shrink-0 rounded-xl bg-neutral-800 p-2 shadow ">
              <div className="flex h-full items-center justify-center rounded bg-gray-300">
                <svg
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-10 w-10 text-gray-200 "
                >
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-4 flex w-10/12 justify-center gap-2">
            {[...Array(3)].map((_, idx) => (
              <button
                key={idx}
                className="h-3 w-3 rounded-full bg-neutral-50 transition-colors"
              />
            ))}
          </div>
        </div>
        <div className=" max-w-8xl p-5  relative ">
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
            spaceBetween={30}
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
    );
  }
  if (error) {
    return <div>Error loading car: {error}</div>;
  }
  if (!data) {
    return <div>Car not found</div>;
  }
  const carWith3D = { ...data };
  console.log("carwitd3d", carWith3D.about);
  return (
    <div className="text-white relative top-24 lg:top-28">
      {/* {carWith3D.src ? (
        <CarsCalc car={carWith3D} />
      ) : (
        <div>3D model not configured for this car.</div>
      )} */}

      {carWith3D.about && <CarsCalc car={data} />}
    </div>
  );
};
