import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Settings, X, Save, RotateCcw, Eye, EyeOff, Plus, Minus } from 'lucide-react';
import { AppConfig } from '../types';

interface ConfigPanelProps {
  config: AppConfig;
  onUpdateConfig: (newConfig: Partial<AppConfig>) => void;
  onResetConfig: () => void;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  config,
  onUpdateConfig,
  onResetConfig,
  isOpen,
  onToggle,
  className,
}) => {
  const [tempConfig, setTempConfig] = useState<AppConfig>(config);
  const [hasChanges, setHasChanges] = useState(false);

  const handleLeagueIdChange = (index: number, value: string) => {
    const newLeagueIds = [...tempConfig.leagueIds];
    newLeagueIds[index] = value;
    setTempConfig({ ...tempConfig, leagueIds: newLeagueIds });
    setHasChanges(true);
  };

  const toggleLeague = (index: number) => {
    const newEnabledLeagues = [...tempConfig.enabledLeagues];
    newEnabledLeagues[index] = !newEnabledLeagues[index];
    setTempConfig({ ...tempConfig, enabledLeagues: newEnabledLeagues });
    setHasChanges(true);
  };

  const handleIntervalChange = (value: number) => {
    setTempConfig({ ...tempConfig, rotationInterval: value * 1000 });
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdateConfig(tempConfig);
    setHasChanges(false);
  };

  const handleReset = () => {
    onResetConfig();
    setTempConfig(config);
    setHasChanges(false);
  };

  const handleCancel = () => {
    setTempConfig(config);
    setHasChanges(false);
    onToggle();
  };

  const getEnabledLeagueCount = () => {
    return tempConfig.enabledLeagues.filter(Boolean).length;
  };

  const getValidLeagueCount = () => {
    return tempConfig.leagueIds.filter((id, index) => 
      id.trim() !== '' && tempConfig.enabledLeagues[index]
    ).length;
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={cn(
          "fixed top-6 right-6 z-50 p-4 bg-surface-dark/95 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-modern transition-all duration-300 hover:scale-105",
          isOpen ? "bg-accent-red/20 border-accent-red/30" : "bg-accent-blue/20 border-accent-blue/30"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-200" />
        ) : (
          <Settings className="w-6 h-6 text-gray-200" />
        )}
      </button>

      {/* Panel Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-surface-dark/60 backdrop-blur-md z-40" onClick={handleCancel} />
      )}

      {/* Config Panel */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-96 bg-surface-dark/98 backdrop-blur-xl border-l border-gray-700/50 shadow-modern transform transition-transform duration-300 z-50 overflow-y-auto",
        isOpen ? "translate-x-0" : "translate-x-full",
        className
      )}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-100 font-inter">Configuration</h2>
            <div className="flex gap-2">
              {hasChanges && (
                <div className="w-2.5 h-2.5 bg-accent-yellow rounded-full animate-pulse shadow-lg" />
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/30">
              <div className="text-sm text-gray-400 font-medium">Enabled</div>
              <div className="text-xl font-bold text-gray-100 font-mono">{getEnabledLeagueCount()}</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/30">
              <div className="text-sm text-gray-400 font-medium">Valid</div>
              <div className="text-xl font-bold text-accent-green font-mono">{getValidLeagueCount()}</div>
            </div>
          </div>

          {/* Rotation Interval */}
          <div className="mb-8">
            <label className="block text-gray-200 font-medium mb-4 font-inter">Rotation Interval</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleIntervalChange(Math.max(5, tempConfig.rotationInterval / 1000 - 5))}
                className="p-3 bg-gray-800/50 hover:bg-gray-700/70 rounded-xl transition-all duration-300 hover:scale-105 border border-gray-700/30"
              >
                <Minus className="w-4 h-4 text-gray-200" />
              </button>
              <div className="flex-1 text-center bg-gray-800/30 rounded-xl py-3 border border-gray-700/30">
                <div className="text-gray-100 text-lg font-semibold font-mono">
                  {tempConfig.rotationInterval / 1000}s
                </div>
              </div>
              <button
                onClick={() => handleIntervalChange(Math.min(60, tempConfig.rotationInterval / 1000 + 5))}
                className="p-3 bg-gray-800/50 hover:bg-gray-700/70 rounded-xl transition-all duration-300 hover:scale-105 border border-gray-700/30"
              >
                <Plus className="w-4 h-4 text-gray-200" />
              </button>
            </div>
          </div>

          {/* League IDs */}
          <div className="mb-8">
            <label className="block text-gray-200 font-medium mb-4 font-inter">League IDs</label>
            <div className="space-y-4">
              {tempConfig.leagueIds.map((leagueId, index) => (
                <div key={index} className="flex items-center gap-3">
                  <button
                    onClick={() => toggleLeague(index)}
                    className={cn(
                      "p-3 rounded-xl transition-all duration-300 hover:scale-105 border",
                      tempConfig.enabledLeagues[index]
                        ? "bg-accent-green/20 text-accent-green border-accent-green/30"
                        : "bg-accent-red/20 text-accent-red border-accent-red/30"
                    )}
                  >
                    {tempConfig.enabledLeagues[index] ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={leagueId}
                      onChange={(e) => handleLeagueIdChange(index, e.target.value)}
                      placeholder={`League ${index + 1} ID`}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:bg-gray-800/70 transition-all duration-300 font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-400 font-inter">
              Configure league display settings. Toggle visibility with the eye icon.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {hasChanges && (
              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-accent-green hover:bg-accent-green/90 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg font-inter"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            )}
            
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-accent-red/20 hover:bg-accent-red/30 border border-accent-red/50 rounded-xl text-accent-red font-medium transition-all duration-300 hover:scale-105 font-inter"
            >
              <RotateCcw className="w-5 h-5" />
              Reset to Defaults
            </button>
            
            <button
              onClick={handleCancel}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700/50 rounded-xl text-gray-200 font-medium transition-all duration-300 hover:scale-105 font-inter"
            >
              <X className="w-5 h-5" />
              {hasChanges ? 'Cancel Changes' : 'Close'}
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8 p-5 bg-accent-blue/10 border border-accent-blue/20 rounded-xl">
            <div className="text-accent-blue font-medium mb-3 font-inter">How to find League IDs:</div>
            <div className="text-gray-300 text-sm space-y-2 font-inter">
              <div>1. Go to your Sleeper league</div>
              <div>2. Check the URL: sleeper.app/leagues/[ID]</div>
              <div>3. Copy the ID from the URL</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfigPanel;