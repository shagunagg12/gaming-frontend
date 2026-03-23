"use client"

import { useState } from "react"

interface PayoutDisplayProps {
  selectedNumbers: number[]
  betAmount: string
  winningCount?: number
  gameState: "selecting" | "result"
}

// Payout multipliers for different number selections
const payoutMultipliers = {
  1: [0.4, 2.75],
  2: [0.0, 1.8, 5.1],
  3: [0.0, 0.0, 2.8, 50.0],
  4: [0.0, 0.0, 1.7, 10.0, 100.0],
  5: [0.0, 0.0, 1.4, 4.0, 14.0, 390.0],
  6: [0.0, 0.0, 0.0, 0.0, 3.0, 9.0, 180.0, 710.0],
  7: [0.0, 0.0, 0.0, 2.0, 7.0, 30.0, 400.0, 800.0],
  8: [0.0, 0.0, 0.0, 2.0, 4.0, 11.0, 67.0, 400.0, 900.0],
  9: [0.0, 0.0, 0.0, 2.0, 2.5, 5.0, 15.0, 100.0, 500.0, 1000.0],
  10: [0.0, 0.0, 0.0, 1.6, 2.0, 4.0, 7.0, 26.0, 100.0, 500.0, 1000.0],
}

export default function PayoutDisplay({ selectedNumbers, betAmount, winningCount = 0, gameState }: PayoutDisplayProps) {
  const [hoveredPayout, setHoveredPayout] = useState<{ multiplier: number; index: number } | null>(null)

  const getCurrentPayouts = () => {
    const count = selectedNumbers.length
    if (count === 0) return []
    return payoutMultipliers[count as keyof typeof payoutMultipliers] || []
  }

  const calculatePayout = (multiplier: number) => {
    const bet = Number.parseFloat(betAmount) || 0
    return (bet * multiplier).toFixed(8)
  }

  const calculateChance = (index: number) => {
    const count = selectedNumbers.length
    if (count === 0) return 0
    const baseChance = 75 - index * 10 - count * 2
    return Math.max(baseChance, 0.1)
  }

  const getPayoutBoxStyle = (index: number) => {
    if (gameState === "result" && index === winningCount) {
      return "bg-green-500 text-white border-2 border-green-400"
    }
    return "bg-[#1a2c3a] text-white"
  }

  const getHitCountStyle = (index: number) => {
    if (gameState === "result" && index === winningCount) {
      return "bg-green-500 text-white"
    }
    return "bg-[#1a2c3a] text-white"
  }

  if (selectedNumbers.length === 0) return null

  const payouts = getCurrentPayouts()

  return (
    <div className="space-y-3">
      {/* Payout Multipliers Row */}
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${payouts.length}, 1fr)` }}>
        {payouts.map((multiplier, index) => (
          <div
            key={index}
            className={`px-4 py-3 rounded-md text-center cursor-pointer relative ${getPayoutBoxStyle(index)}`}
            onMouseEnter={() => setHoveredPayout({ multiplier, index })}
            onMouseLeave={() => setHoveredPayout(null)}
          >
            <span className="font-medium text-lg">{multiplier.toFixed(2)}×</span>

            {/* Hover Tooltip */}
            {hoveredPayout?.index === index && gameState === "selecting" && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white p-2 rounded text-sm whitespace-nowrap z-10">
                <div>Payout → {calculatePayout(multiplier)}</div>
                <div>
                  Profit on win →{" "}
                  {(Number.parseFloat(calculatePayout(multiplier)) - Number.parseFloat(betAmount)).toFixed(8)}
                </div>
                <div>Chance → {calculateChance(index).toFixed(6)}%</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hit Count Indicators Row */}
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${payouts.length}, 1fr)` }}>
        {Array.from({ length: payouts.length }, (_, i) => (
          <div
            key={i}
            className={`px-4 py-3 rounded-md text-center flex items-center justify-center ${getHitCountStyle(i)}`}
          >
            <span className="text-sm mr-2">{i}×</span>
            <div
              className={`w-4 h-4 rounded-full ${
                gameState === "result" && i === winningCount ? "bg-green-400" : "bg-gray-500"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}
