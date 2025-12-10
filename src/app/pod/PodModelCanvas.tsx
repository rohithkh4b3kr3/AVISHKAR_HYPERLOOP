"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";

type PodModelProps = {
  url: string;
};

function PodMesh({ url }: PodModelProps) {
  const { scene } = useGLTF(url);

  return (
    <primitive
      object={scene}
      scale={0.85}
      position={[0, -0.6, 0]}
      rotation={[0, 0, 0]} // NO auto-rotation
    />
  );
}

// Only preload models that actually exist
useGLTF.preload("/models/pod-v1.glb");
useGLTF.preload("/models/pod-v2.glb");

export default function PodModelCanvas({ url }: PodModelProps) {
  return (
    <Canvas
      key={url}
      camera={{ position: [0, 1.2, 3], fov: 45 }}
      gl={{ antialias: true }}
      dpr={[1, 1.5]} // reduce device pixel ratio to avoid mobile lag
    >
      {/* Extremely lightweight lighting */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 3, 3]} intensity={1} />

      <React.Suspense
        fallback={
          <Html center>
            <div className="text-white text-xs font-tech tracking-widest uppercase">
              Loading Model...
            </div>
          </Html>
        }
      >
        <PodMesh url={url} />
      </React.Suspense>
    </Canvas>
  );
}
