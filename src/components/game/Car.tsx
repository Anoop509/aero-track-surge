
import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { Group, Vector3 } from 'three';

interface CarProps {
  gameState: any;
  onCollision: () => void;
}

const Car = forwardRef<Group, CarProps>(({ gameState, onCollision }, ref) => {
  const meshRef = useRef<Group>(null);
  const velocity = useRef(new Vector3(0, 0, 0));
  const keys = useKeyboardControls();

  useImperativeHandle(ref, () => meshRef.current!);

  useFrame((state, delta) => {
    if (!meshRef.current || !gameState.isPlaying || gameState.isPaused) return;

    const car = meshRef.current;
    const speed = 15;
    const maxSpeed = 25;

    // Handle input
    if (keys.left || keys.a) {
      velocity.current.x = Math.max(velocity.current.x - speed * delta, -maxSpeed);
      car.rotation.z = Math.min(car.rotation.z + delta * 2, 0.3);
    } else if (keys.right || keys.d) {
      velocity.current.x = Math.min(velocity.current.x + speed * delta, maxSpeed);
      car.rotation.z = Math.max(car.rotation.z - delta * 2, -0.3);
    } else {
      velocity.current.x *= 0.95;
      car.rotation.z *= 0.9;
    }

    if (keys.up || keys.w) {
      velocity.current.z = Math.max(velocity.current.z - speed * delta, -maxSpeed);
      car.rotation.x = Math.min(car.rotation.x + delta, 0.1);
    } else if (keys.down || keys.s) {
      velocity.current.z = Math.min(velocity.current.z + speed * delta, maxSpeed * 0.5);
      car.rotation.x = Math.max(car.rotation.x - delta, -0.1);
    } else {
      velocity.current.z *= 0.98;
      car.rotation.x *= 0.9;
    }

    // Apply velocity
    car.position.add(velocity.current.clone().multiplyScalar(delta));

    // Keep car on track
    car.position.x = Math.max(-8, Math.min(8, car.position.x));
    car.position.y = 0.5;

    // Bobbing animation
    car.position.y += Math.sin(state.clock.elapsedTime * 10) * 0.02;
  });

  return (
    <group ref={meshRef} position={[0, 0.5, 0]}>
      {/* Car Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.8, 0.6, 3.5]} />
        <meshStandardMaterial color="#ff6b6b" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Car Top */}
      <mesh position={[0, 0.4, -0.3]} castShadow>
        <boxGeometry args={[1.4, 0.6, 1.8]} />
        <meshStandardMaterial color="#d63031" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Windows */}
      <mesh position={[0, 0.65, -0.3]}>
        <boxGeometry args={[1.3, 0.4, 1.7]} />
        <meshStandardMaterial color="#74b9ff" transparent opacity={0.6} />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[-0.8, -0.2, 1.2]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
        <meshStandardMaterial color="#2d3436" />
      </mesh>
      <mesh position={[0.8, -0.2, 1.2]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
        <meshStandardMaterial color="#2d3436" />
      </mesh>
      <mesh position={[-0.8, -0.2, -1.2]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
        <meshStandardMaterial color="#2d3436" />
      </mesh>
      <mesh position={[0.8, -0.2, -1.2]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
        <meshStandardMaterial color="#2d3436" />
      </mesh>
      
      {/* Headlights */}
      <mesh position={[-0.6, 0.1, 1.8]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#fdcb6e" emissive="#fdcb6e" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.6, 0.1, 1.8]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#fdcb6e" emissive="#fdcb6e" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Exhaust effect */}
      <mesh position={[0, -0.1, -1.8]}>
        <cylinderGeometry args={[0.1, 0.15, 0.3]} />
        <meshStandardMaterial color="#636e72" />
      </mesh>
    </group>
  );
});

Car.displayName = 'Car';

export default Car;
