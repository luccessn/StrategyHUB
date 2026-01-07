import React, { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";
// import * as React from "react";
// import { LineChart } from "@mui/x-charts/LineChart";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";

export const TestCharts = ({ title, chartData }) => {
  const [options, setOptions] = useState({});
  useEffect(() => {
    setOptions({
      background: { fill: "#000000" },
      title: { text: title + " - Torque vs RPM", color: "#ffffff" },
      series: [
        {
          type: "line",
          data: chartData.series1,
          xKey: "sensorName",
          yKey: "sensor",
          yName: "Torque",
          stroke: "#00FFCC",
          strokeWidth: 3,
          marker: { enabled: true, size: 8 },
          interpolation: { type: "smooth" },
        },
        {
          type: "line",
          data: chartData.series2,
          xKey: "sensorName",
          yKey: "sensor",
          yName: "Power",
          stroke: "#FFCC00",
          strokeWidth: 3,
          marker: { enabled: true, size: 8 },
          interpolation: { type: "smooth" },
        },
      ],
      axes: [
        {
          type: "number",
          position: "left",
          title: { text: "Torque (Nm)", color: "#ffffff" },
          label: { color: "#cccccc" },
        },
        {
          type: "category",
          position: "bottom",
          title: { text: "RPM", color: "#ffffff" },
          label: { color: "#cccccc" },
        },
      ],
      legend: {
        position: "bottom",
        item: { label: { color: "#ffffff" } },
      },
    });
  }, [chartData, title]);
  // const [options] = useState({
  //   background: {
  //     fill: "#000000", // შავი ფონი
  //   },
  //   title: {
  //     text: "Torque vs RPM",
  //     color: "#ffffff",
  //   },
  //   series: [
  //     {
  //       type: "line",
  //       data: getLoungeData(),
  //       xKey: "sensorName",
  //       yKey: "sensor",
  //       yName: "Gare 1",
  //       stroke: "#00FFCC",
  //       strokeWidth: 3,
  //       marker: { enabled: true, size: 10 },
  //       interpolation: { type: "smooth" }, // 💡 რბილი ხაზი
  //     },
  //     {
  //       type: "line",
  //       data: getOfficeData(),
  //       xKey: "sensorName",
  //       yKey: "sensor",
  //       yName: "Gare",
  //       stroke: "#FFCC00",
  //       strokeWidth: 3,
  //       marker: { enabled: true, size: 10 },
  //       interpolation: { type: "smooth" }, // 💡 რბილი ხაზი
  //     },
  //   ],
  //   axes: [
  //     {
  //       type: "number",
  //       position: "left",
  //       title: {
  //         text: "Torque (Nm)",
  //         color: "#ffffff",
  //       },
  //       label: {
  //         color: "#cccccc",
  //       },
  //     },
  //     {
  //       type: "category",
  //       position: "bottom",
  //       title: {
  //         text: "RPM",
  //         color: "#ffffff",
  //       },
  //       label: {
  //         color: "#cccccc",
  //       },
  //       line: {
  //         stroke: "#555555",
  //       },
  //       gridLine: {
  //         stroke: "#222222",
  //       },
  //     },
  //   ],
  //   legend: {
  //     position: "right",
  //     item: {
  //       label: {
  //         color: "#ffffff",
  //       },
  //     },
  //   },
  // });

  return <AgCharts className="w-full h-[500px]" options={options} />;
};

// const rpmData = [1000, 2000, 4000, 6000, 8000, 10000, 12000];
// const series = [
//   {
//     label: "F1 Gear 1",
//     data: [180, 350, 670, 600, 480, 320, 180],
//     color: "#FFD700",
//     curve: "monotoneX",
//     showMark: false,
//   },
//   {
//     label: "F1 Gear 2",
//     data: [170, 320, 580, 520, 430, 290, 170],
//     color: "#FFC300",
//     curve: "monotoneX",
//     showMark: false,
//   },
//   {
//     label: "F1 Gear 3",
//     data: [160, 300, 500, 460, 380, 260, 160],
//     color: "#FF8C00",
//     curve: "monotoneX",
//     showMark: false,
//   },
//   {
//     label: "F1 Gear 4",
//     data: [150, 270, 450, 420, 360, 240, 150],
//     color: "#FF4500",
//     curve: "monotoneX",
//     showMark: false,
//   },
//   {
//     label: "GT3 Gear 1",
//     data: [160, 260, 390, 370, 320, 230, 150],
//     color: "#1E90FF",
//     curve: "monotoneX",
//     showMark: false,
//   },
//   {
//     label: "GT3 Gear 2",
//     data: [150, 250, 370, 340, 300, 220, 140],
//     color: "#00BFFF",
//     curve: "monotoneX",
//     showMark: false,
//   },
// ];
// const xAxis = [
//   {
//     data: rpmData,
//     label: "RPM",
//     valueFormatter: (value) => `${value.toLocaleString()}`,
//     min: 0,
//     max: 12000,
//   },
// ];
// const yAxis = [
//   {
//     label: "Torque (Nm)",
//     min: 0,
//     max: 800,
//   },
// ];
// return (
//   <Box
//     sx={{
//       p: 4,
//       borderRadius: 3,
//       boxShadow: "0 0 25px rgba(255,255,255,0.05)",
//     }}
//   >
//     <Stack alignItems="center" spacing={2}>
//       <Typography variant="h5" sx={{ color: "#ffffff", fontWeight: 600 }}>
//         Torque vs RPM vs Gear
//       </Typography>
//       <LineChart
//         width={950}
//         height={550}
//         series={series}
//         xAxis={xAxis}
//         yAxis={yAxis}
//         grid={{ horizontal: true, vertical: true }}
//         sx={{
//           "& .MuiLineElement-root": { strokeWidth: 3 },
//           "& .MuiChartsLegend-root": { color: "#ffffff" },
//           "& .MuiChartsAxis-tickLabel": { fill: "#ffffff" },
//           "& .MuiChartsAxis-label": { fill: "#ffffff", fontSize: 14 },
//           "& .MuiChartsGrid-line": { stroke: "rgba(255,255,255,0.1)" },
//         }}
//       />
//       <Typography variant="caption" sx={{ color: "#bbb" }}>
//         Visualization Example — F1 vs GT3 Torque Curves
//       </Typography>
//     </Stack>
//   </Box>
// );
