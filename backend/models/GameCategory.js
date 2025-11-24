const mongoose = require('mongoose');

const gameCategorySchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Facile', 'Moyen', 'Difficile', 'Expert', 'Variable'],
        default: 'Moyen'
    },
    players: {
        type: String,
        enum: ['Solo', 'Multi'],
        default: 'Solo'
    },
    playCount: {
        type: Number,
        default: 0,
        min: 0
    },
    available: {
        type: Boolean,
        default: false
    },
    route: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: 'Gamepad2'
    },
    color: {
        type: String,
        default: 'from-purple-500 to-indigo-500'
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for sorting by play count
gameCategorySchema.index({ playCount: -1 });

module.exports = mongoose.model('GameCategory', gameCategorySchema);
