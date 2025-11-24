const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const AVATAR_SERVICE_URL = process.env.AVATAR_SERVICE_URL || 'http://localhost:8000';
const AVATARS_DIR = path.join(__dirname, '../public/avatars');

// Ensure avatars directory exists
const ensureAvatarsDir = async () => {
    try {
        await fs.mkdir(AVATARS_DIR, { recursive: true });
    } catch (error) {
        console.error('Error creating avatars directory:', error);
    }
};

/**
 * Generate an anime avatar using the Python service
 */
const generateAvatar = async (prompt, options = {}) => {
    try {
        const response = await axios.post(`${AVATAR_SERVICE_URL}/generate-avatar`, {
            prompt,
            width: options.width || 512,
            height: options.height || 512,
            num_inference_steps: options.steps || 20,
            guidance_scale: options.guidance || 7.5,
            seed: options.seed
        }, {
            timeout: 120000 // 2 minutes timeout
        });

        if (response.data.success) {
            return {
                success: true,
                imageBase64: response.data.image_base64,
                generationTime: response.data.generation_time
            };
        } else {
            throw new Error('Avatar generation failed');
        }
    } catch (error) {
        console.error('Error calling avatar service:', error.message);
        throw new Error(`Avatar generation failed: ${error.message}`);
    }
};

/**
 * Save avatar image from base64 to file system
 */
const saveAvatarImage = async (userId, imageBase64) => {
    try {
        await ensureAvatarsDir();

        const filename = `avatar-${userId}-${Date.now()}.png`;
        const filepath = path.join(AVATARS_DIR, filename);

        // Convert base64 to buffer and save
        const imageBuffer = Buffer.from(imageBase64, 'base64');
        await fs.writeFile(filepath, imageBuffer);

        // Return public URL
        return `/avatars/${filename}`;
    } catch (error) {
        console.error('Error saving avatar image:', error);
        throw new Error('Failed to save avatar image');
    }
};

/**
 * Check if avatar service is available
 */
const checkAvatarServiceHealth = async () => {
    try {
        const response = await axios.get(`${AVATAR_SERVICE_URL}/health`, {
            timeout: 5000
        });
        return response.data;
    } catch (error) {
        console.error('Avatar service health check failed:', error.message);
        return { status: 'unavailable', error: error.message };
    }
};

module.exports = {
    generateAvatar,
    saveAvatarImage,
    checkAvatarServiceHealth
};
