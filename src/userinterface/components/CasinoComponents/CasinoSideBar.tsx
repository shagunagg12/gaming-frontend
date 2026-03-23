import React, { useRef, useState } from 'react';
import { TiThMenu } from "react-icons/ti";
import casinoPokerCardImg from "../../../assets/images/casino-poker-cards-en.jpg";
import sportsBallsImg from "../../../assets/images/sports-balls-en.jpg";
import { FaChevronCircleDown, FaChevronCircleRight, FaFire, FaHandshake, FaTrophy } from "react-icons/fa";
import { IoAdd, IoAddCircle, IoNewspaperSharp, IoTicket } from "react-icons/io5";
import { TbAffiliateFilled } from "react-icons/tb";
import { MdForum, MdLanguage } from "react-icons/md";
import { BsShieldLockFill } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { IoIosGift } from "react-icons/io";
import { IconType } from 'react-icons';
import { FaFireBurner } from 'react-icons/fa6';
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { LuOption } from 'react-icons/lu';
import { SiKdenlive } from "react-icons/si";
import { BsFillGiftFill } from "react-icons/bs";
import { IoRocketSharp } from "react-icons/io5";
import { GiBowTieRibbon } from "react-icons/gi";
import { GiRibbonShield } from "react-icons/gi";
import { AiFillRocket } from "react-icons/ai";
import { MdTableBar } from "react-icons/md";
import { FaBlackTie } from "react-icons/fa6";
import { CgCardSpades } from "react-icons/cg";
import { GiCardAceClubs } from "react-icons/gi";
import { DiRubyRough } from "react-icons/di";
import { Link } from 'react-router-dom';
import ToolTipComponent from '../universalComponents/ToolTipComponent';
import { SidebarLink } from '../universalComponents/LinkSidebarComponent';


interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SubmenuItem {
  title: string;
  link: string;
  icon: React.ElementType;
}

interface LinkData {
  title: string;
  link: string;
  icon: IconType;
  dropdown?: boolean;
  submenuItems?: SubmenuItem[];
}

