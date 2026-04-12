import React, { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";

const CancelCheck = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="flex justify-center relative top-40">
      <div className="w-full max-w-md">
        <div className="shadow-lg p-12 w-full text-center mt-10 border-b-4 border-red-500 rounded-xl">
          <FaTimesCircle
            className={`text-6xl text-red-500 mx-auto mb-4 transition-transform duration-500 ${
              animate ? "scale-110 animate-bounce" : ""
            }`}
          />
          <h2 className="mb-3 text-white text-3xl font-medium mt-2">
            Your payment failed
          </h2>
          <p className="text-lg text-gray-200 font-medium">Try again later</p>
        </div>
      </div>
    </div>
  );
};

export default CancelCheck;
