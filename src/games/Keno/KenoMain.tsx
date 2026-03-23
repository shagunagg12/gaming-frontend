"use client"

import type React from "react"
import { useState } from "react"

// Import all components
import ModeToggle from "./components/mode-toggle"
import BetAmount from "./components/bet-amount"
import RiskSelector from "./components/risk-selector"
import AnimatedNumberGrid from "./components/animated-number-grid"
import PayoutDisplay from "./components/payout-display"
import AutoModeControls from "./components/auto-mode-controls"
import GameResultOverlay from "./components/game-result-overlay"

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

export default function KenoGame() {
  const [mode, setMode] = useState<"Manual" | "Auto">("Manual")
  const [betAmount, setBetAmount] = useState("0.00000000")
  const [numberOfBets, setNumberOfBets] = useState("0")
  const [onWinIncrease, setOnWinIncrease] = useState("0")
  const [onLossIncrease, setOnLossIncrease] = useState("0")
  const [stopOnProfit, setStopOnProfit] = useState("0.00000000")
  const [stopOnLoss, setStopOnLoss] = useState("0.00000000")
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])

  // Game state
  const [gameState, setGameState] = useState<"selecting" | "result">("selecting")
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([])
  const [winningNumbers, setWinningNumbers] = useState<number[]>([])
  const [showResultOverlay, setShowResultOverlay] = useState(false)
  const [gameResult, setGameResult] = useState({ multiplier: 0, payout: "0.00000000" })

  const handleNumberSelect = (num: number) => {
    if (gameState === "result") return

    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num))
    } else {
      if (selectedNumbers.length < 10) {
        setSelectedNumbers([...selectedNumbers, num])
      }
    }
  }

  const handleClearTable = () => {
    setSelectedNumbers([])
    resetGame()
  }

  const handleAutoPick = () => {
    const randomNumbers: number[] = []
    while (randomNumbers.length < 10) {
      const randomNum = Math.floor(Math.random() * 40) + 1
      if (!randomNumbers.includes(randomNum)) {
        randomNumbers.push(randomNum)
      }
    }
    setSelectedNumbers(randomNumbers)
    resetGame()
  }

  const resetGame = () => {
    setGameState("selecting")
    setDrawnNumbers([])
    setWinningNumbers([])
    setShowResultOverlay(false)
  }

  const handleBet = () => {
    if (selectedNumbers.length === 0) return

    // Generate exactly 20 random drawn numbers (standard Keno)
    const drawn: number[] = []
    const availableNumbers = Array.from({ length: 40 }, (_, i) => i + 1)

    // Shuffle and take first 20
    for (let i = availableNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[availableNumbers[i], availableNumbers[j]] = [availableNumbers[j], availableNumbers[i]]
    }

    const drawnNumbers = availableNumbers.slice(0, 10)

    // Find winning numbers (intersection of selected and drawn)
    const winning = selectedNumbers.filter((num) => drawnNumbers.includes(num))
    const winCount = winning.length

    // Calculate payout
    const payouts = payoutMultipliers[selectedNumbers.length as keyof typeof payoutMultipliers] || []
    const multiplier = payouts[winCount] || 0
    const bet = Number.parseFloat(betAmount) || 0
    const payout = (bet * multiplier).toFixed(8)

    setDrawnNumbers(drawnNumbers)
    setWinningNumbers(winning)
    setGameState("result")
    setGameResult({ multiplier, payout })

    // Show overlay if there's a win
    if (multiplier > 0) {
      setShowResultOverlay(true)
    }
  }

  const handleHalfAmount = () => {
    const currentAmount = Number.parseFloat(betAmount) || 0
    setBetAmount((currentAmount / 2).toFixed(8))
  }

  const handleDoubleAmount = () => {
    const currentAmount = Number.parseFloat(betAmount) || 0
    setBetAmount((currentAmount * 2).toFixed(8))
  }

  const handleInfinityClick = () => {
    setNumberOfBets("∞")
  }

  const handleResetWin = () => {
    setOnWinIncrease("0")
  }

  const handleResetLoss = () => {
    setOnLossIncrease("0")
  }

  const incrementValue = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
    isPercentage = false,
  ) => {
    const currentValue = Number.parseFloat(value) || 0
    const increment = isPercentage ? 1 : 0.00000001
    setter((currentValue + increment).toFixed(isPercentage ? 0 : 8))
  }

  const decrementValue = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
    isPercentage = false,
  ) => {
    const currentValue = Number.parseFloat(value) || 0
    const decrement = isPercentage ? 1 : 0.00000001
    if (currentValue > 0) {
      setter((currentValue - decrement).toFixed(isPercentage ? 0 : 8))
    }
  }

  const getBetButtonText = () => {
    if (gameState === "result") {
      return "Bet Again"
    }
    return mode === "Manual" ? "Bet" : "Start Autobet"
  }

  const handleBetButtonClick = () => {
    if (gameState === "result") {
      resetGame()
    } else {
      handleBet()
    }
  }

  return (
    <div className="flex w-full min-h-screen bg-[#0e1a25] text-white">
      {/* Game Result Overlay */}
      <GameResultOverlay
        isVisible={showResultOverlay}
        multiplier={gameResult.multiplier}
        payout={gameResult.payout}
        onClose={() => setShowResultOverlay(false)}
      />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-full max-w-[1400px] mx-auto p-4 gap-8">
        {/* Left Panel - Fixed Width */}
        <div className="w-full lg:w-[320px] lg:flex-shrink-0 space-y-4">
          {/* Mode Toggle */}
          <ModeToggle mode={mode} setMode={setMode} />

          {/* Bet Amount */}
          <BetAmount
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            onHalf={handleHalfAmount}
            onDouble={handleDoubleAmount}
          />

          {/* Risk Selector */}
          <RiskSelector />

          {/* Mode-specific Controls */}
          {mode === "Manual" ? (
            <>
              {/* Auto Pick */}
              <button
                className="w-full bg-[#1a2c3a] hover:bg-[#3e5769] text-white border-none rounded-md px-4 py-2 transition-colors"
                onClick={handleAutoPick}
                disabled={gameState === "result"}
              >
                Auto Pick
              </button>

              {/* Clear Table */}
              <button
                className="w-full bg-[#1a2c3a] hover:bg-[#3e5769] text-white border-none rounded-md px-4 py-2 transition-colors"
                onClick={handleClearTable}
              >
                Clear Table
              </button>

              {/* Bet Button */}
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-md font-medium transition-colors"
                onClick={handleBetButtonClick}
                disabled={selectedNumbers.length === 0 && gameState === "selecting"}
              >
                {getBetButtonText()}
              </button>
            </>
          ) : (
            <>
              <AutoModeControls
                numberOfBets={numberOfBets}
                setNumberOfBets={setNumberOfBets}
                onWinIncrease={onWinIncrease}
                setOnWinIncrease={setOnWinIncrease}
                onLossIncrease={onLossIncrease}
                setOnLossIncrease={setOnLossIncrease}
                stopOnProfit={stopOnProfit}
                setStopOnProfit={setStopOnProfit}
                stopOnLoss={stopOnLoss}
                setStopOnLoss={setStopOnLoss}
                onInfinityClick={handleInfinityClick}
                onResetWin={handleResetWin}
                onResetLoss={handleResetLoss}
                incrementValue={incrementValue}
                decrementValue={decrementValue}
              />
              {/* Start Autobet Button */}
              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white h-12 rounded-md font-medium transition-colors"
                onClick={handleBetButtonClick}
                disabled={selectedNumbers.length === 0 && gameState === "selecting"}
              >
                {getBetButtonText()}
              </button>
            </>
          )}
        </div>

        {/* Right Panel - Number Grid */}
        <div className="flex-1 min-w-0">
          <AnimatedNumberGrid
            selectedNumbers={selectedNumbers}
            onNumberSelect={handleNumberSelect}
            winningNumbers={winningNumbers}
            drawnNumbers={drawnNumbers}
            gameState={gameState}
          />

          {/* Payout Display - Only shows when numbers are selected */}
          {selectedNumbers.length > 0 && (
            <PayoutDisplay
              selectedNumbers={selectedNumbers}
              betAmount={betAmount}
              winningCount={winningNumbers.length}
              gameState={gameState}
            />
          )}

          {/* Bottom Message */}
          <div className="mt-6 p-4 bg-[#1a2c3a] rounded-md text-center">
            {gameState === "selecting"
              ? "Select 1 - 10 numbers to play"
              : `You hit ${winningNumbers.length} out of ${drawnNumbers.length} drawn numbers!`}
          </div>
        </div>
      </div>
    </div>
  )
}
