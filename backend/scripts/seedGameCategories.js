const dotenv = require('dotenv');
dotenv.config();

const GameCategory = require('../models/GameCategory');
const connectDB = require('../config/db');

const categories = [
    {
        categoryId: 'quiz-anime',
        title: 'Quiz Anime Rapide',
        description: 'Teste tes connaissances sur les animes populaires et montre que tu es un vrai otaku !',
        difficulty: 'Facile',
        players: 'Solo',
        playCount: 0,
        available: true,
        route: '/games/quiz',
        icon: 'Sparkles',
        color: 'from-pink-500 to-rose-500',
        image: '/assets/games/anime_quiz_cover.png'
    },
    {
        categoryId: 'memory-kawaii',
        title: 'Memory Kawaii',
        description: 'Trouve les paires de personnages d\'anime dans ce jeu de mémoire amusant.',
        difficulty: 'Moyen',
        players: 'Solo',
        playCount: 0,
        available: false,
        route: '/games/memory',
        icon: 'Brain',
        color: 'from-cyan-500 to-blue-500',
        image: '/assets/games/memory_game_cover.png'
    },
    {
        categoryId: 'classement-mondial',
        title: 'Classement Mondial',
        description: 'Compare ton score avec les autres otakus du monde entier !',
        difficulty: 'Difficile',
        players: 'Multi',
        playCount: 0,
        available: false,
        route: '/games/ranking',
        icon: 'Trophy',
        color: 'from-yellow-500 to-amber-500',
        image: '/assets/games/ranking_cover.png'
    },
    {
        categoryId: 'battle-royale',
        title: 'Battle Royale',
        description: 'Affronte d\'autres joueurs en temps réel dans des quiz épiques !',
        difficulty: 'Expert',
        players: 'Multi',
        playCount: 0,
        available: false,
        route: '/games/battle',
        icon: 'Zap',
        color: 'from-red-500 to-orange-500',
        image: '/assets/games/battle_royale_cover.png'
    },
    {
        categoryId: 'mode-histoire',
        title: 'Mode Histoire',
        description: 'Découvre des histoires d\'anime à travers des quiz thématiques captivants.',
        difficulty: 'Variable',
        players: 'Solo',
        playCount: 0,
        available: false,
        route: '/games/story',
        icon: 'Gamepad2',
        color: 'from-purple-500 to-indigo-500',
        image: '/assets/games/story_mode_cover.png'
    },
    {
        categoryId: 'defi-communautaire',
        title: 'Défi Communautaire',
        description: 'Rejoins les défis créés par la communauté et gagne des récompenses exclusives.',
        difficulty: 'Variable',
        players: 'Multi',
        playCount: 0,
        available: false,
        route: '/games/community',
        icon: 'Users',
        color: 'from-green-500 to-emerald-500',
        image: '/assets/games/community_cover.png'
    }
];

const seedGameCategories = async () => {
    try {
        // Check if categories already exist
        const count = await GameCategory.countDocuments();

        if (count > 0) {
            console.log('✅ Game categories already seeded');
            return;
        }

        // Insert categories
        await GameCategory.insertMany(categories);
        console.log('✅ Game categories seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding game categories:', error);
    }
};

// Run if called directly
if (require.main === module) {
    connectDB().then(async () => {
        await seedGameCategories();
        process.exit(0);
    });
}

module.exports = seedGameCategories;
