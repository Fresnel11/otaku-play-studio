import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Trophy, Star, Zap, Flame, Users, Play } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import { GlassButton } from "@/components/ui/GlassButton";
import mascotWelcome from "@/assets/mascott/Gemini_Generated_Image_suo6ctsuo6ctsuo6-removebg-preview.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const username = "SuperOtaku";

  const stats = [
    { label: "Niveau", value: "5", icon: Star, color: "indigo", trend: "20% XP", trendUp: true },
    { label: "Parties jouées", value: "42", icon: Zap, color: "purple", trend: "12 cette semaine", trendUp: true },
    { label: "Victoires", value: "28", icon: Trophy, color: "pink", trend: "66% Win Rate", trendUp: true },
    { label: "Amis", value: "15", icon: Users, color: "blue", trend: "3 en ligne", trendUp: true },
  ];

  const recommendedGames = [
    {
      title: "Anime Quiz",
      category: "Quiz",
      players: "1.2k",
      image: "bg-gradient-to-br from-indigo-500/20 to-purple-600/20 grayscale hover:grayscale-0",
      action: () => navigate("/quiz"),
    },
    {
      title: "Memory Kawaii",
      category: "Puzzle",
      players: "850",
      image: "bg-gradient-to-br from-pink-500/20 to-rose-600/20 grayscale hover:grayscale-0",
      action: () => alert("Bientôt disponible !"),
    },
    {
      title: "Battle Royale",
      category: "Action",
      players: "2.5k",
      image: "bg-gradient-to-br from-orange-500/20 to-red-600/20 grayscale hover:grayscale-0",
      action: () => alert("Bientôt disponible !"),
    },
  ];

  return (
    <DashboardLayout>
      {/* Hero Section */}
      <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-8 mb-8 overflow-hidden backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-50" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-heading font-bold text-white mb-4"
            >
              Bon retour, {username} ! 👋
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/60 text-lg mb-6"
            >
              Tu as 3 défis quotidiens en attente. Prêt à montrer qui est le meilleur ?
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassButton onClick={() => navigate("/games")} className="bg-white text-black hover:bg-white/90 border-none">
                <Play className="mr-2 h-4 w-4 fill-current" />
                Jouer maintenant
              </GlassButton>
            </motion.div>
          </div>

          {/* Mascot Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block absolute right-0 bottom-[-20px] h-[120%] opacity-80 grayscale-[30%] hover:grayscale-0 transition-all duration-500"
          >
            <img
              src={mascotWelcome}
              alt="Mascot"
              className="h-full object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} {...stat} delay={index * 0.1} color={stat.color as any} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Recommended Games */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
                <Flame className="h-8 w-8 text-orange-500 fill-orange-500/20 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                Jeux Recommandés
              </h2>
              <button
                onClick={() => navigate("/games")}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                Voir tout
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {recommendedGames.map((game, index) => (
                <motion.div
                  key={game.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer border border-white/10"
                  onClick={game.action}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-white/10 to-black/50 transition-transform duration-500 group-hover:scale-110`} />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block px-2 py-1 rounded-md bg-white/10 backdrop-blur-md text-xs font-medium text-white mb-2 border border-white/10">
                        {game.category}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-1">{game.title}</h3>
                      <p className="text-white/70 text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        <Users className="h-3 w-3" /> {game.players} joueurs
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="space-y-8">
          <ActivityFeed />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
