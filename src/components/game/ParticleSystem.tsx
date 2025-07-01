
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointsMaterial } from 'three';
import * as THREE from 'three';

interface ParticleSystemProps {
  carPosition?: THREE.Vector3;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ carPosition }) => {
  const pointsRef = useRef<Points>(null);
  
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(1000 * 3);
    
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        let z = positions.getZ(i);
        z += 0.2;
        if (z > 20) z = -80;
        positions.setZ(i, z);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} geometry={particlesGeometry}>
      <pointsMaterial 
        color="#ffffff" 
        size={0.1} 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export default ParticleSystem;
