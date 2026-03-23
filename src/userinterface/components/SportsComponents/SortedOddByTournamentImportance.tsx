import React from 'react'
import { ImStatsBars } from 'react-icons/im'
import OddsButton from './OddsButton'
import { MatchData, SportData } from '../../../utils/types/liveMatchesCombinedData'
import { Tournament } from '../../../utils/types/Types'

interface  Props{
  gameData: {sport:String,matches:MatchData[]}[]
  tournament:Tournament
  openTournamentsId:number
}
function SortedOddByTournamentImportance({gameData,tournament,openTournamentsId}:Props) {



  const startingTime = (time: string) => {
    const ReadableTime = new Date(time).toLocaleTimeString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    return ReadableTime;
  };
  console.log("ttest",gameData);
  
  

 const active = 'football'
  return (
    <>
     {   
         gameData?.map((sportItem) =>
            sportItem.sport===active&&
            sportItem.matches
              .filter((match) => match.id === tournament.id)
              .map((filteredMatch) => (
                <div key={filteredMatch.tournament_id} className="mt-3 transition-all duration-300">
                  <hr className="bg-[#2f4553] w-full border-none -translate-y-3 h-[2px]" />
                  <div className="grid grid-cols-2 px-5">
                    <div>
                      <p className="text-[11px] mt-1">{startingTime(filteredMatch.start_time)}</p>
                      <div className="font-bold text-sm mt-2 flex justify-between">
                        <span className="text-[15px]">{filteredMatch.home_team_name}</span>
                        <div className="flex gap-5 mr-5 secondaryTextColor text-[13px]">
                          <span>{filteredMatch.home_team_score?.display}</span>
                          <span className="text-orange-500">{filteredMatch.home_team_score?.period_1}</span>
                          <span><ImStatsBars size={16} /></span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-[10px] mt-2 flex justify-center secondaryTextColor">Winner</div>
                      <div className="grid grid-cols-2 mb-3 mt-2 gap-2">
                        <OddsButton />
                        <OddsButton />
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )
     } 
    </>
  )
}

export default SortedOddByTournamentImportance
