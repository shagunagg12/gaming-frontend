import React, { useEffect, useState ,useContext} from 'react'
import { ScrollRestoration, useParams } from 'react-router-dom'
import PromoCardSlider from '../../components/universalComponents/PromoCardSlider'
import SearchComponent from '../../components/universalComponents/searchComponent'
import ToggleComponent from '../../components/universalComponents/ToggleComponent'
import ToggleTableComponent from '../../components/LandingPageComponents/ToggleTableComponent'
import { IconType } from 'react-icons'
import gameshows from '../../../assets/images/exclusiveGames/games (1).png'
import { TbCherryFilled } from 'react-icons/tb'
import { HiTicket } from 'react-icons/hi'
import { FaStar } from 'react-icons/fa'
import { MdTimer } from 'react-icons/md'
import SportsCategory from '../../components/SportsComponents/SportsCategory'
import  dataAPI  from "../../../API_DATA";
import UserContext from '../../../context/UserContext'
import axios from 'axios'
import { LuTimer } from 'react-icons/lu'
import CombinedDataResponse from '../../../utils/types/liveMatchesCombinedData'
import UpcomingEventsCategory from '../../components/SportsComponents/UpcomingEventsCategory'


  interface Props{
    data:CombinedDataResponse|undefined
  }

function UpcomingEvents():React.JSX.Element {

   const {SportName} = useParams()

  
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);


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
      title:string;
      key:string;
    }
    const toggleTableOption:toggleTableOption[] = [
        { title: "My Bets", key: 'my-bets' },
        { title: "All Bets", key: 'all-bets'},
        { title: "High Rollers", key: 'high-rollers'},
        { title: "Race Leaderboard", key: 'race-leaderboard' },
      ];
      



  return (
    <>
    <ScrollRestoration/>
     <div className={` flex-grow w-full justify-center flex transition-all duration-300`}>
         <div className='md:w-[90%] w-[95%] lg:w-[80%] max-sm:w-[95%]'>

     
          <UpcomingEventsCategory  eventType='Starting Soon' Icons={LuTimer}/>
           
          <ToggleTableComponent toggleOption={toggleTableOption}/>
          
         </div>
         </div>
     </>
  )
}

export default UpcomingEvents
