import React from "react";
import sennamclr1k from "../models/cars/f1/sennamclr.glb";
import lotus49c from "../models/cars/f1/lotus_49c.glb";
import mclarenmp427 from "../models/cars/f1/mclaren_mp4_27.glb";
import fr2021 from "../models/cars/f1/2021_ferrari.glb";

import { useFetchData } from "../../../../Hooks/useFetchData";
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
  "mclaren-mp4-27": {
    src: mclarenmp427,
    scale: [2.1, 1.9, 1.9],
    position: [0, 1, -1.5],
    rotation: [0, -2.5, 0],
  },
  "sf-2021": {
    src: fr2021,
    scale: [5.1, 4.9, 4.9],
    position: [0, 2.2, -2.2],
    rotation: [0, -0.7, 0],
  },
};

export const CarsFetch = () => {
  const [data, error, isLoading] = useFetchData(
    "https://strategyhub.onrender.com/server/getcars",
    // "http://localhost:5000/server/getcars",
  );
  // console.log(data);
  const carsWith3d = data.map((car) => ({
    ...car,
    ...(car3DConfig[car.slug] || {}), // თუ არსებობს
  }));
  // console.log(carsWith3d);

  return [carsWith3d, error, isLoading];
};
