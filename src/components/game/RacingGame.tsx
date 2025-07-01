
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import GameScene from './GameScene';
import GameUI from './GameUI';
import GameMenu from './GameMenu';

interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  score: number;
  speed: number;
  lives: number;
  gameOver: boolean;
}

const RacingGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isPaused: false,
    score: 0,
    speed: 0,
    lives: 3,
    gameOver: false
  });

  const startGame = () => {
    setGameState({
      isPlaying: true,
      isPaused: false,
      score: 0,
      speed: 0,
      lives: 3,
      gameOver: false
    });
  };

  const pauseGame = () => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const gameOver = () => {
    setGameState(prev => ({ ...prev, gameOver: true, isPlaying: false }));
  };

  const restartGame = () => {
    startGame();
  };

  const updateScore = (points: number) => {
    setGameState(prev => ({ ...prev, score: prev.score + points }));
  };

  const updateSpeed = (speed: number) => {
    setGameState(prev => ({ ...prev, speed }));
  };

  const loseLife = () => {
    setGameState(prev => {
      const newLives = prev.lives - 1;
      if (newLives <= 0) {
        return { ...prev, lives: 0, gameOver: true, isPlaying: false };
      }
      return { ...prev, lives: newLives };
    });
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === ' ' && gameState.isPlaying) {
        event.preventDefault();
        pauseGame();
      }
      if (event.key === 'Escape') {
        pauseGame();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.isPlaying]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black">
      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 75 }}
        className="w-full h-full"
      >
        <GameScene
          gameState={gameState}
          onUpdateScore={updateScore}
          onUpdateSpeed={updateSpeed}
          onGameOver={gameOver}
          onLoseLife={loseLife}
        />
      </Canvas>
      
      <GameUI
        gameState={gameState}
        onPause={pauseGame}
        onRestart={restartGame}
      />
      
      {!gameState.isPlaying && (
        <GameMenu
          gameState={gameState}
          onStart={startGame}
          onRestart={restartGame}
        />
      )}
    </div>
  );
};

export default RacingGame;
