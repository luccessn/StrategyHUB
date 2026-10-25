import React from "react";

import { useFetchData } from "../../../../Hooks/useFetchData";
export const car3DConfig = {
  "mclaren-f1-1991": {
    scale: [3.9, 3.7, 3.7],
    position: [0, 0, -0.6],
    rotation: [0, -0.7, 0],
  },
  "lotus-49c": {
    scale: [1.9, 1.7, 1.7],
    position: [0, 2.5, -2],
    rotation: [0, -0.7, 0],
  },
  "mclaren-mp4-27": {
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
    scale: [5.8, 5.7, 5.7],
    position: [0, 0, -2.2],
    rotation: [0, -0.7, 0],
  },
  "redbull-rb19": {
    scale: [7.7, 7.5, 7.5],
    position: [0, 0, -3.5],
    rotation: [0, -0.7, 0],
  },
  "fr-2019": {
    scale: [5.1, 4.9, 4.9],
    position: [0, 0, -2.2],
    rotation: [0, -0.7, 0],
  },
  "amg-w14": {
    scale: [5.1, 4.9, 4.9],
    position: [0, 0, -2.2],
    rotation: [0, -0.7, 0],
  },
  "mclaren-2023": {
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
  console.log(carsWith3d);
  return [carsWith3d, error, isLoading];
};
