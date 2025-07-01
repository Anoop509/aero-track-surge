
import React from 'react';

const Lighting: React.FC = () => {
  return (
    <>
      {/* Ambient Light */}
      <ambientLight intensity={0.3} color="#6c5ce7" />
      
      {/* Directional Light (Sun) */}
      <directionalLight
        position={[10, 20, 5]}
        intensity={0.8}
        color="#fdcb6e"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-camera-near={0.1}
        shadow-camera-far={100}
      />
      
      {/* Point Lights for Car Headlights Effect */}
      <pointLight position={[-2, 2, 5]} intensity={0.5} color="#fdcb6e" />
      <pointLight position={[2, 2, 5]} intensity={0.5} color="#fdcb6e" />
      
      {/* Street Lights */}
      <pointLight position={[-8, 5, -10]} intensity={0.4} color="#74b9ff" />
      <pointLight position={[8, 5, -10]} intensity={0.4} color="#74b9ff" />
      <pointLight position={[-8, 5, -30]} intensity={0.4} color="#74b9ff" />
      <pointLight position={[8, 5, -30]} intensity={0.4} color="#74b9ff" />
      
      {/* Neon Effect Lights */}
      <pointLight position={[0, 1, -15]} intensity={0.3} color="#e84393" />
      <pointLight position={[0, 1, -35]} intensity={0.3} color="#00cec9" />
    </>
  );
};

export default Lighting;
