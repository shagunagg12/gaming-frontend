"use client"

interface ManualModeControlsProps {
  onAutoPick: () => void
  onClearTable: () => void
}

export default function ManualModeControls({ onAutoPick, onClearTable }: ManualModeControlsProps) {
  return (
    <>
      {/* Auto Pick */}
      <button
        className="w-full bg-[#1a2c3a] hover:bg-[#2a3e4e] text-white border-none rounded-md px-4 py-2 transition-colors"
        onClick={onAutoPick}
      >
        Auto Pick
      </button>

      {/* Clear Table */}
      <button
        className="w-full bg-[#1a2c3a] hover:bg-[#2a3e4e] text-white border-none rounded-md px-4 py-2 transition-colors"
        onClick={onClearTable}
      >
        Clear Table
      </button>

      {/* Bet Button */}
      <button className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-md font-medium transition-colors">
        Bet
      </button>
    </>
  )
}
