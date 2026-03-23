import React, { useContext, useEffect, useState } from 'react'
import { MatchData, SportData } from '../../../utils/types/liveMatchesCombinedData'
import { FaChevronLeft } from 'react-icons/fa';
import SortedTournamentByImportance from './SortedTournamentByImportance';
import UserContext from '../../../context/UserContext';


interface Props {
  data:{sport:String,matches:MatchData[]}[];
  gameData:{sport:String,matches:MatchData[]}[] 

}
function SortedByClass({data,gameData}:Props) {
  const [openClasses, setOpenClasses] = useState<number[]>([]);
  const [currentClassId, setCurrentClassId] = useState<number | undefined>(undefined);
  const setClassId = useContext(UserContext)?.setClassId
  const classId = useContext(UserContext)?.classId
  const tournamentsLoading = useContext(UserContext)?.tournamentsLoading

  const handleClassClick = (id: number) => {
    setCurrentClassId(id)
    setOpenClasses((prev) =>
      prev.includes(id) ? prev.filter((classId) => classId !== id) : [...prev, id]
    );
  };
  useEffect(() => {
    if (currentClassId !== undefined) {
      console.log("Updating context with classId: ", currentClassId); // Log before context update
      setClassId && setClassId(currentClassId); // Update context
    }
  }, [currentClassId, setClassId]);
  
  

  const active="football" 
  return (
    <>
      {data.map((matches) =>
            matches.matches.length > 0 && matches.sport === active ? (
              <div>
                {matches.matches
                  .filter((item, index, self) =>
                    item.class_name && index === self.findIndex(i => i.class_name === item.class_name)
                  )
                  .map((country) => (
                    <div key={country.class_name}>
                      <div
                        onClick={() => handleClassClick(country.class_id)}
                        className="bg-[#071d2a] border-[#283b46] border-t shadow-sm shadow-black relative w-full overflow-hidden rounded my-4 cursor-pointer"
                      >
                        <div className="items-center flex justify-between">
                          <span className={`absolute right-6 top-4 text-[#9cbad3] cursor-pointer transition-all duration-300 ${openClasses.includes(country.class_id) ? "-rotate-90" : ""}`}>
                            <FaChevronLeft size={13} />
                          </span>
                        </div>
                        <span className="text-[13px] font-semibold flex items-center p-3">
                          {country.class_name}
                        </span>
                      </div>
                    {
                      tournamentsLoading?<>Loading......</>:<>{openClasses.includes(country.class_id)&& (
                        <SortedTournamentByImportance gameData={gameData} country={country}/>
                      )}</>
                      
                    }
                      
                    </div>
                  ))}

              </div>
            ) : null
          )}
    </>
  )
}

export default SortedByClass
