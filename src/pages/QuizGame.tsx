import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FunButton from "@/components/FunButton";
import FunCard from "@/components/FunCard";
import TimerBar from "@/components/TimerBar";
import { toast } from "sonner";
import { Sparkles, X } from "lucide-react";

interface Question {
  question: string;
  answers: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    question: "Quel est l'anime où le personnage principal mange des pommes de terre ?",
    answers: ["Attack on Titan", "Death Note", "Naruto", "One Piece"],
    correctAnswer: 0,
  },
  {
    question: "Qui est le créateur de One Piece ?",
    answers: ["Masashi Kishimoto", "Eiichiro Oda", "Hajime Isayama", "Akira Toriyama"],
    correctAnswer: 1,
  },
  {
    question: "Quel anime a pour slogan 'Gotta catch 'em all' ?",
    answers: ["Digimon", "Yu-Gi-Oh!", "Pokémon", "Beyblade"],
    correctAnswer: 2,
  },
  {
    question: "Dans quel anime trouve-t-on les Titans ?",
    answers: ["Tokyo Ghoul", "Attack on Titan", "Parasyte", "Demon Slayer"],
    correctAnswer: 1,
  },
  {
    question: "Quel est le vrai nom de 'L' dans Death Note ?",
    answers: ["Light Yagami", "L Lawliet", "Misa Amane", "Ryuk"],
    correctAnswer: 1,
  },
];

const QuizGame = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeKey, setTimeKey] = useState(0);

  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowResult(false);
          setTimeKey(timeKey + 1);
        } else {
          navigate("/score", { state: { score, total: questions.length } });
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showResult, currentQuestion, navigate, score, timeKey]);

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast.success("Bonne réponse ! 🎉", {
        duration: 1000,
      });
    } else {
      toast.error("Raté ! 😵", {
        duration: 1000,
      });
    }
  };

  const handleTimeout = () => {
    if (!showResult) {
      setShowResult(true);
      toast.error("Temps écoulé ! ⏰");
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowResult(false);
          setTimeKey(timeKey + 1);
        } else {
          navigate("/score", { state: { score, total: questions.length } });
        }
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background effects */}
      <motion.div
        className="absolute top-10 right-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-32 h-32 bg-accent/30 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="w-full max-w-3xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6"
        >
          <div className="flex items-center gap-4">
            <FunButton
              variant="secondary"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <X className="mr-2 h-4 w-4" />
              Quitter
            </FunButton>
            <div className="text-xl font-heading font-bold">
              Question {currentQuestion + 1}/{questions.length}
            </div>
          </div>
          <div className="flex items-center gap-2 bg-card px-6 py-3 rounded-full fun-glow">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-2xl font-heading font-bold">{score}</span>
          </div>
        </motion.div>

        {/* Timer */}
        <motion.div
          key={timeKey}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6"
        >
          <TimerBar duration={15} onComplete={handleTimeout} />
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <FunCard glow="primary" className="p-8 mb-6">
              <h2 className="text-2xl font-heading font-bold mb-8 text-center">
                {questions[currentQuestion].question}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQuestion].answers.map((answer, index) => {
                  const isCorrect = index === questions[currentQuestion].correctAnswer;
                  const isSelected = index === selectedAnswer;
                  const shouldShowResult = showResult && (isSelected || isCorrect);

                  let buttonVariant: "primary" | "success" | "accent" = "primary";
                  if (showResult) {
                    if (isCorrect) buttonVariant = "success";
                    else if (isSelected && !isCorrect) buttonVariant = "accent";
                  }

                  return (
                    <motion.div
                      key={index}
                      whileHover={!showResult ? { scale: 1.02 } : {}}
                      whileTap={!showResult ? { scale: 0.98 } : {}}
                    >
                      <FunButton
                        variant={buttonVariant}
                        size="lg"
                        onClick={() => handleAnswer(index)}
                        disabled={showResult}
                        className={`w-full h-full min-h-[80px] text-left justify-start ${
                          shouldShowResult ? "animate-pop" : ""
                        }`}
                      >
                        <span className="font-heading font-bold mr-3 text-xl">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        {answer}
                      </FunButton>
                    </motion.div>
                  );
                })}
              </div>
            </FunCard>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {questions.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentQuestion
                  ? "bg-primary"
                  : index < currentQuestion
                  ? "bg-success"
                  : "bg-muted"
              }`}
              animate={index === currentQuestion ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
