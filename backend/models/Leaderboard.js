const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    gameType: {
        type: String,
        default: 'speed-pulse',
        enum: ['speed-pulse']
    },
    bestScore: {
        type: Number,
        default: 0,
        min: 0
    },
    totalGames: {
        type: Number,
        default: 0,
        min: 0
    },
    averageScore: {
        type: Number,
        default: 0,
        min: 0
    },
    lastPlayed: {
        type: Date,
        default: Date.now
    }
});

// Index for leaderboard rankings
leaderboardSchema.index({ gameType: 1, bestScore: -1 });

// Method to update stats
leaderboardSchema.methods.updateStats = function (newScore) {
    this.totalGames += 1;
    this.bestScore = Math.max(this.bestScore, newScore);
    this.averageScore = ((this.averageScore * (this.totalGames - 1)) + newScore) / this.totalGames;
    this.lastPlayed = Date.now();
};

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
