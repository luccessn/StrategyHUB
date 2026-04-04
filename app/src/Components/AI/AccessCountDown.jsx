import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContextProvider";

export const AccessCountDown = () => {
  const { state } = useAppContext();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!state.freeAccess || !state.freeAccessExpiresAt) {
      setTimeLeft(0);
      return;
    }

    const updateTime = () => {
      const remaining = state.freeAccessExpiresAt - Date.now();
      setTimeLeft(Math.max(0, remaining));
    };

    updateTime(); // პირველი განახლება მაშინვე
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [state.freeAccess, state.freeAccessExpiresAt]);

  if (!state.freeAccess || timeLeft <= 0) return null;

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <div className="text-white text-lg font-bold">
      Free Access: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};
