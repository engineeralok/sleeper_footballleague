import axios from 'axios';
import { League, Roster, User, TeamStanding, LeagueStandings } from '../types';

const SLEEPER_API_BASE = 'https://api.sleeper.app/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: SLEEPER_API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API rate limiting helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class SleeperAPIService {
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private static getCachedData<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data as T;
    }
    return null;
  }

  private static setCachedData(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  /**
   * Get league information by league ID
   */
  static async getLeague(leagueId: string): Promise<League> {
    const cacheKey = `league_${leagueId}`;
    const cached = this.getCachedData<League>(cacheKey);
    if (cached) return cached;

    try {
      const response = await api.get<League>(`/league/${leagueId}`);
      this.setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching league ${leagueId}:`, error);
      throw new Error(`Failed to fetch league data for ${leagueId}`);
    }
  }

  /**
   * Get all rosters for a league
   */
  static async getLeagueRosters(leagueId: string): Promise<Roster[]> {
    const cacheKey = `rosters_${leagueId}`;
    const cached = this.getCachedData<Roster[]>(cacheKey);
    if (cached) return cached;

    try {
      const response = await api.get<Roster[]>(`/league/${leagueId}/rosters`);
      this.setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching rosters for league ${leagueId}:`, error);
      throw new Error(`Failed to fetch rosters for league ${leagueId}`);
    }
  }

  /**
   * Get all users for a league
   */
  static async getLeagueUsers(leagueId: string): Promise<User[]> {
    const cacheKey = `users_${leagueId}`;
    const cached = this.getCachedData<User[]>(cacheKey);
    if (cached) return cached;

    try {
      const response = await api.get<User[]>(`/league/${leagueId}/users`);
      this.setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching users for league ${leagueId}:`, error);
      throw new Error(`Failed to fetch users for league ${leagueId}`);
    }
  }

  /**
   * Get complete standings for a league
   */
  static async getLeagueStandings(leagueId: string): Promise<LeagueStandings> {
    try {
      // Fetch all required data concurrently
      const [league, rosters, users] = await Promise.all([
        this.getLeague(leagueId),
        this.getLeagueRosters(leagueId),
        this.getLeagueUsers(leagueId),
      ]);

      // Create user lookup map
      const userMap = new Map<string, User>();
      users.forEach(user => userMap.set(user.user_id, user));

      // Process standings
      const standings: TeamStanding[] = rosters
        .map(roster => {
          const user = userMap.get(roster.owner_id);
          const teamName = user?.metadata?.team_name || user?.display_name || `Team ${roster.roster_id}`;
          const totalGames = roster.wins + roster.losses + (roster.ties || 0);
          const winPercentage = totalGames > 0 ? roster.wins / totalGames : 0;

          return {
            roster_id: roster.roster_id,
            team_name: teamName,
            wins: roster.wins,
            losses: roster.losses,
            ties: roster.ties || 0,
            points_for: Math.round((roster.fpts + (roster.fpts_decimal || 0)) * 100) / 100,
            points_against: Math.round((roster.fpts_against + (roster.fpts_against_decimal || 0)) * 100) / 100,
            win_percentage: Math.round(winPercentage * 1000) / 1000,
            rank: 0, // Will be set after sorting
          };
        })
        .sort((a, b) => {
          // Sort by wins (descending), then by points for (descending)
          if (a.wins !== b.wins) return b.wins - a.wins;
          return b.points_for - a.points_for;
        })
        .map((team, index) => ({ ...team, rank: index + 1 }));

      return {
        league,
        standings,
      };
    } catch (error) {
      console.error(`Error fetching standings for league ${leagueId}:`, error);
      throw new Error(`Failed to fetch standings for league ${leagueId}`);
    }
  }

  /**
   * Get standings for multiple leagues with rate limiting
   */
  static async getMultipleLeagueStandings(leagueIds: string[]): Promise<LeagueStandings[]> {
    const results: LeagueStandings[] = [];
    
    for (const leagueId of leagueIds) {
      try {
        const standings = await this.getLeagueStandings(leagueId);
        results.push(standings);
        
        // Add delay between requests to respect rate limits
        if (leagueIds.indexOf(leagueId) < leagueIds.length - 1) {
          await delay(200); // 200ms delay between requests
        }
      } catch (error) {
        console.error(`Failed to fetch standings for league ${leagueId}:`, error);
        // Continue with other leagues even if one fails
      }
    }
    
    return results;
  }

  /**
   * Clear cache (useful for manual refresh)
   */
  static clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache size for debugging
   */
  static getCacheSize(): number {
    return this.cache.size;
  }
}

export default SleeperAPIService;