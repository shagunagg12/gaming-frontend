import { useContext, useEffect, useState } from "react";
import { FaArrowRight, FaChevronLeft } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { BsCollectionPlayFill } from "react-icons/bs";
import OddsButton from "./OddsButton";
import UserContext from "../../../context/UserContext";
import CombinedDataResponse, { MatchData, SportData } from '../../../utils/types/liveMatchesCombinedData';
import { BiArrowFromRight, BiArrowToRight } from "react-icons/bi";

interface Props {
  selectedSport: string;
  data:CombinedDataResponse|undefined
}

function GameAndOddsForStartingSoon({ selectedSport ,data}: Props) {
  const gameContext = useContext(UserContext);
  const liveGmesInnings = gameContext?.gameInningsData



  // State to track which dropdowns are open (by tournament_id)
  const [openIds, setOpenIds] = useState<{ [key: number]: boolean }>({});
  const [gameData, setGameData] = useState<MatchData[][]>([]);
  const [sportDataArray, setSportDataArray] = useState<SportData[] | undefined>(undefined);

  // Toggle the state for a specific dropdown (tournament_id)
  const handleClick = (id: number) => {
    setOpenIds((prevIds) => ({
      ...prevIds,
      [id]: !prevIds[id], // Toggle the dropdown for this id
    }));
  };

  useEffect(() => {
    if (data) {
      const combinedData = data.combinedData.filter(sport => sport.data && sport.data.length);
      setGameData(combinedData.map(item => item.data));

      setSportDataArray(
        data?.combinedData
          .filter(sport => sport.data && sport.data.length)
          .filter(item => item.sport === selectedSport)
      );
    }
  }, [data, selectedSport]); 
  
  const filteredByTournaments = sportDataArray?.map(item => {
    const seenTournaments = new Set();
    const filteredData = item.data.filter(match => {
      if (seenTournaments.has(match.tournament_id)) {
        return false;
      }
      seenTournaments.add(match.tournament_id);
      return true;
    });
    return {
      ...item,
      data: filteredData
    };
  });
console.log('filtered data',filteredByTournaments);

// Input date in IST (Indian Standard Time)
const now = new Date();

console.log(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`);
const sortedItems = filteredByTournaments
  ? filteredByTournaments.map(item => ({
      ...item, // Keep the original properties of the item
      data: item.data.sort((a, b) => {
        const dateA = new Date(a.start_time).getTime();
        const dateB = new Date(b.start_time).getTime();
        return dateB - dateA;
      }) // Sort the data array
    }))
  : [];
  
  
      const startingTime =(time:string)=>{
         const ReadableTime = new Date(time).toLocaleTimeString(undefined, {
          weekday: 'long',  // Full name of the day (e.g., "Sunday")
          year: 'numeric',  // Full year (e.g., "2024")
          month: 'long',    // Full name of the month (e.g., "September")
          day: 'numeric',   // Day of the month (e.g., "29")
          hour: '2-digit',  // 2-digit hour (e.g., "04" for 4 PM or "16" for 24-hour time)
          minute: '2-digit', // 2-digit minute (e.g., "00")
          second: '2-digit', // 2-digit second (optional)
          hour12: true,     // Set to `false` for 24-hour format, `true` for 12-hour format
        });
      return ReadableTime
      }
      const getIndianTimeISO = () => {
        const currentDate = new Date();
      
        // Get the time in the Indian Standard Time (IST) timezone
        const indianTime = new Date(currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      
        // Format it to ISO string without milliseconds
        const formattedTime = indianTime.toISOString().split('.')[0] + 'Z';
      
        return formattedTime;
      };
      
      console.log(getIndianTimeISO());

  return (
    <div className="transition-opacity">
      {filteredByTournaments?.map((item, index) => (
      
          <div
            key={index}
            className="bg-[#213743] border-[#2f4553] border-t shadow-sm shadow-black  relative w-full overflow-hidden rounded my-4"
          >
            <div onClick={() => handleClick(item.sport.length)} className="items-center flex justify-between">
              <span
                className={`absolute right-6 top-4 text-[#9cbad3] cursor-pointer transition-all duration-300 ${
                  openIds[item.sport.length] ? "-rotate-90" : ""
                }`}
              >
                <FaChevronLeft size={13} />
              </span>
            </div>

            <span
              onClick={() => handleClick(item.sport.length)}
              className="text-[13px] font-semibold flex items-center p-3"
            >
                    {item.sport}
            </span>



                {item.data.map((matchItem)=>(<>
                    {openIds[item.sport.length] && (
              sportDataArray?.map((sportItem) =>
                sportItem.data
                  .filter((match) => match.tournament_id === matchItem.tournament_id)
                  .map((filteredMatch) => (
                    <div
                      key={filteredMatch.tournament_id}
                      className="mt-3 transition-all duration-300"
                    >
                      <hr className="bg-[#2f4553] w-full border-none -translate-y-3 h-[2px]" />
                      <div className="grid grid-cols-2 px-5 ">
                        <div>

                        {filteredMatch.start_time === getIndianTimeISO ()?
                         <>
                         <span className="text-xs  font-bold w-fit bg-red-800 px-1 mr-1 rounded-sm mt-1">
                           Live
                          </span>
                           <span className="secondaryTextColor text-[10px] w-fit font-medium mt-1">
                           {filteredMatch.status.reason},{filteredMatch.away_team_name}
                         </span></>: 
                          <p className="text-[11px] mt-1">{startingTime(filteredMatch.start_time)}</p>}

 


                          {/* <hr className="bg-[#2f4553] w-[30%] top-[28%] ml-[30%] absolute border-none -translate-y-3 h-[2px]" /> */}
                         
                         
                         
                          <div className="font-bold text-sm mt-2 flex justify-between">
                            <span className="text-[15px] ">{filteredMatch.home_team_name}</span>
                            <div className="flex gap-5 mr-5 secondaryTextColor text-[13px]">
                              <span>{filteredMatch.home_team_score?.display}</span>
                              <span className="text-orange-500">
                                {filteredMatch.home_team_score?.period_1}
                              </span>
                              <span>
                                <ImStatsBars size={16} />
                              </span>
                            </div>
                          </div>
                          <div className="font-bold text-sm flex justify-between mt-2">
                            <span className="text-[15px] ">{filteredMatch.away_team_name}</span>
                            <div className="flex gap-5 mr-5 secondaryTextColor text-[13px]">
                              <span>{filteredMatch.away_team_score?.display}</span>
                              <span className="text-orange-500">
                                {filteredMatch.away_team_score?.period_1}
                              </span>
                              <span>
                                <BsCollectionPlayFill size={16} />
                              </span>
                            </div>
                          </div>
                          <span className="w-[100%] font-bold secondaryTextColor items-center flex text-sm gap-1 whitespace-nowrap text-ellipsis  overflow-hidden">
                            <span>{item.sport}</span>
                            <FaArrowRight size={10}/>
                            <span>{matchItem.class_name}</span> 
                            <FaArrowRight size={10}/>
                            <span className="flex w-[30%]">
                            <span className="truncate  overflow-hidden ">{matchItem.tournament_name}</span>
                            </span> 
                          </span> 


                        </div>
                        <div>
                          <div className="font-semibold text-[10px] mt-2 flex justify-center secondaryTextColor">
                            Winner
                          </div>
                          <div className="grid grid-cols-2 mb-3 mt-2 gap-2">
                            <OddsButton />
                            <OddsButton />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              )
            )}
                </>))}
         


         
          </div>

      ))}
    </div>
  );
}

export default GameAndOddsForStartingSoon;
