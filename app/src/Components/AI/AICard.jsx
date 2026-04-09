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
import { CiChat1 } from "react-icons/ci";
import { PiStrategy } from "react-icons/pi"; /// robots

import { RiRobot3Fill } from "react-icons/ri";
import TextType from "../UI/tx/TextType";
//arows
import { IoChevronBack } from "react-icons/io5";
import { useFetchData } from "../../Hooks/useFetchData";
import { CarsFetch } from "../Home/CarsModels/Constants/CarsFetch";
import { BackgroundLines } from "../UI/Background-lines";
import { useAppContext } from "../../Context/AppContextProvider";
import { freeAccess } from "../../Context/AppActionsCreator";
import { AccessCountDown } from "./AccessCountDown";
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
// const steps = [
//   {
//     key: "track",
//     label: "Where did you race?",
//     options: [
//       { name: "Suzuka", id: "6963ee50c4aeb7074eb7cbde" },
//       { name: "Circuit de Monaco", id: "696e8d8e7456404b71d8a411" },
//       { name: "Albert Park Circuit", id: "696e8d9a7456404b71d8a413" },
//       { name: "Circuit de Spa-Francorchamps", id: "696e8da47456404b71d8a415" },
//       { name: "Autodromo Nazionale Monza", id: "696e8dae7456404b71d8a417" },
//     ],
//   },
//   {
//     key: "car",
//     label: "Which car did you use?",
//     options: [
//       { name: "Mclaren F1 1991", id: "6963ee5fc4aeb7074eb7cbdf" },
//       { name: "Lotus 49C 1968", id: "696e8cb27456404b71d8a40f" },
//     ],
//   },
//   { key: "lapTime", label: "What was your lap time?", type: "input" },
//   {
//     key: "weather",
//     label: "What was the weather?",
//     options: [
//       { name: "Sunny", id: "1" },
//       { name: "Rainy", id: "2" },
//     ],
//   },
//   {
//     key: "tyre",
//     label: "Which tyre did you use?",
//     options: [
//       { name: "Soft", id: "1" },
//       { name: "Medium", id: "2" },
//       { name: "Hard", id: "3" },
//       { name: "Intermediate", id: "4" },
//       { name: "Full Wet", id: "5" },
//     ],
//   },
//   {
//     key: "goal",
//     label: "What is your goal?",
//     options: [
//       { name: "Fast lap", id: "1" },
//       { name: "Win race", id: "2" },
//       { name: "Qualifaing", id: "3" },
//     ],
//   },
// ];

