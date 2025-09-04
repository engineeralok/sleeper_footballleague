import React, { useState } from 'react';
import { TeamStanding, League } from '../types';
import { cn } from '../lib/utils';

interface StandingsTableProps {
  standings: TeamStanding[];
  leagueName: string;
  league?: League;
  className?: string;
}

export const StandingsTable: React.FC<StandingsTableProps> = ({
  standings,
  leagueName,
  league,
  className,
}) => {
  const [activeTab, setActiveTab] = useState<'standings' | 'settings' | 'scoring' | 'roster'>('standings');

  const renderStandingsTab = () => {
    if (!standings || standings.length === 0) {
      return (
        <div className="p-8 text-center">
          <p className="text-gray-500">No standings data available</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="w-16 px-3 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                Rank
              </th>
              <th className="w-64 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Team
              </th>
              <th className="w-24 px-3 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                Record
              </th>
              <th className="w-20 px-3 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                Win %
              </th>
              <th className="w-24 px-3 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                Points For
              </th>
              <th className="w-24 px-3 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                Points Against
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/50 divide-y divide-gray-600">
            {standings.map((team, index) => (
              <tr key={team.roster_id} className="hover:bg-gray-700/50">
                <td className="w-16 px-3 py-4 whitespace-nowrap text-sm font-medium text-white text-center">
                  {index + 1}
                </td>
                <td className="w-64 px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {team.display_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 min-w-0">
                      <div className="text-sm font-medium text-gray-100 truncate">{team.display_name}</div>
                      <div className="text-sm text-gray-400">Owner: {team.display_name}</div>
                    </div>
                  </div>
                </td>
                <td className="w-24 px-3 py-4 whitespace-nowrap text-center text-sm text-gray-100">
                  <span className="inline-flex px-1 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {team.wins}-{team.losses}-{team.ties}
                  </span>
                </td>
                <td className="w-20 px-3 py-4 whitespace-nowrap text-center text-sm text-gray-100">
                  {team.win_percentage.toFixed(3)}
                </td>
                <td className="w-24 px-3 py-4 whitespace-nowrap text-center text-sm text-gray-100">
                  <span className="font-semibold text-blue-400">
                    {team.points_for.toFixed(2)}
                  </span>
                </td>
                <td className="w-24 px-3 py-4 whitespace-nowrap text-center text-sm text-gray-100">
                  <span className="font-semibold text-red-400">
                    {team.points_against.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderSettingsTab = () => (
    <div className="p-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-full">
      {league?.settings && Object.entries(league.settings).map(([key, value]) => (
        <div key={key} className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
          <div className="text-sm font-medium text-gray-100 capitalize">
            {key.replace(/_/g, ' ')}
          </div>
          <div className="text-lg font-semibold text-blue-400">
            {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
          </div>
        </div>
      ))}
      </div>
    </div>
  );

  const renderScoringTab = () => (
    <div className="p-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-full">
      {league?.scoring_settings && Object.entries(league.scoring_settings).map(([key, value]) => (
        <div key={key} className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
          <div className="text-sm font-medium text-gray-100 capitalize">
            {key.replace(/_/g, ' ')}
          </div>
          <div className="text-lg font-semibold text-green-400">
            {value > 0 ? '+' : ''}{value}
          </div>
        </div>
      ))}
      </div>
    </div>
  );

  const renderRosterTab = () => {
    if (!league?.roster_positions) {
      return (
        <div className="p-8 text-center">
          <p className="text-gray-500">No roster data available</p>
        </div>
      );
    }

    return (
      <div className="p-6 w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-full">
          {league.roster_positions.map((position, index) => (
            <div key={index} className="bg-gray-800/50 p-4 rounded-lg text-center border border-gray-600 w-full">
              <div className="text-lg font-semibold text-purple-400">
                {position}
              </div>
              <div className="text-sm text-gray-400">
                Position {index + 1}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-gray-800/50 p-4 rounded-lg border border-gray-600">
          <h4 className="text-lg font-semibold text-blue-400 mb-2">League Info</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-300">Total Teams:</span>
              <span className="ml-2 text-blue-400">{league?.total_rosters}</span>
            </div>
            <div>
              <span className="font-medium text-gray-300">Season:</span>
              <span className="ml-2 text-blue-400">{league?.season}</span>
            </div>
            <div>
              <span className="font-medium text-gray-300">Status:</span>
              <span className="ml-2 text-blue-400 capitalize">{league?.status?.replace('_', ' ')}</span>
            </div>
            <div>
              <span className="font-medium text-gray-300">Sport:</span>
              <span className="ml-2 text-blue-400 uppercase">{league?.sport}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cn(
      "bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden border border-gray-700 w-full min-w-[1000px] max-w-7xl mx-auto",
      className
    )}>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <h2 className="text-3xl font-bold text-center">{leagueName}</h2>
        <p className="text-center text-blue-100 mt-2">League Information</p>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-600">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {[
            { id: 'standings', label: 'Standings' },
            { id: 'settings', label: 'League Settings' },
            { id: 'scoring', label: 'Scoring Rules' },
            { id: 'roster', label: 'Roster Positions' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px] w-full">
        {activeTab === 'standings' && renderStandingsTab()}
        {activeTab === 'settings' && renderSettingsTab()}
        {activeTab === 'scoring' && renderScoringTab()}
        {activeTab === 'roster' && renderRosterTab()}
      </div>
    </div>
  );
};

export default StandingsTable;