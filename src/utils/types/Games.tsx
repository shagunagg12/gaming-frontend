type Status = "active" |  "lost" | 'cashed_out' |  null;

interface MinesGameState {
  gameId: string;
  grid: string[];
  winningPopUp: boolean;
  isClient: boolean;
  reshuffling: boolean;
  negativeBet: boolean;
  status: Status;
  amountInWallet: number | null;
  gemCount: number;
  bomb: string;
  winAmount: number;
  maxWinAmount: number;
  profit: number;
  clickedMines: number[];
  gameMessage: string;
  clickedIndex: number | null;
  clickedIndices: number[];
}


export type CoinFlipResult = {
  id: string;
  timestamp: number;
  side: "heads" | "tails";
  stake: number;
  payout: number;
  profit: number;
};

export interface CoinGameState {
  gameId: string;
  isClient: boolean;
  status: 'lost' | 'active' | 'cashed_out' | null;
  stake: number;
  selectedSide: 'heads' | 'tails';
  winAmount: number;
  profit: number;
  history: CoinFlipResult[];
  lastResult: CoinFlipResult | null;
  gameMessage: string;
}

export type { MinesGameState, Status };