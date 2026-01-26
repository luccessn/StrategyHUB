import React, { createContext, useContext, useEffect, useReducer } from "react";
import { initials, reducer } from "./Reducer";
const getInitialState = () => {
  const token = localStorage.getItem("StrategyHUBCart");
  let cartItems = [];
  if (token) {
    try {
      const decoded = decodeURIComponent(token); // ვშიფრავთ URL-encoded სტრიქონს
      cartItems = JSON.parse(decoded); //  JSON parse
    } catch (err) {
      // console.error("Failed to decode cart token:", err);
    }
  }
  return {
    ...initials,
    cartItems,
  };
};
const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  useEffect(() => {
    try {
      const token = encodeURIComponent(JSON.stringify(state.cartItems));
      localStorage.setItem("StrategyHUBCart", token);
    } catch (err) {}
  }, [state.cartItems]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext Error");
  }
  return context;
};
