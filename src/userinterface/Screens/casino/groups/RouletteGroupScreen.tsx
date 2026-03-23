import  { useEffect, useState } from 'react';
// import CasinoSideBar from '../../../components/CasinoComponents/CasinoSideBar';
// import AuthenticatedHeader from '../../../components/universalComponents/AuthenticatedHeader';
// 
import SearchComponent from '../../../components/universalComponents/searchComponent';
// import FilterComponent from '../../../components/universalComponents/filterComponent';
// import ShortByComponent from '../../../components/universalComponents/shortByComponent';
import Provider from "../../../components/CasinoComponents/ProvidersSlider";

import game from "../../../../assets/images/exclusiveGames/games.png"
import game1 from "../../../../assets/images/exclusiveGames/games (1).png";
// import game2 from "../../../../assets/images/exclusiveGames/games (2).png";
// import game3 from "../../../../assets/images/exclusiveGames/games (3).png"
// import game4 from "../../../../assets/images/exclusiveGames/games (4).png";
// import game5 from "../../../../assets/images/exclusiveGames/games (5).png";
// import game6 from "../../../../assets/images/exclusiveGames/games (6).png";
// import game7 from "../../../../assets/images/exclusiveGames/games (7).png";
// import game8 from "../../../../assets/images/exclusiveGames/games (8).png";
// import game9 from "../../../../assets/images/exclusiveGames/games (9).png";;
// import game10 from "../../../../assets/images/exclusiveGames/games (10).png";
// import game11 from "../../../../assets/images/exclusiveGames/games (11).png";
// import game12 from "../../../../assets/images/exclusiveGames/games (12).png";
// import game13 from "../../../../assets/images/exclusiveGames/games (13).png";
// import game14 from "../../../../assets/images/exclusiveGames/games (14).png";
// import game15 from "../../../../assets/images/exclusiveGames/games (15).png";
// import game16 from "../../../../assets/images/exclusiveGames/games (16).png";
// import game17 from "../../../../assets/images/exclusiveGames/games (17).png";
import { LuOption } from 'react-icons/lu';
import LoadMoreComponent from '../../../components/universalComponents/LoadMoreComponent';
// import ToogleComponent from '../../../components/LandingPageComponents/ToggleTableComponent';
// import FooterComponent from '../../../components/LandingPageComponents/FooterComponent';
// import exclusiveGameStart from '../../../../assets/images/exclusiveGamesStar.png'
import GameCardsForGroupScreen from '../../../components/universalComponents/GameCardsForGroupScreens';
import ToggleTableComponent from '../../../components/LandingPageComponents/ToggleTableComponent';
import GroupScreenBanner from '../../../components/universalComponents/GroupScreenBanner';
import groupBannerDefaulImg from '../../../../assets/images/triple7.png'
import FilterComponent from '../../../components/universalComponents/filterComponent';
import ShortByComponent from '../../../components/universalComponents/shortByComponent';
const games:GameProp[] = [
  {
    title: 'Game 1',
    description: 'Description for Game 1',
    img: game,
    category:"Avatar"
  },
  {
    title: 'Game 2',
    description: 'Description for Game 2',
    img: game1,
    category:"Backseat Gaming"
  },
  {
    title: 'Game 1',
    description: 'Description for Game 1',
    img: game,
    category:"Avatar"
  },
  {
    title: 'Game 2',
    description: 'Description for Game 2',
    img: game1,
    category:"Backseat Gaming"
  },
  {
    title: 'Game 1',
    description: 'Description for Game 1',
    img: game,
    category:"Avatar"
  },
  {
    title: 'Game 1',
    description: 'Description for Game 1',
    img: game,
    category:"Avatar"
  },
  {
    title: 'Game 2',
    description: 'Description for Game 2',
    img: game1,
    category:"Backseat Gaming"
  },
  {
    title: 'Game 1',
    description: 'Description for Game 1',
    img: game,
    category:"Avatar"
  },




];
const totalLenght=games.length
console.log(totalLenght)

interface GameProp {
  title:string;
  description:string;
  img:string
  category:string
}

const toggleOption:toggleOptionProp[] = [
  { title: "My Bets", key: 'my-bets' },
  { title: "All Bets", key: 'all-bets'},
  { title: "High Rollers", key: 'high-rollers'},
  { title: "Race Leaderboard", key: 'race-leaderboard' },
];
interface toggleOptionProp {
  title:string;
  key:string;
}

let cardsToShow:number 
if(games.length>=10){
       cardsToShow = 10
       console.log(cardsToShow)
    }else{cardsToShow = games.length
    }  
export default function RouletteGroupScreen() {
    
   
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [visibleCards,setVisibleCards]=useState<number>(cardsToShow)
   
   
    // const [selectedFilter,setSelectedFilter]=useState([])
    // const [filteredItems,setFilteredItems]=useState(games)
    
    console.log(visibleCards)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLoadMore= () => {
    if(visibleCards<totalLenght) { setVisibleCards(prev => Math.min(prev + 20, games.length));
    }
    };
  return (
    
    <div className={`  w-full    `}>
    {/* main content here */}
   
  
  <GroupScreenBanner name='Roulette' img={groupBannerDefaulImg}/> 

  <div className=' w-full  flex justify-center'>
    <div className='md:w-[90%] w-[95%] lg:w-[80%]'>
      <SearchComponent/>
     
      <span className='flex  justify-between'> 
      <div>
        <FilterComponent games={games}/></div><div><ShortByComponent/>
        </div>
        </span>
    <GameCardsForGroupScreen visibleCards={visibleCards} games={games} />
 
   <div className='justify-center flex items-center p-2'> <LoadMoreComponent handleLoadMore={handleLoadMore}  totalLenght={totalLenght} visibleCards={visibleCards}/></div> 
   <Provider icon={LuOption} name='Provider'/>
   <ToggleTableComponent toggleOption={toggleOption}/>
   </div>
   </div>
  </div>

  );
}