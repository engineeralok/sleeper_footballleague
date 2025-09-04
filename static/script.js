// Fantasy Football League Standings - Static Version

class FantasyFootballApp {
    constructor() {
        this.leagues = [
            '1267631943646707712',
            // Add more league IDs here if needed
        ];
        this.currentIndex = 0;
        this.isPlaying = false;
        this.rotationInterval = null;
        this.rotationSpeed = 5000; // 5 seconds
        this.leagueData = [];
        this.isLoading = false;
        
        this.init();
    }

    async init() {
        this.bindEvents();
        await this.loadAllLeagues();
        this.updateUI();
        this.updateRotationIndicator();
    }

    bindEvents() {
        // Rotation controls
        document.getElementById('prev-btn').addEventListener('click', () => this.previousLeague());
        document.getElementById('next-btn').addEventListener('click', () => this.nextLeague());
        document.getElementById('play-pause-btn').addEventListener('click', () => this.toggleRotation());
        document.getElementById('retry-btn').addEventListener('click', () => this.retry());
    }

    async loadAllLeagues() {
        this.showLoading();
        
        try {
            this.leagueData = [];
            
            for (const leagueId of this.leagues) {
                try {
                    const leagueInfo = await this.fetchLeagueData(leagueId);
                    if (leagueInfo) {
                        this.leagueData.push(leagueInfo);
                    }
                } catch (error) {
                    console.error(`Failed to load league ${leagueId}:`, error);
                }
            }
            
            if (this.leagueData.length === 0) {
                throw new Error('No leagues could be loaded');
            }
            
            this.hideLoading();
            this.showMainContent();
            
        } catch (error) {
            console.error('Error loading leagues:', error);
            this.showError(error.message);
        }
    }

