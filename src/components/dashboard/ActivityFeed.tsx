import { motion } from "framer-motion";
import { Trophy, Gamepad2, Star, UserPlus } from "lucide-react";

const activities = [
    {
        id: 1,
        type: "achievement",
        title: "Nouveau Badge Débloqué",
        description: "Tu as obtenu le badge 'Otaku Débutant' !",
        time: "Il y a 2 min",
        icon: Trophy,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10 border-yellow-400/20",
    },
    {
        id: 2,
        type: "game",
        title: "Victoire Écrasante",
        description: "Score de 95% sur le Quiz Naruto",
        time: "Il y a 15 min",
        icon: Gamepad2,
        color: "text-indigo-400",
        bg: "bg-indigo-400/10 border-indigo-400/20",
    },
    {
        id: 3,
        type: "social",
        title: "Nouvel Ami",
        description: "Sasuke_99 t'a ajouté en ami",
        time: "Il y a 1h",
        icon: UserPlus,
        color: "text-pink-400",
        bg: "bg-pink-400/10 border-pink-400/20",
    },
    {
        id: 4,
        type: "level",
        title: "Niveau Supérieur",
        description: "Tu es passé niveau 5 !",
        time: "Il y a 3h",
        icon: Star,
        color: "text-purple-400",
        bg: "bg-purple-400/10 border-purple-400/20",
    },
];

const ActivityFeed = () => {
    return (
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6">
            <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                Activité Récente
            </h3>

            <div className="space-y-6">
                {activities.map((activity, index) => (
                    <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 group"
                    >
                        <div className={`relative z-10 flex-none p-3 rounded-xl border ${activity.bg} group-hover:scale-110 transition-transform duration-300`}>
                            <activity.icon className={`h-5 w-5 ${activity.color}`} />
                        </div>

                        <div className="flex-1 min-w-0 pt-1">
                            <div className="flex justify-between items-start mb-1">
                                <p className="text-sm font-bold text-white truncate group-hover:text-indigo-400 transition-colors">
                                    {activity.title}
                                </p>
                                <span className="text-xs text-white/30 whitespace-nowrap">
                                    {activity.time}
                                </span>
                            </div>
                            <p className="text-sm text-white/50 truncate">
                                {activity.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ActivityFeed;
