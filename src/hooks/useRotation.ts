import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseRotationReturn {
  currentIndex: number;
  isPlaying: boolean;
  progress: number;
  nextItem: () => void;
  previousItem: () => void;
  goToItem: (index: number) => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
}

export interface UseRotationOptions {
  itemCount: number;
  interval?: number; // in milliseconds
  autoStart?: boolean;
  loop?: boolean;
}

export const useRotation = ({
  itemCount,
  interval = 20000, // 20 seconds default
  autoStart = true,
  loop = true,
}: UseRotationOptions): UseRotationReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoStart);
  const [progress, setProgress] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const clearIntervals = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const updateProgress = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const newProgress = Math.min((elapsed / interval) * 100, 100);
    setProgress(newProgress);
  }, [interval]);

  const nextItem = useCallback(() => {
    if (itemCount === 0) return;
    
    setCurrentIndex(prevIndex => {
      if (prevIndex >= itemCount - 1) {
        return loop ? 0 : prevIndex;
      }
      return prevIndex + 1;
    });
    
    // Reset progress and start time
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [itemCount, loop]);

  const previousItem = useCallback(() => {
    if (itemCount === 0) return;
    
    setCurrentIndex(prevIndex => {
      if (prevIndex <= 0) {
        return loop ? itemCount - 1 : 0;
      }
      return prevIndex - 1;
    });
    
    // Reset progress and start time
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [itemCount, loop]);

  const goToItem = useCallback((index: number) => {
    if (index >= 0 && index < itemCount) {
      setCurrentIndex(index);
      setProgress(0);
      startTimeRef.current = Date.now();
    }
  }, [itemCount]);

  const play = useCallback(() => {
    if (itemCount <= 1) return;
    
    setIsPlaying(true);
    startTimeRef.current = Date.now();
  }, [itemCount]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    clearIntervals();
  }, [clearIntervals]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setProgress(0);
    setIsPlaying(autoStart);
    startTimeRef.current = Date.now();
  }, [autoStart]);

  // Main rotation effect
  useEffect(() => {
    if (!isPlaying || itemCount <= 1) {
      clearIntervals();
      return;
    }

    // Set up main rotation interval
    intervalRef.current = setInterval(() => {
      nextItem();
    }, interval);

    // Set up progress update interval (update every 100ms for smooth progress)
    progressIntervalRef.current = setInterval(updateProgress, 100);

    return clearIntervals;
  }, [isPlaying, itemCount, interval, nextItem, updateProgress, clearIntervals]);

  // Reset when itemCount changes
  useEffect(() => {
    if (currentIndex >= itemCount) {
      setCurrentIndex(0);
    }
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [itemCount, currentIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return clearIntervals;
  }, [clearIntervals]);

  return {
    currentIndex,
    isPlaying,
    progress,
    nextItem,
    previousItem,
    goToItem,
    play,
    pause,
    reset,
  };
};

export default useRotation;