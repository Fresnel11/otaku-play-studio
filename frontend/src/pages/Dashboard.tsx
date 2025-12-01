import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Trophy, Star, Zap, Flame, Play } from "lucide-react";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import { GlassButton } from "@/components/ui/GlassButton";
import { getUserProfile } from "@/services/userService";
import { getTopCategories, type GameCategory } from "@/services/gameCategoryService";

// Import assets from Cloudinary
import { ASSETS } from '@/constants/assets';
const mascotWelcome = ASSETS.IMAGES.MASCOT_WELCOME;
const animeQuizCover = ASSETS.IMAGES.ANIME_QUIZ_COVER;
const memoryGameCover = ASSETS.IMAGES.MEMORY_GAME_COVER;
const rankingCover = ASSETS.IMAGES.RANKING_COVER;
const battleRoyaleCover = ASSETS.IMAGES.BATTLE_ROYALE_COVER;
const storyModeCover = ASSETS.IMAGES.STORY_MODE_COVER;
const communityCover = ASSETS.IMAGES.COMMUNITY_COVER;

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "SuperOtaku",
    level: 1,
    xp: 0,
    gamesPlayed: 0,
    wins: 0,
  });
  const [loading, setLoading] = useState(true);
  const [topGames, setTopGames] = useState<GameCategory[]>([]);

  // Map category IDs to their images
  const categoryImages: Record<string, string> = {
    'quiz-anime': animeQuizCover,
    'memory-kawaii': memoryGameCover,
    'classement-mondial': rankingCover,
    'battle-royale': battleRoyaleCover,
    'mode-histoire': storyModeCover,
    'defi-communautaire': communityCover,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const profile = await getUserProfile();
        setUserData({
          username: profile.username,
          level: profile.level || 1,
          xp: profile.xp || 0,
          gamesPlayed: profile.gamesPlayed || 0,
          wins: profile.wins || 0,
        });

        // Fetch top game categories
        const categories = await getTopCategories(3);
        setTopGames(categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate stats
  const winRate = userData.gamesPlayed > 0
    ? Math.round((userData.wins / userData.gamesPlayed) * 100)
    : 0;

  const xpToNextLevel = userData.level * 100; // Simple formula: level * 100
  const xpProgress = Math.round((userData.xp / xpToNextLevel) * 100);
  const xpRemaining = xpToNextLevel - userData.xp;

  const stats = [
    {
      label: "Niveau",
      value: userData.level.toString(),
      icon: Star,
      color: "indigo",
      trend: `${xpProgress}% XP`,
      trendUp: true
    },
    {
      label: "Parties jouées",
      value: userData.gamesPlayed.toString(),
      icon: Zap,
      color: "purple",
      trend: loading ? "..." : "Total",
      trendUp: true
    },
    {
      label: "Victoires",
      value: userData.wins.toString(),
      icon: Trophy,
      color: "pink",
      trend: `${winRate}% Win Rate`,
      trendUp: winRate >= 50
    },
    {
      label: "XP Total",
      value: userData.xp.toString(),
      icon: Flame,
      color: "orange",
      trend: `${xpRemaining} pour level up`,
      trendUp: true
    },
  ];

  return (
    <DashboardLayout>
      {/* Hero Section */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 overflow-hidden backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-50" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0">
          <div className="max-w-full lg:max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-3 sm:mb-4"
            >
              Bon retour, {userData.username} ! 👋
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/60 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6"
            >
              Tu as 3 défis quotidiens en attente. Prêt à montrer qui est le meilleur ?
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassButton onClick={() => navigate("/games")} className="bg-white text-black hover:bg-white/90 border-none text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                <Play className="mr-2 h-3 w-3 sm:h-4 sm:w-4 fill-current" />
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} {...stat} delay={index * 0.1} color={stat.color as any} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column: Top Games */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white flex items-center gap-2">
                <Flame className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 fill-orange-500/20 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                <span className="hidden sm:inline">Jeux les Plus Joués</span>
                <span className="sm:hidden">Top Jeux</span>
              </h2>
              <button
                onClick={() => navigate("/games")}
                className="text-xs sm:text-sm text-white/50 hover:text-white transition-colors"
              >
                Voir tout
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {topGames.length > 0 ? (
                topGames.map((game, index) => (
                  <motion.div
                    key={game.categoryId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="group relative aspect-[4/3] sm:aspect-video rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border border-white/10"
                    onClick={() => game.available && navigate(game.route)}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={categoryImages[game.categoryId] || animeQuizCover}
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 p-4 sm:p-4 lg:p-6 flex flex-col justify-end">
                      <div className="transform translate-y-1 sm:translate-y-2 lg:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="inline-block px-2 sm:px-3 py-1 rounded-md bg-white/10 backdrop-blur-md text-xs sm:text-xs font-medium text-white mb-2 sm:mb-2 border border-white/10">
                          {game.difficulty}
                        </span>
                        <h3 className="text-lg sm:text-lg lg:text-xl font-bold text-white mb-1 leading-tight">{game.title}</h3>
                        <p className="text-white/70 text-sm sm:text-xs lg:text-sm flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          <Play className="h-3 w-3 sm:h-3 sm:w-3" /> {game.playCount} parties jouées
                        </p>
                      </div>
                    </div>

                    {/* Unavailable Overlay */}
                    {!game.available && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white/80 text-sm sm:text-sm font-medium">Bientôt disponible</span>
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 text-center text-white/50 py-12">
                  Aucun jeu disponible pour le moment
                </div>
              )}
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
