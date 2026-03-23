// frontend/src/context/GameContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface GameContextType {
  grid: any[];
  mines: number;
  startGame: (minesCount: number) => void;
  playTurn: (index: number) => void;
  gameOver: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [grid, setGrid] = useState<any[]>([]);
  const [mines, setMines] = useState<number>(2);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const socket: Socket = io('http://localhost:3000');

  useEffect(() => {
    socket.on('mines_start_game', (data: { grid: any[]; mines: number }) => {
      setGrid(data.grid);
      setMines(data.mines);
      setGameOver(false);
    });

    socket.on('mines_update_grid', (data: { grid: any[] }) => {
      setGrid(data.grid);
    });

    socket.on('mines_game_over', () => {
      setGameOver(true);
    });

    return () => {
      socket.off('mines_game_started');
      socket.off('mines_update_grid');
      socket.off('mines_game_over');
    };
  }, [socket]);

  const startGame = (minesCount: number) => {
    socket.emit('mines_game_started', minesCount);
  };

  const playTurn = (index: number) => {
    socket.emit('mines_play_turn', index);
  };

  return (
    <GameContext.Provider value={{ grid, mines, startGame, playTurn, gameOver }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};
