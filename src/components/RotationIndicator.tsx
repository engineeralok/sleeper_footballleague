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
      "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50",
      className
    )}>
      {/* <div className="bg-surface-dark/95 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-modern p-6"> */}
      {/* Progress Bar */}
      {/* <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-200 text-sm font-medium font-inter">
              League {currentIndex + 1} of {totalCount}
            </span>
            <span className="text-gray-400 text-sm font-mono">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-80 h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div> */}

      {/* Controls */}
      {/* <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={onPrevious}
            className="p-3 bg-gray-800/50 hover:bg-gray-700/70 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={totalCount <= 1}
          >
            <SkipBack className="w-5 h-5 text-gray-200" />
          </button>

          <button
            onClick={isPlaying ? onPause : onPlay}
            className="p-4 bg-gradient-to-r from-accent-blue to-accent-purple hover:from-accent-blue/90 hover:to-accent-purple/90 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={totalCount <= 1}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-0.5" />
            )}
          </button>

          <button
            onClick={onNext}
            className="p-3 bg-gray-800/50 hover:bg-gray-700/70 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={totalCount <= 1}
          >
            <SkipForward className="w-5 h-5 text-gray-200" />
          </button>
        </div> */}

      {/* League Dots */}
      {/* <div className="flex items-center justify-center gap-3">
          {Array.from({ length: totalCount }, (_, index) => {
            const isActive = index === currentIndex;
            const leagueName = leagueNames[index] || `League ${index + 1}`;
            
            return (
              <button
                key={index}
                onClick={() => onGoTo(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300 hover:scale-125",
                  isActive
                    ? "bg-gradient-to-r from-accent-blue to-accent-purple scale-125 shadow-lg"
                    : "bg-gray-600/60 hover:bg-gray-500/80"
                )}
                title={leagueName}
              />
            );
          })}
        </div> */}

      {/* Current League Name */}
      {/* {leagueNames[currentIndex] && (
          <div className="mt-4 text-center">
            <div className="text-gray-200 text-sm font-medium font-inter truncate max-w-xs">
              {leagueNames[currentIndex]}
            </div>
          </div>
        )} */}

    </div>
  );
};

export default RotationIndicator;