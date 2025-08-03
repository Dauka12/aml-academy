import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Brain3D from './Brain3D';
import NetworkConnections from './NetworkConnections';
import FloatingParticles from './FloatingParticles';

function Scene3D() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4fc3f7" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#ff6b35"
        castShadow
      />
      
      {/* Main 3D objects */}
      <Brain3D position={[0, 0, 0]} scale={1.5} />
      <NetworkConnections count={30} spread={6} />
      <FloatingParticles count={150} />
      
      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={15}
        autoRotate
        autoRotateSpeed={0.5}
      />
      
      {/* Environment */}
      <Environment preset="night" />
    </>
  );
}

function ThreeJSCanvas() {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 8], fov: 75 }}
      style={{
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)'
      }}
    >
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
    </Canvas>
  );
}

export default ThreeJSCanvas;
