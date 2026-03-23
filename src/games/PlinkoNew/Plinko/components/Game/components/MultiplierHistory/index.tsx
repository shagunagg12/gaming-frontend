interface MultiplierHistoryProps {
  multiplierHistory: number[]
}
export function MultiplierHistory({
  multiplierHistory
}: MultiplierHistoryProps) {
  return (
    <div className=" right-4 top-40 flex w-16 flex-col overflow-hidden rounded-md bg-background md:top-60">
      {multiplierHistory.map((multiplier, index) => {
        if (index > 3 || !multiplier) return null
        return (
          <>
          <span
            key={`${multiplier}${index}${Math.random()}`}
            className={`flex bg-yellow-400 items-center ${index===0 || index===4 &&"bg-gray-500"} rounded-md justify-center py-2 px-1 font-bold text-text`}
          >
            
            {multiplier}x
          </span>
          {index<3 &&
          <div className="w-full h-[1px] bg-red-500"></div>}
          </>
        )
      })}
    </div>
  )
}
