import { AppActions } from "./AppActions";

//user THNG
export const authenticatedAction = (Decoded) => {
  return { type: AppActions.AUTHENTICATED, payload: Decoded };
};

export const LogInAction = (data) => {
  return { type: AppActions.LOG_IN, payload: data };
};
export const LogOutAction = () => {
  return { type: AppActions.LOG_OUT };
};

//cart THNG
export const addToCart = (item) => {
  return { type: AppActions.ADD_TO_CART, payload: item };
};
export const removeFromCart = (itemId) => {
  return { type: AppActions.REMOVE_FROM_CART, payload: itemId };
};
export const clearCart = () => {
  return { type: AppActions.CLEAR_CART };
};
export const CounterIncriment = (payload) => {
  return { type: AppActions.INCREMENT, payload };
};
export const CounterDecrement = (payload) => {
  return { type: AppActions.DECREMENT, payload };
};
export const CounterReset = () => {
  return { type: AppActions.RESET_COUNTER };
};
