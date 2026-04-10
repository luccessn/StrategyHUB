import React, { useEffect, useState, useRef } from "react";
import { useAppContext } from "../../Context/AppContextProvider";
import { useAnimate } from "framer-motion";

export const AccessCountDown = () => {
  const { state } = useAppContext();
  // const [timeLeft, setTimeLeft] = useState(0);
  // useEffect(() => {
  //   if (
  //     !state.subscription.free.freeAccess ||
  //     !state.subscription.free.freeAccessExpiresAt
  //   ) {
  //     setTimeLeft(0);
  //     return;
  //   }

  //   const updateTime = () => {
  //     const remaining =
  //       new Date(state.subscription.free.freeAccessExpiresAt).getTime() -
  //       Date.now();
  //     setTimeLeft(Math.max(0, remaining));
  //   };

  //   updateTime(); // პირველი განახლება მაშინვე
  //   const interval = setInterval(updateTime, 60 * 1000); // განახლება ყოველ წუთში

  //   return () => clearInterval(interval);
  // }, [
  //   state.subscription.free.freeAccess,
  //   state.subscription.free.freeAccessExpiresAt,
  // ]);

  // if (!state.subscription.free.freeAccess || timeLeft <= 0) return null;

  // const DAY = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  // const HOUR = Math.floor(
  //   (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  // );
  // const MINUTE = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  // const SECOND = Math.floor((timeLeft % (1000 * 60)) / 1000);
  const gsTargetDate = state.subscription.free.freeAccessExpiresAt;
  const userTargetDate = state?.user?.trial?.expiresAt;
  const targetDate = userTargetDate || gsTargetDate;
  return (
    // <div className="text-white text-[16px] font-mono flex flex-row gap-2">
    //   <p>
    //     {days}d.{hours}h.{minutes}mn.{seconds}s
    //   </p>
    //   <p> remaining </p>
    // </div>
    <div className="bg-gradient-to-br  p-4">
      <div className="mx-auto flex w-full max-w-[400px] h-[50px] items-center bg-white rounded-xl overflow-hidden">
        <CountdownItem targetDate={targetDate} unit="Day" label="days" />
        <CountdownItem targetDate={targetDate} unit="Hour" label="hours" />
        <CountdownItem targetDate={targetDate} unit="Minute" label="minutes" />
        <CountdownItem targetDate={targetDate} unit="Second" label="seconds" />
      </div>
    </div>
  );
};

///

//

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const CountdownItem = ({ unit, label, targetDate }) => {
  const { ref, value } = useTimer(unit, targetDate);

  return (
    <div className="flex w-1/4 flex-col items-center justify-center gap-1 border-r border-slate-200 font-mono h-full">
      <div className="relative overflow-hidden text-center w-full">
        <span
          ref={ref}
          className="block text-3xl font-bold text-black md:text-2xl"
        >
          {value}
        </span>
      </div>

      <span className="text-xs text-slate-500">{label}</span>
    </div>
  );
};

const useTimer = (unit, targetDate) => {
  const [ref, animate] = useAnimate();
  const [value, setValue] = useState(0);
  const prevValue = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const end = new Date(targetDate).getTime();
      const now = Date.now();
      const distance = end - now;

      let newValue = 0;

      if (unit === "Day") {
        newValue = Math.max(0, Math.floor(distance / DAY));
      } else if (unit === "Hour") {
        newValue = Math.max(0, Math.floor((distance % DAY) / HOUR));
      } else if (unit === "Minute") {
        newValue = Math.max(0, Math.floor((distance % HOUR) / MINUTE));
      } else {
        newValue = Math.max(0, Math.floor((distance % MINUTE) / SECOND));
      }

      if (newValue !== prevValue.current) {
        animate(ref.current, { y: -20, opacity: 0 }, { duration: 0.15 });

        setTimeout(() => {
          setValue(newValue);
          prevValue.current = newValue;

          animate(ref.current, { y: 0, opacity: 1 }, { duration: 0.2 });
        }, 150);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, unit, animate, ref]);

  return { ref, value };
};
