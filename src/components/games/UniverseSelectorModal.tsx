import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Scroll, Anchor, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UniverseSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectUniverse: (universe: string) => void;
}

const UNIVERSES = [
    {
        id: 'mixed',
        title: 'Multivers Anime',
        description: 'Un mélange explosif de tous les animes !',
        icon: Globe,
        color: 'from-purple-500 to-indigo-600',
        textColor: 'text-purple-400',
        available: true
    },
    {
        id: 'naruto',
        title: 'Univers Naruto',
        description: 'Prouve que tu es le meilleur ninja !',
        icon: Scroll,
        color: 'from-orange-500 to-red-600',
        textColor: 'text-orange-400',
        available: true
    },
    {
        id: 'one-piece',
        title: 'One Piece',
        description: 'Bientôt disponible...',
        icon: Anchor,
        color: 'from-blue-500 to-cyan-600',
        textColor: 'text-blue-400',
        available: false
    }
];

export const UniverseSelectorModal = ({
    isOpen,
    onClose,
    onSelectUniverse,
}: UniverseSelectorModalProps) => {
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
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-8 overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

                    {/* Header */}
                    <div className="relative z-10 flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">
                                Choisis ton Univers
                            </h2>
                            <p className="text-white/60">
                                Dans quel monde veux-tu tester tes connaissances ?
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl hover:bg-white/5 transition-colors text-white/60 hover:text-white"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Universe Grid */}
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {UNIVERSES.map((universe) => (
                            <button
                                key={universe.id}
                                onClick={() => universe.available && onSelectUniverse(universe.id)}
                                disabled={!universe.available}
                                className={cn(
                                    "group relative h-64 rounded-2xl overflow-hidden border transition-all duration-300 text-left p-6 flex flex-col",
                                    universe.available
                                        ? "border-white/10 hover:border-white/30 hover:scale-[1.02] cursor-pointer"
                                        : "border-white/5 opacity-60 cursor-not-allowed"
                                )}
                            >
                                {/* Background Gradient */}
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-br opacity-10 transition-opacity duration-300 group-hover:opacity-20",
                                    universe.color
                                )} />

                                {/* Icon */}
                                <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center mb-auto transition-transform duration-300 group-hover:scale-110 bg-white/5 border border-white/10",
                                    universe.textColor
                                )}>
                                    {universe.available ? (
                                        <universe.icon className="h-6 w-6" />
                                    ) : (
                                        <Lock className="h-5 w-5" />
                                    )}
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className={cn(
                                        "text-xl font-bold mb-2 transition-colors",
                                        universe.available ? "text-white" : "text-white/50"
                                    )}>
                                        {universe.title}
                                    </h3>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        {universe.description}
                                    </p>
                                </div>

                                {/* Hover Effect Border */}
                                <div className={cn(
                                    "absolute inset-0 border-2 border-transparent rounded-2xl transition-colors duration-300",
                                    universe.available && "group-hover:border-white/10"
                                )} />
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};
