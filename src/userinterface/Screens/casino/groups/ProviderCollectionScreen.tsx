import  {  useState } from 'react';
import CasinoSideBar from '../../../components/CasinoComponents/CasinoSideBar';
import AuthenticatedHeader from '../../../components/universalComponents/AuthenticatedHeader';

import SearchComponent from '../../../components/universalComponents/searchComponent';
import FilterComponent from '../../../components/universalComponents/filterComponent';
import ShortByComponent from '../../../components/universalComponents/shortByComponent';
import Provider from "../../../components/CasinoComponents/ProvidersSlider";

import game from "../../../../assets/images/originalGames/games.png"
import game1 from "../../../../assets/images/originalGames/games (1).png";
import game2 from "../../../../assets/images/originalGames/games (2).png";
import game3 from "../../../../assets/images/originalGames/games (3).png"
import game4 from "../../../../assets/images/originalGames/games (4).png";
import game5 from "../../../../assets/images/originalGames/games (5).png";
import game6 from "../../../../assets/images/originalGames/games (6).png";
import game7 from "../../../../assets/images/originalGames/games (7).png";
import game8 from "../../../../assets/images/originalGames/games (8).png";
import game9 from "../../../../assets/images/originalGames/games (9).png";;
import game10 from "../../../../assets/images/originalGames/games (10).png";
import game11 from "../../../../assets/images/originalGames/games (11).png";
import game12 from "../../../../assets/images/originalGames/games (12).png";
import game13 from "../../../../assets/images/originalGames/games (13).png";
import game14 from "../../../../assets/images/originalGames/games (14).png";
import game15 from "../../../../assets/images/originalGames/games (15).png";
import game16 from "../../../../assets/images/originalGames/games (16).png";
import game17 from "../../../../assets/images/originalGames/games (17).png";
import { LuOption } from 'react-icons/lu';
import LoadMoreComponent from '../../../components/universalComponents/LoadMoreComponent';
import FooterComponent from '../../../components/LandingPageComponents/FooterComponent';
import casinoDealer from '../../../../assets/images/casinoDealer.png'
import GameCardsForGroupScreen from '../../../components/universalComponents/GameCardsForGroupScreens';
import ToggleTableComponent from '../../../components/LandingPageComponents/ToggleTableComponent';
import GroupScreenBanner from '../../../components/universalComponents/GroupScreenBanner';
import originalGameImg from '../../../../assets/images/gameCards.png'
import AllProvider from '../../../components/universalComponents/AllProvider';

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
    title: 'Game 3',
    description: 'Description for Game 3',
    img: game2,
    category:"Belatra"
  },
  {
    title: 'Game 4',
    description: 'Description for Game 1',
    img:game3,
    category:'BGaming'
  },
  {
    title: 'Game 5',
    description: 'Description for Game 2',
    img: game4,
    category:'Devon Webb'
  },
  {
    title: 'Game 6',
    description: 'Description for Game 3',
    img: game5,
    category:'Devon Webb'
  },
  {
    title: 'Game 7',
    description: 'Description for Game 1',
    img: game6,
    category:'Devon Webb'
  },
  {
    title: 'Game 8',
    description: 'Description for Game 2',
    img: game7,
    category:'Devon Webb'
  },
  {
    title: 'Game 9',
    description: 'Description for Game 3',
    img:game8,
    category:'Devon Webb'
  },
  {
    title: 'Game 10',
    description: 'Description for Game 4',
    img: game9,
    category:'Devon Webb'
  },
  {
    title: 'Game 111',
    description: 'Description for Game 1',
    img: game10,
    category:'Devon Webb'
  },
  {
    title: 'Game 12',
    description: 'Description for Game 2',
    img: game11,
    category:'Devon Webb'
  },
  {
    title: 'Game 13',
    description: 'Description for Game 3',
    img:game12,
    category:'Devon Webb'
  },
  {
    title: 'Game 14',
    description: 'Description for Game 1',
    img: game13,
    category:'Devon Webb'
  },
  {
    title: 'Game 15',
    description: 'Description for Game 2',
    img:game14,
    category:'Devon Webb'
  },
  {
    title: 'Game 16',
    description: 'Description for Game 3',
    img:game15,
    category:'Devon Webb'
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: game16,
    category:'Devon Webb'
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: game17,
    category:'Devon Webb'
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: game17,
    category:'Devon Webb'
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: game17,
    category:'Devon Webb'
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

export default function ProviderCollectionScreen() {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [visibleCards,setVisibleCards]=useState<number>(15)
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
<>
    {/* <div className=" h-screen bg-[#1b4444] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#192e38] scrollbar-track-[#24434d]"> */}
    {/* <CasinoSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
    {/* <div className={`flex flex-col w-full  justify-center  transition-all duration-300`}> */}
      {/* <d  iv className="h-[60px] fixed top-0 w-full z-30">
        <AuthenticatedHeader isOpen={isSidebarOpen} />
      </div> */}
      
  

     
      <div className={`  w-full    `}>
        {/* main content here */}
       
      
      <GroupScreenBanner name='Providers' w={"8rem"} img={originalGameImg}/> 
    
      <div className=' w-full  flex justify-center'>
        <div className='md:w-[90%] w-[95%] lg:w-[80%]'>
          <SearchComponent/>
         
          {/* <span className='flex  justify-between'> 
          <div>
            <FilterComponent games={games}/></div><div><ShortByComponent/>
            </div>
            </span> */}
        <AllProvider />
     
   
       <ToggleTableComponent toggleOption={toggleOption}/>
       </div>
       </div>
      </div>
       {/* <div className={`mt-8 ${isSidebarOpen ? 'xl:ml-[260px]  lg:ml-[260px]   ' : 'md:ml-[80px] ' }   select-none    `}>
    <FooterComponent/>
    </div> */}
    {/* </div> */}
  {/* </div> */}
  </>
  );
}