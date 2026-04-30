import React from "react";
import { useFetchData } from "../../Hooks/useFetchData";
import { ErrorLoader } from "../../Components/Loads/error/ErrorLoader";
import { MainGridProduct } from "../../Components/Products/MainGridProduct";
import { GridPlaceHolder } from "../../Components/Loads/PlaceHolder/GridPlaceHolder";
import StaggeredMenu from "../../Components/UI/StraggeredMenu";
import { useAppContext } from "../../Context/AppContextProvider";
import { MainNotification } from "../../Components/Loads/MainNotification";
import { openNotfAction } from "../../Context/AppActionsCreator";

export const Products = () => {
  const [data, error, isLoading] = useFetchData(
    "https://strategyhub.onrender.com/server/printful/get",
  );
  const { state, dispatch } = useAppContext();
  console.log(state.cartItems);
  if (error) {
    return <ErrorLoader error={error} />;
  }

  return (
    <>
      {isLoading ? (
        <div className="relative ">
          <GridPlaceHolder lenght={4} />
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
        <>
          <div className="flex relative top-0 clg:top-14  justify-center mt-28 ">
            <div className=" grid grid-cols-1 pl-14 mmd:pl-20 clg:pl-8  w-full mx-auto ssm:grid-cols-2 clg:grid-cols-3 gap-y-20 gap-4   ssm:gap-10 xl:grid-cols-4 xl:gap-10 xxl:gap-20 ">
              {data.map((item) => (
                <MainGridProduct props={item} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
