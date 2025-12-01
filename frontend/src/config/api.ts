// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
    AUTH: `${API_BASE_URL}/api/auth`,
    GAMES: `${API_BASE_URL}/api/games`,
    CATEGORIES: `${API_BASE_URL}/api/games/categories`,
    USERS: `${API_BASE_URL}/api/users`,
    LEADERBOARD: `${API_BASE_URL}/api/leaderboard`,
    ACTIVITY: `${API_BASE_URL}/api/activity`,
};
