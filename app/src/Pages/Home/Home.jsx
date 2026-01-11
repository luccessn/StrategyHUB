import React from "react";
import { WorldMapDemo } from "../../Components/Home/WorldMapDemo";
// import { MapTabsDemo } from "../../Components/Home/MapTabs/MapTabsDemo";
import { ExpandableCardDemo } from "../../Components/Home/CardDemo";
// import { WindTunnelDemo } from "../../Components/Home/CarsModels/FullWind";
// import { CarsModels } from "../../Components/Home/CarsModels/CarsModels";
import { CarsCalc } from "../../Components/Home/CarsModels/CarsCalc";
// import { TestCharts } from "../../Components/Home/TestCharts";
import LogoLoop from "../../Components/UI/Border/LogoLoop";
import trackloader from "../../Components/Loads/trackloader";
///Logos
import { SiFerrari } from "react-icons/si";
import { SiF1 } from "react-icons/si";
import { SiFord } from "react-icons/si";
import { SiBmw } from "react-icons/si";
import { SiMercedes } from "react-icons/si";
import { GiRallyTheTroops } from "react-icons/gi";
import { SiNissan } from "react-icons/si";
import { SiMclaren } from "react-icons/si";
import { SiRedbull } from "react-icons/si";
import { SiAudi } from "react-icons/si";
import { SiHonda } from "react-icons/si";
import { AICard } from "../../Components/AI/AICard";
const techLogos = [
  { node: <SiF1 />, title: "F1" },
  { node: <SiMercedes />, title: "Mercedes" },
  { node: <SiFord />, title: "Ford" },
  { node: <SiFerrari />, title: "Ferrari" },
  { node: <SiBmw />, title: "BMW" },
  { node: <GiRallyTheTroops />, title: "Rally" },
  { node: <SiNissan />, title: "Nissan" },
  { node: <SiMclaren />, title: "McLaren" },
  { node: <SiRedbull />, title: "RedBull" },
  { node: <SiAudi />, title: "Audi" },
  { node: <SiHonda />, title: "Honda" },
];

export const Home = () => {
  return (
    <div className=" flex flex-col gap-20 text-white text-3xl">
      <WorldMapDemo />
      {/* <MapTabsDemo /> */}
      <div className="">
        <ExpandableCardDemo />
      </div>

      {/* <div class="sketchfab-embed-wrapper">
        {" "}
        <iframe> </iframe>{" "}
      </div> */}
      {/* <div className="w-full">
        <WindTunnelDemo />
      </div> */}
      {/* <div className="w-full">
        <CarsModels />
      </div> */}
      <div
        style={{ height: "200px", position: "relative", overflow: "hidden" }}
      >
        {/* Basic horizontal loop */}
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

        {/* Vertical loop with deceleration on hover */}
      </div>
      <div className="w-full  ">
        <CarsCalc />
      </div>
      <div className="flex flex-col ">
        <div
          style={{ height: "200px", position: "relative", overflow: "hidden" }}
        >
          {/* Basic horizontal loop */}
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

          {/* Vertical loop with deceleration on hover */}
        </div>
        <div className="">
          <AICard />
        </div>
      </div>
      {/* <CarsFetch /> */}
      {/* <TestCharts /> */}
    </div>
  );
};
