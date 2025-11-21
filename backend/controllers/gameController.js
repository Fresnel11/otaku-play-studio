const questionService = require('../services/questionService');
const gameService = require('../services/gameService');

// @desc    Get random questions for SpeedPulse Quiz
// @route   GET /api/games/speed-pulse/questions
// @access  Private
const getQuestions = async (req, res) => {
    try {
        const { difficulty } = req.query;
        const questions = await questionService.getRandomQuestions(10, difficulty);

        res.status(200).json({
            success: true,
            count: questions.length,
            data: questions
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Start a new game session
// @route   POST /api/games/speed-pulse/start
// @access  Private
const startGame = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        // Get random questions
        const questions = await questionService.getRandomQuestions(10);

        // Create session
        const session = await gameService.createSession(userId, questions);

        res.status(201).json({
            success: true,
            data: session
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Start a new survival game session
// @route   POST /api/games/survival/start
// @access  Private
const startSurvival = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        // Get random questions (fetch 50 for survival mode)
        const questions = await questionService.getRandomQuestions(50);

        // Create session
        const session = await gameService.createSession(userId, questions, 'survival');

        res.status(201).json({
            success: true,
            data: session
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Submit game results
// @route   POST /api/games/speed-pulse/submit
// @access  Private
const submitGame = async (req, res) => {
    try {
        const { sessionId, userId, answers } = req.body;
        console.log('Submit Game Payload:', { sessionId, userId, answersLength: answers?.length });

        if (!sessionId || !userId || !answers) {
            return res.status(400).json({
                success: false,
                message: 'Session ID, User ID, and answers are required'
            });
        }

        // Validate answers against questions
        const validatedAnswers = [];
        for (const answer of answers) {
            const isCorrect = await questionService.validateAnswer(
                answer.questionId,
                answer.userAnswer
            );

            validatedAnswers.push({
                ...answer,
                isCorrect
            });
        }

        // Submit results
        const results = await gameService.submitGameResults(
            sessionId,
            userId,
            validatedAnswers
        );

        res.status(200).json({
            success: true,
            data: results
        });
    } catch (error) {
        console.error('Submit Game Error:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get leaderboard
// @route   GET /api/games/speed-pulse/leaderboard
// @access  Public
const getLeaderboard = async (req, res) => {
    try {
        const { limit = 10 } = req.query;
        const leaderboard = await gameService.getLeaderboard(parseInt(limit));

        res.status(200).json({
            success: true,
            count: leaderboard.length,
            data: leaderboard
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get user stats
// @route   GET /api/games/speed-pulse/stats/:userId
// @access  Private
const getUserStats = async (req, res) => {
    try {
        const { userId } = req.params;
        const stats = await gameService.getUserStats(userId);

        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getQuestions,
    startGame,
    startSurvival,
    submitGame,
    getLeaderboard,
    getUserStats
};
