import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import FunButton from "@/components/FunButton";
import FunCard from "@/components/FunCard";
import { Trophy, Home, RotateCcw, Share2 } from "lucide-react";
import { toast } from "sonner";

const Score = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score = 0, total = 5 } = location.state || {};
  const [displayScore, setDisplayScore] = useState(0);

  const percentage = (score / total) * 100;
  let badge = "";
  let badgeColor = "";
  let mascotAnimation: "idle" | "happy" | "sad" = "idle";

  if (percentage >= 80) {
    badge = "Otaku Senpai";
    badgeColor = "text-primary";
    mascotAnimation = "happy";
  } else if (percentage >= 50) {
    badge = "Otaku Confirmé";
    badgeColor = "text-secondary";
    mascotAnimation = "idle";
  } else {
    badge = "Otaku Rookie";
    badgeColor = "text-accent";
    mascotAnimation = "sad";
  }

  useEffect(() => {
    let start = 0;
    const increment = score / 30;
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [score]);

  const handleShare = () => {
    toast.success("Score copié dans le presse-papier !");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"
        animate={{
          background: [
            "linear-gradient(0deg, rgba(138, 43, 255, 0.1), rgba(25, 230, 230, 0.1), rgba(255, 46, 147, 0.1))",
            "linear-gradient(360deg, rgba(138, 43, 255, 0.1), rgba(25, 230, 230, 0.1), rgba(255, 46, 147, 0.1))",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Confetti effect */}
      {percentage >= 80 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-primary rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                opacity: 1,
              }}
              animate={{
                y: window.innerHeight + 20,
                rotate: 360,
                opacity: 0,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left side - Score */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FunCard glow="primary" className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <Trophy className="h-20 w-20 mx-auto mb-6 text-primary animate-bounce-soft" />
            </motion.div>

            <h1 className="text-5xl font-heading font-bold mb-4">
              Partie terminée !
            </h1>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 150, delay: 0.4 }}
              className="my-8"
            >
              <div className="text-7xl font-heading font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {displayScore}/{total}
              </div>
              <div className={`text-2xl font-heading font-bold ${badgeColor} mb-4`}>
                {badge} 🎖️
              </div>
              <div className="text-muted-foreground">
                {percentage >= 80 && "Incroyable ! Tu es un vrai expert ! 🌟"}
                {percentage >= 50 && percentage < 80 && "Pas mal ! Continue comme ça ! 💪"}
                {percentage < 50 && "Continue de t'entraîner ! 📚"}
              </div>
            </motion.div>

            <div className="flex flex-col gap-3">
              <FunButton
                variant="primary"
                size="lg"
                onClick={() => navigate("/quiz")}
                className="w-full"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Rejouer
              </FunButton>
              <div className="grid grid-cols-2 gap-3">
                <FunButton
                  variant="secondary"
                  size="md"
                  onClick={() => navigate("/dashboard")}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Accueil
                </FunButton>
                <FunButton variant="accent" size="md" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Partager
                </FunButton>
              </div>
            </div>
          </FunCard>
        </motion.div>

        {/* Right side - Mascot */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:block"
        >
          <div className="h-[500px] relative">
            {/* <Mascot3D animation={mascotAnimation} /> */}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6"
          >
            <h2 className="text-3xl font-heading font-bold">
              {percentage >= 80 && "Félicitations ! 🎉"}
              {percentage >= 50 && percentage < 80 && "Bien joué ! 👏"}
              {percentage < 50 && "Courage ! 💙"}
            </h2>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Score;
