
import { LuSettings2 } from "react-icons/lu";
import { IoChevronDown, } from 'react-icons/io5';
import React, { useState, useRef, useEffect } from 'react';

const provider = [
  { id: 1, name: 'Avatar',count:36 },
  { id: 2, name: 'Backseat Gaming',count:14 },
  { id: 3, name: 'Belatra',count:83 },
  { id: 4, name: 'BGaming',count:69 },
  { id: 5, name: 'Devon Webb',count:31 },
  { id: 6, name: 'Avatar',count:36 },
  { id: 7, name: 'Backseat Gaming',count:14 },
  { id: 8, name: 'Belatra',count:83 },
  { id: 9, name: 'BGaming',count:69 },
  { id: 10, name: 'Devon Webb',count:31 },
  { id: 11, name: 'Avatar',count:36 },
  { id: 12, name: 'Backseat Gaming',count:14 },
  { id: 13, name: 'Belatra',count:83 },
  { id: 14, name: 'BGaming',count:69 },
  { id: 15, name: 'Devon Webb',count:31 },
  { id: 16, name: 'Avatar',count:36 },
  { id: 17, name: 'Backseat Gaming',count:14 },
  { id: 18, name: 'Belatra',count:83 },
  { id: 19, name: 'BGaming',count:69 },
  { id: 20, name: 'Devon Webb',count:31 },
  { id: 17, name: 'Backseat Gaming',count:14 },
  { id: 18, name: 'Belatra',count:83 },
  { id: 19, name: 'BGaming',count:69 },
  { id: 20, name: 'Devon Webb',count:31 },
  { id: 17, name: 'Backseat Gaming',count:14 },
  { id: 18, name: 'Belatra',count:83 },
  { id: 19, name: 'BGaming',count:69 },
  { id: 20, name: 'Devon Webb',count:31 },
]
interface GameProp {
  title:string;
  description:string;
  img:string
  category:string
}
interface Props{
  games:GameProp[]
}

export default function FilterComponent(props:Props):React.JSX.Element {
  const [selected, setSelected] = useState()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);




  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="mx-auto  pt-2 flex justify-center  items-center ">
      <div className='flex items-center gap-2 text-slate-400 max-sm:hidden'><LuSettings2/><span className='text-white font-bold text-[.79rem] w-16 '>Filter By</span></div>

   
     <div className="relative inline-block text-left "  ref={popoverRef}>
      <button
        onClick={handleToggle}
        className="inline-flex justify-center w-full rounded  shadow-sm px-4 py-2 bg-[#0f212e] text-sm  text-gray-100 font-bold hover:bg-[#0d1c27] ease-in-out. delay-300 focus:outline-none gap-2 items-center"
      >
       Provider
       <IoChevronDown/> </button>

      {isOpen && (
        <>    
        <div className="triangle-up absolute right-[55px]"></div>
        <div className="origin-top-right overflow-y-scroll max-h-[600px] z-50 scrollbar-thin scrollbar-thumb-[#192e38] flex  scrollbar-track-[#ffffff] absolute -left-20 flex-1  mt-2 w-64  shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1 ">
      


          {provider.map((item,index)=>(<div className="flex items-center  gap-2 cursor-pointer">
          <input className="w-5  h-5 m-2 border-solid self-center cursor-pointer" type="checkbox" name="" id="" /><span className="font-semibold  text-sm text-black">  {item.name}</span><div className="rounded-full bg-blue-500 px-2 text-black">{item.count}</div>
          </div>))}
           
          </div>
          </div></>
      )}
    </div>
  
      </div>
  )
}