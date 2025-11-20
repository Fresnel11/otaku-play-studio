import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FunButton from "@/components/FunButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, User, Mail, Lock, Sparkles } from "lucide-react";
import welcomeArt from "@/assets/register_welcome_art.png";
import ninjaArt from "@/assets/ninja_locks_character.png";
import heroineArt from "@/assets/black_anime_heroine.png";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: welcomeArt, alt: "Welcome" },
    { src: ninjaArt, alt: "Ninja" },
    { src: heroineArt, alt: "Heroine" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Remplis tous les champs !");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }
    toast.success("Bienvenue dans la communauté otaku ! 🎉");
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] overflow-hidden">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 relative z-20">
        {/* Mobile Background Image (Carousel) */}
        <div className="absolute inset-0 lg:hidden z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex].src}
              alt="Background"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full h-full object-cover absolute inset-0"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md relative z-10"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </button>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/10 mb-4">
                  <Sparkles className="h-8 w-8 text-pink-400" />
                </div>
                <h1 className="text-3xl font-heading font-bold text-white mb-2">
                  Inscription
                </h1>
                <p className="text-white/50">
                  Commence ton voyage Otaku aujourd'hui
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white/80 font-medium">
                    Pseudo
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="SuperOtaku123"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-pink-500/50 focus:ring-pink-500/20 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80 font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="ton-email@otaku.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-pink-500/50 focus:ring-pink-500/20 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/80 font-medium">
                    Mot de passe
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-pink-500/50 focus:ring-pink-500/20 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white/80 font-medium">
                    Confirmer le mot de passe
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-pink-500/50 focus:ring-pink-500/20 rounded-xl"
                    />
                  </div>
                </div>

                <FunButton
                  type="submit"
                  variant="glass"
                  size="lg"
                  className="w-full mt-4 bg-gradient-to-r from-pink-500/80 to-purple-600/80 hover:from-pink-500 hover:to-purple-600 border-none"
                >
                  Créer mon compte 🚀
                </FunButton>
              </form>

              <div className="mt-8 text-center">
                <p className="text-white/40">
                  Déjà inscrit ?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-pink-400 font-semibold hover:text-pink-300 transition-colors hover:underline"
                  >
                    Connecte-toi ici
                  </button>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Anime Art Carousel (Desktop) */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a0a0a]/90 z-10" />

        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex].src}
            alt={images[currentImageIndex].alt}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute bottom-20 right-12 z-20 max-w-md text-right">
          <h2 className="text-5xl font-heading font-bold text-white mb-4 drop-shadow-lg">
            Rejoins l'aventure
          </h2>
          <p className="text-xl text-white/80 font-medium">
            Crée ton profil, défie tes amis et deviens le meilleur Otaku de la communauté !
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
