import React from "react";
import { CarsCalc } from "../CarsCalc";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../../../Hooks/useFetchData";
///
///
///
import sennamclr1k from "../models/cars/f1/sennamclr.glb";
import lotus49c from "../models/cars/f1/lotus_49c.glb";
// Ferrari 2004
import fr2004 from "../models/cars/f1/2004_ferrari_f2004.glb";
import mclarenmp427 from "../models/cars/f1/mclaren_mp4_27.glb";
import rb9 from "../models/cars/f1/rb9.glb";
import rb19 from "../models/cars/f1/rb19.glb";
import fr2019 from "../models/cars/f1/2019_f1_ferrari.glb";
import w14 from "../models/cars/f1/amg_w14.glb";
import mclaren_2023 from "../models/cars/f1/mclaren_2023.glb";
export const car3DConfig = {
  "mclaren-f1-1991": {
    src: sennamclr1k,
    scale: [3.9, 3.7, 3.7],
    position: [0, 0, -0.6],
    rotation: [0, -0.7, 0],
  },
  "lotus-49c": {
    src: lotus49c,
    scale: [1.9, 1.7, 1.7],
    position: [0, 2.5, -2],
    rotation: [0, -0.7, 0],
  },
  "ferrari-f2004": {
    src: fr2004,
    scale: [1, 1.05, 1.05],
    position: [4.5, 0, 2.5],
    rotation: [0, -0.7, 0],
  },
  "mclaren-mp4-27": {
    src: mclarenmp427,
    scale: [2.1, 1.9, 1.9],
    position: [0, 1, -1.5],
    rotation: [0, -2.5, 0],
  },
  // "mrc-w11": {
  //   src: w11,
  //   scale: [10, 10, 10],
  //   position: [0, 2.5, -2],
  //   rotation: [0, -0.7, 0],
  // },
  "redbull-rb9": {
    src: rb9,
    scale: [5.8, 5.7, 5.7],
    position: [0, 0, -2.2],
    rotation: [0, -0.7, 0],
  },
  "fr-2019": {
    src: fr2019,
    scale: [5.1, 4.9, 4.9],
    position: [0, 0, -2.2],
    rotation: [0, -0.7, 0],
  },
  "redbull-rb19": {
    src: rb19,
    scale: [7.7, 7.5, 7.5],
    position: [0, 0, -3.5],
    rotation: [0, -0.7, 0],
  },
  "amg-w14": {
    src: w14,
    scale: [5.1, 4.9, 4.9],
    position: [0, 0, -2.2],
    rotation: [0, -0.7, 0],
  },
  "mclaren-2023": {
    src: mclaren_2023,
    scale: [7.7, 7.5, 7.5],
    position: [0, 0, -3.5],
    rotation: [0, -0.7, 0],
  },
  // "sf-2021": {
  //   src: fr2021,
  //   scale: [5.1, 4.9, 4.9],
  //   position: [0, 2.2, -2.2],
  //   rotation: [0, -0.7, 0],
  // },
};
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
  const config = car3DConfig[data.slug];
  console.log("Database car:", data);
  console.log("Slug:", data.slug);
  console.log("3D config:", config);
  const carWith3D = { ...data, ...(config || {}) };
  console.log("Car with 3D:", carWith3D);
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
