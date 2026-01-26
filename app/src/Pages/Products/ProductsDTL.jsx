import React from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../Hooks/useFetchData";
import { PlaceHolder } from "../../Components/Loads/PlaceHolder/PlaceHolder";
import MainDTLCards from "../../Components/DetailsCMP/MainDTLCards";

export const ProductsDTL = () => {
  const { prID } = useParams();
  const [data, error, isLoading] = useFetchData(
    `http://localhost:5000/server/printful/get?id=${prID}`,
  );
  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log("prID:", prID);
  return (
    <>
      {isLoading && <PlaceHolder />}
      <MainDTLCards data={data} />
    </>
  );
};
