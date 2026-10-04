import React from "react";
import { CarsCalc } from "../CarsCalc";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../../../Hooks/useFetchData";
export const CarsProductDTL = () => {
  const { carID } = useParams();
  console.log("carID:", carID);
  const [data, error, isLoading] = useFetchData(
    `https://strategyhub.onrender.com/server/getcars?_id=${carID}`,
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading car: {error}</div>;
  }
  if (!data) {
    return <div>Car not found</div>;
  }
  const carWith3D = { ...data };
  console.log("carwitd3d", carWith3D.about);
  return (
    <div className="text-white relative top-28 lg:top-36">
      {/* {carWith3D.src ? (
        <CarsCalc car={carWith3D} />
      ) : (
        <div>3D model not configured for this car.</div>
      )} */}
      {carWith3D.about ? (
        <CarsCalc car={data} />
      ) : (
        <div>3D model not configured for this car.</div>
      )}
    </div>
  );
};
