import React from "react";

const SuccessToaster = ({ visible }) => {
  return (
    <div
      className={`
        fixed bottom-5 right-5 
        transition-all duration-500 ease-in-out 
        transform
        ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} 
        z-50
      `}
    >
      <div className="flex flex-col w-60 sm:w-72 text-[10px] sm:text-xs">
        <div className="succsess-alert flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-purple-900 px-[10px] shadow-2xl border border-black">
          <div className="flex gap-2">
            <div className="text-green-500 bg-white/5 backdrop-blur-xl p-1 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium">Added to cart</p>
              <p className="text-gray-400">Product added successfully.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessToaster;
