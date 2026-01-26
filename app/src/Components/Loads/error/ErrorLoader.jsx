import React from "react";

export const ErrorLoader = ({ error }) => {
  return (
    <div className="relative w-60 h-52 mx-4 -mt-6 overflow-hidden rounded-xl bg-clip-border shadow-lg group">
      <div className="absolute inset-0 items-center flex flex-col gap-2 justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-20 h-20 text-purple-700 transform transition-transform group-hover:scale-110 duration-300"
        >
          <path d="M12 2L1 21h22L12 2zm0 3.83L19.17 19H4.83L12 5.83zM11 16h2v2h-2zm0-6h2v4h-2z" />
        </svg>
        <p className="block font-sans text-center text-base font-light leading-relaxed text-gray-200 antialiased">
          {error}
        </p>
      </div>
    </div>
  );
};
