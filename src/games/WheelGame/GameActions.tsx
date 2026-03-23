interface GameActionsProps {
}

export function GameActions({
}: GameActionsProps) {
  return (
    <div className="grid grid-cols-1 gap-2 w-full">
        <div className="flex flex-col gap-0.5 w-full">
            <label className="text-blue-100 text-[14px] font-semibold">Risk</label>
            <select 
            className="flex items-center justify-between text-white bg-[#102636] hover:bg-[#1b3648] focus:ring-1 focus:ring-[#6e8190] font-medium rounded-md text-sm px-4 py-2 w-full border border-[#6e8190] shadow-md"            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <label className="text-blue-100 text-[14px] mt-2 font-semibold">Segments</label>
            <select 
            className="flex items-center justify-between text-white bg-[#102636] hover:bg-[#1b3648] focus:ring-1 focus:ring-[#6e8190] font-medium rounded-md text-sm px-4 py-2 w-full border border-[#6e8190] shadow-md"
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
            </select>
        </div>
         </div>
  )
}

