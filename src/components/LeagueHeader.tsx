import React from 'react';
import { League } from '../types';
import { cn } from '../lib/utils';
import { Trophy, Calendar, Users } from 'lucide-react';

interface LeagueHeaderProps {
  league: League;
  className?: string;
}

export const LeagueHeader: React.FC<LeagueHeaderProps> = ({
  league,
  className,
}) => {
  const getStatusColor = (status?: string) => {
    if (!status) return 'text-accent-green';
    switch (status.toLowerCase()) {
      case 'in_season':
        return 'text-accent-green';
      case 'pre_draft':
        return 'text-accent-yellow';
      case 'drafting':
        return 'text-primary-400';
      case 'complete':
        return 'text-accent-purple';
      default:
        return 'text-gray-400';
    }
  };

  const formatStatus = (status?: string) => {
    if (!status) return 'In Season';
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className={cn(
      "w-full max-w-7xl mx-auto mb-8",
      className
    )}>
      {/* Modern Header Card */}
      <div className="bg-surface-secondary rounded-2xl border border-gray-800 shadow-medium overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* League Name and Trophy */}
            <div className="flex items-center gap-6">
              <div className="p-4 bg-primary-500/20 rounded-2xl border border-primary-500/30">
                <Trophy className="w-10 h-10 text-primary-400" />
              </div>
              <div>
                <h1 className="text-tv-xl lg:text-tv-2xl font-semibold text-gray-100 mb-3">
                  {league.name}
                </h1>
                <div className="flex items-center gap-3 text-tv-base text-gray-300">
                  <span>Season {league.season}</span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                  <span className={getStatusColor(league.status)}>
                    {formatStatus(league.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* League Stats */}
            <div className="flex gap-6">
              {/* Current Week */}
              <div className="flex items-center gap-4 bg-surface-tertiary rounded-xl p-5 border border-gray-700">
                <Calendar className="w-7 h-7 text-primary-400" />
                <div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide font-medium">Week</div>
                  <div className="text-tv-lg font-semibold text-gray-100">{league.week || 13}</div>
                </div>
              </div>

              {/* Total Teams */}
              <div className="flex items-center gap-4 bg-surface-tertiary rounded-xl p-5 border border-gray-700">
                <Users className="w-7 h-7 text-accent-green" />
                <div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide font-medium">Teams</div>
                  <div className="text-tv-lg font-semibold text-gray-100">{league.total_rosters}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional League Info */}
          {league.settings && (
            <div className="mt-8 pt-8 border-t border-gray-700">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div className="bg-surface-tertiary rounded-xl p-4 border border-gray-700">
                  <div className="text-sm text-gray-400 uppercase tracking-wide mb-2 font-medium">Draft Rounds</div>
                  <div className="text-tv-base font-semibold text-gray-100">{league.settings.draft_rounds}</div>
                </div>
                
                {league.settings.playoff_week_start && (
                  <div className="bg-surface-tertiary rounded-xl p-4 border border-gray-700">
                    <div className="text-sm text-gray-400 uppercase tracking-wide mb-2 font-medium">Playoffs Start</div>
                    <div className="text-tv-base font-semibold text-gray-100">Week {league.settings.playoff_week_start}</div>
                  </div>
                )}
                
                {league.settings.trade_deadline && (
                  <div className="bg-surface-tertiary rounded-xl p-4 border border-gray-700">
                    <div className="text-sm text-gray-400 uppercase tracking-wide mb-2 font-medium">Trade Deadline</div>
                    <div className="text-tv-base font-semibold text-gray-100">Week {league.settings.trade_deadline}</div>
                  </div>
                )}
                
                {league.settings.max_keepers > 0 && (
                  <div className="bg-surface-tertiary rounded-xl p-4 border border-gray-700">
                    <div className="text-sm text-gray-400 uppercase tracking-wide mb-2 font-medium">Max Keepers</div>
                    <div className="text-tv-base font-semibold text-gray-100">{league.settings.max_keepers}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeagueHeader;