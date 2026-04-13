import React, { useEffect, Suspense, useId, useState } from "react";
import { motion } from "framer-motion";
// import { useOutsideClick } from "../../UI/use-outside-click";
import { Canvas, useFrame } from "@react-three/fiber";
// import { Swiper, SwiperSlide } from "swiper/react";
import {
  OrbitControls,
  Environment,
  Html,
  useGLTF,
  useProgress,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";
// import mclaren1k from "./models/cars/gt3/mclaren_gt3.glb";

// import { TestCharts } from "../TestCharts";
import { Charts } from "./CarsDino/Charts";
import TextType from "../../UI/tx/TextType";
// import DecryptedText from "../../UI/tx/DecryptedText";
import { BrakeAccelr } from "./Brake&Accelr/BrakeAccelr";
import { AeroDynamic } from "./Aerodinamics&G-force/AeroDynamic";
import { CarsFetch } from "./Constants/CarsFetch";
// import mclaren2025 from "./models/cars/f1/2025_mclaren.glb";
//
//
import "./btc.css";

//

///
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "white" }}>{Math.floor(progress)} %</div>
    </Html>
  );
}
const data = [
  { title: "Analytics With Diagrams", card: Charts },
  { title: "Brake & Acceleration", card: BrakeAccelr },
  { title: "Aerodinamics", card: AeroDynamic },
];
function Model({ url, scale, position, rotation }) {
  const gltf = useGLTF(url);
  const { scene, animations } = gltf;
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action.play());
    }

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          if (child.material.map)
            child.material.map.colorSpace = THREE.SRGBColorSpace;
          if (child.material.emissiveMap)
            child.material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
          child.material.envMapIntensity = 1.5;
        }
      }
    });
  }, [actions, scene]);

  //   // ნელი ბრუნვა
  useFrame(() => {
    scene.rotation.y += 0.0008;
  });

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

export const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{
      opacity: 0,
      transition: { duration: 0.05 },
    }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-black"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);

