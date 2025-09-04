import { useState, useEffect, useCallback } from 'react';
import { LeagueStandings, LoadingState } from '../types';
import SleeperAPIService from '../services/sleeperAPI';

export interface UseSleeperAPIReturn {
  standings: LeagueStandings[];
  loading: LoadingState;
  refreshStandings: () => Promise<void>;
  clearCache: () => void;
}

export const useSleeperAPI = (leagueIds: string[]): UseSleeperAPIReturn => {
  const [standings, setStandings] = useState<LeagueStandings[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    error: null,
  });

  const fetchStandings = useCallback(async () => {
    if (leagueIds.length === 0) {
      setStandings([]);
      return;
    }

    setLoading({ isLoading: true, error: null });

    try {
      const results = await SleeperAPIService.getMultipleLeagueStandings(leagueIds);
      setStandings(results);
      setLoading({ isLoading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch standings';
      setLoading({ isLoading: false, error: errorMessage });
      console.error('Error fetching standings:', error);
    }
  }, [leagueIds.join(',')]); // Use join to create stable dependency

  const refreshStandings = useCallback(async () => {
    SleeperAPIService.clearCache();
    await fetchStandings();
  }, [fetchStandings]);

  const clearCache = useCallback(() => {
    SleeperAPIService.clearCache();
  }, []);

  useEffect(() => {
    fetchStandings();
  }, [fetchStandings]);

  return {
    standings,
    loading,
    refreshStandings,
    clearCache,
  };
};

export default useSleeperAPI;