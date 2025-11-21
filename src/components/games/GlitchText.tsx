import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
    text: string;
    className?: string;
    duration?: number; // Duration of glitch effect in ms
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className, duration = 800 }) => {
    const [isGlitching, setIsGlitching] = useState(true);
    const [displayText, setDisplayText] = useState(text);

    // Characters to use for glitch effect
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    useEffect(() => {
        setIsGlitching(true);
        let interval: NodeJS.Timeout;
        let timeout: NodeJS.Timeout;

        // Glitch animation loop
        interval = setInterval(() => {
            setDisplayText(
                text.split('').map((char, index) => {
                    if (char === ' ') return ' ';
                    // Randomly replace characters
                    if (Math.random() < 0.5) {
                        return chars[Math.floor(Math.random() * chars.length)];
                    }
                    return char;
                }).join('')
            );
        }, 50);

        // Stop glitching after duration
        timeout = setTimeout(() => {
            clearInterval(interval);
            setDisplayText(text);
            setIsGlitching(false);
        }, duration);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [text, duration]);

    return (
        <div className={`relative inline-block ${className}`}>
            <motion.span
                className="relative z-10"
                animate={{ opacity: isGlitching ? 0.8 : 1 }}
            >
                {displayText}
            </motion.span>

            {/* CSS Glitch Layers (Red/Blue offset) */}
            {isGlitching && (
                <>
                    <span className="absolute top-0 left-0 -ml-[2px] text-red-500 opacity-70 animate-pulse">
                        {displayText}
                    </span>
                    <span className="absolute top-0 left-0 ml-[2px] text-blue-500 opacity-70 animate-pulse delay-75">
                        {displayText}
                    </span>
                </>
            )}
        </div>
    );
};

export default GlitchText;