export const CarsCalc = () => {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  // console.log(carsConst);

  const [carsConsta, error, isLoading] = CarsFetch();

  const [selectedCard, setSelectedCard] = useState(null);
  const [active, setactive] = useState(null);
  useEffect(() => {
    if (carsConsta.length > 0 && !selectedCard) {
      setSelectedCard(carsConsta[0]);
      setactive({ ...data[0], card: data[0].card });
    }
  }, [carsConsta, selectedCard]);

  const id = useId();
  useEffect(() => {
    if (data && data.length > 0) {
      setactive(data[0]);
    }
  }, []);
  if (isLoading) {
    return <div className="text-white text-center">Loading cars...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <>
      <div className=" flex flex-col gap-10 ">
        <motion.div
          initial={{ opacity: 0.1, scale: 1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          //dr:04, amount:34
          transition={{ duration: 0.3, ease: "linear" }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className="w-full flex flex-col items-center my-6 ">
            <div className="relative inline-block group">
              <select
                // className="select"
                // className="rounded-sm cursor-target border-1  border-dashed border-black  px-6 py-3 font-semibold  text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                className="cursor-target w-[600px] px-5 py-3 text-xl uppercase font-bold text-white appearance-none cursor-pointer focus:outline-none font-panchangMD bg-[#0f1923]"
                onChange={(e) => {
                  const chosen = carsConsta.find(
                    (c) => c.title === e.target.value,
                  );
                  setSelectedCard(chosen);
                  setactive((prev) => ({
                    ...prev,
                    card: prev.card,
                  }));
                }}
              >
                {carsConsta.map((card) => (
                  <option
                    key={card._id}
                    value={card.title}
                    className="bg-[#0f1923] font-satosIT text-white"
                  >
                    {card.title}
                  </option>
                ))}
              </select>
              {/* <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white">
                ▼
              </span> */}
            </div>
          </div>

          <div className="h-full  ">
            <div className="w-full flex xxl:h-[800px] flex-col xxl:flex-row gap-2">
              <div className="w-full h-[800px]  xxl:h-[800px] ">
                {selectedCard && (
                  <motion.div
                    layoutId={`card-${selectedCard.title}-${id}`}
                    key={selectedCard.title}
                    className="flex h-full flex-col  cursor-pointer bg-cover bg-center bg-no-repeat p-0"
                  >
                    <div className="flex flex-col w-full h-full">
                      <div className="flex flex-col pl-5 gap-2">
                        <h1 className="font-panchangMD text-2xl tracking-wide">
                          {selectedCard.title}
                        </h1>
                      </div>

                      <div className="w-full h-full">
                        <Canvas
                          key={selectedCard.title}
                          shadows
                          dpr={[1, 2]}
                          gl={{
                            antialias: true,
                            physicallyCorrectLights: true,
                            outputColorSpace: THREE.SRGBColorSpace,
                            toneMappingExposure: 1,
                          }}
                          camera={{ position: [-25, 10, 0], fov: 45 }}
                        >
                          <Suspense fallback={<Loader />}>
                            {selectedCard?.src && (
                              <Model
                                url={selectedCard.src}
                                scale={selectedCard.scale}
                                position={selectedCard.position}
                                rotation={selectedCard.rotation}
                              />
                            )}
                            <ambientLight intensity={0.3} />
                            <directionalLight
                              castShadow
                              position={[5, 10, 5]}
                              intensity={1.2}
                            />
                            <spotLight
                              castShadow
                              position={[-5, 8, -5]}
                              intensity={0.8}
                              angle={0.3}
                            />
                            <Environment preset="sunset" background={false} />
                          </Suspense>
                          <OrbitControls
                            target={[0, -0.6, 0]}
                            enableRotate
                            // enableZoom
                            enablePan={false}
                          />
                        </Canvas>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className=" w-full  xxl:w-8/12   text-white h-[600px] xl:h-[600px] xxl:h-[800px] flex flex-col gap-2 xl:gap-5 p-5">
                {selectedCard && (
                  <div className="flex flex-col gap-6">
                    <TextType
                      key={`about-title-${selectedCard.title}`}
                      as="h1"
                      className=" text-4xl xl:text-5xl font-array"
                      text={`About the ${selectedCard.title}`}
                      typingSpeed={40}
                    />

                    <TextType
                      key={`about-title-${selectedCard.about.about1}`}
                      inf={"carscalc"}
                      as="p"
                      className="text-xl hidden xxl:block font-array p-2"
                      text={`${selectedCard.about.about1}\n${selectedCard.about.about2}`}
                      typingSpeed={2}
                    />
                    <TextType
                      key={`about-title-${selectedCard.about.about1}`}
                      inf={"carscalc2"}
                      as="p"
                      className="text-xl rounded-xl rounded-br-none rounded-bl-none font-array p-2 block xxl:hidden bg-white/5 backdrop-blur-xl border border-white/30 shadow-xl"
                      text={`${selectedCard.about.about1}\n${selectedCard.about.about2}`}
                      typingSpeed={2}
                    />

                    {selectedCard.about2 && (
                      <>
                        <hr className="border-white" />
                        <TextType
                          as="h1"
                          className="text-4xl"
                          text="Historical Moments"
                          typingSpeed={40}
                        />
                        <TextType
                          key={`about-title-${selectedCard.about2}`}
                          as="p"
                          className="text-xl"
                          text={selectedCard.about2}
                          typingSpeed={10}
                        />
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.1, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "linear" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* w-4/4  */}
          {/* 1500 mj  */}
          <div className="flex flex-col xxxl:flex-row gap-5 bg-white/0 border-2 border-white/15 backdrop-blur-xl max-w-[785px] mmd:max-w-[900px] lg:max-w-[990px] clg:max-w-[1100px] xl:max-w-[1250px] cxl:max-w-[1400px] xxl:max-w-[1500px] xxxl:max-w-[1800px] mx-auto p-5 rounded-sm h-[800px] ">
            <div className="flex flex-row xxxl:flex-col">
              {data.map((card) => (
                <motion.div
                  layoutId={`card-${card.title}-${id}`}
                  onClick={() => setactive(card)}
                  className={`p-4  backdrop-blur-md  cursor-target rounded-xl cursor-pointer transition ${
                    active?.title === card.title
                      ? "bg-neutral-800"
                      : "hover:bg-neutral-800"
                  }`}
                >
                  <div className="flex justify-center items-center flex-col">
                    <motion.h3
                      layoutId={`title-${card.title}-${id}`}
                      className="font-panchang text-neutral-200 text-center text-sm xxxl:text-base"
                    >
                      {card.title}
                    </motion.h3>
                    {/* <motion.p
                      layoutId={`description-${card.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-center text-sm"
                    >
                      {card.descr}
                    </motion.p> */}
                  </div>
                </motion.div>
              ))}
            </div>
            {selectedCard && (
              <div className=" w-[750px] mmd:w-[850px] lg:w-[950px]  clg:w-[1050px]  xl:w-[1200px] cxl:w-[1350px] overflow-x-auto xxl:w-full   h-full mx-auto ">
                {active && (
                  <motion.div
                    key={selectedCard.title}
                    layoutId={`info-${selectedCard.title}-${id}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }} // გასწორებულია
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mt-8 flex gap-6 flex-row mx-auto shadow p-6 rounded-xl"
                  >
                    <div className="h-full  w-full">
                      <active.card
                        title={selectedCard.title}
                        dino={selectedCard.dino}
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
        {/* <div className="flex flex-row gap-10 bg-red-400 w-full ">
            <select
              className="w-[200px] max-w-md p-3 rounded-xl border bg-red-400 text-neutral-800 dark:text-neutral-200"
              value={selectedCard.title}
              onChange={(e) => {
                const chosen = carsConst.find(
                  (c) => c.title === e.target.value
                );
                setSelectedCard(chosen);
              }}
            >
              {carsConst.map((card) => (
                <option key={card.title} value={card.title}>
                  {card.title}
                </option>
              ))}
            </select>
            <div className=" h-full w-full ">
              <Charts
                title={selectedCard.title}
                chartData={selectedCard.chartData}
              />
            </div>
          </div> */}
      </div>
    </>
  );
};
//
//
{
  /* <div>
                <TextType
                  text={["Text typing effect"]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
                <h1 className="text-4xl"> About the {selectedCard.title}</h1>
                <p className="text-xl">{selectedCard.about}</p>
              </div>
              {selectedCard.about2 && (
                <div>
                  <hr className="border-white" />
                  <h1 className="text-4xl">Historical Moments</h1>
                  <p className="text-xl">{selectedCard.about2}</p>
                </div>
              )} */
}
{
  /* <DecryptedText text="Hover me!" /> */
}

{
  /* <DecryptedText
                text="Customize me"
                speed={100}
                maxIterations={20}
                characters="ABCD1234!?"
                className="revealed"
                parentClassName="all-letters"
                encryptedClassName="encrypted"
              /> */
}

{
  /* Example 3: Animate on view (runs once) */
}
{
  /* <div className="flex flex-col gap-6">
                <DecryptedText
                  as="h1"
                  className="text-4xl"
                  text={`About the ${selectedCard.title}`}
                  animateOn="view"
                  revealDirection="center"
                />

                <DecryptedText
                  as="p"
                  className="text-xl"
                  text={selectedCard.about}
                  animateOn="view"
                  revealDirection="center"
                />

                {selectedCard.about2 && (
                  <>
                    <hr className="border-white" />

                    <DecryptedText
                      as="h1"
                      className="text-4xl"
                      text="Historical Moments"
                      animateOn="view"
                      revealDirection="center"
                    />

                    <DecryptedText
                      as="p"
                      className="text-xl"
                      text={selectedCard.about2}
                      animateOn="view"
                      revealDirection="center"
                    />
                  </>
                )}
              </div> */
}
