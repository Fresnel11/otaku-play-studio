import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Gamepad2, Sparkles, Trophy, Users, Brain, Zap, Play, Lock, Skull, Ghost } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

// Import assets
import { ASSETS } from '@/constants/assets';
const animeQuizCover = ASSETS.IMAGES.ANIME_QUIZ_COVER;
const memoryGameCover = ASSETS.IMAGES.MEMORY_GAME_COVER;
const rankingCover = ASSETS.IMAGES.RANKING_COVER;
const battleRoyaleCover = ASSETS.IMAGES.BATTLE_ROYALE_COVER;
const storyModeCover = ASSETS.IMAGES.STORY_MODE_COVER;
const communityCover = ASSETS.IMAGES.COMMUNITY_COVER;

const Games = () => {
    const navigate = useNavigate();

    const games = [
        {
            id: -2,
            title: "Spirit Mahjong",
            description: "Apaisez les esprits en assemblant les tuiles sacrées dans ce Mahjong mystique.",
            icon: Ghost,
            image: "/assets/games/spirit_mahjong_cover.png",
            color: "from-indigo-900 to-purple-800",
            action: () => navigate("/games/spirit-mahjong"),
            available: true,
            difficulty: "Moyen",
            players: "Solo"
        },
        {
            id: -1,
            title: "Ink Clash",
            description: "Combats de rythme intenses au cœur d'une planche de manga vivante.",
            icon: Zap,
            image: "/assets/games/ink_clash_cover.png",
            color: "from-gray-900 to-gray-600",
            action: () => navigate("/games/ink-clash"),
            available: true,
            difficulty: "Expert",
            players: "Solo"
        },
        {
            id: 1,
            title: "Quiz Anime Rapide",
            description: "Teste tes connaissances sur les animes populaires et montre que tu es un vrai otaku !",
            icon: Sparkles,
            image: animeQuizCover,
            color: "from-pink-500 to-rose-500",
            action: () => navigate("/games/quiz"),
            available: true,
            difficulty: "Facile",
            players: "Solo"
        },
        {
            id: 2,
            title: "Memory Kawaii",
            description: "Trouve les paires de personnages d'anime dans ce jeu de mémoire amusant.",
            icon: Brain,
            image: memoryGameCover,
            color: "from-cyan-500 to-blue-500",
            action: () => navigate("/games/memory"),
            available: true,
            difficulty: "Moyen",
            players: "Solo"
        },
        {
            id: 3,
            title: "Classement Mondial",
            description: "Compare ton score avec les autres otakus du monde entier !",
            icon: Trophy,
            image: rankingCover,
            color: "from-yellow-500 to-amber-500",
            action: () => { },
            available: false,
            difficulty: "Difficile",
            players: "Multi"
        },
        {
            id: 4,
            title: "Battle Royale",
            description: "Affronte d'autres joueurs en temps réel dans des quiz épiques !",
            icon: Zap,
            image: battleRoyaleCover,
            color: "from-red-500 to-orange-500",
            action: () => { },
            available: false,
            difficulty: "Expert",
            players: "Multi"
        },
        {
            id: 5,
            title: "Mode Histoire",
            description: "Découvre des histoires d'anime à travers des quiz thématiques captivants.",
            icon: Gamepad2,
            image: storyModeCover,
            color: "from-purple-500 to-indigo-500",
            action: () => { },
            available: false,
            difficulty: "Variable",
            players: "Solo"
        },
        {
            id: 6,
            title: "Défi Communautaire",
            description: "Rejoins les défis créés par la communauté et gagne des récompenses exclusives.",
            icon: Users,
            image: communityCover,
            color: "from-green-500 to-emerald-500",
            action: () => { },
            available: false,
            difficulty: "Variable",
            players: "Multi"
        },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto pb-20">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Arcade Zone</h1>
                    <p className="text-white/60 text-lg max-w-2xl">
                        Choisis ton défi parmi notre sélection de jeux. Gagne de l'XP, monte en niveau et débloque des récompenses exclusives !
                    </p>
                </div>

                {/* Games Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.map((game, index) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
                            onClick={game.available ? game.action : undefined}
                        >
                            {/* Background Image with Gradient Overlay */}
                            <div className="absolute inset-0">
                                <img
                                    src={game.image}
                                    alt={game.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                {/* Tags */}
                                <div className="flex gap-2 mb-4">
                                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white border border-white/10">
                                        {game.difficulty}
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white border border-white/10">
                                        {game.players}
                                    </span>
                                </div>

                                {/* Title & Description */}
                                <div className="mb-6">
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br text-white shadow-lg",
                                        game.color
                                    )}>
                                        <game.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                                        {game.title}
                                    </h3>
                                    <p className="text-white/60 text-sm line-clamp-2 group-hover:text-white/80 transition-colors">
                                        {game.description}
                                    </p>
                                </div>

                                {/* Action Button */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    {game.available ? (
                                        <button className="flex items-center gap-2 text-white font-medium group/btn">
                                            <span className="bg-white text-black p-2 rounded-full group-hover/btn:scale-110 transition-transform">
                                                <Play className="h-4 w-4 fill-current" />
                                            </span>
                                            <span>Jouer maintenant</span>
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-2 text-white/40 font-medium">
                                            <span className="bg-white/10 p-2 rounded-full">
                                                <Lock className="h-4 w-4" />
                                            </span>
                                            <span>Bientôt disponible</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Hover Border Effect */}
                            <div className="absolute inset-0 border-2 border-white/0 rounded-3xl transition-colors duration-300 group-hover:border-white/20 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Games;
