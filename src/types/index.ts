// TypeScript interfaces for Fantasy Football League data structures

export interface League {
  league_id: string;
  name: string;
  season: string;
  total_rosters: number;
  status?: string;
  week?: number;
  metadata?: {
    auto_continue?: string;
    copy_from_league_id?: string;
    keeper_deadline?: string;
  };
  settings?: {
    best_ball?: number;
    waiver_budget?: number;
    disable_adds?: number;
    capacity_override?: number;
    waiver_bid_min?: number;
    taxi_deadline?: number;
    draft_rounds?: number;
    reserve_allow_na?: number;
    start_week?: number;
    playoff_seed_type?: number;
    playoff_teams?: number;
    veto_votes_needed?: number;
    num_teams?: number;
    daily_waivers_hour?: number;
    playoff_type?: number;
    taxi_slots?: number;
    sub_start_time_eligibility?: number;
    daily_waivers_days?: number;
    sub_lock_if_starter_active?: number;
    playoff_week_start?: number;
    waiver_clear_days?: number;
    reserve_allow_doubtful?: number;
    commissioner_direct_invite?: number;
    veto_auto_poll?: number;
    reserve_allow_dnr?: number;
    taxi_allow_vets?: number;
    waiver_day_of_week?: number;
    playoff_round_type?: number;
    reserve_allow_out?: number;
    reserve_allow_sus?: number;
    veto_show_votes?: number;
    trade_deadline?: number;
    taxi_years?: number;
    daily_waivers?: number;
    faab_suggestions?: number;
    disable_trades?: number;
    pick_trading?: number;
    type?: number;
    max_keepers?: number;
    waiver_type?: number;
    max_subs?: number;
    league_average_match?: number;
    trade_review_days?: number;
    bench_lock?: number;
    offseason_adds?: number;
    leg?: number;
    reserve_slots?: number;
    reserve_allow_cov?: number;
    daily_waivers_last_ran?: number;
  };
  avatar?: string | null;
  company_id?: string | null;
  shard?: number;
  season_type?: string;
  sport?: string;
  scoring_settings?: {
    [key: string]: number;
  };
  last_message_id?: string;
  last_author_avatar?: string | null;
  last_author_display_name?: string;
  last_author_id?: string;
  last_author_is_bot?: boolean;
  last_message_attachment?: any;
  last_message_text_map?: any;
  last_message_time?: number;
  last_pinned_message_id?: string | null;
  last_read_id?: string | null;
  draft_id?: string;
  previous_league_id?: string | null;
  roster_positions?: string[];
  group_id?: string | null;
  bracket_id?: string | null;
  bracket_overrides_id?: string | null;
  loser_bracket_id?: string | null;
  loser_bracket_overrides_id?: string | null;
}

export interface Roster {
  roster_id: number;
  owner_id: string;
  league_id: string;
  total_points: number;
  wins: number;
  losses: number;
  ties: number;
  points_for: number;
  points_against: number;
  win_percentage: number;
  fpts: number;
  fpts_decimal: number;
  fpts_against: number;
  fpts_against_decimal: number;
}

export interface User {
  user_id: string;
  display_name: string;
  metadata?: {
    team_name?: string;
  };
}

export interface TeamStanding {
  roster_id: number;
  user_id: string;
  display_name: string;
  team_name: string;
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