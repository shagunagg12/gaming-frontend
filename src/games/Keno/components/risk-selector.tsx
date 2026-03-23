"use client"

export default function RiskSelector() {
  return (
    <div>
      <div className="mb-2 text-gray-400">Risk</div>
      <div className="relative">
        <select
          defaultValue="medium"
          className="w-full bg-[#1a2c3a] border border-[#2a3e4e] text-white rounded-md px-3 py-2 appearance-none cursor-pointer"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}
