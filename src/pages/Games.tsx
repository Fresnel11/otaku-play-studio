import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Gamepad2, Sparkles, Trophy, Users, Brain, Zap, ArrowLeft } from "lucide-react";
import GameCard3D from "@/components/GameCard3D";

// Import assets
import animeQuizCover from "@/assets/games/anime_quiz_cover.png";
import memoryGameCover from "@/assets/games/memory_game_cover.png";
import rankingCover from "@/assets/games/ranking_cover.png";
import battleRoyaleCover from "@/assets/games/battle_royale_cover.png";
import storyModeCover from "@/assets/games/story_mode_cover.png";
import communityCover from "@/assets/games/community_cover.png";

const Games = () => {
    const navigate = useNavigate();

    const games = [
        {
            id: 1,
            title: "Quiz Anime Rapide",
            description: "Teste tes connaissances sur les animes populaires et montre que tu es un vrai otaku !",
            icon: Sparkles,
            image: animeQuizCover,
            color: "pink-500",
            action: () => navigate("/quiz"),
            available: true,
        },
        {
            id: 2,
            title: "Memory Kawaii",
            description: "Trouve les paires de personnages d'anime dans ce jeu de mémoire amusant.",
            icon: Brain,
            image: memoryGameCover,
            color: "cyan-500",
            action: () => alert("Bientôt disponible ! 🎮"),
            available: false,
        },
        {
            id: 3,
            title: "Classement Mondial",
            description: "Compare ton score avec les autres otakus du monde entier !",
            icon: Trophy,
            image: rankingCover,
            color: "yellow-500",
            action: () => alert("Bientôt disponible ! 🏆"),
            available: false,
        },
        {
            id: 4,
            title: "Battle Royale",
            description: "Affronte d'autres joueurs en temps réel dans des quiz épiques !",
            icon: Zap,
            image: battleRoyaleCover,
            color: "red-500",
            action: () => alert("Bientôt disponible ! ⚡"),
            available: false,
        },
        {
            id: 5,
            title: "Mode Histoire",
            description: "Découvre des histoires d'anime à travers des quiz thématiques captivants.",
            icon: Gamepad2,
            image: storyModeCover,
            color: "purple-500",
            action: () => alert("Bientôt disponible ! 📖"),
            available: false,
        },
        {
            id: 6,
            title: "Défi Communautaire",
            description: "Rejoins les défis créés par la communauté et gagne des récompenses exclusives.",
            icon: Users,
            image: communityCover,
            color: "green-500",
            action: () => alert("Bientôt disponible ! 🌟"),
            available: false,
        },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] relative overflow-x-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
                <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-pink-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "4s" }} />
            </div>

            <div className="container mx-auto px-4 py-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-16 text-center"
                >
                    <button
                        onClick={() => navigate("/")}
                        className="absolute left-4 top-12 flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden md:inline">Retour</span>
                    </button>

                    <h1 className="text-6xl md:text-8xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 mb-6 tracking-tight">
                        ARCADE ZONE
                    </h1>
                    <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light">
                        Plonge dans l'univers Otaku. Choisis ton défi.
                    </p>
                </motion.div>

                {/* Games Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {games.map((game, index) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                        >
                            <GameCard3D {...game} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Games;
