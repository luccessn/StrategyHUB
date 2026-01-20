import React from "react";
import sennamclr1k from "../models/cars/f1/sennamclr.glb";
import lotus49c from "../models/cars/f1/lotus_49c.glb";
import { useFetchData } from "../../../../Hooks/useFetchData";
export const car3DConfig = {
  "mclaren-f1-1991": {
    src: sennamclr1k,
    scale: [4.1, 3.9, 3.9],
    position: [0, 0, -0.6],
    rotation: [0, -0.7, 0],
  },
  "lotus-49c": {
    src: lotus49c,
    scale: [2.1, 1.9, 1.9],
    position: [0, 2.5, -2],
    rotation: [0, -0.7, 0],
  },
};

export const CarsFetch = () => {
  const [data, error, isLoading] = useFetchData(
    "https://strategyhub.onrender.com/server/getcars",
    // "http://localhost:5000/server/getcars"
  );
  // console.log(data);
  const carsWith3d = data.map((car) => ({
    ...car,
    ...(car3DConfig[car.slug] || {}), // თუ არსებობს
  }));
  // console.log(carsWith3d);

  return [carsWith3d, error, isLoading];
};
