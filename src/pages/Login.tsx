import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FunButton from "@/components/FunButton";
import FunCard from "@/components/FunCard";
// import Mascot3D from "@/components/Mascot3D";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Mail, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Remplis tous les champs !");
      return;
    }
    toast.success("Connexion réussie ! 🎉");
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background decorations */}
      <motion.div
        className="absolute top-10 right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left side - 3D Mascot */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="h-[500px] relative">
            {/* <Mascot3D animation="wave" /> */}
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-heading font-bold text-center mt-6"
          >
            Content de te revoir ! 👋
          </motion.h2>
        </motion.div>

        {/* Right side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
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

          <FunCard glow="secondary" className="p-8">
            <h1 className="text-4xl font-heading font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Connexion
            </h1>
            <p className="text-muted-foreground mb-8">
              Retrouve tes jeux et ton classement ! 🎮
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
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
                  className="h-12 rounded-xl border-2 focus:border-primary"
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
                  className="h-12 rounded-xl border-2 focus:border-primary"
                />
              </div>

              <FunButton type="submit" variant="primary" size="lg" className="w-full">
                Se connecter ✨
              </FunButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Pas encore de compte ?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-primary font-semibold hover:underline"
                >
                  Inscris-toi ici
                </button>
              </p>
            </div>
          </FunCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
