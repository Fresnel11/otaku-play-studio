const GameCategory = require('../models/GameCategory');

// @desc    Get top game categories by play count
// @route   GET /api/games/categories/top
// @access  Public
const getTopCategories = async (req, res) => {
    try {
        const { limit = 3 } = req.query;

        const categories = await GameCategory.find({ available: true })
            .sort({ playCount: -1 })
            .limit(parseInt(limit));

        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all game categories
// @route   GET /api/games/categories
// @access  Public
const getAllCategories = async (req, res) => {
    try {
        const categories = await GameCategory.find()
            .sort({ playCount: -1 });

        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single game category
// @route   GET /api/games/categories/:categoryId
// @access  Public
const getCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await GameCategory.findOne({ categoryId });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getTopCategories,
    getAllCategories,
    getCategory
};
