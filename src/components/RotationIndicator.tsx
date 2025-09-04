import React from 'react';
import { cn } from '../lib/utils';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

interface RotationIndicatorProps {
  currentIndex: number;
  totalCount: number;
  progress: number;
  isPlaying: boolean;
  leagueNames: string[];
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onGoTo: (index: number) => void;
  className?: string;
}

export const RotationIndicator: React.FC<RotationIndicatorProps> = ({
  currentIndex,
  totalCount,
  progress,
  isPlaying,
  leagueNames,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onGoTo,
  className,
}) => {
  if (totalCount === 0) {
    return null;
  }

  return (
    <div className={cn(
      "fixed bottom-12 left-1/2 -translate-x-1/2 z-50 group",
      className
    )}>
      <div className="bg-gray-900/90 backdrop-blur-md rounded-full border border-gray-700/30 shadow-xl px-4 py-2">
        <div className="flex items-center gap-3">
          {/* Compact Progress Ring */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-700/50"
              />
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 14}`}
                strokeDashoffset={`${2 * Math.PI * 14 * (1 - progress / 100)}`}
                className="transition-all duration-500 ease-out"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute text-xs font-mono text-gray-300">
              {currentIndex + 1}
            </span>
          </div>

          {/* Compact Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={onPrevious}
              className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-colors disabled:opacity-30"
              disabled={totalCount <= 1}
              title="Previous League"
            >
              <SkipBack className="w-3.5 h-3.5 text-gray-300" />
            </button>

            <button
              onClick={isPlaying ? onPause : onPlay}
              className="p-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 rounded-lg transition-all disabled:opacity-30"
              disabled={totalCount <= 1}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-blue-400" />
              ) : (
                <Play className="w-3.5 h-3.5 text-blue-400 ml-0.5" />
              )}
            </button>

            <button
              onClick={onNext}
              className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-colors disabled:opacity-30"
              disabled={totalCount <= 1}
              title="Next League"
            >
              <SkipForward className="w-3.5 h-3.5 text-gray-300" />
            </button>
          </div>

          {/* Compact League Dots */}
          <div className="flex items-center gap-1.5 ml-1">
            {Array.from({ length: Math.min(totalCount, 8) }, (_, index) => {
              const isActive = index === currentIndex;
              const leagueName = leagueNames[index] || `League ${index + 1}`;
              
              return (
                <button
                  key={index}
                  onClick={() => onGoTo(index)}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-blue-400 to-purple-400 scale-125"
                      : "bg-gray-600/60 hover:bg-gray-500/80 hover:scale-110"
                  )}
                  title={leagueName}
                />
              );
            })}
            {totalCount > 8 && (
              <span className="text-gray-500 text-xs ml-1">+{totalCount - 8}</span>
            )}
          </div>

          {/* League Name - Only show on hover */}
          <div className="hidden group-hover:block absolute top-full right-0 mt-2 px-2 py-1 bg-gray-800/95 rounded text-xs text-gray-200 whitespace-nowrap">
            {leagueNames[currentIndex] || `League ${currentIndex + 1}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotationIndicator;