const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Question = require('../models/Question');
const narutoQuestions = require('../data/naruto_questions');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedNarutoQuestions = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');

        // 1. Delete existing Naruto questions to avoid duplicates
        const deleteResult = await Question.deleteMany({ category: 'Naruto' });
        console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing Naruto questions`);

        // 2. Insert new questions
        const insertResult = await Question.insertMany(narutoQuestions);
        console.log(`✨ Successfully seeded ${insertResult.length} Naruto questions!`);

        console.log('📊 Distribution:');
        const easyCount = narutoQuestions.filter(q => q.difficulty === 'easy').length;
        const mediumCount = narutoQuestions.filter(q => q.difficulty === 'medium').length;
        const hardCount = narutoQuestions.filter(q => q.difficulty === 'hard').length;
        console.log(`   - Easy: ${easyCount}`);
        console.log(`   - Medium: ${mediumCount}`);
        console.log(`   - Hard/Expert: ${hardCount}`);

        process.exit(0);
    } catch (error) {
        console.error(`❌ Error seeding Naruto questions: ${error.message}`);
        process.exit(1);
    }
};

seedNarutoQuestions();
