import axios from 'axios';
import { API_ENDPOINTS } from '@/config/api';

const API_URL = API_ENDPOINTS.GAMES;

export interface Question {
    _id: string;
    question: string;
    options: string[];
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    imageUrl?: string;
    correctAnswer: number;
}

export interface GameSession {
    sessionId: string;
    questions: Question[];
}

export interface GameResult {
    finalScore: number;
    correctAnswers: number;
    maxCombo: number;
    overdriveTriggered: boolean;
    xpEarned: number;
    rank: number;
}

export interface LeaderboardEntry {
    rank: number;
    username: string;
    avatar: string;
    level: number;
    bestScore: number;
    totalGames: number;
}

// Helper to get auth header
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const startGame = async (userId: string, category?: string): Promise<GameSession> => {
    const response = await axios.post(
        `${API_URL}/speed-pulse/start`,
        { userId, category },
        { headers: getAuthHeader() }
    );
    return response.data.data;
};

export const startSurvivalGame = async (userId: string, category?: string): Promise<GameSession> => {
    const response = await axios.post(
        `${API_URL}/survival/start`,
        { userId, category },
        { headers: getAuthHeader() }
    );
    return response.data.data;
};

export const submitGame = async (
    sessionId: string,
    userId: string,
    answers: { questionId: string; userAnswer: number; responseTime: number }[]
): Promise<GameResult> => {
    const response = await axios.post(
        `${API_URL}/speed-pulse/submit`,
        {
            sessionId,
            userId,
            answers,
        },
        { headers: getAuthHeader() }
    );
    return response.data.data;
};

export const submitSurvivalGame = async (
    sessionId: string,
    userId: string,
    answers: { questionId: string; userAnswer: number; responseTime: number }[]
): Promise<GameResult> => {
    const response = await axios.post(
        `${API_URL}/survival/submit`,
        {
            sessionId,
            userId,
            answers,
        },
        { headers: getAuthHeader() }
    );
    return response.data.data;
};

export const startMemoryGame = async (userId: string): Promise<{ sessionId: string }> => {
    const response = await axios.post(
        `${API_URL}/memory/start`,
        { userId },
        { headers: getAuthHeader() }
    );
    return response.data.data;
};

export const submitMemoryGame = async (
    sessionId: string,
    userId: string,
    result: {
        score: number;
        timeTaken: number;
        attempts: number;
        pairsFound: number;
        success: boolean;
    }
): Promise<GameResult> => {
    const response = await axios.post(
        `${API_URL}/memory/submit`,
        {
            sessionId,
            userId,
            ...result
        },
        { headers: getAuthHeader() }
    );
    return response.data.data;
};

export const getLeaderboard = async (limit: number = 10): Promise<LeaderboardEntry[]> => {
    const response = await axios.get(`${API_URL}/speed-pulse/leaderboard?limit=${limit}`);
    return response.data.data;
};
