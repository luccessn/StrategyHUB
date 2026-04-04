import { jwtDecode } from "jwt-decode";
import {
  clearUserCart,
  loadUserCart,
  saveUserCart,
} from "../Utils/cartStorage";
import { toggleLocalStorage } from "../Utils/jwt";
import { AppActions } from "./AppActions";
import { freeAccess } from "./AppActionsCreator";

const initials = {
  isAuthenticated: false,
  user: null,
  cartItems: loadUserCart(null),
  counter: 1,
  isCartDrawerOpen: false, //
  toast: { visible: false, type: null },
  cursorBlack: false,
  freeAccess: false,
  freeAccessExpiresAt: null,
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
        user: payload,
        cartItems: savedCart,
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
        cartItems: savedCart,
      };
    }
    case AppActions.LOG_OUT: {
      toggleLocalStorage();
      return { ...state, isAuthenticated: false, user: null, cartItems: [] };
    }
    // Cart -
    // case AppActions.ADD_TO_CART: {
    //   const existingIndex = state.cartItems.findIndex(
    //     (item) => item.id === payload.id,
    //   );
    //   let updatedCartItems;
    //   if (existingIndex !== -1) {
    //     updatedCartItems = [...state.cartItems];
    //     updatedCartItems[existingIndex].quantity += payload.quantity;
    //     return { ...state, cartItems: updatedCartItems };
    //   } else {
    //     updatedCartItems = {
    //       ...state,
    //       cartItems: [...state.cartItems, payload],
    //     };
    //   }

    //   saveUserCart(state.user ? state.user.id : null, updatedCartItems);
    //   return { ...state, cartItems: updatedCartItems };
    // }
    case AppActions.ADD_TO_CART: {
      // const items = Array.isArray(state.cartItems) ? state.cartItems : [];
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
      const accesDuration = 2 * 60 * 1000;
      const expiresAt = Date.now() + accesDuration;
      return {
        ...state,
        freeAccess: true,
        freeAccessExpiresAt: expiresAt,
      };
    }
    case AppActions.CLEAR_ACCESS:
      return { ...state, freeAccess: "used", freeAccessExpiresAt: null };
    default:
      return state;
  }
};

export { initials, reducer };
