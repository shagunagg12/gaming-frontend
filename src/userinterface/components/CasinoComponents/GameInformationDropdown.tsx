import { useParams } from "react-router-dom"
import { GiTrophyCup } from "react-icons/gi";
import { BsIncognito } from "react-icons/bs";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import ToggleTableComponent from "../LandingPageComponents/ToggleTableComponent";
import { useState } from "react";



const toggleOption:toggleOptionProp[] = [
  { title: "Big Wins", key: 'big-wins' },
  { title: "Lucky Wins", key: 'lucky-wins'},
  { title: "Challenges", key: 'challenges'},
  { title: "Description", key: 'description' },
];
interface toggleOptionProp {
  title:string;
  key:string;
}

function GameInformationDropdown() {
  const params = useParams()
  const game = params.game
  const [open,setOpen]= useState<boolean>(false) 

    const handleClick=()=>{
        setOpen((open)=>(!open))
        
    }

return (<div className='flex justify-center items-center transition-opacity'>
    <div className='bg-[#0f212e] h-auto p-6 relative lg:w-[1200px] w-full  overflow-hidden rounded-md my-10'>
        <div className={` items-center flex justify-between `}>
          <span>
        <span className="text-[16px] text-[#ffffff] font-[600] text-nowrap w-fit ">{game} </span>
       <span className="text-[16px] text-[#9cbad3] font-[600] text-nowrap cursor-pointer hover:text-white ">Stake Originals</span>
       </span>
       <div className="rounded-full mr-12 bg-[#2f4553] p-2 px-4 items-center md:flex hidden">
        <GiTrophyCup color="orange"/> <span className="text-[12px] font-bold pr-2 leading-4  text-[#9cbad3] tracking-normal "> 1,000.00x  </span> <span> <BsIncognito /> </span>  <span className="text-[14px]  text-[#9cbad3] font-bold"> Hidden</span>
       </div>
       <span onClick={handleClick} className={`absolute right-6 top-7 text-[#9cbad3] p-2 cursor-pointer transition-all duration-300 ${open?'-rotate-90 ':''}`}><FaChevronLeft/></span>
       </div> 
       {open ? (
  <div className={`mt-3 transition-all duration-300 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
    <ToggleTableComponent defaultTable="big-wins" color="bg-[#1a2c38]" toggleOption={toggleOption} />
  </div>
) : (
  <div className="duration-300 opacity-0 -translate-y-3 transition-all"></div>
)}
      </div>
    
  
          </div>
  )
}

export default GameInformationDropdown
