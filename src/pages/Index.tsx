
import { useState } from 'react';
import Layout from '@/components/Layout';
import GameCard from '@/components/GameCard';
import GameModal from '@/components/GameModal';
import TicTacToe from '@/components/games/TicTacToe';
import RockPaperScissors from '@/components/games/RockPaperScissors';
import Snake from '@/components/games/Snake';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  component: React.ComponentType;
  color: 'cyan' | 'purple' | 'green' | 'yellow';
}

const games: Game[] = [
  {
    id: 'tictactoe',
    title: 'Tic-Tac-Toe',
    description: 'Classic strategy game for two players. Get three in a row to win!',
    icon: '❌',
    component: TicTacToe,
    color: 'cyan'
  },
  {
    id: 'rockpaperscissors',
    title: 'Rock Paper Scissors',
    description: 'Challenge the computer in this timeless hand game!',
    icon: '✂️',
    component: RockPaperScissors,
    color: 'purple'
  },
  {
    id: 'snake',
    title: 'Snake',
    description: 'Control the snake to eat food and grow longer!',
    icon: '🐍',
    component: Snake,
    color: 'yellow'
  }
];

export default function Index() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
            Welcome to the Arcade
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience classic games reimagined with modern design. Choose your adventure and start playing!
          </p>
        </div>

        <div className="flex flex-wrap gap-6 justify-center">
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              icon={game.icon}
              color={game.color}
              onClick={() => setSelectedGame(game)}
            />
          ))}
        </div>

        <div className="text-center space-y-4 pt-8">
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <span>🎮 4 Classic Games</span>
            <span>📱 Mobile Friendly</span>
            <span>🎯 Instant Play</span>
          </div>
        </div>
      </div>

      {selectedGame && (
        <GameModal
          isOpen={!!selectedGame}
          onClose={() => setSelectedGame(null)}
          title={selectedGame.title}
        >
          <selectedGame.component />
        </GameModal>
      )}
    </Layout>
  );
}
