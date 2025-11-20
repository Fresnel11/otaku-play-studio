import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Home,
    Gamepad2,
    Trophy,
    User,
    Settings,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { icon: Home, label: "Accueil", path: "/dashboard" },
        { icon: Gamepad2, label: "Jeux", path: "/games" },
        { icon: Trophy, label: "Classement", path: "/leaderboard" },
        { icon: User, label: "Profil", path: "/profile" },
        { icon: Settings, label: "Paramètres", path: "/settings" },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex relative overflow-hidden">
            {/* Background Gradients - Subtle & Monochrome */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[150px]" />
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/[0.02] backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 ease-in-out lg:transform-none flex flex-col",
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="p-6 flex items-center justify-between">
                    <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        Otaku Play
                    </h1>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="lg:hidden text-white/70 hover:text-white"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => {
                                navigate(item.path);
                                setIsMobileMenuOpen(false);
                            }}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive(item.path)
                                    ? "bg-white/10 text-white shadow-lg border border-white/10"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn(
                                "h-5 w-5 transition-colors",
                                isActive(item.path) ? "text-white" : "text-white/60 group-hover:text-white"
                            )} />
                            <span className="font-medium">{item.label}</span>
                            {isActive(item.path) && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
                                />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <GlassButton
                        variant="ghost"
                        className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        onClick={() => navigate("/")}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Déconnexion
                    </GlassButton>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 relative z-10 flex flex-col h-screen overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden p-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02] backdrop-blur-xl">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="text-white p-2"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="font-heading font-bold text-lg">Otaku Play</span>
                    <div className="w-10" /> {/* Spacer for centering */}
                </header>

                <div className="flex-1 overflow-y-auto p-4 lg:p-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
