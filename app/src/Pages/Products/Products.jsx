import React from "react";
import { useFetchData } from "../../Hooks/useFetchData";
import { ErrorLoader } from "../../Components/Loads/error/ErrorLoader";
import { MainGridProduct } from "../../Components/Products/MainGridProduct";

export const Products = () => {
  const [data, error, isLoading] = useFetchData(
    "http://localhost:5000/server/printful/get",
  );
  if (error) {
    return <ErrorLoader error={error} />;
  }

  return (
    <div className="flex justify-center mt-28 ">
      <div className=" grid grid-cols-1 ssm:grid-cols-2 mmd:grid-cols-3 gap-y-20 gap-4   ssm:gap-10 xl:grid-cols-4 xl:gap-10 xxl:gap-20 ">
        {data.map((item) => (
          <MainGridProduct props={item} />
        ))}
      </div>
    </div>
  );
};
