import React, { createContext, useContext, useEffect, useReducer } from "react";
import { initials, reducer } from "./Reducer";
import { isTokenValid, toggleLocalStorage } from "../Utils/jwt";
import { jwtDecode } from "jwt-decode";
import {
  authenticatedAction,
  clearAccess,
  clearAccessAction,
} from "./AppActionsCreator";
import { loadUserCart } from "../Utils/cartStorage";

const context = createContext();
const savedCart = loadUserCart(null);
export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initials,
    cartItems: savedCart.cartItems,
    subscription: savedCart.subscription,
  });
  useEffect(() => {
    const token = localStorage.getItem("accesTokenHUB");

    if (token && isTokenValid(token)) {
      const decoded = jwtDecode(token);
      dispatch(authenticatedAction({ user: decoded, token }));
    } else {
      toggleLocalStorage();
    }
  }, []);
  useEffect(() => {
    if (!state.subscription.free.freeAccessExpiresAt) return;

    const interval = setInterval(() => {
      if (Date.now() >= state.subscription.free.freeAccessExpiresAt) {
        dispatch(clearAccessAction());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.subscription.free.freeAccessExpiresAt]);
  // useEffect(() => {
  //   const token = localStorage.getItem("accesTokenHUB");
  //   if (token && isTokenValid(token)) {
  //     const decoded = jwtDecode(token); // ტოკენის დეცოდირება
  //     // console.log("Decoded Token:", decoded);
  //     dispatch(authenticatedAction(decoded)); // ტოკენიდან გამოვყავით user-ი და გავგზავნეთ დისპეჩერში
  //   } else if (token && !isTokenValid(token)) {
  //     toggleLocalStorage(); // თუ ტოკენი არ ვარგა, წავშალოთ იგი
  //   }
  //   //
  //   //
  //   let interval;
  //   if (
  //     state.subscription.free.freeAccess &&
  //     state.subscription.free.freeAccessExpiresAt
  //   ) {
  //     interval = setInterval(() => {
  //       if (Date.now() >= state.subscription.free.freeAccessExpiresAt) {
  //         dispatch(clearAccessAction());
  //       }
  //     }, 1000);
  //   }

  //   return () => {
  //     if (interval) clearInterval(interval);
  //   };
  // }, [
  //   dispatch,
  //   state.subscription.free.freeAccess,
  //   state.subscription.free.freeAccessExpiresAt,
  // ]);

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
