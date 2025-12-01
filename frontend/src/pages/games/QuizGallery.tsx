import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, Play, Clock, Trophy, Info, Shield, Calendar } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { GlassButton } from "@/components/ui/GlassButton";
import { toast } from "sonner";
import { UniverseSelectorModal } from "@/components/games/UniverseSelectorModal";

// Import assets
import { ASSETS } from '@/constants/assets';
const speedPulseCover = ASSETS.IMAGES.SPEED_PULSE_COVER;
const survivalModeCover = ASSETS.IMAGES.SURVIVAL_COVER;
const dailyChallengeCover = ASSETS.IMAGES.DAILY_CHALLENGE_COVER;

const QuizGallery = () => {
    const navigate = useNavigate();
    const [showUniverseSelector, setShowUniverseSelector] = useState(false);
    const [selectedGameMode, setSelectedGameMode] = useState<string | null>(null);

    const handleGameSelect = (modeId: string) => {
        setSelectedGameMode(modeId);
        setShowUniverseSelector(true);
    };

    const handleUniverseSelect = (universeId: string) => {
        setShowUniverseSelector(false);

        if (!selectedGameMode) return;

        let route = "";
        switch (selectedGameMode) {
            case "speed-pulse":
                route = "/games/quiz/speed-pulse";
                break;
            case "survival":
                route = "/games/survival";
                break;
            default:
                return;
        }

        // Add theme parameter if not mixed
        if (universeId !== 'mixed') {
            route += `?theme=${universeId}`;
        }

        navigate(route);
    };

    const quizModes = [
        {
            id: "speed-pulse",
            title: "Speed Pulse",
            description: "Le défi ultime de rapidité ! Réponds avant la fin du chrono.",
            longDescription: "Teste tes réflexes et tes connaissances dans ce mode frénétique. Chaque bonne réponse augmente ton combo et ton score, mais attention au temps !",
            icon: Zap,
            image: speedPulseCover,
            color: "text-indigo-400",
            stats: [
                { label: "Durée", value: "30s", icon: Clock },
                { label: "Difficulté", value: "Moyenne", icon: Trophy },
            ],
            action: () => handleGameSelect("speed-pulse"),
            available: true
        },
        {
            id: "survival",
            title: "Mode Survie",
            description: "Combien de questions pourras-tu enchaîner sans erreur ?",
            longDescription: "Trois erreurs et c'est fini. Grimpe dans le classement en survivant le plus longtemps possible face à des questions de plus en plus dures.",
            icon: Shield,
            image: survivalModeCover,
            color: "text-emerald-400",
            stats: [
                { label: "Vies", value: "3", icon: Trophy },
                { label: "Difficulté", value: "Difficile", icon: Trophy },
            ],
            action: () => handleGameSelect("survival"),
            available: true
        },
        {
            id: "daily",
            title: "Défi Quotidien",
            description: "Un nouveau quiz chaque jour pour gagner des récompenses.",
            longDescription: "Reviens chaque jour pour un quiz unique sur un thème spécifique. Gagne de l'XP bonus et des badges exclusifs.",
            icon: Calendar,
            image: dailyChallengeCover,
            color: "text-amber-400",
            stats: [
                { label: "Questions", value: "10", icon: Clock },
                { label: "Récompense", value: "Bonus XP", icon: Trophy },
            ],
            action: () => toast.info("Reviens demain pour le défi !"),
            available: false
        }
    ];

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto pb-20 px-4">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Galerie de Quiz</h1>
                    <p className="text-white/60 text-lg max-w-2xl">
                        Choisis ton épreuve. Du sprint mental à la survie, prouve que tu es le meilleur.
                    </p>
                </div>

                {/* Quiz Modes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {quizModes.map((mode, index) => (
                        <motion.div
                            key={mode.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full"
                        >
                            {/* Image Section */}
                            <div className="relative h-48 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
                                <img
                                    src={mode.image}
                                    alt={mode.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                />
                                {/* Badge */}
                                <div className="absolute top-4 right-4 z-20">
                                    {mode.available ? (
                                        <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/20 text-green-400 text-xs font-bold backdrop-blur-md">
                                            DISPONIBLE
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/40 text-xs font-bold backdrop-blur-md">
                                            BIENTÔT
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 flex flex-col flex-grow relative z-20 -mt-12">
                                {/* Icon & Title */}
                                <div className="flex items-end gap-4 mb-4">
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center bg-[#0a0a0a] border border-white/10 shadow-lg",
                                        mode.color
                                    )}>
                                        <mode.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                                        {mode.title}
                                    </h3>
                                </div>

                                <p className="text-white/60 text-sm mb-6 leading-relaxed flex-grow">
                                    {mode.description}
                                </p>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {mode.stats.map((stat, i) => (
                                        <div key={i} className="bg-white/5 rounded-xl p-2.5 border border-white/5 flex items-center gap-3">
                                            <div className="p-1.5 rounded-lg bg-white/5 text-white/40">
                                                <stat.icon className="h-3.5 w-3.5" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-white/30 uppercase tracking-wider font-bold">{stat.label}</div>
                                                <div className="text-sm font-medium text-white">{stat.value}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-[1fr,auto] gap-3 mt-auto">
                                    <GlassButton
                                        onClick={mode.action}
                                        variant={mode.available ? "glass-accent" : "glass"}
                                        className={cn(
                                            "w-full font-bold",
                                            !mode.available && "opacity-50 cursor-not-allowed"
                                        )}
                                        disabled={!mode.available}
                                    >
                                        {mode.available ? (
                                            <>
                                                <Play className="h-4 w-4 mr-2 fill-current" />
                                                Jouer
                                            </>
                                        ) : (
                                            "Bientôt"
                                        )}
                                    </GlassButton>

                                    <GlassButton
                                        variant="glass"
                                        size="icon"
                                        onClick={() => toast(mode.title, { description: mode.longDescription })}
                                        className="w-12"
                                    >
                                        <Info className="h-5 w-5" />
                                    </GlassButton>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <UniverseSelectorModal
                    isOpen={showUniverseSelector}
                    onClose={() => setShowUniverseSelector(false)}
                    onSelectUniverse={handleUniverseSelect}
                />
            </div>
        </DashboardLayout>
    );
};

export default QuizGallery;
