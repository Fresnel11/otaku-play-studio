const Question = require('../models/Question');

// Get random questions for a game session
const getRandomQuestions = async (count = 10, difficulty = null, category = null) => {
    try {
        let query = {};

        if (difficulty) {
            query.difficulty = difficulty;
        }

        if (category) {
            // If category is 'mixed', we don't filter by category (or we explicitly exclude specific ones if needed)
            // But for now, if category is provided and not 'mixed', we filter by it.
            if (category.toLowerCase() !== 'mixed') {
                // Case insensitive search for category
                query.category = { $regex: new RegExp(`^${category}$`, 'i') };
            }
        }

        // Get total count
        const totalQuestions = await Question.countDocuments(query);

        if (totalQuestions < count) {
            throw new Error(`Not enough questions available. Found ${totalQuestions}, need ${count}`);
        }

        // Get random questions using aggregation
        const questions = await Question.aggregate([
            { $match: query },
            { $sample: { size: count } },
            {
                $project: {
                    question: 1,
                    options: 1,
                    category: 1,
                    difficulty: 1,
                    imageUrl: 1,
                    correctAnswer: 1 // Send correctAnswer to client for immediate feedback
                }
            }
        ]);

        return questions;
    } catch (error) {
        throw new Error(`Error fetching questions: ${error.message}`);
    }
};

// Validate answer
const validateAnswer = async (questionId, userAnswer) => {
    try {
        const question = await Question.findById(questionId);

        if (!question) {
            console.error(`Question not found for ID: ${questionId}`);
            throw new Error(`Question not found: ${questionId}`);
        }

        return question.correctAnswer === userAnswer;
    } catch (error) {
        console.error(`Validation error for questionId ${questionId}:`, error);
        throw new Error(`Error validating answer: ${error.message}`);
    }
};

// Get question by ID (for verification)
const getQuestionById = async (questionId) => {
    try {
        return await Question.findById(questionId);
    } catch (error) {
        throw new Error(`Error fetching question: ${error.message}`);
    }
};

module.exports = {
    getRandomQuestions,
    validateAnswer,
    getQuestionById
};
