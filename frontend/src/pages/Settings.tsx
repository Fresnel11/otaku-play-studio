import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Bell, Lock, LogOut, Globe, Moon, Sun } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import { cn } from "@/lib/utils";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("account");

    const tabs = [
        { id: "account", label: "Compte", icon: Shield },
        { id: "preferences", label: "Préférences", icon: Bell },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto pb-20 pt-8 px-4 md:px-0">
                <h1 className="text-3xl font-bold text-white mb-8">Paramètres</h1>

                {/* Tabs Navigation */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide w-full justify-start">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-xl font-medium transition-all whitespace-nowrap text-sm md:text-base",
                                activeTab === tab.id
                                    ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/10"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8"
                >
                    {activeTab === "account" && (
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-white">Sécurité</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/60">Mot de passe actuel</label>
                                        <GlassInput type="password" placeholder="••••••••" icon={Lock} />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/60">Nouveau mot de passe</label>
                                            <GlassInput type="password" placeholder="••••••••" icon={Lock} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/60">Confirmer le mot de passe</label>
                                            <GlassInput type="password" placeholder="••••••••" icon={Lock} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/5">
                                <h3 className="text-xl font-bold text-red-400 mb-4">Zone Danger</h3>
                                <GlassButton className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Se déconnecter
                                </GlassButton>
                            </div>
                        </div>
                    )}

                    {activeTab === "preferences" && (
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-white">Notifications</h3>
                                <div className="space-y-4">
                                    {[
                                        "Notifications par email",
                                        "Nouveaux défis",
                                        "Messages d'amis",
                                        "Mises à jour du jeu"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                            <span className="text-white">{item}</span>
                                            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer bg-indigo-500">
                                                <span className="absolute left-6 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out shadow-sm" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-white">Langue</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {["Français", "English", "日本語"].map((lang) => (
                                        <button
                                            key={lang}
                                            className={cn(
                                                "p-4 rounded-xl border text-center transition-all",
                                                lang === "Français"
                                                    ? "bg-indigo-500/20 border-indigo-500/50 text-white"
                                                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                                            )}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
