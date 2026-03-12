import {
  clearUserCart,
  loadUserCart,
  saveUserCart,
} from "../Utils/cartStorage";
import { toggleLocalStorage } from "../Utils/jwt";
import { AppActions } from "./AppActions";

const initials = {
  isAuthenticated: false,
  user: null,
  cartItems: loadUserCart(null),
  counter: 1,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (state) {
    //User
    case AppActions.AUTHENTICATED: {
      const user = payload;
      const savedCart = loadUserCart(user.id);
      return {
        ...state,
        isAuthenticated: true,
        user: user,
        cartItems: saveUserCart,
      };
    }
    case AppActions.LOG_OUT: {
      toggleLocalStorage();
      return { ...state, isAuthenticated: false, user: null, cartItems: [] };
    }
    // Cart -
    case AppActions.ADD_TO_CART: {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === payload.id,
      );
      let updatedCartItems;
      if (existingIndex !== -1) {
        updatedCartItems = [...state.cartItems];
        updatedCartItems[existingIndex].quantity += payload.quantity;
        return { ...state, cartItems: updatedCartItems };
      } else {
        updatedCartItems = {
          ...state,
          cartItems: [...state.cartItems, payload],
        };
      }
      saveUserCart(state.user ? state.user.id : null, updatedCartItems);
      return { ...state, cartItems: updatedCartItems };
    }
    case AppActions.REMOVE_FROM_CART:
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== payload,
      );
      saveUserCart(state.user ? state.user.id : null, updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    case AppActions.CLEAR_CART:
      if (state.user) {
        clearUserCart(state.user.id);
      } else {
        saveUserCart(null, []);
      }
      return { ...state, cartItems: [] };
    case AppActions.INCREMENT:
      return { ...state, counter: state.counter + payload };
    case AppActions.DECREMENT:
      return { ...state, counter: state.counter - payload };
    case AppActions.RESET_COUNTER:
      return { ...state, counter: 1 };
    case AppActions.UPDATE_CART_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === payload.id
            ? { ...item, quantity: Math.max(1, payload.quantity) }
            : item,
        ),
      };
    default:
      return state;
  }
};

export { initials, reducer };
