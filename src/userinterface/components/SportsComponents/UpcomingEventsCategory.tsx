import React, { useContext, useEffect, useState } from "react";
import {
  BiBasketball,
  BiCategory,
  BiCricketBall,
  BiTennisBall,
} from "react-icons/bi";
import { BsPlayCircleFill } from "react-icons/bs";
import { CiFootball } from "react-icons/ci";
import { FaBaseballBall } from "react-icons/fa";
import { GiSoccerBall, GiUnlocking } from "react-icons/gi";
import { LuSticker } from "react-icons/lu";
import { SiRacket } from "react-icons/si";
import { TbPlayHandball } from "react-icons/tb";
import GameOdds from "./GameOdds";
import UserContext from "../../../context/UserContext";
import CombinedDataResponse, { SportData } from '../../../utils/types/liveMatchesCombinedData';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IconBase, IconType } from "react-icons";
import GameAndOddsForStartingSoon from "./GameAndOddsForStartingSoon";

const sports = [
  "football", "tennis", "basketball", "american-football", "baseball", "cricket",
  "darts", "esports", "handball", "aussie-rules", "badminton", "bandy", 
  "beach-volleyball", "floorball", "futsal", "hockey", "rugby", "snooker", 
  "table-tennis", "volleyball", "waterpolo"
];

interface Props{
  eventType:string
  Icons:IconType,
  sports?:CombinedDataResponse|undefined
}

function UpcomingEventsCategory({eventType,Icons,sports}:Props) {
  const [activeCategory, setActiveCategory] = useState("football");
  const [gameData,setGameData] = useState<CombinedDataResponse|undefined>(undefined)
  const [clicked, setClicked] = useState<string | null>(null);
  // const [liveCategories, setLiveCategories] = useState<string[] | undefined>(undefined);
  // const [liveMatches, setLiveMatches] = useState<SportData[] | undefined>(undefined);
  // const [gameDataByName, setGameDataByName] = useState<CombinedDataResponse | undefined>(undefined);
  const gameContext = useContext(UserContext);
  const SportsData = gameContext?.gameData;

  const navigate = useNavigate();
  const { sportName } = useParams(); // destructure directly

  const fetchSportsData = async () => {
    try {
      const response = await axios.get('http://localhost:000/sports/home/upcoming');
      setGameData (response.data); // Update state with the data
      
    } catch (error) {
      console.error('Error fetching sports data:', error); // Log any error
    }
  };
useEffect(()=>{
    fetchSportsData()     
},[])
console.log("gamedataUpcoming Events",gameData?.combinedData.map((item)=>(item.data)));



  // Fetch sport data by sports name
  // const fetchSportsDataByName = async () => {
  //   if (!sportName) {
  //     console.error("No sport name provided");
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(`http://localhost:3000/sports/live/${sportName}`);
  //     setGameDataByName(response.data); // Update state with the fetched data
  //     console.log("Fetched game data by sport name:", response.data); // Log the response instead of state (state is asynchronous)
  //   } catch (error) {
  //     console.error('Error fetching sports data:', error);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch data by sport name when the URL param changes
  //   if (sportName) {
  //     fetchSportsDataByName();
  //   }
  // }, [sportName]);

  // Handle live matches from game context
  // useEffect(() => {
  //   if (SportsData) {
  //     const combinedData = SportsData.combinedData.filter(sport => sport.data && sport.data.length);
  //     setLiveCategories(combinedData.map(item => item.sport));
  //     setLiveMatches(combinedData);
  //   }
  // }, [SportsData]);

  const loading = gameContext?.loading;

  const handleClick = (category: string) => {
    if (activeCategory === category) {
      return null;
    } else {
      setActiveCategory(category);
      navigate(`/sports/upcoming/${category}`);
    }
  };

  const handlePressed = (name: string) => {
    setClicked(name);
  };

  const handleUnPressed = () => {
    setClicked(null);
  };

  const getIconForCategory = (group: string) => {
    switch (group.toLowerCase()) {
      case "tennis":
        return <BiTennisBall size={34} />;
      case "baseball":
        return <FaBaseballBall size={34} />;
      case "soccer":
        return <GiSoccerBall size={34} />;
      case "basketball":
        return <BiBasketball size={34} />;
      case "cricket":
        return <BiCricketBall size={34} />;
      case "racket":
        return <SiRacket size={34} />;
      case "handball":
        return <TbPlayHandball size={34} />;
      case "football":
        return <CiFootball size={34} />;
      case "hockey":
        return <LuSticker size={34} />;
      case "badminton":
        return <GiUnlocking size={34} />;
      default:
        return <BiCategory size={34} />;
    }
  };

  return (
    <>
      <label className="font-bold text-lg flex items-center gap-2 my-4 flex-row">
        <Icons color="gray" /> {eventType}
      </label>

      {/* Live categories section */}
      <div className="bg-[#0f212e] overflow-y-hidden scrollbar-thin scrollbar-thumb-[#192e38] scrollbar-track-[#0f212e] rounded-md mb-4 flex justify-start items-center p-5 px-5 gap-8 iconColor">
        {gameData?.combinedData && gameData.combinedData.length > 0 ? (
          gameData.combinedData.map((item) => (
            <div
              key={item.sport}
              className={`flex items-center justify-start relative ${
                activeCategory === item.sport ? "text-white" : "bg-transparent"
              }`}
            >
              <div
                onMouseDown={() => handlePressed(item.sport)}
                onMouseUp={handleUnPressed}
                onMouseLeave={handleUnPressed}
                onClick={() => handleClick(item.sport)}
                className={`${
                  clicked === item.sport
                    ? "transform duration-200 scale-95"
                    : "duration-200 scale-100"
                } hover:text-white translate-y-1`}
              >
                {
                    getIconForCategory(item.sport)
             }
                
                <div className="text-[11px] leading-3 w-[46px] -ml-[5px] mt-2 text-center font-bold overflow-hidden whitespace-nowrap text-ellipsis">
                  {item.sport.charAt(0).toUpperCase() + item.sport.slice(1).toLowerCase()}
                </div>
                <div
                  className={`absolute top-1 text-[11px] px-[6px] flex items-center font-extrabold left-[50%] ${
                    activeCategory === item.sport ? "bg-blue-500 text-black" : "bg-black"
                  } rounded-full`}
                >
                  {/* {item.data.length} */}
                </div>
                <div
                  className={`w-[11px] h-[5px] ${
                    activeCategory === item.sport ? "" : "bg-transparent"
                  } absolute bg-blue-500 rounded-b-[4px] -top-6 left-[40%]`}
                />
              </div>
            </div>
          ))
        ) : (
          <div>No live categories available</div>
        )}
      </div>

      {/* Loading state or game odds display */}
      {loading ? (
        <div className="w-full my-28 flex justify-center items-center">
          <div className="w-20 rounded-xl flex items-center h-3 px-1 bg-slate-700">
            <div className="w-4 loading duration-100 h-2 bg-slate-300 rounded-full" />
          </div>
        </div>
      ) : (
        <GameAndOddsForStartingSoon data={gameData} selectedSport={activeCategory} />

      )}
    </>
  );
}

export default UpcomingEventsCategory;
