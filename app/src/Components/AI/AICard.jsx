import React, { useRef } from "react";
import { PlaceholdersAndVanishInput } from "../UI/PlaceholdersForAi/PlaceHoldersForAI";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

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

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputValue }),
      });

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
    }
  };

  return (
    <div className="  flex flex-col justify-center mt-10 mb-40  items-center px-4">
      <h2 className=" font-panchangSB mb-10 sm:mb-20 text-3xl text-center sm:text-5xl dark:text-white text-black">
        Ask For Your Strategy Hub
      </h2>
      {submittedText.length > 0 && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => {
              if (!handleScroll.current) {
                window.scrollTo({
                  top: window.scrollY + 800,
                  behavior: "smooth",
                });
                handleScroll.current = true;
              }
            }}
            className="w-[1200px] h-[950px] justify-between bg-zinc-900 text-white px-5 py-3 rounded-lg shadow-lg flex flex-col gap-4"
          >
            <div className="flex  flex-col gap-8  overflow-y-auto">
              {submittedText.map((data, index) => (
                <>
                  <div className="flex flex-col justify-between">
                    {data.role === "Bot" && (
                      <div key={index} className="flex ">
                        <div className="flex flex-row gap-2 text-lg bg-blue-600 max-w-[500px]  px-3 py-2 rounded-xl">
                          <span className="opacity-60 text-sm">
                            {data.role}
                          </span>
                          <p>{data.content}</p>
                        </div>
                      </div>
                    )}
                    {data.role === "user" && (
                      <div key={index} className="flex justify-end">
                        <div className="flex flex-row gap-2 text-lg  px-3 py-2 rounded-xl">
                          <p>{data.content}</p>
                          {/* <span className="opacity-60 text-sm">
                            {data.role}
                          </span> */}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ))}
            </div>
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
              value={inputValue}
            />
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
