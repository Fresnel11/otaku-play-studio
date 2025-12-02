import axios from 'axios';
import { API_ENDPOINTS } from '@/config/api';

export interface LeaderboardEntry {
    rank: number;
    username: string;
    avatar?: string;
    level: number;
    bestScore: number;
    totalGames: number;
    averageScore: number;
}

/**
 * Get leaderboard for a specific game type
 * @param gameType - Type of game (speed-pulse, survival, memory-kawaii)
 * @param limit - Number of entries to fetch (default: 10)
 */
export const getLeaderboard = async (
    gameType: 'speed-pulse' | 'survival' | 'memory-kawaii' = 'speed-pulse',
    limit: number = 10
): Promise<LeaderboardEntry[]> => {
    const response = await axios.get(`${API_ENDPOINTS.GAMES}/${gameType}/leaderboard`, {
        params: { limit }
    });
    return response.data.data;
};

/**
 * Get global leaderboard (all game types combined)
 * @param limit - Number of entries to fetch (default: 10)
 */
export const getGlobalLeaderboard = async (limit: number = 10): Promise<LeaderboardEntry[]> => {
    // For now, we'll fetch speed-pulse leaderboard as the main one
    // You can modify this to aggregate all game types if needed
    return getLeaderboard('speed-pulse', limit);
};
