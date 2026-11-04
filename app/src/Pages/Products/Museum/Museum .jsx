import React from "react";
import { useFetchData } from "../../../Hooks/useFetchData";

export const Museum = () => {
  const [data, error, isLoading] = useFetchData(
    "https://strategyhub.onrender.com/server/getcars",
  );
  return (
    <div className="relative">
      <h1 className=" text-xl xl:text-2xl font-panchangMD">Cars Gallery</h1>
    </div>
  );
};
