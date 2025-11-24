const narutoQuestions = [
    // --- EASY (15) ---
    {
        question: "Quel est le nom du démon renard à neuf queues ?",
        options: ["Kurama", "Shukaku", "Gyuki", "Matatabi"],
        correctAnswer: 0,
        category: "Naruto",
        difficulty: "easy"
    },
    {
        question: "Qui est le premier Hokage de Konoha ?",
        options: ["Tobirama Senju", "Hiruzen Sarutobi", "Hashirama Senju", "Minato Namikaze"],
        correctAnswer: 2,
        category: "Naruto",
        difficulty: "easy"
    },
    {
        question: "Quel est le clan de Sasuke ?",
        options: ["Hyuga", "Uzumaki", "Uchiha", "Nara"],
        correctAnswer: 2,
        category: "Naruto",
        difficulty: "easy"
    },
    {
        question: "Quelle est la technique signature de Naruto ?",
        options: ["Chidori", "Rasengan", "Amaterasu", "Kirin"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "easy"
    },
    {
        question: "Qui est l'amoureuse de Naruto (à la fin) ?",
        options: ["Sakura Haruno", "Ino Yamanaka", "Hinata Hyuga", "Tenten"],
        correctAnswer: 2,
        category: "Naruto",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom du maître de Naruto qui est un ermite ?",
        options: ["Orochimaru", "Jiraiya", "Tsunade", "Kakashi"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "easy"
    },
    {
        question: "Quel est le village caché du sable ?",
        options: ["Konoha", "Kiri", "Suna", "Kumo"],
        correctAnswer: 2,
        category: "Naruto",
        difficulty: "easy"
    },
    {
        question: "Qui a massacré le clan Uchiha ?",
        options: ["Madara Uchiha", "Obito Uchiha", "Itachi Uchiha", "Sasuke Uchiha"],
        correctAnswer: 2,
        category: "Naruto",
        difficulty: "easy"
    },
    {
        question: "Quel est le rêve de Naruto ?",
        options: ["Devenir riche", "Devenir Hokage", "Tuer Sasuke", "Manger des ramens"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "easy"
    },
    {
        question: "Quelle est la couleur du chakra de Naruto (normalement) ?",
        options: ["Rouge", "Bleu", "Vert", "Jaune"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "easy"
    },
    {
        question: "Qui est le rival de Kakashi ?",
        options: ["Obito Uchiha", "Might Guy", "Asuma Sarutobi", "Yamato"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "easy"
    },
    {
        question: "Quel est le nom de l'organisation criminelle aux manteaux noirs ?",
        options: ["Anbu", "Akatsuki", "Racine", "Hebi"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "easy"
    },
    {
        question: "Qui est le frère de Gaara ?",
        options: ["Kankuro", "Sasori", "Deidara", "Sai"],
        correctAnswer: 0,
        category: "Naruto",
        difficulty: "easy"
    },
    {
        question: "Quel est le plat préféré de Naruto ?",
        options: ["Sushi", "Ramen", "Dango", "Onigiri"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "easy"
    },
    {
        question: "Qui est le Cinquième Hokage ?",
        options: ["Jiraiya", "Kakashi", "Tsunade", "Danzo"],
        correctAnswer: 2,
        category: "Naruto",
        difficulty: "easy"
    },

    // --- MEDIUM (20) ---
    {
        question: "Quel est le nom de l'épée de Zabuza ?",
        options: ["Samehada", "Kubikiribocho", "Hiramekarei", "Kiba"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Qui a créé l'Akatsuki (à l'origine) ?",
        options: ["Madara", "Obito", "Yahiko", "Nagato"],
        correctAnswer: 2,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom de la marionnette utilisée par Kankuro pour piéger ses ennemis ?",
        options: ["Karasu", "Kuroari", "Sansho", "Sasori"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Quel biju possède Killer Bee ?",
        options: ["Matatabi", "Isobu", "Gyuki", "Son Goku"],
        correctAnswer: 2,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Qui a tué Asuma Sarutobi ?",
        options: ["Kakuzu", "Hidan", "Deidara", "Sasori"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom du père de Kakashi ?",
        options: ["Sakumo Hatake", "Minato Namikaze", "Dan Kato", "Fugaku Uchiha"],
        correctAnswer: 0,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Quelle est la nature de chakra principale de Sasuke ?",
        options: ["Feu (Katon)", "Foudre (Raiton)", "Vent (Futon)", "Eau (Suiton)"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Qui est le partenaire de Deidara ?",
        options: ["Hidan", "Sasori", "Kisame", "Itachi"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Comment s'appelle le crapaud invoqué par Naruto ?",
        options: ["Gamabunta", "Gamakichi", "Gamaken", "Fukasaku"],
        correctAnswer: 0,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Quel est le vrai nom de Tobi ?",
        options: ["Madara Uchiha", "Obito Uchiha", "Izuna Uchiha", "Shisui Uchiha"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Qui a enseigné le Rasengan à Naruto ?",
        options: ["Kakashi", "Minato", "Jiraiya", "Iruka"],
        correctAnswer: 2,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Quel est le kekkei genkai de Haku ?",
        options: ["Hyoton (Glace)", "Mokuton (Bois)", "Yoton (Lave)", "Futton (Vapeur)"],
        correctAnswer: 0,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Qui est le chef du village d'Ame (Pluie) ?",
        options: ["Hanzo", "Pain", "Konan", "Yahiko"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Quel est le numéro de l'équipe de Guy ?",
        options: ["Équipe 7", "Équipe 8", "Équipe 10", "Équipe Guy"],
        correctAnswer: 3,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Qui a tué le Troisième Hokage ?",
        options: ["Madara", "Orochimaru", "Sasuke", "Itachi"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom de la technique interdite de Rock Lee ?",
        options: ["Les 8 Portes", "Le Lotus Recto", "Le Lotus Verso", "La Danse de l'Ivre"],
        correctAnswer: 0,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Qui est la mère de Naruto ?",
        options: ["Tsunade", "Kushina Uzumaki", "Mikoto Uchiha", "Rin Nohara"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Quel est le dojutsu de Neji Hyuga ?",
        options: ["Sharingan", "Rinnegan", "Byakugan", "Tenseigan"],
        correctAnswer: 2,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Qui est le créateur du Ninjutsu ?",
        options: ["Hagoromo Otsutsuki", "Kaguya Otsutsuki", "Indra Otsutsuki", "Ashura Otsutsuki"],
        correctAnswer: 0,
        category: "Naruto",
        difficulty: "medium"
    },
    {
        question: "Quel est le nom du chien de Kiba ?",
        options: ["Pakkun", "Akamaru", "Kuromaru", "Bisuke"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "medium"
    },

    // --- HARD (10) ---
    {
        question: "Quel est le nom de l'épée de Kisame ?",
        options: ["Samehada", "Nuibari", "Kabutowari", "Shibuki"],
        correctAnswer: 0,
        category: "Naruto",
        difficulty: "hard"
    },
    {
        question: "Combien de coeurs possède Kakuzu ?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 2,
        category: "Naruto",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom du père de Hiruzen Sarutobi ?",
        options: ["Sasuke Sarutobi", "Asuma Sarutobi", "Konohamaru Sarutobi", "Tobirama Sarutobi"],
        correctAnswer: 0,
        category: "Naruto",
        difficulty: "hard"
    },
    {
        question: "Qui a donné son Sharingan à Kakashi ?",
        options: ["Obito Uchiha", "Rin Nohara", "Minato Namikaze", "Fugaku Uchiha"],
        correctAnswer: 0,
        category: "Naruto",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom de la technique ultime de Deidara ?",
        options: ["C0", "C1", "C3", "C4"],
        correctAnswer: 0,
        category: "Naruto",
        difficulty: "hard"
    },
    {
        question: "Qui est le deuxième Mizukage ?",
        options: ["Yagura", "Gengetsu Hozuki", "Mei Terumi", "Kisame Hoshigaki"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom du démon à 6 queues ?",
        options: ["Saiken", "Kokuo", "Chomei", "Isobu"],
        correctAnswer: 0,
        category: "Naruto",
        difficulty: "hard"
    },
    {
        question: "Qui a tué le Deuxième Hokage ?",
        options: ["Kinkaku et Ginkaku", "Madara Uchiha", "Kakuzu", "Hanzo"],
        correctAnswer: 0,
        category: "Naruto",
        difficulty: "hard"
    },
    {
        question: "Quel est le vrai nom de la technique 'Vol du Dieu de la Foudre' ?",
        options: ["Hiraishin no Jutsu", "Shunshin no Jutsu", "Raiton no Yoroi", "Chidori"],
        correctAnswer: 0,
        category: "Naruto",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom du frère de Madara ?",
        options: ["Izuna", "Tajima", "Kagami", "Shisui"],
        correctAnswer: 0,
        category: "Naruto",
        difficulty: "hard"
    },

    // --- EXPERT (5) ---
    {
        question: "Quel est le groupe sanguin de Kakashi Hatake ?",
        options: ["A", "B", "O", "AB"],
        correctAnswer: 2,
        category: "Naruto",
        difficulty: "hard"
    },
    {
        question: "Quel est le jour de l'anniversaire de Naruto ?",
        options: ["10 Octobre", "23 Juillet", "15 Septembre", "25 Décembre"],
        correctAnswer: 0,
        category: "Naruto",
        difficulty: "hard"
    },
    {
        question: "Combien de portes Rock Lee ouvre-t-il contre Gaara ?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 2,
        category: "Naruto",
        difficulty: "hard"
    },
    {
        question: "Quel est le nom du sceau maudit apposé sur Sasuke ?",
        options: ["Sceau de la Terre", "Sceau du Ciel", "Sceau de l'Oiseau", "Sceau du Dragon"],
        correctAnswer: 1,
        category: "Naruto",
        difficulty: "hard"
    },
    {
        question: "Qui est le chef du clan Hyuga ?",
        options: ["Hiashi", "Hizashi", "Neji", "Hanabi"],
        correctAnswer: 0,
        category: "Naruto",
        difficulty: "hard"
    }
];

module.exports = narutoQuestions;
