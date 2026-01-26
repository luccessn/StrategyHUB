import { Swiper, SwiperSlide } from "swiper/react";
import { ShoppingBasket } from "lucide-react";
import "./button.css";

import "swiper/css";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import React, { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { motion } from "framer-motion";
import MainDTLCard from "./MainDTLCard";
// import { useAppContext } from "../../Context/AppContextReducer";
import {
  addToCart,
  CounterDecrement,
  CounterIncriment,
  CounterReset,
} from "../../Context/AppActionsCreator";
import SuccessToaster from "../Loads/Toaster/SuccessToaster";
import { useNavigate } from "react-router-dom";
import { ErrorLoader } from "../Loads/error/ErrorLoader";
import { useAppContext } from "../../Context/AppContextProvider";
// import { routes } from "../../Constants/ConstRouts/routes";
const MainDTLCards = ({ data }) => {
  const [imgsChange, setImgsChange] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  //
  const { state, dispatch } = useAppContext();
  // const { state, dispatch } = useAppContext();
  //error
  const hasError = !data?.name;

  // დაყენება images[0] სურათზე
  useEffect(() => {
    if (data && data.images?.img1) {
      setImgsChange(data.images.img1);
    }
  }, [data]);
  // ზომების გამოტანა უნიკალურად variants-დან
  useEffect(() => {
    if (data && data.variants) {
      const uniqueSizes = Array.from(new Set(data.variants.map((v) => v.size)));

      const uniqueColorsMap = new Map();
      data.variants.forEach((v) => {
        if (!uniqueColorsMap.has(v.color_code)) {
          uniqueColorsMap.set(v.color_code, {
            color_code: v.color_code,
            color: v.color,
          });
        }
      });

      const uniqueColors = Array.from(uniqueColorsMap.values());
      setAvailableSizes(uniqueSizes);
      setAvailableColors(uniqueColors);

      if (uniqueColors.length > 0) setSelectedColor(uniqueColors[0]);
      if (uniqueSizes.length > 0) setSelectedSize(uniqueSizes[0]);
    }
  }, [data]);

  const getPriceBySize = (size) => {
    const variant = data.variants.find((v) => v.size === size);
    return variant ? variant.retail_price : parseFloat(data.price);
  };
  const getVariantBySizeAndColor = (size, color_code) => {
    return data.variants.find(
      (v) => v.size === size && v.color_code === color_code,
    );
  };

  const [showToaster, setShowToaster] = useState(false);
  const AddToCart = () => {
    if (!selectedSize || !selectedColor) {
      return alert("აირჩიე ზომა და ფერი!");
    }

    const variant = getVariantBySizeAndColor(
      selectedSize,
      selectedColor.color_code,
    );

    if (!variant) return alert("ვარიანტი ვერ მოიძებნა");
    // const itemToAdd = {
    //   id: `${data._id}-${selectedSize}-${selectedColor.color_code}`,
    //   sync_variant_id: variant.sync_variant_id,
    //   variantId: variant.variant_id,
    //   printfulProductId: data.printfulProductId,
    //   name: data.name,
    //   image: data.images?.img1,
    //   price: variant.retail_price,
    //   color: selectedColor.color,
    //   size: selectedSize,
    //   quantity: state.counter,
    //   stock: data.stock,
    // };
    // dispatch(addToCart(itemToAdd));
    // ტოსტერი გამოჩნდეს
    setShowToaster(true);
    setTimeout(() => setShowToaster(false), 3000);
  };

  // useEffect(() => {
  //   dispatch(CounterReset());
  // }, [data]);
  const navigate = useNavigate();
  console.log(data);

  return (
    <motion.div
      className="text-5xl p-6 text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="text-5xl p-6 text-white flex  flex-col gap-20 items-center ">
        <div className="text-white p-6   items-center text-5xl">
          <div className="flex flex-col   mmd:flex-row gap-14">
            {/* სურათების Swiper */}
            <div className="flex flex-col items-center ssm:items-start ssm:flex-row  ssmm:p-0 gap-5 ssmm:gap-14">
              <div className="flex flex-col gap-5 hidden ssm:flex ssmm:w-[100px] ssm:w-[250px] sm:w-[200px] h-[600px] mmd:h-[700px]">
                <Swiper
                  navigation={true}
                  pagination={true}
                  spaceBetween={50}
                  slidesPerView={3}
                  direction={"vertical"}
                  modules={[Navigation, Pagination, Autoplay]}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                >
                  {Object.values(data.images || {}).map((img, index) => (
                    <SwiperSlide key={index}>
                      <div className="w-full cursor-target h-[150px] sm:h-[200px] relative">
                        {isLoading && index === 0 && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="loader border-4 border-purple-800 border-t-transparent rounded-full w-10 h-10 animate-spin"></span>
                          </div>
                        )}
                        <img
                          src={img}
                          alt=""
                          className={`w-full h-[150px] sm:h-[200px] object-cover rounded cursor-pointer ${
                            isLoading && index === 0 ? "invisible" : "visible"
                          }`}
                          onClick={() => setImgsChange(img)}
                          onLoad={() => index === 0 && setIsLoading(false)}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* მთავარი დიდი სურათი */}
              {imgsChange && (
                <div className="relative">
                  <Zoom>
                    <img
                      src={imgsChange}
                      alt=""
                      className=" cursor-target  w-[350px] h-[350px]  ssmm:w-[300px]  ssmm:h-[400px] ssm:w-[400px]  ssm:h-[400px] sm:w-[500px] sm:h-[500px] object-cover rounded-lg cursor-zoom-in"
                    />
                  </Zoom>
                </div>
              )}
              <div className="flex flex-col  ssm:hidden w-[300px] xsxm:w-[350px] ssmm:w-[400px]  mt-5">
                <Swiper
                  navigation={true}
                  pagination={true}
                  spaceBetween={30}
                  direction={"horizontal"}
                  modules={[Navigation, Pagination, Autoplay]}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 2,
                    },
                    410: {
                      slidesPerView: 3,
                    },
                  }}
                >
                  {Object.values(data.images || {}).map((img, index) => (
                    <SwiperSlide key={index}>
                      <div className=" w-3/4 left-7 ssmm:left-0 ssmm:w-full h-[140px] ssmm:h-[170px] relative">
                        {isLoading && index === 0 && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="loader border-4 border-purple-800 border-t-transparent rounded-full w-10 h-10 animate-spin"></span>
                          </div>
                        )}
                        <img
                          src={img}
                          alt=""
                          className={`w-full h-[120px] object-cover rounded cursor-pointer ${
                            isLoading && index === 0 ? "invisible" : "visible"
                          }`}
                          onClick={() => setImgsChange(img)}
                          onLoad={() => index === 0 && setIsLoading(false)}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            {/* მარჯვენა მხარე: ინფორმაცია, ფასი, ზომები */}
            {hasError ? (
              <ErrorLoader error="Product data is missing or corrupted" />
            ) : (
              <div className="  p-10 ssmm:p-0  mmd:top-0  w-[400px] flex flex-col gap-8 font-serif">
                <h1 className=" text-3xl ssm:text-5xl">{data.name}</h1>

                <div className="flex flex-row gap-4 items-center">
                  <h1 className="text-2xl ssm:text-3xl font-semibold text-green-500">
                    {selectedSize
                      ? `${getPriceBySize(selectedSize)} $`
                      : `${data.price} $`}
                  </h1>
                  {/* {data.orgprice && (
                  <h1 className="text-2xl line-through font-bold text-red-600">
                    {data.orgprice}
                  </h1>
                )} */}
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className=" text-xl ssm:text-2xl">
                    Stock : {data.stock}
                  </h1>
                  <p className=" text-sm ssm:text-medium text-zinc-400 pl-2">
                    This design is limited... Take a chance and become one of
                    their owners.
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h1 className=" text-medium ssm:text-xl">
                      Color: {selectedColor ? selectedColor.color : "None"}
                    </h1>
                    <div className="flex flex-row gap-5">
                      {availableColors.map((colorObj, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColor(colorObj)}
                          className={` rounded w-[20px] h-[20px] ssm:w-[30px] ssm:h-[30px]  outline-none cursor-pointer ${
                            selectedColor?.color_code === colorObj.color_code
                              ? "border-2 border-white"
                              : "border border-[#999]"
                          }`}
                          style={{ backgroundColor: colorObj.color_code }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-0 ssm:gap-5">
                    <h1 className="text-gray-300 text-medium ssm:text-xl">
                      Choose your type :
                    </h1>
                    {/* <div className="grid grid-cols-4 gap-4 gap-x-10">
                      {availableSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`text-medium w-20  h-14 rounded ${
                            selectedSize === size
                              ? "bg-gray-200 text-black"
                              : "bg-black text-white border border-gray-500"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div> */}
                    <div className="w-64">
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-full  h-10 ssm:h-14 text-medium rounded bg-black text-white border border-gray-500 px-4"
                      >
                        <option value="" disabled>
                          Choose
                        </option>
                        {availableSizes.map((size) => (
                          <option
                            key={size}
                            value={size}
                            className="text-white"
                          >
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <h1 className=" text-medium ssm:text-xl">Quantity</h1>
                    <div className="text-medium ssm:text-xl flex flex-row items-center gap-3 relative left-10">
                      <button
                        onClick={() => dispatch(CounterDecrement(1))}
                        className={`px-3 py-1 rounded ${
                          state.counter === 1 ? "text-gray-600" : "text-white"
                        }`}
                      >
                        -
                      </button>
                      <h1 className=" text-3xl ssm:text-4xl">
                        {state.counter}
                      </h1>
                      <button
                        onClick={() => {
                          if (state.counter < data.stock)
                            dispatch(CounterIncriment(1));
                        }}
                        className={`px-3 py-1 rounded ${
                          state.counter >= data.stock
                            ? "text-gray-600 cursor-not-allowed"
                            : "text-white"
                        }`}
                        disabled={state.counter >= data.stock}
                      >
                        +
                      </button>
                    </div>

                    <div className="flex flex-col gap-10 items-center justify-between mt-6">
                      {/* <button
                        onClick={() => {
                          AddToCart();
                          navigate(routes.checkout);
                        }}
                        disabled={data.stock === 0}
                        className={`transition px-6 py-3 w-full rounded-lg text-white text-xl ${
                          data.stock === 0
                            ? "bg-gray-500 opacity-50 cursor-not-allowed"
                            : "bg-rose-800 hover:bg-rose-950"
                        }`}
                      >
                        {data.stock === 0 ? "Sold Out" : "Pay Now"}
                      </button>
                      <button
                        onClick={AddToCart}
                        disabled={data.stock === 0}
                        className={`transition px-6 py-3 w-full rounded-lg text-white text-xl ${
                          data.stock === 0
                            ? "bg-gray-500 opacity-50 cursor-not-allowed"
                            : "bg-purple-700 hover:bg-purple-800"
                        }`}
                      >
                        {data.stock === 0 ? "Sold Out" : "Add to Cart"}
                      </button> */}
                      <div className="flex flex-row  ssm:flex-row gap-10 relative w-full ssm:w-[500px]  sfm:left-28 sfm:w-[600px] ">
                        <button
                          onClick={() => {
                            if (Number(data.stock) === 0) return;

                            AddToCart();
                            // navigate(routes.checkout);
                          }}
                          disabled={Number(data.stock) === 0}
                          className={` rounded-lg cursor-target  text-white text-medium ssm:text-xl  ${
                            data.stock === "0"
                              ? "bg-gray-500 p-2 opacity-50 cursor-not-allowed flex flex-row  gap-2"
                              : "bg-rose-800 hover:bg-rose-950  pay-btn"
                          }`}
                        >
                          <span className="btn-text text-sm hidden ssm:block ssm:text-medium  flex items-center gap-2">
                            {data.stock === "0" ? (
                              "Sold Out"
                            ) : (
                              <>
                                Pay Now ({" "}
                                {selectedSize
                                  ? `${
                                      state.counter *
                                      getPriceBySize(selectedSize)
                                    } $`
                                  : `${data.price} $`}{" "}
                                )
                              </>
                            )}
                          </span>
                          <span className="btn-text text-sm block ssm:hidden ssm:text-medium  flex items-center gap-2">
                            {data.stock === "0" ? (
                              "Sold Out"
                            ) : (
                              <>
                                Pay ({" "}
                                {selectedSize
                                  ? `${
                                      state.counter *
                                      getPriceBySize(selectedSize)
                                    } $`
                                  : `${data.price} $`}{" "}
                                )
                              </>
                            )}
                          </span>
                          <div className="icon-container">
                            <svg viewBox="0 0 24 24" className="icon card-icon">
                              <path
                                d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18C2,19.11 2.89,20 4,20H20C21.11,20 22,19.11 22,18V6C22,4.89 21.11,4 20,4Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                            <svg
                              viewBox="0 0 24 24"
                              className="icon payment-icon"
                            >
                              <path
                                d="M2,17H22V21H2V17M6.25,7H9V6H6V3H18V6H15V7H17.75L19,17H5L6.25,7M9,10H15V8H9V10M9,13H15V11H9V13Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                            <svg
                              viewBox="0 0 24 24"
                              className="icon dollar-icon"
                            >
                              <path
                                d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                                fill="currentColor"
                              ></path>
                            </svg>

                            <svg
                              viewBox="0 0 24 24"
                              className="icon wallet-icon default-icon"
                            >
                              <path
                                d="M21,18V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V6H12C10.89,6 10,6.9 10,8V16A2,2 0 0,0 12,18M12,16H22V8H12M16,13.5A1.5,1.5 0 0,1 14.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,12A1.5,1.5 0 0,1 16,13.5Z"
                                fill="currentColor"
                              ></path>
                            </svg>

                            <svg
                              viewBox="0 0 24 24"
                              className="icon check-icon"
                            >
                              <path
                                d="M9,16.17L4.83,12L3.41,13.41L9,19L21,7L19.59,5.59L9,16.17Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                        </button>
                        {data.stock === "0" ? null : (
                          <button
                            onClick={AddToCart}
                            disabled={data.stock === 0}
                            className={` transition cursor-target  rounded-lg text-white text-medium ssm:text-xl  ${
                              data.stock === "0"
                                ? "bg-gray-500 p-2 opacity-50 cursor-not-allowed"
                                : "bg-purple-700 hover:bg-purple-950 pay-btn"
                            }`}
                          >
                            <span className="btn-text flex text-sm ssm:text-medium  items-center gap-2">
                              {data.stock === "0" ? (
                                "გაყიდულია"
                              ) : (
                                <>
                                  <ShoppingBasket className=" hidden ssm:block w-5 h-5" />
                                  Add ({" "}
                                  {selectedSize
                                    ? `${
                                        state.counter *
                                        getPriceBySize(selectedSize)
                                      } $`
                                    : `${data.price} $`}{" "}
                                  )
                                </>
                              )}
                            </span>

                            <div className="icon-container">
                              <svg
                                viewBox="0 0 24 24"
                                className="icon card-icon"
                              >
                                <path
                                  d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18C2,19.11 2.89,20 4,20H20C21.11,20 22,19.11 22,18V6C22,4.89 21.11,4 20,4Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                              <svg
                                viewBox="0 0 24 24"
                                className="icon payment-icon"
                              >
                                <path
                                  d="M2,17H22V21H2V17M6.25,7H9V6H6V3H18V6H15V7H17.75L19,17H5L6.25,7M9,10H15V8H9V10M9,13H15V11H9V13Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                              <svg
                                viewBox="0 0 24 24"
                                className="icon dollar-icon"
                              >
                                <path
                                  d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                              <svg
                                viewBox="0 0 24 24"
                                className="icon wallet-icon default-icon"
                              >
                                <path
                                  d="M21,18V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V6H12C10.89,6 10,6.9 10,8V16A2,2 0 0,0 12,18M12,16H22V8H12M16,13.5A1.5,1.5 0 0,1 14.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,12A1.5,1.5 0 0,1 16,13.5Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                              <svg
                                viewBox="0 0 24 24"
                                className="icon check-icon"
                              >
                                <path
                                  d="M9,16.17L4.83,12L3.41,13.41L9,19L21,7L19.59,5.59L9,16.17Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </div>
                          </button>
                        )}
                      </div>
                      <div>
                        <SuccessToaster visible={showToaster} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <MainDTLCard props={data} />
        </div>
      </div>
    </motion.div>
  );
};

export default MainDTLCards;
