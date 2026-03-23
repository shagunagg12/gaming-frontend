
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import { SiKdenlive } from "react-icons/si";
import { BsFillGiftFill } from "react-icons/bs";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { IoRocketSharp, IoTimer } from "react-icons/io5";
import { IconType } from "react-icons";
import { CgGames } from "react-icons/cg";
import GameCardSliderComponent from "../CasinoComponents/GameCardSliderComponent";
import { MdCasino, MdLiveTv } from "react-icons/md";
import GameCardForToogle from "../CasinoComponents/GameCardForToogle";
import Provider from "../CasinoComponents/ProvidersSlider";
import { GiGamepadCross } from "react-icons/gi";
import {FaFire } from "react-icons/fa";
import { PiFootballBold } from "react-icons/pi";
import SportsCategory from "../SportsComponents/SportsCategory";
import CombinedDataResponse from "../../../utils/types/liveMatchesCombinedData";
import { useNavigate } from "react-router-dom";
import UpcomingEventsCategory from "../SportsComponents/UpcomingEventsCategory";
import { TiFlowMerge } from "react-icons/ti";
import PopularSportData from "../SportsComponents/PopularSportData";
import UserContext from "../../../context/UserContext";
import SingleBet from "../SportsComponents/BetComponent/BetSlip/SingleBet";
import MultiBet from "../SportsComponents/BetComponent/BetSlip/MultiBet";
import BottomBetSlip from "../SportsComponents/BetComponent/BetSlip/BottomBetSlip";
import Calculator from "../SportsComponents/Calculator";
import FAQGeneral from "./AffiliateComponent/FAQGeneral";
import FaqAP from "./AffiliateComponent/FaqAffiliateProgram";
import FAQEarning from "./AffiliateComponent/FaqEarning";
import Crypto from "./TransactionComponent/Crpyto";
import LocalCurrency from "./TransactionComponent/LocalCurrency";
import CryptoWithdrawal from "./TransactionComponent/CryptoWithdrawal";
import LocalCurrencyWithdrawal from "./TransactionComponent/LocalCurrencyWithdrawal";
import Settled from "../SportsComponents/BetComponent/MyBets/Settled";
import BottomMyBet from "../SportsComponents/BetComponent/MyBets/BottomMyBet";
import Statistics from "./StatisticsModel/Statistics";
import Trophies from "./StatisticsModel/Trophies";
import Races from "./StatisticsModel/Races";
import Raffles from "./StatisticsModel/Raffles";
import ScoreCardToggleMain from "../SportsComponents/Sports_Scoreboard_Toggle1/ScorecardToggleMain";
import ScorecardToggleMap1 from "../SportsComponents/Sports_Scoreboard_Toggle1/ScorecardToggleMap1";
import ScorecardToggleMap2 from "../SportsComponents/Sports_Scoreboard_Toggle1/ScorecardToggleMap2";
import ScorecardToggleMap3 from "../SportsComponents/Sports_Scoreboard_Toggle1/ScorecardToggleMap3";
import ScoreboardToggle2AllBets from "../SportsComponents/Sports_Scoreboard_Toggle2/ScoreboardToggle2AllBets";
import ScoreboardToggle2HighRollers from "../SportsComponents/Sports_Scoreboard_Toggle2/ScoreboardToggle2HighRollers";
import ScoreboardToggle2RaceLeaderboard from "../SportsComponents/Sports_Scoreboard_Toggle2/ScoreboardToggle2RaceLeaderboard";

interface BetProps {
  onClickOutside: (value: boolean) => void;


}
interface GameProp {
  title: string;
  description: string;
  img: string
  category: string
  link?: string
}
interface toggleOptionProp {
  title: string;
  key: string;
  icon?: IconType;
}

interface Props {
  betProps?: BetProps;
  gamesNewRelease?: GameProp[];
  gamesLiveCasino?: GameProp[];
  gamesExclusives?: GameProp[];
  gameShows?: GameProp[];
  gamesOriginals?: GameProp[];
  gamesSlots?: GameProp[];
  sports?: GameProp[]
  toggleOptions: toggleOptionProp[]
  defaultToggleOption: string
  handleClickStatistics?:(key:string)=> void
  setActiveCategoryStatistics?:Dispatch<SetStateAction<string>>
  // data_API:data_API
}

