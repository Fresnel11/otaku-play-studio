import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { startSurvivalGame, submitSurvivalGame, Question, GameResult } from '../../services/gameService';
import PulseTimer from '../../components/games/PulseTimer';
import HeartDisplay from '../../components/games/HeartDisplay';
import GlitchText from '@/components/games/GlitchText';
import GameResultScreen from '@/components/games/GameResultScreen';
import { Zap, Trophy, Timer, ArrowLeft, Sparkles, Flame, Target, Skull } from 'lucide-react';
import { GlassButton } from '@/components/ui/GlassButton';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import survivalBgVideo from '@/assets/survial_mode.mp4';

const SurvivalGame: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const theme = searchParams.get('theme');

    const [gameState, setGameState] = useState<'intro' | 'playing' | 'finished'>('intro');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [sessionId, setSessionId] = useState<string | null>(null);

    // Survival Stats
    const [lives, setLives] = useState(3);
    const [wave, setWave] = useState(1);
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [answers, setAnswers] = useState<{ questionId: string; userAnswer: number; responseTime: number }[]>([]);
    const [gameResult, setGameResult] = useState<GameResult | null>(null);

    // Round State
    const [isQuestionVisible, setIsQuestionVisible] = useState(false);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [roundStartTime, setRoundStartTime] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);

    // Difficulty Logic
    const [timerDuration, setTimerDuration] = useState(10);

    // User Info
    const [userId, setUserId] = useState<string | null>(null);

    // Visual Effects State
    const [showWaveTitle, setShowWaveTitle] = useState(false);
    const [isDamaged, setIsDamaged] = useState(false);

    useEffect(() => {
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

    const handleStartGame = async () => {
        if (!userId) return;
        try {
            const session = await startSurvivalGame(userId, theme || undefined);
            setQuestions(session.questions);
            setSessionId(session.sessionId);
            setGameState('playing');
            setLives(3);
            setWave(1);
            setScore(0);
            setTimerDuration(10);

            // Trigger Wave 1 Animation
            setShowWaveTitle(true);
            setTimeout(() => {
                setShowWaveTitle(false);
                startRound();
            }, 2000);

        } catch (error) {
            toast.error("Impossible de lancer la partie.");
            console.error(error);
        }
    };

    const startRound = () => {
        setIsQuestionVisible(false);
        setIsTimerActive(false);
        setSelectedAnswer(null);
        setShowFeedback(null);

        // Difficulty Scaling: Decrease timer every 5 questions
        const questionsAnswered = answers.length;
        const newDuration = Math.max(3, 10 - Math.floor(questionsAnswered / 5));
        setTimerDuration(newDuration);

        // Wave Calculation
        const currentWave = Math.floor(questionsAnswered / 10) + 1;
        if (currentWave > wave) {
            setWave(currentWave);
            setShowWaveTitle(true);
            setTimeout(() => {
                setShowWaveTitle(false);
                // Continue round after wave title
                setTimeout(() => {
                    setIsQuestionVisible(true);
                    setTimeout(() => {
                        setIsTimerActive(true);
                        setRoundStartTime(Date.now());
                    }, 800);
                }, 500);
            }, 2000);
            return; // Stop here to wait for animation
        }

        setTimeout(() => {
            setIsQuestionVisible(true);
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

        if (isCorrect) {
            setShowFeedback('correct');
            const newCombo = combo + 1;
            setCombo(newCombo);
            setMaxCombo(Math.max(maxCombo, newCombo));

            // Score Logic
            let points = 100 * wave; // More points in higher waves
            if (responseTime < 2000) points += 50;
            setScore(prev => prev + points);

            // Heal on Boss Wave clear (every 10th question correct)
            if ((answers.length + 1) % 10 === 0 && lives < 5) {
                setLives(prev => Math.min(prev + 1, 5));
                toast.success("Boss Wave Cleared! +1 Life ❤️");
            }

        } else {
            setShowFeedback('wrong');
            setCombo(0);
            setLives(prev => prev - 1);
            triggerDamageEffect();
        }

        const newAnswer = {
            questionId: currentQuestion._id,
            userAnswer: index,
            responseTime
        };

        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);

        setTimeout(() => {
            if (lives > (isCorrect ? 0 : 1)) {
                let nextIndex = currentQuestionIndex + 1;
                if (nextIndex >= questions.length) {
                    nextIndex = 0;
                }
                setCurrentQuestionIndex(nextIndex);
                startRound();
            } else {
                finishGame(updatedAnswers);
            }
        }, 1500);
    };

    const handleTimeout = () => {
        if (selectedAnswer !== null) return;

        setShowFeedback('wrong');
        setCombo(0);
        setLives(prev => prev - 1);
        triggerDamageEffect();
        setIsTimerActive(false); // Stop the timer loop

        const currentQuestion = questions[currentQuestionIndex];

        if (!currentQuestion) {
            console.error("Current question is undefined in handleTimeout");
            return;
        }

        const newAnswer = {
            questionId: currentQuestion._id,
            userAnswer: -1,
            responseTime: 10000
        };

        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);

        setTimeout(() => {
            if (lives > 1) {
                let nextIndex = currentQuestionIndex + 1;
                if (nextIndex >= questions.length) nextIndex = 0;
                setCurrentQuestionIndex(nextIndex);
                startRound();
            } else {
                finishGame(updatedAnswers);
            }
        }, 1500);
    };

    const triggerDamageEffect = () => {
        setIsDamaged(true);
        setTimeout(() => setIsDamaged(false), 300);
    };

    const finishGame = async (finalAnswers?: typeof answers) => {
        setGameState('finished');
        if (!sessionId || !userId) return;
        const answersToSubmit = finalAnswers || answers;
        try {
            const result = await submitSurvivalGame(sessionId, userId, answersToSubmit);
            setGameResult(result);
        } catch (error) {
            console.error("Error submitting game:", error);
        }
    };

    if (gameState === 'intro') {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white/[0.02] backdrop-blur-2xl border border-red-500/20 p-12 rounded-3xl max-w-lg w-full text-center shadow-2xl relative z-10"
                >
                    <div className="inline-flex p-4 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6 shadow-inner">
                        <Skull className="w-12 h-12 text-red-500" />
                    </div>
                    <h1 className="text-5xl font-heading font-bold text-white mb-4 tracking-tight">
                        Survival Mode
                    </h1>
                    <p className="text-white/60 text-lg mb-8">
                        3 Vies. Difficulté croissante. Jusqu'où iras-tu ?
                    </p>
                    <GlassButton onClick={handleStartGame} size="xl" className="w-full text-lg font-bold bg-red-600/20 hover:bg-red-600/30 border-red-500/50">
                        Survivre 💀
                    </GlassButton>
                    <button onClick={() => navigate('/games')} className="mt-6 text-white/40 hover:text-white text-sm transition-colors flex items-center justify-center gap-2 mx-auto">
                        <ArrowLeft className="w-4 h-4" /> Retour
                    </button>
                </motion.div>
            </div>
        );
    }

    if (gameState === 'finished') {
        const finalScore = gameResult ? gameResult.finalScore : score;
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
                {/* Blood/Red Overlay */}
                <div className="absolute inset-0 bg-red-900/20 pointer-events-none" />

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10 max-w-2xl w-full bg-black/80 border border-red-900/50 p-12 rounded-3xl text-center backdrop-blur-xl shadow-[0_0_100px_rgba(220,38,38,0.3)]"
                >
                    <h1 className="text-7xl font-black text-red-600 mb-2 tracking-tighter drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]">YOU DIED</h1>
                    <p className="text-white/50 text-xl mb-8 uppercase tracking-widest">Game Over</p>

                    <div className="grid grid-cols-3 gap-6 mb-12">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <div className="text-white/40 text-xs uppercase mb-1">Vagues</div>
                            <div className="text-3xl font-bold text-white">{wave}</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <div className="text-white/40 text-xs uppercase mb-1">Score</div>
                            <div className="text-3xl font-bold text-red-400">{finalScore.toLocaleString()}</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <div className="text-white/40 text-xs uppercase mb-1">Combo Max</div>
                            <div className="text-3xl font-bold text-yellow-400">{maxCombo}x</div>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <GlassButton onClick={() => window.location.reload()} className="bg-white text-black hover:bg-gray-200">
                            Rejouer
                        </GlassButton>
                        <GlassButton onClick={() => navigate('/games')} className="bg-transparent border border-white/20 hover:bg-white/10">
                            Quitter
                        </GlassButton>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className={cn(
            "min-h-screen bg-[#0a0a0a] flex flex-col relative overflow-hidden font-sans transition-transform duration-100",
            isDamaged ? "translate-x-[-5px] translate-y-[5px]" : ""
        )}>
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
            >
                <source src={survivalBgVideo} type="video/mp4" />
            </video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50 pointer-events-none" />

            {/* Damage Flash Overlay */}
            <div className={cn(
                "absolute inset-0 bg-red-600/30 pointer-events-none z-50 transition-opacity duration-100",
                isDamaged ? "opacity-100" : "opacity-0"
            )} />

            {/* Wave Title Overlay */}
            <AnimatePresence>
                {showWaveTitle && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    >
                        <div className="text-center">
                            <motion.h1
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-900 tracking-tighter drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                            >
                                WAVE {wave}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-white/50 text-xl uppercase tracking-[1em] mt-4"
                            >
                                Survive
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Red Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(220,38,38,0.1),_transparent_70%)] animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
            </div>

            {/* HUD */}
            <div className="relative z-10 p-6 flex justify-between items-center max-w-6xl mx-auto w-full">
                <div className="flex flex-col gap-2">
                    <HeartDisplay lives={lives} maxLives={5} />
                    <span className="text-white/40 text-xs font-bold tracking-wider">VAGUE {wave}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-white/40 text-xs uppercase tracking-wider font-semibold">Score</span>
                    <span className="text-3xl font-bold text-white font-heading">{score.toLocaleString()}</span>
                </div>
            </div>

            {/* Game Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 max-w-4xl mx-auto w-full p-6">
                {/* Timer */}
                <div className="w-full max-w-xl mb-8">
                    <PulseTimer
                        duration={timerDuration}
                        isActive={isTimerActive && selectedAnswer === null}
                        onComplete={handleTimeout}
                        isOverdrive={false} // No visual overdrive in survival, maybe add later
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
                                <GlitchText text={currentQuestion?.question || ""} duration={500} />
                            </motion.h2>
                        ) : (
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500/40 rounded-full animate-pulse" />
                                <div className="w-2 h-2 bg-red-500/40 rounded-full animate-pulse delay-75" />
                                <div className="w-2 h-2 bg-red-500/40 rounded-full animate-pulse delay-150" />
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {currentQuestion?.options.map((option, index) => {
                        let stateClass = "bg-white/[0.03] border-white/10 hover:bg-red-500/10 hover:border-red-500/30";
                        if (selectedAnswer !== null) {
                            if (index === currentQuestion.correctAnswer) {
                                stateClass = "bg-green-500/20 border-green-500/50 text-green-100";
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
                                className={`p-6 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${stateClass}`}
                            >
                                <span className="text-lg font-medium relative z-10">{option}</span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SurvivalGame;
