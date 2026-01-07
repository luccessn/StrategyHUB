import React from "react";
import { AgCharts } from "ag-charts-react";
// import {
//   BarSeriesModule,
//   CategoryAxisModule,
//   LegendModule,
//   ModuleRegistry,
//   NumberAxisModule,
// } from "ag-charts-community";

// ModuleRegistry.registerModules([
//   BarSeriesModule,
//   CategoryAxisModule,
//   LegendModule,
//   NumberAxisModule,
// ]);

export const BrakeAccelr = ({ title, dino }) => {
  const options = {
    background: { fill: "#000000" },

    width: 900,
    height: 570,

    data: dino?.BrakeAccelr.Bar?.brakeAccelrData,

    series: dino?.BrakeAccelr.Bar?.brakeAccelrSeries.map((s) => ({
      ...s,
      label: {
        ...s.label,
        formatter: ({ value }) => `${value} G`,
      },
    })),
    axes: [
      {
        type: "number",
        position: "left",
        title: { text: "G-Force", color: "#ffffff", fontFamily: "panchangMD" },
        label: { color: "#ffffff" },
      },
      {
        type: "category",
        position: "bottom",
        title: { text: "", color: "#ffffff", fontFamily: "panchangMD" },
        label: { color: "#ffffff" },
      },
    ],
    legend: {
      position: "bottom",
      item: { label: { color: "#ffffff" } },
    },
  };
  const options2 = {
    background: { fill: "#000000" },
    width: 500,
    height: 400,
    data: dino?.BrakeAccelr.RangeArea?.RangeData,
    // title: {
    //   text: "London Property Average Price Range",
    // },
    // subtitle: {
    //   text: "2000 - 2020",
    // },
    series: dino?.BrakeAccelr.RangeArea?.RangeSeries,
    axes: [
      {
        type: "number",
        position: "left",
        title: { text: "G-Force", color: "#ffffff", fontFamily: "panchangMD" },
        label: { color: "#ffffff" },
      },
      {
        type: "category",
        position: "bottom",
        title: { text: "", color: "#ffffff", fontFamily: "panchangMD" },
        label: { color: "#ffffff" },
        visible: false,
      },
    ],
    legend: {
      position: "bottom",
      item: { label: { color: "#ffffff" } },
      fontFamily: "panchangMD",
    },
    legend: {
      position: "bottom",
      item: { label: { color: "#ffffff" } },
      fontFamily: "panchangMD",
    },
  };
  return (
    <div className="h-full">
      <h3 className="font-panchangMD text-2xl">
        {title} Brake & Acceleration analyze
      </h3>
      <div className="flex flex-row gap-2">
        <AgCharts options={options} />
        <AgCharts options={options2} />
      </div>
    </div>
  );
};
