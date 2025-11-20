import { motion } from "framer-motion";
import { Trophy, Medal, Crown, Search, Filter } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import mascotLeaderboard from "@/assets/mascot_leaderboard.png";

const leaderboardData = [
    { rank: 1, name: "MasterOtaku", level: 42, score: 15420, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Master", winRate: "85%" },
    { rank: 2, name: "Sasuke_99", level: 38, score: 12350, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sasuke", winRate: "78%" },
    { rank: 3, name: "SakuraChan", level: 35, score: 11200, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sakura", winRate: "72%" },
    { rank: 4, name: "KakashiSensei", level: 30, score: 9800, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kakashi", winRate: "65%" },
    { rank: 5, name: "SuperOtaku", level: 5, score: 2400, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", winRate: "66%", isUser: true },
    { rank: 6, name: "NatsuDragneel", level: 28, score: 8500, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Natsu", winRate: "60%" },
    { rank: 7, name: "LuffyPirate", level: 25, score: 7200, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luffy", winRate: "55%" },
    { rank: 8, name: "ZoroSwordsman", level: 24, score: 6900, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoro", winRate: "58%" },
];

const PodiumStep = ({ player, delay }: { player: any, delay: number }) => {
    const isFirst = player.rank === 1;
    const isSecond = player.rank === 2;
    const isThird = player.rank === 3;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6, type: "spring" }}
            className={cn(
                "flex flex-col items-center justify-end relative",
                isFirst ? "order-2 -mt-12 z-20" : "",
                isSecond ? "order-1 z-10" : "",
                isThird ? "order-3 z-10" : ""
            )}
        >
            <div className="relative mb-4">
                {isFirst && (
                    <Crown className="absolute -top-8 left-1/2 -translate-x-1/2 h-10 w-10 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)] z-30" />
                )}
                <div className={cn(
                    "w-20 h-20 md:w-24 md:h-24 rounded-full border-4 overflow-hidden shadow-xl relative z-10 bg-[#0a0a0a]",
                    isFirst ? "border-yellow-400 shadow-yellow-400/50" : "",
                    isSecond ? "border-slate-300 shadow-slate-300/50" : "",
                    isThird ? "border-amber-600 shadow-amber-600/50" : ""
                )}>
                    <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                </div>
                <div className={cn(
                    "absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 z-20",
                    isFirst ? "bg-yellow-400 border-yellow-200 text-black" : "",
                    isSecond ? "bg-slate-300 border-slate-100 text-black" : "",
                    isThird ? "bg-amber-600 border-amber-400 text-white" : ""
                )}>
                    {player.rank}
                </div>
            </div>

            <div className="text-center mb-2">
                <h3 className="font-bold text-white text-lg md:text-xl">{player.name}</h3>
                <p className="text-white/60 text-sm">{player.score.toLocaleString()} pts</p>
            </div>

            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: delay + 0.2, duration: 1.5, ease: "easeOut" }}
                style={{ originY: 1 }}
                className={cn(
                    "w-full rounded-t-2xl backdrop-blur-md border-t border-x border-white/10",
                    isFirst ? "h-48 md:h-64 bg-gradient-to-b from-yellow-400/20 to-transparent" : "",
                    isSecond ? "h-32 md:h-40 bg-gradient-to-b from-slate-300/20 to-transparent" : "",
                    isThird ? "h-24 md:h-32 bg-gradient-to-b from-amber-600/20 to-transparent" : ""
                )}
            />
        </motion.div>
    );
};

const Leaderboard = () => {
    const top3 = leaderboardData.slice(0, 3);
    const rest = leaderboardData.slice(3);

    return (
        <DashboardLayout>
            {/* Background Mascot */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
                <img src={mascotLeaderboard} alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-heading font-bold text-white mb-2 flex items-center gap-3">
                            <Trophy className="h-10 w-10 text-yellow-400" />
                            Classement
                        </h1>
                        <p className="text-white/60">Les meilleurs joueurs de la saison</p>
                    </div>

                    <div className="flex w-full md:w-auto gap-4">
                        <div className="relative flex-1 md:flex-none">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="w-full md:w-64 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
                            />
                        </div>
                        <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all">
                            <Filter className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Podium Section */}
                <div className="flex justify-center items-end gap-4 md:gap-12 mb-16 px-4 min-h-[400px]">
                    {top3.map((player, index) => (
                        <PodiumStep key={player.rank} player={player} delay={index * 0.2} />
                    ))}
                </div>

                {/* List Section */}
                <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/5 text-sm font-medium text-white/40 uppercase tracking-wider">
                        <div className="col-span-2 md:col-span-1 text-center">Rang</div>
                        <div className="col-span-6 md:col-span-5">Joueur</div>
                        <div className="col-span-2 md:col-span-2 text-center hidden md:block">Niveau</div>
                        <div className="col-span-2 md:col-span-2 text-center hidden md:block">Win Rate</div>
                        <div className="col-span-4 md:col-span-2 text-right">Score</div>
                    </div>

                    <div className="divide-y divide-white/5">
                        {rest.map((player, index) => (
                            <motion.div
                                key={player.rank}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.05 }}
                                className={cn(
                                    "grid grid-cols-12 gap-4 p-6 items-center hover:bg-white/5 transition-colors cursor-pointer group",
                                    player.isUser ? "bg-white/10 border-l-4 border-indigo-500" : ""
                                )}
                            >
                                <div className="col-span-2 md:col-span-1 text-center font-bold text-white/60 group-hover:text-white">
                                    #{player.rank}
                                </div>
                                <div className="col-span-6 md:col-span-5 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 border border-white/10">
                                        <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className={cn(
                                        "font-medium text-white text-lg",
                                        player.isUser ? "text-indigo-400" : ""
                                    )}>
                                        {player.name} {player.isUser && <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full ml-2">Moi</span>}
                                    </span>
                                </div>
                                <div className="col-span-2 md:col-span-2 text-center text-white/60 hidden md:block">
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5">Lvl {player.level}</span>
                                </div>
                                <div className="col-span-2 md:col-span-2 text-center text-white/60 hidden md:block">
                                    {player.winRate}
                                </div>
                                <div className="col-span-4 md:col-span-2 text-right font-bold text-white text-lg">
                                    {player.score.toLocaleString()}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Leaderboard;
