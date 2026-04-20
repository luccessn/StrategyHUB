import { jwtDecode } from "jwt-decode";
import {
  clearUserCart,
  loadUserCart,
  saveUserCart,
} from "../Utils/cartStorage";
import { toggleLocalStorage } from "../Utils/jwt";
import { AppActions } from "./AppActions";
import { freeAccess } from "./AppActionsCreator";
import { modal } from "@heroui/react";
const saved = loadUserCart(null);
const initials = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem("accesTokenHUB") || null,
  cartItems: saved.cartItems || [],
  counter: 1,
  isCartDrawerOpen: false, //
  toast: { visible: false, type: null },
  modal: { isOpen: false },
  cursorBlack: false,
  subscription: {
    free: {
      freeAccess: false,
      isUsed: false,
      freeAccessExpiresAt: null,
    },
  },
  notification: { isOpen: false, content: "" },
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    //User
    case AppActions.AUTHENTICATED: {
      const user = payload;
      const savedCart = loadUserCart(user.id);

      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        cartItems: savedCart.cartItems,
        subscription: savedCart.subscription,
      };
    }
    case AppActions.LOG_IN: {
      const { token } = payload;
      const user = jwtDecode(token);

      toggleLocalStorage(token);
      const savedCart = loadUserCart(user.id);
      return {
        ...state,
        isAuthenticated: true,
        user: user,
        token,
        cartItems: savedCart.cartItems,
        subscription: savedCart.subscription,
      };
    }
    case AppActions.LOG_OUT: {
      toggleLocalStorage();
      const guestCart = loadUserCart(null);
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        cartItems: guestCart.cartItems,
        subscription: guestCart.subscription,
      };
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
      } else {
        updatedCartItems = [...state.cartItems, payload];
      }
      const newData = {
        cartItems: updatedCartItems,
        subscription: state.subscription,
      };
      saveUserCart(state.user ? state.user.id : null, newData);
      return { ...state, cartItems: updatedCartItems };
    }
    case AppActions.REMOVE_FROM_CART: {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== payload,
      );
      const newData = {
        cartItems: updatedCartItems,
        subscription: state.subscription,
      };

      saveUserCart(state.user ? state.user.id : null, newData);
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }
    case AppActions.CLEAR_CART: {
      const newData = {
        cartItems: [],
        subscription: state.subscription,
      };
      if (state.user) {
        clearUserCart(state.user.id);
      } else {
        saveUserCart(state.user ? state.user.id : null, newData);
      }
      return { ...state, cartItems: [] };
    }

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
    // Drawer
    case AppActions.TOGGLE_CART_DRAWER:
      return { ...state, isCartDrawerOpen: !state.isCartDrawerOpen };
    case AppActions.OPEN_CART_DRAWER:
      return { ...state, isCartDrawerOpen: true };
    case AppActions.CLOSE_CART_DRAWER:
      return { ...state, isCartDrawerOpen: false };
    // Cursor
    case AppActions.CURSOR_BLACK_ON:
      return { ...state, cursorBlack: true };
    case AppActions.CURSOR_BLACK_OFF:
      return { ...state, cursorBlack: false };
    //Free Access
    case AppActions.FREE_ACCESS: {
      const accesDuration = 14 * 24 * 60 * 60 * 1000; // 2 week
      // const accesDuration = 7 * 24 * 60 * 60 * 1000; // 1 week
      // const accesDuration = 1 * 60 * 1000;
      const expiresAt = Date.now() + accesDuration;

      const updatedSubscription = {
        ...state.subscription,
        free: {
          ...state.subscription.free,
          freeAccess: true,
          isUsed: true,
          freeAccessExpiresAt: expiresAt,
        },
      };

      const newData = {
        cartItems: state.cartItems,
        subscription: updatedSubscription,
      };

      saveUserCart(state.user ? state.user.id : null, newData);

      return {
        ...state,
        subscription: updatedSubscription,
      };
    }
    case AppActions.CLEAR_ACCESS: {
      const updatedSubscription = {
        ...state.subscription,
        free: {
          ...state.subscription.free,
          freeAccess: false,
          isUsed: true,
          freeAccessExpiresAt: null,
        },
      };

      const newData = {
        cartItems: state.cartItems,
        subscription: updatedSubscription,
      };

      saveUserCart(state.user ? state.user.id : null, newData);

      return {
        ...state,
        subscription: updatedSubscription,
      };
    }
    //Modal
    case AppActions.OPEN_MODAL:
      return { ...state, modal: { isOpen: true } };
    case AppActions.CLOSE_MODAL:
      return { ...state, modal: { isOpen: false } };
    case AppActions.OPEN_NOTF:
      return {
        ...state,
        notification: {
          isOpen: true,
          content: action.payload,
        },
      };
    case AppActions.CLOSE_NOTF:
      console.log("dadada");
      return { ...state, notification: { isOpen: false, content: "" } };
    default:
      return state;
  }
};

export { initials, reducer };
