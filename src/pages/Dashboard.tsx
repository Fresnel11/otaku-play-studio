import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FunButton from "@/components/FunButton";
import FunCard from "@/components/FunCard";
// import Mascot3D from "@/components/Mascot3D";
import { Gamepad2, Trophy, Star, Zap, LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const username = "SuperOtaku";

  const stats = [
    { label: "Parties jouées", value: "42", icon: Gamepad2, color: "primary" },
    { label: "Score total", value: "8,520", icon: Trophy, color: "accent" },
    { label: "Niveau", value: "Otaku Senpai", icon: Star, color: "secondary" },
  ];

  const games = [
    {
      title: "Quiz Anime Rapide",
      description: "Teste tes connaissances !",
      icon: Zap,
      action: () => navigate("/quiz"),
      color: "primary",
    },
    {
      title: "Memory Kawaii",
      description: "Trouve les paires",
      icon: Gamepad2,
      action: () => alert("Bientôt disponible !"),
      color: "secondary",
    },
    {
      title: "Classement",
      description: "Top des joueurs",
      icon: Trophy,
      action: () => alert("Bientôt disponible !"),
      color: "accent",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute top-20 right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-32 h-32 bg-accent/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-4xl font-heading font-bold mb-2">
              Bienvenue, {username} ! 👋
            </h1>
            <p className="text-muted-foreground">Prêt à jouer aujourd'hui ?</p>
          </div>
          <FunButton variant="secondary" size="sm" onClick={() => navigate("/")}>
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </FunButton>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <FunCard
                glow={stat.color as "primary" | "secondary" | "accent"}
                className="text-center"
              >
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-primary animate-bounce-soft" />
                <h3 className="text-3xl font-heading font-bold mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </FunCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Games Section */}
          <div className="lg:col-span-2">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-heading font-bold mb-6"
            >
              Jeux disponibles 🎮
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {games.map((game, index) => (
                <motion.div
                  key={game.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <FunCard
                    glow={game.color as "primary" | "secondary" | "accent"}
                    className="cursor-pointer h-full group hover:border-primary/50 transition-colors"
                    onClick={game.action}
                  >
                    <game.icon className="h-10 w-10 mb-4 text-primary group-hover:animate-wiggle" />
                    <h3 className="text-xl font-heading font-bold mb-2">{game.title}</h3>
                    <p className="text-muted-foreground mb-4">{game.description}</p>
                    <FunButton variant={game.color as "primary" | "secondary" | "accent"} size="sm">
                      Jouer
                    </FunButton>
                  </FunCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mascot Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-heading font-bold mb-6">Ta mascotte 🎭</h2>
            <FunCard glow="soft" className="h-[400px]">
              {/* <Mascot3D animation="idle" /> */}
            </FunCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
