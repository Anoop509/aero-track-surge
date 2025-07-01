
import React from 'react';
import { Play, Trophy, Settings } from 'lucide-react';

interface GameMenuProps {
  gameState: any;
  onStart: () => void;
  onRestart: () => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ gameState, onStart, onRestart }) => {
  const isGameOver = gameState.gameOver;

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/90 via-blue-900/90 to-black/90 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center text-white max-w-md mx-auto p-8">
        {/* Logo/Title */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            NEON RACER
          </h1>
          <div className="text-xl opacity-70">
            {isGameOver ? '🏁 GAME OVER' : '🏎️ Ready to Race?'}
          </div>
        </div>

        {/* Game Over Stats */}
        {isGameOver && (
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-purple-500/30">
            <div className="flex justify-center items-center gap-8">
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold text-yellow-400">{gameState.score.toLocaleString()}</div>
                <div className="text-xs opacity-70">FINAL SCORE</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{Math.round(gameState.speed)}</div>
                <div className="text-xs opacity-70">MAX SPEED</div>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={isGameOver ? onRestart : onStart}
            className="w-full py-4 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <Play className="w-6 h-6" />
            {isGameOver ? 'PLAY AGAIN' : 'START GAME'}
          </button>

          {!isGameOver && (
            <>
              <button className="w-full py-3 px-6 bg-black/50 hover:bg-black/70 rounded-xl transition-all border border-gray-600 flex items-center justify-center gap-3">
                <Trophy className="w-5 h-5" />
                HIGH SCORES
              </button>
              
              <button className="w-full py-3 px-6 bg-black/50 hover:bg-black/70 rounded-xl transition-all border border-gray-600 flex items-center justify-center gap-3">
                <Settings className="w-5 h-5" />
                SETTINGS
              </button>
            </>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 text-sm opacity-70 space-y-2">
          <div>🎮 Use WASD or Arrow Keys to control your car</div>
          <div>⭐ Collect power-ups for bonus points</div>
          <div>⚠️ Avoid obstacles to stay alive</div>
          <div>🚀 Speed increases as you progress!</div>
        </div>

        {/* Version */}
        <div className="mt-8 text-xs opacity-50">
          Neon Racer v1.0 - Built with React & Three.js
        </div>
      </div>
    </div>
  );
};

export default GameMenu;
