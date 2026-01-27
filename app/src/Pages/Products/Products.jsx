import React from "react";
import { useFetchData } from "../../Hooks/useFetchData";
import { ErrorLoader } from "../../Components/Loads/error/ErrorLoader";
import { MainGridProduct } from "../../Components/Products/MainGridProduct";
import { GridPlaceHolder } from "../../Components/Loads/PlaceHolder/GridPlaceHolder";

export const Products = () => {
  const [data, error, isLoading] = useFetchData(
    "https://strategyhub.onrender.com/server/printful/get",
  );
  if (error) {
    return <ErrorLoader error={error} />;
  }

  return (
    <>
      {isLoading ? (
        <div>
          <GridPlaceHolder lenght={data.length} />
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="flex items-center justify-center gap-6">
              <div className="load">
                <svg viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" />
                </svg>
              </div>

              <div className="load triangle">
                <svg viewBox="0 0 86 80">
                  <polygon points="43 8 79 72 7 72" />
                </svg>
              </div>

              <div className="load">
                <svg viewBox="0 0 80 80">
                  <rect x="8" y="8" width="64" height="64" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-28 ">
          <div className=" grid grid-cols-1 ssm:grid-cols-2 mmd:grid-cols-3 gap-y-20 gap-4   ssm:gap-10 xl:grid-cols-4 xl:gap-10 xxl:gap-20 ">
            {data.map((item) => (
              <MainGridProduct props={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
