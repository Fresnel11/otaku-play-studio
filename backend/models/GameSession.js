const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gameType: {
        type: String,
        default: 'speed-pulse',
        enum: ['speed-pulse']
    },
    score: {
        type: Number,
        default: 0,
        min: 0
    },
    correctAnswers: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    maxCombo: {
        type: Number,
        default: 0,
        min: 0
    },
    overdriveTriggered: {
        type: Boolean,
        default: false
    },
    timeTaken: {
        type: Number,
        default: 0,
        min: 0
    },
    answers: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true
        },
        userAnswer: {
            type: Number,
            required: true,
            min: -1,
            max: 3
        },
        isCorrect: {
            type: Boolean,
            required: true
        },
        responseTime: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    completedAt: {
        type: Date,
        default: Date.now
    }
});

// Index for leaderboard queries
gameSessionSchema.index({ userId: 1, score: -1 });
gameSessionSchema.index({ gameType: 1, score: -1 });

module.exports = mongoose.model('GameSession', gameSessionSchema);
