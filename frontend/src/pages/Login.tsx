import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Mail, Lock, Sparkles } from "lucide-react";
import { ASSETS } from '@/constants/assets';
const loginArt = ASSETS.IMAGES.LOGIN_ART;
const mascotCity = ASSETS.IMAGES.MASCOT_CITY;
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: loginArt, alt: "Welcome Back Art", isTransparent: false },
    { src: mascotCity, alt: "Mascot in Neon City", isTransparent: false },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Remplis tous les champs !");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      if (response.data.success) {
        const { token, user } = response.data.data;

        // Store auth data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        toast.success(`Bon retour, ${user.username} ! 🎉`);
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const message = error.response?.data?.message || "Erreur de connexion. Vérifie tes identifiants.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] overflow-hidden">
      {/* Left Side - Anime Art (Desktop) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:block lg:w-1/2 relative overflow-hidden"
      >
        {/* Dynamic Background for transparent images */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-[#0a0a0a] to-purple-900/40 z-0" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            <img
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              className={`w-full h-full object-cover ${images[currentImageIndex].isTransparent ? 'object-contain scale-90' : 'object-cover'}`}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient blend from right (black) to transparent */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-10" style={{ width: '30%', left: 'auto', right: 0 }} />

        <div className="absolute bottom-20 left-12 z-20 max-w-md">
          <h2 className="text-5xl font-heading font-bold text-white mb-4 drop-shadow-lg">
            Bon retour !
          </h2>
          <p className="text-xl text-white/80 font-medium">
            Prêt à reprendre ta place dans le classement ?
          </p>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative z-20">
        {/* Mobile Background Image */}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-sm sm:max-w-md relative z-10"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </button>

          <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Subtle Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 mb-4 shadow-inner">
                  <Sparkles className="h-6 w-6 text-white/70" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2 tracking-tight">
                  Connexion
                </h1>
                <p className="text-white/40 text-xs sm:text-sm">
                  Accède à ton espace Otaku
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/60 text-xs uppercase tracking-wider font-semibold ml-1 hidden sm:block">
                    Email
                  </Label>
                  <GlassInput
                    id="email"
                    type="email"
                    placeholder="ton-email@otaku.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={Mail}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/60 text-xs uppercase tracking-wider font-semibold ml-1 hidden sm:block">
                    Mot de passe
                  </Label>
                  <GlassInput
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={Lock}
                    disabled={isLoading}
                  />
                </div>

                <GlassButton
                  type="submit"
                  variant="glass-accent"
                  size="lg"
                  className="w-full mt-4 sm:mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion..." : "Se connecter ✨"}
                </GlassButton>
              </form>

              <div className="mt-6 sm:mt-8 text-center">
                <p className="text-white/30 text-xs sm:text-sm">
                  Pas encore de compte ?{" "}
                  <button
                    onClick={() => navigate("/register")}
                    className="text-white/70 font-medium hover:text-white transition-colors hover:underline"
                  >
                    Inscris-toi ici
                  </button>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
