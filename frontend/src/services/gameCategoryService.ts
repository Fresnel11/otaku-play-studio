import axios from 'axios';
import { API_ENDPOINTS } from '@/config/api';

const API_URL = API_ENDPOINTS.CATEGORIES;

export interface GameCategory {
    _id: string;
    categoryId: string;
    title: string;
    description: string;
    difficulty: string;
    players: string;
    playCount: number;
    available: boolean;
    route: string;
    icon: string;
    color: string;
    image: string;
    createdAt: string;
}

/**
 * Get top game categories by play count
 * @param limit - Number of categories to fetch (default: 3)
 */
export const getTopCategories = async (limit: number = 3): Promise<GameCategory[]> => {
    try {
        const response = await axios.get(`${API_URL}/top`, {
            params: { limit }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching top categories:', error);
        return [];
    }
};

/**
 * Get all game categories
 */
export const getAllCategories = async (): Promise<GameCategory[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

/**
 * Get single game category by ID
 * @param categoryId - The category ID
 */
export const getCategory = async (categoryId: string): Promise<GameCategory | null> => {
    try {
        const response = await axios.get(`${API_URL}/${categoryId}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
};
