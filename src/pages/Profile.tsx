import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Camera, Save, Settings as SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import { AvatarGenerator } from "@/components/profile/AvatarGenerator";
import { cn } from "@/lib/utils";

const Profile = () => {
    const [avatarUrl, setAvatarUrl] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=Felix");

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto pb-20">
                {/* Header Section */}
                <div className="relative mb-24 md:mb-24">
                    {/* Cover Image */}
                    <div className="h-40 md:h-64 rounded-3xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm" />
                        <img
                            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop"
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                        <button className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100">
                            <Camera className="h-5 w-5" />
                        </button>

                        {/* Settings Link */}
                        <Link to="/settings" className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10">
                            <SettingsIcon className="h-5 w-5" />
                        </Link>
                    </div>

                    {/* Avatar & Info */}
                    <div className="absolute -bottom-20 md:-bottom-16 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 w-full md:w-auto">
                        <div className="relative group">
                            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-[#0a0a0a] overflow-hidden bg-[#0a0a0a]">
                                <img
                                    src={avatarUrl}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <AvatarGenerator
                                currentAvatar={avatarUrl}
                                onSave={setAvatarUrl}
                            />
                        </div>
                        <div className="mb-2 text-center md:text-left">
                            <h1 className="text-2xl md:text-3xl font-bold text-white">SuperOtaku</h1>
                            <p className="text-white/60 text-sm md:text-base">Niveau 5 • Membre depuis 2023</p>
                        </div>
                    </div>
                </div>

                {/* Content Area - General Info Only */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8"
                >
                    <div className="space-y-8">
                        <div className="flex items-center gap-2 mb-6">
                            <User className="h-5 w-5 text-indigo-400" />
                            <h2 className="text-xl font-bold text-white">Informations Publiques</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/60">Pseudo</label>
                                <GlassInput defaultValue="SuperOtaku" icon={User} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/60">Email</label>
                                <GlassInput defaultValue="otaku@example.com" icon={Mail} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/60">Bio</label>
                            <textarea
                                className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all resize-none"
                                defaultValue="Passionné d'anime et de jeux vidéo. Toujours prêt pour un défi !"
                            />
                        </div>

                        <div className="flex justify-end">
                            <GlassButton className="bg-indigo-500 hover:bg-indigo-600 text-white border-none">
                                <Save className="mr-2 h-4 w-4" />
                                Sauvegarder
                            </GlassButton>
                        </div>
                    </div>
                </motion.div>
            </div>
        </DashboardLayout>
    );
};

export default Profile;
