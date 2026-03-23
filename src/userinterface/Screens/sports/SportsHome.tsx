import React, { useEffect, useState, useContext } from 'react'
import { ScrollRestoration } from 'react-router-dom'
import PromoCardSlider from '../../components/universalComponents/PromoCardSlider'
import SearchComponent from '../../components/universalComponents/searchComponent'
import ToggleComponent from '../../components/universalComponents/ToggleComponent'
import ToggleTableComponent from '../../components/LandingPageComponents/ToggleTableComponent'
import { IconType } from 'react-icons'
import gameshows from '../../../assets/images/exclusiveGames/games (1).png'
import baseball from "../../../assets/sports/baseball-en.avif"
import basketball from "../../../assets/sports/basketball-en.avif"
import counterStrike from "../../../assets/sports/counter-strike-en.avif"
import cricket from "../../../assets/sports/cricket-en.avif"
import  dota from "../../../assets/sports/dota-2-en.avif"
import  golf from "../../../assets/sports/golf-en.avif"
import  hockey from "../../../assets/sports/ice-hockey-en.avif"
import  racing from "../../../assets/sports/racing-en.avif"
import  soccer from "../../../assets/sports/soccer-en.avif"
import  tennis from "../../../assets/sports/tennis-en.avif"

import { TbCherryFilled } from 'react-icons/tb'
import { HiTicket } from 'react-icons/hi'
import { FaStar } from 'react-icons/fa'
import { MdTimer } from 'react-icons/md'
import SportsCategory from '../../components/SportsComponents/SportsCategory'
import dataAPI from "../../../API_DATA";
import UserContext from '../../../context/UserContext'
import axios from 'axios'
import { useAuth } from '../../../context/authContext'


function SportsHome(): React.JSX.Element {


  const [data, setData] = useState();


  const {isBetSlipOpen, isSidebarOpen, setIsSidebarOpen} = useAuth()  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1030px)');

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsSidebarOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Check the initial screen size
    if (mediaQuery.matches) {
      setIsSidebarOpen(false);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  interface toggleTableOption {
    title: string;
    key: string;
  }
  const toggleTableOption: toggleTableOption[] = [
    { title: "My Bets", key: 'my-bets' },
    { title: "All Bets", key: 'all-bets' },
    { title: "High Rollers", key: 'high-rollers' },
    { title: "Race Leaderboard", key: 'race-leaderboard' },
  ];


  interface toggleCategoryOption {
    title: string;
    key: string;
    icon: IconType;
  }
  const toggleCategoryOption: toggleCategoryOption[] = [

    { title: "Lobby", key: 'lobby-sports', icon: TbCherryFilled },
    { title: "My Bets", key: 'my-bets', icon: HiTicket },
    { title: "Favourites", key: 'favourites', icon: FaStar },
    { title: "Starting Soon", key: 'starting-soon', icon: MdTimer },


  ];
  interface GameProp {
    title: string;
    description: string;
    img: string;
    link?: string;
    category: string;
  }

 const sportsCategory: GameProp[] = [
  {
    title: "Soccer",
    description: "Premier League, La Liga, and more.",
    img: soccer,
    category: "avatar",
    link: "soccer"
  },
  {
    title: "Tennis",
    description: "Watch ATP and WTA tennis live.",
    img: tennis,
    category: "avatar",
    link: "tennis"
  },{
    title: "Baseball",
    description: "Watch exciting baseball tournaments.",
    img: baseball,
    category: "avatar",
    link: "baseball"
  },
  {
    title: "Basketball",
    description: "Live basketball games and highlights.",
    img: basketball,
    category: "avatar",
    link: "basketball"
  },

  {
    title: "Cricket",
    description: "Live international and domestic cricket.",
    img: cricket,
    category: "avatar",
    link: "cricket"
  },

  {
    title: "Golf",
    description: "International golf tournaments.",
    img: golf,
    category: "avatar",
    link: "golf"
  },
  {
    title: "Ice Hockey",
    description: "NHL and global hockey matches.",
    img: hockey,
    category: "avatar",
    link: "hockey"
  },
  {
    title: "Racing",
    description: "Live Formula 1 and MotoGP races.",
    img: racing,
    category: "avatar",
    link: "racing"
  },

  {
    title: "Counter-Strike",
    description: "Top e-sports matches in CS:GO.",
    img: counterStrike,
    category: "avatar",
    link: "counter-strike"
  },
  {
    title: "Dota 2",
    description: "Competitive Dota 2 events and replays.",
    img: dota,
    category: "avatar",
    link: "dota-2"
  },
];
 

  return (
    <>
    <ScrollRestoration/>
     <div className={` flex-grow w-full justify-center flex transition-all duration-300 `}>
         <div className={`md:w-[100%] w-[100%] lg:w-[100%]  max-sm:w-[100%] px-auto pt-4 pb-8 ${isSidebarOpen ? "max-w-screen-xl  mx-auto px-6" : ""} ${isBetSlipOpen ? "max-w-screen-2xl  mx-auto px-6" : ""} px-10 max-md:px-2 max-w-screen-2xl`}>
         <PromoCardSlider isOpen={isSidebarOpen}/>

           <SearchComponent/>
           {/* <ToggleComponent/> */}
    
           <ToggleComponent  defaultToggleOption='lobby-sports' sports={sportsCategory} toggleOptions={toggleCategoryOption} 
              />

           
           <ToggleTableComponent toggleOption={toggleTableOption}/>
          
         </div>
         </div>
     </>
  )
}

export default SportsHome
