const GameSession = require('../models/GameSession');
const Leaderboard = require('../models/Leaderboard');
const User = require('../models/User');
const GameCategory = require('../models/GameCategory');
const { getCategoryForGameType } = require('../constants/gameMapping');

// Create a new game session
const createSession = async (userId, questions, gameType = 'speed-pulse') => {
    try {
        const session = await GameSession.create({
            userId,
            gameType,
            answers: []
        });

        // Increment play count for the game category
        const categoryId = getCategoryForGameType(gameType);
        await GameCategory.findOneAndUpdate(
            { categoryId },
            { $inc: { playCount: 1 } }
        );

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

// Get session
const getSession = async (sessionId) => {
    try {
        const session = await GameSession.findById(sessionId);
        if (!session) {
            throw new Error('Session not found');
        }
        return session;
    } catch (error) {
        throw new Error(`Error getting session: ${error.message}`);
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
        // Get session to determine game type
        const session = await GameSession.findById(sessionId);
        if (!session) {
            throw new Error('Session not found');
        }
        const gameType = session.gameType;

        // Calculate score
        const { totalScore, maxCombo, overdriveTriggered } = calculateScore(answers);

        // Count correct answers
        const correctAnswers = answers.filter(a => a.isCorrect).length;

        // Calculate total time
        const timeTaken = answers.reduce((sum, a) => sum + a.responseTime, 0) / 1000; // Convert to seconds

        // Update session
        await GameSession.findByIdAndUpdate(
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

        // Update leaderboard with game type
        await updateLeaderboard(userId, totalScore, gameType);

        // Update global user stats (gamesPlayed and wins)
        // Consider it a win if user got 60% or more correct answers
        const totalQuestions = answers.length;
        const winThreshold = 0.6; // 60% correct answers
        const isWin = (correctAnswers / totalQuestions) >= winThreshold;
        await updateUserStats(userId, isWin);

        // Award XP to user
        const xpEarned = await awardXP(userId, totalScore);

        // Get user rank for this game type
        const rank = await getUserRank(userId, gameType);

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
const updateLeaderboard = async (userId, score, gameType = 'speed-pulse') => {
    try {
        let leaderboardEntry = await Leaderboard.findOne({ userId, gameType });

        if (!leaderboardEntry) {
            // Create new entry
            leaderboardEntry = await Leaderboard.create({
                userId,
                gameType,
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

// Update global user stats (gamesPlayed and wins)
const updateUserStats = async (userId, isWin = false) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        // Increment games played
        user.gamesPlayed = (user.gamesPlayed || 0) + 1;

        // Increment wins if the game was won
        if (isWin) {
            user.wins = (user.wins || 0) + 1;
        }

        await user.save();

        return {
            gamesPlayed: user.gamesPlayed,
            wins: user.wins,
            winRate: user.gamesPlayed > 0 ? (user.wins / user.gamesPlayed * 100).toFixed(2) : 0
        };
    } catch (error) {
        throw new Error(`Error updating user stats: ${error.message}`);
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
const getUserRank = async (userId, gameType = 'speed-pulse') => {
    try {
        const leaderboard = await Leaderboard.find({ gameType })
            .sort({ bestScore: -1 })
            .select('userId');

        const rank = leaderboard.findIndex(entry => entry.userId.toString() === userId.toString()) + 1;

        return rank || null;
    } catch (error) {
        throw new Error(`Error getting rank: ${error.message}`);
    }
};

// Get leaderboard
const getLeaderboard = async (limit = 10, gameType = 'speed-pulse') => {
    try {
        const leaderboard = await Leaderboard.find({ gameType })
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
const getUserStats = async (userId, gameType = 'speed-pulse') => {
    try {
        const stats = await Leaderboard.findOne({ userId, gameType });

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

// Create a new memory game session
const createMemorySession = async (userId) => {
    try {
        const session = await GameSession.create({
            userId,
            gameType: 'memory-kawaii',
            answers: [] // No questions for memory game
        });

        // Increment play count for the game category
        const categoryId = getCategoryForGameType('memory-kawaii');
        await GameCategory.findOneAndUpdate(
            { categoryId },
            { $inc: { playCount: 1 } }
        );

        return {
            sessionId: session._id
        };
    } catch (error) {
        throw new Error(`Error creating memory session: ${error.message}`);
    }
};

// Submit memory game results
const submitMemoryResults = async (sessionId, userId, stats) => {
    try {
        const { score, timeTaken, attempts, pairsFound, success } = stats;

        // Update session
        await GameSession.findByIdAndUpdate(
            sessionId,
            {
                score,
                timeTaken,
                memoryStats: {
                    attempts,
                    pairsFound
                },
                completedAt: Date.now()
            },
            { new: true }
        );

        // Update leaderboard
        await updateLeaderboard(userId, score, 'memory-kawaii');

        // Update global user stats
        // Win if success is true
        await updateUserStats(userId, success);

        // Award XP to user
        const xpEarned = await awardXP(userId, score);

        // Get user rank
        const rank = await getUserRank(userId, 'memory-kawaii');

        return {
            finalScore: score,
            xpEarned,
            rank
        };
    } catch (error) {
        throw new Error(`Error submitting memory results: ${error.message}`);
    }
};

module.exports = {
    createSession,
    createMemorySession,
    getSession,
    calculateScore,
    submitGameResults,
    submitMemoryResults,
    updateLeaderboard,
    updateUserStats,
    awardXP,
    getLeaderboard,
    getUserStats
};
