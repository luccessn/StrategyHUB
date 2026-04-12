import React from "react";
import { Badge } from "rsuite";
const CheckCard = ({ props }) => {
  return (
    <div className="flex flex-row items-center gap-5 justify-between py-4 border-b border-gray-200 font-mono">
      <Badge content={props.quantity + "x"} color="violet">
        <img
          src={props.image}
          alt={props.name}
          className="w-24 h-24 object-cover rounded-md"
        />
      </Badge>
      <div className=" flex flex-col w-44 gap-3">
        <p className="font-semibold text-white text-sm">{props.name}</p>
        <p className="text-white text-sm"> {props.size}</p>
      </div>
      <div className="text-right relative  -top-10">
        <p className="font-semibold text-white text-medium">
          {/* ${(props.price * props.quantity).toFixed(2)} */}
          {props?.price
            ? `${props.quantity * parseFloat(props.price.replace("$", ""))} $`
            : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default CheckCard;
