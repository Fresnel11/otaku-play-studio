import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, RotateCcw, Sword, Zap, Info, XCircle, Heart } from 'lucide-react';
import { GlassButton } from '@/components/ui/GlassButton';
import { cn } from '@/lib/utils';
import { startGame, submitGame } from '../../services/gameService';
import { toast } from 'sonner';

// --- Types ---
type Panel = {
    id: number;
    type: 'action' | 'scene';
    content: string;
    active: boolean;
};

type Target = {
    id: number;
    panelId: number;
    x: number;
    y: number;
    createdAt: number;
    duration: number;
};

const InkClash: React.FC = () => {
    const navigate = useNavigate();
    const [gameState, setGameState] = useState<'intro' | 'tutorial' | 'playing' | 'gameover'>('intro');
    const [score, setScore] = useState(0);
    const [health, setHealth] = useState(100);
    const [combo, setCombo] = useState(0);
    const [level, setLevel] = useState(1);
    const [showMissFeedback, setShowMissFeedback] = useState(false);
    const [showHealFeedback, setShowHealFeedback] = useState(false);

    // Backend Integration
    const [userId, setUserId] = useState<string | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [panels, setPanels] = useState<Panel[]>([
        { id: 1, type: 'scene', content: 'ENEMY_APPROACH', active: true },
        { id: 2, type: 'action', content: 'ATTACK_1', active: false },
        { id: 3, type: 'action', content: 'ATTACK_2', active: false },
        { id: 4, type: 'scene', content: 'FINISH', active: false },
    ]);

    const [targets, setTargets] = useState<Target[]>([]);
    const [particles, setParticles] = useState<{ id: number, x: number, y: number, type: 'hit' | 'miss' | 'heal' }[]>([]);

    // Refs
    const gameStateRef = useRef(gameState);
    const targetsRef = useRef(targets);
    const animationFrameId = useRef<number>();
    const lastSpawnTime = useRef(0);
    const scoreRef = useRef(score);

    useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
    useEffect(() => { targetsRef.current = targets; }, [targets]);
    useEffect(() => { scoreRef.current = score; }, [score]);

    // Auth Check
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (!token || !userStr) {
            toast.error("Connectez-vous pour jouer !");
            navigate('/login');
            return;
        }

        try {
            const user = JSON.parse(userStr);
            setUserId(user._id || user.id);
        } catch (e) {
            navigate('/login');
        }
    }, [navigate]);

    // Update Level based on Score
    useEffect(() => {
        const newLevel = Math.floor(score / 500) + 1;
        if (newLevel !== level) setLevel(newLevel);
    }, [score]);

    // --- Game Loop ---
    useEffect(() => {
        if (gameState !== 'playing') return;

        let lastTime = performance.now();

        const loop = (time: number) => {
            const delta = time - lastTime;
            lastTime = time;

            if (gameStateRef.current !== 'playing') return;

            // Difficulty Logic
            const currentLevel = Math.floor(scoreRef.current / 500) + 1;
            const baseSpawnRate = 1500;
            const spawnRate = Math.max(400, baseSpawnRate - (currentLevel * 100) - (combo * 10));

            const baseDuration = 2000;
            const targetDuration = Math.max(800, baseDuration - (currentLevel * 100));

            if (time - lastSpawnTime.current > spawnRate) {
                const activePanelId = Math.floor(Math.random() * 4) + 1;

                const newTarget: Target = {
                    id: Date.now(),
                    panelId: activePanelId,
                    x: 20 + Math.random() * 60,
                    y: 20 + Math.random() * 60,
                    createdAt: time,
                    duration: targetDuration,
                };

                setTargets(prev => [...prev, newTarget]);
                setPanels(prev => prev.map(p => ({ ...p, active: p.id === activePanelId })));
                lastSpawnTime.current = time;
            }

            // Check Misses
            setTargets(prev => {
                const next = [];
                for (const t of prev) {
                    if (time - t.createdAt > t.duration) {
                        handleMiss(t.x, t.y);
                    } else {
                        next.push(t);
                    }
                }
                return next;
            });

            animationFrameId.current = requestAnimationFrame(loop);
        };

        animationFrameId.current = requestAnimationFrame(loop);
        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [gameState, combo]);

    const handleMiss = (x: number, y: number) => {
        setHealth(h => {
            const newH = h - 15;
            if (newH <= 0) endGame();
            return newH;
        });
        setCombo(0);
        setShowMissFeedback(true);
        setTimeout(() => setShowMissFeedback(false), 200);
    };

    const endGame = async () => {
        setGameState('gameover');
        if (sessionId && userId) {
            setIsSubmitting(true);
            try {
                await submitGame(sessionId, userId, score, []); // No specific answers array for this game type yet
                toast.success("Score enregistré !");
            } catch (error) {
                console.error("Failed to submit score", error);
                toast.error("Erreur lors de l'enregistrement du score.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleHit = (targetId: number, e: React.MouseEvent) => {
        e.stopPropagation();

        setTargets(prev => prev.filter(t => t.id !== targetId));

        const newCombo = combo + 1;
        setCombo(newCombo);
        setScore(s => s + 100 + (newCombo * 10));

        if (newCombo % 5 === 0) {
            setHealth(h => Math.min(100, h + 10));
            setShowHealFeedback(true);
            setTimeout(() => setShowHealFeedback(false), 500);

            const id = Date.now() + 1;
            setParticles(prev => [...prev, { id, x: e.clientX, y: e.clientY, type: 'heal' }]);
            setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 1000);
        }

        const id = Date.now();
        setParticles(prev => [...prev, { id, x: e.clientX, y: e.clientY, type: 'hit' }]);
        setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 1000);
    };

    const handleStartGame = async () => {
        if (!userId) return;

        try {
            // 'ink-clash' must exist in DB
            const session = await startGame(userId, 'ink-clash');
            setSessionId(session.sessionId);

            setGameState('playing');
            setScore(0);
            setHealth(100);
            setCombo(0);
            setLevel(1);
            setTargets([]);
            setParticles([]);
            lastSpawnTime.current = performance.now();
        } catch (error) {
            console.error(error);
            toast.error("Impossible de démarrer la partie.");
        }
    };

    return (
        <div className="min-h-screen bg-[#f0f0f0] text-black font-sans overflow-hidden relative selection:bg-black selection:text-white">
            {/* Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10 z-0"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Feedbacks */}
            <AnimatePresence>
                {showMissFeedback && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-red-600 z-40 pointer-events-none mix-blend-multiply"
                    />
                )}
                {showHealFeedback && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-green-500 z-40 pointer-events-none mix-blend-overlay"
                    />
                )}
            </AnimatePresence>

            {/* UI Header */}
            <div className="absolute top-0 left-0 w-full z-50 p-4 flex justify-between items-start">
                <GlassButton onClick={() => navigate('/games')} size="icon" className="bg-black/5 hover:bg-black/10 text-black border-black/10">
                    <ArrowLeft className="w-6 h-6" />
                </GlassButton>

                <div className="flex flex-col items-end">
                    <div className="text-4xl font-black tracking-tighter italic font-heading">
                        {score.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Niveau {level}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-32 bg-gray-300 rounded-full overflow-hidden border border-black">
                                <motion.div
                                    className="h-full bg-black"
                                    animate={{ width: `${health}%` }}
                                />
                            </div>
                            <Heart className="w-4 h-4 fill-black" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Combo Counter */}
            <AnimatePresence>
                {combo > 1 && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-20 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none"
                    >
                        <span className="text-6xl font-black text-red-600 italic tracking-tighter" style={{ textShadow: '2px 2px 0px black' }}>
                            {combo}
                        </span>
                        <span className="text-sm font-bold tracking-[0.5em] uppercase">Combo</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Screens */}
            {gameState !== 'playing' && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
                    <div className="text-center max-w-lg w-full p-10 border-4 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 relative">

                        {gameState === 'intro' && (
                            <>
                                <h1 className="text-7xl font-black mb-2 tracking-tighter italic uppercase">
                                    Ink Clash
                                </h1>
                                <p className="text-xl font-bold mb-8 bg-black text-white inline-block px-2 transform rotate-1">
                                    THE LIVING MANGA
                                </p>
                                <button
                                    onClick={() => setGameState('tutorial')}
                                    className="w-full py-4 bg-black text-white text-xl font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mb-4"
                                >
                                    Commencer <Sword className="w-5 h-5" />
                                </button>
                            </>
                        )}

                        {gameState === 'tutorial' && (
                            <div className="text-left">
                                <h2 className="text-3xl font-black mb-6 uppercase border-b-4 border-black pb-2">Comment Jouer</h2>

                                <div className="space-y-6 mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center bg-black text-white">
                                            <Zap className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg">CLIQUEZ SUR LES CIBLES</p>
                                            <p className="text-sm text-gray-600">Cliquez sur les cercles avant qu'ils ne disparaissent.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500">
                                            <XCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg">NE RATEZ PAS</p>
                                            <p className="text-sm text-gray-600">Rater une cible fait perdre de la vie.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full border-2 border-green-500 flex items-center justify-center text-green-500">
                                            <Heart className="w-6 h-6 fill-current" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg">COMBO SOIN</p>
                                            <p className="text-sm text-gray-600">Enchaînez 5 combos pour récupérer de la vie !</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleStartGame}
                                    className="w-full py-4 bg-red-600 text-white text-xl font-bold uppercase tracking-widest hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    C'est parti ! <Play className="w-5 h-5" />
                                </button>
                            </div>
                        )}

                        {gameState === 'gameover' && (
                            <div className="mb-8">
                                <p className="text-6xl font-black text-red-600 mb-2 uppercase">DÉFAITE</p>
                                <div className="text-2xl font-mono border-y-2 border-black py-4 my-4">
                                    SCORE: {score}
                                </div>
                                {isSubmitting && <p className="text-sm text-gray-500">Enregistrement du score...</p>}
                                <button
                                    onClick={handleStartGame}
                                    className="w-full py-4 bg-black text-white text-xl font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                >
                                    Rejouer <RotateCcw className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Manga Grid Layout */}
            <div className="w-full h-full p-4 md:p-12 grid grid-cols-2 grid-rows-2 gap-4 max-w-6xl mx-auto h-[100vh]">
                {/* Panels same as before... */}
                <div className={cn(
                    "relative border-4 border-black bg-white overflow-hidden transition-all duration-200",
                    panels[0].active ? "scale-[1.02] shadow-2xl z-10" : "grayscale opacity-80"
                )}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <div className="text-9xl font-black rotate-12">DON!</div>
                    </div>
                    {targets.filter(t => t.panelId === 1).map(t => (
                        <TargetButton key={t.id} target={t} onHit={handleHit} />
                    ))}
                </div>

                <div className={cn(
                    "relative border-4 border-black bg-black overflow-hidden transition-all duration-200",
                    panels[1].active ? "scale-[1.02] shadow-2xl z-10" : "opacity-80"
                )}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 to-black" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 border-4 border-white rounded-full flex items-center justify-center">
                            <div className="w-20 h-20 bg-white rounded-full animate-pulse" />
                        </div>
                    </div>
                    {targets.filter(t => t.panelId === 2).map(t => (
                        <TargetButton key={t.id} target={t} onHit={handleHit} invert />
                    ))}
                </div>

                <div className={cn(
                    "relative border-4 border-black bg-white overflow-hidden transition-all duration-200",
                    panels[2].active ? "scale-[1.02] shadow-2xl z-10" : "grayscale opacity-80"
                )}>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]" />
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,#000_10px,#000_12px)] opacity-10" />
                    {targets.filter(t => t.panelId === 3).map(t => (
                        <TargetButton key={t.id} target={t} onHit={handleHit} />
                    ))}
                </div>

                <div className={cn(
                    "relative border-4 border-black bg-white overflow-hidden transition-all duration-200",
                    panels[3].active ? "scale-[1.02] shadow-2xl z-10" : "grayscale opacity-80"
                )}>
                    <div className="absolute bottom-0 right-0 p-4">
                        <div className="text-6xl font-black italic">BAM!</div>
                    </div>
                    {targets.filter(t => t.panelId === 4).map(t => (
                        <TargetButton key={t.id} target={t} onHit={handleHit} />
                    ))}
                </div>
            </div>

            {/* Global Particles */}
            {particles.map(p => (
                <div
                    key={p.id}
                    className="fixed pointer-events-none z-50"
                    style={{ left: p.x, top: p.y }}
                >
                    {p.type === 'heal' ? (
                        <motion.div
                            initial={{ scale: 0, y: 0 }}
                            animate={{ scale: [1, 1.5], y: -50, opacity: [1, 0] }}
                            className="text-green-500 font-black text-2xl"
                        >
                            +HP
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0, rotate: Math.random() * 360 }}
                            animate={{ scale: [1, 2], opacity: [1, 0] }}
                            transition={{ duration: 0.4 }}
                            className="w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-no-repeat bg-center bg-contain"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50 L40 20 L60 20 Z' fill='black'/%3E%3Cpath d='M50 50 L80 40 L80 60 Z' fill='black'/%3E%3Cpath d='M50 50 L60 80 L40 80 Z' fill='black'/%3E%3Cpath d='M50 50 L20 60 L20 40 Z' fill='black'/%3E%3Ccircle cx='50' cy='50' r='10' fill='red'/%3E%3C/svg%3E")`
                            }}
                        />
                    )}
                </div>
            ))}

        </div>
    );
};

const TargetButton = ({ target, onHit, invert }: { target: Target, onHit: (id: number, e: React.MouseEvent) => void, invert?: boolean }) => {
    return (
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute w-24 h-24 -ml-12 -mt-12 flex items-center justify-center group z-20"
            style={{ left: `${target.x}%`, top: `${target.y}%` }}
            onClick={(e) => onHit(target.id, e)}
        >
            <motion.div
                className={cn(
                    "absolute inset-0 rounded-full border-4",
                    invert ? "border-white" : "border-red-600"
                )}
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: target.duration / 1000 }}
            />

            <div className={cn(
                "w-12 h-12 rounded-full transform transition-transform group-active:scale-90 shadow-xl flex items-center justify-center",
                invert ? "bg-white text-black" : "bg-black text-white"
            )}>
                <Zap className="w-6 h-6 animate-pulse" />
            </div>
        </motion.button>
    );
}

export default InkClash;
