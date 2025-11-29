import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MemoryCard from './MemoryCard';
import { toast } from 'sonner';

// Import assets
import narutoImg from '@/assets/images/naruto.png';
import sasukeImg from '@/assets/images/sasuke.png';
import sakuraImg from '@/assets/images/sakura.png';
import kakashiImg from '@/assets/images/kakashi.png';

import onePieceImg from '@/assets/images/one-piece.png';

import demonSlayerImg from '@/assets/images/demon-slayer.png';
import nezukoImg from '@/assets/images/nezuko.png';
import zenitsuImg from '@/assets/images/zenitsu.png';

import dragonBallImg from '@/assets/images/dragon-ball.png';

// New Assets (User Provided)
import extra1 from '@/assets/images/Gemini_Generated_Image_7yxnwc7yxnwc7yxn.png';
import extra2 from '@/assets/images/Gemini_Generated_Image_33s1z233s1z233s1.png';
import extra3 from '@/assets/images/Gemini_Generated_Image_87jipc87jipc87ji.png';
import extra4 from '@/assets/images/Gemini_Generated_Image_an1my2an1my2an1m.png';
import extra5 from '@/assets/images/Gemini_Generated_Image_clxbhdclxbhdclxb.png';
import extra6 from '@/assets/images/Gemini_Generated_Image_einqfgeinqfgeinq.png';
import extra7 from '@/assets/images/Gemini_Generated_Image_evbgp6evbgp6evbg.png';
import extra8 from '@/assets/images/Gemini_Generated_Image_f2bh8jf2bh8jf2bh.png';
import extra9 from '@/assets/images/Gemini_Generated_Image_g2edzag2edzag2ed.png';
import extra10 from '@/assets/images/Gemini_Generated_Image_gfiwkbgfiwkbgfiw.png';
import extra11 from '@/assets/images/Gemini_Generated_Image_gu4kzugu4kzugu4k.png';
import extra12 from '@/assets/images/Gemini_Generated_Image_h32dxlh32dxlh32d.png';
import extra13 from '@/assets/images/Gemini_Generated_Image_i2ioqki2ioqki2io.png';
import extra14 from '@/assets/images/Gemini_Generated_Image_i06sr7i06sr7i06s.png';
import extra15 from '@/assets/images/Gemini_Generated_Image_lypr6clypr6clypr.png';
import extra16 from '@/assets/images/Gemini_Generated_Image_m9y9l5m9y9l5m9y9.png';
import extra17 from '@/assets/images/Gemini_Generated_Image_n54p2en54p2en54p.png';
import extra18 from '@/assets/images/Gemini_Generated_Image_qcvu2yqcvu2yqcvu.png';
import extra19 from '@/assets/images/Gemini_Generated_Image_tthl4gtthl4gtthl.png';

// Assets configuration
const UNIVERSE_ASSETS: Record<string, string[]> = {
    'naruto': [
        narutoImg,
        sasukeImg,
        sakuraImg,
        kakashiImg,
        extra1, extra2, extra3, extra4 // Adding variety
    ],
    'demon-slayer': [
        demonSlayerImg,
        nezukoImg,
        zenitsuImg,
        extra5, extra6, extra7, extra8, extra9 // Adding variety
    ],
    'one-piece': [
        onePieceImg,
        extra10, extra11, extra12, extra13, extra14, extra15, extra16
    ],
    'dragon-ball': [
        dragonBallImg,
        extra17, extra18, extra19, extra1, extra2, extra3, extra4 // Mixing some extras
    ],
    'multiverse': [
        narutoImg, sasukeImg, demonSlayerImg, nezukoImg, onePieceImg, dragonBallImg,
        extra1, extra2, extra3, extra4, extra5, extra6, extra7, extra8, extra9,
        extra10, extra11, extra12, extra13, extra14, extra15, extra16, extra17, extra18, extra19
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
