import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Brain3D({ position = [0, 0, 0], scale = 1 }) {
  const meshRef = useRef();
  const wireframeRef = useRef();
  
  // Create brain-like geometry
  const brainGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const positions = geometry.attributes.position.array;
    
    // Add noise to make it brain-like
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      
      const noise = Math.sin(x * 4) * Math.cos(y * 4) * Math.sin(z * 4) * 0.15;
      const length = Math.sqrt(x * x + y * y + z * z);
      
      positions[i] = x + (x / length) * noise;
      positions[i + 1] = y + (y / length) * noise;
      positions[i + 2] = z + (z / length) * noise;
    }
    
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  // Animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += 0.005;
      wireframeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Main brain mesh */}
      <mesh ref={meshRef} geometry={brainGeometry}>
        <meshPhongMaterial
          color="#4fc3f7"
          transparent
          opacity={0.8}
          shininess={100}
          specular="#ffffff"
        />
      </mesh>
      
      {/* Wireframe overlay */}
      <mesh ref={wireframeRef} geometry={brainGeometry} scale={1.02}>
        <meshBasicMaterial
          color="#ff6b35"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Glowing outer shell */}
      <mesh geometry={brainGeometry} scale={1.1}>
        <meshBasicMaterial
          color="#4fc3f7"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export default Brain3D;
