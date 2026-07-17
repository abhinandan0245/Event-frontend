import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
// 1. We import 'Html' from drei. This is the secret weapon!
import { OrbitControls, Preload, useGLTF, Html } from "@react-three/drei";
import CanvasLoader from "../Loader/Loader";

// ─── INTERNAL GLTF EARTH RENDERER ───
const Earth = () => {
  const earth = useGLTF("/planet/scene.gltf");
  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

// ─── EXPORTABLE CANVAS COMPONENT ───
const EarthCanvas = () => {
  return (
    <div className="w-full h-full min-h-[500px] relative z-10 block">
      {/* 
        2. The Canvas is now on the OUTSIDE. 
        It mounts once and stays running permanently, surviving page refreshes!
      */}
      <Canvas
        shadows
        frameloop="always" 
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={2.2} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />

        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        
        {/* 
          3. Suspense is now safely INSIDE the Canvas. 
          We wrap your CanvasLoader in <Html center> so React Three Fiber 
          knows it is a DOM element, preventing the namespace crash!
        */}
        <Suspense 
          fallback={
            <Html center>
              <CanvasLoader />
            </Html>
          }
        >
          <Earth />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload the model into global memory
useGLTF.preload("/planet/scene.gltf");

export default EarthCanvas;