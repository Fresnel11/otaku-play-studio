import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, User, Mail, Lock, Sparkles } from "lucide-react";
import { ASSETS } from '@/constants/assets';
const welcomeArt = ASSETS.IMAGES.REGISTER_ART;
const ninjaArt = ASSETS.IMAGES.NINJA_CHARACTER;
const heroineArt = ASSETS.IMAGES.BLACK_HEROINE;
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstname || !lastname || !username || !email || !password || !confirmPassword) {
      toast.error("Remplis tous les champs !");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        firstname,
        lastname,
        username,
        email,
        password
      });

      if (response.data.success) {
        const { token, user } = response.data.data;

        // Store auth data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        toast.success("Bienvenue dans la communauté otaku ! 🎉");
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Erreur lors de l'inscription";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] overflow-hidden">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative z-20">
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
                  Créer un compte
                </h1>
                <p className="text-white/40 text-xs sm:text-sm">
                  Rejoins la communauté et commence l'aventure
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstname" className="text-white/60 text-xs uppercase tracking-wider font-semibold ml-1 hidden sm:block">
                      Prénom
                    </Label>
                    <GlassInput
                      id="firstname"
                      type="text"
                      placeholder="Naruto"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      icon={User}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname" className="text-white/60 text-xs uppercase tracking-wider font-semibold ml-1 hidden sm:block">
                      Nom
                    </Label>
                    <GlassInput
                      id="lastname"
                      type="text"
                      placeholder="Uzumaki"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      icon={User}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white/60 text-xs uppercase tracking-wider font-semibold ml-1 hidden sm:block">
                    Pseudo
                  </Label>
                  <GlassInput
                    id="username"
                    type="text"
                    placeholder="Ton pseudo de héros"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    icon={User}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/60 text-xs uppercase tracking-wider font-semibold ml-1 hidden sm:block">
                    Email
                  </Label>
                  <GlassInput
                    id="email"
                    type="email"
                    placeholder="exemple@email.com"
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white/60 text-xs uppercase tracking-wider font-semibold ml-1 hidden sm:block">
                    Confirmation
                  </Label>
                  <GlassInput
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                  {isLoading ? "Inscription..." : "S'inscrire"}
                </GlassButton>
              </form>

              <div className="mt-6 sm:mt-8 text-center">
                <p className="text-white/30 text-xs sm:text-sm">
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
