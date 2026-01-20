import React, { useId, useRef, Suspense, useEffect } from "react";
import { PlaceholdersAndVanishInput } from "../UI/PlaceholdersForAi/PlaceHoldersForAI";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { FaUserAstronaut } from "react-icons/fa";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Html,
  useGLTF,
  useProgress,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";
import "./switches.css";

/// robots

import { RiRobot3Fill } from "react-icons/ri";
import TextType from "../UI/tx/TextType";
//arows
import { IoChevronBack } from "react-icons/io5";
import { useFetchData } from "../../Hooks/useFetchData";
import { CarsFetch } from "../Home/CarsModels/Constants/CarsFetch";
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "white" }}>{Math.floor(progress)} %</div>
    </Html>
  );
}
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
const steps = [
  {
    key: "track",
    label: "Where did you race?",
    options: [
      { name: "Suzuka", id: "6963ee50c4aeb7074eb7cbde" },
      { name: "Circuit de Monaco", id: "696e8d8e7456404b71d8a411" },
      { name: "Albert Park Circuit", id: "696e8d9a7456404b71d8a413" },
      { name: "Circuit de Spa-Francorchamps", id: "696e8da47456404b71d8a415" },
      { name: "Autodromo Nazionale Monza", id: "696e8dae7456404b71d8a417" },
    ],
  },
  {
    key: "car",
    label: "Which car did you use?",
    options: [
      { name: "Mclaren F1 1991", id: "6963ee5fc4aeb7074eb7cbdf" },
      { name: "Lotus 49C 1968", id: "696e8cb27456404b71d8a40f" },
    ],
  },
  { key: "lapTime", label: "What was your lap time?", type: "input" },
  {
    key: "weather",
    label: "What was the weather?",
    options: [
      { name: "Sunny", id: "1" },
      { name: "Rainy", id: "2" },
    ],
  },
  {
    key: "tyre",
    label: "Which tyre did you use?",
    options: [
      { name: "Soft", id: "1" },
      { name: "Medium", id: "2" },
      { name: "Hard", id: "3" },
      { name: "Intermediate", id: "4" },
      { name: "Full Wet", id: "5" },
    ],
  },
  {
    key: "goal",
    label: "What was your goal?",
    options: [
      { name: "Fast lap", id: "1" },
      { name: "Win race", id: "2" },
      { name: "Qualifaing", id: "2" },
    ],
  },
];

