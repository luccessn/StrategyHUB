import { jwtDecode } from "jwt-decode";
import {
  clearUserCart,
  loadUserCart,
  saveUserCart,
} from "../Utils/cartStorage";
import { toggleLocalStorage } from "../Utils/jwt";
import { AppActions } from "./AppActions";
import { freeAccess } from "./AppActionsCreator";
const saved = loadUserCart(null);
const initials = {
  isAuthenticated: false,
  user: null,
  cartItems: saved.cartItems || [],
  counter: 1,
  isCartDrawerOpen: false, //
  toast: { visible: false, type: null },
  cursorBlack: false,
  subscription: {
    free: {
      freeAccess: false,
      freeAccessExpiresAt: null,
    },
  },
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    //User
    case AppActions.AUTHENTICATED: {
      const user = payload;
      const savedCart = loadUserCart(user.id);
      console.log("Authenticated Payload:", payload); // ნახე, რას იღებ
      return {
        ...state,
        isAuthenticated: true,
        user: user,
        cartItems: savedCart.cartItems,
        subscription: savedCart.subscription,
      };
    }
    case AppActions.LOG_IN: {
      const { token } = payload;
      const user = jwtDecode(token);
      console.log("LOG in", user);

      toggleLocalStorage(token);
      const savedCart = loadUserCart(user.id);
      return {
        ...state,
        isAuthenticated: true,
        user: user,
        cartItems: savedCart.cartItems,
        subscription: savedCart.subscription,
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
      const accesDuration = 7 * 24 * 60 * 60 * 1000; // 1 week
      const expiresAt = Date.now() + accesDuration;

      const updatedSubscription = {
        ...state.subscription,
        free: {
          ...state.subscription.free,
          freeAccess: true,
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
          freeAccess: "used",
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
    default:
      return state;
  }
};

export { initials, reducer };
