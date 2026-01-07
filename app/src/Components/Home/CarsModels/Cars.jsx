// import React, { Suspense, useState, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import {
//   OrbitControls,
//   Environment,
//   Html,
//   useGLTF,
//   useProgress,
//   useAnimations,
// } from "@react-three/drei";
// import * as THREE from "three";
// import { Swiper, SwiperSlide } from "swiper/react";
// import mclaren1k from "./models/cars/mclaren_gt31k.glb";
// import sennamclr1k from "./models/cars/senna_mclaren1k.glb";
// import ferrari296gt3 from "./models/cars/ferrari_296_gt3.glb";
// import { useFrame } from "@react-three/fiber";
// // import sennamclr4k from "./models/cars/senna_mclaren4k.glb"; ერთი და იგივეა არაფეირ დიდად განსხვავება
// // import mclaren2k from "./models/cars/mclaren_gt3.glb";
// // Loader (loading progress overlay)
// function Loader() {
//   const { progress } = useProgress();
//   return (
//     <Html center>
//       <div style={{ color: "white" }}>{Math.floor(progress)} %</div>
//     </Html>
//   );
// }

// // Model loader with material + animation support
// // function Model({ url, scale, position, rotation }) {
// //   const gltf = useGLTF(url);
// //   const { scene, animations } = gltf;
// //   const { actions } = useAnimations(animations, scene);

// //   useEffect(() => {
// //     if (actions) {
// //       Object.values(actions).forEach((action) => action.play());
// //     }

// //     scene.traverse((child) => {
// //       if (child.isMesh) {
// //         child.castShadow = true;
// //         child.receiveShadow = true;

// //         if (child.material) {
// //           if (child.material.map) {
// //             child.material.map.colorSpace = THREE.SRGBColorSpace;
// //           }
// //           if (child.material.emissiveMap) {
// //             child.material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
// //           }
// //           child.material.envMapIntensity = 1.5;
// //         }
// //       }
// //     });
// //   }, [actions, scene]);

// //   // 👇 ეს დაამატე — ნელა ატრიალებს მოდელს
// //   useFrame(() => {
// //     scene.rotation.y += 0.004; // ტრიალის სიჩქარე, შეგიძლია შეცვალო
// //   });

// //   return (
// //     <primitive
// //       object={scene}
// //       scale={scale}
// //       position={position}
// //       rotation={rotation}
// //     />
// //   );
// // }
// function Model({ url, scale, position, rotation }) {
//   const gltf = useGLTF(url);
//   const { scene, animations } = gltf;
//   const { actions } = useAnimations(animations, scene);

//   useEffect(() => {
//     if (actions) {
//       Object.values(actions).forEach((action) => action.play());
//     }

//     scene.traverse((child) => {
//       if (child.isMesh) {
//         child.castShadow = true;
//         child.receiveShadow = true;

//         if (child.material) {
//           // სწორად გამოჩნდეს ფერები
//           if (child.material.map) {
//             child.material.map.colorSpace = THREE.SRGBColorSpace;
//           }
//           if (child.material.emissiveMap) {
//             child.material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
//           }
//           // მეტალიკი უკეთ გამოჩნდეს
//           child.material.envMapIntensity = 1.5;
//         }
//       }
//     });
//   }, [actions, scene]);

//   return (
//     <primitive
//       object={scene}
//       scale={scale}
//       position={position}
//       rotation={rotation}
//     />
//   );
// }
// export const CarsModels = () => {
//   const cars = [
//     {
//       name: "Mcalern -1k Rez",
//       url: mclaren1k,
//       scale: [6.2, 6, 6],
//       position: [0, 0, 0],
//       rotation: [0, Math.PI, 0],
//     },
//     {
//       name: "Senna MCRLA -1k Rez",
//       url: sennamclr1k,
//       scale: [4.2, 4, 4],
//       position: [0, 0, 0],
//       rotation: [0, Math.PI, 0],
//     },
//     {
//       name: "ferrari296gt3",
//       url: ferrari296gt3,
//       scale: [6.2, 6, 6],
//       position: [0, 0, 0],
//       rotation: [0, Math.PI, 0],
//     },
//   ];
//   return (
//     <div>
//       <Swiper
//         slidesPerView={2}
//         spaceBetween={30}
//         // pagination={{
//         //   clickable: true,
//         // }}
//         // modules={[Pagination]}
//         className="mySwiper"
//       >
//         {cars.map((item) => (
//           <SwiperSlide>
//             <div className="bg-red-500 w-[800px] h-[600px] ">
//               {/* 3D Canvas */}
//               <Canvas
//                 shadows
//                 dpr={[1, 2]}
//                 gl={{
//                   antialias: true,
//                   physicallyCorrectLights: true,
//                   outputColorSpace: THREE.SRGBColorSpace, // toneMapping: THREE.ACESFilmicToneMapping,
//                   toneMappingExposure: 1,
//                 }}
//                 camera={{ position: [-30, 15, 0], fov: 55 }}
//               >
//                 <Suspense fallback={<Loader />}>
//                   {/* Tunnel */}
//                   {/* <Model
//               url={main}
//               scale={[0.35, 0.35, 0.35]}
//               position={[0, -1.2, -5]}
//             /> */}

//                   {/* Selected Car */}
//                   <Model
//                     key={item.name}
//                     url={item.url}
//                     scale={item.scale}
//                     position={item.position}
//                     rotation={item.rotation}
//                   />

//                   {/* Lights */}
//                   <ambientLight intensity={0.3} />
//                   <directionalLight
//                     castShadow
//                     position={[5, 10, 5]}
//                     intensity={1.2}
//                     shadow-mapSize-width={2048}
//                     shadow-mapSize-height={2048}
//                   />
//                   <spotLight
//                     castShadow
//                     position={[-5, 8, -5]}
//                     intensity={0.8}
//                     angle={0.3}
//                   />

//                   {/* HDRI Env */}
//                   <Environment preset="sunset" background={false} />
//                 </Suspense>

//                 {/* Static Camera Controls */}
//                 <OrbitControls
//                   target={[0, -0.6, 0]}
//                   enableRotate={true}
//                   enableZoom={false}
//                   enablePan={false}
//                 />
//               </Canvas>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Sidebar as bottom bar */}
//       {/* <div
//         style={{
//           height: 140,
//           padding: 12,
//           boxSizing: "border-box",
//           background: "rgba(255,255,255,0.05)",
//         }}
//       >
//         <Swiper
//           direction="horizontal"
//           spaceBetween={12}
//           slidesPerView={2}
//           style={{ height: "100%" }}
//         >
//           {cars.map((car, i) => (
//             <SwiperSlide key={i}>
//               <div
//                 style={{
//                   padding: 12,
//                   background: "rgba(255,255,255,0.1)",
//                   borderRadius: 8,
//                   textAlign: "center",
//                   cursor: "pointer", // ხელის კურსორი
//                 }}
//                 onClick={() => setCarIndex(i)} // 👈 აი აქ ხდება მანქანის შეცვლა
//               >
//                 <h3 style={{ margin: 0, fontSize: 14 }}>{car.name}</h3>
//                 <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>
//                   Select this car
//                 </p>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div> */}
//     </div>
//   );
// };
