import { AppActions } from "./AppActions";

const initials = {
  cartItems: [],
  counter: 1,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (state) {
    case AppActions.ADD_TO_CART: {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === payload.id,
      );

      if (existingIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingIndex].quantity += payload.quantity;
        return { ...state, cartItems: updatedCartItems };
      } else {
        return { ...state, cartItems: [...state.cartItems, payload] };
      }
    }
    case AppActions.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== payload),
      };
    case AppActions.CLEAR_CART:
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
