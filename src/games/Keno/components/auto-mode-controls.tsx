"use client"

import { Bitcoin, ChevronUp, ChevronDown } from "lucide-react"

interface AutoModeControlsProps {
  numberOfBets: string
  setNumberOfBets: (value: string) => void
  onWinIncrease: string
  setOnWinIncrease: (value: string) => void
  onLossIncrease: string
  setOnLossIncrease: (value: string) => void
  stopOnProfit: string
  setStopOnProfit: (value: string) => void
  stopOnLoss: string
  setStopOnLoss: (value: string) => void
  onInfinityClick: () => void
  onResetWin: () => void
  onResetLoss: () => void
  incrementValue: (setter: any, value: string, isPercentage?: boolean) => void
  decrementValue: (setter: any, value: string, isPercentage?: boolean) => void
}

export default function AutoModeControls({
  numberOfBets,
  setNumberOfBets,
  onWinIncrease,
  setOnWinIncrease,
  onLossIncrease,
  setOnLossIncrease,
  stopOnProfit,
  setStopOnProfit,
  stopOnLoss,
  setStopOnLoss,
  onInfinityClick,
  onResetWin,
  onResetLoss,
  incrementValue,
  decrementValue,
}: AutoModeControlsProps) {
  return (
    <>
      {/* Number of Bets */}
      <div>
        <div className="mb-2 text-gray-400">Number of Bets</div>
        <div className="flex">
          <div className="flex-1 bg-[#1a2c3a] border border-[#2a3e4e] rounded-l-md flex items-center">
            <input
              type="text"
              value={numberOfBets}
              onChange={(e) => setNumberOfBets(e.target.value)}
              className="w-full border-0 bg-transparent text-white outline-none focus:outline-none px-3 py-2"
            />
          </div>
          <button
            onClick={onInfinityClick}
            className="bg-[#1a2c3a] border border-l-0 border-[#2a3e4e] text-white rounded-r-md px-3 py-2"
          >
            ∞
          </button>
        </div>
      </div>

      {/* On Win */}
      <div>
        <div className="mb-2 text-gray-400">On Win</div>
        <div className="flex">
          <button
            onClick={onResetWin}
            className="bg-[#1a2c3a] border border-[#2a3e4e] text-white rounded-l-md px-3 py-2"
          >
            Reset
          </button>
          <div className="flex-1 flex items-center bg-[#1a2c3a] border-t border-b border-[#2a3e4e]">
            <span className="px-2 text-gray-400">Increase by:</span>
            <input
              type="text"
              value={onWinIncrease}
              onChange={(e) => setOnWinIncrease(e.target.value)}
              className="w-full bg-transparent border-0 text-white outline-none px-2 py-2"
            />
          </div>
          <div className="bg-[#1a2c3a] border border-[#2a3e4e] text-white rounded-r-md px-3 py-2">%</div>
        </div>
      </div>

      {/* On Loss */}
      <div>
        <div className="mb-2 text-gray-400">On Loss</div>
        <div className="flex">
          <button
            onClick={onResetLoss}
            className="bg-[#1a2c3a] border border-[#2a3e4e] text-white rounded-l-md px-3 py-2"
          >
            Reset
          </button>
          <div className="flex-1 flex items-center bg-[#1a2c3a] border-t border-b border-[#2a3e4e]">
            <span className="px-2 text-gray-400">Increase by:</span>
            <input
              type="text"
              value={onLossIncrease}
              onChange={(e) => setOnLossIncrease(e.target.value)}
              className="w-full bg-transparent border-0 text-white outline-none px-2 py-2"
            />
          </div>
          <div className="flex items-center bg-[#1a2c3a] border border-[#2a3e4e] text-white rounded-r-md px-2">
            <div className="flex flex-col mr-1">
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => incrementValue(setOnLossIncrease, onLossIncrease, true)}
              >
                <ChevronUp className="h-3 w-3" />
              </button>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => decrementValue(setOnLossIncrease, onLossIncrease, true)}
              >
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
            <span>%</span>
          </div>
        </div>
      </div>

      {/* Stop on Profit */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Stop on Profit</span>
          <span>-${Math.abs(Number.parseFloat(stopOnProfit || "0")).toFixed(2)}</span>
        </div>
        <div className="flex items-center bg-[#1a2c3a] border border-[#2a3e4e] rounded-md">
          <input
            type="text"
            value={stopOnProfit}
            onChange={(e) => setStopOnProfit(e.target.value)}
            className="w-full border-0 bg-transparent text-white outline-none focus:outline-none px-3 py-2"
          />
          <div className="pr-3">
            <Bitcoin className="h-5 w-5 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Stop on Loss */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Stop on Loss</span>
          <span>-${Math.abs(Number.parseFloat(stopOnLoss || "0")).toFixed(2)}</span>
        </div>
        <div className="flex items-center bg-[#1a2c3a] border border-[#2a3e4e] rounded-md">
          <input
            type="text"
            value={stopOnLoss}
            onChange={(e) => setStopOnLoss(e.target.value)}
            className="w-full border-0 bg-transparent text-white outline-none focus:outline-none px-3 py-2"
          />
          <div className="pr-3">
            <Bitcoin className="h-5 w-5 text-orange-500" />
          </div>
        </div>
      </div>
    </>
  )
}
