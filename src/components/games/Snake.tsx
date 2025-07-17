
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 5, y: 5 };

export default function Snake() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Position>({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection({ x: 0, y: 0 });
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
  };

  const startGame = () => {
    setGameStarted(true);
    setDirection({ x: 1, y: 0 });
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) return;
      
      switch (e.key) {
        case 'ArrowUp':
          setDirection(prev => prev.y !== 1 ? { x: 0, y: -1 } : prev);
          break;
        case 'ArrowDown':
          setDirection(prev => prev.y !== -1 ? { x: 0, y: 1 } : prev);
          break;
        case 'ArrowLeft':
          setDirection(prev => prev.x !== 1 ? { x: -1, y: 0 } : prev);
          break;
        case 'ArrowRight':
          setDirection(prev => prev.x !== -1 ? { x: 1, y: 0 } : prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      setSnake(currentSnake => {
        const newSnake = [...currentSnake];
        const head = { ...newSnake[0] };
        
        head.x += direction.x;
        head.y += direction.y;

        // Check wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          return currentSnake;
        }

        // Check self collision
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return currentSnake;
        }

        newSnake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 10);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(gameLoop);
  }, [direction, food, gameStarted, gameOver, generateFood]);

  const handleDirectionButton = (newDirection: Position) => {
    if (!gameStarted) return;
    
    if (newDirection.x !== 0 && direction.x !== -newDirection.x) {
      setDirection(newDirection);
    }
    if (newDirection.y !== 0 && direction.y !== -newDirection.y) {
      setDirection(newDirection);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-cyan-400">Instructions</h3>
        <p className="text-gray-400 text-sm">
          Use arrow keys or buttons to control the snake. Eat food to grow!
        </p>
      </div>

      <div className="text-center">
        <p className="text-2xl font-bold text-cyan-400">Score: {score}</p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-20 gap-0 border-2 border-cyan-500/30 bg-gray-900 p-2 rounded-lg">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            
            const isSnakeSegment = snake.some(segment => segment.x === x && segment.y === y);
            const isFood = food.x === x && food.y === y;
            const isHead = snake[0]?.x === x && snake[0]?.y === y;

            return (
              <div
                key={index}
                className={cn(
                  "w-4 h-4 border border-gray-800",
                  isSnakeSegment && !isHead && "bg-cyan-500",
                  isHead && "bg-cyan-300",
                  isFood && "bg-red-500 rounded-full"
                )}
              />
            );
          })}
        </div>
      </div>

      {!gameStarted && !gameOver && (
        <button
          onClick={startGame}
          className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-medium hover:from-cyan-600 hover:to-purple-600 transition-all"
        >
          Start Game
        </button>
      )}

      {gameOver && (
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold text-red-400">Game Over!</p>
          <p className="text-gray-400">Final Score: {score}</p>
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-medium hover:from-cyan-600 hover:to-purple-600 transition-all"
          >
            Play Again
          </button>
        </div>
      )}

      {gameStarted && !gameOver && (
        <div className="grid grid-cols-3 gap-2 md:hidden">
          <div></div>
          <button
            onClick={() => handleDirectionButton({ x: 0, y: -1 })}
            className="p-3 bg-gray-800 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/10"
          >
            ↑
          </button>
          <div></div>
          <button
            onClick={() => handleDirectionButton({ x: -1, y: 0 })}
            className="p-3 bg-gray-800 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/10"
          >
            ←
          </button>
          <div></div>
          <button
            onClick={() => handleDirectionButton({ x: 1, y: 0 })}
            className="p-3 bg-gray-800 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/10"
          >
            →
          </button>
          <div></div>
          <button
            onClick={() => handleDirectionButton({ x: 0, y: 1 })}
            className="p-3 bg-gray-800 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/10"
          >
            ↓
          </button>
          <div></div>
        </div>
      )}
    </div>
  );
}
