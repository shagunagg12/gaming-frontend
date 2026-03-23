import React from 'react'
import ToggleComponent from '../universalComponents/ToggleComponent'
import ToggleTableComponent from '../LandingPageComponents/ToggleTableComponent'
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { useUserInfo } from '../../../context/UserInfoContext';

interface Props{
  roleDice:() =>void
  error:string
}

function BetCalculator({roleDice,error}:Props) {


    const toggleOption:toggleOptionProp[] = [
        { title: "Manual", key: 'manual' },
        { title: "Auto", key: 'auto'},
    
      ];
      interface toggleOptionProp {
        title:string;
        key:string;
      }

      const {betAmt} = useUserInfo()
  return (
    <div className='bg-[#263f4d] h-full p-3'>
        <ToggleTableComponent defaultTable='manual'  ClassName='h-9 w-full' containerWidth='w-full' toggleOption={toggleOption}/>
        <div>
      
      <p className='primaryTextColor font-bold text-[13px] mt-5'>Profit on win</p>
      <div  
      id='profit-on-win' 
      className="shadow-lg flex items-center justify-between w-full rounded px-3   text-white font-extrabold bg-[#355161]   data-[focus]:-outline-offset-2  focus:outline-none  h-11 border-[2px]  group-hover:border-[#54798f] transition-all duration-150  ease-in-out focus:border-slate-500 border-[#355161]" 
      >
        {betAmt * 3} <FaIndianRupeeSign/>
  </div>
    </div>
        <button  onClick={roleDice} className="mt-6 text-black bg-[#04d001] hover:bg-[#059213] text-sm  font-bold text-center px-4  h-14 rounded w-full">
              Bet
        </button>


        <p className='secondaryTextColor font-bold text-[16px] mt-5 flex justify-center'>{error}</p>

    </div>
  )
}

export default BetCalculator
