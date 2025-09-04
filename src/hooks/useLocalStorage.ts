import { useState, useEffect, useCallback } from 'react';
import { AppConfig } from '../types';

const DEFAULT_CONFIG: AppConfig = {
  leagueIds: [
    '784462448236363776', '784462448236363777', '784462448236363778', '784462448236363779',
    '784462448236363780', '784462448236363781', '784462448236363782', '784462448236363783'
  ],
  rotationInterval: 20000, // 20 seconds
  enabledLeagues: [true, true, true, true, true, true, true, true],
  displaySettings: {
    showLogos: true,
    animationSpeed: 500,
    theme: 'sports',
  },
};

const STORAGE_KEY = 'fantasy-standings-config';

export interface UseLocalStorageReturn {
  config: AppConfig;
  updateConfig: (newConfig: Partial<AppConfig>) => void;
  resetConfig: () => void;
  isLoaded: boolean;
}

export const useLocalStorage = (): UseLocalStorageReturn => {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load config from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedConfig = JSON.parse(stored) as AppConfig;
        
        // Merge with default config to ensure all properties exist
        const mergedConfig: AppConfig = {
          ...DEFAULT_CONFIG,
          ...parsedConfig,
          displaySettings: {
            ...DEFAULT_CONFIG.displaySettings,
            ...parsedConfig.displaySettings,
          },
        };
        
        setConfig(mergedConfig);
      }
    } catch (error) {
      console.error('Error loading config from localStorage:', error);
      // If there's an error, use default config
      setConfig(DEFAULT_CONFIG);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save config to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      } catch (error) {
        console.error('Error saving config to localStorage:', error);
      }
    }
  }, [config, isLoaded]);

  const updateConfig = useCallback((newConfig: Partial<AppConfig>) => {
    setConfig(prevConfig => {
      const updatedConfig = {
        ...prevConfig,
        ...newConfig,
      };
      
      // Handle nested displaySettings update
      if (newConfig.displaySettings) {
        updatedConfig.displaySettings = {
          ...prevConfig.displaySettings,
          ...newConfig.displaySettings,
        };
      }
      
      return updatedConfig;
    });
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error removing config from localStorage:', error);
    }
  }, []);

  return {
    config,
    updateConfig,
    resetConfig,
    isLoaded,
  };
};

// Helper functions for specific config updates
export const useLeagueIds = () => {
  const { config, updateConfig } = useLocalStorage();
  
  const updateLeagueId = useCallback((index: number, leagueId: string) => {
    const newLeagueIds = [...config.leagueIds];
    newLeagueIds[index] = leagueId;
    updateConfig({ leagueIds: newLeagueIds });
  }, [config.leagueIds, updateConfig]);
  
  const toggleLeague = useCallback((index: number) => {
    const newEnabledLeagues = [...config.enabledLeagues];
    newEnabledLeagues[index] = !newEnabledLeagues[index];
    updateConfig({ enabledLeagues: newEnabledLeagues });
  }, [config.enabledLeagues, updateConfig]);
  
  return {
    leagueIds: config.leagueIds,
    enabledLeagues: config.enabledLeagues,
    updateLeagueId,
    toggleLeague,
  };
};

export const useDisplaySettings = () => {
  const { config, updateConfig } = useLocalStorage();
  
  const updateDisplaySetting = useCallback(<K extends keyof AppConfig['displaySettings']>(
    key: K,
    value: AppConfig['displaySettings'][K]
  ) => {
    updateConfig({
      displaySettings: {
        ...config.displaySettings,
        [key]: value,
      },
    });
  }, [config.displaySettings, updateConfig]);
  
  return {
    displaySettings: config.displaySettings,
    updateDisplaySetting,
  };
};

export default useLocalStorage;