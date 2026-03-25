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
const context = createContext();

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
      const decoded = jwtDecode(token); // ტოკენის დეცოდირება
      // console.log("Decoded Token:", decoded);
      dispatch(authenticatedAction(decoded)); // ტოკენიდან გამოვყავით user-ი და გავგზავნეთ დისპეჩერში
    } else if (token && !isTokenValid(token)) {
      toggleLocalStorage(); // თუ ტოკენი არ ვარგა, წავშალოთ იგი
    }
  }, []);

  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  );
};

export const useAppContext = () => {
  const AppContext = useContext(context);
  if (AppContext) {
    return AppContext;
  }
  throw new Error("Context Error");
};
