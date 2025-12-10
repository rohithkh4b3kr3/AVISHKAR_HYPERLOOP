'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, useGLTF } from '@react-three/drei';

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
      rotation={[0, Math.PI / 8, 0]}
    />
  );
}

// Preload only existing models
useGLTF.preload('/models/pod-v1.glb');
useGLTF.preload('/models/pod-v2.glb');

export default function PodModelCanvas({ url }: PodModelProps) {
  return (
    <Canvas key={url} camera={{ position: [0, 1.2, 3.2], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 2]} intensity={1.0} />
      <directionalLight position={[-2, 3, -3]} intensity={0.5} />

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
        enableZoom
        minDistance={2}
        maxDistance={6}
        autoRotate
        autoRotateSpeed={1.2}
      />
    </Canvas>
  );
}
