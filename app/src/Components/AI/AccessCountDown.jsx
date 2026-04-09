import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContextProvider";

export const AccessCountDown = () => {
  const { state } = useAppContext();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (
      !state.subscription.free.freeAccess ||
      !state.subscription.free.freeAccessExpiresAt
    ) {
      setTimeLeft(0);
      return;
    }

    const updateTime = () => {
      const remaining =
        new Date(state.subscription.free.freeAccessExpiresAt).getTime() -
        Date.now();
      setTimeLeft(Math.max(0, remaining));
    };

    updateTime(); // პირველი განახლება მაშინვე
    const interval = setInterval(updateTime, 60 * 1000); // განახლება ყოველ წუთში

    return () => clearInterval(interval);
  }, [
    state.subscription.free.freeAccess,
    state.subscription.free.freeAccessExpiresAt,
  ]);

  if (!state.subscription.free.freeAccess || timeLeft <= 0) return null;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  return (
    <div className="text-white text-lg font-mono font-bold">
      {days} Day{days !== 1 ? "s" : ""} {hours} Hour
      {hours !== 1 ? "s" : ""} {minutes} Minute{minutes !== 1 ? "s" : ""}{" "}
      remaining
    </div>
  );
};
