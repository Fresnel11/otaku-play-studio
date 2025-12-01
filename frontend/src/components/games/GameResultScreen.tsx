import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Home, Share2, Star } from 'lucide-react';
import { GlassButton } from '@/components/ui/GlassButton';
import { cn } from '@/lib/utils';

export interface GameStat {
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    color?: string;
}

export interface GameResultScreenProps {
    score: number;
    rank: {
        label: string;
        color: string;
        shadow: string;
    };
    stats: GameStat[];
    onReplay: () => void;
    onQuit: () => void;
    title?: string;
}

const GameResultScreen: React.FC<GameResultScreenProps> = ({
    score,
    rank,
    stats,
    onReplay,
    onQuit,
    title = "Partie Terminée"
}) => {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-3 sm:p-4 lg:p-6 relative overflow-hidden font-sans z-50">
            {/* Subtle Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
            </div>

            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="w-full max-w-sm sm:max-w-2xl lg:max-w-5xl relative z-10"
            >
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl overflow-hidden relative">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center relative z-10">

                        {/* Left Column: Rank & Score (5 cols) */}
                        <div className="lg:col-span-5 text-center lg:text-left flex flex-col items-center lg:items-start relative">

                            {/* Title */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="mb-4 sm:mb-6 lg:mb-8 flex items-center gap-2 sm:gap-3"
                            >
                                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/5 border border-white/10">
                                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                                </div>
                                <span className="text-white/60 text-xs sm:text-sm font-medium uppercase tracking-widest">
                                    {title}
                                </span>
                            </motion.div>

                            {/* Rank Display */}
                            <div className="relative mb-6 sm:mb-8 lg:mb-12 flex flex-col items-center lg:items-start">
                                <motion.div
                                    initial={{ scale: 0, rotate: -10 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
                                    className={cn(
                                        "text-6xl sm:text-8xl lg:text-[10rem] leading-none font-bold select-none",
                                        rank.color
                                    )}
                                    style={{ textShadow: `0 0 40px ${rank.color.replace('text-', 'var(--tw-colors-')}` }}
                                >
                                    {rank.label}
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-1 sm:mt-2 px-3 sm:px-4 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs font-bold tracking-[0.2em]"
                                >
                                    RANK
                                </motion.div>
                            </div>

                            {/* Total Score */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="relative"
                            >
                                <div className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-1 sm:mb-2 tracking-tight tabular-nums">
                                    {score.toLocaleString()}
                                </div>
                                <div className="text-white/40 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
                                    Score Total
                                </div>
                            </motion.div>
                        </div>

                        {/* Divider */}
                        <div className="lg:hidden w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />
                        <div className="hidden lg:block lg:col-span-1 h-64 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent mx-auto" />

                        {/* Right Column: Stats & Actions (6 cols) */}
                        <div className="lg:col-span-6 w-full flex flex-col justify-center h-full">

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-10">
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 + (index * 0.1) }}
                                        className="bg-white/5 hover:bg-white/[0.07] transition-colors rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 border border-white/5 group"
                                    >
                                        <div className="flex items-center gap-2 sm:gap-3 text-white/60 text-xs sm:text-sm mb-1 sm:mb-2">
                                            {stat.icon && <span className={cn("transition-colors text-xs sm:text-sm", stat.color)}>{stat.icon}</span>}
                                            <span className="uppercase tracking-wide text-xs font-semibold truncate">{stat.label}</span>
                                        </div>
                                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:scale-105 transition-transform origin-left">
                                            {stat.value}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Actions */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                            >
                                <GlassButton
                                    onClick={onReplay}
                                    variant="glass-accent"
                                    className="flex-1 h-12 sm:h-14 lg:h-16 text-sm sm:text-base lg:text-lg font-bold group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative flex items-center justify-center gap-1.5 sm:gap-2">
                                        <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-500" /> 
                                        <span className="hidden sm:inline">Rejouer</span>
                                        <span className="sm:hidden">Rejouer</span>
                                    </span>
                                </GlassButton>

                                <GlassButton
                                    onClick={onQuit}
                                    variant="glass"
                                    className="flex-1 h-12 sm:h-14 lg:h-16 text-sm sm:text-base lg:text-lg font-bold group"
                                >
                                    <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                                        <Home className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-1 transition-transform" /> 
                                        <span className="hidden sm:inline">Quitter</span>
                                        <span className="sm:hidden">Quitter</span>
                                    </span>
                                </GlassButton>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default GameResultScreen;
