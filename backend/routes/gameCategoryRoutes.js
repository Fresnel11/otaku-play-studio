const express = require('express');
const router = express.Router();
const gameCategoryController = require('../controllers/gameCategoryController');

/**
 * @route   GET /api/games/categories/top
 * @desc    Get top game categories by play count
 * @access  Public
 */
router.get('/top', gameCategoryController.getTopCategories);

/**
 * @route   GET /api/games/categories
 * @desc    Get all game categories
 * @access  Public
 */
router.get('/', gameCategoryController.getAllCategories);

/**
 * @route   GET /api/games/categories/:categoryId
 * @desc    Get single game category by ID
 * @access  Public
 */
router.get('/:categoryId', gameCategoryController.getCategory);

module.exports = router;
