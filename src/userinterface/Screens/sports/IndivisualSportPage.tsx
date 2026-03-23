import React, { useEffect, useState ,useContext} from 'react'
import { ScrollRestoration, useParams } from 'react-router-dom'
import PromoCardSlider from '../../components/universalComponents/PromoCardSlider'
import SearchComponent from '../../components/universalComponents/searchComponent'
import ToggleComponent from '../../components/universalComponents/ToggleComponent'
import ToggleTableComponent from '../../components/LandingPageComponents/ToggleTableComponent'
import { IconBase, IconType } from 'react-icons'
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
import PrevButton from '../../components/SportsComponents/PrevButton'
import { BiStar } from 'react-icons/bi'


  interface Props{
    data:CombinedDataResponse|undefined
  }

function IndivisualSportData():React.JSX.Element {

   const {SportName} = useParams()

  
    
    interface toggleTableOption {
      title:string;
      key:string;
    }

    const toggleTableOption:toggleTableOption[] = [
        { title: "All Bets", key: 'all-bets'},
        { title: "High Rollers", key: 'high-rollers'},
        { title: "Race Leaderboard", key: 'race-leaderboard' },
      ];
      
         
    interface toggleOption {
      title:string;
      key:string;
     
    }

      const toggleOption:toggleOption[] = [
        { title: "Live & Upcoming", key: 'live-and-upcoming'},
        { title: "Outrights", key: 'outrights'},
        { title: `All Tennis`, key: 'all-tennis'},
      ];


  return (
    <>
    <ScrollRestoration/>
     <div className={` flex-grow w-full justify-center flex transition-all duration-300`}>
         <div className='md:w-[90%] w-[95%] lg:w-[80%] max-sm:w-[95%]'>
           <div className='flex gap-4 mt-8 mb-8'>
           <span> <PrevButton/></span> 
           <span className='px-8 bg-[#0f212e] rounded-md flex items-center justify-center'>Tennis</span>
           <span className='px-5 bg-[#2f4553] rounded-md flex items-center justify-center hover:bg-[#436177] cursor-pointer'><BiStar/></span>
           </div>

         <div className='mb-8'><ToggleComponent defaultToggleOption='live-and-upcoming' toggleOptions={toggleOption}/></div> 

          <ToggleTableComponent toggleOption={toggleTableOption}/>
          
         </div>
         </div>
     </>
  )
}

export default IndivisualSportData
