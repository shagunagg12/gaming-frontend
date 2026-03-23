import React from 'react'
import welcomesportsen from '../../../assets/images/welcome-sports-en.jpg'
import { BiBall, BiSolidTennisBall, BiTennisBall } from 'react-icons/bi'
import ToggleComponent from '../universalComponents/ToggleComponent'
import { IconType } from 'react-icons';

interface Props{
  card_date?:string;
  card_time?:string;
  card_t1?:string;
  card_t2?:string;
  card_t3?:string
  card_team1_T1?:string;
  card_team1_T2?:string;
  card_team2_T1?:string;
  card_team2_T2?:string;
  card_icon?:IconType;

}
export default function ScoreBoardAndLiveStream(props: Props) {
  interface toggleOption {
            title: string;
            key: string;
           
          }
          const toggleOption: toggleOption[] = [
        
            { title: "Main", key: 'scorecard_main' },
            { title: "Map 1", key: 'map1' },
            { title: "Map 2", key: 'map2' },
            { title: "Map 3", key: 'map3' },
            
          ];
          const toggleOption2:toggleOption[]=[
            { title: "All Bets", key: 'all_bets' },
            { title: "High Rollers", key: 'high_rollers' },
            { title: "Race Leaderboard", key: 'race_leaderboard' },
          ]
  return (
    <>
      <div className={`relative flex justify-self-start justify-center items-center  `}>
        <img className='h-48 w-[900px] opacity-35 bg-[#0f212e] ' src={welcomesportsen} alt="" />
         
         
          <div className=' bg-[#1a2c38]  absolute  rounded overflow-hidden'>   
          <div className='text-[14px] text-[#b1bad3] font-semibold flex gap-5 items-center bg-[#0f212e] p-3'>
            <span className='text-nowrap'> {props.card_time} {props.card_date} </span> 
            <span>{props.card_t1}</span>
            <span>{props.card_t2}</span> 
            <span>{props.card_t3}</span> 
        


            <span>{props.card_icon&&<props.card_icon size={20}/>}</span>
            
          </div> 
          
          <div className='grid grid-cols-7'>
          <div className='col-span-6'>
          <p className='text-[14px] font-semibold py-2 pl-2 flex gap-2 items-center'><BiSolidTennisBall size={16} color='orange'/>{props.card_team1_T1}, {props.card_team1_T2}</p>
          <hr className="border-t border-gray-700" />
          <p className='text-[14px] font-semibold py-2 pl-2'>{props.card_team2_T1}, {props.card_team2_T2}</p>
          </div>

          <div className=' col-span-1 bg-[#2f4553] text-orange-500 '>
            <p className='py-2 flex justify-center items-center '>-</p>
            <p className='py-2 flex justify-center items-center '>-</p>
          </div>
          
          </div>
          </div>

       
      </div>

      <div className=' flex bg-[#0f212e] h-10 space-x-3 text-blue-100 text-[14px] pr-4 justify-end items-center'>
        <div>Scoreboard</div>
<label className="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer"/>
  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 "></div>
</label>
<div>Live Stream</div>
<div className="w-[5px] h-[5px] bg-red-500 rounded-full" style={{ animation: "blink 1s infinite" }}></div>

<style>
  {`
    @keyframes blink {
      50% { opacity: 0; }
    }
  `}
</style>

      </div>
      <div className='my-4 space-y-6'>
      <ToggleComponent defaultToggleOption="scorecard_main" toggleOptions={toggleOption} />
      <ToggleComponent defaultToggleOption="all_bets" toggleOptions={toggleOption2} />
      </div>
  
    </>
  )
}