export const AICard = () => {
  const [data] = useFetchData("http://localhost:5000/server/gettracks");
  const [cardata] = useFetchData("http://localhost:5000/server/getcars");
  const { state, dispatch } = useAppContext();
  const steps = [
    {
      key: "track",
      label: "Where did you race?",
      options: Array.isArray(data)
        ? data.map((item) => ({
            name: item.name,
            id: item._id,
          }))
        : [],
    },
    {
      key: "car",
      label: "Which car did you use?",
      options: Array.isArray(cardata)
        ? cardata.map((item) => ({
            name: item.title,
            id: item._id,
          }))
        : [],
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
      label: "What is your goal?",
      options: [
        { name: "Fast lap", id: "1" },
        { name: "Win race", id: "2" },
        { name: "Qualifaing", id: "3" },
      ],
    },
  ];
  console.log(steps);

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
  const [openBlocked, setopenBlocked] = useState(false);
  const [requestCount, setrequestCount] = useState(0);
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
        setrequestCount((prev) => {
          const newCount = prev + 1;
          if (newCount >= 2) {
            setopenBlocked(true);
          }
          return newCount;
        });

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
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "linear" }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="  flex flex-col justify-center mt-10 mb-40  items-center px-4">
        <h2 className=" font-panchangSB mb-10 sm:mb-20 text-3xl text-center sm:text-5xl text-white ">
          Ask For Your Strategy Hub
        </h2>
        {submittedText.length > 0 && (
          // <BackgroundLines className="flex w-full items-center justify-center flex-col px-4">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-[1400px] h-[950px]  bg-white/5 backdrop-blur-xl text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 flex flex-col"
            >
              {/* && switchs === "strategy"  */}
              {state.subscription.free.freeAccess === false ? (
                <div className="relative top-2 z-50">
                  <div className="absolute inset-0 pointer-events-none" />
                  <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-20">
                    <div className="max-w-4xl text-center">
                      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm">
                        3-Hour Free Access for All Users →
                      </div>

                      <h1 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-6xl md:text-8xl">
                        Enjoy Full Access for 3 Hours — Free.
                      </h1>

                      <p className="mx-auto mb-10 max-w-2xl text-base text-white/60 sm:text-xl">
                        Every guest and registered user gets 3 hours of free
                        access to explore our strategy generation tools.
                        Experience personalized strategies, expert-level
                        insights, and powerful planning features — no commitment
                        required. Upgrade anytime to continue without limits.
                      </p>

                      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <button
                          onClick={() => dispatch(freeAccess())}
                          className="group cursor-target relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-medium text-black transition-all hover:bg-white/90 hover:scale-105"
                        >
                          Get Free Access
                        </button>
                        <button className="inline-flex cursor-target h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30">
                          View Documentation
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : state.subscription.free.freeAccess === "used" &&
                switchs === "strategy" ? (
                <div className="relative top-2 z-50">
                  <div className="absolute inset-0  pointer-events-none" />
                  <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-20">
                    <div className="max-w-4xl text-center">
                      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm">
                        Free Limit Reached &rarr;
                      </div>

                      <h1 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-6xl md:text-8xl">
                        Free Limit has been reached.
                      </h1>

                      <p className="mx-auto mb-10 max-w-2xl text-base text-white/60 sm:text-xl">
                        To continue using the strategy generation feature,
                        please consider subscribing to one of our affordable
                        plans. With a subscription, you'll gain unlimited access
                        to personalized strategies, expert insights, and
                        priority support.
                      </p>

                      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <button className="group cursor-target relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-medium text-black transition-all hover:bg-white/90 hover:scale-105">
                          Get Subscription
                        </button>

                        <button className="inline-flex cursor-target h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30">
                          View Documentation
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-8 overflow-y-auto pb-28">
                  <AccessCountDown />
                  {submittedText.map((data, index) => (
                    <div key={index}>
                      {data.role === "Bot" && (
                        <div className="flex flex-row  gap-3">
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
              )}
              {/* INPUT (STICKY BOTTOM) */}
              {/* <div className=" bottom-0 z-50 flex  flex-row justify-center gap-4 ml-40  pt-4"> */}
              <div className="  absolute bottom-10  left-1/2 -translate-x-1/2 z-50 flex flex-row gap-4 pt-4 px-6 py-4 bg-white/10  backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl ">
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

                        <h2 className="text-white text-lg mb-4">
                          {step.label}
                        </h2>

                        {step.type === "input" ? (
                          <input
                            type="text"
                            name={step.key}
                            value={postStrategy[step.key]}
                            onChange={ChangeInput}
                            placeholder="Type here..."
                            className="w-72 p-4   text-lg bg-[#302f2f] text-white"
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
                            disabled={openBlocked}
                            className={`w-72 p-4 rounded-tl-2xl cursor-target rounded-br-2xl text-lg 
    ${openBlocked ? "bg-gray-600 text-gray-300 cursor-not-allowed" : "bg-[#202020] text-white"}
  `}
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
                        <button
                          disabled={currentStep === 0 || openBlocked}
                          onClick={() => setcurrentStep((s) => s - 1)}
                          className={`cursor-target font-array text-lg w-[70px]  h-[40px] transition-all  text-white   rounded-lg

border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] 
    ${openBlocked ? "bg-gray-500 border-gray-400 text-gray-300 cursor-not-allowed" : "bg-blue-500 border-blue-600 text-white hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"}
    `}
                        >
                          Prev
                        </button>

                        <button
                          disabled={!postStrategy[step.key] || openBlocked}
                          onClick={postMTH}
                          className={`cursor-target font-array text-lg w-[70px]  h-[40px] transition-all  text-white   rounded-lg

border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]     ${openBlocked ? "bg-gray-500 border-gray-400 text-gray-300 cursor-not-allowed" : "bg-blue-500 border-blue-600 text-white hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"}

active:border-b-[2px] active:brightness-90 active:translate-y-[2px]   ${currentStep === steps.length - 1 ? "bg-green-500 border-green-600" : " bg-blue-500 border-blue-600"}`}
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
                  <div className="cyber-switch ">
                    <input
                      type="radio"
                      id="cyber-opt-1"
                      name="cyber-mode"
                      defaultChecked
                    />
                    <label
                      htmlFor="cyber-opt-1"
                      className="cyber-label cursor-target"
                      onClick={() => {
                        setswitchs("chat");
                        setopenBlocked(false);
                      }}
                    >
                      <CiChat1 />
                      {/* <svg
                      className="icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg> */}
                      <span class="glare"></span>
                    </label>
                    <input type="radio" id="cyber-opt-2" name="cyber-mode" />
                    <label
                      htmlFor="cyber-opt-2"
                      className="cyber-label cursor-target "
                      onClick={() => {
                        setswitchs("strategy");
                        // setopenBlocked(true);
                      }}
                    >
                      {/* <svg
                      className="icon"
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
                    </svg> */}
                      <PiStrategy />
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
          // </BackgroundLines>
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
    </motion.div>
  );
};
