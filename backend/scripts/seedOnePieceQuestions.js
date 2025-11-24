const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('../models/Question');
const onePieceQuestions = require('../data/one_piece_questions');

// Load env vars
dotenv.config({ path: '../.env' });

const seedOnePieceQuestions = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Delete existing One Piece questions
        const deleteResult = await Question.deleteMany({ category: 'One Piece' });
        console.log(`🗑️ Deleted ${deleteResult.deletedCount} existing One Piece questions`);

        // Insert new questions
        const insertResult = await Question.insertMany(onePieceQuestions);
        console.log(`✨ Added ${insertResult.length} One Piece questions`);

        console.log('✅ Seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding questions:', error);
        process.exit(1);
    }
};

seedOnePieceQuestions();
