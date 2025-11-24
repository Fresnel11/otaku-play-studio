const onePieceQuestions = [
    // --- EASY (40) ---
    {
        question: "Qui est le capitaine de l'équipage du Chapeau de Paille ?",
        options: ["Zoro", "Luffy", "Sanji", "Usopp"],
        correctAnswer: 1,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel est le rêve de Luffy ?",
        options: ["Devenir le meilleur épéiste", "Trouver All Blue", "Devenir le Roi des Pirates", "Dessiner une carte du monde"],
        correctAnswer: 2,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel fruit du démon Luffy a-t-il mangé ?",
        options: ["Mera Mera no Mi", "Gomu Gomu no Mi", "Hito Hito no Mi", "Yami Yami no Mi"],
        correctAnswer: 1,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Combien d'épées Zoro utilise-t-il ?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 2,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Qui est le cuisinier de l'équipage ?",
        options: ["Luffy", "Sanji", "Chopper", "Franky"],
        correctAnswer: 1,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel est le poste de Nami sur le bateau ?",
        options: ["Cuisinière", "Navigatrice", "Médecin", "Charpentière"],
        correctAnswer: 1,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Qui est le médecin de l'équipage ?",
        options: ["Chopper", "Robin", "Brook", "Usopp"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel animal est Chopper ?",
        options: ["Un chien", "Un raton laveur", "Un renne", "Un ours"],
        correctAnswer: 2,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Qui a donné son chapeau de paille à Luffy ?",
        options: ["Gol D. Roger", "Shanks le Roux", "Barbe Blanche", "Ace"],
        correctAnswer: 1,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom du premier bateau des Mugiwaras ?",
        options: ["Thousand Sunny", "Going Merry", "Moby Dick", "Red Force"],
        correctAnswer: 1,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Qui est le frère de Luffy (mort à Marineford) ?",
        options: ["Sabo", "Ace", "Garp", "Dragon"],
        correctAnswer: 1,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom de l'épéiste aux cheveux verts ?",
        options: ["Sanji", "Zoro", "Franky", "Brook"],
        correctAnswer: 1,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Qui est le squelette musicien ?",
        options: ["Brook", "Franky", "Robin", "Jinbe"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom du cyborg charpentier ?",
        options: ["Franky", "Usopp", "Chopper", "Sanji"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Qui est l'archéologue de l'équipage ?",
        options: ["Nami", "Robin", "Vivi", "Hancock"],
        correctAnswer: 1,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom du trésor ultime ?",
        options: ["One Piece", "All Blue", "Rio Poneglyphe", "Pluton"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Qui est le grand-père de Luffy ?",
        options: ["Sengoku", "Garp", "Rayleigh", "Dragon"],
        correctAnswer: 1,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom du père de Luffy ?",
        options: ["Garp", "Dragon", "Roger", "Shanks"],
        correctAnswer: 1,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quelle est la prime initiale de Luffy ?",
        options: ["30 millions", "100 millions", "300 millions", "1.5 milliard"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Qui est le capitaine de l'équipage de Barbe Blanche ?",
        options: ["Edward Newgate", "Marco", "Ace", "Teach"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel fruit du démon Ace possédait-il ?",
        options: ["Mera Mera no Mi", "Hie Hie no Mi", "Magu Magu no Mi", "Pika Pika no Mi"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Qui est le rival de Zoro (Grand Corsaire) ?",
        options: ["Mihawk", "Crocodile", "Doflamingo", "Kuma"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom de l'île des Hommes-Poissons ?",
        options: ["Arlong Park", "Île des Hommes-Poissons", "Sabaody", "Marineford"],
        correctAnswer: 1,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Qui est le timonier de l'équipage (le dernier à rejoindre) ?",
        options: ["Jinbe", "Carrot", "Yamato", "Vivi"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quelle est la couleur des cheveux de Shanks ?",
        options: ["Noir", "Blond", "Roux", "Bleu"],
        correctAnswer: 2,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Qui a mangé le fruit du bistouri (Ope Ope no Mi) ?",
        options: ["Law", "Kid", "Luffy", "Bege"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom du clown pirate ?",
        options: ["Buggy", "Alvida", "Kuro", "Don Krieg"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Qui est la princesse d'Alabasta ?",
        options: ["Vivi", "Rebecca", "Shirahoshi", "Viola"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom du renne au nez bleu ?",
        options: ["Chopper", "Bepo", "Karoo", "Tyrannosaurus"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Qui utilise des jambes noires pour se battre ?",
        options: ["Sanji", "Zoro", "Luffy", "Usopp"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom de l'organisation secrète du Gouvernement (CP...) ?",
        options: ["CP9", "CP0", "CP5", "CP1"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Qui est le 'Roi des Snipers' ?",
        options: ["Sogeking", "Yasopp", "Van Augur", "Beckman"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom du bateau actuel des Mugiwaras ?",
        options: ["Going Merry", "Thousand Sunny", "Oro Jackson", "Polar Tang"],
        correctAnswer: 1,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Qui est l'Impératrice Pirate ?",
        options: ["Boa Hancock", "Big Mom", "Nami", "Robin"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom de l'île des femmes ?",
        options: ["Amazon Lily", "Kamabakka", "Momoiro", "Rusukaina"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Qui est le frère adoptif de Luffy et Ace (révolutionnaire) ?",
        options: ["Sabo", "Koala", "Hack", "Ivankov"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom de l'épée blanche de Zoro ?",
        options: ["Wado Ichimonji", "Sandai Kitetsu", "Shusui", "Enma"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Qui est le mentor de Luffy pour le Haki ?",
        options: ["Rayleigh", "Garp", "Shanks", "Hyogoro"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom de l'île où Luffy s'est entraîné 2 ans ?",
        options: ["Rusukaina", "Kuraigana", "Momoiro", "Boin"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },
    {
        question: "Qui est le capitaine de l'équipage de Barbe Noire ?",
        options: ["Marshall D. Teach", "Jesus Burgess", "Shiryu", "Van Augur"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "easy"
    },

    // --- MEDIUM (60) ---
    {
        question: "Quel est le nom du sabre noir de Mihawk ?",
        options: ["Yoru", "Shusui", "Enma", "Gryphon"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui a construit le Thousand Sunny ?",
        options: ["Franky", "Iceburg", "Tom", "Galley-La"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom de l'organisation dirigée par Crocodile ?",
        options: ["Baroque Works", "Hydra", "Alabasta Guard", "Sand Storm"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est le père de Sanji ?",
        options: ["Judge Vinsmoke", "Zeff", "Sora", "Yonji"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom du fruit du démon de Robin ?",
        options: ["Hana Hana no Mi", "Gomu Gomu no Mi", "Yomi Yomi no Mi", "Sube Sube no Mi"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui a tué Ace ?",
        options: ["Akainu", "Barbe Noire", "Kizaru", "Aokiji"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le grade de Smoker au début de l'histoire ?",
        options: ["Capitaine", "Colonel", "Vice-Amiral", "Amiral"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom de l'île céleste ?",
        options: ["Skypiea", "Weatheria", "Birka", "Angel Island"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est le 'Dieu' de Skypiea ?",
        options: ["Enel", "Gan Fall", "Wyper", "Ohm"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom du train des mers ?",
        options: ["Puffing Tom", "Rocket Man", "Sea Train", "Water Express"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est le chef du CP9 ?",
        options: ["Spandam", "Rob Lucci", "Kaku", "Jabra"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quelle est la technique ultime de Zoro à 9 sabres ?",
        options: ["Asura", "Sanzen Sekai", "Onigiri", "Tatsumaki"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui a donné le Gomu Gomu no Mi à Luffy (accidentellement) ?",
        options: ["Shanks", "Lucky Roo", "Yasopp", "Ben Beckman"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom du géant gelé par Aokiji à Marineford ?",
        options: ["Oars Jr.", "Dorry", "Brogy", "Hajrudin"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est la mère de Ace ?",
        options: ["Portgas D. Rouge", "Dadan", "Toki", "Sora"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom de l'épée maudite de Zoro (la première) ?",
        options: ["Sandai Kitetsu", "Yubashiri", "Shusui", "Wado Ichimonji"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est le roi de Dressrosa (l'usurpateur) ?",
        options: ["Doflamingo", "Riku", "Kyros", "Diamante"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le pouvoir de Law ?",
        options: ["Opération", "Aimant", "Chambre", "Bistouri"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est le second de l'Armée Révolutionnaire ?",
        options: ["Sabo", "Ivankov", "Kuma", "Koala"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom du bateau de Barbe Blanche ?",
        options: ["Moby Dick", "Oro Jackson", "Red Force", "Queen Mama Chanter"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui a mangé le fruit du tremblement après Barbe Blanche ?",
        options: ["Barbe Noire", "Akainu", "Shiryu", "Burgess"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom de la prison sous-marine ?",
        options: ["Impel Down", "Enies Lobby", "Marineford", "Marie Joie"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est le directeur d'Impel Down (avant l'ellipse) ?",
        options: ["Magellan", "Hannyabal", "Shiryu", "Sadi"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le poison de Magellan ?",
        options: ["Hydre", "Venin", "Acide", "Gaz"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui a sauvé Luffy du poison à Impel Down ?",
        options: ["Ivankov", "Bon Clay", "Inazuma", "Jinbe"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom de l'île des zombies ?",
        options: ["Thriller Bark", "Sabaody", "Punk Hazard", "Zou"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui a volé l'ombre de Luffy ?",
        options: ["Gecko Moria", "Absalom", "Hogback", "Perona"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom du zombie de Luffy ?",
        options: ["Oars", "Ryuma", "Jigoro", "Lola"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est le père de Usopp ?",
        options: ["Yasopp", "Lucky Roo", "Beckman", "Shanks"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom de l'île natale de Nami ?",
        options: ["Cocoyashi", "Syrup", "Shimotsuki", "Orange"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui a tué Belmer (la mère adoptive de Nami) ?",
        options: ["Arlong", "Hody", "Jinbe", "Hatchan"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom du poisson géant qui garde l'entrée de Grand Line ?",
        options: ["Laboon", "Meuh-Meuh", "Kraken", "Roi des Mers"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est le gardien du phare au Cap des Jumeaux ?",
        options: ["Crocus", "Rayleigh", "Tom", "Gan Fall"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom de l'organisation de Wapol ?",
        options: ["Drum Kingdom", "Black Drum", "Tin Plate", "Medical Guard"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui a enseigné la médecine à Chopper ?",
        options: ["Dr. Kureha", "Dr. Hiriluk", "Crocus", "Law"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom du fruit du démon de Chopper ?",
        options: ["Hito Hito no Mi", "Ushi Ushi no Mi", "Inu Inu no Mi", "Tori Tori no Mi"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est le roi des travestis ?",
        options: ["Ivankov", "Bon Clay", "Inazuma", "Sanji"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom de l'île où Sanji a atterri ?",
        options: ["Kamabakka", "Momoiro", "Amazon Lily", "Rusukaina"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est le capitaine de l'équipage du Heart ?",
        options: ["Trafalgar Law", "Bepo", "Jean Bart", "Shachi"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom du sous-marin de Law ?",
        options: ["Polar Tang", "Yellow Submarine", "Heart Beat", "Room"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est le capitaine de l'équipage de Kid ?",
        options: ["Eustass Kid", "Killer", "Heat", "Wire"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le pouvoir de Kid ?",
        options: ["Magnétisme", "Métal", "Explosion", "Son"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est le bras droit de Kid ?",
        options: ["Killer", "Heat", "Wire", "Hawkins"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom de l'amiral de la flotte actuel ?",
        options: ["Akainu", "Sengoku", "Kong", "Kizaru"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est l'amiral aveugle ?",
        options: ["Fujitora", "Ryokugyu", "Kizaru", "Aokiji"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le pouvoir de Fujitora ?",
        options: ["Gravité", "Lumière", "Glace", "Magma"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est le roi de Zo ?",
        options: ["Inuarashi et Nekomamushi", "Pedro", "Carrot", "Wanda"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom de l'éléphant géant qui porte Zo ?",
        options: ["Zunesha", "Momonosuke", "Jack", "Raizo"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui a coupé la jambe de Zeff ?",
        options: ["Lui-même", "Gin", "Krieg", "Sanji"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom du restaurant de Zeff ?",
        options: ["Baratie", "Vinsmoke", "All Blue", "Germa"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est le capitaine de l'équipage de Krieg ?",
        options: ["Don Krieg", "Gin", "Pearl", "Mihawk"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom de l'île où Usopp a grandi ?",
        options: ["Syrup", "Cocoyashi", "Shimotsuki", "Orange"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est l'amie d'enfance de Usopp (la riche héritière) ?",
        options: ["Kaya", "Nami", "Vivi", "Robin"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom du majordome de Kaya (le pirate Kuro) ?",
        options: ["Klahadore", "Jango", "Sham", "Buchi"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui a donné le Vogue Merry aux Mugiwaras ?",
        options: ["Merry", "Kaya", "Usopp", "Kuro"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom de l'île des samouraïs ?",
        options: ["Wano Kuni", "Zou", "Dressrosa", "Punk Hazard"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est le shogun de Wano (l'usurpateur) ?",
        options: ["Orochi", "Kaido", "Oden", "Momonosuke"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom du fils d'Oden ?",
        options: ["Momonosuke", "Hiyori", "Kinemon", "Kanjuro"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Qui est la fille de Kaido ?",
        options: ["Yamato", "Ulti", "Black Maria", "Hiyori"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },
    {
        question: "Quel est le fruit du démon de Kaido ?",
        options: ["Uo Uo no Mi, modèle Seiryu", "Ryu Ryu no Mi", "Hebi Hebi no Mi", "Tokage Tokage no Mi"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "medium"
    },

    // --- HARD (40) ---
    {
        question: "Quel est le nom de l'épée de Shanks ?",
        options: ["Gryphon", "Ace", "Roger", "Red"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui est le créateur des Poneglyphes ?",
        options: ["Le clan Kozuki", "Les D.", "Joy Boy", "Le Gouvernement Mondial"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom de l'arme antique capable de contrôler les Rois des Mers ?",
        options: ["Poséidon", "Pluton", "Uranus", "Jupiter"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui est Poséidon actuellement ?",
        options: ["Shirahoshi", "Vivi", "Robin", "Hancock"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom du navire de Gol D. Roger ?",
        options: ["Oro Jackson", "Moby Dick", "Red Force", "Going Merry"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui a construit l'Oro Jackson ?",
        options: ["Tom", "Franky", "Iceburg", "Clover"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom de l'île où Roger a été exécuté ?",
        options: ["Loguetown", "Raftel", "God Valley", "Marineford"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui était le rival de Roger (le héros de la Marine) ?",
        options: ["Garp", "Sengoku", "Kong", "Tsuru"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom de l'équipage de Rocks ?",
        options: ["L'équipage de Rocks", "Les Pirates de l'Espace", "Les Titans", "Les Anciens"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui faisait partie de l'équipage de Rocks ?",
        options: ["Barbe Blanche, Kaido, Big Mom", "Roger, Rayleigh, Gaban", "Shanks, Buggy, Teach", "Garp, Sengoku, Tsuru"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom de l'incident qui a détruit l'île d'Ohara ?",
        options: ["Buster Call", "Grand Nettoyage", "Jugement Dernier", "Pluie de Feu"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui a sauvé Robin lors du Buster Call d'Ohara ?",
        options: ["Jaguar D. Saul", "Aokiji", "Olvia", "Clover"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom de la mère de Robin ?",
        options: ["Nico Olvia", "Nico Roji", "Nico Clover", "Nico Saul"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui est le chef des scientifiques de la Marine ?",
        options: ["Vegapunk", "Caesar Clown", "Judge", "Queen"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom de l'arme créée par Vegapunk pour remplacer les Corsaires ?",
        options: ["Seraphim", "Pacifista", "PX-0", "SSG"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui est le modèle des Pacifistas originaux ?",
        options: ["Bartholomew Kuma", "Kaido", "King", "Jinbe"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Quel est le vrai nom de Miss All Sunday ?",
        options: ["Nico Robin", "Vivi", "Nami", "Hancock"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui est Mr. 0 ?",
        options: ["Crocodile", "Daz Bones", "Bon Clay", "Galdino"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom de l'épée de Ryuma (donnée à Zoro) ?",
        options: ["Shusui", "Wado Ichimonji", "Enma", "Sandai Kitetsu"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui a volé Shusui à Zoro ?",
        options: ["Gyukimaru", "Kawamatsu", "Kinemon", "Kanjuro"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom du renard d'Onimaru ?",
        options: ["Gyukimaru", "Komachiyo", "Onimaru", "Hachiko"],
        correctAnswer: 2,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui est le traître parmi les Fourreaux Rouges ?",
        options: ["Kanjuro", "Kinemon", "Raizo", "Kiku"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom du fruit du démon de Kanjuro ?",
        options: ["Fude Fude no Mi", "Sumi Sumi no Mi", "E E no Mi", "Gaki Gaki no Mi"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui a tué Oden Kozuki ?",
        options: ["Kaido", "Orochi", "King", "Queen"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Comment Oden est-il mort ?",
        options: ["Bouilli vivant", "Décapité", "Noyé", "Brûlé"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom de l'épée d'Oden donnée à Momonosuke ?",
        options: ["Ame no Habakiri", "Enma", "Wado Ichimonji", "Shusui"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui est le frère de Kiku ?",
        options: ["Izo", "Kinemon", "Denjiro", "Ashura"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Quel est le poste de Izo chez Barbe Blanche ?",
        options: ["Commandant de la 16ème division", "Commandant de la 1ère division", "Médecin", "Cuisinier"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui est le 'Roi des Enfers' ?",
        options: ["Rayleigh", "Zoro", "Hades", "Brook"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Quel est le vrai nom de Franky ?",
        options: ["Cutty Flam", "Iceburg", "Tom", "Franky"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui a appris le karaté des Hommes-Poissons à Koala ?",
        options: ["Hack", "Jinbe", "Arlong", "Fisher Tiger"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui est le capitaine des Pirates du Soleil (premier) ?",
        options: ["Fisher Tiger", "Jinbe", "Arlong", "Hody"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom du navire de Big Mom ?",
        options: ["Queen Mama Chanter", "Moby Dick", "Oro Jackson", "Thousand Sunny"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Combien d'enfants a Big Mom ?",
        options: ["85", "50", "100", "12"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui est le plus fort des Sweet Commanders ?",
        options: ["Katakuri", "Smoothie", "Cracker", "Snack"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Quel est le pouvoir de Katakuri ?",
        options: ["Mochi", "Biscuit", "Jus", "Bonbon"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom du Haki de l'observation avancé ?",
        options: ["Vision du futur", "Voix de toutes choses", "Ryu", "Mantra"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui a blessé l'oeil de Shanks ?",
        options: ["Barbe Noire", "Mihawk", "Kaido", "Roger"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom de l'île où se trouve le One Piece ?",
        options: ["Laugh Tale", "Raftel", "God Valley", "Elbaf"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },
    {
        question: "Qui a renommé Raftel en Laugh Tale ?",
        options: ["Roger", "Joy Boy", "Oden", "Shanks"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "hard"
    },

    // --- EXPERT (10) ---
    {
        question: "Quel est le nom de l'épée de Roger ?",
        options: ["Ace", "Gol", "Roger", "King"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "expert"
    },
    {
        question: "Quel est le grade de Kong ?",
        options: ["Commandant en Chef", "Amiral en Chef", "Amiral", "Gorosei"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "expert"
    },
    {
        question: "Qui est Im ?",
        options: ["Le Roi du Monde", "Un membre du Gorosei", "Une arme antique", "Joy Boy"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "expert"
    },
    {
        question: "Quel est le nom de l'épée du Gorosei chauve ?",
        options: ["Shodai Kitetsu", "Nidai Kitetsu", "Sandai Kitetsu", "Yoru"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "expert"
    },
    {
        question: "Qui a donné le fruit du démon à Yamato ?",
        options: ["Kaido", "Orochi", "Oden", "Ace"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "expert"
    },
    {
        question: "Quel est le nom du fruit de Yamato ?",
        options: ["Inu Inu no Mi, modèle Okuchi no Makami", "Inu Inu no Mi, modèle Loup", "Ryu Ryu no Mi", "Hito Hito no Mi"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "expert"
    },
    {
        question: "Qui est le créateur de la météo-science (Weatheria) ?",
        options: ["Haredas", "Nami", "Vegapunk", "Clover"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "expert"
    },
    {
        question: "Quel est le nom du roi de Prodence (poing royal) ?",
        options: ["Elizabello II", "Riku", "Cobra", "Neptune"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "expert"
    },
    {
        question: "Qui est le capitaine de la 2ème flotte de la Grande Flotte du Chapeau de Paille ?",
        options: ["Bartolomeo", "Cavendish", "Sai", "Ideo"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "expert"
    },
    {
        question: "Quel est le nom du navire de Bartolomeo ?",
        options: ["Going Luffy-senpai", "Barto Club", "Barrier Ship", "Straw Fan"],
        correctAnswer: 0,
        category: "One Piece",
        difficulty: "expert"
    }
];

module.exports = onePieceQuestions;
