import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import QuizGame from "./pages/QuizGame";
import Score from "./pages/Score";
import NotFound from "./pages/NotFound";
import SpeedPulseGame from "./pages/games/SpeedPulseGame";
import SurvivalGame from "./pages/games/SurvivalGame";
import QuizGallery from "./pages/games/QuizGallery";
import MemoryGame from "./pages/games/MemoryGame";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/games" element={<Games />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/quiz" element={<QuizGame />} />
          <Route path="/score" element={<Score />} />
          <Route path="/games/quiz" element={<QuizGallery />} />
          <Route path="/games/quiz/speed-pulse" element={<SpeedPulseGame />} />
          <Route path="/games/memory" element={<MemoryGame />} />
          <Route path="/games/survival" element={<SurvivalGame />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
