import type { Card as CardType } from "../BlackJackGame/types"

const SUIT_SYMBOLS: { [key: string]: string } = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
}

interface CardProps {
  card: CardType
  index: number
  total: number
  activePlayer?: boolean
  playerMsg?: string
  dealerMsg?: string
  activeDealer?: boolean
}

export function Card({ card, playerMsg, index, activePlayer, activeDealer, dealerMsg }: CardProps) {
  const offsetX = index * 35 // Smaller horizontal shift
  const offsetY = index * 17  // Slight vertical shift
  const zIndex = index

  if (card.hidden) {
    return (
      <div
        className="w-[85px] h-[130px] bg-blue-500 rounded-md border-[3px] border-white shadow-xl absolute"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          zIndex,
        }}
      />
    )
  }

  const isRed = card.suit === "hearts" || card.suit === "diamonds"

  return (
    <div
    className={`
  ${playerMsg === "You win!" || playerMsg === "Dealer busts! You win!" ? "ring-[3px] ring-green-500" : ""}
  ${playerMsg === "Dealer wins!" || playerMsg === "Bust! You lose." ? "ring-[3px] ring-red-600" : ""}
  ${dealerMsg === "You win!" || dealerMsg === "Dealer busts! You win!" ? "ring-[3px] ring-red-600" : ""}
  ${dealerMsg === "Dealer wins!" || dealerMsg === "Bust! You lose." ? "ring-[3px] ring-green-500" : ""}
  w-[85px] h-[130px] bg-white leading-[30px] rounded-md shadow-xl flex flex-col justify-evenly px-2 py-1 font-bold absolute border border-gray-400`}

      style={{
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        zIndex,
      }}
    >
      <div className={`${isRed ? "text-red-600" : "text-black"} leading-[40px]`}>
        <div className="text-[30px]">{card.rank}</div>
        <div className="text-[50px]">{SUIT_SYMBOLS[card.suit]}</div>
      </div>
      <div className={`self-end rotate-180 ${isRed ? "text-red-600" : "text-black"}`}>
        <div className="text-[30px]">{card.rank}</div>
      </div>
    </div>
  )
}
