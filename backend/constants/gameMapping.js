/**
 * Mapping between game types (modes) and their parent categories
 * This allows us to track play counts at the category level
 */

const GAME_TYPE_TO_CATEGORY = {
    'speed-pulse': 'quiz-anime',
    'survival': 'quiz-anime',
    // Add more mappings as new game modes are created
};

/**
 * Get the category ID for a given game type
 * @param {string} gameType - The game type/mode (e.g., 'speed-pulse')
 * @returns {string} The category ID (e.g., 'quiz-anime')
 */
const getCategoryForGameType = (gameType) => {
    return GAME_TYPE_TO_CATEGORY[gameType] || 'quiz-anime'; // Default to quiz-anime
};

module.exports = {
    GAME_TYPE_TO_CATEGORY,
    getCategoryForGameType
};
