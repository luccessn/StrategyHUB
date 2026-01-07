// import ferrari296gt3 from "../models/cars/gt3/ferrari_296_gt3.glb";
//F1
import sennamclr1k from "../models/cars/f1/sennamclr.glb";
import lotus49c from "../models/cars/f1/lotus_49c.glb";
// import rb9 from "../models/cars/f1/rb9.glb";
// import mclarenmp27 from "../models/cars/f1/mclaren_mp4_27.glb";
// import w11 from "../models/cars/f1/2020_w11.glb";
// import fr2021 from "../models/cars/f1/2021_ferrari.glb";
// import rb19 from "../models/cars/f1/rb19.glb";

export const carsConst = [
  {
    title: "McLaren F1 (1991)",
    description: "Babbu Maan",
    src: sennamclr1k,
    scale: [4.2, 4, 4],
    position: [0, 0.8, -2],
    rotation: [0, -0.7, 0], //Math.PI
    dino: {
      chartData: {
        series1: [
          { sensorName: "0", sensor: 0 },
          { sensorName: "2000", sensor: 300 },
          { sensorName: "4000", sensor: 600 },
          { sensorName: "6000", sensor: 500 },
          { sensorName: "8000", sensor: 450 },
          { sensorName: "12000", sensor: 300 },
        ],
        series2: [
          { sensorName: "0", sensor: 210 },
          { sensorName: "2000", sensor: 280 },
          { sensorName: "4000", sensor: 500 },
          { sensorName: "6000", sensor: 555 },
          { sensorName: "8000", sensor: 400 },
          { sensorName: "12000", sensor: 200 },
        ],
        valueScalesMX: [
          { sensorName: "1", sensor: 6500, ratio: 3.23 },
          { sensorName: "2", sensor: 7500, ratio: 2.19 },
          { sensorName: "3", sensor: 8500, ratio: 1.71 },
          { sensorName: "4", sensor: 9000, ratio: 1.39 },
          { sensorName: "5", sensor: 9500, ratio: 1.16 },
          { sensorName: "6", sensor: 10000, ratio: 0.93 },
        ],
        bar: {
          fills: [
            { color: "#E84118", stop: 35 },
            { color: "#FBC531", stop: 45 },
            { color: "#4CD137", stop: 55 },
            { color: "#FBC531", stop: 65 },
            { color: "#E84118" },
          ],
          fillMode: "discrete",
        },
      },
      BrakeAccelr: {
        Bar: {
          brakeAccelrData: [
            {
              quarter: "",
              brake: 1.8,
              accelr: 1.5,
            },
          ],
          brakeAccelrSeries: [
            {
              type: "bar",
              xKey: "quarter",
              yKey: "brake",
              yName: "Braking",
              fill: "#E84118",

              label: {
                enabled: true,
                placement: "outside", // ზემოდან
                fontSize: 32,
                color: "#2f3640",
                fontWeight: "bold",
                formatter: ({ value }) => `${value} g`,
              },
              shadow: {
                enabled: true,
                color: "rgba(0,0,0,0.3)",
                xOffset: 3,
                yOffset: 3,
                blur: 6,
              },
            },
            {
              type: "bar",
              xKey: "quarter",
              yKey: "accelr",
              yName: "Acceleration",
              fill: "#00A8FF",

              label: {
                enabled: true,
                placement: "outside", // ზემოდან
                fontSize: 32,
                color: "#2f3640",
                fontWeight: "bold",
                formatter: ({ value }) => `${value} g`,
              },
              shadow: {
                enabled: true,
                color: "rgba(0,0,0,0.3)",
                xOffset: 3,
                yOffset: 3,
                blur: 6,
              },
            },
          ],
        },
        RangeArea: {
          RangeData: [
            { step: "Q1", Braking: 0.2, Acceleration: 0.1 },
            { step: "Q2", Braking: 0.55, Acceleration: 0.65 },
            { step: "Q3", Braking: 0.45, Acceleration: 0.55 },
            { step: "Q4", Braking: 0.9, Acceleration: 0.85 },
            { step: "Q5", Braking: 0.8, Acceleration: 0.9 },
            { step: "Q6", Braking: 1.3, Acceleration: 1.1 },
            { step: "Q7", Braking: 1.2, Acceleration: 1.02 },
            { step: "Q8", Braking: 1.42, Acceleration: 1.35 },
            { step: "Q9", Braking: 1.55, Acceleration: 1.4 },
            { step: "Q10", Braking: 1.8, Acceleration: 1.5 },
          ],
          RangeSeries: [
            {
              type: "line",
              xKey: "step",
              yKey: "Braking",
              yName: "Braking",
              stroke: "#FF4D4D",
              strokeWidth: 4,
              marker: { enabled: true, size: 8, color: "#FFFFFF" },
              // interpolation: { type: "smooth" },
              shadow: {
                enabled: true,
                color: "rgba(0,0,0,0.3)",
                xOffset: 3,
                yOffset: 3,
                blur: 6,
              },
            },
            {
              type: "line",
              xKey: "step",
              yKey: "Acceleration",
              yName: "Acceleration",
              stroke: "#6BB6FF",
              strokeWidth: 4,
              marker: { enabled: true, size: 8, color: "#FFFFFF" },
              // interpolation: { type: "smooth" },
              shadow: {
                enabled: true,
                color: "rgba(0,0,0,0.3)",
                xOffset: 3,
                yOffset: 3,
                blur: 6,
              },
            },
          ],
        },
      },
      AeroGforce: {
        AeroDYN: {
          Drag: "Drag 45%",
          Downforce: "Downforce 55%",
        },
      },
    },
    about:
      "The McLaren F1, conceived in 1991 by legendary engineer Gordon Murray, is widely regarded as one of the greatest road cars ever built. Designed with a singular focus on driving purity, performance, and innovation, the F1 was created without compromise and with technology inspired directly by Formula One racing. At its core, the McLaren F1 features a naturally aspirated 6.1-liter BMW V12 engine, producing 618 horsepower. Combined with an ultra-lightweight carbon-fiber monocoque chassis—the first of its kind in a production road car—the F1 delivered extraordinary performance while maintaining remarkable balance and reliability. One of its most distinctive features is the central driving position, placing the driver in the middle of the car with two passenger seats slightly behind on either side. This layout was chosen to provide perfect weight distribution, unmatched visibility, and a true race-car driving experience.",
    about2:
      " When production began in the early 1990s, the McLaren F1 redefined what a supercar could be. In 1998, it achieved a top speed of 240.1 mph (386.4 km/h), making it the fastest naturally aspirated production car in the world—a record that remains unbeaten to this day.Despite being designed primarily as a road car, the McLaren F1 proved its dominance in motorsport. In 1995, the McLaren F1 GTR won the 24 Hours of Le Mans on its first attempt, defeating purpose-built race cars and cementing its legendary status in automotive history. With only 106 units ever produced (including road, GTR, and LM variants), the McLaren F1 is now one of the most valuable and sought-after cars in the world. Its combination of engineering excellence, racing pedigree, and timeless design has made it an enduring icon and a benchmark against which all modern hypercars are measured.",
  },
  {
    title: "lotus49c",
    description: "Babbu Maan",
    src: lotus49c,
    scale: [2.1, 1.9, 1.9],
    position: [0, 2.5, -2],
    rotation: [0, -0.7, 0], //Math.PI
    dino: {
      chartData: {
        series1: [
          { sensorName: "0", sensor: 0 },
          { sensorName: "2000", sensor: 300 },
          { sensorName: "4000", sensor: 600 },
          { sensorName: "6000", sensor: 500 },
          { sensorName: "8000", sensor: 450 },
          { sensorName: "12000", sensor: 300 },
        ],
        series2: [
          { sensorName: "0", sensor: 210 },
          { sensorName: "2000", sensor: 280 },
          { sensorName: "4000", sensor: 500 },
          { sensorName: "6000", sensor: 555 },
          { sensorName: "8000", sensor: 400 },
          { sensorName: "12000", sensor: 200 },
        ],
        // valueScalesMX: [
        //   { sensorName: "gear 1", rpm: 6000 },
        //   { sensorName: "gear 2", rpm: 8550 },
        //   { sensorName: "gear 3", rpm: 10200 },
        //   { sensorName: "gear 4", rpm: 11500 },
        //   { sensorName: "gear 5", rpm: 12000 },
        // ],
        valueScalesMX: [
          { sensorName: "1", sensor: 6000 },
          { sensorName: "2", sensor: 8550 },
          { sensorName: "3", sensor: 10200 },
          { sensorName: "4", sensor: 11500 },
          { sensorName: "5", sensor: 12000 },
        ],
        bar: {
          fills: [
            { color: "#E84118", stop: 35 },
            { color: "#FBC531", stop: 45 },
            { color: "#4CD137", stop: 55 },
            { color: "#FBC531", stop: 65 },
            { color: "#E84118" },
          ],
          fillMode: "discrete",
        },
      },
      BrakeAccelr: {
        Bar: {
          brakeAccelrData: [
            {
              quarter: "",
              brake: 1.8,
              accelr: 1.5,
            },
          ],
          brakeAccelrSeries: [
            {
              type: "bar",
              xKey: "quarter",
              yKey: "brake",
              yName: "Braking",
              fill: "#E84118",

              label: {
                enabled: true,
                placement: "outside", // ზემოდან
                fontSize: 32,
                color: "#2f3640",
                fontWeight: "bold",
                formatter: ({ value }) => `${value} g`,
              },
              shadow: {
                enabled: true,
                color: "rgba(0,0,0,0.3)",
                xOffset: 3,
                yOffset: 3,
                blur: 6,
              },
            },
            {
              type: "bar",
              xKey: "quarter",
              yKey: "accelr",
              yName: "Acceleration",
              fill: "#00A8FF",

              label: {
                enabled: true,
                placement: "outside", // ზემოდან
                fontSize: 32,
                color: "#2f3640",
                fontWeight: "bold",
                formatter: ({ value }) => `${value} g`,
              },
              shadow: {
                enabled: true,
                color: "rgba(0,0,0,0.3)",
                xOffset: 3,
                yOffset: 3,
                blur: 6,
              },
            },
          ],
        },
        RangeArea: {
          RangeData: [
            { step: "Q1", Braking: 0.2, Acceleration: 0.1 },
            { step: "Q2", Braking: 0.55, Acceleration: 0.65 },
            { step: "Q3", Braking: 0.45, Acceleration: 0.55 },
            { step: "Q4", Braking: 0.9, Acceleration: 0.85 },
            { step: "Q5", Braking: 0.8, Acceleration: 0.9 },
            { step: "Q6", Braking: 1.3, Acceleration: 1.1 },
            { step: "Q7", Braking: 1.2, Acceleration: 1.02 },
            { step: "Q8", Braking: 1.42, Acceleration: 1.35 },
            { step: "Q9", Braking: 1.55, Acceleration: 1.4 },
            { step: "Q10", Braking: 1.8, Acceleration: 1.5 },
          ],
          RangeSeries: [
            {
              type: "line",
              xKey: "step",
              yKey: "Braking",
              yName: "Braking",
              stroke: "#FF4D4D",
              strokeWidth: 4,
              marker: { enabled: true, size: 8, color: "#FFFFFF" },
              // interpolation: { type: "smooth" },
              shadow: {
                enabled: true,
                color: "rgba(0,0,0,0.3)",
                xOffset: 3,
                yOffset: 3,
                blur: 6,
              },
            },
            {
              type: "line",
              xKey: "step",
              yKey: "Acceleration",
              yName: "Acceleration",
              stroke: "#6BB6FF",
              strokeWidth: 4,
              marker: { enabled: true, size: 8, color: "#FFFFFF" },
              // interpolation: { type: "smooth" },
              shadow: {
                enabled: true,
                color: "rgba(0,0,0,0.3)",
                xOffset: 3,
                yOffset: 3,
                blur: 6,
              },
            },
          ],
        },
      },
      AeroGforce: {
        AeroDYN: {
          Drag: "Drag 45%",
          Downforce: "Downforce 55%",
        },
      },
    },
    about:
      "The Lotus 49C, introduced in 1967 under the direction of legendary engineer Colin Chapman, is widely regarded as one of the most revolutionary Formula One cars in motorsport history. Designed around Chapman’s philosophy of simplicity and efficiency, the 49C pioneered the use of the engine as a fully stressed member of the chassis, fundamentally changing race car design. Powered by the iconic 3.0-liter Cosworth DFV V8 engine, the Lotus 49C produced around 410 horsepower, delivering exceptional performance and reliability for its era. Its lightweight construction, advanced aerodynamics, and innovative engineering allowed it to dominate the late 1960s and early 1970s, securing multiple World Championships. The Lotus 49C set new standards for Formula One technology and remains a symbol of pure racing ingenuity and engineering brilliance.",
  },
  // {
  //   title: "Senna MCRLAaaa",
  //   description: "Babbu Maan",
  //   src: rb9,
  //   scale: [5.5, 5.5, 5.5],
  //   position: [0, 0, -2],
  //   rotation: [0, -0.7, 0], //Math.PI
  //   chartData: {
  //     series1: [
  //       { sensorName: "0", sensor: 0 },
  //       { sensorName: "2000", sensor: 300 },
  //       { sensorName: "4000", sensor: 600 },
  //       { sensorName: "6000", sensor: 500 },
  //       { sensorName: "8000", sensor: 450 },
  //       { sensorName: "12000", sensor: 300 },
  //     ],
  //     series2: [
  //       { sensorName: "0", sensor: 210 },
  //       { sensorName: "2000", sensor: 280 },
  //       { sensorName: "4000", sensor: 500 },
  //       { sensorName: "6000", sensor: 555 },
  //       { sensorName: "8000", sensor: 400 },
  //       { sensorName: "12000", sensor: 200 },
  //     ],
  //     valueScalesMX: [
  //       { sensorName: "gear 1", sensor: 6000 },
  //       { sensorName: "gear 2", sensor: 8550 },
  //     ],
  //     bar: {
  //       fills: [
  //         { color: "#E84118", stop: 35 },
  //         { color: "#FBC531", stop: 45 },
  //         { color: "#4CD137", stop: 55 },
  //         { color: "#FBC531", stop: 65 },
  //         { color: "#E84118" },
  //       ],
  //       fillMode: "discrete",
  //     },
  //   },
  //   about:
  //     "The McLaren F1, conceived in 1991 by legendary engineer Gordon Murray, is widely regarded as one of the greatest road cars ever built. Designed with a singular focus on driving purity, performance, and innovation, the F1 was created without compromise and with technology inspired directly by Formula One racing. At its core, the McLaren F1 features a naturally aspirated 6.1-liter BMW V12 engine, producing 618 horsepower. Combined with an ultra-lightweight carbon-fiber monocoque chassis—the first of its kind in a production road car—the F1 delivered extraordinary performance while maintaining remarkable balance and reliability. One of its most distinctive features is the central driving position, placing the driver in the middle of the car with two passenger seats slightly behind on either side. This layout was chosen to provide perfect weight distribution, unmatched visibility, and a true race-car driving experience.",
  // },
  // {
  //   title: "Senna MCRLAbbb",
  //   description: "Babbu Maan",
  //   src: mclarenmp27,
  //   scale: [2.1, 1.9, 1.9],
  //   position: [0, 2.5, -2],
  //   rotation: [0, -0.7, 0], //Math.PI
  //   chartData: {
  //     series1: [
  //       { sensorName: "0", sensor: 0 },
  //       { sensorName: "2000", sensor: 300 },
  //       { sensorName: "4000", sensor: 600 },
  //       { sensorName: "6000", sensor: 500 },
  //       { sensorName: "8000", sensor: 450 },
  //       { sensorName: "12000", sensor: 300 },
  //     ],
  //     series2: [
  //       { sensorName: "0", sensor: 210 },
  //       { sensorName: "2000", sensor: 280 },
  //       { sensorName: "4000", sensor: 500 },
  //       { sensorName: "6000", sensor: 555 },
  //       { sensorName: "8000", sensor: 400 },
  //       { sensorName: "12000", sensor: 200 },
  //     ],
  //     valueScalesMX: [
  //       { sensorName: "gear 1", sensor: 6000 },
  //       { sensorName: "gear 2", sensor: 8550 },
  //     ],
  //     bar: {
  //       fills: [
  //         { color: "#E84118", stop: 35 },
  //         { color: "#FBC531", stop: 45 },
  //         { color: "#4CD137", stop: 55 },
  //         { color: "#FBC531", stop: 65 },
  //         { color: "#E84118" },
  //       ],
  //       fillMode: "discrete",
  //     },
  //   },
  //   about:
  //     "The McLaren F1, conceived in 1991 by legendary engineer Gordon Murray, is widely regarded as one of the greatest road cars ever built. Designed with a singular focus on driving purity, performance, and innovation, the F1 was created without compromise and with technology inspired directly by Formula One racing. At its core, the McLaren F1 features a naturally aspirated 6.1-liter BMW V12 engine, producing 618 horsepower. Combined with an ultra-lightweight carbon-fiber monocoque chassis—the first of its kind in a production road car—the F1 delivered extraordinary performance while maintaining remarkable balance and reliability. One of its most distinctive features is the central driving position, placing the driver in the middle of the car with two passenger seats slightly behind on either side. This layout was chosen to provide perfect weight distribution, unmatched visibility, and a true race-car driving experience.",
  // },
  // {
  //   title: "w11",
  //   description: "Babbu Maan",
  //   src: w11,
  //   scale: [500, 500, 500],
  //   position: [0, 2.5, -2],
  //   rotation: [0, -0.7, 0], //Math.PI
  //   chartData: {
  //     series1: [
  //       { sensorName: "0", sensor: 0 },
  //       { sensorName: "2000", sensor: 300 },
  //       { sensorName: "4000", sensor: 600 },
  //       { sensorName: "6000", sensor: 500 },
  //       { sensorName: "8000", sensor: 450 },
  //       { sensorName: "12000", sensor: 300 },
  //     ],
  //     series2: [
  //       { sensorName: "0", sensor: 210 },
  //       { sensorName: "2000", sensor: 280 },
  //       { sensorName: "4000", sensor: 500 },
  //       { sensorName: "6000", sensor: 555 },
  //       { sensorName: "8000", sensor: 400 },
  //       { sensorName: "12000", sensor: 200 },
  //     ],
  //     valueScalesMX: [
  //       { sensorName: "gear 1", sensor: 6000 },
  //       { sensorName: "gear 2", sensor: 8550 },
  //     ],
  //     bar: {
  //       fills: [
  //         { color: "#E84118", stop: 35 },
  //         { color: "#FBC531", stop: 45 },
  //         { color: "#4CD137", stop: 55 },
  //         { color: "#FBC531", stop: 65 },
  //         { color: "#E84118" },
  //       ],
  //       fillMode: "discrete",
  //     },
  //   },
  //   about:
  //     "The McLaren F1, conceived in 1991 by legendary engineer Gordon Murray, is widely regarded as one of the greatest road cars ever built. Designed with a singular focus on driving purity, performance, and innovation, the F1 was created without compromise and with technology inspired directly by Formula One racing. At its core, the McLaren F1 features a naturally aspirated 6.1-liter BMW V12 engine, producing 618 horsepower. Combined with an ultra-lightweight carbon-fiber monocoque chassis—the first of its kind in a production road car—the F1 delivered extraordinary performance while maintaining remarkable balance and reliability. One of its most distinctive features is the central driving position, placing the driver in the middle of the car with two passenger seats slightly behind on either side. This layout was chosen to provide perfect weight distribution, unmatched visibility, and a true race-car driving experience.",
  // },
  // {
  //   title: "fr2021",
  //   description: "Babbu Maan",
  //   src: fr2021,
  //   scale: [2.1, 1.9, 1.9],
  //   position: [0, 2.5, -2],
  //   rotation: [0, -0.7, 0], //Math.PI
  //   chartData: {
  //     series1: [
  //       { sensorName: "0", sensor: 0 },
  //       { sensorName: "2000", sensor: 300 },
  //       { sensorName: "4000", sensor: 600 },
  //       { sensorName: "6000", sensor: 500 },
  //       { sensorName: "8000", sensor: 450 },
  //       { sensorName: "12000", sensor: 300 },
  //     ],
  //     series2: [
  //       { sensorName: "0", sensor: 210 },
  //       { sensorName: "2000", sensor: 280 },
  //       { sensorName: "4000", sensor: 500 },
  //       { sensorName: "6000", sensor: 555 },
  //       { sensorName: "8000", sensor: 400 },
  //       { sensorName: "12000", sensor: 200 },
  //     ],
  //     valueScalesMX: [
  //       { sensorName: "gear 1", sensor: 6000 },
  //       { sensorName: "gear 2", sensor: 8550 },
  //     ],
  //     bar: {
  //       fills: [
  //         { color: "#E84118", stop: 35 },
  //         { color: "#FBC531", stop: 45 },
  //         { color: "#4CD137", stop: 55 },
  //         { color: "#FBC531", stop: 65 },
  //         { color: "#E84118" },
  //       ],
  //       fillMode: "discrete",
  //     },
  //   },
  //   about:
  //     "The McLaren F1, conceived in 1991 by legendary engineer Gordon Murray, is widely regarded as one of the greatest road cars ever built. Designed with a singular focus on driving purity, performance, and innovation, the F1 was created without compromise and with technology inspired directly by Formula One racing. At its core, the McLaren F1 features a naturally aspirated 6.1-liter BMW V12 engine, producing 618 horsepower. Combined with an ultra-lightweight carbon-fiber monocoque chassis—the first of its kind in a production road car—the F1 delivered extraordinary performance while maintaining remarkable balance and reliability. One of its most distinctive features is the central driving position, placing the driver in the middle of the car with two passenger seats slightly behind on either side. This layout was chosen to provide perfect weight distribution, unmatched visibility, and a true race-car driving experience.",
  // },
  // {
  //   title: "rb19",
  //   description: "Babbu Maan",
  //   src: rb19,
  //   scale: [8, 8, 8],
  //   position: [0, 0, -4],
  //   rotation: [0, -0.7, 0], //Math.PI
  //   chartData: {
  //     series1: [
  //       { sensorName: "0", sensor: 0 },
  //       { sensorName: "2000", sensor: 300 },
  //       { sensorName: "4000", sensor: 600 },
  //       { sensorName: "6000", sensor: 500 },
  //       { sensorName: "8000", sensor: 450 },
  //       { sensorName: "12000", sensor: 300 },
  //     ],
  //     series2: [
  //       { sensorName: "0", sensor: 210 },
  //       { sensorName: "2000", sensor: 280 },
  //       { sensorName: "4000", sensor: 500 },
  //       { sensorName: "6000", sensor: 555 },
  //       { sensorName: "8000", sensor: 400 },
  //       { sensorName: "12000", sensor: 200 },
  //     ],
  //     valueScalesMX: [
  //       { sensorName: "gear 1", sensor: 6000 },
  //       { sensorName: "gear 2", sensor: 8550 },
  //     ],
  //     bar: {
  //       fills: [
  //         { color: "#E84118", stop: 35 },
  //         { color: "#FBC531", stop: 45 },
  //         { color: "#4CD137", stop: 55 },
  //         { color: "#FBC531", stop: 65 },
  //         { color: "#E84118" },
  //       ],
  //       fillMode: "discrete",
  //     },
  //   },
  //   about:
  //     "The McLaren F1, conceived in 1991 by legendary engineer Gordon Murray, is widely regarded as one of the greatest road cars ever built. Designed with a singular focus on driving purity, performance, and innovation, the F1 was created without compromise and with technology inspired directly by Formula One racing. At its core, the McLaren F1 features a naturally aspirated 6.1-liter BMW V12 engine, producing 618 horsepower. Combined with an ultra-lightweight carbon-fiber monocoque chassis—the first of its kind in a production road car—the F1 delivered extraordinary performance while maintaining remarkable balance and reliability. One of its most distinctive features is the central driving position, placing the driver in the middle of the car with two passenger seats slightly behind on either side. This layout was chosen to provide perfect weight distribution, unmatched visibility, and a true race-car driving experience.",
  // },

  // {
  //   title: "fr296",
  //   description: "Metallica",
  //   src: ferrari296gt3,
  //   scale: [5.2, 5, 5],
  //   position: [0, 2, 0],
  //   rotation: [0, Math.PI, 0],
  //   chartData: {
  //     series1: [
  //       { sensorName: "0", sensor: 0 },
  //       { sensorName: "2000", sensor: 300 },
  //       { sensorName: "4000", sensor: 600 },
  //       { sensorName: "6000", sensor: 500 },
  //       { sensorName: "8000", sensor: 450 },
  //       { sensorName: "12000", sensor: 300 },
  //     ],
  //     series2: [
  //       { sensorName: "0", sensor: 210 },
  //       { sensorName: "2000", sensor: 280 },
  //       { sensorName: "4000", sensor: 500 },
  //       { sensorName: "6000", sensor: 555 },
  //       { sensorName: "8000", sensor: 400 },
  //       { sensorName: "12000", sensor: 200 },
  //     ],
  //     valueScalesMX: [
  //       { sensorName: "gear 1", sensor: 6000 },
  //       { sensorName: "gear 2", sensor: 8550 },
  //     ],
  //     bar: {
  //       fills: [
  //         { color: "#E84118", stop: 35 },
  //         { color: "#FBC531", stop: 45 },
  //         { color: "#4CD137", stop: 55 },
  //         { color: "#FBC531", stop: 65 },
  //         { color: "#E84118" },
  //       ],
  //       fillMode: "discrete",
  //     },
  //   },
  //   about:
  //     "The McLaren F1, conceived in 1991 by legendary engineer Gordon Murray, is widely regarded as one of the greatest road cars ever built. Designed with a singular focus on driving purity, performance, and innovation, the F1 was created without compromise and with technology inspired directly by Formula One racing. At its core, the McLaren F1 features a naturally aspirated 6.1-liter BMW V12 engine, producing 618 horsepower. Combined with an ultra-lightweight carbon-fiber monocoque chassis—the first of its kind in a production road car—the F1 delivered extraordinary performance while maintaining remarkable balance and reliability. One of its most distinctive features is the central driving position, placing the driver in the middle of the car with two passenger seats slightly behind on either side. This layout was chosen to provide perfect weight distribution, unmatched visibility, and a true race-car driving experience.",
  // },
];
