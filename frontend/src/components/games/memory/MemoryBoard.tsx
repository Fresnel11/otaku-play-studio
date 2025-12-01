import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MemoryCard from './MemoryCard';
import { toast } from 'sonner';

import { ASSETS } from '@/constants/assets';

// Assets configuration
const UNIVERSE_ASSETS: Record<string, string[]> = {
    'naruto': [
        ASSETS.IMAGES.NARUTO_CHAR,
        ASSETS.IMAGES.SASUKE_CHAR,
        ASSETS.IMAGES.SAKURA_CHAR,
        ASSETS.IMAGES.KAKASHI_CHAR,
        ASSETS.IMAGES.EXTRA_1, ASSETS.IMAGES.EXTRA_2, ASSETS.IMAGES.EXTRA_3, ASSETS.IMAGES.EXTRA_4
    ],
    'demon-slayer': [
        ASSETS.IMAGES.DEMON_SLAYER_CHAR,
        ASSETS.IMAGES.NEZUKO_CHAR,
        ASSETS.IMAGES.ZENITSU_CHAR,
        ASSETS.IMAGES.EXTRA_5, ASSETS.IMAGES.EXTRA_6, ASSETS.IMAGES.EXTRA_7, ASSETS.IMAGES.EXTRA_8, ASSETS.IMAGES.EXTRA_9
    ],
    'one-piece': [
        ASSETS.IMAGES.ONE_PIECE_CHAR,
        ASSETS.IMAGES.EXTRA_10, ASSETS.IMAGES.EXTRA_11, ASSETS.IMAGES.EXTRA_12, ASSETS.IMAGES.EXTRA_13, ASSETS.IMAGES.EXTRA_14, ASSETS.IMAGES.EXTRA_15, ASSETS.IMAGES.EXTRA_16
    ],
    'dragon-ball': [
        ASSETS.IMAGES.DRAGON_BALL_CHAR,
        ASSETS.IMAGES.EXTRA_17, ASSETS.IMAGES.EXTRA_18, ASSETS.IMAGES.EXTRA_19, ASSETS.IMAGES.EXTRA_1, ASSETS.IMAGES.EXTRA_2, ASSETS.IMAGES.EXTRA_3, ASSETS.IMAGES.EXTRA_4
    ],
    'multiverse': [
        ASSETS.IMAGES.NARUTO_CHAR, ASSETS.IMAGES.SASUKE_CHAR, ASSETS.IMAGES.DEMON_SLAYER_CHAR, ASSETS.IMAGES.NEZUKO_CHAR, ASSETS.IMAGES.ONE_PIECE_CHAR, ASSETS.IMAGES.DRAGON_BALL_CHAR,
        ASSETS.IMAGES.EXTRA_1, ASSETS.IMAGES.EXTRA_2, ASSETS.IMAGES.EXTRA_3, ASSETS.IMAGES.EXTRA_4, ASSETS.IMAGES.EXTRA_5, ASSETS.IMAGES.EXTRA_6, ASSETS.IMAGES.EXTRA_7, ASSETS.IMAGES.EXTRA_8, ASSETS.IMAGES.EXTRA_9,
        ASSETS.IMAGES.EXTRA_10, ASSETS.IMAGES.EXTRA_11, ASSETS.IMAGES.EXTRA_12, ASSETS.IMAGES.EXTRA_13, ASSETS.IMAGES.EXTRA_14, ASSETS.IMAGES.EXTRA_15, ASSETS.IMAGES.EXTRA_16, ASSETS.IMAGES.EXTRA_17, ASSETS.IMAGES.EXTRA_18, ASSETS.IMAGES.EXTRA_19
    ]
};

interface MemoryBoardProps {
    universe: string;
    mode: string;
    onScoreUpdate: (points: number) => void;
    onGameFinish: (result: any) => void;
    onMistake?: (attempts: number) => void;
}

interface Card {
    id: number;
    pairId: number;
    image: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const MemoryBoard: React.FC<MemoryBoardProps> = ({ universe, mode, onScoreUpdate, onGameFinish, onMistake }) => {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]); // Store indices
    const [isProcessing, setIsProcessing] = useState(false);
    const [matches, setMatches] = useState(0);
    const [attempts, setAttempts] = useState(0);

    // Initialize Game
    useEffect(() => {
        initializeGame();
    }, [universe, mode]);

    const initializeGame = () => {
        // Determine grid size based on mode (simplified for now)
        const pairCount = mode === 'speed-rush' ? 8 : 6;
        const universeImages = UNIVERSE_ASSETS[universe] || UNIVERSE_ASSETS['multiverse'];
        const selectedImages = universeImages.slice(0, pairCount);

        // Create pairs
        const gameCards: Card[] = [];
        selectedImages.forEach((img, index) => {
            // First of pair
            gameCards.push({
                id: index * 2,
                pairId: index,
                image: img,
                isFlipped: false,
                isMatched: false
            });
            // Second of pair
            gameCards.push({
                id: index * 2 + 1,
                pairId: index,
                image: img,
                isFlipped: false,
                isMatched: false
            });
        });

        // Shuffle
        const shuffled = gameCards.sort(() => Math.random() - 0.5);
        setCards(shuffled);
        setFlippedCards([]);
        setMatches(0);
        setAttempts(0);
        setIsProcessing(false);
    };

    const handleCardClick = (index: number) => {
        if (isProcessing || cards[index].isFlipped || cards[index].isMatched) return;

        // Flip the card
        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);

        const newFlipped = [...flippedCards, index];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setIsProcessing(true);
            checkForMatch(newFlipped[0], newFlipped[1]);
        }
    };

    const checkForMatch = (index1: number, index2: number) => {
        setAttempts(prev => prev + 1);
        const card1 = cards[index1];
        const card2 = cards[index2];

        if (card1.image === card2.image) {
            // Match found
            setTimeout(() => {
                setCards(prevCards => {
                    const newCards = [...prevCards];
                    newCards[index1] = { ...newCards[index1], isMatched: true, isFlipped: true };
                    newCards[index2] = { ...newCards[index2], isMatched: true, isFlipped: true };
                    return newCards;
                });
                setFlippedCards([]);
                setIsProcessing(false);

                setMatches(prev => {
                    const newMatches = prev + 1;
                    if (newMatches === cards.length / 2) {
                        setTimeout(() => {
                            onGameFinish({ score: 1000 + (newMatches * 100), attempts: attempts + 1, success: true });
                        }, 500);
                    }
                    return newMatches;
                });

                // Scoring
                let points = 100;
                if (mode === 'speed-rush') points += 50;
                onScoreUpdate(points);

            }, 500);
        } else {
            // No match
            if (mode === 'survival') {
                onMistake?.(attempts + 1);
            }

            setTimeout(() => {
                setCards(prevCards => {
                    const newCards = [...prevCards];
                    newCards[index1] = { ...newCards[index1], isFlipped: false };
                    newCards[index2] = { ...newCards[index2], isFlipped: false };
                    return newCards;
                });
                setFlippedCards([]);
                setIsProcessing(false);
            }, 1000);
        }
    };

    return (
        <div className="grid grid-cols-4 gap-4 w-full max-w-2xl mx-auto">
            <AnimatePresence>
                {cards.map((card, index) => (
                    <motion.div
                        key={card.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <MemoryCard
                            id={card.id}
                            image={card.image}
                            isFlipped={card.isFlipped}
                            isMatched={card.isMatched}
                            onClick={() => handleCardClick(index)}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default MemoryBoard;
