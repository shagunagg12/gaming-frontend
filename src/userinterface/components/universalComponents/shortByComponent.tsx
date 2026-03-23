
import { LuSettings2 } from "react-icons/lu";
import { IoChevronDown, } from 'react-icons/io5';
import React, { useState, useRef, useEffect } from 'react';

const provider = [
  { id: 1, name: 'A-Z', },
  { id: 2, name: 'Z-A', },
  { id: 3, name: 'Popular', },
  { id: 4, name: 'Featured', }
 
]

export default function ShortByComponent():React.JSX.Element {
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
    <div className="mx-auto pt-2 flex justify-center  items-center ">
      <div className='flex items-center gap-2 text-slate-400 max-sm:hidden'><LuSettings2/><span className='text-white font-bold text-[.79rem] w-16'>Short By</span></div>

   
     <div className="relative inline-block text-left" ref={popoverRef}>
      <button
        onClick={handleToggle}
        className="inline-flex justify-center w-full rounded  shadow-sm px-4 py-2 bg-[#0f212e] text-sm  text-gray-100 font-bold hover:bg-[#0d1c27] ease-in-out. delay-300 focus:outline-none gap-2 items-center"
      >
       Popular
       <IoChevronDown/> </button>

      {isOpen && (<>
        <div className="triangle-up absolute right-[47px]"></div>
      
        <div className="origin-top-right  absolute right-0 flex-1  mt-2 w-[108px] z-50 rounded  shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1 ">
          {provider.map((item,index)=>(<div className="flex items-center  gap-2">
            <div className="font-semibold hover:bg-slate-200 text-sm text-black w-full px-1 py-2">  {item.name}</div>
          </div>))}
           
          </div>
        </div></>
      )}
    </div>
  
      </div>
  )
}