"use client"

import { useState, useRef } from "react"

interface NumberGridProps {
  selectedNumbers: number[]
  onNumberSelect: (num: number) => void
  winningNumbers?: number[]
  drawnNumbers?: number[]
  gameState: "selecting" | "result"
}

export default function NumberGrid({
  selectedNumbers,
  onNumberSelect,
  winningNumbers = [],
  drawnNumbers = [],
  gameState,
}: NumberGridProps) {
  const [hoveredNumber, setHoveredNumber] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playSelectSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const handleNumberClick = (num: number) => {
    if (gameState === "result") return // Don't allow selection during result

    playSelectSound()
    onNumberSelect(num)
  }

  const getNumberStyle = (num: number) => {
    if (gameState === "result") {
      // During result display
      if (selectedNumbers.includes(num) && winningNumbers.includes(num)) {
        // Selected and won - green with thick green border
        return "bg-green-500 text-white border-4 border-green-400 shadow-lg transform scale-105"
      } else if (selectedNumbers.includes(num)) {
        // Selected but didn't win - purple
        return "bg-[#a612f0] text-white"
      } else if (drawnNumbers.includes(num)) {
        // Drawn but not selected - dark background with red text
        return "bg-[#a612f0] text-red-400 font-bold"
      } else {
        // Not selected, not drawn - default dark
        return "bg-[#a612f0]text-gray-300"
      }
    } else {
      // During selection phase
      if (selectedNumbers.includes(num)) {
        return "bg-[#a612f0] text-white transform scale-105 shadow-lg" // Selected - purple with scale
      } else if (hoveredNumber === num) {
        return "bg-[#1a2c3a] text-white transform scale-102 shadow-md" // Hovered - lighter gray
      } else {
        return "bg-[#1a2c3a] text-white hover:bg-[#6b7280] hover:transform hover:scale-102" // Default - dark gray
      }
    }
  }

  return (
    <>
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/betButtonSound.mp3" type="audio/mpeg" />
      </audio>

      {/* Fixed Grid Container */}
      <div className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-8 gap-3 mb-6">
          {Array.from({ length: 40 }, (_, i) => i + 1).map((num) => (
            <div key={num} className="aspect-square">
              <button
                className={`w-full h-full flex items-center justify-center rounded-lg text-lg font-semibold transition-all duration-200 ease-in-out ${getNumberStyle(num)}`}
                onClick={() => handleNumberClick(num)}
                onMouseEnter={() => gameState === "selecting" && setHoveredNumber(num)}
                onMouseLeave={() => setHoveredNumber(null)}
                disabled={gameState === "result"}
              >
                {num}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
