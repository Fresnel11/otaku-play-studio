import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
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
          <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-sm" />
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

          <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Subtle Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 mb-4 shadow-inner">
                  <Sparkles className="h-6 w-6 text-white/70" />
                </div>
                <h1 className="text-3xl font-heading font-bold text-white mb-2 tracking-tight">
                  Créer un compte
                </h1>
                <p className="text-white/40 text-sm">
                  Rejoins la communauté et commence l'aventure
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white/60 text-xs uppercase tracking-wider font-semibold ml-1">
                    Pseudo
                  </Label>
                  <GlassInput
                    id="username"
                    type="text"
                    placeholder="Ton pseudo de héros"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    icon={User}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/60 text-xs uppercase tracking-wider font-semibold ml-1">
                    Email
                  </Label>
                  <GlassInput
                    id="email"
                    type="email"
                    placeholder="exemple@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={Mail}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/60 text-xs uppercase tracking-wider font-semibold ml-1">
                    Mot de passe
                  </Label>
                  <GlassInput
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={Lock}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white/60 text-xs uppercase tracking-wider font-semibold ml-1">
                    Confirmation
                  </Label>
                  <GlassInput
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    icon={Lock}
                  />
                </div>

                <GlassButton
                  type="submit"
                  variant="glass-accent"
                  size="lg"
                  className="w-full mt-6"
                >
                  S'inscrire
                </GlassButton>
              </form>

              <div className="mt-8 text-center">
                <p className="text-white/30 text-sm">
                  Tu as déjà un compte ?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-white/70 font-medium hover:text-white transition-colors hover:underline"
                  >
                    Se connecter
                  </button>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Anime Art Carousel (Desktop) */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        {/* Gradient blend from left (black) to transparent */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-10" style={{ width: '30%' }} />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-transparent z-10" />

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
