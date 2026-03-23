import type { Card, Rank, Suit } from "./types"

export function createDeck(): Card[] {
  const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"]
  const ranks: Rank[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
  const deck: Card[] = []

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank })
    }
  }

  return shuffle(deck)
}

export function shuffle(deck: Card[]): Card[] {
  const newDeck = [...deck]
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]]
  }
  return newDeck
}

export function calculateHandValue(hand: Card[]): number {
  let value = 0
  let aces = 0

  for (const card of hand) {
    if (card.hidden) continue

    if (card.rank === "A") {
      aces += 1
    } else if (["K", "Q", "J"].includes(card.rank)) {
      value += 10
    } else {
      value += Number.parseInt(card.rank)
    }
  }

  for (let i = 0; i < aces; i++) {
    if (value + 11 <= 21) {
      value += 11
    } else {
      value += 1
    }
  }

  return value
}

export function isBlackjack(hand: Card[]): boolean {
  return hand.length === 2 && calculateHandValue(hand) === 21
}

