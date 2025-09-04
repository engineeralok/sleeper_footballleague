import React from 'react';
import { TeamStanding } from '../types';
import { cn } from '../lib/utils';

interface StandingsTableProps {
  standings: TeamStanding[];
  leagueName: string;
  className?: string;
}

export const StandingsTable: React.FC<StandingsTableProps> = ({
  standings,
  leagueName,
  className,
}) => {
  if (!standings || standings.length === 0) {
    return (
      <div className={cn(
        "flex items-center justify-center h-96 bg-surface-secondary rounded-2xl border border-gray-800 shadow-soft",
        className
      )}>
        <div className="text-center">
          <div className="text-tv-lg font-semibold mb-4 text-gray-300">No Data Available</div>
          <div className="text-tv-base text-gray-500">Check league configuration</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-7xl mx-auto", className)}>
      {/* Modern Card Container */}
      <div className="bg-surface-secondary rounded-2xl border border-gray-800 shadow-medium overflow-hidden">
        {/* Table Header */}
        <div className="bg-surface-tertiary border-b border-gray-700 px-8 py-6">
          <div className="grid grid-cols-7 gap-6 text-gray-200 font-semibold text-tv-base">
            <div className="text-center">Rank</div>
            <div className="col-span-2">Team Name</div>
            <div className="text-center">Record</div>
            <div className="text-center">Win %</div>
            <div className="text-center">Points For</div>
            <div className="text-center">Points Against</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-800">
          {standings.map((team, index) => {
            const isTopTeam = index < 3;
            const rowBg = isTopTeam 
              ? index === 0 
                ? 'bg-gradient-to-r from-primary-500/10 to-primary-600/10 border-l-4 border-l-primary-500' 
                : index === 1
                ? 'bg-gradient-to-r from-gray-400/10 to-gray-500/10 border-l-4 border-l-gray-400'
                : 'bg-gradient-to-r from-accent-yellow/10 to-accent-yellow/15 border-l-4 border-l-accent-yellow'
              : 'hover:bg-gray-800/50 transition-colors duration-200';

            return (
              <div
                key={team.roster_id}
                className={cn(
                  "grid grid-cols-7 gap-6 px-8 py-6 transition-all duration-200",
                  rowBg
                )}
              >
                {/* Rank */}
                <div className="flex items-center justify-center">
                  <div className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center font-semibold text-tv-base shadow-soft",
                    isTopTeam
                      ? index === 0
                        ? "bg-primary-500 text-white"
                        : index === 1
                        ? "bg-gray-400 text-gray-900"
                        : "bg-accent-yellow text-gray-900"
                      : "bg-gray-700 text-gray-200"
                  )}>
                    {team.rank}
                  </div>
                </div>

                {/* Team Name */}
                <div className="col-span-2 flex items-center">
                  <div className="text-gray-100 font-semibold text-tv-base truncate">
                    {team.team_name}
                  </div>
                </div>

                {/* Record */}
                <div className="flex items-center justify-center">
                  <div className="text-gray-200 text-tv-base font-medium">
                    {team.wins}-{team.losses}
                    {team.ties > 0 && `-${team.ties}`}
                  </div>
                </div>

                {/* Win Percentage */}
                <div className="flex items-center justify-center">
                  <div className="text-gray-200 text-tv-base font-medium">
                    {(team.win_percentage * 100).toFixed(1)}%
                  </div>
                </div>

                {/* Points For */}
                <div className="flex items-center justify-center">
                  <div className="text-accent-green text-tv-base font-medium">
                    {team.points_for.toFixed(1)}
                  </div>
                </div>

                {/* Points Against */}
                <div className="flex items-center justify-center">
                  <div className="text-accent-red text-tv-base font-medium">
                    {team.points_against.toFixed(1)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StandingsTable;