"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";

type PodModelProps = {
  url: string;
};

function PodMesh({ url }: PodModelProps) {
  const { scene } = useGLTF(url);

  return (
    <primitive
      object={scene}
      scale={0.9}
      position={[0, -0.6, 0]}
      rotation={[0, Math.PI / 10, 0]} // slightly more tilt for drama
    />
  );
}

// Preload only existing models (desktop only usage)
useGLTF.preload("/models/pod-v1.glb");
useGLTF.preload("/models/pod-v2.glb");

export default function PodModelCanvas({ url }: PodModelProps) {
  return (
    <Canvas
      key={url}
      camera={{ position: [0, 1.2, 3.2], fov: 45 }}
      dpr={[1, 1.6]} // cap DPR for performance
    >
      {/* Lights – kept minimal for performance */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 2]} intensity={0.9} />

      {/* Lazy loading state */}
      <React.Suspense
        fallback={
          <Html center>
            <div className="text-white text-xs font-tech tracking-widest uppercase">
              Loading 3D Model...
            </div>
          </Html>
        }
      >
        <PodMesh url={url} />
      </React.Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false} // disable zoom to reduce input / CPU
        autoRotate
        autoRotateSpeed={0.8}
      />
    </Canvas>
  );
}
