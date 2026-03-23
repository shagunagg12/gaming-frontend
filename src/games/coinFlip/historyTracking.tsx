import React, { useState, useEffect } from 'react';

interface FlipRecord {
  time: string;       // ISO timestamp
  choice: 'heads'|'tails';
  result: 'heads'|'tails';
  win: boolean;
  betAmount?: number;
}

function useHistory() {
  const [history, setHistory] = useState<FlipRecord[]>(() => {
    const stored = localStorage.getItem('coinflip-history');
    return stored ? JSON.parse(stored) : [];
  });

  const addRecord = (rec: FlipRecord) => {
    const newHist = [rec, ...history].slice(0, 20); // limit to last 20
    setHistory(newHist);
    localStorage.setItem('coinflip-history', JSON.stringify(newHist));
  };

  return [history, addRecord] as const;
}
export default useHistory;
