import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import MultipleBetToken from "./MultipleBetToken";
import { LuTicketsPlane } from "react-icons/lu";

const MultiBet:React.FC=()=> {
    const [isLoading, setIsLoading] = useState(true); // For shimmer effect
            useEffect(() => {
                const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
                return () => clearTimeout(timer);
            }, []);
    const [OddDialog, setOddDialog] = useState(false)
        const [DialogText, setDialogText] = useState("No Odds Changes Accepted")
        const [DialogTextColor, setDialogTextColor] = useState(false)
        const [selectedDialogTextProps, setSelectedDialogTextProps] = useState(0)
    return (
        <div className="w-full flex relative flex-col max-h-screen h-[63.5%] justify-between items-start">
                    <div className="w-full h-full">
                        <div className="w-full h-[2px] z-10 bg-[#2e4250] my-2"></div>
                        <div onMouseLeave={()=>setDialogTextColor(false)} onMouseEnter={() => setDialogTextColor(true)} onClick={() => setOddDialog(prev => !prev)} className="w-full pb-2 relative px-2 z-10 justify-between flex flex-column">
                            <div className={`text-[15px] flex cursor-pointer flex-column items-center text-[${!DialogTextColor ? "#afb6c1" : "white"}] font-medium`}>{DialogText}<IoIosArrowDown className="ml-2" /></div>
                            <div className="text-[15px] text-white opacity-[90%] font-semibold">Clear All</div>
                        </div>
                        {OddDialog &&
                            <div className="flex absolute cursor-pointer text-gray-800 text-[15px] left-1.5 rounded-md py-1 font-semibold bg-white leading-loose flex-col z-10">
                                <div onMouseEnter={() => setSelectedDialogTextProps(1)} onClick={() => { setDialogText("Accept Any Odds"), setOddDialog(false) }} className={`px-3 py-0.5 ${selectedDialogTextProps == 1 && "bg-[#bfc6d3]"} ${DialogText == "Accept Any Odds" && "text-[#076dfb]"}`}>Accept Any Odds</div>
                                <div onMouseEnter={() => setSelectedDialogTextProps(2)} onClick={() => { setDialogText("Accept Only Highers Odds"), setOddDialog(false) }} className={`px-3 py-0.5 ${selectedDialogTextProps == 2 && "bg-[#bfc6d3]"} ${DialogText == "Accept Only Highers Odds" && "text-[#076dfb]"} `}>Accept Only Highers Odds</div>
                                <div onMouseEnter={() => setSelectedDialogTextProps(3)} onClick={() => { setDialogText("No Odds Changes Accepted"), setOddDialog(false) }} className={`py-0.5 ${selectedDialogTextProps == 3 && "bg-[#bfc6d3]"} ${DialogText == "No Odds Changes Accepted" && "text-[#076dfb]"} font-medium px-3`}>No Odds Changes Accepted</div>
                            </div>}
                        <div onClick={() => setOddDialog(false)} className="h-auto max-h-full scrollbar-thin scrollbar-thumb-[#1d3947] scrollbar-track-[#192e38] overflow-y-auto select-none">
                            {isLoading?
                            <div className="w-full flex flex-col">
                            {Array.from({ length: 4 }).map((_, index) => (
                              <div
                                key={index}
                                role="status"
                                className="flex items-center h-14 sm:h-16 w-full shimmer-effect mb-2 last:mb-0 rounded-lg"
                              >
                                {/* Icon */}
                                <div className="flex items-center justify-center h-full w-14 sm:w-16">
                                  <LuTicketsPlane size={24} className="text-gray-500" />
                                </div>
                                {/* Shimmer Text Lines */}
                                <div className="flex flex-col justify-center w-full px-4">
                                  <div className="w-2/3 h-3 sm:h-4 shimmer-effect mb-1 rounded"></div>
                                  <div className="w-1/2 h-3 sm:h-4 shimmer-effect rounded"></div>
                                </div>
                              </div>
                            ))}
                          </div>
                          :
                          
                            <MultipleBetToken/>}
                        </div></div>
                </div>

    )
}
export default MultiBet;