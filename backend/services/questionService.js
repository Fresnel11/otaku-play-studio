const Question = require('../models/Question');
const UserQuestionHistory = require('../models/UserQuestionHistory');

// Get random questions without tracking (simple version)
const getRandomQuestions = async (count = 10, difficulty = null, category = null) => {
    try {
        let filter = {};
        
        if (difficulty) {
            filter.difficulty = difficulty;
        }
        
        if (category) {
            filter.category = category;
        }

        const questions = await Question.aggregate([
            { $match: filter },
            { $sample: { size: count } }
        ]);

        return questions;
    } catch (error) {
        throw new Error(`Error fetching random questions: ${error.message}`);
    }
};

// Category mapping from frontend categoryId to database categories
const categoryMapping = {
    'quiz-anime': ['Naruto', 'One Piece', 'Dragon Ball', 'Attack on Titan', 'My Hero Academia', 'Demon Slayer'],
    'survival': null, // Mixed categories for survival mode
    'mixed': null, // Mixed categories for general play
    'naruto': ['Naruto'],
    'one-piece': ['One Piece'],
    'dragon-ball': ['Dragon Ball'],
    'attack-on-titan': ['Attack on Titan'],
    'my-hero-academia': ['My Hero Academia'],
    'demon-slayer': ['Demon Slayer'],
    'jujutsu-kaisen': ['Jujutsu Kaisen'],
    'death-note': ['Death Note'],
    'fullmetal-alchemist': ['Fullmetal Alchemist'],
    'hunter-x-hunter': ['Hunter x Hunter'],
    'bleach': ['Bleach'],
    'tokyo-ghoul': ['Tokyo Ghoul'],
    'code-geass': ['Code Geass'],
    'sword-art-online': ['Sword Art Online'],
    'cowboy-bebop': ['Cowboy Bebop'],
    'steins-gate': ['Steins;Gate'],
    'mob-psycho-100': ['Mob Psycho 100']
};

// Get random questions with tracking to avoid repetition
const getRandomQuestionsWithTracking = async (userId, count = 10, difficulty = null, category = null) => {
    try {
        let filter = {};
        let categoryKey = 'mixed'; // Default category key for tracking
        
        // Only add filters if they are provided and not null/empty
        if (difficulty && difficulty.trim() !== '') {
            filter.difficulty = difficulty;
        }
        
        // Handle category mapping
        if (category && category.trim() !== '') {
            categoryKey = category.toLowerCase();
            const mappedCategories = categoryMapping[categoryKey];
            if (mappedCategories && mappedCategories.length > 0) {
                filter.category = { $in: mappedCategories };
            } else if (!categoryMapping.hasOwnProperty(categoryKey)) {
                // If category is not in mapping, try to use it directly
                filter.category = category;
                categoryKey = category;
            }
            // If mappedCategories is null (like for 'survival'), don't add category filter
        }

        console.log('🔍 Searching questions with filter:', filter);
        console.log('📊 Requested count:', count);
        console.log('📝 Category key for tracking:', categoryKey);

        // Get user's question history for this category
        let userHistory = await UserQuestionHistory.findOne({ userId, category: categoryKey });
        if (!userHistory) {
            userHistory = new UserQuestionHistory({ userId, category: categoryKey, questionIds: [] });
        }

        // Clean old history if needed
        await userHistory.cleanOldHistory();

        // Get questions excluding already seen ones
        const excludeIds = userHistory.questionIds;
        if (excludeIds.length > 0) {
            filter._id = { $nin: excludeIds };
        }

        console.log('🚫 Excluding', excludeIds.length, 'already seen questions');

        // First, try with the specific filter (excluding seen questions)
        let questions = await Question.aggregate([
            { $match: filter },
            { $sample: { size: count } }
        ]);

        console.log('✅ Found questions with filter (excluding seen):', questions.length);

        // If not enough questions found and we have exclusions, try without exclusions
        if (questions.length < count && excludeIds.length > 0) {
            console.log('⚠️ Not enough unseen questions, including some seen questions...');
            const filterWithoutExclusion = { ...filter };
            delete filterWithoutExclusion._id;
            
            const additionalQuestions = await Question.aggregate([
                { $match: filterWithoutExclusion },
                { $sample: { size: count } }
            ]);
            
            // Merge and deduplicate
            const allQuestions = [...questions];
            for (const q of additionalQuestions) {
                if (!allQuestions.some(existing => existing._id.toString() === q._id.toString())) {
                    allQuestions.push(q);
                    if (allQuestions.length >= count) break;
                }
            }
            questions = allQuestions.slice(0, count);
        }

        // If no questions found with category filter, try without category filter but keep difficulty
        if (questions.length === 0 && filter.category) {
            console.log('⚠️ No questions found with category filter, trying without category...');
            const filterWithoutCategory = { ...filter };
            delete filterWithoutCategory.category;
            
            questions = await Question.aggregate([
                { $match: filterWithoutCategory },
                { $sample: { size: count } }
            ]);
            console.log('✅ Found questions without category filter:', questions.length);
        }

        // If still no questions found, try without any filters
        if (questions.length === 0) {
            console.log('⚠️ No questions found with filters, trying without any filters...');
            questions = await Question.aggregate([
                { $sample: { size: count } }
            ]);
            console.log('✅ Found questions without any filter:', questions.length);
        }

        // If still no questions, check if database has any questions at all
        if (questions.length === 0) {
            const totalQuestions = await Question.countDocuments();
            console.log('📊 Total questions in database:', totalQuestions);
            
            if (totalQuestions === 0) {
                throw new Error('No questions found in database. Please seed the database first.');
            } else {
                throw new Error('Unable to fetch questions. Database connection issue.');
            }
        }

        // Update user's question history
        if (questions.length > 0) {
            const questionIds = questions.map(q => q._id);
            await userHistory.addQuestions(questionIds);
            console.log('📝 Updated user question history with', questionIds.length, 'questions');
        }

        return questions;
    } catch (error) {
        console.error('❌ Error in getRandomQuestionsWithTracking:', error.message);
        throw new Error(`Error fetching random questions with tracking: ${error.message}`);
    }
};

// Validate answer
const validateAnswer = async (questionId, userAnswer) => {
    try {
        const question = await Question.findById(questionId);
        
        if (!question) {
            throw new Error('Question not found');
        }

        return question.correctAnswer === userAnswer;
    } catch (error) {
        throw new Error(`Error validating answer: ${error.message}`);
    }
};

// Get question by ID
const getQuestionById = async (questionId) => {
    try {
        const question = await Question.findById(questionId);
        
        if (!question) {
            throw new Error('Question not found');
        }

        return question;
    } catch (error) {
        throw new Error(`Error fetching question: ${error.message}`);
    }
};

// Get questions by category
const getQuestionsByCategory = async (category, limit = null) => {
    try {
        let query = Question.find({ category });
        
        if (limit) {
            query = query.limit(limit);
        }

        const questions = await query;
        return questions;
    } catch (error) {
        throw new Error(`Error fetching questions by category: ${error.message}`);
    }
};

// Get all categories
const getCategories = async () => {
    try {
        const categories = await Question.distinct('category');
        return categories;
    } catch (error) {
        throw new Error(`Error fetching categories: ${error.message}`);
    }
};

module.exports = {
    getRandomQuestions,
    getRandomQuestionsWithTracking,
    validateAnswer,
    getQuestionById,
    getQuestionsByCategory,
    getCategories
};