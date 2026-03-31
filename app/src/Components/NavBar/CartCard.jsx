import React from "react";

import { Trash2 } from "lucide-react"; // აიკონები
import { useAppContext } from "../../Context/AppContextProvider";
import { removeFromCart } from "../../Context/AppActionsCreator";
import { AppActions } from "../../Context/AppActions";
export const CartCard = ({ props }) => {
  const { dispatch } = useAppContext();
  const HandleRemoveProduct = () => {
    dispatch(removeFromCart(props.id));
  };
  const Incriment = () => {
    dispatch({
      type: AppActions.UPDATE_CART_ITEM_QUANTITY,
      payload: { id: props.id, quantity: props.quantity + 1 },
    });
  };
  const Decrement = () => {
    if (props.quantity > 1) {
      dispatch({
        type: AppActions.UPDATE_CART_ITEM_QUANTITY,
        payload: { id: props.id, quantity: props.quantity - 1 },
      });
    }
  };
  return (
    <div className="flex flex-col sffm:flex-row w-full justify-between items-start gap-4 border-b border-gray-200 py-4 px-2 sm:px-5 font-mono">
      {/* Content: Image + Info */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto flex-1">
        <img
          src={props.image}
          alt=""
          className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-md"
        />
        <div className="flex flex-col justify-between flex-1 gap-3">
          <div className="flex flex-col ">
            <p className="font-semibold text-black text-lg ">{props.name}</p>
            <p className="text-black text-lg">
              {Number(props.price).toFixed(2)} $
            </p>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <button
                onClick={Decrement}
                className={`px-2 py-1 rounded text-3xl  ${
                  props.quantity === 1 ? "text-gray-300" : "text-black"
                }`}
              >
                -
              </button>
              <h1 className="text-black text-2xl">{props.quantity}</h1>
              <button
                onClick={Incriment}
                className={`px-2 py-1 rounded text-3xl ${
                  props.quantity >= props.stock
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-black"
                }`}
                disabled={props.quantity >= props.stock}
              >
                +
              </button>
            </div>
            <button
              className="text-black hover:text-red-600"
              onClick={HandleRemoveProduct}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="text-right self-end sm:self-auto">
        <p className="font-semibold text-black text-xl">
          {props?.price
            ? `${(props.quantity * props.price).toFixed(2)} $`
            : "Loading..."}
        </p>
      </div>
    </div>
  );
};
