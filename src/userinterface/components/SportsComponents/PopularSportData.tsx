import { useContext, useEffect, useState } from "react";
import { FaArrowRight, FaChevronLeft } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { BsCollectionPlayFill, BsFire } from "react-icons/bs";
import OddsButton from "./OddsButton";
import UserContext from "../../../context/UserContext";
import CombinedDataResponse, { MatchData, SportData } from '../../../utils/types/liveMatchesCombinedData';
import { BiArrowFromRight, BiArrowToRight } from "react-icons/bi";
import axios from "axios";
import { useParams } from "react-router-dom";
import ClassResponse from "../../../utils/types/Types";
import SortedTournamentByImportance from "./SortedTournamentByImportance";
import SortedByClass from "./SortedByClass";

interface Props {
  selectedSport: string;
  data: CombinedDataResponse | undefined
}

function PopularSportData({ selectedSport, data }: Props) {
  const [gameData, setGameData] = useState<SportData[]>([]);
  const [gameTounament, setGameTournaments] = useState<ClassResponse | undefined>(undefined);
  const [sportDataArray, setSportDataArray] = useState<SportData[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
  const isUpcomingLoading = useContext(UserContext)?.isUpcomingLoading;
  const Tournament = useContext(UserContext)?.gameTounament

 

  useEffect(() => {
    setIsLoading(isUpcomingLoading);
  }, [isUpcomingLoading]);

  // Ensure `currentClassId` is properly logged and updated





  const { sportName } = useParams();

  useEffect(() => {
    if (data) {
      const combinedData = data.combinedData.filter(sport => sport.data && sport.data.length);
      setGameTournaments(Tournament)
      console.log('tournamentbyid',gameTounament);
    
      setGameData(combinedData);
      setSportDataArray(
        data?.combinedData
          .filter(sport => sport.data && sport.data.length)
          .filter(item => item.sport === selectedSport)
      );
    }
  }, [data, selectedSport,Tournament]);

  const SortedByTournamentImportance = () => {
    if (!Array.isArray(gameData)) return [];
    return gameData.map((sportData) => {
      const { sport, data } = sportData;
      const sortedMatches = data
        .filter((match) => match.tournament_importance > 0)
        .sort((a, b) => b.tournament_importance - a.tournament_importance);
      return {
        sport,
        matches: sortedMatches,
      };
    });
  };
  const sortedMatchesBySport = SortedByTournamentImportance();

 
   
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

  const active = 'football';

  return (
    <div className="transition-opacity">
      {isLoading ? (
        <>Loading....</>
      ) : (
        <>
          <div className="text-lg font-bold flex items-center gap-2 mt-6">
            <BsFire /> Popular {active.charAt(0).toUpperCase() + active.slice(1)}
          </div>
        <SortedByClass gameData={sortedMatchesBySport} data={sortedMatchesBySport}/>
        </>
      )}
    </div>
  );
}

export default PopularSportData;
