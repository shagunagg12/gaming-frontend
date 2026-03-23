// Fixed GameOdds.tsx
import { useState, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { PlayCircle } from "lucide-react";
import { AiFillCaretLeft } from "react-icons/ai";
import OddsButton from "./OddsButton";
import { useSportsData } from "../../../context/sportsContext";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { useBet } from "../../../context/betContext";

interface Props {
  selectedSport: string;
}

function GameOdds({ selectedSport }: Props) {
  const { LiveMatchesSportWise } = useSportsData();
  const [openIds, setOpenIds] = useState<{ [key: string]: boolean }>({});
  const {isBetSlipOpen,isSidebarOpen} = useAuth();
  const {activeBets,setActiveBets} =useBet();


  let eventType
  const handleClick = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const seenTournaments = new Set<string>();
  const filteredData = LiveMatchesSportWise?.data.filter((item) => {
    if (seenTournaments.has(item.event._id)) return false;
    seenTournaments.add(item.event._id);
    return true;
  });

  return (
    <div className="transition-all duration-1000 ease-in-out">
      {filteredData?.map((item, index) => (
        <div
          key={item.event._id}
          className="bg-[#213743] border-[#2f4553] border-t shadow-sm shadow-black  relative w-full overflow-hidden rounded my-4 transition-all duration-1000 ease-in-out h-auto opacity-0 -translate-y-4 animate-fadeInDown"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div
            onClick={() => handleClick(item.event._id)}
            className="items-center flex justify-between"
          >
            <span
              className={`absolute right-6 top-4 text-[#9cbad3] cursor-pointer transition-all duration-300 ${
                openIds[item.event._id] ? "-rotate-90" : ""
              }`}
            >
              <FaChevronLeft size={13} />
            </span>
          </div>

          <span
            onClick={() => handleClick(item.event._id)}
            className="text-[15px] font-semibold flex items-center p-[10px] text-[#dfe6eb] cursor-pointer"
          >
            {item.event.type === "International" ? (
              <span className="text-[13px] font-bold mr-1">
                {item.event.type}
              </span>
            ) : (
              <span className="font-bold mr-1">{item.venue.country}</span>
            )}{" "}
            / {item.event.title}
          </span>

          {openIds[item.event._id] &&
            LiveMatchesSportWise?.data
              .filter((sportItem) => sportItem.event._id === item.event._id)
              .map((sportItem) => {
                const winnerQuestion = sportItem.betQuestions?.find(
                  (q) => q.isMain && q.question.toLowerCase().includes("winner")
                );
                const gridCols =
                  winnerQuestion?.selections?.length === 3
                    ? "grid-cols-3"
                    : "grid-cols-2";

                return (
                  <div
                    key={sportItem._id}
                    className="mt-1 animate-fadeInUp relative bg-[#213743] border-[#2f4553] border-t-2 shadow-sm shadow-black  w-full overflow-hidden transition-transform duration-300 ease-in-out"
                  >
                    <hr className="bg-[#2f4553] w-full border-none -translate-y-3 h-[2px]" />
                    <div className={`grid grid-cols-12 px-5  ${isBetSlipOpen && isSidebarOpen ? 'max-1330px:grid-cols-1' : ''} ${isBetSlipOpen   ? 'max-1075px:grid-cols-1' : ''} max-700px:grid-cols-1`}>
                      <div className="col-span-5">
                        <span className="text-xs font-bold w-fit bg-red-800 px-1 mr-1 rounded-sm">
                          live
                        </span>
                        <span className="secondaryTextColor text-[10px] font-medium inline-flex items-center gap-2 p-1">
                          {sportItem.status?.clock}{" "}
                          {sportItem.status.period
                            ? sportItem.status.period + ","
                            : ""}
                          {sportItem.category.title === "Cricket"
                            ? sportItem.team1.title
                            : ""}
                          {sportItem.media.thumbnail && (
                            <span className="inline-block relative cursor-pointer">
                              <img
                                src={sportItem.media.thumbnail}
                                alt="thumbnail"
                                className="w-12  h-auto border object-cover"
                              />
                              <PlayCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            </span>
                          )}
                          {sportItem.is_locked && <ImStatsBars className="cursor-pointer"  size={16} />}

                                  
         <div className={`col-span-1 max-700px:flex ${isBetSlipOpen? 'max-1075px:flex':''}  ${isBetSlipOpen && isSidebarOpen ? 'max-1330px:flex'  : ''} hidden items-center absolute right-5 justify-center`}>
                  {
                     openIds[item.event._id] && (<>
                      {(()=>{
                         eventType = sportItem.event.type.toLowerCase();
                        if (eventType === "international") {
                          eventType = "international";
                        }else (
                          eventType = sportItem?.venue?.country?.toLowerCase()
                        );
                      })()}
                      <Link to={`/sports/${sportItem.category.title.toLowerCase()}/${eventType}/${sportItem.event.title.toLowerCase()}/${sportItem.title.toLowerCase()}`} className="text-[16px] font-bold text-[#dfe6eb] cursor-pointer transition-all duration-300">
                       +{sportItem.betQuestions?.length} 
                      </Link>
                    </>)
                  }

                  </div>
                                
                                  
                    
                        </span>

                        

                        <div className="grid grid-cols-2  mt-[14px]">
                          <span className="flex flex-col justify-between gap-2">
                            <div className="font-bold text-sm flex justify-between cursor-pointer">
                              <span className="flex items-center gap-2">
                                {sportItem.team1.logo && (
                                  <img
                                    className="w-6 h-6 rounded-full bg-white"
                                    src={sportItem.team1.logo}
                                    alt=""
                                  />
                                )}
                                {sportItem.team1.title} <AiFillCaretLeft />
                              </span>
                            </div>
                            <div className="font-bold text-sm flex justify-between cursor-pointer">
                              <span className="flex items-center gap-2">
                                {sportItem.team2.logo && (
                                  <img
                                    className="w-6 h-6 rounded-full bg-white"
                                    src={sportItem.team2.logo}
                                    alt=""
                                  />
                                )}
                                {sportItem.team2.title}
                              </span>
                            </div>
                          </span>

                          <div className={`flex flex-col w-fit justify-self-end items-start px-3 ${isBetSlipOpen && isSidebarOpen ? 'max-1330px:mr-1' : ''} ${isBetSlipOpen   ? 'max-1075px:mr-1' : ''} mr-5 font-semibold ring-2 ring-[#557086] bg-opacity-20 bg-[#557086] rounded-sm`}>
                            {sportItem.category.title === "Cricket" ? (
                              <>
                                <div className="flex text-[15px]">
                                  <span>134/4 (20)</span>
                                </div>
                                <div className="flex text-[15px]">
                                  <span>Yet to bat</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex text-[15px]">
                                  <span>0</span>
                                  <span className="text-orange-500">0</span>
                                </div>
                                <div className="flex text-[15px]">
                                  <span>yet to bat</span>
                                  <span className="text-orange-500">
                                    134/4 (20)
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className=" col-span-6">
                        <div className="font-semibold text-[12px] mt-6 flex justify-center secondaryTextColor">
                          {winnerQuestion?.question}
                        </div>
                        <div className={`grid ${gridCols} mb-3 mt-2 gap-2`}>
                          {winnerQuestion?.selections?.length &&
                          winnerQuestion?.selections?.length === 3 ? (
                            <>
                             {/* for 3 bet odds(draw) */}
                              {(() => {
                                const selections = winnerQuestion?.selections;
                                if (!selections || selections.length !== 3)
                                  return null;

                                const draw = selections.find(
                                  (s) => s.name === "Draw"
                                );
                                const others = selections.filter(
                                  (s) => s.name !== "Draw"
                                );

                                const sortedSelections = [
                                  others[0],
                                  draw,
                                  others[1],
                                ];

                                return sortedSelections.map((sel, i) => (
                                  <OddsButton
                                    key={`${winnerQuestion._id}-${i}`}
                                    options={sel?.name}
                                    odd={sel?.currentOdds}
                                    selectedOption={sel}
                                    matchDetails={sportItem}
                                    betQuestions={winnerQuestion}
                                    setActiveBets={setActiveBets}
                                    activeBets={activeBets}
                                  />
                                ));
                              })()}
                            </>
                          ) : (
                            // for 2 bet odds buttons 
                            winnerQuestion?.selections?.map((sel, i) => (
                              <OddsButton
                                key={`${winnerQuestion._id}-${i}`}
                                options={sel?.name}
                                odd={sel.currentOdds}
                                selectedOption={sel}
                                matchDetails={sportItem}
                                betQuestions={winnerQuestion}
                                setActiveBets={setActiveBets}
                                activeBets={activeBets}
                                   
                              />
                            ))
                          )}
                        </div>
                      </div>

                  <div className={`col-span-1  ${isBetSlipOpen && isSidebarOpen ? 'max-1330px:hidden' : ''} ${isBetSlipOpen && "max-1075px:hidden"}  max-700px:hidden flex items-center mt-10 justify-center`}>
                  {
                     openIds[item.event._id] && (<>
                      {(()=>{
                         eventType = sportItem.event.type.toLowerCase();
                        if (eventType === "international") {
                          eventType = "international";
                        }else (
                          eventType = sportItem?.venue?.country?.toLowerCase()
                        );
                      })()}
                      <Link to={`/sports/${sportItem.category.title.toLowerCase()}/${eventType}/${sportItem.event.title.toLowerCase()}/${sportItem.title.toLowerCase()}`} className="text-[16px] font-bold text-[#dfe6eb] cursor-pointer transition-all duration-300">
                       +{sportItem.betQuestions?.length} 
                      </Link>
                    </>)
                  }

                  </div>
                      
                    </div>
                    
                  </div>
                );
              })}
        </div>
      ))}
    </div>
  );
}

export default GameOdds;
