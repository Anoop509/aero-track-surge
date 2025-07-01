
import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

interface TrackProps {
  offset: number;
}

const Track: React.FC<TrackProps> = ({ offset }) => {
  const trackRef = useRef<any>();
  const linesRef = useRef<any[]>([]);

  useFrame(() => {
    // Animate track lines
    linesRef.current.forEach((line, index) => {
      if (line) {
        line.position.z = (line.position.z + 0.5) % 20 - 10;
      }
    });
  });

  return (
    <group>
      {/* Road Surface */}
      <mesh position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[20, 200]} />
        <meshStandardMaterial color="#2d3436" />
      </mesh>
      
      {/* Road Markings */}
      {Array.from({ length: 40 }).map((_, i) => (
        <mesh
          key={i}
          ref={el => linesRef.current[i] = el}
          position={[0, 0.001, i * 2 - 40]}
        >
          <planeGeometry args={[0.3, 1.5]} />
          <meshStandardMaterial color="#fdcb6e" />
        </mesh>
      ))}
      
      {/* Side Barriers */}
      <mesh position={[-10, 1, 0]} castShadow>
        <boxGeometry args={[2, 2, 200]} />
        <meshStandardMaterial color="#e17055" />
      </mesh>
      <mesh position={[10, 1, 0]} castShadow>
        <boxGeometry args={[2, 2, 200]} />
        <meshStandardMaterial color="#e17055" />
      </mesh>
      
      {/* Guardrails */}
      {Array.from({ length: 20 }).map((_, i) => (
        <group key={i}>
          <mesh position={[-9, 0.5, i * 10 - 100]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 1]} />
            <meshStandardMaterial color="#74b9ff" metalness={0.8} />
          </mesh>
          <mesh position={[9, 0.5, i * 10 - 100]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 1]} />
            <meshStandardMaterial color="#74b9ff" metalness={0.8} />
          </mesh>
        </group>
      ))}
      
      {/* Ground */}
      <mesh position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[100, 200]} />
        <meshStandardMaterial color="#00b894" />
      </mesh>
    </group>
  );
};

export default Track;
