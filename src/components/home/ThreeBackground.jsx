import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  Ring,
  Torus,
  Stars,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

// Animated 3D Objects
const AnimatedObjects = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Sphere */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1.2, 64, 64]} position={[-2, 0, 0]}>
          <meshPhysicalMaterial
            color="#FF69B4"
            metalness={0.3}
            roughness={0.2}
            transparent
            opacity={0.4}
            wireframe
          />
        </Sphere>
      </Float>

      {/* Secondary Sphere */}
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
        <Sphere args={[0.8, 32, 32]} position={[2.5, 1, -1]}>
          <meshPhysicalMaterial
            color="#FF1493"
            metalness={0.5}
            roughness={0.1}
            transparent
            opacity={0.3}
          />
        </Sphere>
      </Float>

      {/* Ring */}
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.2}>
        <Ring
          args={[1.5, 2, 64]}
          position={[0, -0.5, -2]}
          rotation={[Math.PI / 3, 0, 0]}
        >
          <meshPhysicalMaterial
            color="#FF6B6B"
            metalness={0.6}
            roughness={0.2}
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
          />
        </Ring>
      </Float>

      {/* Torus */}
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
        <Torus
          args={[1, 0.3, 16, 100]}
          position={[-1, 1.5, 1]}
          rotation={[Math.PI / 4, 0, 0]}
        >
          <meshPhysicalMaterial
            color="#FFB6C1"
            metalness={0.2}
            roughness={0.3}
            transparent
            opacity={0.3}
          />
        </Torus>
      </Float>

      {/* Stars Background */}
      <Stars
        radius={10}
        depth={5}
        count={200}
        factor={2}
        saturation={0.5}
        fade
        speed={0.5}
      />
    </group>
  );
};

const ThreeBackground = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />

      <AnimatedObjects />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  );
};

export default ThreeBackground;
