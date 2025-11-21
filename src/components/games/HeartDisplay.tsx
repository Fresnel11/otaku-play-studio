import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface HeartDisplayProps {
    lives: number;
    maxLives?: number;
}

const HeartDisplay: React.FC<HeartDisplayProps> = ({ lives, maxLives = 3 }) => {
    return (
        <div className="flex items-center gap-2">
            {Array.from({ length: maxLives }).map((_, index) => {
                const isActive = index < lives;
                return (
                    <div key={index} className="relative">
                        <AnimatePresence mode="wait">
                            {isActive ? (
                                <motion.div
                                    key="active"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 1.5, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <Heart
                                        className="w-8 h-8 text-red-500 fill-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                                        strokeWidth={0}
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="broken"
                                    initial={{ scale: 1, opacity: 1 }}
                                    animate={{ scale: 1, opacity: 0.3 }}
                                    className="relative"
                                >
                                    <Heart
                                        className="w-8 h-8 text-gray-700 fill-gray-900/50"
                                        strokeWidth={1.5}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
};

export default HeartDisplay;
