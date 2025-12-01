import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Helper to get auth header
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export interface UserProfile {
    id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    avatar: string;
    bio: string;
    level: number;
    xp: number;
    gamesPlayed: number;
    wins: number;
    createdAt: string;
}

export const getCurrentUser = async (): Promise<UserProfile> => {
    const response = await axios.get(`${API_URL}/me`, {
        headers: getAuthHeader()
    });
    return response.data.data;
};

export const updateProfile = async (updates: {
    username?: string;
    bio?: string;
    avatar?: string;
}): Promise<UserProfile> => {
    const response = await axios.put(`${API_URL}/me`, updates, {
        headers: getAuthHeader()
    });
    return response.data.data;
};

// Alias for consistency
export const getUserProfile = getCurrentUser;
