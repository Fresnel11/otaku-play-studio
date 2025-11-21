const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from backend/.env
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

async function fixLeaderboardIndex() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');

        const db = mongoose.connection.db;
        const collection = db.collection('leaderboards');

        // Get existing indexes
        const indexes = await collection.indexes();
        console.log('Current indexes:', indexes.map(i => i.name));

        // Drop the old userId_1 unique index if it exists
        try {
            await collection.dropIndex('userId_1');
            console.log('✅ Dropped old userId_1 index');
        } catch (error) {
            if (error.code === 27) {
                console.log('ℹ️  userId_1 index does not exist (already dropped)');
            } else {
                throw error;
            }
        }

        // Create the new composite unique index
        await collection.createIndex(
            { userId: 1, gameType: 1 },
            { unique: true, name: 'userId_1_gameType_1' }
        );
        console.log('✅ Created new composite unique index: userId_1_gameType_1');

        // Verify new indexes
        const newIndexes = await collection.indexes();
        console.log('Updated indexes:', newIndexes.map(i => i.name));

        await mongoose.connection.close();
        console.log('\n✅ Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

fixLeaderboardIndex();
