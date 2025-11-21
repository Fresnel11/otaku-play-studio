const mongoose = require('mongoose');
const Question = require('../models/Question');

const questions = [
    // One Piece
    {
        question: "Qui est le pirate au chapeau de paille ?",
        options: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Sanji"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom du bateau de l'équipage de Luffy ?",
        options: ["Going Merry", "Thousand Sunny", "Red Force", "Moby Dick"],
        correctAnswer: 1,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est le médecin de l'équipage du chapeau de paille ?",
        options: ["Usopp", "Brook", "Tony Tony Chopper", "Franky"],
        correctAnswer: 2,
        category: "One Piece",
        difficulty: "easy"
    },

    // Naruto
    {
        question: "Quel est le nom du village de Naruto ?",
        options: ["Village de Suna", "Village de Konoha", "Village de Kiri", "Village de Kumo"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "easy"
    },
    {
        question: "Qui est le sensei de l'équipe 7 ?",
        options: ["Jiraiya", "Kakashi Hatake", "Iruka", "Asuma"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "easy"
    },
    {
        question: "Quel est le vrai nom de Pain ?",
        options: ["Yahiko", "Nagato", "Konan", "Obito"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "hard"
    },

    // Dragon Ball
    {
        question: "Combien de Dragon Balls faut-il réunir pour invoquer Shenron ?",
        options: ["5", "7", "9", "10"],
        correctAnswer: 1,
        category: "Dragon Ball",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom de la transformation légendaire des Saiyans ?",
        options: ["Kaio-ken", "Super Saiyan", "Ultra Instinct", "Oozaru"],
        correctAnswer: 1,
        category: "Dragon Ball",
        difficulty: "easy"
    },
    {
        question: "Qui est le fils de Vegeta et Bulma ?",
        options: ["Gohan", "Goten", "Trunks", "Bra"],
        correctAnswer: 2,
        category: "Dragon Ball",
        difficulty: "medium"
    },

    // Attack on Titan
    {
        question: "Quel est le nom du titan d'Eren Yeager ?",
        options: ["Titan Colossal", "Titan d'Attaque", "Titan Bestial", "Titan Cuirassé"],
        correctAnswer: 1,
        category: "Attack on Titan",
        difficulty: "medium"
    },
    {
        question: "Qui est le commandant du Bataillon d'Exploration ?",
        options: ["Levi Ackerman", "Erwin Smith", "Hange Zoë", "Dot Pixis"],
        correctAnswer: 1,
        category: "Attack on Titan",
        difficulty: "medium"
    },
    {
        question: "Quel mur extérieur protège l'humanité ?",
        options: ["Mur Maria", "Mur Rose", "Mur Sina", "Mur Sheena"],
        correctAnswer: 0,
        category: "Attack on Titan",
        difficulty: "hard"
    },

    // Death Note
    {
        question: "Quel est le vrai nom de L ?",
        options: ["L Lawliet", "Light Yagami", "Mello", "Near"],
        correctAnswer: 0,
        category: "Death Note",
        difficulty: "medium"
    },
    {
        question: "Qui est le Shinigami qui donne le Death Note à Light ?",
        options: ["Rem", "Ryuk", "Sidoh", "Gelus"],
        correctAnswer: 1,
        category: "Death Note",
        difficulty: "easy"
    },
    {
        question: "Quel est le délai après avoir écrit un nom dans le Death Note ?",
        options: ["10 secondes", "30 secondes", "40 secondes", "1 minute"],
        correctAnswer: 2,
        category: "Death Note",
        difficulty: "hard"
    },

    // My Hero Academia
    {
        question: "Quel est l'Alter d'Izuku Midoriya ?",
        options: ["One For All", "All For One", "Explosion", "Half-Cold Half-Hot"],
        correctAnswer: 0,
        category: "My Hero Academia",
        difficulty: "easy"
    },
    {
        question: "Qui est le héros n°1 au début de la série ?",
        options: ["Endeavor", "Hawks", "All Might", "Best Jeanist"],
        correctAnswer: 2,
        category: "My Hero Academia",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom de classe d'Izuku ?",
        options: ["Classe 1-A", "Classe 1-B", "Classe 2-A", "Classe 3-A"],
        correctAnswer: 0,
        category: "My Hero Academia",
        difficulty: "medium"
    },

    // Demon Slayer
    {
        question: "Quel est le nom de la sœur de Tanjiro ?",
        options: ["Kanao", "Nezuko", "Shinobu", "Mitsuri"],
        correctAnswer: 1,
        category: "Demon Slayer",
        difficulty: "easy"
    },
    {
        question: "Quelle est la respiration principale de Tanjiro ?",
        options: ["Respiration de l'Eau", "Respiration du Feu", "Respiration du Soleil", "Respiration de la Lune"],
        correctAnswer: 0,
        category: "Demon Slayer",
        difficulty: "medium"
    },
    {
        question: "Qui est le pilier du tonnerre ?",
        options: ["Zenitsu Agatsuma", "Gyomei Himejima", "Tengen Uzui", "Sanemi Shinazugawa"],
        correctAnswer: 2,
        category: "Demon Slayer",
        difficulty: "hard"
    },

    // Fullmetal Alchemist
    {
        question: "Quel est le prénom du Fullmetal Alchemist ?",
        options: ["Alphonse", "Edward", "Roy", "Hohenheim"],
        correctAnswer: 1,
        category: "Fullmetal Alchemist",
        difficulty: "easy"
    },
    {
        question: "Que perd Edward lors de la transmutation humaine ?",
        options: ["Un bras et une jambe", "Ses deux bras", "Sa jambe droite", "Son œil"],
        correctAnswer: 0,
        category: "Fullmetal Alchemist",
        difficulty: "medium"
    },
    {
        question: "Quel est le grade de Roy Mustang ?",
        options: ["Général", "Colonel", "Major", "Lieutenant"],
        correctAnswer: 1,
        category: "Fullmetal Alchemist",
        difficulty: "medium"
    },

    // Hunter x Hunter
    {
        question: "Quel est le type de Nen de Gon ?",
        options: ["Renforcement", "Émission", "Manipulation", "Matérialisation"],
        correctAnswer: 0,
        category: "Hunter x Hunter",
        difficulty: "medium"
    },
    {
        question: "Qui est le père de Gon ?",
        options: ["Leorio", "Kurapika", "Ging Freecss", "Kite"],
        correctAnswer: 2,
        category: "Hunter x Hunter",
        difficulty: "easy"
    },
    {
        question: "Quelle famille d'assassins Killua vient-il ?",
        options: ["Famille Kurta", "Famille Zoldyck", "Famille Freecss", "Famille Nostrade"],
        correctAnswer: 1,
        category: "Hunter x Hunter",
        difficulty: "easy"
    },

    // Jujutsu Kaisen
    {
        question: "Quel fléau est scellé dans Yuji Itadori ?",
        options: ["Gojo Satoru", "Sukuna", "Mahito", "Jogo"],
        correctAnswer: 1,
        category: "Jujutsu Kaisen",
        difficulty: "easy"
    },
    {
        question: "Quelle est la technique innée de Megumi Fushiguro ?",
        options: ["Ratio", "Les Dix Ombres", "Infinity", "Idle Transfiguration"],
        correctAnswer: 1,
        category: "Jujutsu Kaisen",
        difficulty: "medium"
    },
    {
        question: "Qui est le professeur principal de la première année ?",
        options: ["Gojo Satoru", "Nanami Kento", "Yaga Masamichi", "Mei Mei"],
        correctAnswer: 0,
        category: "Jujutsu Kaisen",
        difficulty: "easy"
    },

    // Tokyo Ghoul
    {
        question: "Quel est le pseudonyme de Kaneki dans Aogiri ?",
        options: ["Centipede", "Eyepatch", "Black Reaper", "Sasaki"],
        correctAnswer: 0,
        category: "Tokyo Ghoul",
        difficulty: "hard"
    },
    {
        question: "Qui transforme Kaneki en Goule ?",
        options: ["Touka", "Rize", "Tsukiyama", "Amon"],
        correctAnswer: 1,
        category: "Tokyo Ghoul",
        difficulty: "easy"
    },
    {
        question: "Qu'est-ce qu'un Quinque ?",
        options: ["Un type de Goule", "Une arme anti-Goule", "Un café", "Un masque"],
        correctAnswer: 1,
        category: "Tokyo Ghoul",
        difficulty: "medium"
    },

    // Bleach
    {
        question: "Quel est le nom du Zanpakutō d'Ichigo ?",
        options: ["Senbonzakura", "Zangetsu", "Hyorinmaru", "Kyoka Suigetsu"],
        correctAnswer: 1,
        category: "Bleach",
        difficulty: "easy"
    },
    {
        question: "Qui est le capitaine de la 6e division ?",
        options: ["Byakuya Kuchiki", "Kenpachi Zaraki", "Toshiro Hitsugaya", "Shunsui Kyoraku"],
        correctAnswer: 0,
        category: "Bleach",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom du monde des Hollows ?",
        options: ["Soul Society", "Hueco Mundo", "Karakura", "Rukongai"],
        correctAnswer: 1,
        category: "Bleach",
        difficulty: "medium"
    },

    // Code Geass
    {
        question: "Quel pouvoir possède Lelouch ?",
        options: ["Sharingan", "Geass", "Nen", "Stand"],
        correctAnswer: 1,
        category: "Code Geass",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom du robot de Suzaku ?",
        options: ["Guren", "Lancelot", "Tristan", "Mordred"],
        correctAnswer: 1,
        category: "Code Geass",
        difficulty: "medium"
    },
    {
        question: "Qui donne son Geass à Lelouch ?",
        options: ["C.C.", "V.V.", "Marianne", "Charles"],
        correctAnswer: 0,
        category: "Code Geass",
        difficulty: "easy"
    },

    // Sword Art Online
    {
        question: "Quel est le nom du premier jeu où Kirito est piégé ?",
        options: ["ALO", "SAO", "GGO", "UW"],
        correctAnswer: 1,
        category: "Sword Art Online",
        difficulty: "easy"
    },
    {
        question: "Quelle est l'arme principale de Kirito ?",
        options: ["Lance", "Épée", "Arc", "Hache"],
        correctAnswer: 1,
        category: "Sword Art Online",
        difficulty: "easy"
    },
    {
        question: "Combien d'étages a Aincrad ?",
        options: ["50", "75", "100", "120"],
        correctAnswer: 2,
        category: "Sword Art Online",
        difficulty: "medium"
    },

    // Cowboy Bebop
    {
        question: "Quel est le nom du vaisseau de Spike ?",
        options: ["Bebop", "Swordfish II", "Hammerhead", "Redtail"],
        correctAnswer: 1,
        category: "Cowboy Bebop",
        difficulty: "medium"
    },
    {
        question: "Quel animal accompagne Ed ?",
        options: ["Chat", "Chien", "Oiseau", "Hamster"],
        correctAnswer: 1,
        category: "Cowboy Bebop",
        difficulty: "easy"
    },
    {
        question: "Quelle est la phrase culte de Spike ?",
        options: ["See you space cowboy", "Bang", "Whatever happens, happens", "I'm just watching a dream"],
        correctAnswer: 1,
        category: "Cowboy Bebop",
        difficulty: "hard"
    },

    // Steins;Gate
    {
        question: "Quel appareil permet de voyager dans le temps ?",
        options: ["Phone Microwave", "Time Machine", "TARDIS", "DeLorean"],
        correctAnswer: 0,
        category: "Steins;Gate",
        difficulty: "medium"
    },
    {
        question: "Quel est le surnom d'Okabe ?",
        options: ["Mad Scientist", "Hououin Kyouma", "Time Lord", "Professor"],
        correctAnswer: 1,
        category: "Steins;Gate",
        difficulty: "easy"
    },
    {
        question: "Que signifie 'El Psy Kongroo' ?",
        options: ["Code secret", "Phrase sans sens", "Formule scientifique", "Nom d'organisation"],
        correctAnswer: 1,
        category: "Steins;Gate",
        difficulty: "hard"
    },

    // Mob Psycho 100
    {
        question: "Quel est le pouvoir principal de Mob ?",
        options: ["Télékinésie", "Pyrokinésie", "Télépathie", "Super force"],
        correctAnswer: 0,
        category: "Mob Psycho 100",
        difficulty: "easy"
    },
    {
        question: "Qui est le maître de Mob ?",
        options: ["Dimple", "Reigen Arataka", "Teruki", "Ritsu"],
        correctAnswer: 1,
        category: "Mob Psycho 100",
        difficulty: "easy"
    },
    {
        question: "À quel pourcentage Mob devient-il dangereux ?",
        options: ["50%", "75%", "100%", "???%"],
        correctAnswer: 3,
        category: "Mob Psycho 100",
        difficulty: "medium"
    }
];

const seedQuestions = async () => {
    try {
        // Check if questions already exist
        const existingCount = await Question.countDocuments();

        if (existingCount > 0) {
            console.log(`⚠️  Database already contains ${existingCount} questions. Skipping seed.`);
            return;
        }

        // Insert new questions
        await Question.insertMany(questions);
        console.log(`✅ ${questions.length} questions seeded successfully!`);
    } catch (error) {
        console.error(`❌ Error seeding questions: ${error.message}`);
        throw error;
    }
};

// If run directly from command line
if (require.main === module) {
    const dotenv = require('dotenv');
    dotenv.config();

    mongoose.connect(process.env.MONGO_URI)
        .then(async () => {
            console.log('MongoDB connected');
            await seedQuestions();
            process.exit(0);
        })
        .catch((error) => {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        });
}

module.exports = seedQuestions;
