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

export const mockLeagues: MockLeague[] = [
  {
    league_id: "1267631943646707712",
    name: "Championship League",
    season: "2024",
    total_rosters: 12,
    rosters: [
      { user_id: "1", roster_id: 1, display_name: "Thunder Bolts", wins: 11, losses: 2, ties: 0, points_for: 1847.5, points_against: 1523.2, win_percentage: 0.846 },
      { user_id: "2", roster_id: 2, display_name: "Gridiron Giants", wins: 10, losses: 3, ties: 0, points_for: 1789.3, points_against: 1612.8, win_percentage: 0.769 },
      { user_id: "3", roster_id: 3, display_name: "End Zone Eagles", wins: 9, losses: 4, ties: 0, points_for: 1723.7, points_against: 1654.1, win_percentage: 0.692 },
      { user_id: "4", roster_id: 4, display_name: "Touchdown Titans", wins: 8, losses: 5, ties: 0, points_for: 1698.2, points_against: 1687.9, win_percentage: 0.615 },
      { user_id: "5", roster_id: 5, display_name: "Blitz Brigade", wins: 8, losses: 5, ties: 0, points_for: 1665.4, points_against: 1701.3, win_percentage: 0.615 },
      { user_id: "6", roster_id: 6, display_name: "Field Goal Fanatics", wins: 7, losses: 6, ties: 0, points_for: 1634.8, points_against: 1698.5, win_percentage: 0.538 },
      { user_id: "7", roster_id: 7, display_name: "Pigskin Pirates", wins: 6, losses: 7, ties: 0, points_for: 1612.1, points_against: 1734.2, win_percentage: 0.462 },
      { user_id: "8", roster_id: 8, display_name: "Helmet Heroes", wins: 6, losses: 7, ties: 0, points_for: 1587.9, points_against: 1756.8, win_percentage: 0.462 },
      { user_id: "9", roster_id: 9, display_name: "Quarterback Quest", wins: 5, losses: 8, ties: 0, points_for: 1543.6, points_against: 1789.4, win_percentage: 0.385 },
      { user_id: "10", roster_id: 10, display_name: "Fumble Force", wins: 4, losses: 9, ties: 0, points_for: 1498.7, points_against: 1823.1, win_percentage: 0.308 },
      { user_id: "11", roster_id: 11, display_name: "Sack Squad", wins: 3, losses: 10, ties: 0, points_for: 1456.3, points_against: 1867.5, win_percentage: 0.231 },
      { user_id: "12", roster_id: 12, display_name: "Bench Warmers", wins: 2, losses: 11, ties: 0, points_for: 1398.2, points_against: 1912.8, win_percentage: 0.154 }
    ]
  },
  {
    league_id: "dynasty_masters",
    name: "Dynasty Masters",
    season: "2024",
    total_rosters: 10,
    rosters: [
      { user_id: "1", roster_id: 1, display_name: "Dynasty Dominators", wins: 12, losses: 1, ties: 0, points_for: 1923.8, points_against: 1456.2, win_percentage: 0.923 },
      { user_id: "2", roster_id: 2, display_name: "Future Legends", wins: 10, losses: 3, ties: 0, points_for: 1834.5, points_against: 1587.9, win_percentage: 0.769 },
      { user_id: "3", roster_id: 3, display_name: "Rookie Wranglers", wins: 9, losses: 4, ties: 0, points_for: 1756.3, points_against: 1623.7, win_percentage: 0.692 },
      { user_id: "4", roster_id: 4, display_name: "Draft Day Dreams", wins: 8, losses: 5, ties: 0, points_for: 1689.7, points_against: 1678.4, win_percentage: 0.615 },
      { user_id: "5", roster_id: 5, display_name: "Prospect Pros", wins: 7, losses: 6, ties: 0, points_for: 1645.2, points_against: 1712.8, win_percentage: 0.538 },
      { user_id: "6", roster_id: 6, display_name: "Sleeper Picks", wins: 6, losses: 7, ties: 0, points_for: 1598.9, points_against: 1743.1, win_percentage: 0.462 },
      { user_id: "7", roster_id: 7, display_name: "Waiver Wire Warriors", wins: 5, losses: 8, ties: 0, points_for: 1567.4, points_against: 1789.6, win_percentage: 0.385 },
      { user_id: "8", roster_id: 8, display_name: "Trade Titans", wins: 4, losses: 9, ties: 0, points_for: 1523.8, points_against: 1834.2, win_percentage: 0.308 },
      { user_id: "9", roster_id: 9, display_name: "Rebuild Rangers", wins: 3, losses: 10, ties: 0, points_for: 1478.5, points_against: 1876.9, win_percentage: 0.231 },
      { user_id: "10", roster_id: 10, display_name: "Tank Commanders", wins: 1, losses: 12, ties: 0, points_for: 1412.6, points_against: 1945.3, win_percentage: 0.077 }
    ]
  },
  {
    league_id: "redraft_royalty",
    name: "Redraft Royalty",
    season: "2024",
    total_rosters: 12,
    rosters: [
      { user_id: "1", roster_id: 1, display_name: "Draft Kings", wins: 10, losses: 3, ties: 0, points_for: 1798.4, points_against: 1598.7, win_percentage: 0.769 },
      { user_id: "2", roster_id: 2, display_name: "Snake Draft Savages", wins: 10, losses: 3, ties: 0, points_for: 1776.2, points_against: 1612.3, win_percentage: 0.769 },
      { user_id: "3", roster_id: 3, display_name: "Auction Aces", wins: 9, losses: 4, ties: 0, points_for: 1743.8, points_against: 1634.9, win_percentage: 0.692 },
      { user_id: "4", roster_id: 4, display_name: "Value Vultures", wins: 8, losses: 5, ties: 0, points_for: 1712.5, points_against: 1667.1, win_percentage: 0.615 },
      { user_id: "5", roster_id: 5, display_name: "Sleeper Sleuths", wins: 8, losses: 5, ties: 0, points_for: 1689.3, points_against: 1689.3, win_percentage: 0.615 },
      { user_id: "6", roster_id: 6, display_name: "Bust Busters", wins: 7, losses: 6, ties: 0, points_for: 1656.7, points_against: 1698.2, win_percentage: 0.538 },
      { user_id: "7", roster_id: 7, display_name: "Handcuff Heroes", wins: 6, losses: 7, ties: 0, points_for: 1623.4, points_against: 1723.8, win_percentage: 0.462 },
      { user_id: "8", roster_id: 8, display_name: "Streaming Specialists", wins: 6, losses: 7, ties: 0, points_for: 1598.1, points_against: 1745.6, win_percentage: 0.462 },
      { user_id: "9", roster_id: 9, display_name: "Matchup Maniacs", wins: 5, losses: 8, ties: 0, points_for: 1567.9, points_against: 1776.4, win_percentage: 0.385 },
      { user_id: "10", roster_id: 10, display_name: "Taco Bell All-Stars", wins: 4, losses: 9, ties: 0, points_for: 1534.2, points_against: 1812.7, win_percentage: 0.308 },
      { user_id: "11", roster_id: 11, display_name: "Auto Draft Army", wins: 3, losses: 10, ties: 0, points_for: 1498.6, points_against: 1845.9, win_percentage: 0.231 },
      { user_id: "12", roster_id: 12, display_name: "Last Pick Legends", wins: 2, losses: 11, ties: 0, points_for: 1456.8, points_against: 1889.1, win_percentage: 0.154 }
    ]
  },
  {
    league_id: "superflex_supreme",
    name: "Superflex Supreme",
    season: "2024",
    total_rosters: 10,
    rosters: [
      { user_id: "1", roster_id: 1, display_name: "QB Factory", wins: 11, losses: 2, ties: 0, points_for: 1889.7, points_against: 1534.8, win_percentage: 0.846 },
      { user_id: "2", roster_id: 2, display_name: "Dual Threat Dynasty", wins: 10, losses: 3, ties: 0, points_for: 1823.4, points_against: 1578.2, win_percentage: 0.769 },
      { user_id: "3", roster_id: 3, display_name: "Pocket Passers", wins: 9, losses: 4, ties: 0, points_for: 1767.9, points_against: 1612.5, win_percentage: 0.692 },
      { user_id: "4", roster_id: 4, display_name: "Mobile Maestros", wins: 7, losses: 6, ties: 0, points_for: 1698.3, points_against: 1687.1, win_percentage: 0.538 },
      { user_id: "5", roster_id: 5, display_name: "Signal Callers", wins: 7, losses: 6, ties: 0, points_for: 1676.8, points_against: 1698.4, win_percentage: 0.538 },
      { user_id: "6", roster_id: 6, display_name: "Backup Brigade", wins: 6, losses: 7, ties: 0, points_for: 1634.2, points_against: 1734.6, win_percentage: 0.462 },
      { user_id: "7", roster_id: 7, display_name: "Streaming QBs", wins: 5, losses: 8, ties: 0, points_for: 1598.7, points_against: 1767.9, win_percentage: 0.385 },
      { user_id: "8", roster_id: 8, display_name: "Injury Replacements", wins: 4, losses: 9, ties: 0, points_for: 1556.4, points_against: 1812.3, win_percentage: 0.308 },
      { user_id: "9", roster_id: 9, display_name: "Waiver Wire QBs", wins: 3, losses: 10, ties: 0, points_for: 1512.9, points_against: 1856.7, win_percentage: 0.231 },
      { user_id: "10", roster_id: 10, display_name: "QB Needy", wins: 2, losses: 11, ties: 0, points_for: 1467.5, points_against: 1898.2, win_percentage: 0.154 }
    ]
  },
  {
    league_id: "ppr_powerhouse",
    name: "PPR Powerhouse",
    season: "2024",
    total_rosters: 12,
    rosters: [
      { user_id: "1", roster_id: 1, display_name: "Reception Royalty", wins: 12, losses: 1, ties: 0, points_for: 1934.6, points_against: 1487.3, win_percentage: 0.923 },
      { user_id: "2", roster_id: 2, display_name: "Target Hogs", wins: 10, losses: 3, ties: 0, points_for: 1845.2, points_against: 1598.7, win_percentage: 0.769 },
      { user_id: "3", roster_id: 3, display_name: "Catch Kings", wins: 9, losses: 4, ties: 0, points_for: 1789.8, points_against: 1634.1, win_percentage: 0.692 },
      { user_id: "4", roster_id: 4, display_name: "Volume Vultures", wins: 8, losses: 5, ties: 0, points_for: 1734.5, points_against: 1678.9, win_percentage: 0.615 },
      { user_id: "5", roster_id: 5, display_name: "Slot Machine", wins: 8, losses: 5, ties: 0, points_for: 1712.3, points_against: 1689.7, win_percentage: 0.615 },
      { user_id: "6", roster_id: 6, display_name: "Check Down Champions", wins: 7, losses: 6, ties: 0, points_for: 1678.9, points_against: 1712.4, win_percentage: 0.538 },
      { user_id: "7", roster_id: 7, display_name: "Possession Pros", wins: 6, losses: 7, ties: 0, points_for: 1645.7, points_against: 1745.8, win_percentage: 0.462 },
      { user_id: "8", roster_id: 8, display_name: "Third Down Threats", wins: 5, losses: 8, ties: 0, points_for: 1612.4, points_against: 1778.2, win_percentage: 0.385 },
      { user_id: "9", roster_id: 9, display_name: "Garbage Time Gods", wins: 5, losses: 8, ties: 0, points_for: 1589.1, points_against: 1789.6, win_percentage: 0.385 },
      { user_id: "10", roster_id: 10, display_name: "Target Share Thieves", wins: 4, losses: 9, ties: 0, points_for: 1556.8, points_against: 1823.4, win_percentage: 0.308 },
      { user_id: "11", roster_id: 11, display_name: "Drop Prone", wins: 2, losses: 11, ties: 0, points_for: 1498.3, points_against: 1876.9, win_percentage: 0.154 },
      { user_id: "12", roster_id: 12, display_name: "Fumble Fingers", wins: 1, losses: 12, ties: 0, points_for: 1445.7, points_against: 1923.8, win_percentage: 0.077 }
    ]
  },
  {
    league_id: "best_ball_bonanza",
    name: "Best Ball Bonanza",
    season: "2024",
    total_rosters: 10,
    rosters: [
      { user_id: "1", roster_id: 1, display_name: "Auto Optimizers", wins: 11, losses: 2, ties: 0, points_for: 1876.4, points_against: 1523.7, win_percentage: 0.846 },
      { user_id: "2", roster_id: 2, display_name: "Set & Forget", wins: 10, losses: 3, ties: 0, points_for: 1812.9, points_against: 1567.2, win_percentage: 0.769 },
      { user_id: "3", roster_id: 3, display_name: "Lineup Luck", wins: 8, losses: 5, ties: 0, points_for: 1745.6, points_against: 1634.8, win_percentage: 0.615 },
      { user_id: "4", roster_id: 4, display_name: "Boom or Bust", wins: 8, losses: 5, ties: 0, points_for: 1723.1, points_against: 1656.3, win_percentage: 0.615 },
      { user_id: "5", roster_id: 5, display_name: "Depth Chart Darlings", wins: 7, losses: 6, ties: 0, points_for: 1689.7, points_against: 1689.7, win_percentage: 0.538 },
      { user_id: "6", roster_id: 6, display_name: "Bench Strength", wins: 6, losses: 7, ties: 0, points_for: 1656.2, points_against: 1723.4, win_percentage: 0.462 },
      { user_id: "7", roster_id: 7, display_name: "Injury Insurance", wins: 5, losses: 8, ties: 0, points_for: 1612.8, points_against: 1767.1, win_percentage: 0.385 },
      { user_id: "8", roster_id: 8, display_name: "Handcuff Heaven", wins: 4, losses: 9, ties: 0, points_for: 1578.5, points_against: 1798.6, win_percentage: 0.308 },
      { user_id: "9", roster_id: 9, display_name: "Sleeper Stackers", wins: 3, losses: 10, ties: 0, points_for: 1534.9, points_against: 1834.2, win_percentage: 0.231 },
      { user_id: "10", roster_id: 10, display_name: "Draft & Pray", wins: 2, losses: 11, ties: 0, points_for: 1489.3, points_against: 1876.8, win_percentage: 0.154 }
    ]
  },
  {
    league_id: "idp_elite",
    name: "IDP Elite",
    season: "2024",
    total_rosters: 12,
    rosters: [
      { user_id: "1", roster_id: 1, display_name: "Defensive Dominators", wins: 11, losses: 2, ties: 0, points_for: 1923.7, points_against: 1534.2, win_percentage: 0.846 },
      { user_id: "2", roster_id: 2, display_name: "Sack Attack", wins: 10, losses: 3, ties: 0, points_for: 1856.3, points_against: 1578.9, win_percentage: 0.769 },
      { user_id: "3", roster_id: 3, display_name: "Tackle Machines", wins: 9, losses: 4, ties: 0, points_for: 1798.1, points_against: 1612.7, win_percentage: 0.692 },
      { user_id: "4", roster_id: 4, display_name: "Interception Station", wins: 8, losses: 5, ties: 0, points_for: 1745.8, points_against: 1656.4, win_percentage: 0.615 },
      { user_id: "5", roster_id: 5, display_name: "Blitz Brigade", wins: 7, losses: 6, ties: 0, points_for: 1698.4, points_against: 1698.4, win_percentage: 0.538 },
      { user_id: "6", roster_id: 6, display_name: "Coverage Kings", wins: 7, losses: 6, ties: 0, points_for: 1676.2, points_against: 1712.8, win_percentage: 0.538 },
      { user_id: "7", roster_id: 7, display_name: "Pass Rush Pros", wins: 6, losses: 7, ties: 0, points_for: 1634.9, points_against: 1745.3, win_percentage: 0.462 },
      { user_id: "8", roster_id: 8, display_name: "Fumble Force", wins: 5, losses: 8, ties: 0, points_for: 1598.7, points_against: 1778.1, win_percentage: 0.385 },
      { user_id: "9", roster_id: 9, display_name: "Safety Squad", wins: 4, losses: 9, ties: 0, points_for: 1556.3, points_against: 1812.6, win_percentage: 0.308 },
      { user_id: "10", roster_id: 10, display_name: "Linebacker Legends", wins: 4, losses: 9, ties: 0, points_for: 1534.1, points_against: 1823.9, win_percentage: 0.308 },
      { user_id: "11", roster_id: 11, display_name: "Cornerback Crew", wins: 3, losses: 10, ties: 0, points_for: 1489.6, points_against: 1867.4, win_percentage: 0.231 },
      { user_id: "12", roster_id: 12, display_name: "Defensive Duds", wins: 1, losses: 12, ties: 0, points_for: 1434.8, points_against: 1934.5, win_percentage: 0.077 }
    ]
  },
  {
    league_id: "keeper_kingdom",
    name: "Keeper Kingdom",
    season: "2024",
    total_rosters: 10,
    rosters: [
      { user_id: "1", roster_id: 1, display_name: "Keeper Crushers", wins: 12, losses: 1, ties: 0, points_for: 1945.3, points_against: 1467.8, win_percentage: 0.923 },
      { user_id: "2", roster_id: 2, display_name: "Value Keepers", wins: 10, losses: 3, ties: 0, points_for: 1867.9, points_against: 1534.2, win_percentage: 0.769 },
      { user_id: "3", roster_id: 3, display_name: "Late Round Legends", wins: 9, losses: 4, ties: 0, points_for: 1798.6, points_against: 1589.7, win_percentage: 0.692 },
      { user_id: "4", roster_id: 4, display_name: "Breakout Believers", wins: 8, losses: 5, ties: 0, points_for: 1734.2, points_against: 1634.8, win_percentage: 0.615 },
      { user_id: "5", roster_id: 5, display_name: "Sophomore Surge", wins: 7, losses: 6, ties: 0, points_for: 1689.4, points_against: 1678.1, win_percentage: 0.538 },
      { user_id: "6", roster_id: 6, display_name: "Veteran Veterans", wins: 6, losses: 7, ties: 0, points_for: 1645.8, points_against: 1723.5, win_percentage: 0.462 },
      { user_id: "7", roster_id: 7, display_name: "Aging Assets", wins: 5, losses: 8, ties: 0, points_for: 1598.3, points_against: 1767.9, win_percentage: 0.385 },
      { user_id: "8", roster_id: 8, display_name: "Keeper Regrets", wins: 4, losses: 9, ties: 0, points_for: 1556.7, points_against: 1812.4, win_percentage: 0.308 },
      { user_id: "9", roster_id: 9, display_name: "Draft Pick Hoarders", wins: 2, losses: 11, ties: 0, points_for: 1498.1, points_against: 1876.3, win_percentage: 0.154 },
      { user_id: "10", roster_id: 10, display_name: "Rebuild Mode", wins: 1, losses: 12, ties: 0, points_for: 1445.9, points_against: 1923.7, win_percentage: 0.077 }
    ]
  }
];