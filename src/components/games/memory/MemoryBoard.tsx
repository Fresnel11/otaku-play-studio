import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MemoryCard from './MemoryCard';
import { toast } from 'sonner';

// Import assets
import narutoImg from '@/assets/images/naruto.png';
import onePieceImg from '@/assets/images/one-piece.png';
import demonSlayerImg from '@/assets/images/demon-slayer.png';
import dragonBallImg from '@/assets/images/dragon-ball.png';

// Assets configuration
const UNIVERSE_ASSETS: Record<string, string[]> = {
    'naruto': [
        narutoImg,
        onePieceImg, // Mixing for demo
        demonSlayerImg,
        dragonBallImg,
        narutoImg,
        onePieceImg,
        demonSlayerImg,
        dragonBallImg,
    ],
    'demon-slayer': [
        demonSlayerImg,
        narutoImg,
        onePieceImg,
        dragonBallImg,
        demonSlayerImg,
        narutoImg,
        onePieceImg,
        dragonBallImg,
    ],
    'one-piece': [
        onePieceImg,
        narutoImg,
        demonSlayerImg,
        dragonBallImg,
        onePieceImg,
        narutoImg,
        demonSlayerImg,
        dragonBallImg,
    ],
    'dragon-ball': [
        dragonBallImg,
        narutoImg,
        onePieceImg,
        demonSlayerImg,
        dragonBallImg,
        narutoImg,
        onePieceImg,
        demonSlayerImg,
    ],
    'multiverse': [
        narutoImg,
        onePieceImg,
        demonSlayerImg,
        dragonBallImg,
        narutoImg,
        onePieceImg,
        demonSlayerImg,
        dragonBallImg,
    ]
};

interface MemoryBoardProps {
    universe: string;
    mode: string;
    onScoreUpdate: (points: number) => void;
    onGameFinish: (result: any) => void;
}

interface Card {
    id: number;
    pairId: number;
    image: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const MemoryBoard: React.FC<MemoryBoardProps> = ({ universe, mode, onScoreUpdate, onGameFinish }) => {
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
        // Use functional update or access current cards via ref if needed, 
        // but here we just need to compare the pairIds which are constant for the indices.
        // We can use the 'cards' from the scope for reading pairId as that doesn't change.
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
                    // Check win condition inside the update to ensure we have the latest match count
                    if (newMatches === cards.length / 2) {
                        setTimeout(() => {
                            onGameFinish({ score: 1000 + (newMatches * 100), attempts: attempts + 1 });
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
            setTimeout(() => {
                setCards(prevCards => {
                    const newCards = [...prevCards];
                    newCards[index1] = { ...newCards[index1], isFlipped: false };
                    newCards[index2] = { ...newCards[index2], isFlipped: false };
                    return newCards;
                });
                setFlippedCards([]);
                setIsProcessing(false);

                if (mode === 'survival') {
                    // Survival logic placeholder
                }
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
