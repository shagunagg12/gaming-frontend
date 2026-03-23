import React from 'react'
import ScoreBoardAndLiveStream from '../../components/SportsComponents/ScoreboardAndLiveStream'
import PrevButton from '../../components/SportsComponents/PrevButton'
import { BiSolidTennisBall, BiStar } from 'react-icons/bi'


export default function MainBetPage() {
  return (
    <>
     <div className={` flex-grow w-full justify-center flex transition-all duration-300`}>
         <div className='md:w-[90%] w-[95%] lg:w-[80%] max-sm:w-[95%]'>
         <div className='flex gap-4 mt-8 mb-8'>
           <span> <PrevButton/></span> 
           <span className='px-8 bg-[#0f212e] rounded-md flex items-center justify-center'>Tennis</span>
           <span className='px-5 bg-[#2f4553] rounded-md flex items-center justify-center hover:bg-[#436177] cursor-pointer'><BiStar/></span>
           </div>
           <div className='w-fit'>
          <ScoreBoardAndLiveStream card_time='6:30 PM' card_date='11/5/2024' card_team1_T1='Rublev' card_team1_T2='Andrey' card_team2_T1='Sonego' card_team2_T2='Lorenzo' card_icon={BiSolidTennisBall} card_t1='1st' card_t2='2nd' card_t3='3rd'/>
          </div>
         </div>
         </div>
    </>
  )
}
