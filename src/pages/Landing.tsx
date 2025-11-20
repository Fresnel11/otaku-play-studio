import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FunButton from "@/components/FunButton";
import FunCard from "@/components/FunCard";
import { Gamepad2, Sparkles, Trophy, Users } from "lucide-react";
import animeVideo from "@/assets/middle_of_the_night_anime mix.mp4";

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
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section with Video Background */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={animeVideo} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-4 drop-shadow-lg">
              OtakuPlay
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-md">
              La plateforme ultime pour les fans d'anime et de manga ! 🌸
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <FunButton
              variant="glass"
              size="xl"
              onClick={() => navigate("/games")}
              className="text-lg px-8 py-6 hover:scale-105 transition-transform border-primary/50 hover:border-primary hover:bg-primary/20"
            >
              <Gamepad2 className="h-6 w-6" />
              Jouer maintenant
            </FunButton>
            <FunButton
              variant="glass"
              size="xl"
              onClick={() => navigate("/register")}
              className="text-lg px-8 py-6 hover:scale-105 transition-transform border-secondary/50 hover:border-secondary hover:bg-secondary/20"
            >
              <Users className="h-6 w-6" />
              Rejoindre le club
            </FunButton>
          </motion.div>
        </div>
      </div>

      {/* Games Grid Section */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-4xl font-heading font-bold text-center mb-16 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Découvre nos jeux 🎯
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <motion.div
                key={game.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <FunCard
                  glow={game.color as "primary" | "secondary" | "accent"}
                  className="cursor-pointer hover:border-primary/50 transition-all hover:-translate-y-2 h-full"
                  onClick={() => navigate("/quiz")}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-4 rounded-full bg-${game.color}/10 mb-6`}>
                      <game.icon className={`h-10 w-10 text-${game.color}`} />
                    </div>
                    <h4 className="text-2xl font-heading font-bold mb-3">{game.title}</h4>
                    <p className="text-muted-foreground text-lg">{game.description}</p>
                  </div>
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
