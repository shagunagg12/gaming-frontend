"use client"

import { Bitcoin } from "lucide-react"

interface BetAmountProps {
  betAmount: string
  setBetAmount: (amount: string) => void
  onHalf: () => void
  onDouble: () => void
}

export default function BetAmount({ betAmount, setBetAmount, onHalf, onDouble }: BetAmountProps) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-400">Bet Amount</span>
        <span>${Number.parseFloat(betAmount || "0").toFixed(2)}</span>
      </div>
      <div className="flex">
        <div className="flex-1 bg-[#1a2c3a] rounded-l-md border border-[#2a3e4e] flex items-center">
          <input
            type="text"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="w-full border-0 bg-transparent text-white outline-none focus:outline-none px-3 py-2"
          />
          <div className="pr-3">
            <Bitcoin className="h-5 w-5 text-orange-500" />
          </div>
        </div>
        <button onClick={onHalf} className="px-4 py-2 bg-[#1a2c3a] border-t border-b border-[#2a3e4e] text-white">
          ½
        </button>
        <button onClick={onDouble} className="px-4 py-2 bg-[#1a2c3a] rounded-r-md border border-[#2a3e4e] text-white">
          2×
        </button>
      </div>
    </div>
  )
}
