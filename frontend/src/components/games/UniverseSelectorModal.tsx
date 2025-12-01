import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Scroll, Anchor, Sword, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UniverseSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectUniverse: (universe: string) => void;
}

import { ASSETS } from '@/constants/assets';
const multiverseImg = ASSETS.IMAGES.ANIME_MULTIVERSE;
const narutoImg = ASSETS.IMAGES.NARUTO;
const onePieceImg = ASSETS.IMAGES.ONE_PIECE;
const demonSlayerImg = ASSETS.IMAGES.DEMON_SLAYER_2;

const UNIVERSES = [
    {
        id: 'mixed',
        title: 'Multivers Anime',
        description: 'Un mélange explosif de tous les animes !',
        icon: Globe,
        color: 'from-purple-500 to-indigo-600',
        textColor: 'text-purple-400',
        image: multiverseImg,
        available: true
    },
    {
        id: 'naruto',
        title: 'Univers Naruto',
        description: 'Prouve que tu es le meilleur ninja !',
        icon: Scroll,
        color: 'from-orange-500 to-red-600',
        textColor: 'text-orange-400',
        image: narutoImg,
        available: true
    },
    {
        id: 'one-piece',
        title: 'One Piece',
        description: 'Pars à la recherche du trésor ultime !',
        icon: Anchor,
        color: 'from-blue-500 to-cyan-600',
        textColor: 'text-blue-400',
        image: onePieceImg,
        available: true
    },
    {
        id: 'demon-slayer',
        title: 'Demon Slayer',
        description: 'Deviens un pourfendeur de démons !',
        icon: Sword,
        color: 'from-red-500 to-pink-600',
        textColor: 'text-red-400',
        image: demonSlayerImg,
        available: true
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
                    className="relative w-full max-w-6xl mx-4 bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

                    {/* Header */}
                    <div className="relative z-10 flex items-start justify-between mb-6 md:mb-8">
                        <div className="flex-1 pr-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Choisis ton Univers
                            </h2>
                            <p className="text-white/60 text-sm md:text-base">
                                Dans quel monde veux-tu tester tes connaissances ?
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl hover:bg-white/5 transition-colors text-white/60 hover:text-white flex-shrink-0"
                        >
                            <X className="h-5 w-5 md:h-6 md:w-6" />
                        </button>
                    </div>

                    {/* Universe Grid */}
                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                        {UNIVERSES.map((universe) => (
                            <button
                                key={universe.id}
                                onClick={() => universe.available && onSelectUniverse(universe.id)}
                                disabled={!universe.available}
                                className={cn(
                                    "group relative h-48 sm:h-64 lg:h-80 rounded-2xl md:rounded-3xl overflow-hidden border transition-all duration-500 text-left flex flex-col justify-end p-4 md:p-6",
                                    universe.available
                                        ? "border-white/10 hover:border-white/40 hover:scale-[1.02] cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20"
                                        : "border-white/5 opacity-60 cursor-not-allowed grayscale"
                                )}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={universe.image}
                                        alt={universe.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 transform transition-transform duration-300 group-hover:-translate-y-1 md:group-hover:-translate-y-2">
                                    {/* Icon */}
                                    <div className={cn(
                                        "w-8 h-8 md:w-10 lg:w-12 md:h-10 lg:h-12 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 backdrop-blur-md border border-white/10 shadow-lg",
                                        "bg-white/10 group-hover:bg-white/20 transition-colors duration-300",
                                        universe.textColor
                                    )}>
                                        {universe.available ? (
                                            <universe.icon className="h-4 w-4 md:h-5 lg:h-6 md:w-5 lg:w-6" />
                                        ) : (
                                            <Lock className="h-3 w-3 md:h-4 lg:h-5 md:w-4 lg:w-5" />
                                        )}
                                    </div>

                                    <h3 className={cn(
                                        "text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2 transition-colors drop-shadow-lg",
                                        universe.available ? "text-white" : "text-white/70"
                                    )}>
                                        {universe.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-white/70 leading-relaxed max-w-[95%] md:max-w-[90%] drop-shadow-md">
                                        {universe.description}
                                    </p>
                                </div>

                                {/* Hover Glow Effect */}
                                <div className={cn(
                                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay",
                                    "bg-gradient-to-t",
                                    universe.color
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
