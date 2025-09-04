import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useRotation } from './hooks/useRotation';
import { StandingsTable } from './components/StandingsTable';
import { LeagueHeader } from './components/LeagueHeader';
import { RotationIndicator } from './components/RotationIndicator';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ConfigPanel } from './components/ConfigPanel';
import { useSleeperAPI } from './hooks/useSleeperAPI';
import { mockLeagues } from './data/mockLeagues';

function App() {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const { config, updateConfig, resetConfig, isLoaded } = useLocalStorage();
  
  // Use Sleeper API with the provided league ID
  const leagueIds = useMemo(() => [mockLeagues[0].league_id], []); // Memoize to prevent infinite re-renders
  const { standings, loading, refreshStandings } = useSleeperAPI(leagueIds);
  
  // Auto-rotation logic
  const {
    currentIndex,
    isPlaying,
    progress,
    nextItem,
    previousItem,
    goToItem,
    play,
    pause,
  } = useRotation({
    itemCount: standings.length,
    interval: config.rotationInterval,
    autoStart: true,
    loop: true,
  });
  
  // Get current league data
  const currentLeague = standings[currentIndex];
  const leagueNames = standings.map(s => s.league.name);
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <LoadingSpinner message="Loading configuration..." />
      </div>
    );
  }

  if (loading.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <LoadingSpinner message="Loading league data..." />
      </div>
    );
  }

  if (loading.error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-400 mb-4">Error Loading League Data</div>
          <div className="text-white/60 mb-6">{loading.error}</div>
          <button 
            onClick={refreshStandings}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={
              <div className="flex-1 flex flex-col p-6">
                {currentLeague ? (
                  <div className="flex-1 flex flex-col">
                    {/* League Header */}
                    <LeagueHeader league={currentLeague.league} />
                    
                    {/* Standings Table */}
                    <div className="flex-1 flex items-center justify-center">
                      <StandingsTable 
                        standings={currentLeague.standings}
                        leagueName={currentLeague.league.name}
                        league={currentLeague.league}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-center">
                    <div>
                      <div className="text-4xl font-bold text-white mb-4">Fantasy Football Standings</div>
                      <div className="text-xl text-white/60 mb-8">Showcasing 8 different league formats</div>
                    </div>
                  </div>
                )}
              </div>
            } />
          </Routes>
        </div>
        
        {/* Rotation Indicator */}
        {standings.length > 0 && (
          <RotationIndicator
            currentIndex={currentIndex}
            totalCount={standings.length}
            progress={progress}
            isPlaying={isPlaying}
            leagueNames={leagueNames}
            onPlay={play}
            onPause={pause}
            onNext={nextItem}
            onPrevious={previousItem}
            onGoTo={goToItem}
          />
        )}
        
        {/* Configuration Panel */}
        <ConfigPanel
          config={config}
          onUpdateConfig={updateConfig}
          onResetConfig={resetConfig}
          isOpen={isConfigOpen}
          onToggle={() => setIsConfigOpen(!isConfigOpen)}
        />
      </div>
    </Router>
  );
}

export default App;
