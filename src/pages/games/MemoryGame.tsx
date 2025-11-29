import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Sparkles, Trophy, Timer, Zap, Heart } from 'lucide-react';
import { GlassButton } from '@/components/ui/GlassButton';
import { toast } from 'sonner';
import MemoryBoard from '@/components/games/memory/MemoryBoard';
import GameResultScreen from '@/components/games/GameResultScreen';
import logoImage from '@/assets/images/logo.png';

// Backgrounds (using same as SpeedPulse for consistency for now, or placeholders)
import narutoBackground from '@/assets/naruto_universe.jpg';
import multiverseBackground from '@/assets/all_manga.jpg';
import demonSlayerBackground from '@/assets/demon_slayer.jpg';

type GameState = 'intro' | 'playing' | 'finished';
type Universe = 'naruto' | 'demon-slayer' | 'one-piece' | 'dragon-ball' | 'multiverse';
type GameMode = 'speed-rush' | 'survival' | 'zen';

import GlitchText from '@/components/games/GlitchText';

import { startMemoryGame, submitMemoryGame } from '@/services/gameService';

// ... (imports remain the same)

const MemoryGame: React.FC = () => {
    const navigate = useNavigate();
    const [gameState, setGameState] = useState<GameState>('intro');
    const [selectedUniverse, setSelectedUniverse] = useState<Universe>('multiverse');
    const [selectedMode, setSelectedMode] = useState<GameMode>('speed-rush');

    // Game Stats
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(0);
    const [lives, setLives] = useState(5);
    const [isDamaged, setIsDamaged] = useState(false);
    const [showSurvivalIntro, setShowSurvivalIntro] = useState(false);
    const [gameResult, setGameResult] = useState<any>(null); // Type properly later
    const [sessionId, setSessionId] = useState<string | null>(null);

    const universes: { id: Universe; label: string; bg: string }[] = [
        { id: 'naruto', label: 'Naruto', bg: narutoBackground },
        { id: 'demon-slayer', label: 'Demon Slayer', bg: demonSlayerBackground },
        { id: 'one-piece', label: 'One Piece', bg: multiverseBackground }, // Placeholder bg
        { id: 'dragon-ball', label: 'Dragon Ball', bg: multiverseBackground }, // Placeholder bg
        { id: 'multiverse', label: 'Multivers', bg: multiverseBackground },
    ];

    const modes: { id: GameMode; label: string; description: string; icon: any }[] = [
        { id: 'speed-rush', label: 'Speed Rush', description: 'Trouve les paires le plus vite possible !', icon: Zap },
        { id: 'survival', label: 'Survie', description: 'Ne perds pas tes vies !', icon: Trophy },
        { id: 'zen', label: 'Zen', description: 'Détente sans stress.', icon: Sparkles },
    ];

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameState === 'playing' && selectedMode !== 'zen' && !showSurvivalIntro) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameState, selectedMode, showSurvivalIntro]);

    const handleStartGame = async () => {
        try {
            // Start session in backend
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.id) {
                const session = await startMemoryGame(user.id);
                // Store session ID in state or ref if needed, but for now we just start the game
                // Ideally we should store sessionId to submit later. 
                // Let's add a state for sessionId
                setSessionId(session.sessionId);
            }
        } catch (error) {
            console.error('Error starting game:', error);
            // Continue anyway for offline play
        }

        setGameState('playing');
        setScore(0);
        setTimer(0);
        setLives(5); // Reset lives for survival mode

        if (selectedMode === 'survival') {
            setShowSurvivalIntro(true);
            setTimeout(() => {
                setShowSurvivalIntro(false);
            }, 3000);
        }
    };

    const calculateRank = (finalScore: number, time: number, attempts: number, mode: GameMode, success: boolean) => {
        if (!success) return { label: 'F', color: 'text-red-600', shadow: 'shadow-red-500/50' };

        // Zen Mode always gets S for relaxing
        if (mode === 'zen') return { label: 'S', color: 'text-cyan-400', shadow: 'shadow-cyan-500/50' };

        // Survival Mode
        if (mode === 'survival') {
            if (lives === 5) return { label: 'S', color: 'text-yellow-400', shadow: 'shadow-yellow-500/50' };
            if (lives >= 3) return { label: 'A', color: 'text-cyan-400', shadow: 'shadow-cyan-500/50' };
            if (lives >= 1) return { label: 'B', color: 'text-green-400', shadow: 'shadow-green-500/50' };
            return { label: 'C', color: 'text-white', shadow: 'shadow-white/50' };
        }

        // Speed Rush Mode
        // Base thresholds for 8 pairs (16 cards)
        // Perfect attempts = 8
        const perfectAttempts = 8;

        if (time < 45 && attempts <= perfectAttempts + 2) return { label: 'S', color: 'text-yellow-400', shadow: 'shadow-yellow-500/50' };
        if (time < 60 && attempts <= perfectAttempts + 4) return { label: 'A', color: 'text-cyan-400', shadow: 'shadow-cyan-500/50' };
        if (time < 90 || attempts <= perfectAttempts + 6) return { label: 'B', color: 'text-green-400', shadow: 'shadow-green-500/50' };
        if (time < 120) return { label: 'C', color: 'text-white', shadow: 'shadow-white/50' };
        return { label: 'D', color: 'text-gray-400', shadow: 'shadow-gray-500/50' };
    };

    const handleGameFinish = async (result: any) => {
        // Calculate final score based on time and mode
        let finalScore = result.score;
        if (selectedMode === 'speed-rush') {
            const timeBonus = Math.max(0, 1000 - timer * 10); // Simple bonus
            finalScore += timeBonus;
        }

        const rank = calculateRank(finalScore, timer, result.attempts, selectedMode, result.success);
        let xpEarned = 0;

        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.id && sessionId) {
                const submitResult = await submitMemoryGame(sessionId, user.id, {
                    score: finalScore,
                    timeTaken: timer,
                    attempts: result.attempts,
                    pairsFound: result.success ? (selectedMode === 'speed-rush' ? 8 : 6) : 0, // Approximate
                    success: result.success
                });
                xpEarned = submitResult.xpEarned;

                // Update local user data if level changed
                // This is simplified, ideally we fetch updated user profile
            }
        } catch (error) {
            console.error('Error submitting game:', error);
        }

        setGameResult({ ...result, finalScore, time: timer, rank, xpEarned });
        setGameState('finished');
    };

    const handleMistake = (attempts: number) => {
        if (selectedMode !== 'survival') return;

        // Damage Animation
        setIsDamaged(true);
        setTimeout(() => setIsDamaged(false), 300);

        setLives(prev => {
            const newLives = prev - 1;
            if (newLives <= 0) {
                handleGameFinish({ score: score, attempts: attempts, success: false }); // Game Over
            }
            return newLives;
        });
    };

    const getBackground = () => {
        const universe = universes.find(u => u.id === selectedUniverse);
        return universe ? universe.bg : multiverseBackground;
    };

    if (gameState === 'intro') {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
                {/* Background with overlay */}
                <div className="absolute inset-0 z-0">
                    <img src={getBackground()} alt="Background" className="w-full h-full object-cover opacity-30 transition-opacity duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/60 to-[#0a0a0a]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                    <div className="space-y-6">
                        <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <Brain className="w-10 h-10 text-cyan-400" />
                        </div>
                        <h1 className="text-5xl font-bold text-white font-heading">
                            Memory <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Kawaii</span>
                        </h1>
                        <p className="text-white/60 text-lg">
                            Exerce ta mémoire avec tes héros préférés. Choisis ton univers et ton mode de jeu !
                        </p>



                        <div className="space-y-4">
                            <h3 className="text-white font-semibold flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-yellow-400" /> Mode de jeu
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {modes.map((mode) => (
                                    <button
                                        key={mode.id}
                                        onClick={() => setSelectedMode(mode.id)}
                                        className={`p-4 rounded-xl border text-left transition-all flex items-center gap-4 ${selectedMode === mode.id
                                            ? 'bg-cyan-500/10 border-cyan-500/50 text-white'
                                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-lg ${selectedMode === mode.id ? 'bg-cyan-500 text-white' : 'bg-white/10'}`}>
                                            <mode.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-bold">{mode.label}</div>
                                            <div className="text-xs opacity-70">{mode.description}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 flex gap-4">
                            <GlassButton onClick={handleStartGame} size="lg" className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white border-none">
                                Commencer
                            </GlassButton>
                            <button onClick={() => navigate('/games')} className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors">
                                Retour
                            </button>
                        </div>
                    </div>

                    {/* Preview / Mascot Area */}
                    <div className="hidden md:flex items-center justify-center">
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative"
                        >
                            <div className="w-64 h-96 rounded-3xl overflow-hidden shadow-2xl group relative">
                                <img
                                    src={logoImage}
                                    alt="Otaku Play Studio"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="text-white font-bold text-xl mb-1">Prêt ?</div>
                                    <div className="text-white/60 text-sm">Fais chauffer tes neurones !</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (gameState === 'playing') {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col relative overflow-hidden">
                {/* Survival Intro Animation */}
                <AnimatePresence>
                    {showSurvivalIntro && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2 }}
                            className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center pointer-events-none"
                        >
                            <div className="text-center">
                                <motion.h1
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-900 tracking-tighter drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                                >
                                    WAVE 1
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-white/50 text-xl uppercase tracking-[1em] mt-4"
                                >
                                    SURVIVAL MODE
                                </motion.p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Damage Overlay */}
                <AnimatePresence>
                    {isDamaged && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 bg-red-500/30 pointer-events-none"
                        />
                    )}
                </AnimatePresence>

                {/* Background */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img src={getBackground()} alt="Background" className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-[#0a0a0a]/60" />
                </div>

                {/* Header */}
                <div className="relative z-10 p-4 flex justify-between items-center max-w-7xl mx-auto w-full">
                    <button onClick={() => setGameState('intro')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-8">
                        {selectedMode === 'survival' && (
                            <div className="flex flex-col items-center">
                                <span className="text-white/40 text-xs uppercase font-bold">Vies</span>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Heart
                                            key={i}
                                            className={`w-6 h-6 transition-all duration-300 ${i < lives ? 'text-red-500 fill-red-500' : 'text-white/20'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col items-center">
                            <span className="text-white/40 text-xs uppercase font-bold">Score</span>
                            <span className="text-2xl font-bold text-white font-heading">{score}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-white/40 text-xs uppercase font-bold">Temps</span>
                            <span className="text-2xl font-bold text-cyan-400 font-heading flex items-center gap-2">
                                <Timer className="w-5 h-5" /> {timer}s
                            </span>
                        </div>
                    </div>

                    <div className="w-10" /> {/* Spacer */}
                </div>

                {/* Game Board */}
                <div className={`flex-1 flex items-center justify-center p-4 relative z-10 transition-transform duration-100 ${isDamaged ? 'translate-x-[-5px]' : ''}`}>
                    <MemoryBoard
                        universe={selectedUniverse}
                        mode={selectedMode}
                        onScoreUpdate={(points) => setScore(prev => prev + points)}
                        onGameFinish={handleGameFinish}
                        onMistake={handleMistake}
                    />
                </div>
            </div>
        );
    }

    if (gameState === 'finished') {
        return (
            <GameResultScreen
                score={gameResult?.finalScore || 0}
                rank={gameResult?.rank || { label: '-', color: 'text-white', shadow: 'shadow-white/50' }}
                stats={[
                    { label: 'Temps', value: `${gameResult?.time || 0}s`, icon: <Timer className="w-4 h-4" />, color: 'text-cyan-400' },
                    { label: 'Score', value: `${gameResult?.finalScore || 0}`, icon: <Trophy className="w-4 h-4" />, color: 'text-yellow-400' },
                    { label: 'Essais', value: `${gameResult?.attempts || 0}`, icon: <Brain className="w-4 h-4" />, color: 'text-purple-400' },
                    { label: 'XP', value: `+${gameResult?.xpEarned || 0}`, icon: <Sparkles className="w-4 h-4" />, color: 'text-green-400' }
                ]}
                onReplay={() => setGameState('intro')}
                onQuit={() => navigate('/games')}
            />
        );
    }

    return null; // Should not reach here
};

export default MemoryGame;