    async fetchLeagueData(leagueId) {
        try {
            // Fetch league info
            const leagueResponse = await fetch(`https://api.sleeper.app/v1/league/${leagueId}`);
            if (!leagueResponse.ok) throw new Error('Failed to fetch league data');
            const league = await leagueResponse.json();

            // Fetch rosters
            const rostersResponse = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`);
            if (!rostersResponse.ok) throw new Error('Failed to fetch rosters');
            const rosters = await rostersResponse.json();

            // Fetch users
            const usersResponse = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/users`);
            if (!usersResponse.ok) throw new Error('Failed to fetch users');
            const users = await usersResponse.json();

            // Create user lookup
            const userLookup = {};
            users.forEach(user => {
                userLookup[user.user_id] = user;
            });

            // Process standings
            const standings = rosters
                .map(roster => {
                    const user = userLookup[roster.owner_id];
                    const wins = roster.settings?.wins || 0;
                    const losses = roster.settings?.losses || 0;
                    const ties = roster.settings?.ties || 0;
                    const pointsFor = roster.settings?.fpts || 0;
                    const pointsAgainst = roster.settings?.fpts_against || 0;
                    const totalGames = wins + losses + ties;
                    const winPercentage = totalGames > 0 ? (wins + ties * 0.5) / totalGames : 0;

                    return {
                        roster_id: roster.roster_id,
                        user_id: roster.owner_id,
                        display_name: user?.display_name || user?.username || `Team ${roster.roster_id}`,
                        team_name: user?.display_name || user?.username || `Team ${roster.roster_id}`,
                        wins,
                        losses,
                        ties,
                        points_for: pointsFor,
                        points_against: pointsAgainst,
                        win_percentage: winPercentage,
                        rank: 0 // Will be set after sorting
                    };
                })
                .sort((a, b) => {
                    // Sort by wins, then win percentage, then points for
                    if (b.wins !== a.wins) return b.wins - a.wins;
                    if (b.win_percentage !== a.win_percentage) return b.win_percentage - a.win_percentage;
                    return b.points_for - a.points_for;
                })
                .map((team, index) => ({ ...team, rank: index + 1 }));

            return {
                league,
                standings
            };
        } catch (error) {
            console.error(`Error fetching data for league ${leagueId}:`, error);
            throw error;
        }
    }

    updateUI() {
        if (this.leagueData.length === 0) return;
        
        const currentLeague = this.leagueData[this.currentIndex];
        if (!currentLeague) return;

        this.updateLeagueHeader(currentLeague.league);
        this.updateStandingsTable(currentLeague.standings);
    }

    updateLeagueHeader(league) {
        document.getElementById('league-name').textContent = league.name || 'Fantasy League';
        document.getElementById('league-season').textContent = league.season || '2024';
        document.getElementById('league-week').textContent = `Week ${league.settings?.leg || 1}`;
        document.getElementById('league-teams').textContent = `${league.total_rosters || 12} Teams`;
        
        const status = league.status === 'in_season' ? 'Active' : 
                      league.status === 'pre_draft' ? 'Pre-Draft' : 
                      league.status === 'drafting' ? 'Drafting' : 
                      league.status === 'complete' ? 'Complete' : 'Unknown';
        document.getElementById('league-status').textContent = status;
    }

    updateStandingsTable(standings) {
        const tbody = document.getElementById('standings-tbody');
        tbody.innerHTML = '';

        standings.forEach(team => {
            const row = document.createElement('tr');
            row.className = 'fade-in';
            
            const rankClass = team.rank === 1 ? 'rank-1' : 
                             team.rank === 2 ? 'rank-2' : 
                             team.rank === 3 ? 'rank-3' : 'rank-other';
            
            const pointsDiff = team.points_for - team.points_against;
            const diffClass = pointsDiff > 0 ? 'positive' : pointsDiff < 0 ? 'negative' : 'neutral';
            const diffSign = pointsDiff > 0 ? '+' : '';
            
            row.innerHTML = `
                <td class="rank-col">
                    <div class="rank ${rankClass}">${team.rank}</div>
                </td>
                <td class="team-col">
                    <div class="team-info">
                        <div class="team-avatar">
                            ${this.getTeamInitials(team.team_name)}
                        </div>
                        <div class="team-details">
                            <h3>${this.escapeHtml(team.team_name)}</h3>
                            <p>Team ${team.roster_id}</p>
                        </div>
                    </div>
                </td>
                <td class="record-col">
                    <div class="record">${team.wins}-${team.losses}${team.ties > 0 ? `-${team.ties}` : ''}</div>
                </td>
                <td class="pf-col">
                    <div class="points">${team.points_for.toFixed(1)}</div>
                </td>
                <td class="pa-col">
                    <div class="points">${team.points_against.toFixed(1)}</div>
                </td>
                <td class="diff-col">
                    <div class="points-diff ${diffClass}">${diffSign}${Math.abs(pointsDiff).toFixed(1)}</div>
                </td>
                <td class="pct-col">
                    <div class="win-percentage">${(team.win_percentage * 100).toFixed(1)}%</div>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    updateRotationIndicator() {
        const totalLeagues = this.leagueData.length;
        
        if (totalLeagues <= 1) {
            document.getElementById('rotation-indicator').classList.add('hidden');
            return;
        }
        
        document.getElementById('rotation-indicator').classList.remove('hidden');
        
        // Update progress ring
        const progress = (this.currentIndex + 1) / totalLeagues;
        const circumference = 87.96; // 2 * π * 14
        const offset = circumference - (progress * circumference);
        document.getElementById('progress-ring-fill').style.strokeDashoffset = offset;
        
        // Update current index
        document.getElementById('current-index').textContent = this.currentIndex + 1;
        
        // Update controls
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const playBtn = document.getElementById('play-pause-btn');
        
        prevBtn.disabled = this.currentIndex === 0;
        nextBtn.disabled = this.currentIndex === totalLeagues - 1;
        playBtn.disabled = totalLeagues <= 1;
        
        // Update play/pause icon
        const playIcon = document.getElementById('play-icon');
        const pauseIcon = document.getElementById('pause-icon');
        
        if (this.isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
        
        // Update dots
        this.updateLeagueDots();
    }

    updateLeagueDots() {
        const dotsContainer = document.getElementById('league-dots');
        const tooltip = document.getElementById('league-tooltip');
        const tooltipText = document.getElementById('tooltip-text');
        dotsContainer.innerHTML = '';
        
        this.leagueData.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `league-dot ${index === this.currentIndex ? 'active' : ''}`;
            dot.title = this.leagueData[index].league.name || `League ${index + 1}`;
            dot.addEventListener('click', () => this.goToLeague(index));
            
            // Add hover tooltip functionality
            dot.addEventListener('mouseenter', () => {
                tooltipText.textContent = this.leagueData[index].league.name || `League ${index + 1}`;
                tooltip.classList.remove('hidden');
            });
            dot.addEventListener('mouseleave', () => {
                tooltip.classList.add('hidden');
            });
            
            dotsContainer.appendChild(dot);
        });
    }

    previousLeague() {
        if (this.leagueData.length <= 1) return;
        
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.leagueData.length - 1;
        this.updateUI();
        this.updateRotationIndicator();
    }

    nextLeague() {
        if (this.leagueData.length <= 1) return;
        
        this.currentIndex = this.currentIndex < this.leagueData.length - 1 ? this.currentIndex + 1 : 0;
        this.updateUI();
        this.updateRotationIndicator();
    }

    goToLeague(index) {
        if (index >= 0 && index < this.leagueData.length) {
            this.currentIndex = index;
            this.updateUI();
            this.updateRotationIndicator();
        }
    }

    toggleRotation() {
        if (this.leagueData.length <= 1) return;
        
        if (this.isPlaying) {
            this.pauseRotation();
        } else {
            this.startRotation();
        }
    }

    startRotation() {
        if (this.leagueData.length <= 1) return;
        
        this.isPlaying = true;
        this.rotationInterval = setInterval(() => {
            this.nextLeague();
        }, this.rotationSpeed);
        
        this.updateRotationIndicator();
    }

    pauseRotation() {
        this.isPlaying = false;
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
            this.rotationInterval = null;
        }
        
        this.updateRotationIndicator();
    }

    showLoading() {
        document.getElementById('loading-spinner').classList.remove('hidden');
        document.getElementById('main-content').classList.add('hidden');
        document.getElementById('error-message').classList.add('hidden');
        document.getElementById('rotation-indicator').classList.add('hidden');
    }

    hideLoading() {
        document.getElementById('loading-spinner').classList.add('hidden');
    }

    showMainContent() {
        document.getElementById('main-content').classList.remove('hidden');
        document.getElementById('main-content').classList.add('fade-in');
    }

    showError(message) {
        document.getElementById('loading-spinner').classList.add('hidden');
        document.getElementById('main-content').classList.add('hidden');
        document.getElementById('rotation-indicator').classList.add('hidden');
        document.getElementById('error-text').textContent = message;
        document.getElementById('error-message').classList.remove('hidden');
    }

    async retry() {
        this.pauseRotation();
        this.currentIndex = 0;
        await this.loadAllLeagues();
        this.updateUI();
        this.updateRotationIndicator();
    }

    getTeamInitials(teamName) {
        if (!teamName) return 'T';
        
        const words = teamName.trim().split(/\s+/);
        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase();
        }
        
        return words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Cleanup method
    destroy() {
        this.pauseRotation();
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.fantasyApp = new FantasyFootballApp();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.fantasyApp) {
        window.fantasyApp.destroy();
    }
});