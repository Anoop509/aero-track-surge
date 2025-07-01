
import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

interface ObstaclesProps {
  offset: number;
  onCollision: () => void;
  onScoreUpdate: (points: number) => void;
  carPosition?: Vector3;
}

interface Obstacle {
  id: number;
  position: Vector3;
  type: 'car' | 'cone' | 'powerup';
  collected: boolean;
}

const Obstacles: React.FC<ObstaclesProps> = ({ 
  offset, 
  onCollision, 
  onScoreUpdate, 
  carPosition 
}) => {
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const obstacleIdRef = useRef(0);

  useEffect(() => {
    // Generate initial obstacles
    const initialObstacles: Obstacle[] = [];
    for (let i = 0; i < 20; i++) {
      initialObstacles.push({
        id: obstacleIdRef.current++,
        position: new Vector3(
          (Math.random() - 0.5) * 12,
          0.5,
          -i * 8 - 20
        ),
        type: Math.random() > 0.7 ? 'powerup' : Math.random() > 0.5 ? 'car' : 'cone',
        collected: false
      });
    }
    setObstacles(initialObstacles);
  }, []);

  useFrame(() => {
    setObstacles(prev => {
      const updated = prev.map(obstacle => ({
        ...obstacle,
        position: new Vector3(
          obstacle.position.x,
          obstacle.position.y,
          obstacle.position.z + 0.3
        )
      }));

      // Remove obstacles that are too far behind
      const filtered = updated.filter(obs => obs.position.z < 20);

      // Add new obstacles
      if (filtered.length < 15) {
        for (let i = 0; i < 5; i++) {
          filtered.push({
            id: obstacleIdRef.current++,
            position: new Vector3(
              (Math.random() - 0.5) * 12,
              0.5,
              -30 - i * 5
            ),
            type: Math.random() > 0.8 ? 'powerup' : Math.random() > 0.5 ? 'car' : 'cone',
            collected: false
          });
        }
      }

      // Check collisions with car
      if (carPosition) {
        filtered.forEach(obstacle => {
          const distance = carPosition.distanceTo(obstacle.position);
          if (distance < 2 && !obstacle.collected) {
            if (obstacle.type === 'powerup') {
              onScoreUpdate(100);
              obstacle.collected = true;
            } else {
              onCollision();
            }
          }
        });
      }

      return filtered;
    });
  });

  return (
    <group>
      {obstacles.map(obstacle => {
        if (obstacle.collected && obstacle.type === 'powerup') return null;
        
        return (
          <group key={obstacle.id} position={obstacle.position.toArray()}>
            {obstacle.type === 'car' && (
              <mesh castShadow>
                <boxGeometry args={[1.5, 0.8, 3]} />
                <meshStandardMaterial color="#e84393" />
              </mesh>
            )}
            
            {obstacle.type === 'cone' && (
              <mesh castShadow>
                <coneGeometry args={[0.5, 1.5, 8]} />
                <meshStandardMaterial color="#fd79a8" />
              </mesh>
            )}
            
            {obstacle.type === 'powerup' && !obstacle.collected && (
              <mesh>
                <octahedronGeometry args={[0.5]} />
                <meshStandardMaterial 
                  color="#00cec9" 
                  emissive="#00cec9" 
                  emissiveIntensity={0.3}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
};

export default Obstacles;
