
import { useState } from 'react';
import { cn } from '@/lib/utils';

type Choice = 'rock' | 'paper' | 'scissors';
type Result = 'win' | 'lose' | 'tie';

interface GameResult {
  player: Choice;
  computer: Choice;
  result: Result;
}

export default function RockPaperScissors() {
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const choices: Choice[] = ['rock', 'paper', 'scissors'];
  const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' };

  const getWinner = (player: Choice, computer: Choice): Result => {
    if (player === computer) return 'tie';
    
    const winConditions = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper'
    };

    return winConditions[player] === computer ? 'win' : 'lose';
  };

  const playGame = (playerChoice: Choice) => {
    setIsPlaying(true);
    
    setTimeout(() => {
      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      const result = getWinner(playerChoice, computerChoice);
      
      setGameResult({
        player: playerChoice,
        computer: computerChoice,
        result
      });

      if (result === 'win') {
        setScore(prev => ({ ...prev, player: prev.player + 1 }));
      } else if (result === 'lose') {
        setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
      }
      
      setIsPlaying(false);
    }, 1000);
  };

  const resetScore = () => {
    setScore({ player: 0, computer: 0 });
    setGameResult(null);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-cyan-400">Instructions</h3>
        <p className="text-gray-400 text-sm">
          Rock beats Scissors, Paper beats Rock, Scissors beats Paper
        </p>
      </div>

      <div className="flex justify-center space-x-8 text-center">
        <div className="space-y-2">
          <p className="text-cyan-400 font-semibold">You</p>
          <p className="text-2xl font-bold">{score.player}</p>
        </div>
        <div className="space-y-2">
          <p className="text-purple-400 font-semibold">Computer</p>
          <p className="text-2xl font-bold">{score.computer}</p>
        </div>
      </div>

      <div className="flex justify-center space-x-8 text-6xl">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">You</p>
          <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center">
            {gameResult ? emojis[gameResult.player] : '❓'}
          </div>
        </div>
        <div className="flex items-center text-2xl text-gray-400">VS</div>
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">Computer</p>
          <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center">
            {isPlaying ? '🎲' : (gameResult ? emojis[gameResult.computer] : '❓')}
          </div>
        </div>
      </div>

      {gameResult && !isPlaying && (
        <div className="text-center">
          <p className={cn(
            "text-xl font-bold",
            gameResult.result === 'win' && "text-green-400",
            gameResult.result === 'lose' && "text-red-400",
            gameResult.result === 'tie' && "text-yellow-400"
          )}>
            {gameResult.result === 'win' && "You Win!"}
            {gameResult.result === 'lose' && "You Lose!"}
            {gameResult.result === 'tie' && "It's a Tie!"}
          </p>
        </div>
      )}

      <div className="flex justify-center space-x-4">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => playGame(choice)}
            disabled={isPlaying}
            className={cn(
              "p-4 rounded-xl border-2 border-cyan-500/30 bg-gray-800/50",
              "hover:border-cyan-500/60 hover:bg-cyan-500/10",
              "transition-all duration-200 text-3xl",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {emojis[choice]}
          </button>
        ))}
      </div>

      <button
        onClick={resetScore}
        className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-medium hover:from-cyan-600 hover:to-purple-600 transition-all"
      >
        Reset Score
      </button>
    </div>
  );
}
