import React from 'react';
import { cn } from '../lib/utils';
import { Loader2, Wifi, WifiOff } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  error?: string | null;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'lg',
  message = 'Loading...',
  error = null,
  className,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  if (error) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center h-96 text-center",
        className
      )}>
        <div className="bg-accent-red/10 border border-accent-red/20 rounded-2xl p-8 mb-8 shadow-lg">
          <WifiOff className="w-16 h-16 text-accent-red mx-auto" />
        </div>
        <div className="text-accent-red text-3xl font-bold mb-4 font-inter">Connection Error</div>
        <div className="text-gray-300 text-xl max-w-md font-inter">
          {error}
        </div>
        <div className="text-gray-400 text-base mt-6 font-inter">
          Please check your configuration
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex flex-col items-center justify-center h-96",
      className
    )}>
      {/* Animated Background */}
      <div className="relative">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-700/30 animate-pulse" 
             style={{ width: '140px', height: '140px' }} />
        
        {/* Middle Ring */}
        <div className="absolute inset-3 rounded-full border-2 border-accent-blue/40 animate-spin" 
             style={{ animationDuration: '2.5s' }} />
        
        {/* Inner Spinner */}
        <div className="relative flex items-center justify-center" 
             style={{ width: '140px', height: '140px' }}>
          <div className="bg-surface-card/80 backdrop-blur-sm border border-gray-700/50 rounded-full w-32 h-32 flex items-center justify-center shadow-xl">
            <Loader2 className={cn(
              "text-accent-blue animate-spin",
              sizeClasses[size]
            )} />
          </div>
        </div>
      </div>

      {/* Loading Message */}
      <div className="mt-10 text-center">
        <div className={cn(
          "text-gray-100 font-semibold mb-4 font-inter",
          textSizeClasses[size]
        )}>
          {message}
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center justify-center gap-3 text-gray-300">
          <Wifi className="w-5 h-5 animate-pulse text-accent-blue" />
          <span className="text-base font-inter">Processing data...</span>
        </div>
      </div>

      {/* Loading Dots Animation */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-accent-blue rounded-full animate-bounce shadow-lg"
            style={{
              animationDelay: `${i * 0.15}s`,
              animationDuration: '0.8s',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;