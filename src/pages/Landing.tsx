import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FunButton from "@/components/FunButton";
import FunCard from "@/components/FunCard";
import Mascot3D from "@/components/Mascot3D";
import { Gamepad2, Sparkles, Trophy, Users } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const games = [
    {
      title: "Quiz Anime Rapide",
      description: "Teste tes connaissances sur les animes !",
      icon: Sparkles,
      color: "primary",
    },
    {
      title: "Memory Kawaii",
      description: "Trouve les paires de personnages",
      icon: Gamepad2,
      color: "secondary",
    },
    {
      title: "Classement",
      description: "Compare ton score aux autres otakus",
      icon: Trophy,
      color: "accent",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 overflow-hidden">
      {/* Floating shapes background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/20 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-16"
        >
          <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            OtakuPlay
          </h1>
          <div className="flex gap-4">
            <FunButton variant="secondary" size="sm" onClick={() => navigate("/login")}>
              Connexion
            </FunButton>
            <FunButton variant="accent" size="sm" onClick={() => navigate("/register")}>
              S'inscrire
            </FunButton>
          </div>
        </motion.div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              La plateforme de{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-pulse-glow">
                jeux otaku
              </span>{" "}
              la plus fun ! 🎮
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Rejoins la communauté et montre que tu es le meilleur otaku en défiant tes amis sur
              des quiz et mini-jeux ultra kawaii !
            </p>
            <div className="flex flex-wrap gap-4">
              <FunButton
                variant="primary"
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="group"
              >
                <Gamepad2 className="mr-2 h-5 w-5 group-hover:animate-wiggle" />
                Jouer maintenant
              </FunButton>
              <FunButton variant="accent" size="lg" onClick={() => navigate("/register")}>
                <Users className="mr-2 h-5 w-5" />
                Créer un compte
              </FunButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="w-full h-[400px] lg:h-[500px] relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-3xl"
              />
              <Mascot3D animation="wave" className="relative z-10" />
            </div>
          </motion.div>
        </div>

        {/* Games Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-3xl font-heading font-bold text-center mb-12">
            Découvre nos jeux 🎯
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <motion.div
                key={game.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <FunCard
                  glow={game.color as "primary" | "secondary" | "accent"}
                  className="cursor-pointer hover:border-primary/50 transition-colors group"
                  onClick={() => navigate("/quiz")}
                >
                  <game.icon className="h-12 w-12 mb-4 text-primary group-hover:animate-bounce-soft" />
                  <h4 className="text-xl font-heading font-bold mb-2">{game.title}</h4>
                  <p className="text-muted-foreground">{game.description}</p>
                </FunCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
