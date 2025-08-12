import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function NetworkConnections({ count = 50, spread = 8 }) {
  const linesRef = useRef();
  const pointsRef = useRef();

  // Generate random points for network nodes
  const points = React.useMemo(() => {
    const pts = [];
    for (let i = 0; i < count; i++) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread
        )
      );
    }
    return pts;
  }, [count, spread]);

  // Create connections between nearby points
  const connections = React.useMemo(() => {
    const conns = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const distance = points[i].distanceTo(points[j]);
        if (distance < 3) {
          conns.push([points[i], points[j]]);
        }
      }
    }
    return conns;
  }, [points]);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y += 0.002;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group>
      {/* Connection lines */}
      <group ref={linesRef}>
        {connections.map((connection, index) => (
          <line key={index}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  connection[0].x, connection[0].y, connection[0].z,
                  connection[1].x, connection[1].y, connection[1].z
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#ff6b35"
              transparent
              opacity={0.3}
              linewidth={1}
            />
          </line>
        ))}
      </group>

      {/* Network nodes */}
      <group ref={pointsRef}>
        {points.map((point, index) => (
          <mesh key={index} position={point}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial
              color="#4fc3f7"
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default NetworkConnections;
