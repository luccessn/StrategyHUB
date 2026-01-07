// import {
//   AnimationModule,
//   ContextMenuModule,
//   CrosshairModule,
//   LegendModule,
//   ModuleRegistry,
//   SankeySeriesModule,
// } from "ag-charts-enterprise";
// ModuleRegistry.registerModules([
//   AnimationModule,
//   CrosshairModule,
//   LegendModule,
//   SankeySeriesModule,
//   ContextMenuModule,
// ]);
// import { Unstable_SankeyChart as SankeyChart } from "@mui/x-charts-pro/SankeyChart";
import React from "react";
import { AgCharts } from "ag-charts-react";
import { Sankey, ResponsiveContainer } from "recharts";
import Shuffle from "../../../UI/tx/Shuffle";
// const efficiencyData = [
//   {
//     category: "Downforce Efficiency",
//     value: 8.0,
//     description: "მაღალი downforce შედარებით დიდი drag-ის ფასად (1991 aero)",
//   },
//   {
//     category: "Power-to-Weight",
//     value: 9.0,
//     description:
//       "ძალიან მაღალი სიმძლავრე წონასთან მიმართებაში (~700+ hp / ~505 kg)",
//   },
//   {
//     category: "Aero Balance",
//     value: 7.5,
//     description:
//       "კარგი ბალანსი წინა/უკანა ღერძს შორის, მაგრამ აქტიური აეროს გარეშე",
//   },
// ];
const qualityData = [
  { category: "Downforce Efficiency", value: 8 },
  { category: "Power-to-Weight", value: 9 },
  { category: "Aero Balance", value: 7.5 },
];

const efficiencyData = [
  { category: "Downforce Efficiency", value: 8 },
  { category: "Power-to-Weight", value: 9 },
  { category: "Aero Balance", value: 7.5 },
];

