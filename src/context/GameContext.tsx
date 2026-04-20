import { createContext, useContext, useState, ReactNode } from 'react';

interface GameContextValue {
  score: number;
  addPoint: () => void;
  resetScore: () => void;
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  return (
    <GameContext.Provider
      value={{
        score,
        addPoint: () => setScore(s => s + 1),
        resetScore: () => setScore(0),
        favorites,
        toggleFavorite: (id) =>
          setFavorites(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
          }),
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
