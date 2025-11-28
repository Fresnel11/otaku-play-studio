const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Question = require('../models/Question');
const demonSlayerQuestions = require('../data/demon_slayer_questions');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedDemonSlayerQuestions = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');

        // 1. Delete existing Demon Slayer questions to avoid duplicates
        const deleteResult = await Question.deleteMany({ category: 'Demon Slayer' });
        console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing Demon Slayer questions`);

        // 2. Insert new questions
        const insertResult = await Question.insertMany(demonSlayerQuestions);
        console.log(`✨ Successfully seeded ${insertResult.length} Demon Slayer questions!`);

        console.log('📊 Distribution:');
        const easyCount = demonSlayerQuestions.filter(q => q.difficulty === 'easy').length;
        const mediumCount = demonSlayerQuestions.filter(q => q.difficulty === 'medium').length;
        const hardCount = demonSlayerQuestions.filter(q => q.difficulty === 'hard').length;
        console.log(`   - Easy: ${easyCount}`);
        console.log(`   - Medium: ${mediumCount}`);
        console.log(`   - Hard: ${hardCount}`);

        process.exit(0);
    } catch (error) {
        console.error(`❌ Error seeding Demon Slayer questions: ${error.message}`);
        process.exit(1);
    }
};

seedDemonSlayerQuestions();