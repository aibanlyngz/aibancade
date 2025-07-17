
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type Player = 'X' | 'O' | null;

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player | 'tie' | null>(null);
  const [winningCells, setWinningCells] = useState<number[]>([]);

  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  useEffect(() => {
    checkWinner();
  }, [board]);

  const checkWinner = () => {
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningCells(pattern);
        return;
      }
    }
    
    if (board.every(cell => cell !== null)) {
      setWinner('tie');
    }
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningCells([]);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-cyan-400">Instructions</h3>
        <p className="text-gray-400 text-sm">
          Click on empty squares to place your mark. Get three in a row to win!
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 p-4 bg-gray-800/50 rounded-lg">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            className={cn(
              "w-20 h-20 border-2 border-cyan-500/30 rounded-lg flex items-center justify-center",
              "text-2xl font-bold transition-all duration-200",
              "hover:border-cyan-500/60 hover:bg-cyan-500/10",
              cell === 'X' && "text-cyan-400",
              cell === 'O' && "text-purple-400",
              winningCells.includes(index) && "bg-green-500/20 border-green-500"
            )}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="text-center space-y-4">
        {winner ? (
          <div className="space-y-2">
            <p className="text-lg font-bold">
              {winner === 'tie' ? (
                <span className="text-yellow-400">It's a tie!</span>
              ) : (
                <span className={winner === 'X' ? 'text-cyan-400' : 'text-purple-400'}>
                  Player {winner} wins!
                </span>
              )}
            </p>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-medium hover:from-cyan-600 hover:to-purple-600 transition-all"
            >
              Play Again
            </button>
          </div>
        ) : (
          <p className="text-lg">
            Current player: 
            <span className={currentPlayer === 'X' ? 'text-cyan-400 ml-2' : 'text-purple-400 ml-2'}>
              {currentPlayer}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
