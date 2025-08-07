import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function FloatingParticles({ count = 100 }) {
  const particlesRef = useRef();

  // Generate random positions for particles
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 20;     // x
      pos[i + 1] = (Math.random() - 0.5) * 20; // y
      pos[i + 2] = (Math.random() - 0.5) * 20; // z
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      const positions = particlesRef.current.geometry.attributes.position.array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Gentle floating motion
        positions[i + 1] += Math.sin(time + positions[i]) * 0.001;
        
        // Wrap particles that go too far
        if (positions[i + 1] > 10) positions[i + 1] = -10;
        if (positions[i + 1] < -10) positions[i + 1] = 10;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#4fc3f7"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default FloatingParticles;
