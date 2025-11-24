const avatarService = require('../services/avatarService');
const authService = require('../services/authService');

// @desc    Generate avatar with AI
// @route   POST /api/avatar/generate
// @access  Private
const generateAvatar = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized'
            });
        }

        const { prompt, width, height, steps, guidance, seed } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: 'Prompt is required'
            });
        }

        // Generate avatar using Python service
        const result = await avatarService.generateAvatar(prompt, {
            width,
            height,
            steps,
            guidance,
            seed
        });

        // Save image to file system
        const avatarUrl = await avatarService.saveAvatarImage(userId, result.imageBase64);

        // Update user's avatar in database
        await authService.updateProfile(userId, { avatar: avatarUrl });

        res.status(200).json({
            success: true,
            data: {
                avatarUrl,
                generationTime: result.generationTime
            }
        });

    } catch (error) {
        console.error('Error in generateAvatar controller:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate avatar'
        });
    }
};

// @desc    Check avatar service health
// @route   GET /api/avatar/health
// @access  Public
const checkHealth = async (req, res) => {
    try {
        const health = await avatarService.checkAvatarServiceHealth();
        res.status(200).json({
            success: true,
            data: health
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Health check failed'
        });
    }
};

module.exports = {
    generateAvatar,
    checkHealth
};
