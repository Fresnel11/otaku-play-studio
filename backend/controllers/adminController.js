const Question = require('../models/Question');

// @desc    Create a new question (Admin only)
// @route   POST /api/admin/questions
// @access  Private/Admin
const createQuestion = async (req, res) => {
    try {
        const { question, options, correctAnswer, category, difficulty, imageUrl } = req.body;

        // Validate input
        if (!question || !options || correctAnswer === undefined || !category) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const newQuestion = await Question.create({
            question,
            options,
            correctAnswer,
            category,
            difficulty: difficulty || 'medium',
            imageUrl
        });

        res.status(201).json({
            success: true,
            data: newQuestion
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all questions (Admin only)
// @route   GET /api/admin/questions
// @access  Private/Admin
const getAllQuestions = async (req, res) => {
    try {
        const { category, difficulty, page = 1, limit = 20 } = req.query;

        const query = {};
        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;

        const questions = await Question.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const count = await Question.countDocuments(query);

        res.status(200).json({
            success: true,
            count: questions.length,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: questions
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single question by ID (Admin only)
// @route   GET /api/admin/questions/:id
// @access  Private/Admin
const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }

        res.status(200).json({
            success: true,
            data: question
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update question (Admin only)
// @route   PUT /api/admin/questions/:id
// @access  Private/Admin
const updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }

        res.status(200).json({
            success: true,
            data: question
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete question (Admin only)
// @route   DELETE /api/admin/questions/:id
// @access  Private/Admin
const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);

        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Question deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get question statistics (Admin only)
// @route   GET /api/admin/questions/stats
// @access  Private/Admin
const getQuestionStats = async (req, res) => {
    try {
        const totalQuestions = await Question.countDocuments();

        const byDifficulty = await Question.aggregate([
            { $group: { _id: '$difficulty', count: { $sum: 1 } } }
        ]);

        const byCategory = await Question.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalQuestions,
                byDifficulty,
                byCategory
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
    getQuestionStats
};
