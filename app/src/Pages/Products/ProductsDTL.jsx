import React from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../Hooks/useFetchData";
import { PlaceHolder } from "../../Components/Loads/PlaceHolder/PlaceHolder";
import MainDTLCards from "../../Components/DetailsCMP/MainDTLCards";

export const ProductsDTL = () => {
  const { prID } = useParams();
  const [data, error, isLoading] = useFetchData(
    `https://strategyhub.onrender.com/server/printful/get?id=${prID}`,
  );
  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log("prID:", prID);
  return (
    <>
      {isLoading && (
        <div>
          <PlaceHolder />
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
      )}
      <MainDTLCards data={data} />
    </>
  );
};
