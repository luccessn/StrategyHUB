"use client";
import { WorldMap } from "../UI/WorldMap";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { LinkPreview } from "../UI/WorldMap/link-preview";
import { useFetchData } from "../../Hooks/useFetchData";
const demoDots = [
  {
    start: { lat: -40.8497, lng: 144.968, label: "Australia GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 7.0325, lng: 55.5106, label: "Bahrain GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 9.6333, lng: 43.1047, label: "Saudi Arabia GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 24.3725, lng: 46.8533, label: "Azerbaijan GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 10.958, lng: -82.238, label: "Miami GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 32.3531, lng: 10.7147, label: "Imola GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 27.3531, lng: 14.8147, label: "Monza GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 36.7347, lng: 10.4206, label: "Monaco GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 25.57, lng: -2.2611, label: "Spain GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 50.5058, lng: -110.5267, label: "Canada GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 38.2197, lng: 17.7647, label: "Austria GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 43.071, lng: -2.016, label: "Silverstone GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 32.5789, lng: 20.2486, label: "Hungary GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 35.7347, lng: 2.9714, label: "Belgium GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 40.7347, lng: 6.5403, label: "Netherlands GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  //   {
  //     start: { lat: 45.6156, lng: 9.2811, label: "Monza GP" },
  //   },
  {
    start: { lat: 25.2914, lng: 103.8641, label: "China GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: -16.2914, lng: 103.8641, label: "Singapore GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 22.8392, lng: 140.5377, label: "Japan GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 30.1328, lng: -97.6359, label: "USA GP" }, //
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 8.404, lng: -103.0901, label: "Mexico GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: -28.7036, lng: -50.6997, label: "Brazil GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 36.1255, lng: -115.1711, label: "Las Vegas GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 3.378, lng: 47.4828, label: "Qatar GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
  {
    start: { lat: 3.4672, lng: 57.6031, label: "Abu Dhabi GP" },
    src: "https://www.supercars.net/blog/wp-content/uploads/2017/08/ferrar-f40-rear.jpg",
  },
];
export function WorldMapDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-200px 0px 0px 0px",
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);
  const [data, error, isLoading] = useFetchData(
    "http://localhost:5000/server/gettracks",
  );
  return (
    <div className=" relative -top-10   w-full ">
      <WorldMap dots={data} />
      <div className="top-shadow absolute left-0 top-2 w-full h-[180px] bg-gradient-to-b from-black to-transparent"></div>

      <div className="max-w-7xl mx-auto text-center" ref={ref}>
        <p className="font-panchangSB text-xl md:text-4xl text-white ">
          Welcome to{" "}
          <span className="text-neutral-400">
            {"Strategy Hub".split("").map((letter, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={hasAnimated ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm font-satosIT md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          We are analyzing your car, track, and intentions to build the smartest
          strategy for your race — from high-pressure competition to laid-back
          driving.
        </p>
      </div>
    </div>
  );
}
