import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Camera, Save, Settings as SettingsIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import { AvatarGenerator } from "@/components/profile/AvatarGenerator";
import { cn } from "@/lib/utils";
import { getCurrentUser, updateProfile, UserProfile } from "@/services/userService";
import { toast } from "sonner";

const Profile = () => {
    const navigate = useNavigate();
    const [avatarUrl, setAvatarUrl] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=Felix");
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        username: '',
        bio: ''
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await getCurrentUser();
                setUserProfile(profile);
                setAvatarUrl(profile.avatar);
                setFormData({
                    username: profile.username,
                    bio: profile.bio
                });
            } catch (error) {
                console.error("Error fetching user profile:", error);
                toast.error("Impossible de charger le profil");
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const handleSave = async () => {
        if (!userProfile) return;

        setSaving(true);
        try {
            const updatedProfile = await updateProfile({
                username: formData.username,
                bio: formData.bio,
                avatar: avatarUrl
            });

            setUserProfile(updatedProfile);
            toast.success("Profil mis à jour avec succès !");
        } catch (error: any) {
            console.error("Error updating profile:", error);
            toast.error(error.response?.data?.message || "Erreur lors de la mise à jour");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-white text-xl">Chargement...</div>
                </div>
            </DashboardLayout>
        );
    }

    if (!userProfile) {
        return null;
    }

    const memberSince = new Date(userProfile.createdAt).getFullYear();

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
                            <h1 className="text-2xl md:text-3xl font-bold text-white">{userProfile.username}</h1>
                            <p className="text-white/60 text-sm md:text-base">Niveau {userProfile.level} • {userProfile.xp} XP • Membre depuis {memberSince}</p>
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
                                <GlassInput
                                    value={formData.username}
                                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                                    icon={User}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/60">Email</label>
                                <GlassInput value={userProfile.email} icon={Mail} disabled />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/60">Bio</label>
                            <textarea
                                className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all resize-none"
                                value={formData.bio}
                                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                                placeholder="Parle-nous de toi..."
                            />
                        </div>

                        <div className="flex justify-end">
                            <GlassButton
                                onClick={handleSave}
                                disabled={saving}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white border-none disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                            </GlassButton>
                        </div>
                    </div>
                </motion.div>
            </div>
        </DashboardLayout>
    );
};

export default Profile;
