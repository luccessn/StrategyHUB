import React from "react";
import { useFetchData } from "../../../Hooks/useFetchData";
import MorphSlider from "../../../Components/UI/MuseumUI/MorphSlider";
import MusGridCard from "../../../Components/Museum/MusGridCard";
export const Museum = () => {
  const [data, error, isLoading] = useFetchData(
    "https://strategyhub.onrender.com/server/getcars",
  );
  const items = [
    {
      image: "https://i.postimg.cc/Kjv3jrqB/cropped-image.png",
    },
    {
      image: "https://i.postimg.cc/zG6jNhT9/sennmclr.png",
    },
    {
      image:
        "https://images.unsplash.com/photo-1776394254711-4a0d7345269a?q=80&w=1600&auto=format&fit=crop",
    },
  ];
  return (
    <div className="relative backdrop-blur-sm h-full w-full flex flex-col gap-5 p-4">
      <div style={{ height: "1000px", position: "relative" }}>
        <MorphSlider
          items={items}
          transition="melt"
          intensity={0.55}
          aberration={0.35}
          drift={0.4}
          autoplay={true}
          overlayColor="#05060a"
          duration={1.1}
          ease="power2.inOut"
          caption
          scale={2.4}
          autoplayDelay={4}
          loop
          radius={0.5}
          showCaptions
          showControls
          showIndicators
        />
      </div>
      <div className="grid grid-cols-2   gap-[6px] ">
        {data.slice(0, 4).map((item, index) => (
          // <CarsGridCard props={item} index={index} />
          <MusGridCard props={item} index={index} />
        ))}
      </div>
    </div>
  );
};
