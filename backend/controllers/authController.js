const authService = require('../services/authService');

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
    try {
        const { username, email, password, firstname, lastname } = req.body;

        // Validate input
        if (!username || !email || !password || !firstname || !lastname) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Register user
        const result = await authService.registerUser(username, email, password, firstname, lastname);

        res.status(201).json({
            success: true,
            data: result
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Login attempt for email: ${email}`);

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Login user
        const result = await authService.loginUser(email, password);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized'
            });
        }

        const user = await authService.getUserById(userId);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized'
            });
        }

        const { username, bio, avatar } = req.body;
        const updates = { username, bio, avatar };

        const updatedUser = await authService.updateProfile(userId, updates);

        res.status(200).json({
            success: true,
            data: updatedUser
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    register,
    login,
    getMe,
    updateProfile
};
