"use client"

import { Bitcoin } from "lucide-react"

interface GameResultOverlayProps {
  isVisible: boolean
  multiplier: number
  payout: string
  onClose: () => void
}

export default function GameResultOverlay({ isVisible, multiplier, payout, onClose }: GameResultOverlayProps) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-green-500 border-4 border-green-400 rounded-lg p-6 text-center">
        <div className="text-white text-4xl font-bold mb-2">{multiplier.toFixed(2)}×</div>
        <div className="flex items-center justify-center text-white text-xl">
          <span className="mr-2">{payout}</span>
          <Bitcoin className="h-6 w-6 text-orange-500" />
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-white text-green-500 px-4 py-2 rounded font-medium hover:bg-gray-100"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
