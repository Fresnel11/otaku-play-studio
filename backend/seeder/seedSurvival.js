const mongoose = require('mongoose');
const Question = require('../models/Question');

const survivalQuestions = [
    // --- JOJO'S BIZARRE ADVENTURE ---
    {
        question: "Quel est le nom du Stand de Jotaro Kujo ?",
        options: ["Star Platinum", "The World", "Crazy Diamond", "Hermit Purple"],
        correctAnswer: 0,
        category: "Jojo's Bizarre Adventure",
        difficulty: "easy"
    },
    {
        question: "Qui est le méchant principal de la partie 1 : Phantom Blood ?",
        options: ["Kars", "Dio Brando", "Diavolo", "Kira Yoshikage"],
        correctAnswer: 1,
        category: "Jojo's Bizarre Adventure",
        difficulty: "easy"
    },
    {
        question: "Quel est le cri de guerre de Dio ?",
        options: ["ORA ORA ORA", "MUDA MUDA MUDA", "DORA RARA", "ARI ARI ARI"],
        correctAnswer: 1,
        category: "Jojo's Bizarre Adventure",
        difficulty: "easy"
    },
    {
        question: "Dans quelle ville se déroule la partie 4 : Diamond is Unbreakable ?",
        options: ["Le Caire", "Naples", "Morioh", "Tokyo"],
        correctAnswer: 2,
        category: "Jojo's Bizarre Adventure",
        difficulty: "medium"
    },
    {
        question: "Quel est le pouvoir de King Crimson ?",
        options: ["Arrêter le temps", "Effacer le temps", "Remonter le temps", "Accélérer le temps"],
        correctAnswer: 1,
        category: "Jojo's Bizarre Adventure",
        difficulty: "hard"
    },

    // --- NEON GENESIS EVANGELION ---
    {
        question: "Qui est le pilote de l'EVA-01 ?",
        options: ["Rei Ayanami", "Asuka Langley", "Shinji Ikari", "Kaworu Nagisa"],
        correctAnswer: 2,
        category: "Evangelion",
        difficulty: "easy"
    },
    {
        question: "Quelle organisation a construit les EVAs ?",
        options: ["SEELE", "NERV", "WILLE", "GEHIRN"],
        correctAnswer: 1,
        category: "Evangelion",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom du premier Ange attaquant Tokyo-3 ?",
        options: ["Ramiel", "Sachiel", "Zeruel", "Israfel"],
        correctAnswer: 1,
        category: "Evangelion",
        difficulty: "hard"
    },
    {
        question: "Quelle est la couleur de l'EVA-02 ?",
        options: ["Violet", "Rouge", "Bleu", "Blanc"],
        correctAnswer: 1,
        category: "Evangelion",
        difficulty: "easy"
    },

    // --- STUDIO GHIBLI ---
    {
        question: "Quel est le nom du voisin totémique de Mei et Satsuki ?",
        options: ["Totoro", "Catbus", "No-Face", "Ponyo"],
        correctAnswer: 0,
        category: "Studio Ghibli",
        difficulty: "easy"
    },
    {
        question: "Dans 'Le Voyage de Chihiro', en quoi les parents de Chihiro sont-ils transformés ?",
        options: ["En crapauds", "En cochons", "En poulets", "En esprits"],
        correctAnswer: 1,
        category: "Studio Ghibli",
        difficulty: "easy"
    },
    {
        question: "Quel est le vrai nom de Haku ?",
        options: ["Nigihayami Kohaku Nushi", "Yubaba", "Kamaji", "Zeniba"],
        correctAnswer: 0,
        category: "Studio Ghibli",
        difficulty: "hard"
    },
    {
        question: "Quel objet Sophie Hatter possède-t-elle au début du film ?",
        options: ["Une boulangerie", "Un magasin de chapeaux", "Une librairie", "Une fleuriste"],
        correctAnswer: 1,
        category: "Studio Ghibli",
        difficulty: "medium"
    },

    // --- ONE PUNCH MAN ---
    {
        question: "Quel est le nom de héros de Saitama ?",
        options: ["Caped Baldy", "One Punch Man", "Demon Cyborg", "Silver Fang"],
        correctAnswer: 0,
        category: "One Punch Man",
        difficulty: "medium"
    },
    {
        question: "Qui est le disciple cyborg de Saitama ?",
        options: ["Genos", "Metal Knight", "Drive Knight", "Child Emperor"],
        correctAnswer: 0,
        category: "One Punch Man",
        difficulty: "easy"
    },
    {
        question: "Quel est le rang de Saitama au début de l'association des héros ?",
        options: ["Classe S", "Classe A", "Classe B", "Classe C"],
        correctAnswer: 3,
        category: "One Punch Man",
        difficulty: "medium"
    },

    // --- CHAINSAW MAN ---
    {
        question: "Quel est le nom du démon-tronçonneuse ?",
        options: ["Pochita", "Denji", "Power", "Makima"],
        correctAnswer: 0,
        category: "Chainsaw Man",
        difficulty: "easy"
    },
    {
        question: "Qui est le chef de la 4ème section spéciale ?",
        options: ["Aki Hayakawa", "Kishibe", "Makima", "Himeno"],
        correctAnswer: 2,
        category: "Chainsaw Man",
        difficulty: "medium"
    },
    {
        question: "Quel démon a passé un contrat avec Aki (au début) ?",
        options: ["Démon Renard", "Démon Futur", "Démon Malédiction", "Démon Flingue"],
        correctAnswer: 0,
        category: "Chainsaw Man",
        difficulty: "medium"
    },

    // --- DEMON SLAYER (More) ---
    {
        question: "Quel est le nom du Pilier de la Flamme ?",
        options: ["Tengen Uzui", "Kyojuro Rengoku", "Muichiro Tokito", "Obanai Iguro"],
        correctAnswer: 1,
        category: "Demon Slayer",
        difficulty: "easy"
    },
    {
        question: "Quel est le numéro de la Lune Supérieure Kokushibo ?",
        options: ["Une", "Deux", "Trois", "Quatre"],
        correctAnswer: 0,
        category: "Demon Slayer",
        difficulty: "hard"
    },

    // --- JUJUTSU KAISEN (More) ---
    {
        question: "Quel est le grade de Yuta Okkotsu ?",
        options: ["Grade 1", "Grade 2", "Classe S (Spécial)", "Grade 4"],
        correctAnswer: 2,
        category: "Jujutsu Kaisen",
        difficulty: "medium"
    },
    {
        question: "Qui a créé les embryons maudits ?",
        options: ["Kenjaku", "Mahito", "Noritoshi Kamo", "Sukuna"],
        correctAnswer: 2,
        category: "Jujutsu Kaisen",
        difficulty: "hard"
    },

    // --- NARUTO (More) ---
    {
        question: "Quel est le nom du démon à 9 queues ?",
        options: ["Shukaku", "Matatabi", "Kurama", "Gyuki"],
        correctAnswer: 2,
        category: "Naruto",
        difficulty: "easy"
    },
    {
        question: "Qui a fondé l'Akatsuki à l'origine ?",
        options: ["Obito", "Yahiko", "Nagato", "Madara"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "hard"
    },

    // --- DRAGON BALL (More) ---
    {
        question: "Quel est le vrai nom de Goku ?",
        options: ["Kakarot", "Broly", "Bardock", "Raditz"],
        correctAnswer: 0,
        category: "Dragon Ball",
        difficulty: "easy"
    },
    {
        question: "Qui tue Cell ?",
        options: ["Goku", "Vegeta", "Gohan", "Trunks"],
        correctAnswer: 2,
        category: "Dragon Ball",
        difficulty: "medium"
    },

    // --- ONE PIECE (More) ---
    {
        question: "Quel fruit du démon a mangé Luffy ?",
        options: ["Mera Mera no Mi", "Gomu Gomu no Mi", "Hito Hito no Mi", "Ope Ope no Mi"],
        correctAnswer: 2, // Trick question: Hito Hito no Mi, Model: Nika (Gomu Gomu is the fake name)
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui est le frère de Luffy et Ace ?",
        options: ["Sabo", "Shanks", "Coby", "Law"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },

    // --- ATTACK ON TITAN (More) ---
    {
        question: "Qui est le Titan Féminin ?",
        options: ["Mikasa Ackerman", "Annie Leonhart", "Sasha Braus", "Ymir"],
        correctAnswer: 1,
        category: "Attack on Titan",
        difficulty: "medium"
    },
    {
        question: "Quel est le vrai nom de Historia Reiss ?",
        options: ["Christa Lenz", "Ymir", "Frieda Reiss", "Carla Yeager"],
        correctAnswer: 0,
        category: "Attack on Titan",
        difficulty: "medium"
    },

    // --- HUNTER X HUNTER (More) ---
    {
        question: "Quel est le nom du jeu vidéo dans l'arc Greed Island ?",
        options: ["Greed Island", "JoyStation", "Hunter Game", "Nen World"],
        correctAnswer: 0,
        category: "Hunter x Hunter",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom de la technique ultime de Netero ?",
        options: ["Jajanken", "Bungee Gum", "Hyakushiki Kannon", "Godspeed"],
        correctAnswer: 2,
        category: "Hunter x Hunter",
        difficulty: "hard"
    },

    // --- BLEACH (More) ---
    {
        question: "Quel est le numéro de l'Espada Ulquiorra Cifer ?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
        category: "Bleach",
        difficulty: "medium"
    },
    {
        question: "Qui est le créateur du Hōgyoku ?",
        options: ["Aizen Sosuke", "Kisuke Urahara", "Mayuri Kurotsuchi", "Yamamoto"],
        correctAnswer: 1,
        category: "Bleach",
        difficulty: "hard"
    },

    // --- FAIRY TAIL ---
    {
        question: "Quel est le type de magie de Natsu ?",
        options: ["Chasseur de Dragon de Feu", "Chasseur de Dieu de Feu", "Chasseur de Démon de Feu", "Mage de Feu"],
        correctAnswer: 0,
        category: "Fairy Tail",
        difficulty: "easy"
    },
    {
        question: "Qui est le maître de la guilde Fairy Tail au début ?",
        options: ["Mavis Vermillion", "Makarov Dreyar", "Gildarts Clive", "Laxus Dreyar"],
        correctAnswer: 1,
        category: "Fairy Tail",
        difficulty: "easy"
    },

    // --- BLACK CLOVER ---
    {
        question: "Quel est le nom de l'épée d'Asta qui annule la magie ?",
        options: ["Demon-Slayer Sword", "Demon-Dweller Sword", "Demon-Destroyer Sword", "Yami's Katana"],
        correctAnswer: 0,
        category: "Black Clover",
        difficulty: "medium"
    },
    {
        question: "Qui est le capitaine de l'Aube d'Or ?",
        options: ["Yami Sukehiro", "William Vangeance", "Nozel Silva", "Fuegoleon Vermillion"],
        correctAnswer: 1,
        category: "Black Clover",
        difficulty: "medium"
    },

    // --- SEVEN DEADLY SINS ---
    {
        question: "Quel est le péché de Meliodas ?",
        options: ["Colère", "Avarice", "Orgueil", "Luxure"],
        correctAnswer: 0,
        category: "Seven Deadly Sins",
        difficulty: "easy"
    },
    {
        question: "Qui est le Lion de l'Orgueil ?",
        options: ["Ban", "King", "Escanor", "Gowther"],
        correctAnswer: 2,
        category: "Seven Deadly Sins",
        difficulty: "easy"
    },

    // --- HAIKYUU!! ---
    {
        question: "Quel est le surnom de Hinata Shoyo ?",
        options: ["Le Roi du Terrain", "Le Petit Géant", "L'Appât Ultime", "Le Grand Roi"],
        correctAnswer: 2, // Trick: Little Giant is his idol, he is the Ultimate Decoy
        category: "Haikyuu!!",
        difficulty: "medium"
    },
    {
        question: "Quel est le poste de Kageyama ?",
        options: ["Attaquant", "Passeur", "Libero", "Bloqueur"],
        correctAnswer: 1,
        category: "Haikyuu!!",
        difficulty: "easy"
    },

    // --- KUROKO NO BASKET ---
    {
        question: "Quelle est la spécialité de Kuroko ?",
        options: ["Tirs à 3 points", "Dunks", "Passes invisibles", "Défense"],
        correctAnswer: 2,
        category: "Kuroko no Basket",
        difficulty: "easy"
    },
    {
        question: "Qui est l'as de la Génération des Miracles ?",
        options: ["Kise Ryota", "Midorima Shintaro", "Aomine Daiki", "Akashi Seijuro"],
        correctAnswer: 2,
        category: "Kuroko no Basket",
        difficulty: "medium"
    },

    // --- BLUE LOCK ---
    {
        question: "Quel est le but du projet Blue Lock ?",
        options: ["Créer le meilleur gardien", "Créer le meilleur attaquant", "Gagner la coupe du monde", "Créer la meilleure équipe"],
        correctAnswer: 1,
        category: "Blue Lock",
        difficulty: "easy"
    },

    // --- SPY X FAMILY ---
    {
        question: "Quel est le nom de code de Loid Forger ?",
        options: ["Twilight", "Dusk", "Nightfall", "Daybreak"],
        correctAnswer: 0,
        category: "Spy x Family",
        difficulty: "easy"
    },
    {
        question: "Quel est le pouvoir d'Anya ?",
        options: ["Prémonition", "Télépathie", "Super force", "Invisibilité"],
        correctAnswer: 1,
        category: "Spy x Family",
        difficulty: "easy"
    },

    // --- TOKYO REVENGERS ---
    {
        question: "Quel est le surnom de Manjiro Sano ?",
        options: ["Draken", "Mikey", "Takemitchy", "Baji"],
        correctAnswer: 1,
        category: "Tokyo Revengers",
        difficulty: "easy"
    },

    // --- DR. STONE ---
    {
        question: "Quelle est la formule préférée de Senku ?",
        options: ["E=mc2", "C'est excitant !", "Eurêka !", "À 10 milliards de pourcent"],
        correctAnswer: 3,
        category: "Dr. Stone",
        difficulty: "easy"
    },

    // --- ASSASSINATION CLASSROOM ---
    {
        question: "Quelle est la vitesse de Koro-sensei ?",
        options: ["Mach 10", "Mach 20", "Vitesse lumière", "Sonique"],
        correctAnswer: 1,
        category: "Assassination Classroom",
        difficulty: "medium"
    },

    // --- GINTAMA ---
    {
        question: "Quel est le métier de Gintoki ?",
        options: ["Samouraï", "Yorozuya (Homme à tout faire)", "Shinsengumi", "Ninja"],
        correctAnswer: 1,
        category: "Gintama",
        difficulty: "medium"
    },

    // --- BERSERK ---
    {
        question: "Quel est le nom de l'épée de Guts ?",
        options: ["Excalibur", "Dragonslayer", "Behelit", "Griffith"],
        correctAnswer: 1,
        category: "Berserk",
        difficulty: "easy"
    },
    {
        question: "Qui est le chef de la Troupe du Faucon ?",
        options: ["Guts", "Casca", "Griffith", "Judeau"],
        correctAnswer: 2,
        category: "Berserk",
        difficulty: "easy"
    }
];

const seedSurvival = async () => {
    try {
        // We append these questions to the existing pool, checking for duplicates based on question text
        let addedCount = 0;

        for (const q of survivalQuestions) {
            const exists = await Question.findOne({ question: q.question });
            if (!exists) {
                await Question.create(q);
                addedCount++;
            }
        }

        console.log(`✅ ${addedCount} new survival questions added successfully!`);
    } catch (error) {
        console.error(`❌ Error seeding survival questions: ${error.message}`);
        throw error;
    }
};

// If run directly from command line
if (require.main === module) {
    const dotenv = require('dotenv');
    const path = require('path');
    dotenv.config({ path: path.join(__dirname, '../.env') });

    mongoose.connect(process.env.MONGO_URI)
        .then(async () => {
            console.log('MongoDB connected');
            await seedSurvival();
            process.exit(0);
        })
        .catch((error) => {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        });
}

module.exports = seedSurvival;
