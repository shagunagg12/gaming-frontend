// frontend/src/context/GameContext.tsx
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { BetSlip } from '../utils/types/sports';

interface BetContextType {
    betSlip: BetSlip[];
    setBetSlip: React.Dispatch<React.SetStateAction<BetSlip[]>>;
    activeBets: string[];
    setActiveBets: React.Dispatch<React.SetStateAction<string[]>>  
    betSlipRef: React.RefObject<HTMLDivElement>;
}

const BetContext = createContext<BetContextType | undefined>(undefined);

interface BetProviderProps {
  children: React.ReactNode;
}



export const BetProvider: React.FC<BetProviderProps> = ({ children }) => {
    
  
  const [betSlip, setBetSlip] = useState<BetSlip[]>(()=>{
      const storedBetSlip = localStorage.getItem('betSlip');
      return storedBetSlip ? JSON.parse(storedBetSlip) : [];
     });
  const [activeBets, setActiveBets] = useState<string[]>(() => {
          const stored = localStorage.getItem("activeBetSlips");
          return stored ? JSON.parse(stored) : [];
    });

  const betSlipRef = useRef<HTMLDivElement>(null);
  


useEffect(() => {
    localStorage.setItem('betSlip', JSON.stringify(betSlip));
  }, [betSlip]);

  return (
    <BetContext.Provider value={{  betSlip, setBetSlip, activeBets, setActiveBets,betSlipRef }}>
      {children}
    </BetContext.Provider>
  );
};

export const useBet = () => {
  const context = useContext(BetContext);
  if (!context) throw new Error('useBet must be used within a BetProvider');
  return context;
};
