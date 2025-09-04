// TypeScript interfaces for Fantasy Football League data structures

export interface League {
  league_id: string;
  name: string;
  season: string;
  total_rosters: number;
}

export interface Roster {
  roster_id: number;
  user_id: string;
  display_name: string;
  wins: number;
  losses: number;
  ties: number;
  points_for: number;
  points_against: number;
  win_percentage: number;
}

export interface User {
  user_id: string;
  display_name: string;
}

export interface TeamStanding {
  roster_id: number;
  user_id: string;
  display_name: string;
  wins: number;
  losses: number;
  ties: number;
  points_for: number;
  points_against: number;
  win_percentage: number;
  rank: number;
}

export interface LeagueStandings {
  league: League;
  standings: TeamStanding[];
}

export interface AppConfig {
  leagueIds: string[];
  rotationInterval: number;
  enabledLeagues: boolean[];
  displaySettings: {
    showLogos: boolean;
    animationSpeed: number;
    theme: string;
  };
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Mock data interfaces
export interface MockTeam {
  user_id: string;
  roster_id: number;
  display_name: string;
  wins: number;
  losses: number;
  ties: number;
  points_for: number;
  points_against: number;
  win_percentage: number;
}

export interface MockLeague {
  league_id: string;
  name: string;
  season: string;
  total_rosters: number;
  rosters: MockTeam[];
}