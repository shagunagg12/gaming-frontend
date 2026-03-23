"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface NumberGridProps {
  selectedNumbers: number[]
  onNumberSelect: (num: number) => void
  winningNumbers?: number[]
  drawnNumbers?: number[]
  gameState: "selecting" | "result"
}

export default function AnimatedNumberGrid({
  selectedNumbers,
  onNumberSelect,
  winningNumbers = [],
  drawnNumbers = [],
  gameState,
}: NumberGridProps) {
  const [hoveredNumber, setHoveredNumber] = useState<number | null>(null)
  const [clickedNumber, setClickedNumber] = useState<number | null>(null)
  const [spinningNumbers, setSpinningNumbers] = useState<number[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playSelectSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const handleNumberClick = (num: number) => {
    if (gameState === "result") return

    setClickedNumber(num)
    playSelectSound()

    // Add spinning animation
    setSpinningNumbers((prev) => [...prev, num])

    // Remove from spinning after animation
    setTimeout(() => {
      setSpinningNumbers((prev) => prev.filter((n) => n !== num))
      setClickedNumber(null)
    }, 800)

    onNumberSelect(num)
  }

  const getNumberStyle = (num: number) => {
    if (gameState === "result") {
      if (selectedNumbers.includes(num) && winningNumbers.includes(num)) {
        return "bg-green-500 text-white border-4 border-green-400"
      } else if (selectedNumbers.includes(num)) {
        return "bg-[#a612f0] text-white"
      } else if (drawnNumbers.includes(num)) {
        return "bg-[#1a2c3a] text-red-400 font-bold"
      } else {
        return "bg-[#1a2c3a] text-gray-300"
      }
    } else {
      if (selectedNumbers.includes(num)) {
        return "bg-[#1a2c3a] text-white"
      } else if (hoveredNumber === num) {
        return "bg-[#3e5769] text-white"
      } else {
        return "bg-[#1a2c3a] text-white"
      }
    }
  }

  const isSpinning = (num: number) => spinningNumbers.includes(num)
  const isWinning = (num: number) =>
    gameState === "result" && selectedNumbers.includes(num) && winningNumbers.includes(num)

  return (
    <>
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/betButtonSound.mp3" type="audio/mpeg" />
      </audio>

      {/* Fixed Grid Container - Prevents Layout Shift */}
      <div className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-8 gap-3 mb-6 p-2">
          {Array.from({ length: 40 }, (_, i) => i + 1).map((num) => (
            <div key={num} className="aspect-square relative">
              {/* Fixed Container to Prevent Grid Shake */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  className={`w-full h-full flex items-center justify-center rounded-lg text-lg font-semibold relative overflow-hidden ${getNumberStyle(num)}`}
                  onClick={() => handleNumberClick(num)}
                  onMouseEnter={() => gameState === "selecting" && setHoveredNumber(num)}
                  onMouseLeave={() => setHoveredNumber(null)}
                  disabled={gameState === "result"}
                  // Fixed Hover Animation - No Layout Shift
                  whileHover={
                    gameState === "selecting"
                      ? {
                          scale: 1.05,
                          zIndex: 10,
                          transition: {
                            duration: 0.2,
                            ease: "easeOut",
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          },
                        }
                      : {}
                  }
                  // Click Animation
                  whileTap={
                    gameState === "selecting"
                      ? {
                          scale: 0.95,
                          transition: { duration: 0.1 },
                        }
                      : {}
                  }
                  // Selection Animation - Controlled
                  animate={
                    selectedNumbers.includes(num) && !isSpinning(num)
                      ? {
                          scale: 1.02,
                          transition: {
                            duration: 0.3,
                            ease: "easeInOut",
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                          },
                        }
                      : {
                          scale: 1,
                          transition: { duration: 0.2 },
                        }
                  }
                  // Transform Origin for Stable Scaling
                  style={{
                    transformOrigin: "center",
                    filter: isSpinning(num) ? "blur(1px)" : "blur(0px)",
                  }}
                >
                  {/* Spinning Number Animation */}
                  <motion.div
                    className="w-full h-full flex items-center justify-center"
                    
                    transition={{
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      times: [0, 0.2, 0.5, 0.8, 1],
                    }}
                  >
                    {num}
                  </motion.div>

                  {/* Glow Effect for Selected Numbers - No Layout Impact */}
                  {selectedNumbers.includes(num) && !isSpinning(num) && (
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-[#b32be9] pointer-events-none"
                      

                      style={{ zIndex: -1 }}
                    />
                  )}

                  {/* Winning Number Glow - No Layout Impact */}
                  {isWinning(num) && (
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-green-400 pointer-events-none"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                </motion.button>
              </div>

              {/* Winning Number Pop-up - Absolute Positioned */}
              <AnimatePresence>
                {isWinning(num) && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.5, 1],
                      opacity: [0, 1, 0],
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      ease: "easeOut",
                      times: [0, 0.3, 1],
                    }}
                  >
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      WIN!
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
