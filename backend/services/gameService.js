const GameSession = require('../models/GameSession');
const Leaderboard = require('../models/Leaderboard');
const User = require('../models/User');

// Create a new game session
const createSession = async (userId, questions, gameType = 'speed-pulse') => {
    try {
        const session = await GameSession.create({
            userId,
            gameType,
            answers: []
        });

        return {
            sessionId: session._id,
            questions: questions.map(q => ({
                _id: q._id,
                question: q.question,
                options: q.options,
                category: q.category,
                difficulty: q.difficulty,
                imageUrl: q.imageUrl,
                correctAnswer: q.correctAnswer
            }))
        };
    } catch (error) {
        throw new Error(`Error creating session: ${error.message}`);
    }
};

// Calculate score based on answers
const calculateScore = (answers) => {
    let totalScore = 0;
    let currentCombo = 0;
    let maxCombo = 0;
    let overdriveTriggered = false;

    answers.forEach((answer) => {
        if (answer.isCorrect) {
            // Base points
            let points = 100;

            // Speed bonus (< 2 seconds)
            if (answer.responseTime < 2000) {
                points += 50;
            }

            // Combo multiplier
            currentCombo++;
            maxCombo = Math.max(maxCombo, currentCombo);
            const comboMultiplier = 1 + Math.min(currentCombo * 0.2, 1); // Max x2

            // Overdrive (5+ combo)
            if (currentCombo >= 5) {
                overdriveTriggered = true;
                points *= 2;
            }

            totalScore += Math.round(points * comboMultiplier);
        } else {
            // Reset combo on wrong answer
            currentCombo = 0;
        }
    });

    return {
        totalScore,
        maxCombo,
        overdriveTriggered
    };
};

// Submit game results
const submitGameResults = async (sessionId, userId, answers) => {
    try {
        // Calculate score
        const { totalScore, maxCombo, overdriveTriggered } = calculateScore(answers);

        // Count correct answers
        const correctAnswers = answers.filter(a => a.isCorrect).length;

        // Calculate total time
        const timeTaken = answers.reduce((sum, a) => sum + a.responseTime, 0) / 1000; // Convert to seconds

        // Update session
        const session = await GameSession.findByIdAndUpdate(
            sessionId,
            {
                score: totalScore,
                correctAnswers,
                maxCombo,
                overdriveTriggered,
                timeTaken,
                answers,
                completedAt: Date.now()
            },
            { new: true }
        );

        if (!session) {
            throw new Error('Session not found');
        }

        // Update leaderboard
        await updateLeaderboard(userId, totalScore);

        // Award XP to user
        const xpEarned = await awardXP(userId, totalScore);

        // Get user rank
        const rank = await getUserRank(userId);

        return {
            finalScore: totalScore,
            correctAnswers,
            maxCombo,
            overdriveTriggered,
            timeTaken: Math.round(timeTaken),
            xpEarned,
            rank
        };
    } catch (error) {
        throw new Error(`Error submitting results: ${error.message}`);
    }
};

// Update leaderboard
const updateLeaderboard = async (userId, score) => {
    try {
        let leaderboardEntry = await Leaderboard.findOne({ userId, gameType: 'speed-pulse' });

        if (!leaderboardEntry) {
            // Create new entry
            leaderboardEntry = await Leaderboard.create({
                userId,
                gameType: 'speed-pulse',
                bestScore: score,
                totalGames: 1,
                averageScore: score,
                lastPlayed: Date.now()
            });
        } else {
            // Update existing entry
            leaderboardEntry.updateStats(score);
            await leaderboardEntry.save();
        }

        return leaderboardEntry;
    } catch (error) {
        throw new Error(`Error updating leaderboard: ${error.message}`);
    }
};

// Award XP to user
const awardXP = async (userId, score) => {
    try {
        // XP formula: score / 10
        const xpEarned = Math.round(score / 10);

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.xp += xpEarned;

        // Level up logic (100 XP per level)
        const newLevel = Math.floor(user.xp / 100) + 1;
        if (newLevel > user.level) {
            user.level = newLevel;
        }

        await user.save();

        return xpEarned;
    } catch (error) {
        throw new Error(`Error awarding XP: ${error.message}`);
    }
};

// Get user rank
const getUserRank = async (userId) => {
    try {
        const leaderboard = await Leaderboard.find({ gameType: 'speed-pulse' })
            .sort({ bestScore: -1 })
            .select('userId');

        const rank = leaderboard.findIndex(entry => entry.userId.toString() === userId.toString()) + 1;

        return rank || null;
    } catch (error) {
        throw new Error(`Error getting rank: ${error.message}`);
    }
};

// Get leaderboard
const getLeaderboard = async (limit = 10) => {
    try {
        const leaderboard = await Leaderboard.find({ gameType: 'speed-pulse' })
            .sort({ bestScore: -1 })
            .limit(limit)
            .populate('userId', 'username avatar level');

        return leaderboard.map((entry, index) => ({
            rank: index + 1,
            username: entry.userId.username,
            avatar: entry.userId.avatar,
            level: entry.userId.level,
            bestScore: entry.bestScore,
            totalGames: entry.totalGames,
            averageScore: Math.round(entry.averageScore)
        }));
    } catch (error) {
        throw new Error(`Error fetching leaderboard: ${error.message}`);
    }
};

// Get user stats
const getUserStats = async (userId) => {
    try {
        const stats = await Leaderboard.findOne({ userId, gameType: 'speed-pulse' });

        if (!stats) {
            return {
                totalGames: 0,
                bestScore: 0,
                averageScore: 0,
                lastPlayed: null
            };
        }

        return {
            totalGames: stats.totalGames,
            bestScore: stats.bestScore,
            averageScore: Math.round(stats.averageScore),
            lastPlayed: stats.lastPlayed
        };
    } catch (error) {
        throw new Error(`Error fetching user stats: ${error.message}`);
    }
};

module.exports = {
    createSession,
    calculateScore,
    submitGameResults,
    updateLeaderboard,
    awardXP,
    getLeaderboard,
    getUserStats
};