export default function   ToggleComponent({
  betProps,
  gamesNewRelease,
  gamesLiveCasino,
  gamesExclusives,
  gameShows,
  gamesOriginals,
  gamesSlots,
  sports,
  toggleOptions,
  defaultToggleOption,
  setActiveCategoryStatistics
  // data_API,
}: Props): React.JSX.Element {

  const [activeCategory, setActiveCategory] = useState<string>(defaultToggleOption);
  const [gameData, setGameData] = useState<CombinedDataResponse | undefined>(undefined)
  const [calculator, setCalculator] = useState(false);
  const [calculatorMulti, setCalculatorMulti] = useState(false);
  const visibleCards = 21
  const upcomingGameData = useContext(UserContext)?.upcomingGameData
  useEffect(() => {
    setGameData(upcomingGameData)

  }, [upcomingGameData])
  const navigate = useNavigate()

  const handleClick = (key: string) => async () => {
    if (activeCategory === key) 
    {
      null
    } else {
      setActiveCategory(key);
      setActiveCategoryStatistics && setActiveCategoryStatistics(key)
    }
    if (key === 'lobby-sports') {
      navigate(`/sports/home`);
    } else if (key === 'starting-soon') {
      navigate(`/sports/home/upcoming`);
    } else if (key === 'my-bets') {
      navigate(`/sports/home/my-bets`);
    } else if (key === 'favourites') {
      navigate(`/sports/home/favourites`);
    }
  };



// w-[862px]
  return (<>
    <div className=" max-xl:overflow-x-scroll scrollbar-thin scrollbar-thumb-[#192e38] scrollbar-track-[#24434d]">
      <div className="  select-none font-bold text-sm rounded-full ] w-fit whitespace-nowrap bg-[#0f212e] items-center justify-center p-[5px] min-h-10 flex flex-row max-sm:gap-1 gap-1">
        {toggleOptions.map((item) => (
          <div
            key={item.key}
            className={`text-[#f4f5f2] cursor-pointer rounded-full hover:bg-[#2f4553] h-11 flex ${activeCategory === item.key ? 'bg-[#2f4553] ' : 'bg-transparent'} px-4 justify-center items-center`}
            onClick={  handleClick(item.key) }
          >{item.icon ? <><item.icon className="mx-1" />{item.title}</> : item.title}


          </div>
        ))}
      </div>

    </div>
    {/* for casino */}
    {activeCategory === 'originals' && <GameCardForToogle icon={FaFireFlameCurved} title="Originals" games={gamesOriginals} visibleCards={visibleCards} link='original-game' />}
    {activeCategory === 'slots' && <GameCardForToogle icon={CgGames} title="Slots" games={gamesSlots} visibleCards={visibleCards} link='slots' />}
    {activeCategory === 'live-casino' && <GameCardForToogle icon={SiKdenlive} title="Live Casino" games={gamesLiveCasino} visibleCards={visibleCards} link='live-casino' />}
    {activeCategory === 'game-shows' && <GameCardForToogle icon={BsFillGiftFill} title="Game Shows" games={gameShows} visibleCards={visibleCards} link='game-show' />}
    {activeCategory === 'exclusives' && <GameCardForToogle icon={BsFillBookmarkStarFill} title="Exclusives" games={gamesExclusives} visibleCards={visibleCards} link='exclusive' />}
    {activeCategory === 'new-releases' && <GameCardForToogle icon={IoRocketSharp} title="New Release" games={gamesNewRelease} visibleCards={visibleCards} link='new-release' />}

    {activeCategory === 'lobby-casino' && <>
      <GameCardSliderComponent games={gamesOriginals} name="Originals" icon={FaFire} link="original-game" />
      <GameCardSliderComponent games={gamesSlots} name="Slots" icon={MdCasino} link="slots" />
      <Provider name="Provider" icon={GiGamepadCross} link="providers" />
      <GameCardSliderComponent games={gamesLiveCasino} name="Live Casino" icon={MdLiveTv} link="live-casino" />
      <GameCardSliderComponent games={gameShows} name="Game Shows" icon={BsFillGiftFill} link="game-show" />
      <GameCardSliderComponent games={gamesExclusives} name="Exlusive Games" icon={BsFillBookmarkStarFill} link="exclusive" />
      <GameCardSliderComponent games={gamesNewRelease} name="New Release" icon={IoRocketSharp} link="new-release" />     </>}

    {/* for sports */}
    {activeCategory === 'lobby-sports' && <>
      <GameCardSliderComponent games={sports} name="Top Sports" icon={PiFootballBold} disableLink={true} />
      <SportsCategory sports={gameData} eventType="Live Events" Icons={IoTimer} />
    </>}
    {activeCategory === 'starting-soon' && <>
      <UpcomingEventsCategory eventType="Starting Soon" Icons={TiFlowMerge} />
    </>}
    {activeCategory === 'live-and-upcoming' && <>
      <PopularSportData selectedSport="Tennis" data={gameData} />
    </>}
    {activeCategory === 'betSlipSingle' && <>
      <SingleBet betProps={betProps} setCalculator={setCalculator} />
      {/* {calculator &&
        <Calculator />} */}
      <BottomBetSlip setCalculator={setCalculator} AmountBar={false} Random={false} TotalNumber={2.555555555} EstNumber={2.555555555} TotalText="Total Stake" EstText="Est. Payout" />
    </>}
    {activeCategory === 'betSlipMulti' && <>
      <MultiBet />
      {/* {calculatorMulti &&
        <Calculator />} */}
      <BottomBetSlip setCalculator={setCalculatorMulti} AmountBar={true} Random={true} TotalNumber={8.29} EstNumber={"0.00000000"} TotalText="Total Odds" EstText="Est. Payout" />
    </>}
    {activeCategory === 'generalFaq' && <>
      <FAQGeneral />
    </>}
    {activeCategory === 'affFaq' && <>
      <FaqAP />
    </>}
    {activeCategory === 'earningFaq' && <>
      <FAQEarning />

    </>}
    {activeCategory === 'crypto' && <>
      <Crypto />
    </>}
    {activeCategory === 'localcurrency' && <>
      <LocalCurrency />

    </>}
    {activeCategory === 'cryptowithdrawal' && <>
      <CryptoWithdrawal />
    </>}
    {activeCategory === 'localcurrencywithdrawal' && <>
      <LocalCurrencyWithdrawal />

    </>}
    {/* {activeCategory === 'all' && <>
      <OthersAll />

    </>} */}
    {activeCategory === 'mybetSettled' && <>
      <Settled />
      <BottomMyBet />
    </>}
    {activeCategory === 'mybetActive' && <>
    </>}
    {activeCategory === 'Statistics' && <>
      <Statistics />
    </>}
    {activeCategory === 'Trophies' && <>
      <Trophies />
    </>}
    {activeCategory === 'Races' && <>
      <Races />
    </>}
    {activeCategory === 'Raffles' && <>
      <Raffles />
    </>}
    {activeCategory === 'scorecard_main' && <>
      <ScoreCardToggleMain />
    </>}
    {activeCategory === 'map1' && <>
      <ScorecardToggleMap1 />
    </>}
    {activeCategory === 'map2' && <>
      <ScorecardToggleMap2 />
    </>}
    {activeCategory === 'map3' && <>
      <ScorecardToggleMap3 />
    </>}
    {activeCategory==="all_bets" &&<>
    <ScoreboardToggle2AllBets/>
    </>}
    {/* race_leaderboard */}
    {
      activeCategory==="high_rollers" &&<>
      <ScoreboardToggle2HighRollers/>
      </>
    }
{
      activeCategory==="race_leaderboard" &&<>
      <ScoreboardToggle2RaceLeaderboard/>
      </>
    }
    
  </>);
}