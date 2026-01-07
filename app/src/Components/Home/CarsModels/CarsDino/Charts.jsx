import React, { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";
// import {
//   GaugeContainer,
//   GaugeValueArc,
//   GaugeReferenceArc,
//   useGaugeState,
//   GaugeValueText,
// } from "@mui/x-charts/Gauge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";

import { AgGauge } from "ag-charts-react";
import "ag-charts-enterprise";

export const Charts = ({ title, dino }) => {
  const [options, setOptions] = useState({});
  useEffect(() => {
    setOptions({
      background: { fill: "#000000" },
      title: {
        text: title + " - Torque vs RPM",
        color: "#ffffff",
        fontFamily: "panchangMD",
      },
      height: 600, // ⬅️ დაამატე ეს ხაზი
      width: 700, // ⬅️ დაამატე ეს ხაზი
      series: [
        // {
        //   type: "line",
        //   data: dino.chartData.series1,
        //   xKey: "sensorName",
        //   yKey: "sensor",
        //   yName: "Torque",
        //   stroke: "#00FFCC",
        //   strokeWidth: 3,
        //   marker: { enabled: true, size: 8 },
        //   interpolation: { type: "smooth" },
        // },
        {
          type: "line",
          data: dino.chartData.series,
          xKey: "sensorName",
          yKey: "sensor",
          yName: "Power-Torque",

          stroke: "#00FFCC",
          strokeWidth: 4,
          marker: { enabled: true, size: 10 },
          interpolation: { type: "smooth" },
        },
      ],
      axes: [
        {
          type: "number",
          position: "left",
          title: {
            text: "Torque (Nm)",
            color: "#ffffff",
            fontFamily: "panchangMD",
          },
          label: { color: "#cccccc" },
        },
        {
          type: "category",
          position: "bottom",
          title: { text: "RPM", color: "#ffffff", fontFamily: "panchangMD" },
          label: { color: "#cccccc" },
        },
      ],
      legend: {
        position: "bottom",
        item: { label: { color: "#ffffff" } },
      },
    });
  }, [dino.chartData, title]);

  const [currentIndex, setcurrentIndex] = useState(0);
  const [options2, setOptions2] = useState({
    background: { fill: "#000000" },
    title: {
      text: "RPM",
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "bold",
      yOffset: 80, // რაც უნდა ქვემოთ იყოს
      align: "center",
      fontFamily: "panchangMD",
    },
    data: {
      text: "2000 - 2020",
    },
    type: "radial-gauge",
    width: 400,
    height: 350,
    value: dino.chartData.valueScalesMX[0].sensor,
    scale: {
      min: 0,
      max: 12000,
      label: {
        color: "#ffffff", // ← თეთრი ციფრები
        fontSize: 10,
        fontFamily: "panchangSB",
      },
      tick: {
        color: "#ffffff", // ← თეთრი ნიშნები
        width: 2,
        size: 10,
      },
    },
    needle: {
      enabled: true,
      lengthRatio: 0.9,
      width: 4,
      fill: "#FF0000", //
      stroke: "#FF0000", //
      innerGap: 5,
    },
    needleInnerCircle: {
      fill: "#ffffff",
      radius: 7,
    },
    bar: {
      enabled: false,
    },
    startAngle: -125,
    endAngle: 125,
    //-225, 50
    valueText: {
      enabled: true,
      format: (v) => `${v}`, // მხოლოდ რიცხვი
      color: "#ffffff",
      fontSize: 22,
      fontWeight: "bold",
      yOffset: 30, // ზუსტი პოზიცია შედარებით
    },
  });
  const lastobj = dino.chartData.valueScalesMX.length - 1;

  const [options3, setOptions3] = useState({
    background: { fill: "#000000" },
    title: {
      text: "km/h",
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "bold",
      yOffset: 80, // რაც უნდა ქვემოთ იყოს
      align: "center",
      fontFamily: "panchangMD",
    },
    type: "radial-gauge",
    width: 300,
    height: 350,
    value: dino.chartData.valueScalesMX[0].kmh,
    scale: {
      min: 0,
      max: dino.chartData.valueScalesMX[dino.chartData.valueScalesMX.length - 1]
        .kmh,
      majorTicks: [0, 100, 200, 300, 400],
      label: { color: "#ffffff", fontSize: 9, fontFamily: "panchangSB" },
      tick: { color: "#ffffff", width: 2, size: 10 },
    },
    needle: {
      enabled: true,
      lengthRatio: 0.9,
      width: 4,
      fill: "#FF0000",
      stroke: "#FF0000",
      innerGap: 5,
    },
    segmentation: {
      enabled: true,
      interval: {
        count: 4,
      },
      spacing: 2,
    },
    needleInnerCircle: { fill: "#ffffff", radius: 7 },
    bar: { enabled: false },
    startAngle: -200,
    endAngle: 80,
  });

  // const setNeedleEnabled = (enabled) => {
  //   setOptions2((prev) => ({
  //     ...prev,
  //     needle: { ...prev.needle, enabled },
  //   }));
  // };

  // const setBarEnabled = (enabled) => {
  //   setOptions2((prev) => ({
  //     ...prev,
  //     bar: { ...prev.bar, enabled },
  //   }));
  // };
  useEffect(() => {
    setOptions2((prev) => ({
      ...prev,
      value: dino.chartData.valueScalesMX[currentIndex].sensor,
    }));
    setOptions3((prev) => ({
      ...prev,
      value: dino.chartData.valueScalesMX[currentIndex].kmh,
    }));
  }, [currentIndex, dino.chartData.valueScalesMX]);
  // max value
  const totalSlides = dino.chartData.valueScalesMX.length;
  return (
    <div className="flex flex-row   gap-5  items-center  ">
      <div className="    ">
        <AgCharts options={options} />
      </div>

      {/* <div className="example-controls">
              <div className="controls-row">
                <button onClick={() => setNeedleEnabled(false)}>
                  Hide Needle
                </button>
                <button
                  className="gap-right"
                  onClick={() => setNeedleEnabled(true)}
                >
                  Show Needle
                </button>
                <button onClick={() => setBarEnabled(false)}>Hide Bar</button>
                <button onClick={() => setBarEnabled(true)}>Show Bar</button>
              </div>
            </div> */}
      {/* <div className="">
        <AgGauge options={options2} />
      </div> */}
      <div className="flex flex-col  items-center text-white">
        {/* <h2 className="text-xl font-bold mb-2">
          {chartData.valueScalesMX[currentIndex].sensorName}{" "}
        </h2> */}
        <div className="flex flex-row gap-2">
          <AgGauge options={options2} />
          <AgGauge options={options3} />
        </div>
        <div className="flex flex-row gap-2">
          <button
            className={`swiper-button-prev-custom cursor-target top-20 relative w-12 h-12 overflow-hidden bg-transparent border-none outline-none cursor-pointer group ${
              currentIndex === 0 ? "opacity-30 pointer-events-none" : ""
            }`}
          >
            <span className="absolute inset-1.5 rounded border-4 border-orange-300 transition-opacity duration-500 ease-in-out group-hover:opacity-0 group-hover:scale-75" />
            <span className="absolute inset-1.5 rounded border-4 border-sky-300 scale-125 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100" />

            <div className="absolute top-0 left-0 flex transition-transform duration-400 ease-in-out group-hover:-translate-x-3">
              <span className="w-4 h-4 mt-4 ml-4 fill-orange-100 rotate-180">
                <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
                </svg>
              </span>
            </div>
          </button>
          <Swiper
            slidesPerView={1}
            onSlideChange={(swiper) => setcurrentIndex(swiper.activeIndex)}
            style={{ width: 200, marginTop: 20 }}
            modules={[Navigation]}
            // loop={true}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
          >
            {dino.chartData.valueScalesMX.map((s, i) => (
              <SwiperSlide key={i}>
                <div className="bg p-5 top-10 rounded-lg w-16 h-10 relative">
                  <div className="loader absolute w-16 h-10"></div>
                </div>
                <div className="p-3 font-array text-5xl text-white text-center bg-gray-900 rounded-md shadow-md">
                  {s.sensorName}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className={` swiper-button-next-custom  cursor-target relative top-20 w-12 h-12 overflow-hidden bg-transparent border-none outline-none cursor-pointer group ${
              currentIndex === totalSlides - 1
                ? "opacity-30 pointer-events-none"
                : ""
            }`}
          >
            <span className="absolute inset-1.5 rounded border-4 border-orange-300 transition-opacity duration-500 ease-in-out group-hover:opacity-0 group-hover:scale-75" />
            <span className="absolute inset-1.5 rounded border-4 border-sky-300 scale-125 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100" />

            <div className="absolute top-0 left-0 flex transition-transform duration-400 ease-in-out group-hover:translate-x-3">
              <span className="w-4 h-4 mt-4 ml-4 fill-neutral-200 absolute top-0.5 ">
                <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
                </svg>
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
