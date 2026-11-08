import React from "react";
import { useFetchData } from "../../../Hooks/useFetchData";
import MorphSlider from "../../../Components/UI/MuseumUI/MorphSlider";
import FlexCarousel from "../../../Components/UI/MuseumUI/FlexCarousel";
import MusGridCard from "../../../Components/Museum/MusGridCard";
import MuseumTabs from "../../../Components/Museum/MuseumTabs";
export const Museum = () => {
  const [data, error, isLoading] = useFetchData(
    "https://strategyhub.onrender.com/server/getcars",
  );
  const items = [
    {
      title: " You cannot describe passion. You can only live it.",
      author: "Enzo Ferrari",
      name: "Ferrari F40",
      img: "https://i.postimg.cc/jSDKZvd9/Glossy-Black-Ferrari-F40-Cutout-(1).png",
    },
    {
      title: "Patience and persistence are the keys to achieving greatness.",
      author: "Carl Benz",
      name: "Mercedes-Benz 300sl Gullwing",
      img: "https://i.postimg.cc/vHNj0sKg/car-no-bg-9.png",
    },
    {
      title:
        "Winning is one thing, but out of losing I always learned more for the future. So I got stronger from losing",
      author: "Niki Lauda",
      name: "Mercedes-AMG F1 W14 (2023)",
      img: "https://i.postimg.cc/h45W5Tzd/Mercedes-AMG-Petronas-F1-Car-Cutout.png",
    },
    {
      title:
        "If one does not fail at times, then one has not challenged himself.",
      author: "Ferdinand Porsche",
      name: "2024 Porsche 992 GT3 R",
      img: "https://i.postimg.cc/4dp7Sswt/Yellow-and-Black-Porsche-GT-Race-Car.png",
    },
    {
      title:
        "You must always strive to be the best, but you must never believe that you are.",
      author: "Juan Manuel Fangio",
      name: "Maserati Tipo 151/3 1964 ",
      img: "https://i.postimg.cc/SKJcVBwd/car-no-bg-11.png",
    },
    {
      title: "I have no idols. I respect hard work, dedication and competence.",
      author: "Ayrton Senna",
      name: "McLaren F1 (1991)",
      img: "https://i.postimg.cc/zG6jNhT9/sennmclr.png",
    },
    {
      title: "Innovation is the ability to see the future.",
      author: "Henry Ford",
      name: "Ford GT40 1966",
      img: "https://i.postimg.cc/yYMjJYtz/car-no-bg-10.png",
    },
  ];
  const items2 = [
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsNFd2QtLTuzqHVnw25bSFviSO6vYt-1pd5xn92geIhq1axKidyRs4gfg&s=10",
      alt: "A chrome sculpture",
      title: "Iridescence",
    },

    {
      src: "https://hips.hearstapps.com/hmg-prod/images/2025-lotus-evija-120-68780193b1201.jpg?crop=1xw:1xh;center,top",
      alt: "A clay bust in profile",
      title: "Clay Study",
      subtitle: "Studio 04",
    },
    // {
    //   src: "https://i.postimg.cc/6p6xfBb7/Ferrari-Enzo-Ferrari-Logo-Rain-Wheel-3Wallpapers-i-Phone-Parallax.jpg",
    //   alt: "A figure on a white set",
    //   title: "White Room",
    // },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8rWABj1F57MWIBdgCxRHxK2F7Une7dn5EKDLbq7xJ66st41jk1CUBBQur&s=10",
      alt: "A clay bust in profile",
      title: "Clay Study",
      subtitle: "Studio 04",
    },
    {
      src: "https://i.postimg.cc/SRZf07q4/mclra.jpg",
      title: "Mclaren",
    },
    {
      src: "https://i.postimg.cc/XJYgszSC/FORD.jpg",
      title: "Ford",
    },
  ];

  return (
    <div className="relative  h-full w-full flex flex-col gap-14 ">
      {/* bg-[#000000]  */}
      <div className="">
        <div
          style={{ height: "1000px", position: "relative" }}
          className="bg-[#0c0c0c] w-full"
        >
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
            imageScale={0.8}
            startScale={0.5}
            autoplayDelay={6}
            loop
            radius={0.5}
            showCaptions
            showControls
            showIndicators
          />
        </div>
        <div className="grid grid-cols-2   gap-[2px] ">
          {data.slice(0, 4).map((item, index) => (
            // <CarsGridCard props={item} index={index} />
            <MusGridCard props={item} index={index} />
          ))}
        </div>
      </div>
      <div style={{ width: "100%", height: "800px", position: "relative" }}>
        <FlexCarousel
          items={items2}
          preset="liquid"
          intro="rise"
          cardHeight={0.65}
          gap={12}
          squeeze={0.2}
          focusOnClick
          captions
          fit="natural"
          radius={0}
          lensWidth={1}
          lensHeight={1.28}
          tilt={62}
          roundness={1}
          bend={0.34}
          reach={0.38}
          curl="twist"
          dispersion={0.45}
          liquid={0}
          followCursor={false}
          autoplay={true}
          interval={4}
          captureWheel
        />
      </div>
      <div>
        <MuseumTabs />
      </div>
    </div>
  );
};
