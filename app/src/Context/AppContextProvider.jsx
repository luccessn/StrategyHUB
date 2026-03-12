import React, { createContext, useContext, useEffect, useReducer } from "react";
import { initials, reducer } from "./Reducer";
import { isTokenValid, toggleLocalStorage } from "../Utils/jwt";
import { jwtDecode } from "jwt-decode";
import { authenticatedAction } from "./AppActionsCreator";
// const getInitialState = () => {
//   const token = localStorage.getItem("StrategyHUBCart");
//   let cartItems = [];
//   if (token) {
//     try {
//       const decoded = decodeURIComponent(token); // ვშიფრავთ URL-encoded სტრიქონს
//       cartItems = JSON.parse(decoded); //  JSON parse
//     } catch (err) {
//       // console.error("Failed to decode cart token:", err);
//     }
//   }
//   return {
//     ...initials,
//     cartItems,
//   };
// };
const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initials);
  // useEffect(() => {
  //   try {
  //     const token = encodeURIComponent(JSON.stringify(state.cartItems));
  //     localStorage.setItem("StrategyHUBCart", token);
  //   } catch (err) {}
  // }, [state.cartItems]);
  useEffect(() => {
    const token = localStorage.getItem("accesTokenHUB");
    if (token && isTokenValid(token)) {
      const Decoded = jwtDecode(token);
      //dispatch
      dispatch(authenticatedAction(Decoded));
    } else if (token && isTokenValid(token)) {
      toggleLocalStorage(token);
    }
  }, []);

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
