
import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

export default function  SearchComponent():React.JSX.Element  {

  const [open,setOpen]=useState<boolean>(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [clearSearch, setClearSearch]=useState<boolean>(false)
  


  const handleOpen =()=>{
    setOpen(!open)
  }

  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const games = ['Poker', 'Blackjack', 'Slots', 'Roulette', 'Baccarat'];

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const char = e.target.value;
  //   setQuery(char);
  //   if (char.length >= 3) {
  //     const results = searchForGames(char);
  //     setSearchResults(results);
  //     if (results.length > 0 && !recentSearches.includes(char)) {
  //       setRecentSearches([...recentSearches, char]);
  //     }
  //   } else {
  //     setSearchResults([]);
  //   }
  // };

 
  const reecentSearches = (newSearch: string): string[] => {
    // Retrieve existing searches from localStorage
    let searches: string[] = JSON.parse(localStorage.getItem('recentSearches') || '[]');
  
    // Add the new search term to the beginning of the array
    searches.unshift(newSearch);
  
    // Limit the array to the last 4 searches
    searches = searches.slice(0, 4);
  
    // Store the updated array in localStorage
    localStorage.setItem('recentSearches', JSON.stringify(searches));
  
    return searches;
  };
  const searchForGames = (query: string): string[] => {
    return games.filter(game => game.toLowerCase().includes(query.toLowerCase()));
  };

 
  // const clearSearches = () => {
  //   setRecentSearches([]);
  // };

  return (<>
    <div onClick={handleOpen} className={`z-[60] w-full  h-full ${open?'':'hidden'} fixed top-0 left-0  bg-slate-900 blur opacity-55`}></div>
         <div className=' my-5 max-md:hidden relative '>
              
        <input  placeholder='Search your game'  onClick={()=>setOpen(true)} className='z-50 placeholder:font-bold placeholder:text-slate-500 px-12 py-5  text-[.9rem] text-white 
                bg-[#0f212e]  data-[focus]:-outline-offset-2  focus:outline-none  w-full rounded-full h-10 border-[2px] hover:border-slate-500 focus:border-slate-500 border-slate-500/80' type="search" />
            <FaSearch className='absolute flex top-3 text-[20px] left-5 text-slate-500 ' />
            <ImCross onClick={()=>setOpen(false)} className='cursor-pointer absolute hover:text-white flex top-4 text-[12px] right-5  text-slate-500 ' />
         <div className={`w-full min-h-16 z-[80] bg-[#152b3b] absolute shadow-sm mt-3 rounded ${open?'':'hidden'} `}>
        <div className='w-full justify-center flex h-16 items-center text-[#b1bad3] font-semibold text-[.85rem]'>Search requires at least 3 characters.</div>
        <div className='flex w-full justify-between px-5 text-[#b1bad3] text-[.85rem] font-semibold'><div>{recentSearches.map((item)=>(<div className='p-2 bg-slate-500'>{item}</div>))}</div><div onClick={()=>setRecentSearches([''])} className='cursor-pointer'>Recent Search</div></div>

        <div className='w-full p-5' >{searchResults}</div>
       </div>
    </div>
    </>
  )
}


