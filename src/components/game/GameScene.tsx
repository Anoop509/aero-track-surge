
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import Car from './Car';
import Track from './Track';
import Obstacles from './Obstacles';
import ParticleSystem from './ParticleSystem';
import Lighting from './Lighting';
import { Vector3 } from 'three';

interface GameSceneProps {
  gameState: any;
  onUpdateScore: (points: number) => void;
  onUpdateSpeed: (speed: number) => void;
  onGameOver: () => void;
  onLoseLife: () => void;
}

const GameScene: React.FC<GameSceneProps> = ({
  gameState,
  onUpdateScore,
  onUpdateSpeed,
  onGameOver,
  onLoseLife
}) => {
  const carRef = useRef<any>();
  const cameraRef = useRef<any>();
  const trackOffset = useRef(0);

  useFrame((state, delta) => {
    if (!gameState.isPlaying || gameState.isPaused) return;

    // Update track scrolling
    trackOffset.current += delta * 5;

    // Update camera to follow car
    if (carRef.current && cameraRef.current) {
      const carPosition = carRef.current.position;
      const targetPosition = new Vector3(
        carPosition.x,
        carPosition.y + 8,
        carPosition.z + 12
      );
      
      cameraRef.current.position.lerp(targetPosition, delta * 2);
      cameraRef.current.lookAt(carPosition);
    }

    // Update speed based on time
    const currentSpeed = Math.min(100, 20 + trackOffset.current * 0.1);
    onUpdateSpeed(currentSpeed);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 8, 12]} />
      
      <Lighting />
      
      <Environment preset="night" />
      
      <Car 
        ref={carRef}
        gameState={gameState}
        onCollision={onLoseLife}
      />
      
      <Track offset={trackOffset.current} />
      
      <Obstacles
        offset={trackOffset.current}
        onCollision={onLoseLife}
        onScoreUpdate={onUpdateScore}
        carPosition={carRef.current?.position}
      />
      
      <ParticleSystem carPosition={carRef.current?.position} />
      
      <fog attach="fog" args={['#1a1a2e', 30, 100]} />
    </>
  );
};

export default GameScene;
