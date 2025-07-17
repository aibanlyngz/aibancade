
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
  color: string;
}

export default function GameCard({ title, description, icon, onClick, color }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "relative group cursor-pointer transform transition-all duration-300",
        "hover:scale-105 hover:-translate-y-2"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        className={cn(
          "bg-gradient-to-br from-gray-900 to-black border rounded-xl p-6",
          "transition-all duration-300 w-[20rem]",
          `border-${color}-500/30 hover:border-${color}-500/60`,
          isHovered && `shadow-2xl shadow-${color}-500/20`
        )}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={cn(
            "text-4xl p-4 rounded-full border transition-all duration-300",
            `border-${color}-500/30 bg-${color}-500/10`,
            isHovered && `border-${color}-500 bg-${color}-500/20`
          )}>
            {icon}
          </div>
          <h3 className={cn(
            "text-xl font-bold transition-colors duration-300",
            isHovered && `text-${color}-400`
          )}>
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {description}
          </p>
          <div className={cn(
            "mt-4 px-4 py-2 rounded-full border transition-all duration-300",
            `border-${color}-500/30 text-${color}-400`,
            isHovered && `border-${color}-500 bg-${color}-500/10`
          )}>
            Play Now
          </div>
        </div>
      </div>
    </div>
  );
}
