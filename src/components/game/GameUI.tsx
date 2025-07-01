
import React from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';

interface GameUIProps {
  gameState: any;
  onPause: () => void;
  onRestart: () => void;
}

const GameUI: React.FC<GameUIProps> = ({ gameState, onPause, onRestart }) => {
  if (!gameState.isPlaying && !gameState.gameOver) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-auto">
        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white border border-purple-500/30">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-xs opacity-70">SCORE</div>
              <div className="text-2xl font-bold text-yellow-400">{gameState.score.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-xs opacity-70">SPEED</div>
              <div className="text-2xl font-bold text-blue-400">{Math.round(gameState.speed)} KM/H</div>
            </div>
            <div className="text-center">
              <div className="text-xs opacity-70">LIVES</div>
              <div className="text-2xl font-bold text-red-400">{'❤️'.repeat(gameState.lives)}</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onPause}
            className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-black/90 transition-all border border-purple-500/30"
          >
            {gameState.isPaused ? <Play size={24} /> : <Pause size={24} />}
          </button>
          <button
            onClick={onRestart}
            className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-black/90 transition-all border border-purple-500/30"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </div>

      {/* Speed Boost Indicator */}
      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white border border-purple-500/30">
        <div className="text-xs opacity-70 mb-2">BOOST</div>
        <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-red-500 transition-all duration-300"
            style={{ width: `${Math.min(100, gameState.speed)}%` }}
          />
        </div>
      </div>

      {/* Controls Help */}
      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white text-sm border border-purple-500/30">
        <div className="text-xs opacity-70 mb-2">CONTROLS</div>
        <div className="space-y-1">
          <div>🏎️ WASD / Arrow Keys - Move</div>
          <div>⏸️ SPACE - Pause</div>
          <div>🔄 ESC - Menu</div>
        </div>
      </div>

      {/* Pause Overlay */}
      {gameState.isPaused && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-8 text-white text-center border border-purple-500/30">
            <h2 className="text-4xl font-bold mb-4 text-purple-400">PAUSED</h2>
            <p className="text-lg opacity-70 mb-6">Press SPACE to continue</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={onPause}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all"
              >
                Resume
              </button>
              <button
                onClick={onRestart}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-all"
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameUI;
