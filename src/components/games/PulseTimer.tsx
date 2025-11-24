import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PulseTimerProps {
    duration: number; // in seconds
    onComplete: () => void;
    isActive: boolean;
    isOverdrive: boolean;
}

const PulseTimer: React.FC<PulseTimerProps> = ({ duration, onComplete, isActive, isOverdrive }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (isActive) {
            setTimeLeft(duration);
        }
    }, [isActive, duration]);

    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                const decrement = isOverdrive ? 0.05 : 0.1;
                return Math.max(0, prev - decrement);
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isActive, isOverdrive]);

    useEffect(() => {
        if (timeLeft === 0 && isActive) {
            onComplete();
        }
    }, [timeLeft, isActive, onComplete]);

    const percentage = (timeLeft / duration) * 100;

    // Glassmorphism colors
    const normalColor = 'bg-blue-500';
    const warningColor = 'bg-yellow-500';
    const dangerColor = 'bg-red-500';
    const overdriveColor = 'bg-purple-500';

    let currentColor = normalColor;
    if (isOverdrive) currentColor = overdriveColor;
    else if (timeLeft < 3) currentColor = dangerColor;
    else if (timeLeft < 6) currentColor = warningColor;

    return (
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
            <motion.div
                className={`h-full ${currentColor} shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                style={{ width: `${percentage}%` }}
                animate={{
                    opacity: isOverdrive ? [0.8, 1, 0.8] : 1
                }}
                transition={{ duration: 0.5, repeat: isOverdrive ? Infinity : 0 }}
            />
        </div>
    );
};

export default PulseTimer;
