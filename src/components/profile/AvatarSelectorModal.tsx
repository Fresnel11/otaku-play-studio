import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { GlassButton } from '@/components/ui/GlassButton';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface AvatarSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectAvatar: (avatarUrl: string) => void;
    currentAvatar: string;
}

// Pre-generated avatar options using DiceBear
const DEFAULT_AVATARS = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&radius=50',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&radius=50',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Luna&radius=50',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Kai&radius=50',
    'https://api.dicebear.com/7.x/bottts/svg?seed=Sakura&radius=50',
];

const AVATAR_STYLES = [
    { label: 'Avataaars', value: 'avataaars' },
    { label: 'Adventurer', value: 'adventurer' },
    { label: 'Bottts (Robot)', value: 'bottts' },
    { label: 'Big Smile', value: 'big-smile' },
    { label: 'Pixel Art', value: 'pixel-art' },
];

const BACKGROUND_COLORS = [
    { label: 'Transparent', value: 'transparent' },
    { label: 'Bleu', value: '3b82f6' },
    { label: 'Violet', value: '8b5cf6' },
    { label: 'Rose', value: 'ec4899' },
    { label: 'Vert', value: '10b981' },
    { label: 'Orange', value: 'f59e0b' },
];

export const AvatarSelectorModal = ({
    isOpen,
    onClose,
    onSelectAvatar,
    currentAvatar,
}: AvatarSelectorModalProps) => {
    const [mode, setMode] = useState<'select' | 'generate'>('select');
    const [generatedAvatar, setGeneratedAvatar] = useState<string | null>(null);

    // DiceBear Generation form state
    const [avatarStyle, setAvatarStyle] = useState('avataaars');
    const [seedText, setSeedText] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('transparent');

    const handleSelectDefault = (avatarUrl: string) => {
        onSelectAvatar(avatarUrl);
        onClose();
    };

    const handleGenerateAvatar = () => {
        try {
            // Generate seed from text or random
            const seed = seedText || Math.random().toString(36).substring(7);

            // Build DiceBear URL
            const params = new URLSearchParams({
                seed,
                radius: '50',
                size: '200'
            });

            if (backgroundColor !== 'transparent') {
                params.append('backgroundColor', backgroundColor);
            }

            const avatarUrl = `https://api.dicebear.com/7.x/${avatarStyle}/svg?${params.toString()}`;
            setGeneratedAvatar(avatarUrl);
            toast.success('Avatar généré !');

        } catch (error: any) {
            console.error('Error generating avatar:', error);
            toast.error('Erreur lors de la génération');
        }
    };

    const handleSaveGenerated = () => {
        if (generatedAvatar) {
            onSelectAvatar(generatedAvatar);
            onClose();
        }
    };

    if (!isOpen) return null;

    const modalContent = (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white">
                            Choisir un avatar
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl hover:bg-white/5 transition-colors text-white/60 hover:text-white"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex gap-3 mb-8">
                        <button
                            onClick={() => setMode('select')}
                            className={cn(
                                "flex-1 px-6 py-3 rounded-xl font-medium transition-all",
                                mode === 'select'
                                    ? "bg-white/10 text-white border border-white/20"
                                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5"
                            )}
                        >
                            Avatars par défaut
                        </button>
                        <button
                            onClick={() => setMode('generate')}
                            className={cn(
                                "flex-1 px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2",
                                mode === 'generate'
                                    ? "bg-white/10 text-white border border-white/20"
                                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5"
                            )}
                        >
                            <Sparkles className="h-4 w-4" />
                            Générer personnalisé
                        </button>
                    </div>

                    {/* Content */}
                    {mode === 'select' ? (
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                            {DEFAULT_AVATARS.map((avatar, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelectDefault(avatar)}
                                    className={cn(
                                        "aspect-square rounded-2xl overflow-hidden border-2 transition-all hover:scale-105",
                                        currentAvatar === avatar
                                            ? "border-white/40 ring-2 ring-white/20"
                                            : "border-white/10 hover:border-white/30"
                                    )}
                                >
                                    <img
                                        src={avatar}
                                        alt={`Avatar ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {!generatedAvatar ? (
                                <>
                                    {/* Avatar Style */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-white/80">Style d'avatar</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {AVATAR_STYLES.map((s) => (
                                                <button
                                                    key={s.value}
                                                    onClick={() => setAvatarStyle(s.value)}
                                                    className={cn(
                                                        "px-4 py-3 rounded-xl font-medium transition-all",
                                                        avatarStyle === s.value
                                                            ? "bg-white/10 text-white border border-white/20"
                                                            : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5"
                                                    )}
                                                >
                                                    {s.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Seed Text */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-white/80">
                                            Texte personnalisé (optionnel)
                                        </label>
                                        <input
                                            type="text"
                                            value={seedText}
                                            onChange={(e) => setSeedText(e.target.value)}
                                            placeholder="Ex: mon-pseudo, ninja-123..."
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
                                        />
                                        <p className="text-xs text-white/40">
                                            Laissez vide pour générer aléatoirement
                                        </p>
                                    </div>

                                    {/* Background Color */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-white/80">Couleur de fond</label>
                                        <select
                                            value={backgroundColor}
                                            onChange={(e) => setBackgroundColor(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
                                        >
                                            {BACKGROUND_COLORS.map((color) => (
                                                <option key={color.value} value={color.value} className="bg-[#0a0a0a]">
                                                    {color.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Generate Button */}
                                    <GlassButton
                                        onClick={handleGenerateAvatar}
                                        className="w-full bg-white/10 hover:bg-white/20 border-white/20"
                                        size="lg"
                                    >
                                        <Sparkles className="mr-2 h-5 w-5" />
                                        Générer l'avatar
                                    </GlassButton>
                                </>
                            ) : (
                                <div className="space-y-6">
                                    {/* Generated Avatar Preview */}
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-48 h-48 rounded-2xl overflow-hidden border-2 border-white/20">
                                            <img
                                                src={generatedAvatar}
                                                alt="Generated avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="text-white/60 text-sm text-center">
                                            Votre avatar personnalisé
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <GlassButton
                                            onClick={() => setGeneratedAvatar(null)}
                                            variant="ghost"
                                            className="flex-1"
                                        >
                                            Régénérer
                                        </GlassButton>
                                        <GlassButton
                                            onClick={handleSaveGenerated}
                                            className="flex-1 bg-white/10 hover:bg-white/20 border-white/20"
                                        >
                                            Sauvegarder
                                        </GlassButton>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};
