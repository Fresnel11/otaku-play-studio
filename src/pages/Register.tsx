import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FunButton from "@/components/FunButton";
import FunCard from "@/components/FunCard";
import Mascot3D from "@/components/Mascot3D";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, User, Mail, Lock } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background decorations */}
      <motion.div
        className="absolute top-20 left-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], y: [0, -30, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left side - Register Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FunButton
            variant="secondary"
            size="sm"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </FunButton>

          <FunCard glow="accent" className="p-8">
            <h1 className="text-4xl font-heading font-bold mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Inscription
            </h1>
            <p className="text-muted-foreground mb-8">
              Rejoins la communauté otaku ! 🌟
            </p>

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="font-heading">
                  <User className="inline mr-2 h-4 w-4" />
                  Pseudo
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="SuperOtaku123"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 rounded-xl border-2 focus:border-accent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-heading">
                  <Mail className="inline mr-2 h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ton-email@otaku.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-2 focus:border-accent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-heading">
                  <Lock className="inline mr-2 h-4 w-4" />
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl border-2 focus:border-accent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="font-heading">
                  <Lock className="inline mr-2 h-4 w-4" />
                  Confirmer le mot de passe
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 rounded-xl border-2 focus:border-accent"
                />
              </div>

              <FunButton type="submit" variant="accent" size="lg" className="w-full">
                Créer mon compte 🚀
              </FunButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Déjà inscrit ?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-accent font-semibold hover:underline"
                >
                  Connecte-toi ici
                </button>
              </p>
            </div>
          </FunCard>
        </motion.div>

        {/* Right side - 3D Mascot */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="h-[500px] relative">
            <Mascot3D animation="happy" />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-heading font-bold text-center mt-6"
          >
            Bienvenue parmi nous ! 🎉
          </motion.h2>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
