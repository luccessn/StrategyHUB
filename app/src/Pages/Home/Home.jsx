import React, { useEffect, Suspense } from "react";
import { WorldMapDemo } from "../../Components/Home/WorldMapDemo";
import { motion } from "framer-motion";
import { ExpandableCardDemo } from "../../Components/Home/CardDemo";
import { CarsCalc } from "../../Components/Home/CarsModels/CarsCalc";
import LogoLoop from "../../Components/UI/Border/LogoLoop";
import trackloader from "../../Components/Loads/trackloader";
///Logos
import { SiFerrari } from "react-icons/si";
import { SiF1 } from "react-icons/si";
import { SiFord } from "react-icons/si";
import { SiBmw } from "react-icons/si";
import { TbBrandMercedes } from "react-icons/tb";
import { GiRallyTheTroops } from "react-icons/gi";
import { SiNissan } from "react-icons/si";
import { SiMclaren } from "react-icons/si";
import { SiRedbull } from "react-icons/si";
import { SiAudi } from "react-icons/si";
import { SiHonda } from "react-icons/si";
import { SiAstonmartin } from "react-icons/si";
import { AICard } from "../../Components/AI/AICard";
import { TyresModels } from "../../Components/Home/TyresModels";
import { useAppContext } from "../../Context/AppContextProvider";

const techLogos = [
  { node: <SiF1 />, title: "F1" },
  { node: <TbBrandMercedes />, title: "Mercedes" },
  { node: <SiFord />, title: "Ford" },
  { node: <SiFerrari />, title: "Ferrari" },
  { node: <SiBmw />, title: "BMW" },
  { node: <GiRallyTheTroops />, title: "Rally" },
  { node: <SiNissan />, title: "Nissan" },
  { node: <SiMclaren />, title: "McLaren" },
  { node: <SiRedbull />, title: "RedBull" },
  { node: <SiAudi />, title: "Audi" },
  { node: <SiHonda />, title: "Honda" },
  { node: <SiAstonmartin />, title: "AstonMartin" },
];

export const Home = () => {
  const { state } = useAppContext();
  console.log(state);
  return (
    <div className=" flex overflow-x-hidden flex-col gap-14 text-white text-3xl">
      <WorldMapDemo />
      <div className="">
        <ExpandableCardDemo />
      </div>
      <div className="flex flex-col ">
        <motion.div
          initial={{ opacity: 0.1, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "linear" }}
          viewport={{ once: false, amount: 0.4 }}
        >
          <div
            style={{
              height: "200px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <LogoLoop
              logos={techLogos}
              speed={120}
              direction="left"
              logoHeight={55}
              gap={45}
              hoverSpeed={80}
              scaleOnHover
              fadeOut
              // fadeOutColor="#000000"
              ariaLabel="Technology partners"
            />
          </div>
        </motion.div>
        <div>
          <TyresModels />
        </div>
      </div>
      <div className="w-full  ">
        <CarsCalc />
      </div>

      <div className="flex flex-col ">
        <div
          style={{ height: "200px", position: "relative", overflow: "hidden" }}
        >
          <motion.div
            initial={{ opacity: 0.1, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: "linear" }}
            viewport={{ once: false, amount: 0.4 }}
          >
            <LogoLoop
              logos={techLogos}
              speed={120}
              direction="left"
              logoHeight={55}
              gap={45}
              hoverSpeed={80}
              scaleOnHover
              fadeOut
              // fadeOutColor="#ffffff"
              ariaLabel="Technology partners"
            />
          </motion.div>
        </div>
        <div>
          <AICard />
        </div>
      </div>
      {/* <CarsFetch /> */}
      {/* <TestCharts /> */}
    </div>
  );
};
//  <motion.div
//     initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
//     whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
//     transition={{
//       duration: 0.9,
//       ease: [0.25, 0.1, 0.25, 1],
//     }}
//     viewport={{
//       once: true,
//       amount: 0.3,
//     }}
//   ></motion.div>
