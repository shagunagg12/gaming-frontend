import React, { useState } from 'react';
import { TiThMenu } from "react-icons/ti";
import casinoPokerCardImg from "../../../assets/images/casino-poker-cards-en.jpg";
import sportsBallsImg from "../../../assets/images/sports-balls-en.jpg";
import { FaChevronCircleDown, FaChevronCircleRight, FaHandshake, FaTrophy } from "react-icons/fa";
import { FaGift } from "react-icons/fa6";
import { IoAdd, IoAddCircle, IoNewspaperSharp, IoTicket } from "react-icons/io5";
import { TbAffiliateFilled } from "react-icons/tb";
import { MdForum, MdLanguage } from "react-icons/md";
import { BsShieldLockFill } from "react-icons/bs";
import { BiSupport, BiTimer } from "react-icons/bi";
import { IoIosGift } from "react-icons/io";
import { IconType } from 'react-icons';
import { Shield, ShieldIcon } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SubmenuItem {
  title: string;
  link: string;
  icon: React.ElementType;
  hr?:boolean
}

interface LinkData {
  title: string;
  link: string;
  icon: IconType;
  dropdown?: boolean;
  submenuItems?: SubmenuItem[];
}

function SideMenuComponent({ isOpen, toggleSidebar }: SidebarProps): React.JSX.Element {



  const links: LinkData[] = [
    {
      title: 'Promotions',
      link: '',
      icon: IoIosGift,
      dropdown: true,
      submenuItems: [
        { title: "$75k Weekly Raffle", link: "/weeklyRaffle", icon: IoTicket },
        { title: "$100k Race-24 Hours", link: "/race24", icon: BiTimer  },
        { title: "Pragmatic Drops & Wins", link: "/drop&wins", icon: FaTrophy },
        
        { title: "View All", link: "/viewall", icon: FaGift, hr:true },
      ],
    },
    {
      title: 'Affiliate',
      link: '/affiliate',
      icon: TbAffiliateFilled,
    },
    {
      title: 'VIP Club',
      link: '/vipclub',
      icon: FaTrophy,
    },
    {
      title: 'Blog',
      link: '/blog',
      icon: IoNewspaperSharp,
    },
    {
      title: 'Forum',
      link: '/forum',
      icon: MdForum,
    },
    {
      title: 'Sponsorships',
      link: '/sponsorships',
      icon: FaHandshake,
      dropdown: true,
    },
    {
      title: 'Responsible Gambling',
      link: '/responsiblegambling',
      icon: ShieldIcon,
    },
    {
      title: 'Live Support',
      link: '/livesupport',
      icon: BiSupport,
    },
    {
      title: 'Language',
      link: '',
      icon: MdLanguage,
      dropdown: true,
    },
  ];
  const firstFiveLinks = links.slice(0, 5);
  const remainingLinks = links.slice(5);



  const [dropdownStates, setDropdownStates] = useState<{ [key: string]: boolean }>({});

  const handleDropdownToggle = (title: string) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));
  };

  return (
    <div className={`${isOpen ? 'max-lg:w-[1024px] bg-opacity-50 ' : 'w-20'} h-screen bg-[#0f2222] `}>
      <div className={`${isOpen ? 'w-[235px]' : 'w-20'} gap-6  max-md:hidden grid items-center select-none animate-slideInLeft duration-100 max-lg:absolute`}>
        <div className="bg-[#092420] shadow-black min-h-screen">
          <div className="logo text-center flex justify-evenly items-center shadow-md shadow-black py-4">
            <TiThMenu size={24} className="cursor-pointer my-2 opacity-60  " onClick={toggleSidebar} />
            <img src={casinoPokerCardImg} alt="" className={`rounded-md ${isOpen ? 'w-[25%]' : 'hidden'}`} />
            <img src={sportsBallsImg} alt="" className={`rounded-md ${isOpen ? 'w-[25%]' : 'hidden'}`} />
            <img src={sportsBallsImg} alt="" className={`rounded-md ${isOpen ? 'w-[25%]' : 'hidden'}`} />
          </div>

          {isOpen && (<>
            <div className="mt-4 animate-slideInDowntoUp">
              <div className="text-white  w-[90%] text-sm font-bold justify-self-center rounded-[4px] bg-[#183D3D] cursor-pointer">
                {firstFiveLinks.map((item,index) => (
                  <div key={item.title}>
                    <div
                      className={`w-full h-10 flex items-center relative pl-5 rounded-[4px]  ${dropdownStates[item.title] ? 'bg-[#265353] hover:bg-[#1d4949]' : 'hover:bg-[#215252]'}`}
                      onClick={() => item.dropdown && handleDropdownToggle(item.title)}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="hover:text-blue-500 text-[#adb7cf]" size={20} />
                        {item.title}
                      </div>
                      {item.dropdown && (
                        <div className="absolute right-3 flex justify-end">
                          {dropdownStates[item.title] ? (
                            <FaChevronCircleDown color="gray" cursor="pointer" />
                          ) : (
                            <FaChevronCircleRight color="gray" cursor="pointer" />
                          )}
                        </div>
                      )}
                    </div>

                    {item.dropdown && dropdownStates[item.title] && item.submenuItems && (
                      <div className="bg-[#265353] transform transition-all duration-100 ease-in-out">
                        <hr className="border-[#436e6e]" />
                        {item.submenuItems.map((submenu,subIndex) => (
                          <div key={submenu.title} className="w-full h-10 pl-5 flex rounded-[4px] hover:text-white hover:bg-[#1d4949]">
                             
                            <a href={submenu.link} className="flex items-center gap-5">
                              <submenu.icon className="hover:text-blue-500 text-[#adb7cf]" size={16} />
                              {submenu.title}
                     
                            
                      
                            </a>
                          </div>
                        ))}
                        
                        <hr className="border-[#436e6e]" />
                      </div>
                    )}
                  </div>
                ))}
                
              </div>
            </div>
            <div className="mt-4 animate-slideInDowntoUp">
              <div className="text-white w-[90%]  text-sm font-bold justify-self-center rounded-[4px] bg-[#183D3D] cursor-pointer">
                {remainingLinks.map((item,index) => (
                  <div key={item.title}>
                    <div
                      className={`w-full h-10 flex items-center pl-5 rounded-[4px] relative ${dropdownStates[item.title] ? 'bg-[#265353] hover:bg-[#1d4949]' : 'hover:bg-[#215252]'}`}
                      onClick={() => item.dropdown && handleDropdownToggle(item.title)}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="hover:text-blue-500 text-[#adb7cf]" size={20} />
                        {item.title}
                      </div>
                      {item.dropdown && (
                        <div className="right-3 absolute flex justify-end">
                          {dropdownStates[item.title] ? (
                            <FaChevronCircleDown color="gray" cursor="pointer" />
                          ) : (
                            <FaChevronCircleRight color="gray" cursor="pointer" />
                          )}
                        </div>
                      )}
                    </div>

                    {item.dropdown && dropdownStates[item.title] && item.submenuItems && (
                      <div className="bg-[#265353] transform transition-transform duration-100 ease-in-out">
                        <hr className="border-[#436e6e]" />
                        {item.submenuItems.map((submenu) => (
                          
                          <div key={submenu.title} className="w-full h-10 pl-5 flex rounded-[4px] hover:text-white hover:bg-[#1d4949]">
                      
                            <a href={submenu.link} className="flex items-center gap-5">
                              <submenu.icon className="hover:text-blue-500 text-[#7d8d8d] text-sm" size={16} />
                              {submenu.title}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
              </div>
            </div>
            </>
          )}
          {!isOpen && (<>
                      <div className=' p-3'><img src={sportsBallsImg} alt="" className=' rounded-md  hover:contrast-150 hover:saturate-150   duration-300 cursor-pointer  h-9' /></div>
                      <div className='  px-3'><img src={casinoPokerCardImg} alt="" className=' rounded-md hover:contrast-150 hover:saturate-150 duration-300 cursor-pointer h-9' /></div>
                      <div className=' p-3'><img src={casinoPokerCardImg} alt="" className=' rounded-md hover:contrast-150 hover:saturate-150 duration-300 cursor-pointer  h-9' /></div>


                      <div className='flex justify-center pb-2 animate-slideInDowntoUp'>
                        <div className=' bg-[#1d4949] cursor-pointer w-2/3 justify-self-center flex justify-center flex-col  rounded-[4px] h-full'>
                          {firstFiveLinks.map((item,index)=>(
                           
                               <span key={item.title} className={`p-4 rounded-[4px]  hover:-translate-y-3 hover:text-white text-[#769191] transition-transform  `}><item.icon   size={22}/></span>
                            
                          ))} </div>  </div>
                           <div className='flex justify-center animate-slideInDowntoUp'><div className='cursor-pointer bg-[#1d4949] w-2/3 justify-self-center  flex justify-center flex-col  rounded-[4px] h-full'>
                          {remainingLinks.map((item,index)=>(
                           
                               <span key={item.title} className={`p-4 rounded-[4px]   hover:-translate-y-3 hover:scale-y-110 hover:text-white text-[#769191]  `}><item.icon  className='hover:text-white' size={22}/></span>
                            
                          ))} </div>  </div>
                         
                        </>

         )  }
        </div> 
         
      </div> 
    </div>
  );
}

export default SideMenuComponent;

