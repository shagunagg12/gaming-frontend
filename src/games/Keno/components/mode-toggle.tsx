"use client"

interface ModeToggleProps {
  mode: "Manual" | "Auto"
  setMode: (mode: "Manual" | "Auto") => void
}

export default function ModeToggle({ mode, setMode }: ModeToggleProps) {
  return (
    <div className="bg-[#1a2c3a] rounded-full p-1 flex">
      <button
        className={`flex-1 py-3 px-4 rounded-full text-center ${
          mode === "Manual" ? "bg-[#2a3e4e] text-white" : "text-gray-400"
        }`}
        onClick={() => setMode("Manual")}
      >
        Manual
      </button>
      <button
        className={`flex-1 py-3 px-4 rounded-full text-center ${
          mode === "Auto" ? "bg-[#2a3e4e] text-white" : "text-gray-400"
        }`}
        onClick={() => setMode("Auto")}
      >
        Auto
      </button>
    </div>
  )
}
