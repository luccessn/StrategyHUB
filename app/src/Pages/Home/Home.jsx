import React, { useEffect, Suspense } from "react";
import { WorldMapDemo } from "../../Components/Home/WorldMapDemo";
// import { MapTabsDemo } from "../../Components/Home/MapTabs/MapTabsDemo";
import { ExpandableCardDemo } from "../../Components/Home/CardDemo";
// import { WindTunnelDemo } from "../../Components/Home/CarsModels/FullWind";
// import { CarsModels } from "../../Components/Home/CarsModels/CarsModels";
import { CarsCalc } from "../../Components/Home/CarsModels/CarsCalc";
// import { TestCharts } from "../../Components/Home/TestCharts";
import LogoLoop from "../../Components/UI/Border/LogoLoop";
import trackloader from "../../Components/Loads/trackloader";
///Logos
import { SiFerrari } from "react-icons/si";
import { SiF1 } from "react-icons/si";
import { SiFord } from "react-icons/si";
import { SiBmw } from "react-icons/si";
import { SiMercedes } from "react-icons/si";
import { GiRallyTheTroops } from "react-icons/gi";
import { SiNissan } from "react-icons/si";
import { SiMclaren } from "react-icons/si";
import { SiRedbull } from "react-icons/si";
import { SiAudi } from "react-icons/si";
import { SiHonda } from "react-icons/si";
import { AICard } from "../../Components/AI/AICard";
//
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";

// import { Swiper, SwiperSlide } from "swiper/react";
import {
  OrbitControls,
  Environment,
  Html,
  useGLTF,
  useProgress,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";
import f1tyres from "../../Components/Home/CarsModels/models/cars/f1Tyres.glb";
const techLogos = [
  { node: <SiF1 />, title: "F1" },
  { node: <SiMercedes />, title: "Mercedes" },
  { node: <SiFord />, title: "Ford" },
  { node: <SiFerrari />, title: "Ferrari" },
  { node: <SiBmw />, title: "BMW" },
  { node: <GiRallyTheTroops />, title: "Rally" },
  { node: <SiNissan />, title: "Nissan" },
  { node: <SiMclaren />, title: "McLaren" },
  { node: <SiRedbull />, title: "RedBull" },
  { node: <SiAudi />, title: "Audi" },
  { node: <SiHonda />, title: "Honda" },
];
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "white" }}>{Math.floor(progress)} %</div>
    </Html>
  );
}
function Model({ url, scale, position, rotation }) {
  const gltf = useGLTF(url);
  const { scene, animations } = gltf;
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action.play());
    }

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          if (child.material.map)
            child.material.map.colorSpace = THREE.SRGBColorSpace;
          if (child.material.emissiveMap)
            child.material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
          child.material.envMapIntensity = 1.5;
        }
      }
    });
  }, [actions, scene]);

  // 🔹 აქ შევძელით ბრუნვის ამოღება
  // useFrame(() => {
  //   scene.rotation.y += 0.0008;
  // });

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

export const Home = () => {
  return (
    <div className=" flex flex-col gap-20 text-white text-3xl">
      <WorldMapDemo />
      {/* <MapTabsDemo /> */}
      <div className="">
        <ExpandableCardDemo />
      </div>

      {/* <div class="sketchfab-embed-wrapper">
        {" "}
        <iframe> </iframe>{" "}
      </div> */}
      {/* <div className="w-full">
        <WindTunnelDemo />
      </div> */}
      {/* <div className="w-full">
        <CarsModels />
      </div> */}
      <div className="flex flex-col ">
        <div
          style={{ height: "200px", position: "relative", overflow: "hidden" }}
        >
          {/* Basic horizontal loop */}
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={55}
            gap={45}
            hoverSpeed={80}
            scaleOnHover
            fadeOut
            // fadeOutColor="#000000"
            ariaLabel="Technology partners"
          />

          {/* Vertical loop with deceleration on hover */}
        </div>
        <div className="w-3/4 mx-auto flex h-[600px]  ">
          <div className="w-full h-full">
            <motion.div className="flex h-full flex-col cursor-pointer bg-cover bg-center bg-no-repeat p-0">
              <div className="flex flex-col w-full h-full">
                {/* Card Header */}
                {/* <div className="flex flex-col pl-5 gap-2">
                  <h1 className="font-panchangMD text-2xl tracking-wide">
                    F1 Tyres
                  </h1>
                </div> */}

                {/* 3D Canvas */}
                <div className="w-full h-full ">
                  <Canvas
                    key="F1Tyres"
                    shadows
                    dpr={[1, 2]}
                    gl={{
                      antialias: true,
                      physicallyCorrectLights: true,
                      outputColorSpace: THREE.SRGBColorSpace,
                      toneMappingExposure: 1,
                    }}
                    camera={{ position: [-5, 10, 0], fov: 45 }}
                  >
                    <Suspense fallback={<Loader />}>
                      <Model
                        url={f1tyres}
                        scale={[4.1, 3.9, 3.9]}
                        position={[0, 3.5, -3.7]}
                        rotation={[0, 0, 40]}
                      />
                      <ambientLight intensity={0.3} />
                      <directionalLight
                        castShadow
                        position={[5, 10, 5]}
                        intensity={1.2}
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                      />
                      <spotLight
                        castShadow
                        position={[-5, 8, -5]}
                        intensity={0.8}
                        angle={0.3}
                      />
                      <Environment preset="sunset" background={false} />
                    </Suspense>
                    <OrbitControls
                      target={[0, -0.6, 0]}
                      enableRotate={false}
                      enableZoom={false}
                      enablePan={false}
                    />
                  </Canvas>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="w-full  ">
        <CarsCalc />
      </div>

      <div className="flex flex-col ">
        <div
          style={{ height: "200px", position: "relative", overflow: "hidden" }}
        >
          {/* Basic horizontal loop */}
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={55}
            gap={45}
            hoverSpeed={80}
            scaleOnHover
            fadeOut
            // fadeOutColor="#ffffff"
            ariaLabel="Technology partners"
          />

          {/* Vertical loop with deceleration on hover */}
        </div>
        <div className="">
          <AICard />
        </div>
      </div>
      {/* <CarsFetch /> */}
      {/* <TestCharts /> */}
    </div>
  );
};