export const AICard = () => {
  const [inputValue, setinputValue] = useState("");
  const [submittedText, setSubmittedText] = useState([]);
  const placeholders = [
    "Which car , bolid are you  driving?",
    "Which track are you racing on?",
    "What tyres are you using?",
    "What lap time did you achieve? ",
    "What is your goal or purpose?",
  ];
  const handleChange = (e) => {
    setinputValue(e.target.value);
  };
  const handleScroll = useRef(false);
  const [isLoading, setisLoading] = useState(false);
  const [switchs, setswitchs] = useState("chat");
  const [postStrategy, setpostStrategy] = useState({
    trackID: "",
    carID: "",
    track: "",
    car: "",
    lapTime: "",
    weather: "",
    tyre: "",
    goal: "",
  });
  const [currentStep, setcurrentStep] = useState(0);
  // const [carsConsta, error, isLoadiner] = CarsFetch();
  const onSubmit = async (e) => {
    e.preventDefault();
    // if (!handleScroll.current) {
    //   window.scrollTo({
    //     top: window.scrollY + 800,
    //     behavior: "smooth",
    //   });
    //   handleScroll.current = true;
    // }
    if (!inputValue.trim()) return;
    window.scrollTo({
      top: window.scrollY + 200,
      behavior: "smooth",
    });
    setSubmittedText((prev) => [
      ...prev,
      { role: "user", content: inputValue },
    ]);

    setinputValue("");
    setisLoading(true);
    try {
      const response = await fetch(
        "https://pythonestrategyhub.onrender.com/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: inputValue }),
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();

      setSubmittedText((prev) => [
        ...prev,
        { role: "Bot", content: data.reply },
      ]);
    } catch (error) {
      console.log("dadada", error);
    } finally {
      setisLoading(false);
    }
  };
  const ChangeInput = (e) => {
    const { name, value } = e.target;
    const selectedId = e.target.selectedOptions?.[0]?.dataset?.id || "";
    setpostStrategy((prev) => ({
      ...prev,
      [name]: value,
      ...(selectedId ? { [`${name}ID`]: selectedId } : {}),
    }));
  };
  // const carID = postStrategy.carID;
  // const selectedCar = carsConsta?.find((car) => car.id === carID);
  // console.log(selectedCar);
  const step = steps[currentStep];
  // const [showStrategyResult, setShowStrategyResult] = useState(false);
  const postMTH = async () => {
    if (currentStep === steps.length - 1) {
      console.log(postStrategy);

      setSubmittedText((prev) => [
        ...prev,
        {
          role: "user",
          content: `Track: ${postStrategy.track} , Bolid was ${postStrategy.car} , The lap time i had ${postStrategy.lapTime} in ${postStrategy.weather} weather with ${postStrategy.tyre} tyre and My goal is to ${postStrategy.goal}`,
        },
      ]);

      setpostStrategy({
        track: "",
        car: "",
        lapTime: "",
        weather: "",
        tyre: "",
        goal: "",
      });
      setisLoading(true);
      try {
        const response = await fetch(
          "https://pythonestrategyhub.onrender.com/strategy",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              track_id: postStrategy.trackID,
              car_id: postStrategy.carID,
              lap_time: postStrategy.lapTime,
              weather: postStrategy.weather,
              tyre: postStrategy.tyre,
              goal: postStrategy.goal,
            }),
          },
        );

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();

        setSubmittedText((prev) => [
          ...prev,
          {
            role: "Bot",
            // content: `${data.explanation}\n\nCar info: ${selectedCar ? selectedCar.title : "No car selected"}`,
            content: data.explanation,
          },
        ]);
        // setShowStrategyResult(true);
      } catch (error) {
        console.log("dadada", error);
      } finally {
        setisLoading(false);
      }
      return;
    }
    setcurrentStep((s) => s + 1);
  };
  return (
    <div className="  flex flex-col justify-center mt-10 mb-40  items-center px-4">
      <h2 className=" font-panchangSB mb-10 sm:mb-20 text-3xl text-center sm:text-5xl text-white ">
        Ask For Your Strategy Hub
      </h2>
      {submittedText.length > 0 && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-[1200px] h-[950px] bg-zinc-900 text-white px-5 py-3 rounded-lg shadow-lg flex flex-col"
          >
            {/* CHAT MESSAGES */}
            <div className="flex-1 flex flex-col gap-8 overflow-y-auto pb-28">
              {submittedText.map((data, index) => (
                <div key={index}>
                  {/* BOT MESSAGE */}
                  {data.role === "Bot" && (
                    <div className="flex flex-col gap-3">
                      <div>
                        <div className="flex items-center justify-center w-11 h-11 bg-blue-600/80 rounded-full shadow-md">
                          <RiRobot3Fill className="text-3xl text-white" />
                        </div>

                        <div className="bg-blue-600 max-w-[550px] text-zinc-100 p-3 px-4 rounded-2xl rounded-bl-none shadow-lg">
                          <TextType
                            as="p"
                            className="text-lg font-satosIT font-bold leading-relaxed"
                            text={data.content}
                            typingSpeed={10}
                          />
                        </div>
                      </div>
                      {/* {showStrategyResult && selectedCar && (
                        <motion.div
                          layoutId={`card-${selectedCar.title}`}
                          key={selectedCar.title}
                          className="flex h-[400px] w-[550px] flex-col cursor-pointer bg-cover bg-center bg-no-repeat p-0"
                          style={{
                            backgroundImage:
                              "url('https://img.freepik.com/free-photo/glass-background-with-frosted-pattern_53876-139919.jpg?semt=ais_hybrid&w=740&q=80')",
                          }}
                        >
                          <div className="flex flex-col pl-5 gap-2">
                            <h1 className="font-panchangMD text-2xl tracking-wide">
                              {selectedCar.title}
                            </h1>
                          </div>
                          <Canvas
                            key={selectedCar.title}
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
                              <Model
                                url={selectedCar.src}
                                scale={selectedCar.scale}
                                position={selectedCar.position}
                                rotation={selectedCar.rotation}
                              />
                              <ambientLight intensity={0.3} />
                              <directionalLight
                                castShadow
                                position={[5, 10, 5]}
                                intensity={1.2}
                                shadow-mapSize-width={2048}
                                shadow-mapSize-height={2048}
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
                              enableZoom={false}
                              enablePan={false}
                            />
                          </Canvas>
                        </motion.div>
                      )} */}
                    </div>
                  )}
                  {/* USER MESSAGE */}
                  {data.role === "user" && (
                    <div className="flex justify-end gap-3 w-full">
                      <div className="bg-zinc-700/80 text-zinc-100 max-w-[450px] pb-2 px-4 rounded-2xl rounded-br-none shadow-lg break-words whitespace-pre-wrap">
                        <TextType
                          as="p"
                          className="text-lg font-satosIT font-bold leading-relaxed"
                          text={data.content}
                          typingSpeed={20}
                        />
                      </div>
                      <div className="flex items-center justify-center w-11 h-11 bg-zinc-700 rounded-full shadow-md">
                        <FaUserAstronaut className="text-blue-400 text-3xl" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex items-center justify-center w-11 h-11 bg-blue-600/80 rounded-full shadow-md">
                    <RiRobot3Fill className="text-3xl text-white" />
                  </div>

                  <div className="flex items-center gap-2 bg-blue-600/60 px-4 py-3 rounded-2xl rounded-bl-none shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-200 animate-bounce" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-200 animate-bounce [animation-delay:-.2s]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-200 animate-bounce [animation-delay:-.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* INPUT (STICKY BOTTOM) */}
            <div className=" bottom-0 z-50 flex  flex-row justify-center gap-4 ml-40  pt-4">
              <div>
                {switchs === "chat" ? (
                  <div className="z-50">
                    {" "}
                    <PlaceholdersAndVanishInput
                      placeholders={placeholders}
                      onChange={handleChange}
                      onSubmit={onSubmit}
                      value={inputValue}
                    />
                  </div>
                ) : (
                  <div className="  flex flex-row gap-10 mx-auto   ">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">
                        Step {currentStep + 1} of {steps.length}
                      </p>

                      <h2 className="text-white text-lg mb-4">{step.label}</h2>

                      {step.type === "input" ? (
                        <input
                          type="text"
                          name={step.key}
                          value={postStrategy[step.key]}
                          onChange={ChangeInput}
                          placeholder="Type here..."
                          className="w-72 p-4 rounded-2xl rounded-br-none text-lg bg-[#302f2f] text-white"
                        />
                      ) : (
                        <select
                          name={step.key}
                          value={postStrategy[step.key]}
                          data-id={
                            step.options.find(
                              (opt) => opt.name === postStrategy[step.key],
                            )?.id || ""
                          }
                          onChange={ChangeInput}
                          className="w-72 p-4 rounded-2xl text-lg bg-[#302f2f] text-white"
                        >
                          <option value="">Select an option</option>
                          {step.options.map((opt) => (
                            <option
                              key={opt.name}
                              value={opt.name}
                              data-id={opt.id}
                            >
                              {opt.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div className="flex justify-between gap-4 mt-20">
                      {/* <button className="text-gray-400 text-2xl  disabled:opacity-30">
                      <IoChevronBack />
                    </button> */}

                      <button
                        disabled={currentStep === 0}
                        onClick={() => setcurrentStep((s) => s - 1)}
                        className="cursor-target  font-array text-lg w-[70px]  h-[40px]  transition-all bg-blue-500 text-white  rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                      >
                        Prev
                      </button>

                      {/* <button className="bg-purple-700 px-4 py-2 rounded-lg text-white disabled:opacity-30">
                      {currentStep === steps.length - 1 ? "Finish" : "Next"}
                    </button> */}

                      <button
                        disabled={!postStrategy[step.key]}
                        onClick={postMTH}
                        className={`cursor-target font-array text-lg w-[70px]  h-[40px] transition-all  text-white   rounded-lg

border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]  ${currentStep === steps.length - 1 ? "bg-green-500 border-green-600" : " bg-blue-500 border-blue-600"}`}
                      >
                        {currentStep === steps.length - 1 ? "Send" : "Next"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div
                className={`cyber-signboard  ${switchs === "strategy" ? "relative top-10" : "top-0"}`}
              >
                <div className="cyber-switch">
                  <input
                    type="radio"
                    id="cyber-opt-1"
                    name="cyber-mode"
                    defaultChecked
                  />
                  <label
                    htmlFor="cyber-opt-1"
                    className="cyber-label"
                    onClick={() => setswitchs("chat")}
                  >
                    <svg
                      class="icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span class="glare"></span>
                  </label>

                  <input type="radio" id="cyber-opt-2" name="cyber-mode" />
                  <label
                    htmlFor="cyber-opt-2"
                    className="cyber-label"
                    onClick={() => setswitchs("strategy")}
                  >
                    <svg
                      class="icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="3" y="3" width="7" height="9"></rect>
                      <rect x="14" y="3" width="7" height="5"></rect>
                      <rect x="14" y="12" width="7" height="9"></rect>
                      <rect x="3" y="16" width="7" height="5"></rect>
                    </svg>
                    <span class="glare"></span>
                  </label>

                  {/* <input type="radio" id="cyber-opt-3" name={uid} />
                  <label htmlFor="cyber-opt-3" className="cyber-label">
                    ...
                  </label> */}

                  <div className="cyber-highlight">
                    <div className="highlight-inner" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {submittedText.length == 0 && (
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
          value={inputValue}
        />
      )}
    </div>
  );
};
