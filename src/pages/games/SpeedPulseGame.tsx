import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { startGame, submitGame, Question, GameResult } from '../../services/gameService';
import PulseTimer from '../../components/games/PulseTimer';
import { Zap, Trophy, Timer, ArrowLeft, Sparkles, Flame, Target, RotateCcw, Share2 } from 'lucide-react';
import { GlassButton } from '@/components/ui/GlassButton';
import { cn } from '@/lib/utils';
import GameResultScreen from '@/components/games/GameResultScreen';
import GlitchText from '@/components/games/GlitchText';
import { toast } from 'sonner';
import narutoBackground from '@/assets/naruto_universe.jpg';
import multiverseBackground from '@/assets/all_manga.jpg';

const SpeedPulseGame: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const theme = searchParams.get('theme');

    const [gameState, setGameState] = useState<'intro' | 'playing' | 'finished'>('intro');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [sessionId, setSessionId] = useState<string | null>(null);

    // Game Stats
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [isOverdrive, setIsOverdrive] = useState(false);
    const [answers, setAnswers] = useState<{ questionId: string; userAnswer: number; responseTime: number }[]>([]);
    const [gameResult, setGameResult] = useState<GameResult | null>(null);

    // Round State
    const [isQuestionVisible, setIsQuestionVisible] = useState(false);
    const [roundStartTime, setRoundStartTime] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [isTimerActive, setIsTimerActive] = useState(false);

    // User Info
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        // Auth Check
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (!token || !userStr) {
            toast.error("Tu dois être connecté pour jouer !");
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

    // Start game only when userId is set
    useEffect(() => {
        if (userId && gameState === 'intro') {
            // Wait for user interaction or auto-start? 
            // Let's keep intro state until user clicks "Start"
        }
    }, [userId]);

    const handleStartGame = async () => {
        if (!userId) return;

        try {
            const session = await startGame(userId, theme || undefined);
            setQuestions(session.questions);
            setSessionId(session.sessionId);
            setGameState('playing');
            startRound();
        } catch (error) {
            toast.error("Impossible de lancer la partie. Vérifie ta connexion.");
            console.error(error);
        }
    };

    const startRound = () => {
        setIsQuestionVisible(false);
        setIsTimerActive(false);
        setSelectedAnswer(null);
        setShowFeedback(null);

        // Smooth fade in
        setTimeout(() => {
            setIsQuestionVisible(true);
            // Wait for Glitch effect (800ms) before starting timer
            setTimeout(() => {
                setIsTimerActive(true);
                setRoundStartTime(Date.now());
            }, 800);
        }, 500);
    };

    const handleAnswer = (index: number) => {
        if (selectedAnswer !== null || !isQuestionVisible) return;

        const responseTime = Date.now() - roundStartTime;
        setSelectedAnswer(index);

        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = index === currentQuestion.correctAnswer;

        // Immediate Feedback Logic
        if (isCorrect) {
            setShowFeedback('correct');
            const newCombo = combo + 1;
            setCombo(newCombo);
            setMaxCombo(Math.max(maxCombo, newCombo));

            let points = 100;
            if (responseTime < 2000) points += 50;

            // Overdrive Logic
            if (newCombo >= 5) {
                setIsOverdrive(true);
                points *= 2;
            }

            // Combo Multiplier
            const multiplier = 1 + Math.min(newCombo * 0.2, 1);
            setScore(prev => prev + Math.round(points * multiplier));

        } else {
            setShowFeedback('wrong');
            setCombo(0);
            setIsOverdrive(false);
        }

        // Record Answer
        const newAnswer = {
            questionId: currentQuestion._id,
            userAnswer: index,
            responseTime
        };

        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);

        // Next Round Delay
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                startRound();
            } else {
                finishGame(updatedAnswers);
            }
        }, 1500);
    };

    const handleTimeout = () => {
        // Guard: only process if timer is active and no answer selected
        if (selectedAnswer !== null || !isTimerActive) return;

        // Stop timer immediately to prevent multiple calls
        setIsTimerActive(false);
        setShowFeedback('wrong');
        setCombo(0);
        setIsOverdrive(false);

        const currentQuestion = questions[currentQuestionIndex];

        if (!currentQuestion) {
            console.error("Current question is undefined in handleTimeout");
            return;
        }

        const newAnswer = {
            questionId: currentQuestion._id,
            userAnswer: -1, // Timeout
            responseTime: 10000
        };

        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                startRound();
            } else {
                finishGame(updatedAnswers);
            }
        }, 1500);
    };

    const finishGame = async (finalAnswers?: typeof answers) => {
        setGameState('finished');
        if (!sessionId || !userId) return;

        const answersToSubmit = finalAnswers || answers;

        try {
            setTimeout(async () => {
                const result = await submitGame(sessionId, userId, answersToSubmit);
                setGameResult(result);
            }, 100);
        } catch (error) {
            toast.error("Erreur lors de l'envoi des résultats");
            console.error("Error submitting game:", error);
        }
    };

    // Helper to calculate Rank
    const getRank = (score: number, totalQuestions: number, correctAnswers: number) => {
        const accuracy = (correctAnswers / totalQuestions) * 100;
        if (accuracy === 100) return { label: 'S', color: 'text-yellow-400', shadow: 'shadow-yellow-500/50' };
        if (accuracy >= 80) return { label: 'A', color: 'text-purple-400', shadow: 'shadow-purple-500/50' };
        if (accuracy >= 60) return { label: 'B', color: 'text-blue-400', shadow: 'shadow-blue-500/50' };
        return { label: 'C', color: 'text-gray-400', shadow: 'shadow-gray-500/50' };
    };

    if (gameState === 'intro') {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 overflow-hidden relative">
                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
                </div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] p-12 rounded-3xl max-w-lg w-full text-center shadow-2xl relative z-10"
                >
                    <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 shadow-inner">
                        <Zap className="w-12 h-12 text-yellow-400 fill-yellow-400/20" />
                    </div>

                    <h1 className="text-5xl font-heading font-bold text-white mb-4 tracking-tight">
                        SpeedPulse
                    </h1>
                    <p className="text-white/60 text-lg mb-8">
                        Réponds vite, enchaîne les combos et active l'Overdrive pour exploser le score.
                    </p>

                    <GlassButton
                        onClick={handleStartGame}
                        size="xl"
                        variant="glass-accent"
                        className="w-full text-lg font-bold"
                    >
                        Lancer la partie 🚀
                    </GlassButton>

                    <button
                        onClick={() => navigate('/games')}
                        className="mt-6 text-white/40 hover:text-white text-sm transition-colors flex items-center justify-center gap-2 mx-auto"
                    >
                        <ArrowLeft className="w-4 h-4" /> Retour
                    </button>
                </motion.div>
            </div>
        );
    }

    if (gameState === 'finished') {
        const finalScore = gameResult ? gameResult.finalScore : score;
        const correctCount = gameResult ? gameResult.correctAnswers : 0;
        const totalQuestions = questions.length || 10;
        const rank = getRank(finalScore, totalQuestions, correctCount);
        const accuracy = Math.round((correctCount / totalQuestions) * 100);

        const stats = [
            {
                label: "Précision",
                value: `${accuracy}%`,
                icon: <Target className="w-4 h-4" />,
                color: "text-blue-400"
            },
            {
                label: "Max Combo",
                value: `${gameResult?.maxCombo || maxCombo}x`,
                icon: <Zap className="w-4 h-4" />,
                color: "text-yellow-400"
            },
            {
                label: "XP Gagné",
                value: `+${gameResult?.xpEarned || 0}`,
                icon: <Trophy className="w-4 h-4" />,
                color: "text-purple-400"
            },
            {
                label: "Temps Moyen",
                value: "1.2s", // Placeholder or calculate real avg
                icon: <Timer className="w-4 h-4" />,
                color: "text-emerald-400"
            }
        ];

        return (
            <GameResultScreen
                score={finalScore}
                rank={rank}
                stats={stats}
                onReplay={() => window.location.reload()}
                onQuit={() => navigate('/games')}
            />
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col relative overflow-hidden font-sans transition-colors duration-1000">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                    style={{
                        backgroundImage: theme === 'naruto'
                            ? `url(${narutoBackground})`
                            : `url(${multiverseBackground})`,
                    }}
                />
                <div className="absolute inset-0 bg-[#0a0a0a]/50 z-0" /> {/* Dark Overlay for readability */}

                {/* Dynamic Gradients on top of image */}
                <motion.div
                    animate={{
                        background: isOverdrive
                            ? 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.2), transparent 70%)'
                            : 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)'
                    }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 z-0 mix-blend-overlay"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
            </div>

            {/* Header / HUD */}
            <div className="relative z-10 p-6 flex justify-between items-center max-w-6xl mx-auto w-full">
                <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                        <span className="text-white/40 text-xs uppercase tracking-wider font-semibold">Score</span>
                        <span className="text-3xl font-bold text-white font-heading">{score.toLocaleString()}</span>
                    </div>

                    {combo > 1 && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20"
                        >
                            <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-yellow-400 font-bold text-sm">{combo}x COMBO</span>
                        </motion.div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {isOverdrive && (
                        <motion.div
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="flex items-center gap-2 px-4 py-1.5 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-full text-xs font-bold tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                        >
                            <Flame className="w-3 h-3 fill-current" />
                            OVERDRIVE
                        </motion.div>
                    )}
                    <div className="h-10 px-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-white/90 font-bold text-sm backdrop-blur-md">
                        <span className="text-white/40 font-normal">Question</span>
                        {currentQuestionIndex + 1} <span className="text-white/20">/</span> {questions.length}
                    </div>
                </div>
            </div>

            {/* Main Game Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 max-w-4xl mx-auto w-full p-6">

                {/* Timer */}
                <div className="w-full max-w-xl mb-12">
                    <PulseTimer
                        key={currentQuestionIndex} // Force remount on question change
                        duration={10}
                        isActive={isTimerActive && selectedAnswer === null}
                        onComplete={handleTimeout}
                        isOverdrive={isOverdrive}
                    />
                </div>

                {/* Question */}
                <div className="w-full mb-12 min-h-[160px] flex items-center justify-center text-center">
                    <AnimatePresence mode="wait">
                        {isQuestionVisible ? (
                            <motion.h2
                                key={currentQuestion?._id}
                                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                                className="text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-xl"
                            >
                                <GlitchText text={currentQuestion?.question || ""} />
                            </motion.h2>
                        ) : (
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse" />
                                <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse delay-75" />
                                <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse delay-150" />
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {currentQuestion?.options.map((option, index) => {
                        let stateClass = "bg-white/[0.03] border-white/10 hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.02]";

                        if (selectedAnswer !== null) {
                            if (index === currentQuestion.correctAnswer) {
                                stateClass = "bg-green-500/20 border-green-500/50 text-green-100 shadow-[0_0_20px_rgba(34,197,94,0.2)]";
                            } else if (index === selectedAnswer) {
                                stateClass = "bg-red-500/20 border-red-500/50 text-red-100";
                            } else {
                                stateClass = "opacity-30 bg-white/[0.01] border-white/5 grayscale";
                            }
                        }

                        return (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isQuestionVisible ? 1 : 0, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                disabled={selectedAnswer !== null || !isQuestionVisible}
                                onClick={() => handleAnswer(index)}
                                className={`
                  p-6 rounded-2xl border text-left transition-all duration-300
                  flex items-center justify-between group relative overflow-hidden
                  ${stateClass}
                `}
                            >
                                <span className="text-lg font-medium relative z-10">
                                    {option}
                                </span>
                                {selectedAnswer === index && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="relative z-10"
                                    >
                                        {index === currentQuestion.correctAnswer ? (
                                            <Sparkles className="w-5 h-5 text-green-400" />
                                        ) : (
                                            <div className="w-5 h-5 rounded-full border-2 border-red-400 flex items-center justify-center">
                                                <div className="w-3 h-0.5 bg-red-400 rotate-45 absolute" />
                                                <div className="w-3 h-0.5 bg-red-400 -rotate-45 absolute" />
                                            </div>
                                        )}
                                    </motion.span>
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Mascot */}
            <div className="fixed bottom-0 right-0 md:right-10 z-20 w-48 md:w-80 pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={isOverdrive ? 'super' : 'normal'}
                        src={isOverdrive ? '/speed_pulse_mascot_super-removebg.png' : '/speed_pulse_mascot_normal-removebg-preview.png'}
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: 0,
                            filter: isOverdrive ? 'drop-shadow(0 0 20px rgba(168,85,247,0.5))' : 'none'
                        }}
                        exit={{ opacity: 0, scale: 0.9, x: 50 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-auto object-contain"
                        alt="Mascot"
                    />
                </AnimatePresence>
            </div>
        </div >
    );
};

export default SpeedPulseGame;
