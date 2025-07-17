
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const emojis = ['🎮', '🎯', '⚡', '🎲', '🔥', '💎', '🌟', '🎪'];

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find(card => card.id === first);
      const secondCard = cards.find(card => card.id === second);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        setCards(prev => prev.map(card => 
          card.id === first || card.id === second 
            ? { ...card, isMatched: true }
            : card
        ));
        setScore(prev => prev + 10);
      }

      setTimeout(() => {
        setCards(prev => prev.map(card => 
          !card.isMatched ? { ...card, isFlipped: false } : card
        ));
        setFlippedCards([]);
        setMoves(prev => prev + 1);
      }, 1000);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setGameWon(true);
    }
  }, [cards]);

  const initializeGame = () => {
    const gameCards: Card[] = [];
    emojis.forEach((emoji, index) => {
      gameCards.push(
        { id: index * 2, emoji, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, emoji, isFlipped: false, isMatched: false }
      );
    });
    
    // Shuffle cards
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setScore(0);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    setFlippedCards(prev => [...prev, cardId]);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-cyan-400">Instructions</h3>
        <p className="text-gray-400 text-sm">
          Click cards to flip them. Match pairs to score points!
        </p>
      </div>

      <div className="flex justify-center space-x-8 text-center">
        <div className="space-y-1">
          <p className="text-cyan-400 font-semibold">Score</p>
          <p className="text-xl font-bold">{score}</p>
        </div>
        <div className="space-y-1">
          <p className="text-purple-400 font-semibold">Moves</p>
          <p className="text-xl font-bold">{moves}</p>
        </div>
      </div>

      {gameWon && (
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold text-green-400">🎉 You Won! 🎉</p>
          <p className="text-gray-400">Completed in {moves} moves!</p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-3 p-4 bg-gray-800/50 rounded-lg">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={cn(
              "w-16 h-16 rounded-lg border-2 transition-all duration-300",
              "flex items-center justify-center text-2xl font-bold",
              card.isFlipped || card.isMatched
                ? "border-cyan-500 bg-cyan-500/20"
                : "border-cyan-500/30 bg-gray-700 hover:border-cyan-500/60 hover:bg-gray-600",
              card.isMatched && "border-green-500 bg-green-500/20"
            )}
          >
            {card.isFlipped || card.isMatched ? card.emoji : '❓'}
          </button>
        ))}
      </div>

      <button
        onClick={initializeGame}
        className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-medium hover:from-cyan-600 hover:to-purple-600 transition-all"
      >
        New Game
      </button>
    </div>
  );
}
