import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import logoImage from '@/assets/images/logo.png';

interface MemoryCardProps {
    id: number;
    image: string;
    isFlipped: boolean;
    isMatched: boolean;
    onClick: () => void;
    backColor?: string;
}

const MemoryCard: React.FC<MemoryCardProps> = ({
    id,
    image,
    isFlipped,
    isMatched,
    onClick,
    backColor = "bg-gradient-to-br from-cyan-500 to-blue-600"
}) => {
    return (
        <div className="relative w-full aspect-[3/4] perspective-1000 cursor-pointer group" onClick={onClick}>
            <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-500"
                animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Card Back (Hidden when flipped) */}
                <div
                    className={cn(
                        "absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-lg border-2 border-white/10 overflow-hidden bg-black",
                        "group-hover:scale-[1.02] transition-transform duration-300"
                    )}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <img
                        src={logoImage}
                        alt="Otaku Play Studio"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Card Front (Visible when flipped) */}
                <div
                    className={cn(
                        "absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-xl overflow-hidden bg-gray-900 border-2",
                        isMatched ? "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]" : "border-white/20"
                    )}
                    style={{ transform: "rotateY(180deg)", backfaceVisibility: 'hidden' }}
                >
                    <img
                        src={image}
                        alt="Character"
                        className="w-full h-full object-cover"
                    />
                    {isMatched && (
                        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                            >
                                MATCH!
                            </motion.div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default MemoryCard;
