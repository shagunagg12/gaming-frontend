import React, { useState } from "react"
import TableComponent  from "./TableComponent";
import SportsTableComponent from "./SportsTableComponent";
import RaceLeaderboardTableComponent from "./RaceLeaderboardTableComponent";
import MyBetsTable from "../CasinoComponents/MyBetsTable";
import BigWinsTable from "../CasinoComponents/BigWinsTable";
import LuckyWinsTable from "../CasinoComponents/LuckyWinsTable";
import ChallengesOption from "../CasinoComponents/ChallengesOption";
import DescriptionOption from "../CasinoComponents/DescriptionOption";
import ManualBetOption from "../CasinoComponents/ManualBetOption";
import AutoBetOption from "../CasinoComponents/AutoBetOption";
import LocalCurrency from "../universalComponents/LocalCurrency";
import OthersAll from "../universalComponents/TransactionComponent/OthersAll";


interface Props{
toggleOption:toggleOption[];
color?:string;
defaultTable?:string;
ClassName?:string;
containerWidth?:string;

}
interface toggleOption{
  title:string;
  key:string
 
}

export default  function ToggleTableComponent(props:Props):React.JSX.Element{

 const toggleOption= props.toggleOption
 const bgcColor = props.color
 const defaultTable = props.defaultTable
      const [activeCategory, setActiveCategory] = useState<string>(defaultTable||'high-rollers');

 


    const handleClick = (key: string) => () => {
        setActiveCategory(key);
      };

    return(
   
     <>
     <div className=" overflow-x-auto scrollbar-thin scrollbar-thumb-[#192e38] scrollbar-track-[#24434d]">
     <div className={` select-none font-bold text-sm rounded-full ${props.containerWidth} w-fit ${bgcColor} bg-[#0f212e] items-center justify-center p-[5px] min-h-10 flex flex-row max-sm:gap-1 gap-1`}>
        {toggleOption.map((item) => (
          <div
            key={item.key}
            className={`text-[#f4f5f2] ${props.ClassName}  text-nowrap  cursor-pointer rounded-full hover:bg-[#2f4553] h-11  flex ${activeCategory === item.key ? 'bg-[#2f4553] ' : 'bg-transparent'} px-5 max-sm:px-3 justify-center items-center`}
            onClick={handleClick(item.key)}
          >
            {item.title}
          </div>
        ))}
      </div>

     
       
  </div>
  <div className="mt-4">
        {/* {activeCategory === 'mybets' && </>} */}
        {activeCategory === 'my-bets' && <MyBetsTable />}
        {activeCategory === 'all-bets' && <SportsTableComponent />}
        {activeCategory === 'high-rollers' && <RaceLeaderboardTableComponent />}
        {activeCategory === 'race-leaderboard' && <RaceLeaderboardTableComponent />}
        {activeCategory === 'casino-bets' && <MyBetsTable />}
        {activeCategory === 'sports-bets' && <SportsTableComponent />}

          {/* gameDropddown */}
        {activeCategory === 'big-wins' && <BigWinsTable />}
        {activeCategory === 'lucky-wins' && <LuckyWinsTable />}
        {activeCategory === 'challenges' && <ChallengesOption />}
        {activeCategory === 'description' && <DescriptionOption />}

        {/* BetCalculator */}
        {activeCategory === 'manual' && <ManualBetOption />}
        {activeCategory === 'auto' && <AutoBetOption />}
        
        {/* wallet */}
        {activeCategory === 'local-currency' && <LocalCurrency />}
        {activeCategory === 'crypto' && <LocalCurrency />}
        
        {activeCategory === 'all' && <>
              <OthersAll />
        
            </>}
        </div>        
        
        </>)
        
}