import React from "react";
import sennamclr1k from "../models/cars/f1/sennamclr.glb";
import lotus49c from "../models/cars/f1/lotus_49c.glb";
import mclarenmp427 from "../models/cars/f1/mclaren_mp4_27.glb";
// import fr2021 from "../models/cars/f1/2021_ferrari.glb";
import rb9 from "../models/cars/f1/rb9.glb";
import rb19 from "../models/cars/f1/rb19.glb";
import fr2019 from "../models/cars/f1/2019_f1_ferrari.glb";
import w14 from "../models/cars/f1/amg_w14.glb";
import mclaren_2023 from "../models/cars/f1/mclaren_2023.glb";
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
  "redbull-rb19": {
    src: rb19,
    scale: [7.7, 7.5, 7.5],
    position: [0, 0, -3.5],
    rotation: [0, -0.7, 0],
  },
  "fr-2019": {
    src: fr2019,
    scale: [5.1, 4.9, 4.9],
    position: [0, 0, -2.2],
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

export const CarsFetch = () => {
  const [data, error, isLoading] = useFetchData(
    "https://strategyhub.onrender.com/server/getcars",
    // "http://localhost:5000/server/getcars",
  );
  const carsWith3d = data.map((car) => ({
    ...car,
    ...(car3DConfig[car.slug] || {}),
  }));
  return [carsWith3d, error, isLoading];
};