function CasinoSideBar({ isOpen, toggleSidebar }: SidebarProps): React.JSX.Element {

  const groupLinks: LinkData[] = [
    {
      title: 'Originals',
      link: 'casino/group/original-game',
      icon: FaFire,
      dropdown: false,
    },
    {
      title: 'Exclusives',
      link: 'casino/group/exclusive',
      icon: BsFillBookmarkStarFill,
      dropdown: false,
    },
    {
      title: 'Slots',
      link: 'casino/group/slots',
      icon: GiBowTieRibbon,
      dropdown: false,
    },
    {
      title: 'Live Casino',
      link: 'casino/group/live-casino',
      icon: SiKdenlive,
      dropdown: false,
    },
    {
      title: 'Game Shows',
      link: 'casino/group/game-show',
      icon: BsFillGiftFill,
      dropdown: false,
    },
    {
      title: 'New Releases',
      link: 'casino/group/new-release',
      icon: IoRocketSharp,
      dropdown: false,
    },
    {
      title: 'Bonus Buy',
      link: 'casino/group/bonus-buy',
      icon: GiRibbonShield,
      dropdown: false,
    },
    {
      title: 'Enhanced RTP',
      link: 'casino/group/enhanced-rtp',
      icon: AiFillRocket,
      dropdown: false,
    },
    {
      title: 'Table Games',
      link: 'casino/group/table-games',
      icon: MdTableBar,
      dropdown: false,
    },
    {
      title: 'Blackjack',
      link: 'casino/group/blackjack',
      icon: GiCardAceClubs,
      dropdown: false,
    },
   
    {
      title: 'Baccarat',
      link: 'casino/group/baccarat',
      icon: DiRubyRough,
      dropdown: false,
    },
    {
      title: 'Roulette',
      link: 'casino/group/roulette',
      icon: FaFireBurner,
      dropdown: false,
    },



  ]

  const links: LinkData[] = [
    {
      title: 'Promotions',
      link: 'promotions',
      icon: IoIosGift,
      dropdown: true,
      submenuItems: [
        { title: "submenu1", link: "/sub1", icon: IoAddCircle },
        { title: "submenu2", link: "/sub2", icon: IoAdd },
        { title: "submenu3", link: "/sub3", icon: IoAddCircle },
        { title: "submenu4", link: "/sub4", icon: IoAddCircle },
      ],
    },
    {
      title: 'Affiliate',
      link: 'affiliate',
      icon: TbAffiliateFilled,
    },
    {
      title: 'VIP Club',
      link: 'vipclub',
      icon: FaTrophy,
    },
    {
      title: 'Blog',
      link: 'blog',
      icon: IoNewspaperSharp,
    },
    {
      title: 'Forum',
      link: 'forum',
      icon: MdForum,
    },
    {
      title: 'Sponsorships',
      link: 'sponsorships',
      icon: FaHandshake,
      dropdown: true,
    },
    {
      title: 'Responsible Gambling',
      link: 'responsiblegambling',
      icon: BsShieldLockFill,
    },
    {
      title: 'Live Support',
      link: 'livesupport',
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
  const [showPopUp, setShowPopUp] = useState<boolean>(false)

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setTooltipVisible(true);

    if (tooltipRef.current && triggerRef.current && containerRef.current) {
      const tooltip = tooltipRef.current;
      const trigger = triggerRef.current;
      const container = containerRef.current;

      const containerRect = container.getBoundingClientRect();
      const triggerRect = trigger.getBoundingClientRect();

      let tooltipLeft = triggerRect.left - containerRect.left + container.scrollLeft;
      let tooltipTop = triggerRect.top - containerRect.top + container.scrollTop - tooltip.offsetHeight - 8;

      if (tooltipLeft < 0) tooltipLeft = 0;
      if (tooltipLeft + tooltip.offsetWidth > container.offsetWidth) {
        tooltipLeft = container.offsetWidth - tooltip.offsetWidth;
      }

      tooltip.style.left = `${tooltipLeft}px`;
      tooltip.style.top = `${tooltipTop}px`;
    }
  };


  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const handleMouserEnter = () => {
    setShowPopUp(true)
  }
  const handleMouserLeave = () => {
    setShowPopUp(false)
  }
  const handleDropdownToggle = (title: string) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));
  };


  return (
    <div className={`${isOpen ? 'max-lg:w-[1030px] max-md:w-0  bg-slate-950 bg-opacity-50 absolute' : 'w-20'}    z-50 `}>
      <div className={`${isOpen ? 'w-[235px]' : 'w-20'} justify-center gap-6 grid select-none duration-100 transition-all ease-in-out  slideInRight `}>
        <div className="bg-[#092420] shadow-black max-md:hidden  h-screen ">
          <div className="logo text-center flex justify-evenly items-center h-[60px] shadow-md shadow-black py-4">
            <TiThMenu size={24} className="cursor-pointer my-2 opacity-60  " onClick={toggleSidebar} />
            <img src={casinoPokerCardImg} alt="" className={`rounded-md ${isOpen ? 'w-[25%]' : 'hidden'}`} />
            <img src={sportsBallsImg} alt="" className={`rounded-md ${isOpen ? 'w-[25%]' : 'hidden'}`} />
            <img src={sportsBallsImg} alt="" className={`rounded-md ${isOpen ? 'w-[25%]' : 'hidden'}`} />
          </div>

          {isOpen && (<div className='overflow-y-scroll  scrollbar-thin scrollbar-thumb-[#192e38] scrollbar-track-[#092420] h-[calc(100vh-60px)]'>
            
            <div className="mt-4">
              <div className="text-white duration-200 transition-all ease-in-out w-[90%]  text-[14px] font-bold justify-self-center rounded-[4px] bg-[#183D3D] cursor-pointer">
                {firstFiveLinks.map((item, index) => (
                  <div key={item.title}>
                    <div
                      className={`w-full h-10 flex items-center pl-5 rounded-[4px]  ${dropdownStates[item.title] ? 'bg-[#265353] hover:bg-[#1d4949]' : 'hover:bg-[#215252]'}`}
                      onClick={() => item.dropdown && handleDropdownToggle(item.title)}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="hover:text-blue-500 text-[#7d8d8d]" size={20} />
                        {item.title}
                      </div>
                      {item.dropdown && (
                        <div className=" w-full flex  justify-end px-3 ">
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
                        {item.submenuItems.map((submenu) => (
                          <div key={submenu.title} className="w-full h-10 pl-5 flex rounded-[4px] hover:text-white hover:bg-[#1d4949]">
                            <a href={submenu.link} className="flex items-center gap-5">
                              <submenu.icon className="hover:text-blue-500 text-[#7d8d8d]" size={20} />
                              {submenu.title}
                            </a>
                          </div>
                        ))}<hr className="border-[#436e6e]" />

                      </div>
                    )}
                  </div>
                ))}

              </div>
            </div>
            <div className="mt-4">
              <div className="text-white w-[90%]  text-sm font-bold justify-self-center rounded-[4px] bg-[#183D3D] cursor-pointer">
                {remainingLinks.map((item, index) => (
                  <div key={item.title}>
                    <div
                      className={`w-full h-10 flex items-center pl-5 rounded-[4px]  ${dropdownStates[item.title] ? 'bg-[#265353] hover:bg-[#1d4949]' : 'hover:bg-[#215252]'}`}
                      onClick={() => item.dropdown && handleDropdownToggle(item.title)}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="hover:text-blue-500 text-[#7d8d8d]" size={20} />
                        {item.title}
                      </div>
                      {item.dropdown && (
                        <div className="w-full flex  justify-end px-3">
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
                        {item.submenuItems.map((submenu) => (
                          <div key={submenu.title} className="w-full h-10 pl-5 flex rounded-[4px] hover:text-white hover:bg-[#1d4949]">
                            <a href={submenu.link} className="flex items-center gap-5">
                              <submenu.icon className="hover:text-blue-500 text-[#7d8d8d]" size={20} />
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
            <div className="mt-4">
              <div className="text-white w-[90%]  text-sm font-bold justify-self-center rounded-[4px] bg-[#183D3D] cursor-pointer">
                {groupLinks.map((item, index) => (
                  <div key={item.title}>
                    <div
                      className={`w-full h-10 flex items-center pl-5 rounded-[4px]  ${dropdownStates[item.title] ? 'bg-[#265353] hover:bg-[#1d4949]' : 'hover:bg-[#215252]'}`}
                      onClick={() => item.dropdown && handleDropdownToggle(item.title)}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="hover:text-blue-500 text-[#7d8d8d]" size={20} />
                        {item.title}
                      </div>
                      {item.dropdown && (
                        <div className="w-full flex  justify-end px-3">
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
                        {item.submenuItems.map((submenu) => (
                          <div key={submenu.title} className="w-full h-10 pl-5 flex rounded-[4px] hover:text-white hover:bg-[#1d4949]">
                            <a href={submenu.link} className="flex items-center gap-5">
                              <submenu.icon className="hover:text-blue-500 text-[#7d8d8d]" size={20} />
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

          </div>
          )}
          {/*closed here */}
          {!isOpen && (<div className='flex flex-col items-center justify-center h-[calc(100vh-60px)]'>
            <div className=' p-3'><img src={sportsBallsImg} alt="" className=' rounded-md  hover:contrast-150 hover:saturate-150   duration-300 cursor-pointer  h-9' /></div>
            <div className='  px-3'><img src={casinoPokerCardImg} alt="" className=' rounded-md hover:contrast-150 hover:saturate-150 duration-300 cursor-pointer h-9' /></div>
            <div className=' p-3'><img src={casinoPokerCardImg} alt="" className=' rounded-md hover:contrast-150 hover:saturate-150 duration-300 cursor-pointer  h-9' /></div>

            <div className='overflow-visible scrollbar-thumb-[#2b4757]   scrollbar-track-[#092420] scrollbar-thin  overflow-y-scroll' >
              <div className='flex justify-center pb-2'>
                {/*  */}

                <div className='cursor-pointer bg-[#1d4949] justify-self-center flex justify-center flex-col rounded-[4px] h-full'>
                  {firstFiveLinks.map((item) => (
                    <SidebarLink
                      key={item.title}
                      item={item}
                      handleMouseEnter={handleMouseEnter}
                      handleMouseLeave={handleMouseLeave}
                    />
                  ))}
                </div>

                {/*  */}
              </div>

              <div className='flex justify-center pb-2'>
                <div className='cursor-pointer bg-[#1d4949] justify-self-center flex justify-center flex-col rounded-[4px] h-full'>
                  {remainingLinks.map((item) => (
                    <SidebarLink
                      key={item.title}
                      item={item}
                      handleMouseEnter={handleMouseEnter}
                      handleMouseLeave={handleMouseLeave}
                    />
                  ))}
                </div>  </div>

              <div className='flex justify-center pb-2'>
                <div className='cursor-pointer bg-[#1d4949] justify-self-center flex justify-center flex-col rounded-[4px] h-full'>
                  {groupLinks.map((item) => (
                    <SidebarLink
                      key={item.title}
                      item={item}
                      handleMouseEnter={handleMouseEnter}
                      handleMouseLeave={handleMouseLeave}
                    />
                  ))}
                </div>
              </div>
            </div>


          </div>)}
        </div>

      </div>

    </div>
  );
}

export default CasinoSideBar;