const speedData = [
  { category: "Downforce Efficiency", value: 7 },
  { category: "Power-to-Weight", value: 8.5 },
  { category: "Aero Balance", value: 7 },
];
export const AeroDynamic = ({ title, dino }) => {
  console.log(dino?.AeroGforce.GForce);

  //   const options = {
  //     width: 1400, // 👈 გაზრდის სიგრძეს
  //     height: 400,

  //     title: {
  //       text: "UK Power Generation",
  //     },
  //     subtitle: {
  //       text: "2023",
  //     },
  //     plotOptions: {
  //       series: {
  //         states: {
  //           hover: {
  //             enabled: false,
  //           },
  //           inactive: {
  //             opacity: 1,
  //           },
  //         },
  //       },
  //     },

  //     data: [
  //       { from: "Natural Gas", to: "Total", size: 89 },
  //       { from: "Total", to: "Total2", size: 89 },
  //       { from: "Total2", to: "Total3", size: 89 },
  //       { from: "Imports", to: "Total4", size: 33 },
  //       { from: "Total4", to: "Total5", size: 33 },
  //       { from: "Total5", to: "Total6", size: 33 },

  //       { from: "Renewables", to: "Total7", size: 20 },
  //       { from: "Total7", to: "Total8", size: 20 },
  //     ],

  //     series: [
  //       {
  //         type: "sankey",
  //         fromKey: "from",
  //         toKey: "to",
  //         sizeKey: "size",
  //         sizeName: "Total (GWh)",
  //         node: {
  //           fill: "#34495e",
  //           stroke: "#2c3e50",
  //           strokeWidth: 2,
  //         },
  //       },
  //     ],
  //   };

  const data = {
    nodes: [
      { name: "B" },
      { name: "C" },
      { name: "D" },
      { name: "D`" },
      { name: "D1" },
      { name: "D2" },
      { name: "Spacer" }, // <-- dummy node for the gap
      { name: "E" },
      { name: "F" },
      { name: "G" },
      { name: "A" },
    ],
    links: [
      { source: 0, target: 10, value: 4 }, // B → A
      { source: 1, target: 10, value: 3 }, // C → A
      { source: 2, target: 10, value: 3 }, // D → A
      { source: 3, target: 10, value: 1.2 }, // D` → A
      { source: 4, target: 10, value: 1.2 }, // D1 → A
      { source: 5, target: 10, value: 2 }, // D2 → A
      { source: 4, target: 5, value: 1.2 }, // D1 → D2

      // Transparent link for gap
      { source: 6, target: 10, value: 5, color: "rgba(0,0,0,0)" },

      { source: 7, target: 10, value: 2 }, // E → A
      { source: 8, target: 10, value: 3 }, // F → A
      { source: 9, target: 10, value: 3 }, // G → A
    ],
  };
  ///2 circle
  const options = {
    background: { fill: "#000000" },
    width: 600,
    height: 600,
    title: {
      text: "F1 1991 Performance Radar",
      color: "#ffffff",
      fontFamily: "panchangMD",
    },

    series: [
      {
        type: "radar-area",
        data: dino?.AeroGforce.GForce?.qualityData,
        angleKey: "category",
        radiusKey: "value",
        radiusName: "Quality",
      },
      {
        type: "radar-area",
        data: dino?.AeroGforce.GForce?.efficiencyData,
        angleKey: "category",
        radiusKey: "value",
        radiusName: "Efficiency",
      },
      {
        type: "radar-area",
        data: dino?.AeroGforce.GForce?.speedData,
        angleKey: "category",
        radiusKey: "value",
        radiusName: "Speed",
      },
    ],
    axes: [
      {
        type: "angle-category",
        shape: "circle",
        label: { color: "#ffffff", fontSize: 15, fontFamily: "array" },
        line: { color: "#ffffff" },
        tick: { color: "#ffffff" },
      },
      {
        type: "radius-number",
        shape: "circle",
        label: { color: "#ffffff", fontSize: 14, fontFamily: "array" },
        line: { color: "#ffffff" },
        tick: { color: "#ffffff" },
      },
    ],
    legend: {
      position: "bottom",
      item: {
        label: {
          color: "#ffffff",
          fontFamily: "panchangMD",
        },
      },
    },
  };

  return (
    <div className="flex flex-row gap-5 items-center">
      <div className="flex flex-col gap-2  w-[800px]">
        <h1 className="font-panchangMD text-3xl">
          Aerodinamic and G-Force analysis
        </h1>
        <div className="flex justify-center items-center p-8">
          <button className="relative font-extrabold text-black bg-red-500 px-6 py-3 transform -rotate-2 skew-x-[-3deg] skew-y-[1deg]">
            {/* Inner container */}
            <div className="relative flex justify-center items-center overflow-hidden z-10">
              {/* Shuffle text inside the button */}
              <Shuffle
                className="text-xl font-panchangSB text-black uppercase tracking-wider z-20"
                text={dino.AeroGforce.AeroDYN.Drag}
                shuffleDirection="right"
                duration={0.35}
                animationMode="evenodd"
                shuffleTimes={1}
                ease="power3.out"
                stagger={0.03}
                threshold={0.1}
                triggerOnce={true}
                respectReducedMotion={true}
              />
              {/* Halftone overlay */}
              <div className="absolute top-0 left-0 w-full h-full opacity-30 mix-blend-multiply bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.2)_0.1em,transparent_0.1em)] bg-[length:0.5em_0.5em]"></div>

              {/* Ink splatter */}
              <div className="absolute top-0 left-0 w-full h-full opacity-0 z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.08)_20%,transparent_50%),radial-gradient(circle_at_70%_65%,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.08)_25%,transparent_50%),radial-gradient(circle_at_40%_50%,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.08)_30%,transparent_60%),radial-gradient(circle_at_85%_15%,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.08)_15%,transparent_40%)]"></div>
            </div>

            {/* Button shadow */}
            <div className="absolute top-1 left-1 right-[-1px] bottom-[-1px] bg-black/35 z-0"></div>

            {/* Button frame */}
            <div className="absolute top-2 left-2 right-2 bottom-2 bg-yellow-300 border-2 border-black z-0"></div>
          </button>
        </div>
        {/* <AgCharts width={100} options={options} /> */}
        <ResponsiveContainer width={800} height={350}>
          <Sankey
            data={data}
            nodePadding={10}
            nodeWidth={10}
            link={{ stroke: "#ffffff", opacity: 1 }} // visible links are white
            node={{ fill: "#ffffff" }} // nodes are white
          >
            {/* <Tooltip /> */}
          </Sankey>
        </ResponsiveContainer>{" "}
        <div className="flex justify-center items-center p-8">
          <button className="relative font-extrabold text-black bg-blue-200 px-6 py-3 transform -rotate-2 skew-x-[-3deg] skew-y-[1deg]">
            {/* Inner container */}
            <div className="relative flex justify-center items-center overflow-hidden z-10">
              {/* Shuffle text inside the button */}

              <Shuffle
                className="text-xl font-panchangSB text-black uppercase tracking-wider z-20"
                text={dino.AeroGforce.AeroDYN.Downforce}
                shuffleDirection="right"
                duration={0.35}
                animationMode="evenodd"
                shuffleTimes={1}
                ease="power3.out"
                stagger={0.03}
                threshold={0.1}
                triggerOnce={true}
                respectReducedMotion={true}
              />
              {/* Halftone overlay */}
              <div className="absolute top-0 left-0 w-full h-full opacity-30 mix-blend-multiply bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.2)_0.1em,transparent_0.1em)] bg-[length:0.5em_0.5em]"></div>

              {/* Ink splatter */}
              <div className="absolute top-0 left-0 w-full h-full opacity-0 z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.08)_20%,transparent_50%),radial-gradient(circle_at_70%_65%,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.08)_25%,transparent_50%),radial-gradient(circle_at_40%_50%,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.08)_30%,transparent_60%),radial-gradient(circle_at_85%_15%,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.08)_15%,transparent_40%)]"></div>
            </div>

            {/* Button shadow */}
            <div className="absolute top-1 left-1 right-[-1px] bottom-[-1px] bg-black/35 z-0"></div>

            {/* Button frame */}
            <div className="absolute top-2 left-2 right-2 bottom-2 bg-blue-500 border-2 border-black z-0"></div>
          </button>
        </div>
      </div>
      <AgCharts options={options} />
    </div>
  );
};
