import React, { useContext, useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import UserContext from '../../../context/UserContext';
import ClassResponse from '../../../utils/types/Types';
import { MatchData, SportData } from '../../../utils/types/liveMatchesCombinedData';
import SortedOddByTournamentImportance from './SortedOddByTournamentImportance';

interface Props {
  country: MatchData;
  gameData:{sport:String,matches:MatchData[]}[]
}

function SortedTournamentByImportance({ country, gameData }: Props) {
  const [openTournaments, setOpenTournaments] = useState<{ [key: number]: { [key: number]: boolean } }>({});
  const [gameTournaments, setGameTournaments] = useState<ClassResponse | undefined>(undefined);
  const [openTournamentsId, setOpenTournamentId] = useState< number>(0);
  
  const Tournament = useContext(UserContext)?.gameTounament;

  // Set tournament data from context when available
  useEffect(() => {
    setGameTournaments(Tournament);
  }, [Tournament]);

  // Function to toggle the open state of a tournament
  const toggleTournament = (classId: number, tournamentId: number) => {
    setOpenTournamentId(tournamentId)
    
    
    setOpenTournaments((prev) => ({
      ...prev,
      [classId]: {
        ...prev[classId],
        [tournamentId]: !prev[classId]?.[tournamentId], // Toggle the clicked tournament
      },
    }));
  };

  // Filter and map tournaments
  const sortByTournament = gameTournaments?.data?.filter(
    (tournamentList) => tournamentList.class_id === country?.class_id
  );

  return (
    <>
      {sortByTournament?.map((tournamentList) =>
        tournamentList.tournaments
          .filter((tournament) => tournament.importance > 0)
          .map((tournament) => (
            <div
              key={tournament.id}
              className="bg-[#213743] border-[#2f4553] border-t shadow-sm shadow-black relative w-full overflow-hidden rounded my-4"
            >
              <div
                onClick={() => toggleTournament(country?.class_id, tournament.id)}
                className="items-center flex justify-between cursor-pointer"
              >
                <span
                  className={`absolute right-6 top-4 text-[#9cbad3] cursor-pointer transition-all duration-300 ${
                    openTournaments[country.class_id]?.[tournament.id] ? '-rotate-90' : ''
                  }`}
                >
                  <FaChevronLeft size={13} />
                </span>
              </div>
              <span className="text-[13px] font-semibold flex items-center p-3">
                {tournament.name}
              </span>
              {openTournaments[country.class_id]?.[tournament.id] && (
                <SortedOddByTournamentImportance openTournamentsId={openTournamentsId} gameData={gameData} tournament={tournament} />
              )}
            </div>
          ))
      )}
    </>
  );
}

export default SortedTournamentByImportance;
