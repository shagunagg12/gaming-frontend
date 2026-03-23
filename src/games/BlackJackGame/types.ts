export type Suit = "hearts" | "diamonds" | "clubs" | "spades"
export type Rank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A"

export interface Card {
  suit: Suit
  rank: Rank
  hidden?: boolean
}

export type GamePhase = "betting" | "player-turn" | "dealer-turn" | "game-over"

export interface GameState {
  phase: GamePhase
  deck: Card[]
  playerHands: Card[][]
  dealerHand: Card[]
  currentBet: number
  playerBalance: number
  currentHandIndex: number
  message: string
  canSplit: boolean
  canDouble: boolean
  insurance: number
}

